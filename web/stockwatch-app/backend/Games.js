import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from './graphql/Fetch';

function useTransactionsByPlayer(playerId) {
    const { data, mutate, error } = useSWR(
        playerId ? ['transactionsByPlayer', playerId] : null,
        (action, playerId) => Fetch(action, { playerId }),
        {
            initialData: [],
        }
    );
    useEffect(() => {
        mutate();
    }, [playerId]);
    const loading = !data && !error;
    return { transactions: data, loading, error, mutate };
}

function usePlayer(playerId) {
    const { data, mutate, error } = useSWR(
        playerId ? ['player', playerId] : null,
        (action, playerId) => Fetch(action, { playerId }),
        {
            initialData: { stocks: [] },
        }
    );
    useEffect(() => {
        mutate();
    }, [playerId]);
    const loading = !data && !error;
    return { player: data, loading, error, mutate };
}

function useRatings(showId, seasonId, week) {
    const { data, mutate, error } = useSWR(
        showId && seasonId && week !== undefined ? ['ratings', showId, seasonId, week] : null,
        (action, showId, seasonId, week) => Fetch(action, { showId, seasonId, week }),
        {
            initialData: {
                title: 'Loading...',
                contestantExtraTags: [],
                contestants: [],
                ratings: [],
            },
        }
    );

    if (error) {
        console.log('useRatings SWR error', error);
    }

    useEffect(() => {
        mutate();
    }, [showId, seasonId, week]);
    const loading = !data && !error;
    return { ratings: data, loading, error, mutate };
}

export { useTransactionsByPlayer, usePlayer, useRatings };
