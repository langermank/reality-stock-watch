import StockCard from 'components/StockCard';
import Button from 'components/Button';
import styles from 'styles/trade.module.scss';
import { useBackendContext } from 'backend/context';
import { useProjections } from 'backend/Games';
import { useEffect, useState } from 'react';
import { omit } from 'lodash';
import TradeBox from './TradeBox';
import BankInfo from './BankInfo';

// Given a starting bank balance and a bunch of trades,
// figure out the data needed to render the contestant
// cards and trade box.
//
// Key things to calculate are the remaining bank balance
// and the maximum number of shares that can be purchased
// for each contestant.
//
function tradeBoxInfo(contestants, startingBalance, stocks, trades) {
    let remainingBalance = startingBalance;

    // Iterate over the trades and create a transaction line
    // for each (destined for the trade box). Calculate the
    // remaining balance as we go.
    let transactionLines = [];
    for (let contestantID in trades) {
        const quantity = trades[contestantID];
        const price = contestants[contestantID].currentPrice;
        const subtotal = quantity * price;
        const nickname = contestants[contestantID].nickname;

        remainingBalance -= subtotal;
        transactionLines.push({ contestantID, nickname, quantity, price, subtotal });
    }

    // Now that we have the remaining balance, we can figure out
    // the maxShares for each contestant.
    const contestantData = Object.keys(contestants).map((contestantID) => {
        const contestant = contestants[contestantID];
        const name = contestant.nickname;
        const image = contestant.image;
        const rating = contestant.rating;
        const priceChange = contestant.priceChange;
        const price = contestants[contestantID].currentPrice;
        const defaultShares = stocks[contestantID] || 0;
        const currentTrade = trades[contestantID] || 0;
        const shares = defaultShares + currentTrade;
        const maxShares = shares + Math.floor(remainingBalance / price);
        return {
            contestantID,
            name,
            image,
            rating,
            priceChange,
            price,
            shares,
            maxShares,
        };
    });

    return { startingBalance, remainingBalance, transactionLines, contestantData };
}

// Set the trades for contestantID to newQuantity.  The hook function "setTrades"
// is called, and old value of trades is replace with an updated value.
function updateTrades(stocks, contestantID, newQuantity, setTrades) {
    const shares = stocks[contestantID] || 0;
    const tradeQuantity = newQuantity - shares;
    if (tradeQuantity == 0) {
        setTrades((oldTrades) => omit(oldTrades, [contestantID]));
    } else {
        setTrades((oldTrades) => ({ ...oldTrades, [contestantID]: tradeQuantity }));
    }
}

function Trade() {
    const { selectedSeason, stocks, bankLoaded, bankBalance, netWorth, trade } =
        useBackendContext();
    const { contestants } = useProjections(selectedSeason.id, selectedSeason.currentWeek);
    const [trades, setTrades] = useState({});
    const tradeDetails = tradeBoxInfo(contestants, bankBalance, stocks, trades);

    const marketStatus = selectedSeason.marketStatus == 'open' ? 'open' : 'closed';
    const untilDate = new Date(
        marketStatus == 'open' ? selectedSeason.nextMarketClose : selectedSeason.nextMarketOpen
    );

    const stockCards = tradeDetails.contestantData.map((contestant) => (
        <StockCard
            key={contestant.contestantID}
            {...contestant}
            setShares={(newQuantity) =>
                updateTrades(stocks, contestant.contestantID, newQuantity, setTrades)
            }
        />
    ));

    return (
        <>
            <h1>Market </h1>
            <h2>
                {selectedSeason.name} week {selectedSeason.currentWeek}
            </h2>
            <h3>
                The market is {marketStatus} until{' '}
                {untilDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </h3>
            <div className={styles.tradesWrap}>
                <div className={styles.stockCardsWrap}>
                    <ul className={styles.stockCards}>{stockCards}</ul>
                </div>
                <div className={styles.userDetails}>
                    <div className={styles.userPanel}>
                        <div className={styles.fundsWrap}>
                            <BankInfo
                                className={styles.funds}
                                styles={styles}
                                bankLoaded={bankLoaded}
                                bankBalance={bankBalance}
                                netWorth={netWorth}
                            />
                        </div>
                        <TradeBox
                            className={styles.fundsWrap}
                            styles={styles}
                            {...tradeDetails}
                            clearTrade={(contestantID) =>
                                updateTrades(stocks, contestantID, 0, setTrades)
                            }
                        />
                        <Button
                            variant="secondary"
                            disabled={selectedSeason.marketStatus !== 'open'}
                            onClick={() => {
                                trade(tradeDetails.transactionLines, tradeDetails);
                                setTrades({});
                            }}>
                            Submit trade
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Trade;
