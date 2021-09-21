import clsx from 'clsx';
import StockCard from 'components/StockCard';
import Button from 'components/Button';
import styles from 'styles/trade.module.scss';
import { useBackendContext } from 'backend/context';
import { useProjections } from 'backend/Games';
import { useState } from 'react';
import { omit } from 'lodash';

function tradeParams(contestants, stocks, trades) {
    const startingBalance = stocks.bankBalance;
    let remainingBalance = startingBalance;

    let transactionLines = [];
    for (let contestantID in trades) {
        const quantity = trades[contestantID];
        const price = contestants[contestantID].currentPrice;
        const subtotal = quantity * price;
        const nickname = contestants[contestantID].nickname;

        remainingBalance -= subtotal;
        transactionLines.push({ contestantID, nickname, quantity, price, subtotal });
    }

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

function TradeBox({ remainingBalance, transactionLines, clearTrade }) {
    if (transactionLines.length == 0) {
        return <></>;
    }
    const tradeLines = transactionLines.map(
        ({ contestantID, nickname, quantity, price, subtotal }) => (
            <li key={contestantID}>
                {nickname} (
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(price)}
                ) X {quantity}:{' '}
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(subtotal)}
                <button onClick={() => clearTrade(contestantID)}>X</button>
            </li>
        )
    );
    return (
        <div className={styles.fundsWrap}>
            <div className={styles.funds}>
                <ul>{tradeLines}</ul>
                <p>
                    Remaining Cash:{' '}
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(remainingBalance)}
                </p>
            </div>
        </div>
    );
}

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
    const { selectedSeason, stocks, trade, profile } = useBackendContext();
    const { contestants } = useProjections(selectedSeason.id, selectedSeason.currentWeek);
    const [trades, setTrades] = useState({});
    const params = tradeParams(contestants, stocks, trades);

    const marketStatus = selectedSeason.marketStatus == 'open' ? 'open' : 'closed';
    const untilDate = new Date(
        marketStatus == 'open' ? selectedSeason.nextMarketClose : selectedSeason.nextMarketOpen
    );
    console.log('contestantData', params.contestantData);
    const stockCards = params.contestantData.map((contestant) => (
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
                            <div className={styles.funds}>
                                <p>{profile.displayName}</p>
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
                        <TradeBox
                            {...params}
                            clearTrade={(contestantID) =>
                                updateTrades(stocks, contestantID, 0, setTrades)
                            }
                        />
                        <Button
                            variant="secondary"
                            disabled={selectedSeason.marketStatus !== 'open'}
                            onClick={() => {
                                trade(params.transactionLines);
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
