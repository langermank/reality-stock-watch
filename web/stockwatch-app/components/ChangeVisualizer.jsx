import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../styles/changevisualizer.module.scss';
import { ArrowSquareUp, ArrowSquareDown } from 'phosphor-react';

const ChangeVisualizer = ({ changeIncrease, changeDecrease, label }) => {
    return (
        <div>
            {changeIncrease && <ArrowSquareUp />}
            {changeDecrease && <ArrowSquareDown />}
            {label && <span>{label}</span>}
        </div>
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
