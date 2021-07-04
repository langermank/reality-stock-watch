import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from './Button';
import { Minus, Plus } from 'phosphor-react';
import styles from '../styles/components/input.module.scss';

const NumberInput = ({  }) => {
    return (
        <div className={styles.numInputWrap}>
            <Button icon={<Minus />} iconOnly ariaLabelledById="sell-btn" className={clsx(styles.controlBtn, styles.decrease)}>Sell</Button>
            <label for="buy-sell-input" className={styles.labelHidden}>Stock quantity field</label>
            <input className={clsx(styles.input, styles.numInput)} id="buy-sell-input"/>
            <Button icon={<Plus />} iconOnly ariaLabelledById="buy-btn" className={clsx(styles.controlBtn, styles.increase)}>Buy</Button>
        </div>
    )

}

NumberInput.propTypes = {
   
};

NumberInput.defaultProps = {
   
};

export default NumberInput;
