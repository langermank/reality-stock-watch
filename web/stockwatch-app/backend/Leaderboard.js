import { useEffect, useState } from 'react';
import { matchSorter } from 'match-sorter';
import Update from './graphql/Update';
import { leaderboardUrlPrefix } from 'backend/config.js';
import { has } from 'lodash';

function useLeaderboard({ initialSeasonID = null, initialWeek = 0 } = {}) {
    const [searchTerm, setSearchTerm] = useState(null);
    const [seasonID, setSeasonID] = useState(initialSeasonID);
    const [selectedWeek, selectWeek] = useState(initialWeek);
    const [players, setPlayers] = useState(null);
    const [status, setStatus] = useState('none');
    const [timestamp, setTimestamp] = useState(0);
    const [searchResults, setSearchResults] = useState(null);

    function setError(status) {
        setStatus(status);
        setPlayers([]);
        setTimestamp(0);
    }

    async function fetchLeaderboard(seasonID, selectedWeek) {
        const response = await fetch(
            leaderboardUrlPrefix + seasonID + '-' + selectedWeek + '.json',
            {
                cache: 'no-cache',
            }
        );
        console.log('leaderboard repsonse', response);
        if (response.status == 404) {
            setError('not found');
            return null;
        }
        if (!response.ok) {
            setError(response.status);
            return null;
        }
        return await response.json();
    }

    async function loadLeaderboard() {
        if (!seasonID) {
            setError('none');
            return;
        }
        const data = await fetchLeaderboard(seasonID, selectedWeek);
        console.log('leaderboard data', data);
        if (!has(data, 'players')) {
            console.log('Bug out! missing players!');
            return;
        }

        // To reduce file size, the data comes as an array rather than an object:
        // Array elements:
        //  0 playerID
        //  1 userID
        //  2 netWorth
        //  3 bankBalance
        //  4 stocks
        //  5 displayName
        //  6 badges
        //

        // If this is week 2+, then we need to fetch the previous week.
        const compareWeeks = selectedWeek > 1;
        const previousWeekData = {};
        if (compareWeeks) {
            const prevData = await fetchLeaderboard(seasonID, selectedWeek - 1);
            for (let i in prevData.players) {
                const player = prevData.players[i];
                previousWeekData[player[0]] = {
                    netWorth: parseFloat(player[2]) / 100,
                    bankBalance: parseFloat(player[3]) / 100,
                    rank: i + 1,
                };
            }
        }

        setStatus('ok');
        setPlayers(
            data.players.map((player, i) => {
                const playerID = player[0];
                const netWorth = parseFloat(player[2]) / 100;
                const bankBalance = parseFloat(player[3]) / 100;
                const rank = i + 1;
                const netWorthChange = compareWeeks
                    ? netWorth - previousWeekData[playerID].netWorth
                    : 0;
                const bankBalanceChange = compareWeeks
                    ? bankBalance - previousWeekData[playerID].bankBalance
                    : 0;
                const rankChange = compareWeeks ? rank - previousWeekData[playerID].rank : 0;
                return {
                    playerID,
                    userID: player[1],
                    netWorth,
                    bankBalance,
                    rank,
                    netWorthChange,
                    bankBalanceChange,
                    rankChange,
                    stocks: player[4],
                    displayName: player[5],
                    badges: JSON.parse(player[6]),
                };
            })
        );
        setTimestamp(data.timestamp);
    }

    useEffect(() => {
        loadLeaderboard();
    }, [seasonID, selectedWeek]);

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults(players);
            return;
        }
        const searchResults = matchSorter(players, searchTerm, { keys: ['displayName'] });
        // console.log('search results are ', searchResults);
        setSearchResults(searchResults);
    }, [players, searchTerm]);

    function generateLeaderboard() {
        setStatus('loading');
        Update('generateLeaderboard', { seasonID }).then(() => {
            loadLeaderboard();
        });
    }

    return {
        searchResults,
        searchTerm,
        setSearchTerm,
        setSeasonID,
        selectWeek,
        selectedWeek,
        leaderboardStatus: status,
        leaderboardTimestamp: timestamp,
        generateLeaderboard,
    };
}

export { useLeaderboard };
