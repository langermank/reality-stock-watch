/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useBackendContext } from 'backend/context';
import { useRouter } from 'next/router';
import { useWeek } from 'backend/Games';
import Input from 'components/Input.jsx';
import Button from 'components/Button.jsx';
import { Check, CaretDown } from 'phosphor-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import styles from 'styles/admin-ratings.module.scss';
import dropdownStyles from 'styles/components/dropdown.module.scss';
import buttonStyles from 'styles/components/button.module.scss';
import PlayerSelector from 'components/PlayerSelector';

const Ratings = () => {
    const { isAdmin } = useBackendContext();
    const router = useRouter();
    const { seasonID, weekNumber } = router.query;
    const { week, setRating, addPlayer, removePlayer, hasExtraTag, toggleExtraTag, makeCurrent } =
        useWeek(seasonID, weekNumber);
    const canEdit = isAdmin && week.currentWeek < weekNumber;
    console.log('players', week);
    const tableHeadings = week.players.map((player) => (
        <th key={player.playerID}>
            {player.playerDisplayName}
            {/* <button onClick={() => removePlayer(player.playerID)}>X</button> */}
        </th>
    ));
    const tableContestants = week.contestants.map((contestant) => {
        let cells = [];
        console.log('conestant is', contestant);
        const extraItemsDropdown = canEdit ? (
            <td key="extras">
                <DropdownMenu.Root key={contestant.id}>
                    <DropdownMenu.Trigger
                        className={clsx(
                            dropdownStyles.dropdownTrigger,
                            buttonStyles.btnBase,
                            buttonStyles.btnIcon,
                            dropdownStyles.dropdownTriggerCustom
                        )}>
                        <CaretDown className={dropdownStyles.dropdownTriggerIcon} />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        className={clsx(
                            dropdownStyles.dropdownMenu,
                            dropdownStyles.dropdownMenuCustom
                        )}>
                        {week.contestantExtraTags.map((name) => (
                            <DropdownMenu.CheckboxItem
                                key={name}
                                checked={hasExtraTag(contestant.id, name)}
                                onCheckedChange={() => toggleExtraTag(contestant.id, name)}>
                                <DropdownMenu.ItemIndicator>
                                    <Check className={dropdownStyles.checkmark} />
                                </DropdownMenu.ItemIndicator>
                                {name}
                            </DropdownMenu.CheckboxItem>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </td>
        ) : (
            ''
        );

        const extraItemTag = week.contestantExtraTags.map(
            (name) =>
                hasExtraTag(contestant.id, name) && (
                    <span key={name} className={styles.extraItemTag}>
                        {name}
                    </span>
                )
        );

        cells.push(extraItemsDropdown);

        let ratingsSum = 0;
        let ratingsCount = 0;
        for (let i in week.players) {
            const playerID = week.players[i].playerID;
            const contestantID = contestant.id;
            let rating = '';
            if (week.ratings[contestantID] && week.ratings[contestantID][playerID]) {
                rating = parseFloat(week.ratings[contestantID][playerID]);
                ratingsSum += rating;
                ratingsCount++;
            }
            if (canEdit) {
                cells.push(
                    <td key={playerID}>
                        <Input
                            value={rating}
                            onChange={(e) => setRating(contestantID, playerID, e.target.value)}
                        />
                    </td>
                );
            } else {
                cells.push(<td key={playerID}>{rating}</td>);
            }
        }
        const average = ratingsCount ? Math.round((ratingsSum * 10) / ratingsCount) / 10 : '';
        cells.push(<td key="average">{average}</td>);
        return (
            <tr key={contestant.contestantID} className={styles.tableRow}>
                <th key="contestant-name" className={styles.contestantNameWrap}>
                    {contestant.nickName}
                    <span className={styles.extraTagWrap}>{extraItemTag}</span>
                </th>
                {cells}
            </tr>
        );
    });
    const makeWeekCurrent =
        canEdit && weekNumber > week.currentWeek ? (
            <Button onClick={makeCurrent}>Make Current</Button>
        ) : (
            ''
        );
    const extraHeading = canEdit ? <th key="extras">Extras</th> : '';
    const marketStatus = week.marketStatus ? <p>Market is open</p> : <p>Market is closed</p>;
    const playerSelector = canEdit ? (
        <PlayerSelector seasonID={seasonID} onSelect={addPlayer} />
    ) : (
        ''
    );
    return (
        <>
            <h2>
                {week.seasonName} Week {weekNumber}
            </h2>
            <h3>Current week: {week.currentWeek}</h3>
            {marketStatus}
            {makeWeekCurrent}
            <table className={styles.table}>
                <thead className={styles.tableHeader}>
                    <tr key="heading" className={styles.tableRow}>
                        <th key="rowheading">Contestants</th>
                        {extraHeading}
                        {tableHeadings}
                        <th key="average">Average</th>
                    </tr>
                </thead>
                <tbody>{tableContestants}</tbody>
            </table>
            {playerSelector}
        </>
    );
};

export default Ratings;
