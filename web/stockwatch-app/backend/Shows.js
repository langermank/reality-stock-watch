import { useEffect } from 'react';
import useSWR from 'swr';
import Fetch from 'backend/graphql/Fetch';
import Create from 'backend/graphql/Create';
import Delete from 'backend/graphql/Delete';
import { filter } from 'lodash';

async function fetchShows() {
    return await Fetch('listShows');
}

function useShows({ initialShows = [] } = {}) {
    const { data, mutate, error } = useSWR(['listShows'], (action) => Fetch(action, {}), {
        initialData: initialShows,
    });
    useEffect(() => {
        mutate();
    }, []);
    const loading = !data && !error;

    function createShow(name) {
        mutate(async (shows) => [...shows, await Create('show', { name })], false);
    }

    function deleteShow(id) {
        Delete('show', { id });
        mutate(async (shows) => filter(shows, (show) => show.id != id), false);
    }

    return { shows: data, loading, createShow, deleteShow };
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
