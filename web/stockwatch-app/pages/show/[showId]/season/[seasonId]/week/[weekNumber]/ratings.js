/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import { useWeek } from 'backend/Games';
import { union, difference } from 'lodash';
import Input from 'components/Input.jsx';
import { Check, CaretDown } from 'phosphor-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import styles from 'styles/admin-ratings.module.scss';
import dropdownStyles from 'styles/components/dropdown.module.scss';
import buttonStyles from 'styles/components/button.module.scss';

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

    // const extraItems = week.contestantExtraTags.map((name) => <span key={name}>{name}</span>);

    const tableHeadings = week.players.map((player) => (
        <th key={player.playerID}>
            {player.playerDisplayName}
            {/* <button onClick={() => removePlayer(player.playerID)}>X</button> */}
        </th>
    ));
    const tableContestants = week.contestants.map((contestant) => {
        let cells = [];

        const extraItemsDropdown = (
            <DropdownMenu.Root>
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
                            checked={hasExtraTag(contestant.contestantID, name)}
                            onCheckedChange={() => toggleExtraTag(contestant.contestantID, name)}>
                            <DropdownMenu.ItemIndicator>
                                <Check className={dropdownStyles.checkmark} />
                            </DropdownMenu.ItemIndicator>
                            {name}
                        </DropdownMenu.CheckboxItem>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        );

        // const toggleExtraItems = week.contestantExtraTags.map((name) => (
        //     <li
        //         key={name}
        //         onClick={() => toggleExtraTag(contestant.contestantID, name)}
        //         data-true={hasExtraTag(contestant.contestantID, name)}
        //         className={styles.extraItem}>
        //         {hasExtraTag(contestant.contestantID, name) ? '*' : ''} {name}
        //     </li>
        // ));

        const extraItemTag = week.contestantExtraTags.map(
            (name) =>
                hasExtraTag(contestant.contestantID, name) && (
                    <span key={name} className={styles.extraItemTag}>
                        {name}
                    </span>
                )
        );

        cells.push(<td key="extras">{extraItemsDropdown}</td>);

        // cells.push(<td key="available-extras">{<span>{toggleExtraItems}</span>}</td>);
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
            <tr key={contestant.contestantID} className={styles.tableRow}>
                <th className={styles.contestantNameWrap}>
                    {contestant.contestantNickName}
                    <span className={styles.extraTagWrap}>{extraItemTag}</span>
                </th>
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
            <table className={styles.table}>
                <thead className={styles.tableHeader}>
                    <tr key="heading" className={styles.tableRow}>
                        <th key="rowheading">Contestants</th>
                        <th key="extras">Extras</th>
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
