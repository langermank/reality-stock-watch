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
    variant,
    icon,
    iconOnly,
    iconPosition,
    ariaLabelledById,
    className,
}) => {
    return (
        <button
            onClick={onClick}
            className={clsx(styles.btnBase, className)}
            disabled={disabled}
            aria-labelledby={ariaLabelledById}
            data-variant={variant}
            data-size={size}>
            {icon}
            {!iconOnly && [children]}
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
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small', 'large']),
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'danger',
        'primary-ghost',
        'secondary-ghost',
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
    variant: 'primary',
    icon: null,
    iconOnly: false,
    iconPosition: 'left',
    ariaLabelledById: '',
};

export default Button;
