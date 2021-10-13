/* eslint-disable react/prop-types */

import React from 'react';

import Table from 'components/Table.jsx';
import { useLeaderboard } from 'backend/Leaderboard';

function Leaderboard() {
    const { searchResults: data } = useLeaderboard({ initialSeasonID: 'alltime' });

    if (data == null) {
        return <></>;
    }

    return (
        <>
            <Table data={data} />
        </>
    );
}

export default Leaderboard;
