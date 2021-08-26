import { useRouter } from 'next/router';
import { useRatings } from 'backend/Games';
import { union, difference } from 'lodash';

const Ratings = () => {
    const router = useRouter();
    const { showId, seasonId, week } = router.query;
    const { ratings, setExtras, setRating } = useRatings(showId, seasonId, week);

    const tableHeadings = ratings.contestants.map((contestant) => (
        <th key={contestant.contestantId}>{contestant.contestantNickName}</th>
    ));
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

    const marketStatus = ratings.marketStatus ? <p>Market is open</p> : <p>Market is closed</p>;

    return (
        <>
            <h2>
                {ratings.seasonName} Week {week}
            </h2>
            {marketStatus}
            <table>
                <thead>
                    <tr key="heading">
                        <th key="rowheading"></th>
                        {tableHeadings}
                    </tr>
                    <tr key="extras">
                        <th key="rowheading">Extras</th>
                        {tableExtras}
                    </tr>
                    <tr key="available-extras">
                        <th key="rowheading"></th>
                        {tableAvailableExtras}
                    </tr>
                </thead>
                <tbody>{tableRatings}</tbody>
            </table>
        </>
    );
};

export default Ratings;
