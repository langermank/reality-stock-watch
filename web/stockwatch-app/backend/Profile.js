import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from './graphql/Fetch';
import Update from './graphql/Update';

function useProfileSummary(email) {
    const { data, mutate, error } = useSWR(
        email ? ['profileSummary', email] : null,
        (action, email) => Fetch(action, { email }),
        {
            fallbackData: { displayName: 'Loading...' },
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
    const loading = !data && !error;
    return {
        profile: data,
        profileLoading: loading,
        profileError: error,
        profileMutate: mutate,
        updateDisplayName,
    };
}

function useProfileFull(userID) {
    const { data, mutate, error } = useSWR(
        userID ? ['profileFull', userID] : null,
        (action, userID) => Fetch(action, { userID }),
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
        Update('joinGame', { userID, seasonID }).then((record) => {
            mutate();
        });
    }
    const loading = !data && !error;
    return {
        joinGame,
        profile: data,
        profileLoading: loading,
        profileError: error,
        profileMutate: mutate,
    };
}

export { useProfileSummary, useProfileFull };
