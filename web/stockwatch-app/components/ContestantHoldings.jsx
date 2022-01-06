import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../styles/components/contestantholdings.module.scss';
import Card from './Card';
import ContestantImage from './ContestantImage';
import { Coin } from 'phosphor-react';

const ContestantHoldings = ({ contestantName, contestantImageSrc, quantity }) => {
    return (
        <Card variant="neutral">
            <div className={styles.contestantHoldings}>
                <ContestantImage contestantImage={contestantImageSrc} height="25" width="25" />
                <span className={styles.details}>
                    <p className="bold">{contestantName}</p>
                    <span className={styles.quantity}>
                        <p>{quantity}</p>
                        <Coin size="20" />
                    </span>
                </span>
            </div>
        </Card>
    );
};

ContestantHoldings.propTypes = {
    contestantName: PropTypes.string,
    contestantImageSrc: PropTypes.string,
    quantity: PropTypes.string,
};

ContestantHoldings.defaultProps = {
    contestantName: null,
    contestantImageSrc: null,
    quantity: null,
};

export default ContestantHoldings;
