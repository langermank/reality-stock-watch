import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from './graphql/Fetch';
import Update from './graphql/Update';

function useProfileSummary(email) {
    const { data, mutate, error } = useSWR(
        email ? ['profileSummary', email] : null,
        (action, email) => Fetch(action, { email }),
        {
            initialData: { displayName: 'Loading...' },
        }
    );
    useEffect(() => {
        console.log('useProfile useEffect ', email);
        mutate();
    }, [email]);
    function updateDisplayName(displayName) {
        console.log('within updateDisplayName ', data.id);
        Update('displayName', { userID: data.id, displayName }).then((record) => {
            console.log('updated returned ', record);
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

export { useProfileSummary };
