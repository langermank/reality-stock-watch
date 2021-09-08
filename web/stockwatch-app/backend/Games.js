import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Fetch from 'backend/graphql/Fetch';
import Update from 'backend/graphql/Update';
import lookup from './formulaLookup';
import { mapValues, reduce, unionBy, uniq, filter, pull } from 'lodash';

function useTransactionsByPlayer(playerID) {
    const { data, mutate, error } = useSWR(
        playerID ? ['transactionsByPlayer', playerID] : null,
        (action, playerID) => Fetch(action, { playerID }),
        {
            initialData: [],
        }
    );
    useEffect(() => {
        mutate();
    }, [playerID]);
    const loading = !data && !error;
    return { transactions: data, loading, error, mutate };
}

function usePlayer(playerID) {
    const { data, mutate, error } = useSWR(
        playerID ? ['player', playerID] : null,
        (action, playerID) => Fetch(action, { playerID }),
        {
            initialData: { stocks: [] },
        }
    );
    useEffect(() => {
        mutate();
    }, [playerID]);
    const loading = !data && !error;
    return { player: data, loading, error, mutate };
}

function useStocks(userID, seasonID) {
    const { data, mutate, error } = useSWR(
        userID && seasonID ? ['playerByUserSeason', userID, seasonID] : null,
        (action, userID, seasonID) => Fetch(action, { userID, seasonID }),
        {
            initialData: { stocks: [] },
        }
    );
    useEffect(() => {
        mutate();
    }, [userID, seasonID]);
    const loading = !data && !error;
    return { stocks: data, loading, error, mutate };
}

function useWeek(seasonId, weekNumber) {
    const { data, mutate, error } = useSWR(
        weekNumber !== undefined ? ['week', seasonId, weekNumber] : null,
        (action, seasonId, weekNumber) => Fetch(action, { seasonId, weekNumber }),
        {
            initialData: {
                weekId: null,
                seasonName: 'Loading...',
                contestantExtraTags: [],
                contestants: [],
                players: [],
                ratings: {},
            },
        }
    );
    const averages = mapValues(data.ratings, (contestantRatings) => {
        const { sum, count } = reduce(
            contestantRatings,
            ({ sum, count }, value) => ({
                sum: sum + parseFloat(value),
                count: count + 1,
            }),
            { sum: 0, count: 0 }
        );
        return Math.round((sum / count) * 100) / 100;
    });

    function setExtraTags(contestantID, extraTags) {
        const contestants = data.contestants.map((contestant) => {
            let c = { ...contestant };
            if (c.contestantID == contestantID) {
                c.extraTags = extraTags;
            }
            return c;
        });
        mutate({ ...data, contestants }, false);
        Update('weekContestants', {
            weekId: data.weekId,
            contestants: JSON.stringify(contestants),
        }).then(() => {
            mutate();
        });
    }
    function getExtraTags(contestantID) {
        for (let i in data.contestants) {
            if (data.contestants[i].contestantID == contestantID) {
                if (!data.contestants[i].extraTags) {
                    return [];
                }
                return [...data.contestants[i].extraTags];
            }
        }
    }
    function hasExtraTag(contestantID, tag) {
        return getExtraTags(contestantID).includes(tag);
    }
    function toggleExtraTag(contestantID, tag) {
        let extraTags = getExtraTags(contestantID);
        if (extraTags.includes(tag)) {
            pull(extraTags, tag);
        } else {
            extraTags.push(tag);
        }
        setExtraTags(contestantID, extraTags);
    }
    function setPlayers(players) {
        mutate({ ...data, players }, false);
        Update('weekPlayers', {
            weekId: data.weekId,
            players: JSON.stringify(players),
        }).then(() => {
            mutate();
        });
    }
    function addPlayer(playerID) {
        Fetch('playerBrief', { playerID }).then((playerBrief) => {
            const players = unionBy(
                [
                    {
                        playerDisplayName: playerBrief.displayName,
                        playerAvatarId: playerBrief.avatarID,
                        playerID: playerBrief.id,
                    },
                ],
                data.players,
                'playerID'
            );
            setPlayers(players);
        });
    }
    function removePlayer(playerID) {
        const players = filter(data.players, (player) => player.playerID != playerID);
        setPlayers(players);
    }
    function setRating(contestantID, playerID, rating) {
        const contestantRatings = { ...data.ratings[contestantID], [playerID]: rating };
        const ratings = { ...data.ratings, [contestantID]: contestantRatings };
        mutate({ ...data, ratings }, false);
        Update('weekRatings', {
            weekId: data.weekId,
            ratings: JSON.stringify(ratings),
        }).then(() => {
            mutate();
        });
    }

    if (error) {
        console.log('useWeek SWR error', error);
    }

    useEffect(() => {
        mutate();
    }, [seasonId, weekNumber]);
    const loading = !data && !error;
    return {
        week: data,
        averages,
        getExtraTags,
        setExtraTags,
        hasExtraTag,
        toggleExtraTag,
        setRating,
        setPlayers,
        addPlayer,
        removePlayer,
        loading,
        error,
        mutate,
    };
}

