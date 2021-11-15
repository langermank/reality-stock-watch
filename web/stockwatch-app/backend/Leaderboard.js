import { useEffect, useState } from 'react';
import { matchSorter } from 'match-sorter';

function useLeaderboard({ initialSeasonID = null } = {}) {
    const [searchTerm, setSearchTerm] = useState(null);
    const [seasonID, setSeasonID] = useState(initialSeasonID);
    const [data, setData] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        if (!seasonID) {
            setData([]);
            return;
        }
        fetch(
            'https://realitystockwatch-showassets113746-dev.s3.amazonaws.com/leaderboard/leaderboard-' +
                seasonID +
                '.json'
        )
            .then((response) => response.json())
            .then((data) => {
                // To reduce file size, the data comes as an array rather than an object:
                // Array elements:
                //  0 playerID
                //  1 userID
                //  2 netWorth
                //  3 bankBalance
                //  4 stocks
                //  5 displayName
                //
                const dataObject = data.map((item, i) => ({
                    playerID: item[0],
                    userID: item[1],
                    netWorth: parseFloat(item[2]) / 100,
                    bankBalance: parseFloat(item[3]) / 100,
                    stocks: item[4],
                    displayName: item[5],
                    rank: i + 1,
                }));
                setData(dataObject);
            });
    }, [seasonID]);

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults(data);
            return;
        }
        const searchResults = matchSorter(data, searchTerm, { keys: ['displayName'] });
        // console.log('search results are ', searchResults);
        setSearchResults(searchResults);
    }, [data, searchTerm]);

    return { searchResults, searchTerm, setSearchTerm, setSeasonID };
}

export { useLeaderboard };
