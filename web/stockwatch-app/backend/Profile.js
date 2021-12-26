import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from './graphql/Fetch';
import Update from './graphql/Update';

function useProfileSummary(email) {
    const { data, mutate, error } = useSWR(
        email ? ['profileSummary', email] : null,
        (action, email) => Fetch(action, { email }),
        {
            fallbackData: {
                displayName: 'Loading...',
                loaded: false,
                error: false,
            },
        }
    );
    useEffect(() => {
        mutate();
    }, [email]);
    function updateDisplayName(displayName) {
        Update('displayName', { userID: data.id, displayName }).then((record) => {
            mutate((data) => ({ ...data, displayName: record.displayName }));
        });
    }
    return {
        profile: data,
        profileLoaded: data.loaded,
        profileError: data.error || error,
        profileDisplayNameSet: data.displayName !== 'NoNameSet',
        profileMutate: mutate,
        updateDisplayName,
    };
}

function useProfileFull(userID) {
    const { data, mutate, error } = useSWR(
        userID ? ['profileFull', userID] : null,
        (action, userID) => Fetch(action, { userID, loaded: false, error: false }),
        {
            fallbackData: { displayName: 'Loading...' },
            enrolledGames: [],
            completedGames: [],
        }
    );
    useEffect(() => {
        mutate();
    }, [userID]);
    function joinGame(seasonID) {
        Update('joinGame', { userID, seasonID }).then(() => {
            mutate();
        });
    }
    return {
        joinGame,
        profile: data,
        profileLoaded: data.loaded,
        profileError: data.error || error,
        profileDisplayNameSet: data.displayName !== 'NoNameSet',
        profileMutate: mutate,
    };
}

export { useProfileSummary, useProfileFull };
