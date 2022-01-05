import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../styles/components/changevisualizer.module.scss';
import { ArrowSquareUp, ArrowSquareDown } from 'phosphor-react';

const ChangeVisualizer = ({ changeIncrease, changeDecrease, label }) => {
    return (
        <span
            className={clsx(
                styles.wrap,
                changeIncrease && styles.increase,
                changeDecrease && styles.decrease
            )}>
            {changeIncrease && <ArrowSquareUp weight="fill" />}
            {changeDecrease && <ArrowSquareDown weight="fill" />}
            {label && <p>{label}</p>}
        </span>
    );
};

ChangeVisualizer.propTypes = {
    label: PropTypes.string,
    changeIncrease: PropTypes.bool,
    changeDecrease: PropTypes.bool,
};

ChangeVisualizer.defaultProps = {
    label: null,
    changeIncrease: false,
    changeDecrease: false,
};

export default ChangeVisualizer;
