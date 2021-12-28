import { useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import Input from 'components/Input';
import { useLeaderboard } from 'backend/Leaderboard';

function renderPopover(players, leaderboardTimestamp, setSearchTerm, onSelect) {
    const resultList = players ? (
        <ul>
            {players.map((player) => (
                <li key={player.playerID} onClick={() => onSelect(player.playerID)}>
                    {player.displayName}
                </li>
            ))}
        </ul>
    ) : (
        <></>
    );

    const timestamp = new Date(leaderboardTimestamp).toLocaleString();

    return (
        <>
            <Popover.Root>
                <Popover.Trigger>Add Player</Popover.Trigger>
                <Popover.Anchor />
                <Popover.Content>
                    <Popover.Close />
                    <Popover.Arrow />
                    <Input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Find Player"
                    />
                    {resultList}
                </Popover.Content>
            </Popover.Root>
            <p>Player list updated at {timestamp}.</p>
        </>
    );
}

const PlayerSelector = ({ seasonID, onSelect }) => {
    const {
        searchResults: players,
        setSearchTerm,
        setSeasonID,
        leaderboardStatus,
        leaderboardTimestamp,
        generateLeaderboard,
    } = useLeaderboard();
    useEffect(() => {
        setSeasonID(seasonID);
    }, [seasonID]);

    let popover = <p>Leaderboard error</p>;
    let button = <button onClick={generateLeaderboard}>Generate Leaderboard</button>;
    if (leaderboardStatus === 'ok') {
        popover = renderPopover(players, leaderboardTimestamp, setSearchTerm, onSelect);
    }
    if (leaderboardStatus == 403) {
        popover = <p>Season has no leaderboard.</p>;
    }
    if (leaderboardStatus == 'loading') {
        popover = <p>Generating leaderboard...</p>;
        button = <></>;
    }
    return (
        <>
            {popover}
            {button}
        </>
    );
};

export default PlayerSelector;
