import Link from 'next/link';
import { House } from 'phosphor-react';
// import useStickyState from '../hooks/useStickyState';
// import useHasMounted from '../hooks/useHasMounted';
// import PanelToggle from './PanelToggle';
import PropTypes from 'prop-types';
import { ArrowLineLeft, ArrowLineRight } from 'phosphor-react';
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
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Dashboard</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Trade</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Stocks</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Projections</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Leaderboard</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Account</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>All time leaderboard</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Admin</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>FAQ</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className={styles.itemWrap}>
                                <House className={styles.itemIcon} />
                                <span className={styles.itemLabel}>Login</span>
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
