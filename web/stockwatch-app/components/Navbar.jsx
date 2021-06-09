import Link from 'next/link';
import { useState } from 'react';
import { House } from 'phosphor-react';
import PropTypes from 'prop-types';
import styles from '../styles/navbar.module.scss';
import clsx from 'clsx';

export const Navbar = ({ className }) => {
    // const [active, setActive] = useState(false);

    // const handleClick = () => {
    //     setActive(!active);
    // };

    return (
        <>
            <nav className={clsx(styles.sidebarNav, styles.open, className && className)}>
                <Link href="/">
                    <a className="">
                        <House />
                        <span className="">Home</span>
                    </a>
                </Link>
                <ul>
                    <li>
                        <Link href="/account">
                            <a className="">Account</a>
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
