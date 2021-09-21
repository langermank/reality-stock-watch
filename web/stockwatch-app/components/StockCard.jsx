import PropTypes from 'prop-types';
import Button from './Button';
import ContestantImage from './ContestantImage';
import NumberInput from './NumberInput';
import clsx from 'clsx';
import { Star, ArrowUp, ArrowDown } from 'phosphor-react';
import styles from 'styles/stockcard.module.scss';

// FIXME: make configurable
const imageUrlPrefix = 'https://dsw9arc6h9tqj.cloudfront.net';

const StockCard = ({ name, image, rating, price, priceChange, shares, maxShares, setShares }) => {
    console.log('stock card name', name, 'value', shares);
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

export default StockCard;
