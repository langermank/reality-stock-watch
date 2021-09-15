import clsx from 'clsx';
import StockCard from 'components/StockCard';
import Button from 'components/Button';
import styles from 'styles/trade.module.scss';
import { useBackendContext } from 'backend/context';
import { useProjections } from 'backend/Games';
import { useState } from 'react';
import { omit } from 'lodash';

function Trade() {
    const { selectedSeason, user, stocks, trade } = useBackendContext();
    const { contestantIDs, contestants } = useProjections(
        selectedSeason.id,
        selectedSeason.currentWeek
    );
    const [trades, setTrades] = useState({});
    console.log(selectedSeason);
    let tradeValue = 0;
    let tradeLines = [];
    let lines = [];
    let tradeBox = <></>;
    for (let contestantID in trades) {
        const currentPrice = contestants[contestantID].currentPrice;
        const lineValue = trades[contestantID] * currentPrice;
        lines.push({
            contestantID,
            quantity: trades[contestantID],
        });
        tradeValue += lineValue;
        tradeLines.push(
            <li key={contestantID}>
                {contestants[contestantID].nickname} (
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(currentPrice)}
                ) X {trades[contestantID]}:{' '}
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(tradeValue)}
                <button onClick={() => setTrades((trades) => omit(trades, [contestantID]))}>
                    X
                </button>
            </li>
        );
    }
    const remainingCash = stocks.bankBalance - tradeValue;
    if (tradeValue) {
        tradeLines.push(
            <li key="total">
                Total:{' '}
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(tradeValue)}
            </li>
        );
        tradeBox = (
            <div className={styles.fundsWrap}>
                <div className={styles.funds}>
                    <ul>{tradeLines}</ul>
                    <p>
                        Remaining Cash:{' '}
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(remainingCash)}
                    </p>
                </div>
            </div>
        );
    }

    const stockCards = contestantIDs.map((contestantID) => {
        const price = contestants[contestantID].currentPrice;
        const shares = stocks[contestantID] || 0;
        const currentTrade = trades[contestantID] || 0;
        const adjustedShares = shares + currentTrade;
        const maxShares =
            Math.floor(remainingCash / contestants[contestantID].currentPrice) +
            shares +
            currentTrade;
        function setShares(newShares) {
            console.log('set shares', contestantID, newShares);
            setTrades({ ...trades, [contestantID]: newShares - shares });
        }
        return (
            <StockCard
                key={contestantID}
                name={contestants[contestantID].nickname}
                image={contestants[contestantID].image}
                rating={contestants[contestantID].rating}
                priceChange={contestants[contestantID].priceChange}
                price={price}
                shares={adjustedShares}
                defaultShares={shares}
                maxShares={maxShares}
                setShares={setShares}
            />
        );
    });

    return (
        <>
            <h1>Market </h1>
            <h2>
                {selectedSeason.name} week {selectedSeason.currentWeek}
            </h2>
            <h3>
                The market is {selectedSeason.marketStatus == 'open' ? 'open' : 'closed'} until{' '}
                {selectedSeason.marketStatus == 'open'
                    ? selectedSeason.nextMarketClose
                    : selectedSeason.nextMarketOpen}
            </h3>
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
                        {tradeBox}
                        <Button
                            variant="secondary"
                            disabled={selectedSeason.marketStatus !== 'open'}
                            onClick={() => trade(lines)}>
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
