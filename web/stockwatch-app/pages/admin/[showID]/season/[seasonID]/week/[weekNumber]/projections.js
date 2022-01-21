/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { useProjections } from 'backend/Games';
import { union, difference } from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { Star } from 'phosphor-react';
import { useTable } from 'react-table';
import styles from 'styles/projections.module.scss';

// FIXME: make configurable
const imageUrlPrefix = 'https://dsw9arc6h9tqj.cloudfront.net';

// Create a default prop getter
const defaultPropGetter = () => ({});

function percentageToHsl(percentage, hue0, hue1) {
    var hue = percentage * (hue1 - hue0) + hue0;
    return 'hsl(' + hue + ', 100%, 50%)';
}

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

const columns = [
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
];

const Projection = ({
    firstName,
    lastName,
    nickname,
    image,
    slug,
    status,
    currentPrice,
    strikes,
    rating,
    previousPrice,
    priceChange,
    projections,
}) => {
    const percentRow = projections.reduce((row, projection, i) => {
        return {
            ...row,
            ['rating' + (i + 1)]: Math.round((projection / currentPrice - 1) * 100) + '%',
        };
    }, {});
    const projectionRow = projections.reduce((row, projection, i) => {
        return {
            ...row,
            ['rating' + (i + 1)]: new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(projection),
        };
    }, {});
    const cleanRating = projections.reduce((row, projection, i) => {
        return {
            ...row,
            ['rating' + (i + 1)]: Math.round((projection / currentPrice - 1) * 100),
        };
    }, {});
    // console.log(cleanRating);
    const projectionColors = projections.reduce((row, projection, i) => {
        let red = '235, 61, 61,';
        let green = '17,192,93,';
        let alpha = Math.abs(projection / cleanRating - 1);
        return {
            'background-color': 'rgb(' + (projection / cleanRating > 1 ? green : red) + alpha + ')',
            // ['background-color' + (i + 1)]:
            //     'rgb(' + (projection / cleanRating > 1 ? green : red) + alpha + ')',
        };
    }, {});
    // const test = 'rgb(235, 61, 61);';
    // console.log(test);
    const data = [percentRow, projectionRow, cleanRating];
    return (
        <div className={styles.projectionCard}>
            <div className={styles.hgDetails}>
                <h5>
                    {firstName} {lastName}
                </h5>
            </div>
            <img
                src={imageUrlPrefix + image}
                alt={nickname}
                className={styles.hgImg}
                height="85"
                width="85"
            />
            <div className={styles.thisWeek}>
                <div className={styles.thisWeekDetails}>
                    <h5>This week</h5>
                    <span className={styles.ratingWrap}>
                        <h5 className={styles.numWrap}>
                            <Star className={styles.hgStar} weight="fill" />
                            <span className={styles.hgStarRating}>{rating}</span>
                            <span className={styles.hgStarOutOf}>/10</span>
                        </h5>
                    </span>
                    <span className={styles.priceWrap}>
                        <h5>${currentPrice}</h5>
                    </span>
                </div>
            </div>

            <div className={styles.nextWeek}>
                <h5>Next Week</h5>
                <Table
                    columns={columns}
                    data={data}
                    getHeaderProps={(column) => ({
                        onClick: () => alert('Header!'),
                    })}
                    getColumnProps={(column) => ({
                        onClick: () => alert('Column!'),
                    })}
                    getRowProps={(row) => ({
                        // style: {
                        //     background: row.index % 2 === 0 ? 'rgba(0,0,0,.1)' : 'white',
                        // },
                        datahue0: '0',
                        datahue1: '120',
                        datasteps: '10',
                    })}
                    // I want to access the price change number for this math
                    getCellProps={(cellInfo) => ({
                        // style: {
                        //     backgroundColor: `hsl(${
                        //         120 * ((120 - cellInfo.value) / 120) * -1 + 120
                        //     }, 100%, 67%)`,
                        // },
                        // style: {
                        //     backgroundColor: `hsl(${cellInfo.value}, 100%, 67%)`,
                        // },
                        //                 let red = '235, 61, 61,';
                        // let green = '17,192,93,';
                        // let alpha = Math.abs(projection / cleanRating - 1);
                        // return {
                        //     'background-color': 'rgb(' + (projection / cleanRating > 1 ? green : red) + alpha + ')',
                        //     // ['background-color' + (i + 1)]:
                        //     //     'rgb(' + (projection / cleanRating > 1 ? green : red) + alpha + ')',
                        // };
                        style: {
                            backgroundColor: `${projectionColors}`,
                        },
                        data: `${cellInfo.value}`,
                        datahue0: `${projectionColors}`,
                        datahue1: '120',
                        datasteps: '100',
                    })}
                    // getCellProps={(cellInfo) => ({
                    //     className: cellInfo.value > 0% ? 'hey' : 'no',
                    //     // data-test="cellInfo.value === 0"
                    // })}
                    // getCellProps={(cellInfo) => ({
                    //     style: {
                    //         fontSize: cellInfo.value,
                    //     },
                    // })}
                    // getCellProps={(cellInfo) => ({
                    //     style: {
                    //         background: cellInfo.value === 0 ? 'pink' : 'white',
                    //     },
                    // })}
                />
            </div>
        </div>
    );
};

const Projections = () => {
    const router = useRouter();
    const { seasonID, weekNumber } = router.query;
    const { contestantIDs, contestants } = useProjections(seasonID, weekNumber);
    // console.log('projections', contestantIDs, contestants);

    const projections = contestantIDs.map((contestantID) => Projection(contestants[contestantID]));

    return (
        <div className={styles.projectionWrap}>
            <h1>Price Projections</h1>
            {projections}
        </div>
    );
};

export default Projections;
