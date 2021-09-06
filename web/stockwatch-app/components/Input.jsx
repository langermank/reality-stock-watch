import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../styles/components/input.module.scss';

const Input = ({ className, disabled, id, ...other }) => {
    return (
        <input className={clsx(styles.input, className)} disabled={disabled} id={id} {...other} />
    );
};

Input.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
};

Input.defaultProps = {
    className: null,
    disabled: false,
    id: '',
};

export default Input;
