/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import { FilterRow } from 'components/GlobalFilter';
import Pager from 'components/Pager';
import clsx from 'clsx';
import { useTable, usePagination, useGlobalFilter, useExpanded } from 'react-table';
import { Fragment } from 'react';
import Link from 'next/link';
import Button from 'components/Button.jsx';
import ChangeVisualizer from 'components/ChangeVisualizer.jsx';
import Card from 'components/Card.jsx';
import ContestantHoldings from './ContestantHoldings';
import { CaretUp } from 'phosphor-react';
import styles from '../styles/leaderboard.module.scss';
import formStyles from '../styles/components/input.module.scss';
import { imageUrlPrefix } from 'backend/config';

const columns = [
    {
        Header: 'Rank',
        accessor: 'rank',
        Cell: ({ row }) => <span className={styles.rankCell}>{row.original.rank}</span>,
    },
    {
        Header: 'Player',
        accessor: 'displayName',
        filter: 'fuzzyText',
        id: 'players',
        Cell: ({ row }) => (
            <span className={styles.playerCell}>
                <Link href={`/profile/${row.original.userID}`}>{row.original.displayName}</Link>
                <span className={styles.playerBadges}>
                    {row.original.badges.map((badge) => (
                        <img
                            width="32"
                            height="32"
                            key={badge.image}
                            src={imageUrlPrefix + 'badges' + badge.image}
                            alt={badge.alt}
                        />
                    ))}
                </span>
            </span>
        ),
    },
    {
        Header: 'Net worth',
        accessor: (row) => row.netWorth.toFixed(2),
    },
    {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
            <Button
                variant="outline"
                {...row.getToggleRowExpandedProps()}
                icon={<CaretUp weight="fill" />}
                iconOnly
                className={row.isExpanded ? styles.expanded : styles.collapsed}
                width="fullWidth"
                ariaLabelledById="expand">
                See more player details
            </Button>
        ),
    },
];

function changeVariant(delta) {
    if (delta < 0) return 'negative';
    if (delta > 0) return 'positive';
    return 'neutral';
}

const renderRowSubComponent = ({ row }) => (
    <>
        <div className={styles.playerStats}>
            <Card variant={changeVariant(row.original.netWorthChange)} spacing="compact">
                <ChangeVisualizer
                    label={'$' + row.original.netWorthChange}
                    changeIncrease={row.original.netWorthChange > 0}
                    changeDecrease={row.original.netWorthChange < 0}
                />
                net worth
            </Card>
            <Card variant={changeVariant(row.original.rankChange)} spacing="compact">
                <ChangeVisualizer
                    label={row.original.rankChange}
                    changeIncrease={row.original.rankChange > 0}
                    changeDecrease={row.original.rankChange < 0}
                />
                rank
            </Card>
        </div>
        <h3>Shares</h3>
        <div className={styles.playerHoldings}>
            {/* {row.original.stocks.map((stock) => (
                <p>{stock}</p>
            ))} */}
            {/* <p>{row.original.stocks}</p> */}
            {/* console.log({row.original.stocks}); */}
            <ContestantHoldings
                contestantName="Name"
                quantity="20"
                contestantImageSrc="https://via.placeholder.com/150"
            />
            <ContestantHoldings
                contestantName="Name"
                quantity="20"
                contestantImageSrc="https://via.placeholder.com/150"
            />
            <ContestantHoldings
                contestantName="Name"
                quantity="20"
                contestantImageSrc="https://via.placeholder.com/150"
            />
        </div>
    </>
);

const HeaderRow = ({ table }) => (
    <>
        {table.headerGroups.map((headerGroup) => (
            <tr key="header" {...headerGroup.getHeaderGroupProps()} className={styles.tableHeader}>
                {headerGroup.headers.map((column) => (
                    <th key={column.id} {...column.getHeaderProps()} className={styles.headerCell}>
                        {column.render('Header')}
                    </th>
                ))}
            </tr>
        ))}
    </>
);

const MainRow = ({ row }) => (
    <tr
        key={row.key + '-main'}
        {...row.getRowProps()}
        className={clsx(styles.tableRow, row.isExpanded && styles.tableRowHasExpanded)}>
        {row.cells.map((cell) => {
            return (
                <td key={cell.key} {...cell.getCellProps()} className={styles.tableCell}>
                    {cell.render('Cell')}
                </td>
            );
        })}
    </tr>
);

const SubRow = ({ row, columnCount }) =>
    row.isExpanded ? (
        <tr
            key={row.key + '-expander'}
            {...row.getRowProps()}
            className={clsx(styles.tableRow, styles.expandedRow)}>
            <td colSpan={columnCount} className={styles.playerDetails}>
                {renderRowSubComponent({ row })}
            </td>
        </tr>
    ) : null;

const BodyRows = ({ table }) => (
    <>
        {table.page.map((row) => {
            table.prepareRow(row);
            return (
                <Fragment key={row.id}>
                    <MainRow row={row} styles={styles} />
                    <SubRow row={row} styles={styles} columnCount={table.visibleColumns.length} />
                </Fragment>
            );
        })}
    </>
);

const Table = ({ data, numWeeks, selectWeek, selectedWeek }) => {
    const table = useTable({ columns, data }, useGlobalFilter, useExpanded, usePagination);

    let pager = <></>;
    if (table.pageCount > 1) {
        pager = (
            <tr key="pager">
                <td>
                    <Pager table={table} styles={styles} />
                </td>
            </tr>
        );
    }

    let weekOptions = [
        <option key="0" value="0">
            Pre-game
        </option>,
    ];
    for (let i = numWeeks; i > 0; i--) {
        weekOptions.unshift(
            <option key={i} value={i}>
                Week {i}
            </option>
        );
    }

    return (
        <div className={styles.page}>
            <label className={clsx(formStyles.hidden, formStyles.label)} htmlFor="select-week">
                Select week
            </label>
            <select
                className={formStyles.select}
                value={selectedWeek}
                id="select-week"
                onChange={(e) => selectWeek(e.target.value)}>
                {weekOptions}
            </select>
            <table {...table.getTableProps()} className={styles.table}>
                <thead>
                    <FilterRow table={table} styles={styles} />
                    <HeaderRow table={table} styles={styles} />
                </thead>
                <tbody {...table.getTableBodyProps()}>
                    <BodyRows table={table} styles={styles} />
                    {pager}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
