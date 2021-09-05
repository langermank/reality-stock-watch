/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../styles/components/navbarLink.module.scss';

const NavLink = React.forwardRef(
    ({ className, icon, href, dataActive, linkText, alwaysVisible }, ref) => {
        return (
            <a
                className={clsx(styles.linkWrap, className)}
                ref={ref}
                href={href}
                data-active={dataActive}>
                {icon}
                <span className={styles.linkLabel} data-visible={alwaysVisible}>
                    {linkText}
                </span>
            </a>
        );
    }
);

NavLink.propTypes = {
    icon: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.node,
    dataActive: PropTypes.bool,
    linkText: PropTypes.string,
    alwaysVisible: PropTypes.bool,
};

NavLink.defaultProps = {
    icon: null,
    className: null,
    href: null,
    dataActive: false,
    linkText: 'Linky link',
    alwaysVisible: null,
};

export default NavLink;
