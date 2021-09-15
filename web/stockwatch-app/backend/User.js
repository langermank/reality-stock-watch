import { useState, useEffect, useCallback } from 'react';
import { Hub, Auth } from 'backend/Configure';
import Fetch from 'backend/graphql/Fetch';
import useSWR from 'swr';

// The Auth API has no way of checking if the user is logged in.
// Use exceptions to hack around this.
//
async function getCurrentUser() {
    try {
        return await Auth.currentAuthenticatedUser();
    } catch {
        return null;
    }
}

// Returns a user object, and a function that can be used to
// toggle the login status of the user.
//
// If the user is not logged in, the toggle function initiates
// the authentication flow.
//
// In order to minimize UI flashing, we attempt to remember the
// user's previous login state using local storage. If local
// storage has no login state, then we default to "null", which
// means we don't know the login state.  This gives the UI the
// option of rendering some sort of "indeterminate" UI.  This
// means that the loggedIn state can be:
//
//  true: user is logged in
//  false: user is not logged in
//  null: we don't yet know if the user is logged in.
//
const falseUser = {
    loggedIn: false,
    username: null,
    email: null,
    nickname: null,
    isAdmin: false,
};
async function fetchUser() {
    let cognitoUser = await getCurrentUser();
    let user = falseUser;
    if (cognitoUser) {
        console.log('cognito user is ', cognitoUser);
        user = {
            loggedIn: true,
            username: cognitoUser.username,
            email: cognitoUser.attributes.email,
            nickname: cognitoUser.username,
            isAdmin:
                cognitoUser.signInUserSession.accessToken.payload['cognito:groups'].includes(
                    'admin'
                ),
        };
        console.log('parsed user is ', user);
    }
    return user;
}

const EMPTY_MOCK_USER = { userID: 0, displayName: 'None' };

function useUser() {
    const [mockUserID, setMockUserID] = useState(0);
    const { data: mockUser, mutate: mutateMockUser } = useSWR(
        mockUserID ? ['profile', mockUserID] : null,
        (action, userID) => Fetch(action, { userID }),
        {
            initialData: EMPTY_MOCK_USER,
        }
    );
    function clearMockUser() {
        setMockUserID(0);
    }
    useEffect(() => {
        if (mockUserID == 0) {
            mutateMockUser(EMPTY_MOCK_USER, false);
            return;
        }
        mutateMockUser();
    }, [mockUserID]);

    const { data: authenticatedUser, mutate } = useSWR('currentUser', fetchUser, {
        initialData: falseUser,
    });

    function toggleLogin() {
        if (authenticatedUser && authenticatedUser.loggedIn) {
            Auth.signOut();
        } else {
            Auth.federatedSignIn();
        }
    }
    const listen = useCallback((data) => {
        switch (data.payload.event) {
            case 'signIn':
            case 'signOut':
                mutate('currentUser');
                break;
            default:
            // Pass
        }
    }, []);
    useEffect(() => {
        Hub.listen('auth', listen);
        mutate();
        return () => {
            Hub.remove('auth', listen);
        };
    }, [listen]);

    const effectiveUser = mockUser.userID ? mockUser : authenticatedUser;

    return {
        toggleLogin,
        setMockUserID,
        authenticatedUser,
        clearMockUser,
        mockUser,
        user: effectiveUser,
        isAdmin: authenticatedUser && authenticatedUser.isAdmin,
    };
}

export { useUser };
