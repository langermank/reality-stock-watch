import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from 'backend/graphql/Fetch';

async function fetchShows() {
    return await Fetch('listShows');
}

function useShows() {
    const { data, mutate, error } = useSWR(['listShows'], (action) => Fetch(action, {}), {
        initialData: [],
    });
    useEffect(() => {
        mutate();
    }, []);
    const loading = !data && !error;
    return { shows: data, loading };
}

function useShow(showId) {
    const { data, mutate, error } = useSWR(
        ['show', showId],
        (action, showId) => Fetch(action, { showId }),
        {
            initialData: { name: 'Loading...', seasons: [] },
        }
    );
    useEffect(() => {
        mutate();
    }, [showId]);
    const loading = !data && !error;
    return { show: data, loading };
}

function useSeason(seasonId) {
    const { data, mutate, error } = useSWR(
        seasonId ? ['season', seasonId] : null,
        (action, seasonId) => Fetch(action, { seasonId }),
        {
            initialData: { name: 'Loading...' },
        }
    );
    useEffect(() => {
        mutate();
    }, [seasonId]);
    const loading = !data && !error;
    return { season: data, loading };
}

export { useShows, useShow, useSeason, fetchShows };
