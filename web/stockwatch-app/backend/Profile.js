import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from './graphql/Fetch';

function useProfile(userId) {
    const { data, mutate, error } = useSWR(
        userId ? ['profile', userId] : null,
        (action, userId) => Fetch(action, { userId }),
        {
            initialData: { displayName: 'Loading...' },
        }
    );
    useEffect(() => {
        mutate();
    }, [userId]);
    const loading = !data && !error;
    return { profile: data, loading, error, mutate };
}

export { useProfile };
