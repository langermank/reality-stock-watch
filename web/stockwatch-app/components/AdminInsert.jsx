import { useBackendContext } from 'backend/context';
import Button from './Button.jsx';
import NavLink from './NavLink';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Lock } from 'phosphor-react';

export const AdminInsert = () => {
    const router = useRouter();
    const { profile, clearMockUser, setMockUserEmail, isAdmin } = useBackendContext();
    console.log('in admininsert profile is ', profile);
    if (!isAdmin) {
        return <></>;
    }
    return (
        <>
            <li>
                <Link href="/admin" passHref>
                    <NavLink
                        icon={<Lock weight="fill" />}
                        dataActive={router.pathname == '/admin'}
                        linkText="Admin"
                    />
                </Link>
            </li>
            <li>
                <p>Mock user: {profile.displayName}</p>
                <Button onClick={() => setMockUserEmail('langermank@gmail.com')}>
                    Katie Langerman
                </Button>
                <Button onClick={() => setMockUserEmail('armstrongtaran@gmail.com')}>
                    Taran Armstrong
                </Button>
                <Button onClick={() => setMockUserEmail('stocktonapt1@gmail.com')}>kdibeck0</Button>
                <Button onClick={() => setMockUserEmail('jtspark98@gmail.com')}>DerrellMVP</Button>
                <Button onClick={() => setMockUserEmail('kefferbrad@gmail.com')}>
                    Brad Keffer
                </Button>
                <Button onClick={clearMockUser}>Clear</Button>
            </li>
        </>
    );
};
