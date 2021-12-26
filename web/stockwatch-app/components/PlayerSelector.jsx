import { useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import Input from 'components/Input';
import { useLeaderboard } from 'backend/Leaderboard';

const PlayerSelector = ({ seasonID, onSelect }) => {
    const { searchResults: players, searchTerm, setSearchTerm, setSeasonID } = useLeaderboard();
    useEffect(() => {
        setSeasonID(seasonID);
    }, [seasonID]);

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
        </>
    );
};

export default PlayerSelector;
