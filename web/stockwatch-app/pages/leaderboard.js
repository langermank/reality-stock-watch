import { useEffect, useRef, useState } from 'react';
import { useTable } from 'react-table';
import { Button, Grid, Header, Input, Loader, Table } from 'semantic-ui-react';
import { fetchAllTimeLeaderboard } from 'backend/RealityStockWatchBackend';
import router, { userRouter } from 'next/router';
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

const columns = [
    {
        Header: 'Rank',
        accessor: 'rank',
    },
    {
        Header: 'Player',
        accessor: 'player',
    },
    {
        Header: 'Net Worth',
        accessor: (row) => row.networth.toFixed(2),
    },
];
function updatePagerParams(setPagerParams, setNextTokens, changes) {
    setPagerParams((oldParams) => {
        let newParams = _.assign(_.cloneDeep(oldParams), changes);

        // Guard against superfluous updates.
        if (
            newParams.currentPage == oldParams.currentPage &&
            newParams.filter == oldParams.filter
        ) {
            return oldParams;
        }

        // Changing the filter automatically sends you back to the first page.
        if (newParams.filter !== oldParams.filter || newParams.currentPage < 1) {
            newParams.currentPage = 1;
        }

        // Expand the nextTokens to accommodate the new page.
        setNextTokens((nextTokens) => {
            // Exit early and avoid extra renders.
            if (
                newParams.filter in nextTokens &&
                newParams.currentPage in nextTokens[newParams.filter]
            ) {
                return nextTokens;
            }

            let newTokens = { ...nextTokens };
            if (!(newParams.filter in newTokens)) {
                newTokens[newParams.filter] = { 0: null };
            }
            if (!(newParams.currentPage in newTokens[newParams.filter])) {
                newTokens[newParams.filter][newParams.currentPage] = null;
            }
            return newTokens;
        });

        return newParams;
    });
}
const Leaderboard = ({ initialData, initialToken, initialPage }) => {
    const [data, setData] = useState(initialData);
    const [nextTokens, setNextTokens] = useState({ '': { 0: null, 1: initialToken } });
    const [pagerParams, setPagerParams] = useState({ filter: '', currentPage: initialPage });
    const [filterInput, setFilterInput] = useState('');
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

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });
    console.log('nextTokens', pagerParams, nextTokens);
    // When the filter changes, the filter can be updated before nextTokens
    // is updated.
    let pages = [<Loader key="loader" active inline="centered" />];
    if (pagerParams.filter in nextTokens) {
        const keys = Object.keys(nextTokens[pagerParams.filter]);
        pages = keys.map((p) => {
            if (p == 0) return '';
            return (
                <Button
                    primary={p == pagerParams.currentPage}
                    key={p}
                    content={p}
                    onClick={() =>
                        updatePagerParams(setPagerParams, setNextTokens, {
                            currentPage: parseInt(p),
                        })
                    }
                />
            );
        });
        if (nextTokens[pagerParams.filter][keys.length - 1]) {
            pages.push(<Button key="dotdotdot" disabled icon="ellipsis horizontal" />);
        }
    }
    return (
        <>
            <Header as="h2">All-time Leaderboard</Header>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Input
                            action={{
                                icon: 'search',
                                disabled: pagerParams.filter === filterInput,
                                onClick: () =>
                                    updatePagerParams(setPagerParams, setNextTokens, {
                                        filter: filterInput,
                                    }),
                            }}
                            icon="users"
                            iconPosition="left"
                            placeholder="Search..."
                            fluid
                            value={filterInput}
                            onChange={(e) => setFilterInput(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    updatePagerParams(setPagerParams, setNextTokens, {
                                        filter: filterInput,
                                    });
                                }
                            }}
                        />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button.Group>
                            <Button
                                labelPosition="left"
                                icon="left chevron"
                                content="Back"
                                disabled={pagerParams.currentPage == 1}
                                onClick={() =>
                                    updatePagerParams(setPagerParams, setNextTokens, {
                                        currentPage: pagerParams.currentPage - 1,
                                    })
                                }
                            />
                            {pages}
                            <Button
                                labelPosition="right"
                                icon="right chevron"
                                content="Forward"
                                disabled={
                                    !(
                                        nextTokens[pagerParams.filter] &&
                                        nextTokens[pagerParams.filter][pagerParams.currentPage]
                                    )
                                }
                                onClick={() =>
                                    updatePagerParams(setPagerParams, setNextTokens, {
                                        currentPage: pagerParams.currentPage + 1,
                                    })
                                }
                            />
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Table {...getTableProps()} selectable>
                <Table.Header>
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                            // Apply the header row props
                            <Table.Row key="header" {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column) => (
                                        // Apply the header cell props
                                        <Table.HeaderCell
                                            key={column.id}
                                            {...column.getHeaderProps()}>
                                            {
                                                // Render the header
                                                column.render('Header')
                                            }
                                        </Table.HeaderCell>
                                    ))
                                }
                            </Table.Row>
                        ))
                    }
                </Table.Header>
                {/* Apply the table body props */}
                <Table.Body {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <Table.Row
                                    key={row.values['player']}
                                    {...row.getRowProps()}
                                    onClick={() => {
                                        router.push('/profile/' + row.original.id);
                                    }}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell) => {
                                            // Apply the cell props
                                            return (
                                                <Table.Cell
                                                    key={cell.column.id}
                                                    {...cell.getCellProps()}>
                                                    {
                                                        // Render the cell contents
                                                        cell.render('Cell')
                                                    }
                                                </Table.Cell>
                                            );
                                        })
                                    }
                                </Table.Row>
                            );
                        })
                    }
                </Table.Body>
            </Table>
        </>
    );
};

export default Leaderboard;
