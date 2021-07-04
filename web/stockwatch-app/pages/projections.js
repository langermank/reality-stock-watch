import clsx from 'clsx';
import { Star } from 'phosphor-react';
import styles from '../styles/projections.module.scss';

const Projections = () => {
    return (
        <div className={styles.projectionWrap}>
            <h3>Price Projections</h3>
            <div className={styles.projectionCard}>
                <div className={styles.hgDetails}>
                    <h5>Houseguest</h5>
                </div>
                <img src="/" alt="" className="hg-img" height="85" width="85" />
                <div className={styles.thisWeek}>
                    <div className={styles.thisWeekDetails}>
                        <h5>This week</h5>
                        <span className={styles.ratingWrap}>
                            <h5 className={styles.numWrap}>
                                <Star className={styles.hgStar} weight="fill" />
                                <span className={styles.hgStarRating}>5</span>
                                <span className={styles.hgStarOutOf}>/10</span>
                            </h5>
                        </span>
                        <span className={styles.priceWrap}>
                            <h5>$30</h5>
                        </span>
                    </div>
                </div>

                <div className={styles.nextWeek}>
                    <h5>Next Week</h5>
                    <dl className={styles.ratingTable}>
                        <dd>1</dd>
                        <dd>2</dd>
                        <dd>3</dd>
                        <dd>4</dd>
                        <dd>5</dd>
                        <dd>6</dd>
                        <dd>7</dd>
                        <dd>8</dd>
                        <dd>9</dd>
                        <dd>10</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>%</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                        <dd>$</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Projections;
