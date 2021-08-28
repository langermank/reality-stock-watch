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

function useWeek(seasonId, weekNumber) {
    console.log('useWeek', seasonId, weekNumber);
    const { data, mutate, error } = useSWR(
        weekNumber !== undefined ? ['week', seasonId, weekNumber] : null,
        (action, seasonId, weekNumber) => Fetch(action, { seasonId, weekNumber }),
        {
            initialData: {
                seasonName: 'Loading...',
                contestantExtraTags: [],
                contestants: [],
                players: [],
                ratings: {},
            },
        }
    );

    function setExtras() {}
    function setRating() {}

    if (error) {
        console.log('useWeek SWR error', error);
    }

    console.log('useWeek data', data);

    useEffect(() => {
        mutate();
    }, [seasonId, weekNumber]);
    const loading = !data && !error;
    return { week: data, setExtras, setRating, loading, error, mutate };
}

export { useTransactionsByPlayer, usePlayer, useWeek };
