/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';

import Table from 'components/Table.jsx';
import { useLeaderboard } from 'backend/Leaderboard';
import { useBackendContext } from 'backend/context';

function Leaderboard() {
    const { selectedSeason } = useBackendContext();
    const { searchResults: data, setSeasonID } = useLeaderboard();

    useEffect(() => {
        setSeasonID(selectedSeason.id);
    }, [selectedSeason.id]);

    if (selectedSeason.id == 0 || data == null) {
        return <></>;
    }

    return (
        <>
            <Table data={data} />
        </>
    );
}

export default Leaderboard;
