import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Star } from 'phosphor-react';
import styles from '../styles/components/button.module.scss';

const Button = ({
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
}) => {
    return (
        <button
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
            {icon}
            {!iconOnly && <div>{children}</div>}
            {iconOnly && (
                <div hidden id={ariaLabelledById}>
                    {children}
                </div>
            )}
        </button>
    );
};

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
    ]),
    icon: PropTypes.node,
    iconOnly: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['left', 'right', 'leftCentered', 'rightCentered']),
    ariaLabelledById: PropTypes.string,
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
};

export default Button;
