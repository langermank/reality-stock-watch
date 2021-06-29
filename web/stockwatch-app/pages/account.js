import React, { useState } from 'react';
import {
    RealityStockWatchConsumer,
    Shows,
    Seasons,
    Contestants,
} from '../copied/RealityStockWatchProvider';

function Account() {
    const [state, setState] = useState({ name: '' });
    return (
        <>
            <div>Test</div>
            <Contestants>
                <h2>{state.firstName}</h2>
            </Contestants>
        </>
    );
}

export default Account;
