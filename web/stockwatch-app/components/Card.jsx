import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../styles/components/card.module.scss';

const Card = ({ children, variant, fillType, spacing }) => {
    return (
        <div
            className={clsx(styles.card)}
            data-variant={variant}
            data-spacing={spacing}
            data-fill={fillType}>
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    variant: PropTypes.oneOf(['positive', 'negative', 'neutral', 'information', 'warning']),
    fillType: PropTypes.oneOf(['solid', 'inverse']),
    spacing: PropTypes.oneOf(['default', 'compact']),
};

Card.defaultProps = {
    children: null,
    variant: 'primary',
    fillType: 'inverse',
    spacing: 'default',
};

export default Card;
