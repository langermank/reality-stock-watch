import { useTable } from 'react-table';
import { Button, Card, Grid, Header, Input, List, Loader, Table } from 'semantic-ui-react';
import { useProfile } from '../../../../copied/ProfileBackend';
import { useTransactionsByPlayer, usePlayer } from '../../../../copied/GamesBackend';
import { useRouter } from 'next/router';

const Player = () => {
    const router = useRouter();
    const { userId, playerId } = router.query;
    const { profile } = useProfile(userId);
    const { player } = usePlayer(playerId);
    const { transactions } = useTransactionsByPlayer(playerId);
    const displayName = profile.displayName || 'Loading...';
    const netWorth = player.netWorth || '';
    const showName = player.showName || '';
    const seasonName = player.seasonName || '';
    const currentWeek = player.currentWeek || '';
    const marketStatus = player.marketStatus || '';
    const seasonId = player.seasonId || '';
    const stocks = player
        ? player.stocks.map((stock) => (
              <Card key={stock.dateTime}>
                  <Card.Content>
                      <Card.Header>{stock.contestantNickname}</Card.Header>
                      <Card.Description>
                          <List>
                              <List.Item key="shares">
                                  <List.Content>Shares: {stock.shares}</List.Content>
                              </List.Item>
                          </List>
                      </Card.Description>
                  </Card.Content>
              </Card>
          ))
        : '';

    const transactionTable = transactions
        ? transactions.map((transaction) => (
              <li key={transaction.dateTime + '-' + transaction.contestantNickname}>
                  {transaction.dateTime} {transaction.contestantNickname} {transaction.shares}{' '}
                  {transaction.price}
              </li>
          ))
        : '';

    return (
        <>
            <h2>{displayName}</h2>
            <h3>
                {showName}/{seasonName}
            </h3>
            <p>Net Worth: {netWorth}</p>
            <p>Current Week: {currentWeek}</p>
            <p>Market is {marketStatus}</p>
            <Card.Group>{stocks}</Card.Group>
            <h3>Transactions</h3>
            <ul>{transactionTable}</ul>
        </>
    );
};

export default Player;
