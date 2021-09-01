import clsx from 'clsx';
import StockCard from '../components/StockCard';
import Button from '../components/Button';
import styles from '../styles/trade.module.scss';

function Trade() {
    return (
        <>
            <h1>Market</h1>
            <div className={styles.tradesWrap}>
                <div className={styles.stockCardsWrap}>
                    <ul className={styles.stockCards}>
                        {/* loop through stock cards */}
                        <StockCard />
                        <StockCard />
                        <StockCard />
                        <StockCard />
                        <StockCard />
                        <StockCard />
                        <StockCard />
                    </ul>
                </div>
                <div className={styles.userDetails}>
                    <div className={styles.userPanel}>
                        <div className={styles.fundsWrap}>
                            <div className={styles.funds}>
                                <p className={styles.availFunds}>Available Funds</p>
                                <h1>$200</h1>
                                <p className={styles.netWorth}>Net worth: $200</p>
                            </div>
                        </div>
                        <Button variant="secondary" disabled>
                            Submit trade
                        </Button>
                        {/* <div v-if="season.status === 'open'" classname="flex-col trade">
                        <!-- enable button when input fields become active -->
                        <button classname="button-base secondary mg-btm-sm" @click="submit" :disabled="mutableBank.money < 0">
                        <font-awesome-icon v-if="saving" icon="spinner" pull="right" pulse />
                        Submit trade
                    </button>
                    <!-- enable button when submit button becomes active -->
                    <button classname="button-base link" @click="resetAll">Reset All</button> */}
                    </div>
                    {/* <flash-message classname="alert-custom-classname"></flash-message> */}
                </div>
            </div>
        </>
    );
}

export default Trade;
