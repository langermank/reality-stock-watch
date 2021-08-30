import React, { useState } from 'react';

function Settings() {
    const [state, setState] = useState({ name: '' });
    return (
        <>
            <div>Test</div>
            <h2>{state.firstName}</h2>
        </>
    );
}

export default Settings;
