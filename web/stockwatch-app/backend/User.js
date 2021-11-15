import { useState, useEffect, useCallback } from 'react';
import { Hub, Auth } from 'backend/Configure';
import { useProfileSummary } from 'backend/Profile';
import useSWR from 'swr';
import { ConsoleLogger } from 'aws-amplify/node_modules/@aws-amplify/core';

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
        const identity = JSON.parse(cognitoUser.attributes.identities)[0];
        user = {
            loggedIn: true,
            username: cognitoUser.username,
            email: cognitoUser.attributes.email,
            nickname: cognitoUser.username,
            provider: identity.providerName,
            providerUserID: identity.userId,
            isAdmin:
                cognitoUser.signInUserSession.accessToken.payload['cognito:groups'].includes(
                    'admin'
                ),
        };
    }
    return user;
}

function useUser() {
    const [mockUserEmail, setMockUserEmail] = useState(null);
    const { data: authenticatedUser, mutate: mutateUser } = useSWR('currentUser', fetchUser, {
        fallbackData: falseUser,
    });
    const profile = useProfileSummary(mockUserEmail || authenticatedUser.email);
    const isLoggedIn = authenticatedUser && authenticatedUser.loggedIn;
    function clearMockUser() {
        setMockUserEmail(null);
    }
    function toggleLogin() {
        if (isLoggedIn) {
            Auth.signOut();
        } else {
            Auth.federatedSignIn();
        }
    }
    const listen = useCallback((data) => {
        switch (data.payload.event) {
            case 'signIn':
            case 'signOut':
                mutateUser();
                break;
            default:
            // Pass
        }
    }, []);
    useEffect(() => {
        Hub.listen('auth', listen);
        mutateUser();
        return () => {
            Hub.remove('auth', listen);
        };
    }, [listen]);

    return {
        ...profile,
        toggleLogin,
        setMockUserEmail,
        authenticatedUser,
        clearMockUser,
        isLoggedIn,
        isAdmin: authenticatedUser && authenticatedUser.isAdmin,
    };
}

export { useUser };
