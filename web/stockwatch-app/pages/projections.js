/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import clsx from 'clsx';
import React from 'react';
import { Star } from 'phosphor-react';
import { useTable } from 'react-table';
import styles from '../styles/projections.module.scss';

// fake data
const currentPrice = 1.99;
// const changePrice1 = 1.12;
// const changePercent1 = 44;
// const changePrice2 = 1.28;
// const changePercent2 = 36;
// const changePrice3 = 1.6;
// const changePercent3 = 20;
// const changePrice4 = 2.06;
// const changePercent4 = 4;
// const changePrice5 = 2.35;
// const changePercent5 = 18;
// const changePrice6 = 2.59;
// const changePercent6 = 30;
// const changePrice7 = 2.97;
// const changePercent7 = 49;
// const changePrice8 = 3.6;
// const changePercent8 = 81;
// const changePrice9 = 4.59;
// const changePercent9 = 131;
// const changePrice10 = 6.18;
// const changePercent10 = 211;

// Create a default prop getter
const defaultPropGetter = () => ({});

function Table({
    columns,
    data,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
}) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()} className={styles.ratingTable}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className={styles.tableRow}>
                        {headerGroup.headers.map((column) => (
                            <th
                                // Return an array of prop objects and react-table will merge them appropriately
                                {...column.getHeaderProps([
                                    {
                                        className: column.className,
                                        style: column.style,
                                    },
                                    getColumnProps(column),
                                    getHeaderProps(column),
                                ])}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        // Merge user row props in
                        <tr {...row.getRowProps(getRowProps(row))} className={styles.tableRow}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        // Return an array of prop objects and react-table will merge them appropriately
                                        {...cell.getCellProps([
                                            {
                                                className: cell.column.className,
                                                style: cell.column.style,
                                            },
                                            getColumnProps(cell.column),
                                            getCellProps(cell),
                                        ])}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

const Projections = () => {
    const data = React.useMemo(
        () => [
            {
                rating1: 1.99,
                rating2: 1.12,
                rating3: 1.28,
                rating4: 1.6,
                rating5: 2.06,
                rating6: 2.35,
                rating7: 2.59,
                rating8: 2.97,
                rating9: 4.59,
                rating10: 6.18,
            },
            {
                rating1: 44,
                rating2: 36,
                rating3: 20,
                rating4: 40,
                rating5: 18,
                rating6: 30,
                rating7: 49,
                rating8: 81,
                rating9: 131,
                rating10: 211,
            },
        ],

        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Next Week',
                columns: [
                    {
                        Header: '1',
                        accessor: 'rating1',
                    },
                    {
                        Header: '2',
                        accessor: 'rating2',
                    },
                    {
                        Header: '3',
                        accessor: 'rating3',
                    },
                    {
                        Header: '4',
                        accessor: 'rating4',
                    },
                    {
                        Header: '5',
                        accessor: 'rating5',
                    },
                    {
                        Header: '6',
                        accessor: 'rating6',
                    },
                    {
                        Header: '7',
                        accessor: 'rating7',
                    },
                    {
                        Header: '8',
                        accessor: 'rating8',
                    },
                    {
                        Header: '9',
                        accessor: 'rating9',
                    },
                    {
                        Header: '10',
                        accessor: 'rating10',
                    },
                ],
            },
        ],
        []
    );

    return (
        <div className={styles.projectionWrap}>
            <h1>Price Projections</h1>
            {/* loop through contestants here */}
            <div className={styles.projectionCard}>
                <div className={styles.hgDetails}>
                    <h5>ContestantName</h5>
                    {/* {Math.round((2 / currentPrice - 1) * 100)}% */}
                </div>
                <img src="/" alt="" className="hg-img" height="85" width="85" />
                <div className={styles.thisWeek}>
                    <div className={styles.thisWeekDetails}>
                        <h5>This week</h5>
                        <span className={styles.ratingWrap}>
                            <h5 className={styles.numWrap}>
                                <Star className={styles.hgStar} weight="fill" />
                                <span className={styles.hgStarRating}>5</span>
                                <span className={styles.hgStarOutOf}>/10</span>
                            </h5>
                        </span>
                        <span className={styles.priceWrap}>
                            <h5>{currentPrice}</h5>
                        </span>
                    </div>
                </div>

                <div className={styles.nextWeek}>
                    <h5>Next Week</h5>
                    <Table
                        columns={columns}
                        data={data}
                        // getHeaderProps={(column) => ({
                        //     onClick: () => alert('Header!'),
                        // })}
                        // getColumnProps={(column) => ({
                        //     onClick: () => alert('Column!'),
                        // })}
                        // getRowProps={(row) => ({
                        //     style: {
                        //         background: row.index % 2 === 0 ? 'rgba(0,0,0,.1)' : 'white',
                        //     },
                        // })}
                        // I want to access the price change number for this math
                        getCellProps={(cellInfo) => ({
                            style: {
                                backgroundColor: `hsl(${
                                    120 * ((120 - cellInfo.value) / 120) * -1 + 120
                                }, 100%, 67%)`,
                            },
                        })}
                    />
                </div>
            </div>
        </div>
    );
};

export default Projections;
