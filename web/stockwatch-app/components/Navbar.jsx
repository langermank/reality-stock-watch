import Link from 'next/link';
import { useRouter } from 'next/router';
// import useStickyState from '../hooks/useStickyState';
// import useHasMounted from '../hooks/useHasMounted';
// import PanelToggle from './PanelToggle';
import NavLink from './NavLink';
import PropTypes from 'prop-types';
import { Medal, ChartPie, Coin, Diamond } from 'phosphor-react';
import styles from '../styles/navbar.module.scss';
import clsx from 'clsx';

// Force some components to be rendered client-side.
import dynamic from 'next/dynamic';
const GameMenu = dynamic(() => import('./GameMenu').then((mod) => mod.GameMenu));
const GameMenuNew = dynamic(() => import('./GameMenuNew').then((mod) => mod.GameMenuNew));
const UserMenu = dynamic(() => import('./UserMenu').then((mod) => mod.UserMenu));
const AdminInsert = dynamic(() => import('./AdminInsert').then((mod) => mod.AdminInsert));

export const Navbar = ({ className }) => {
    const PanelToggle = dynamic(() => import('../components/PanelToggle'), {
        ssr: false,
    });
    // const UserMenu = dynamic(() => import('../components/UserMenu'), {
    //     ssr: false,
    // });
    const router = useRouter();

    return (
        <>
            <nav className={clsx(styles.sidebarNav, className && className)} id="navbar">
                <ul className={styles.sidebarNavList}>
                    <li>
                        <GameMenuNew />
                    </li>
                    <li>
                        <Link href="/games" passHref>
                            <NavLink
                                icon={<Diamond weight="fill" />}
                                dataActive={router.pathname == '/games'}
                                linkText="Games"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/trade" passHref>
                            <NavLink
                                icon={<Coin />}
                                dataActive={router.pathname == '/trade'}
                                linkText="Market"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/projections" passHref>
                            <NavLink
                                icon={<ChartPie weight="fill" />}
                                dataActive={router.pathname == '/projections'}
                                linkText="Projections"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/leaderboard" passHref>
                            <NavLink
                                icon={<Medal weight="duotone" />}
                                dataActive={router.pathname == '/leaderboard'}
                                linkText="Leaderboard"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/leaderboardAllTime" passHref>
                            <NavLink
                                icon={<Medal weight="fill" />}
                                dataActive={router.pathname == '/leaderboardAllTime'}
                                linkText="Full Leaderboard"
                            />
                        </Link>
                    </li>
                    <li>
                        <UserMenu />
                    </li>
                    <AdminInsert />
                </ul>
                <PanelToggle className={styles.collapseBtn} desktopToggle />
            </nav>
        </>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

Navbar.defaultProps = {
    className: null,
};

// export default Navbar;
