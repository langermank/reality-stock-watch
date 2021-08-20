import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from './graphql/Fetch';

function useTransactionsByPlayer(playerId) {
    const { data, mutate, error } = useSWR(
        playerId ? ['transactionsByPlayer', playerId] : null,
        Fetch,
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
    const { data, mutate, error } = useSWR(playerId ? ['player', playerId] : null, Fetch, {
        initialData: { stocks: [] },
    });
    useEffect(() => {
        mutate();
    }, [playerId]);
    const loading = !data && !error;
    return { player: data, loading, error, mutate };
}

export { useTransactionsByPlayer, usePlayer };
