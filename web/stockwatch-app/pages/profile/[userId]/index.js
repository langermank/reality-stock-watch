import { useEffect, useRef, useState } from 'react';
import { useTable } from 'react-table';
import { Button, Card, Grid, Header, Input, List, Loader, Table } from 'semantic-ui-react';
import { useProfile } from '../../../copied/ProfileBackend';
import { useRouter } from 'next/router';

function renderGames(games, router) {
    const { userId } = router.query;

    return games.map((game) => (
        <Card
            key={game.seasonID}
            onClick={() => {
                router.push('/profile/' + userId + '/game/' + game.playerID);
            }}>
            <Card.Content>
                <Card.Header>{game.showName}</Card.Header>
                <Card.Meta>{game.seasonName}</Card.Meta>
                <Card.Description>
                    <List>
                        <List.Item key="money">
                            <List.Icon name="money" />
                            <List.Content>Net worth: {game.netWorth}</List.Content>
                        </List.Item>
                        <List.Item key="status">
                            <List.Icon name="time" />
                            <List.Content>Status: {game.status}</List.Content>
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    ));
}

const Profile = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { profile, loading } = useProfile(userId);

    const enrolledGames =
        loading || !profile || !profile.enrolledGames ? (
            []
        ) : (
            <>
                <h2>Current Games</h2>
                <Card.Group>{renderGames(profile.enrolledGames, router)}</Card.Group>
            </>
        );
    const completedGames =
        loading || !profile || !profile.completedGames ? (
            []
        ) : (
            <>
                <h2>Past Games</h2>
                <Card.Group>{renderGames(profile.completedGames, router)}</Card.Group>
            </>
        );
    return (
        <>
            <h2>{profile.displayName}</h2>
            <p>Total Net Worth: {profile.netWorth}</p>
            {enrolledGames}
            {completedGames}
        </>
    );
};

export default Profile;
