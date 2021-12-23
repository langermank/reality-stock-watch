import { useEffect } from 'react';
import useSWR from 'swr';
import { Storage } from 'aws-amplify';
import Fetch from 'backend/graphql/Fetch';
import Create from 'backend/graphql/Create';
import Delete from 'backend/graphql/Delete';
import Update from 'backend/graphql/Update';
import { filter } from 'lodash';

async function fetchShows() {
    return await Fetch('listShows');
}

function useShows({ initialShows = [] } = {}) {
    const { data, mutate, error } = useSWR(['listShows'], (action) => Fetch(action, {}), {
        fallbackData: initialShows,
    });
    useEffect(() => {
        mutate();
    }, []);
    const loading = !data && !error;

    async function createShow({ name, thumbnail }) {
        // Without the customPrefix, the storage api adds /public
        // before any s3 keys.
        //
        const uploadExt = encodeURIComponent(thumbnail.name.split('.').pop());
        const image = 'uploads/show-' + Date.now() + '-' + crypto.randomUUID() + '.' + uploadExt;
        await Storage.put(image, thumbnail, {
            customPrefix: {
                public: '',
            },
            contentType: thumbnail.type,
        });
        mutate(async (shows) => [...shows, await Create('show', { name, image })], false);
    }

    async function deleteShow(id) {
        const { image } = await Delete('show', { id });
        mutate(async (shows) => filter(shows, (show) => show.id != id), false);
        await Storage.remove(image, {
            customPrefix: {
                public: '',
            },
        });
    }

    return { shows: data, loading, createShow, deleteShow };
}

const blankSeason = {
    currentWeek: 0,
    status: 'not started',
    marketStatus: 'closed',
    contestantExtraTags: '["HOH", "Nominated", "Veto"]',
    startingBankBalance: 200,
    weeklyBankIncrease: 20,
};
function useShow(showID) {
    const { data, mutate, error } = useSWR(
        ['show', showID],
        (action, showID) => Fetch(action, { showID }),
        {
            fallbackData: { name: 'Loading...', seasons: [] },
        }
    );
    useEffect(() => {
        mutate();
    }, [showID]);
    const loading = !data && !error;

    function createSeason(attributes) {
        let season = { ...blankSeason, ...attributes, showID };
        season.startingBankBalance = Math.round(season.startingBankBalance * 100);
        season.weeklyBankIncrease = Math.round(season.weeklyBankIncrease * 100);
        mutate(
            async (show) => ({
                ...show,
                seasons: [...show.seasons, await Create('season', season)],
            }),
            false
        );
    }

    function deleteSeason(id) {
        Delete('season', { id });
        mutate(
            async (show) => ({
                ...show,
                seasons: filter(show.seasons, (season) => season.id != id),
            }),
            false
        );
    }

    return { show: data, loading, createSeason, deleteSeason };
}

const blankWeek = {
    contestants: '[]',
    players: '[]',
    ratings: '{}',
};
const loadingSeason = {
    name: 'Loading...',
    weeks: [],
};
function useSeason(seasonID) {
    const {
        data: season,
        mutate,
        error,
    } = useSWR(
        seasonID ? ['season', seasonID] : null,
        (action, seasonID) => Fetch(action, { seasonID }),
        {
            fallbackData: loadingSeason,
        }
    );
    let nextWeekNumber = 0;
    useEffect(() => {
        if (!season || !season.weeks || !season.weeks.items) return;
        for (let week of season.weeks.items) {
            nextWeekNumber = Math.max(nextWeekNumber, parseInt(week.week.N));
        }
    }, [season]);
    nextWeekNumber++;
    useEffect(() => {
        mutate();
    }, [seasonID]);
    const loading = !season && !error;

    function updateSeason(fields) {
        mutate(async (season) => {
            return { ...season, ...fields };
        }, false);
        let tweakedFields = { ...fields, id: seasonID };
        if (tweakedFields.startingBankBalance) {
            tweakedFields.startingBankBalance = Math.round(tweakedFields.startingBankBalance * 100);
        }
        if (tweakedFields.weeklyBankIncrease) {
            tweakedFields.weeklyBankIncrease = Math.round(tweakedFields.weeklyBankIncrease * 100);
        }
        Update('season', tweakedFields);
    }
    function createWeek() {
        Fetch('listActiveContestants', { seasonID }).then((contestants) => {
            console.log('found active contestants', contestants);
            mutate(async (season) => {
                const fields = {
                    ...blankWeek,
                    seasonID,
                    contestants: JSON.stringify(contestants),
                    week: nextWeekNumber,
                };
                const weeks = season.weeks || [];
                return { ...season, weeks: [...weeks, await Create('week', fields)] };
            }, false);
        });
    }
    function deleteWeek(/*id*/) {
        // na
    }

    return { season, loading, nextWeekNumber, createWeek, deleteWeek, updateSeason };
}
function useContestants(seasonID) {
    const {
        data: contestants,
        mutate,
        error,
    } = useSWR(
        seasonID ? ['listContestants', seasonID] : null,
        (action, seasonID) => Fetch(action, { seasonID }),
        {
            fallbackData: [],
        }
    );
    console.log('useContestants contestants are', contestants);
    useEffect(() => {
        mutate();
    }, [seasonID]);
    const loading = !contestants && !error;
    async function createContestant(fields) {
        // Without the customPrefix, the storage api adds /public
        // before any s3 keys.
        //
        const uploadExt = encodeURIComponent(fields.image.name.split('.').pop());
        const image = 'uploads/show-' + Date.now() + '-' + crypto.randomUUID() + '.' + uploadExt;
        await Storage.put(image, fields.image, {
            customPrefix: {
                public: '',
            },
            contentType: fields.image.type,
        });
        mutate(async (contestants) => {
            const finalFields = {
                ...fields,
                image,
                seasonID,
                status: 'active',
                weekEvicted: 0,
                extraTags: '[]',
                averageRatings: '[]',
            };
            console.log('within mutate, contestants are', contestants);
            return [...(contestants || []), await Create('contestant', finalFields)];
        }, false);
    }
    function deleteContestant(id) {
        Delete('contestant', { id });
        mutate(
            async (contestants) => filter(contestants, (contestant) => contestant.id != id),
            false
        );
    }
    return { contestants, loading, createContestant, deleteContestant };
}

export { useShows, useShow, useSeason, useContestants, fetchShows };
