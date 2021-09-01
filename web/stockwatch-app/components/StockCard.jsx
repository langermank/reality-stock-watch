import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ContestantImage from './ContestantImage';
import NumberInput from './NumberInput';
import clsx from 'clsx';
import { Star, ArrowUp } from 'phosphor-react';
import styles from '../styles/stockcard.module.scss';

const StockCard = ({}) => {
    return (
        <li className={clsx(styles.stockCard)}>
            <div className={styles.hgDetails}>
                <h4>Houseguest Name</h4>
            </div>
            <ContestantImage height="85" width="85" className={styles.hgImage} />
            <div className={styles.hgRating}>
                <span className={styles.ratingWrap}>
                    <h3 className={clsx(styles.numWrap, styles.flexRow)}>
                        <Star className={styles.hgStar} weight="fill" />
                        <span className={styles.hgStarRating}>5</span>
                        <span className={styles.hgStarOutOf}>/10</span>
                    </h3>
                </span>
            </div>
            <div className={clsx(styles.hgPrice, styles.redBg)}>
                <span className={styles.priceWrap}>
                    <h3>$10</h3>
                </span>
                <span className={clsx(styles.priceChangeWrap, styles.green)}>
                    <ArrowUp />
                    <p className={styles.priceDiff}>$0.50</p>
                </span>
            </div>
            <div className={styles.inputWrap}>
                <Button variant="primaryGhost" className={styles.sell}>
                    Sell all
                </Button>
                <NumberInput />
                <Button variant="primaryGhost" className={styles.buy}>
                    Buy all
                </Button>
            </div>
        </li>
    );
};

export default StockCard;
