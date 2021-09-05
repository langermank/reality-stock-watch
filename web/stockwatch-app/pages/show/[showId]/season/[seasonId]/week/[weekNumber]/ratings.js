import { useRouter } from 'next/router';
import { useWeek } from 'backend/Games';
import { union, difference } from 'lodash';

const Ratings = () => {
    const router = useRouter();
    const { seasonId, weekNumber } = router.query;
    const { week, averages, setExtraTags, setRating, addPlayer, removePlayer } = useWeek(
        seasonId,
        weekNumber
    );
    const tableHeadings = week.players.map((player) => (
        <th key={player.playerID}>
            {player.playerDisplayName}
            <button onClick={() => removePlayer(player.playerID)}>X</button>
        </th>
    ));
    const tableContestants = week.contestants.map((contestant) => {
        let cells = [];
        const extras = contestant.extraTags.map((name) => (
            <button
                key={name}
                onClick={() =>
                    setExtraTags(contestant.contestantID, difference(contestant.extraTags, [name]))
                }>
                {name} -
            </button>
        ));
        cells.push(<td key="extras">{extras}</td>);
        const availableExtras = difference(week.contestantExtraTags, contestant.extraTags).map(
            (name) => (
                <button
                    key={name}
                    onClick={() =>
                        setExtraTags(contestant.contestantID, union(contestant.extraTags, [name]))
                    }>
                    {name} +
                </button>
            )
        );
        cells.push(<td key="available-extras">{availableExtras}</td>);
        for (let i in week.players) {
            let playerID = week.players[i].playerID;
            let contestantID = contestant.contestantID;

            if (week.ratings[contestantID] && week.ratings[contestantID][playerID]) {
                cells.push(
                    <td key={playerID}>
                        <input
                            value={week.ratings[contestantID][playerID]}
                            onChange={(e) => setRating(contestantID, playerID, e.target.value)}
                        />
                    </td>
                );
            } else {
                cells.push(
                    <td key={playerID}>
                        <input />
                    </td>
                );
            }
        }
        cells.push(<td key="average">{averages[contestant.contestantID]}</td>);
        return (
            <tr key={contestant.contestantID}>
                <th>{contestant.contestantNickName}</th>
                {cells}
            </tr>
        );
    });
    const marketStatus = week.marketStatus ? <p>Market is open</p> : <p>Market is closed</p>;
    return (
        <>
            <h2>
                {week.seasonName} Week {weekNumber}
            </h2>
            <h3>Current week: {week.currentWeek}</h3>
            {marketStatus}
            <table>
                <thead>
                    <tr key="heading">
                        <th key="rowheading"></th>
                        <th key="extras">Extras</th>
                        <th key="actions">Actions</th>
                        {tableHeadings}
                        <th key="average">Average</th>
                    </tr>
                </thead>
                <tbody>{tableContestants}</tbody>
            </table>
            <p>
                Add player:
                <input onChange={(e) => addPlayer(e.target.value)} placeholder="Player ID" />
            </p>
        </>
    );
};

export default Ratings;
