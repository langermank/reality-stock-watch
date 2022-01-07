import React, { useState } from 'react';
import Profile from './profile/index';
import EditProfile from 'components/EditProfile';

function Settings() {
    const [state, setState] = useState({ name: '' });
    return (
        <>
            <h2>Account settings</h2>
            <EditProfile display />
        </>
    );
}

export default Settings;
