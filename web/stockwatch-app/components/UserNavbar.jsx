import PropTypes from 'prop-types';
import { useUser } from '../copied/RealityStockWatchBackend';
import Link from 'next/link';
import { House, Coin, Lock, User } from 'phosphor-react';

export const UserNavbar = ({ className, styles }) => {
    const { user, toggleLogin } = useUser();
    if (!user || !user.loggedIn) {
        return (
            <li>
                <button className={className} onClick={toggleLogin}>
                    Login
                </button>
            </li>
        );
    }

    return (
        <>
            <li>
                <Link href="/dashboard">
                    <a className={styles.itemWrap}>
                        <House className={styles.itemIcon} />
                        <span className={styles.itemLabel}>Dashboard</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/trade">
                    <a className={styles.itemWrap}>
                        <Coin weight="duotone" className={styles.itemIcon} />
                        <span className={styles.itemLabel}>Trade</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/account">
                    <a className={styles.itemWrap}>
                        <User className={styles.itemIcon} />
                        <span className={styles.itemLabel}>{user.username}</span>
                    </a>
                </Link>
                <button className={className} onClick={toggleLogin}>
                    Logout
                </button>
            </li>
            <li>
                <Link href="/">
                    <a className={styles.itemWrap}>
                        <Lock className={styles.itemIcon} />
                        <span className={styles.itemLabel}>Admin</span>
                    </a>
                </Link>
            </li>
            <li>
                <hr />
            </li>
        </>
    );
};

UserNavbar.propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
};
