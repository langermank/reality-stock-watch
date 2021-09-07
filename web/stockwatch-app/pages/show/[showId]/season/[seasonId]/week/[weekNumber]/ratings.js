/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRouter } from 'next/router';
import { useWeek } from 'backend/Games';
import { union, difference } from 'lodash';
import Input from 'components/Input.jsx';
import styles from 'styles/admin-ratings.module.scss';

const Ratings = () => {
    const router = useRouter();
    const { seasonId, weekNumber } = router.query;
    const {
        week,
        averages,
        setExtraTags,
        setRating,
        addPlayer,
        removePlayer,
        hasExtraTag,
        toggleExtraTag,
    } = useWeek(seasonId, weekNumber);

    const extraItems = week.contestantExtraTags.map((name) => <span key={name}>{name}</span>);

    // const contestantHasExtraItem =

    const tableHeadings = week.players.map((player) => (
        <th key={player.playerID}>
            {player.playerDisplayName}
            {/* <button onClick={() => removePlayer(player.playerID)}>X</button> */}
        </th>
    ));
    const tableContestants = week.contestants.map((contestant) => {
        let cells = [];

        const toggleExtraItems = week.contestantExtraTags.map((name) => (
            <li
                key={name}
                onClick={() => toggleExtraTag(contestant.contestantID, name)}
                data-true={hasExtraTag(contestant.contestantID, name)}
                className={styles.extraItem}>
                {hasExtraTag(contestant.contestantID, name) ? '*' : ''} {name}
            </li>
        ));

        const extraItemMatch = contestant.extraTags.map((name) => (
            // <button
            //     key={name}
            //     onClick={() =>
            //         setExtraTags(contestant.contestantID, difference(contestant.extraTags, [name]))
            //     }>
            //     {name} -
            // </button>
            <li key={name}>{name}</li>
        ));

        const extras = contestant.extraTags.map((name) => (
            // <button
            //     key={name}
            //     onClick={() =>
            //         setExtraTags(contestant.contestantID, difference(contestant.extraTags, [name]))
            //     }>
            //     {name} -
            // </button>
            <li
                key={name}
                onClick={() => toggleExtraTag(contestant.contestantID, name)}
                // data-true={istrue}
                className={styles.extraItem}>
                {name}
            </li>
        ));
        cells.push(<td key="extras">{/* <ul>{extras}</ul> */}</td>);
        // const testFilter = extras.filter(name)
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
        cells.push(<td key="available-extras">{<span>{toggleExtraItems}</span>}</td>);
        for (let i in week.players) {
            let playerID = week.players[i].playerID;
            let contestantID = contestant.contestantID;

            if (week.ratings[contestantID] && week.ratings[contestantID][playerID]) {
                cells.push(
                    <td key={playerID}>
                        <Input
                            value={week.ratings[contestantID][playerID]}
                            onChange={(e) => setRating(contestantID, playerID, e.target.value)}
                        />
                    </td>
                );
            } else {
                cells.push(
                    <td key={playerID}>
                        <Input />
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
            {/* <ul>{testing}</ul> */}
            <h2>
                {week.seasonName} Week {weekNumber}
            </h2>
            <h3>Current week: {week.currentWeek}</h3>
            {marketStatus}
            <table className={styles.table}>
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
                <Input onChange={(e) => addPlayer(e.target.value)} placeholder="Player ID" />
            </p>
        </>
    );
};

export default Ratings;
