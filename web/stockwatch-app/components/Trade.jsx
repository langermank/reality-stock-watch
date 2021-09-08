import clsx from 'clsx';
import StockCard from 'components/StockCard';
import Button from 'components/Button';
import styles from 'styles/trade.module.scss';
import { useBackendContext } from 'backend/context';
import { useProjections } from 'backend/Games';

function Trade() {
    const { selectedSeason, user, stocks } = useBackendContext();
    const { contestantIDs, contestants } = useProjections(
        selectedSeason.id,
        selectedSeason.currentWeek
    );
    const stockCards = contestantIDs.map((contestantID) => (
        <StockCard
            key={contestantID}
            name={contestants[contestantID].nickname}
            image={contestants[contestantID].image}
            rating={contestants[contestantID].rating}
            priceChange={contestants[contestantID].priceChange}
            price={contestants[contestantID].currentPrice}
            shares={stocks[contestantID] || 0}
        />
    ));

    return (
        <>
            <h1>Market </h1>
            <h2>
                {selectedSeason.name} week {selectedSeason.currentWeek}
            </h2>
            <div className={styles.tradesWrap}>
                <div className={styles.stockCardsWrap}>
                    <ul className={styles.stockCards}>{stockCards}</ul>
                </div>
                <div className={styles.userDetails}>
                    <div className={styles.userPanel}>
                        <div className={styles.fundsWrap}>
                            <div className={styles.funds}>
                                <p>{user.displayName}</p>
                                <p className={styles.availFunds}>Available Funds</p>
                                <h1>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(stocks.bankBalance)}
                                </h1>
                                <p className={styles.netWorth}>
                                    Net worth:{' '}
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(stocks.netWorth)}
                                </p>
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
