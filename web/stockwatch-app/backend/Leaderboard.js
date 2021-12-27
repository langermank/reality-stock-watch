import { useEffect, useState } from 'react';
import { matchSorter } from 'match-sorter';
import Update from './graphql/Update';
import { leaderboardUrlPrefix } from 'backend/config.js';
import { has } from 'lodash';

function useLeaderboard({ initialSeasonID = null } = {}) {
    const [searchTerm, setSearchTerm] = useState(null);
    const [seasonID, setSeasonID] = useState(initialSeasonID);
    const [players, setPlayers] = useState(null);
    const [status, setStatus] = useState('none');
    const [timestamp, setTimestamp] = useState(0);
    const [searchResults, setSearchResults] = useState(null);

    function setError(status) {
        setStatus(status);
        setPlayers([]);
        setTimestamp(0);
    }

    async function loadLeaderboard() {
        if (!seasonID) {
            setError('none');
            return;
        }
        const response = await fetch(leaderboardUrlPrefix + seasonID + '.json', {
            cache: 'no-cache',
        });
        console.log('leaderboard repsonse', response);
        if (response.status == 404) {
            setError('not found');
            return;
        }
        if (!response.ok) {
            setError(response.status);
            return;
        }
        const data = await response.json();
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
        //
        setStatus('ok');
        setPlayers(
            data.players.map((player, i) => ({
                playerID: player[0],
                userID: player[1],
                netWorth: parseFloat(player[2]) / 100,
                bankBalance: parseFloat(player[3]) / 100,
                stocks: player[4],
                displayName: player[5],
                rank: i + 1,
            }))
        );
        setTimestamp(data.timestamp);
    }

    useEffect(() => {
        loadLeaderboard();
    }, [seasonID]);

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
        leaderboardStatus: status,
        leaderboardTimestamp: timestamp,
        generateLeaderboard,
    };
}

export { useLeaderboard };
