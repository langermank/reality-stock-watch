import PropTypes from 'prop-types';
import Button from './Button';
import ContestantImage from './ContestantImage';
import NumberInput from './NumberInput';
import clsx from 'clsx';
import { Star, ArrowUp, ArrowDown } from 'phosphor-react';
import styles from '../styles/stockcard.module.scss';

// FIXME: make configurable
const imageUrlPrefix = 'https://dsw9arc6h9tqj.cloudfront.net';

const StockCard = ({ name, image, rating, price, priceChange, shares, maxShares, setShares }) => {
    return (
        <li className={clsx(styles.stockCard)}>
            <div className={styles.hgDetails}>
                <h3>{name}</h3>
            </div>
            <ContestantImage
                height="85"
                width="85"
                contestantName={name}
                contestantImage={imageUrlPrefix + image}
                className={styles.hgImage}
            />
            <div className={styles.hgRating}>
                <span className={styles.ratingWrap}>
                    <span className={clsx(styles.numWrap, styles.flexRow)}>
                        <Star className={styles.hgStar} weight="fill" />
                        <span className={styles.hgStarRating}>{rating}</span>
                        <span className={styles.hgStarOutOf}>/10</span>
                    </span>
                </span>
            </div>
            <div className={clsx(styles.hgPrice, priceChange > 0 ? styles.greenBg : styles.redBg)}>
                <span className={styles.priceWrap}>
                    <h3>
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(price)}
                    </h3>
                </span>
                <span className={clsx(styles.priceChangeWrap, styles.green)}>
                    {priceChange > 0 ? <ArrowUp /> : <ArrowDown />}
                    <p className={styles.priceDiff}>
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(priceChange)}
                    </p>
                </span>
            </div>
            <div className={styles.inputWrap}>
                <Button
                    disabled={shares <= 0}
                    variant="primaryGhost"
                    className={styles.sell}
                    onClick={() => setShares(0)}>
                    Sell all
                </Button>
                <NumberInput
                    value={shares}
                    minValue={0}
                    maxValue={maxShares}
                    onChange={(shares) => setShares(shares)}
                />
                <Button
                    disabled={maxShares <= shares}
                    variant="primaryGhost"
                    className={styles.buy}
                    onClick={() => setShares(maxShares)}>
                    Buy all
                </Button>
            </div>
        </li>
    );
};

StockCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    priceChange: PropTypes.number,
    shares: PropTypes.number,
    maxShares: PropTypes.number,
    setShares: PropTypes.func,
};

StockCard.defaultProps = {
    name: 'Contestant',
    image: '',
    rating: '7',
    price: '4.50',
    priceChange: '2',
    shares: '3',
    maxShares: '5',
};

export default StockCard;
