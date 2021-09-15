import Link from 'next/link';
import { useRouter } from 'next/router';
// import useStickyState from '../hooks/useStickyState';
// import useHasMounted from '../hooks/useHasMounted';
// import PanelToggle from './PanelToggle';
import { UserMenu } from './UserMenu';
import { MockUser } from './MockUser';
import NavLink from './NavLink';
import PropTypes from 'prop-types';
import { Medal, ChartPie, Coin, Lock, Diamond } from 'phosphor-react';
import styles from '../styles/navbar.module.scss';
import clsx from 'clsx';

import dynamic from 'next/dynamic';

export const NavbarLanding = ({ className }) => {
    const PanelToggle = dynamic(() => import('../components/PanelToggle'), {
        ssr: false,
    });
    const router = useRouter();

    return (
        <>
            <nav className={clsx(styles.sidebarNav, className && className)} id="navbar">
                <ul className={styles.sidebarNavList}>
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
                        <UserMenu />
                    </li>
                </ul>
                <PanelToggle className={styles.collapseBtn} desktopToggle />
            </nav>
        </>
    );
};

NavbarLanding.propTypes = {
    className: PropTypes.string,
};

NavbarLanding.defaultProps = {
    className: null,
};

// export default Navbar;
