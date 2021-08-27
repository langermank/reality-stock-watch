import Link from 'next/link';
import { useRouter } from 'next/router';
// import useStickyState from '../hooks/useStickyState';
// import useHasMounted from '../hooks/useHasMounted';
// import PanelToggle from './PanelToggle';
import { UserNavbar } from './UserNavbar';
import { UserMenu } from './UserMenu';
import NavLink from './NavLink';
import PropTypes from 'prop-types';
import { TrendUp, User, Medal, ChartPie, Coin } from 'phosphor-react';
import styles from '../styles/navbar.module.scss';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

export const Navbar = ({ className }) => {
    const PanelToggle = dynamic(() => import('../components/PanelToggle'), {
        ssr: false,
    });
    const router = useRouter();

    return (
        <>
            <nav className={clsx(styles.sidebarNav, className && className)} id="navbar">
                <ul className={styles.sidebarNavList}>
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
                    <li className={styles.collapseButtonWrap}>
                        <PanelToggle desktopToggle />
                    </li>
                </ul>
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
