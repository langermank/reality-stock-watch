import { useState, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Star } from 'phosphor-react';
import styles from '../styles/components/button.module.scss';

const Button = React.forwardRef(
    (
        {
            onClick,
            disabled,
            children,
            size,
            width,
            variant,
            icon,
            iconOnly,
            iconPosition,
            ariaLabelledById,
            className,
            id,
            ...other
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                className={clsx(styles.btnBase, className)}
                disabled={disabled}
                aria-labelledby={ariaLabelledById}
                data-variant={variant}
                data-size={size}
                data-icon-position={!iconOnly && iconPosition}
                data-width={!iconOnly && width}
                id={id}
                {...other}>
                {icon && <div className={styles.btnIcon}>{icon}</div>}
                {!iconOnly && <div className={styles.btnChildren}>{children}</div>}
                {iconOnly && (
                    <div hidden id={ariaLabelledById}>
                        {children}
                    </div>
                )}
            </button>
        );
    }
);

Button.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small', 'large']),
    width: PropTypes.oneOf(['default', 'fullWidth']),
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'secondaryHint',
        'danger',
        'primaryGhost',
        'secondaryGhost',
        'outline',
        'unstyled',
    ]),
    icon: PropTypes.node,
    iconOnly: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['left', 'right', 'leftCentered', 'rightCentered']),
    ariaLabelledById: PropTypes.string,
    // ref: PropTypes.string,
};

Button.defaultProps = {
    className: null,
    children: null,
    disabled: false,
    size: 'default',
    width: 'default',
    variant: 'primary',
    icon: null,
    iconOnly: false,
    iconPosition: 'left',
    ariaLabelledById: '',
    id: '',
    // ref: null,
};

export default Button;

Button.displayName = 'Button';
