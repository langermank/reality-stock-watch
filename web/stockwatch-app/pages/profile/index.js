import { useBackendContext } from 'backend/context';
import { useState, useEffect } from 'react';

const Profile = () => {
    const { profile, updateDisplayName } = useBackendContext();
    const [displayName, setDisplayName] = useState(profile.displayName);
    const disabled = displayName == profile.displayName || /\s/g.test(displayName);
    useEffect(() => {
        setDisplayName(profile.displayName);
    }, [profile.displayName]);
    return (
        <>
            <p>Please choose an alias that doesn&apos;t have spaces.</p>
            <p>
                Choose your alias:{' '}
                <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </p>
            <button disabled={disabled} onClick={() => updateDisplayName(displayName)}>
                Submit
            </button>
        </>
    );
};

export default Profile;
