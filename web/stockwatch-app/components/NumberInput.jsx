import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import Button from './Button';
import { Minus, Plus } from 'phosphor-react';
import styles from '../styles/components/input.module.scss';
import { useNumberFieldState } from '@react-stately/numberfield';
import { useNumberField } from '@react-aria/numberfield';
import { useButton } from '@react-aria/button';
import { useLocale } from '@react-aria/i18n';

function NumberField(props) {
    let { locale } = useLocale();
    let state = useNumberFieldState({ ...props, locale });
    let inputRef = React.useRef();
    let { labelProps, groupProps, inputProps, incrementButtonProps, decrementButtonProps } =
        useNumberField(props, state, inputRef);

    let { buttonProps: incrementProps } = useButton(incrementButtonProps);
    let { buttonProps: decrementProps } = useButton(decrementButtonProps);
    return (
        <div className={styles.numInputWrap} {...groupProps}>
            <Button
                variant="primary"
                icon={<Minus weight="bold" />}
                iconOnly
                ariaLabelledById="sell-btn"
                className={clsx(styles.controlBtn, styles.decrease)}
                {...decrementProps}>
                Sell
            </Button>
            <label {...labelProps} htmlFor="buy-sell-input" className={styles.labelHidden}>
                {props.label}
            </label>
            <input
                {...inputProps}
                ref={inputRef}
                className={clsx(styles.input, styles.numInput)}
                id="buy-sell-input"
            />
            <Button
                variant="primary"
                icon={<Plus weight="bold" />}
                iconOnly
                ariaLabelledById="buy-btn"
                className={clsx(styles.controlBtn, styles.increase)}
                {...incrementProps}>
                Buy
            </Button>
        </div>
    );
}

const NumberInput = ({ defaultValue }) => {
    return <NumberField label="Stock quantity field" defaultValue={defaultValue} />;
};

NumberInput.propTypes = {};

NumberInput.defaultProps = {};

export default NumberInput;

// import { useNumberFieldState } from '@react-stately/numberfield';
// import { useLocale } from '@react-aria/i18n';
// import { useButton } from '@react-aria/button';

// function NumberField(props) {
//     let { locale } = useLocale();
//     let state = useNumberFieldState({ ...props, locale });
//     let inputRef = React.useRef();
//     let { labelProps, groupProps, inputProps, incrementButtonProps, decrementButtonProps } =
//         useNumberField(props, state, inputRef);

//     let { buttonProps: incrementProps } = useButton(incrementButtonProps);
//     let { buttonProps: decrementProps } = useButton(decrementButtonProps);

//     return (
//         <div>
//             <label {...labelProps}>{props.label}</label>
//             <div {...groupProps}>
//                 <button {...decrementProps}>-</button>
//                 <input {...inputProps} ref={inputRef} />
//                 <button {...incrementProps}>+</button>
//             </div>
//         </div>
//     );
// }

// <NumberField
//     label="Price"
//     defaultValue={6}
//     formatOptions={{
//         style: 'currency',
//         currency: 'USD',
//     }}
// />;
