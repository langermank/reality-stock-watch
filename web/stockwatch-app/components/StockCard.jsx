import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import NumberInput from './NumberInput';
import clsx from 'clsx';
import { Star, ArrowUp } from 'phosphor-react';
import styles from '../styles/stockcard.module.scss';
// import cardStyles from '../styles/components/card.module.scss';

const StockCard = ({}) => {
    return (
        <li
            className={clsx(styles.stockCard)}
            // v-bind:class="[stock.houseguest.status === 'active' ? '' : 'inactive']"
        >
            <div className={styles.hgDetails}>
                <h4>Houseguest Name</h4>
            </div>
            <img src="/" height="85" width="85" className={styles.hgImage} alt="" />
            <div className={styles.hgRating}>
                <span className={styles.ratingWrap}>
                    <h3 className={clsx(styles.numWrap, styles.flexRow)}>
                        <Star className={styles.hgStar} weight="fill" />
                        <span className={styles.hgStarRating}>5</span>
                        <span className={styles.hgStarOutOf}>/10</span>
                    </h3>
                </span>
            </div>
            <div className={styles.hgPrice}>
                <span className={styles.priceWrap}>
                    <h3>$10</h3>
                </span>
                <span className={styles.priceChangeWrap}>
                    <ArrowUp />
                    <p className={styles.priceDiff}>$5</p>
                </span>
            </div>
            <div className={styles.inputWrap}>
                <Button variant="primary-ghost" className={styles.sell}>Sell all</Button>
                <NumberInput />
                <Button variant="primary-ghost" className={styles.buy}>Buy all</Button>
            </div>
        </li>
    );
};

export default StockCard;
