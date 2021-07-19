import Link from 'next/link';
// import useStickyState from '../hooks/useStickyState';
// import useHasMounted from '../hooks/useHasMounted';
// import PanelToggle from './PanelToggle';
import { UserNavbar } from './UserNavbar';
import PropTypes from 'prop-types';
import { TrendUp, User, Medal } from 'phosphor-react';
import styles from '../styles/navbar.module.scss';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

export const Navbar = ({ className }) => {
    const PanelToggle = dynamic(() => import('../components/PanelToggle'), {
        ssr: false,
    });

    return (
        <>
            <nav className={clsx(styles.sidebarNav, className && className)} id="navbar">
                <ul className={styles.sidebarNavList}>
                    <li className={styles.collapseButtonWrap}>
                        <PanelToggle desktopToggle />
                    </li>
                    <UserNavbar styles={styles} />
                    <li>
                        <Link href="/projections">
                            <a className={styles.itemWrap}>
                                <TrendUp className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Projections</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/leaderboard">
                            <a className={styles.itemWrap}>
                                <Medal weight="duotone" className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Leaderboard</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a className={styles.itemWrap}>
                                <Medal weight="fill" className={styles.itemIcon} />
                                <span className={styles.itemLabel}>All time leaderboard</span>
                            </a>
                        </Link>
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
