import { useRouter } from 'next/router';
import { useWeek } from 'backend/Games';
import { union, difference } from 'lodash';

const Ratings = () => {
    const router = useRouter();
    const { seasonId, weekNumber } = router.query;
    const { week, setExtras, setRating } = useWeek(seasonId, weekNumber);

    /*
    const tableExtras = ratings.contestants.map((contestant) => {
        const extras = contestant.contestantExtraTags.map((name) => (
            <button
                key={name}
                onClick={setExtras(
                    contestant.contestantId,
                    difference(contestant.contestantExtraTags, [name])
                )}>
                {name} -
            </button>
        ));
        return <td key={contestant.contestantId}>{extras}</td>;
    });
    const tableAvailableExtras = ratings.contestants.map((contestant) => {
        const extras = difference(ratings.contestantExtraTags, contestant.contestantExtraTags).map(
            (name) => (
                <button
                    key={name}
                    onClick={setExtras(
                        contestant.contestantId,
                        union(contestant.contestantExtraTags, [name])
                    )}>
                    {name} +
                </button>
            )
        );
        return <td key={contestant.contestantId}>{extras}</td>;
    });
    const tableRatings = ratings.players.map((player) => {
        const cells = ratings.contestants.map((contestant) => {
            const val = ratings.ratings[player.playerId][contestant.contestantId] || 0;
            return (
                <td key={contestant.contestantId}>
                    <input defaultValue={val} />
                </td>
            );
        });
        return (
            <tr key={player.playerId}>
                <th key="rowheading">{player.playerDisplayName}</th>
                {cells}
            </tr>
        );
    });
*/
    const tableHeadings = week.players.map((player) => (
        <th key={player.playerID}>{player.playerDisplayName}</th>
    ));

    const tableContestants = week.contestants.map((contestant) => {
        let cells = [];

        const extras = contestant.extraTags.map((name) => (
            <button
                key={name}
                onClick={setExtras(
                    contestant.contestantId,
                    difference(contestant.extraTags, [name])
                )}>
                {name} -
            </button>
        ));
        cells.push(<td key="extras">{extras}</td>);

        const availableExtras = difference(week.contestantExtraTags, contestant.extraTags).map(
            (name) => (
                <button
                    key={name}
                    onClick={setExtras(
                        contestant.contestantId,
                        union(contestant.extraTags, [name])
                    )}>
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
                        <input defaultValue={week.ratings[contestantID][playerID]} />
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
                    </tr>
                </thead>
                <tbody>{tableContestants}</tbody>
            </table>
        </>
    );
};

export default Ratings;
