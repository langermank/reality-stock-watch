import { useBackendContext } from 'backend/context';
import Button from './Button.jsx';
import NavLink from './NavLink';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Lock } from 'phosphor-react';

export const AdminInsert = () => {
    const router = useRouter();
    const { mockUser, setMockUserID, clearMockUser, isAdmin } = useBackendContext();
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
                <p>Mock user: {mockUser.displayName}</p>
                <Button onClick={() => setMockUserID(3)}>Katie Langerman</Button>
                <Button onClick={() => setMockUserID(4)}>Taran Armstrong</Button>
                <Button onClick={() => setMockUserID(430)}>kdibeck0</Button>
                <Button onClick={() => setMockUserID(1631)}>DerrellMVP</Button>
                <Button onClick={() => setMockUserID(1425)}>Brad Keffer</Button>
                <Button onClick={clearMockUser}>Clear</Button>
            </li>
        </>
    );
};
