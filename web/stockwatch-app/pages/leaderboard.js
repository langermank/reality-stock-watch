/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';

import Table from 'components/Table.jsx';
import { useLeaderboard } from 'backend/Leaderboard';
import { useBackendContext } from 'backend/context';

function Leaderboard() {
    const { selectedSeason } = useBackendContext();
    const { searchResults: data, setSeasonID, selectWeek, selectedWeek } = useLeaderboard();

    useEffect(() => {
        setSeasonID(selectedSeason.id);
    }, [selectedSeason.id]);

    useEffect(() => {
        selectWeek(selectedSeason.currentWeek);
    }, [selectedSeason.currentWeek]);

    if (selectedSeason.id == 0 || data == null) {
        return <></>;
    }

    return (
        <>
            <Table
                data={data}
                numWeeks={selectedSeason.currentWeek}
                selectWeek={selectWeek}
                selectedWeek={selectedWeek}
            />
        </>
    );
}

export default Leaderboard;
