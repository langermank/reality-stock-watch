import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../styles/components/contestantImage.module.scss';

// pull data from contestant query
const contestantName = 'Katie';
const contestantImage = '/';

const ContestantImage = ({ aspectRatio, height, width, className, otherProps }) => {
    return (
        <img
            alt={contestantName}
            src={contestantImage}
            className={clsx(styles.contestantImage, className && className)}
            data-aspect-ratio={aspectRatio}
            height={height}
            width={width}
            {...otherProps}
        />
    );
};

ContestantImage.propTypes = {
    aspectRatio: PropTypes.oneOf(['16:9', '4:3', '1:1']),
    height: PropTypes.string,
    width: PropTypes.string,
    className: PropTypes.string,
};

ContestantImage.defaultProps = {
    aspectRatio: '1:1',
    height: null,
    width: null,
    className: null,
};

export default ContestantImage;
