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
import { CaretUp } from 'phosphor-react';
import styles from '../styles/leaderboard.module.scss';
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
            </span>
        ),
    },
    {
        Header: 'Badges',
        accessor: 'badges',
        id: 'badges',
        Cell: ({ cell }) => (
            <span className={styles.playerCell}>
                {cell.value.map((badge) => (
                    <img
                        width="100"
                        key={badge.image}
                        src={imageUrlPrefix + 'badges' + badge.image}
                        alt={badge.alt}
                    />
                ))}
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

const renderRowSubComponent = ({ row }) => (
    // <pre
    //     style={{
    //         fontSize: '10px',
    //     }}>
    //     <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
    // </pre>
    <>
        <Card variant="positive" spacing="compact">
            <ChangeVisualizer label="$100" changeIncrease />
            net worth
        </Card>
        <Card variant="negative" spacing="compact">
            <ChangeVisualizer label="100" changeDecrease />
            rank
        </Card>
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
            <td colSpan={columnCount}>{renderRowSubComponent({ row })}</td>
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

const Table = ({ data }) => {
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

    return (
        <div className={styles.page}>
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
