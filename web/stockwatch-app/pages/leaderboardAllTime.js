/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    useTable,
    usePagination,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useRowSelect,
} from 'react-table';
import matchSorter from 'match-sorter';
import { fetchAllTimeLeaderboard } from '../copied/RealityStockWatchBackend';
import _ from 'lodash';

export async function getStaticProps() {
    const [initialData, initialToken] = await fetchAllTimeLeaderboard('', 'DESC');
    return {
        props: {
            initialData,
            initialToken,
            initialPage: 1,
        },
    };
}

function fetchPage(pagerParams, setData, nextTokens, setNextTokens) {
    fetchAllTimeLeaderboard(
        pagerParams.filter,
        'DESC',
        nextTokens[pagerParams.filter][pagerParams.currentPage - 1]
    ).then(([data, token]) => {
        setData(data);
        let newTokens = _.cloneDeep(nextTokens);
        newTokens[pagerParams.filter][pagerParams.currentPage] = token;
        setNextTokens(newTokens);
    });
}

// Define a default UI for filtering
function GlobalFilter({ globalFilter, setGlobalFilter }) {
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            <label htmlFor="search-all-time">Search</label>
            <input
                id="search-all-time"
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`Search players`}
            />
        </span>
    );
}

// Define a default UI for filtering
function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
    return (
        <input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search players`}
        />
    );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Be sure to pass our updateMyData and the skipReset option
function Table({ columns, data, updateMyData, skipReset }) {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                              .toLowerCase()
                              .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        visibleColumns,
        state,
        state: { pageIndex, pageSize, filters, selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData,
            // We also need to pass this so the page doesn't change
            // when we edit the data.
            autoResetPage: !skipReset,
            autoResetSelectedRows: !skipReset,
            disableMultiSort: true,
        },
        useFilters,
        useGlobalFilter,
        usePagination,
        useRowSelect
    );

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    <tr>
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'left',
                            }}>
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                            // Apply the header row props
                            <tr key="header" {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column) => (
                                        // Apply the header cell props
                                        <th key={column.id} {...column.getHeaderProps()}>
                                            {
                                                // Render the header
                                                column.render('Header')
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        page.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                            filters,
                            selectedRowIds: selectedRowIds,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

function LeaderboardAllTime({ initialData, initialToken, initialPage }) {
    const [nextTokens, setNextTokens] = useState({ '': { 0: null, 1: initialToken } });
    const [pagerParams, setPagerParams] = useState({ filter: '', currentPage: initialPage });
    const firstRender = useRef(true);

    useEffect(() => {
        // The first render is server-side and should give us the first page.
        // We don't want to re-render that.
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        fetchPage(pagerParams, setData, nextTokens, setNextTokens);
    }, [pagerParams]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Rank',
                accessor: 'rank',
            },
            {
                Header: 'Player',
                accessor: 'player',
                filter: 'fuzzyText',
                id: 'players',
                Cell: ({ row }) => (
                    <Link href={`/profile/${row.original.id}`}>{row.original.player}</Link>
                ),
            },
            {
                Header: 'Net Worth',
                accessor: (row) => row.networth.toFixed(2),
            },
        ],
        []
    );

    const [data, setData] = useState(initialData);
    const [originalData] = React.useState(data);

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.
    const skipResetRef = React.useRef(false);

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        skipResetRef.current = true;
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };

    // After data changes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        skipResetRef.current = false;
    }, [data]);

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...
    // const resetData = () => {
    //     // Don't reset the page when we do this
    //     skipResetRef.current = true;
    //     setData(originalData);
    // };

    return (
        <Table
            columns={columns}
            data={data}
            updateMyData={updateMyData}
            skipReset={skipResetRef.current}
        />
    );
}

export default LeaderboardAllTime;