// Adapted directly from the original PHP.
function calculate(from, to, previousPrice, strikes) {
    /** =round(((D3*G3)*(H3*(0.9^(D3*G3))+1))*(1-(K3*(1-(0.97^(L3))))),2)
     *
     * D3 - Last Weeks Price
     * G3 - Multiplier
     * H3 - Bonus
     * K3 - Penalty
     * L3 - Strikes (weeks <= 4)
     */

    const { penalty, bonus, multiplier } = lookup(from, to);

    return (
        previousPrice *
        multiplier *
        (bonus * Math.pow(0.9, previousPrice * multiplier) + 1) *
        (1 - penalty * (1 - Math.pow(0.97, strikes)))
    );
}

function useProjections(seasonID, weekNumber) {
    const { data, mutate, error } = useSWR(
        ['prices', seasonID, weekNumber - 1, weekNumber],
        (action, seasonID, startWeekNumber, endWeekNumber) =>
            Fetch(action, { seasonID, startWeekNumber, endWeekNumber }),
        {
            initialData: [],
        }
    );
    let contestantIDs = [];
    let contestants = {};
    if (data) {
        for (let i in data) {
            const {
                week,
                contestantID,
                contestantFirstName,
                contestantLastName,
                contestantNickName,
                contestantImage,
                contestantSlug,
                contestantStatus,
                contestantWeekEvicted,
                contestantAverageRatings,
                price,
            } = data[i];
            if (
                contestantStatus == 'evicted' &&
                (Number.isNaN(contestantWeekEvicted) || contestantWeekEvicted <= weekNumber)
            ) {
                pull(contestantIDs, contestantID);
                delete contestants[contestantID];
                continue;
            }
            contestantIDs.push(contestantID);
            if (contestants[contestantID] === undefined) {
                contestants[contestantID] = {
                    firstName: contestantFirstName,
                    lastName: contestantLastName,
                    nickname: contestantNickName,
                    image: contestantImage,
                    slug: contestantSlug,
                    status: contestantStatus,
                    averageRatings: contestantAverageRatings,
                    rating: Math.round(contestantAverageRatings[weekNumber - 1]),
                    strikes: contestantAverageRatings.reduce(
                        (count, averageRating) =>
                            parseFloat(averageRating) <= 4 ? count + 1 : count,
                        0
                    ),
                };
            }
            if (week == weekNumber) {
                contestants[contestantID].currentPrice = price;
            } else {
                contestants[contestantID].previousPrice = price;
            }
            if (
                contestants[contestantID].currentPrice !== undefined &&
                contestants[contestantID].previousPrice !== undefined
            ) {
                contestants[contestantID].priceChange =
                    contestants[contestantID].currentPrice -
                    contestants[contestantID].previousPrice;
            }
        }
        for (let i in contestants) {
            let contestant = contestants[i];
            const rating = contestant.rating;
            const price = contestant.currentPrice;
            const strikes = contestant.strikes;
            contestant.projections = [
                calculate(rating, 1, price, strikes + 1),
                calculate(rating, 2, price, strikes + 1),
                calculate(rating, 3, price, strikes + 1),
                calculate(rating, 4, price, strikes + 1),
                calculate(rating, 5, price, strikes),
                calculate(rating, 6, price, strikes),
                calculate(rating, 7, price, strikes),
                calculate(rating, 8, price, strikes),
                calculate(rating, 9, price, strikes),
                calculate(rating, 10, price, strikes),
            ];
        }
    }
    useEffect(() => {
        mutate();
    }, []);
    const loading = !data && !error;
    contestantIDs = uniq(contestantIDs);
    return { contestantIDs, contestants, prices: data, loading };
}

const EMPTY_SEASON = { id: 0, shortName: 'Select Season' };
function useActiveSeasons() {
    const {
        data: activeSeasons,
        mutate: mutateActiveSeasons,
        error,
    } = useSWR(['activeSeasons'], (action) => Fetch(action, {}), {
        initialData: [],
    });
    const [selectedSeasonID, setSelectedSeasonID] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState(EMPTY_SEASON);

    useEffect(() => {
        mutateActiveSeasons();
    }, []);
    useEffect(() => {
        if (activeSeasons.length == 0) {
            setSelectedSeasonID(0);
            return;
        }
        setSelectedSeasonID(activeSeasons[0].id);
    }, [activeSeasons.length]);
    useEffect(() => {
        if (selectedSeasonID == 0) {
            setSelectedSeason(EMPTY_SEASON);
            return;
        }
        for (let i in activeSeasons) {
            if (activeSeasons[i].id == selectedSeasonID) {
                setSelectedSeason(activeSeasons[i]);
                break;
            }
        }
    }, [selectedSeasonID]);

    const loading = !activeSeasons && !error;
    return { activeSeasons, selectedSeason, selectedSeasonID, setSelectedSeasonID, loading };
}

export { useTransactionsByPlayer, usePlayer, useWeek, useProjections, useActiveSeasons, useStocks };
