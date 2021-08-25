import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from './graphql/Fetch';

function useProfile(userId) {
    console.log('userProfile top', userId);
    const { data, mutate, error } = useSWR(
        userId ? ['profile', userId] : null,
        (action, userId) => Fetch(action, { userId }),
        {
            initialData: { displayName: 'Loading...' },
        }
    );
    useEffect(() => {
        console.log('mutate');
        mutate();
    }, [userId]);
    const loading = !data && !error;
    return { profile: data, loading, error, mutate };
}

export { useProfile };
