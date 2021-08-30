import { API } from 'backend/Configure';
import { uniqBy } from 'lodash';

const queries = {
    listShows: {
        query: /* GraphQL */ `
            query listShows {
                listShows {
                    items {
                        id
                        name
                    }
                    nextToken
                }
            }
        `,
        convert: (data, items) => {
            data.listShows.items.forEach((show) => {
                items.push({
                    ...show,
                });
            });
            return { nextToken: data.listShows.nextToken, result: items };
        },
    },
    show: {
        query: /* GraphQL */ `
            query show($showId: ID!) {
                getShow(id: $showId) {
                    id
                    name
                    seasons {
                        items {
                            currentWeek
                            id
                            marketStatus
                            name
                            status
                        }
                    }
                }
            }
        `,
        convert: (data) => {
            let show = {
                id: data.getShow.id,
                name: data.getShow.name,
                seasons: [],
            };
            data.getShow.seasons.items.forEach((season) => {
                show.seasons.push({
                    ...season,
                    currentWeek: parseInt(season.currentWeek),
                });
            });
            return show;
        },
    },
    season: {
        query: /* GraphQL */ `
            query season($seasonId: ID!) {
                getSeason(id: $seasonId) {
                    id
                    currentWeek
                    lastBatchUpdate
                    marketStatus
                    name
                    nextMarketClose
                    nextMarketOpen
                    startDate
                    endDate
                }
            }
        `,
        convert: (data) => {
            return {
                ...data.getSeason,
                currentWeek: parseInt(data.getSeason.currentWeek),
            };
        },
    },
    profile: {
        query: /* GraphQL */ `
            query profile($userId: ID!) {
                getUser(id: $userId) {
                    id
                    avatarID
                    displayName
                    players {
                        items {
                            bankBalance
                            id
                            netWorth
                            season {
                                id
                                currentWeek
                                status
                                name
                                show {
                                    name
                                }
                                showID
                                startDate
                            }
                        }
                    }
                    netWorth
                }
            }
        `,
        convert: (data) => {
            let profile = {
                id: data.getUser.id,
                avatarID: data.getUser.avatarID,
                displayName: data.getUser.displayName,
                netWorth: (parseFloat(data.getUser.netWorth) / 100).toFixed(2),
                enrolledGames: [],
                completedGames: [],
            };
            data.getUser.players.items.forEach((player) => {
                let game = {
                    playerID: player.id,
                    showName: player.season.show.name,
                    seasonID: player.season.id,
                    showID: player.season.showID,
                    seasonName: player.season.name,
                    startDate: player.season.startDate,
                    currentWeek: player.season.currentWeek,
                    status: player.season.status,
                    bankBalance: (parseFloat(player.bankBalance) / 100).toFixed(2),
                    netWorth: (parseFloat(player.netWorth) / 100).toFixed(2),
                };
                if (game.status == 'ended') {
                    profile.enrolledGames.push(game);
                } else {
                    profile.completedGames.push(game);
                }
            });
            return profile;
        },
    },
    player: {
        query: /* GraphQL */ `
            query player($playerId: ID!) {
                getPlayer(id: $playerId) {
                    id
                    bankBalance
                    netWorth
                    seasonID
                    stocks {
                        items {
                            contestantID
                            shares
                            contestant {
                                nickName
                                slug
                                status
                            }
                        }
                    }
                    season {
                        currentWeek
                        marketStatus
                        name
                        shortName
                        show {
                            name
                        }
                        showID
                        status
                    }
                }
            }
        `,
        convert: (data) => {
            let player = {
                id: data.getPlayer.id,
                netWorth: (parseFloat(data.getPlayer.netWorth) / 100).toFixed(2),
                showName: data.getPlayer.season.show.name,
                seasonName: data.getPlayer.season.name,
                currentWeek: data.getPlayer.season.currentWeek,
                marketStatus: data.getPlayer.season.marketStatus,
                seasonId: data.getPlayer.seasonID,
                stocks: [],
            };
            data.getPlayer.stocks.items.forEach((stock) => {
                player.stocks.push({
                    contestantId: stock.contestantID,
                    shares: parseInt(stock.shares),
                    contestantNickname: stock.contestant.nickName,
                    contestantSlug: stock.contestant.slug,
                    contestantStatus: stock.contestant.status,
                });
            });
            return player;
        },
    },
    transactionsByPlayer: {
        query: /* GraphQL */ `
            query transactionsByPlayer($playerId: ID!) {
                transactionsByPlayer(playerID: $playerId) {
                    nextToken
                    items {
                        contestantID
                        contestantImage
                        contestantNickname
                        contestantSlug
                        dateTime
                        shares
                        price
                        week
                        id
                    }
                }
            }
        `,
        convert: (data, items) => {
            data.transactionsByPlayer.items.forEach((transaction) => {
                items.push({
                    ...transaction,
                    price: (parseFloat(transaction.price) / 100).toFixed(2),
                });
            });
            return { nextToken: data.transactionsByPlayer.nextToken, result: items };
        },
    },
    week: {
        query: /* GraphQL */ `
            query ratings($seasonId: ID!, $weekNumber: Int!) {
                weeksBySeasonWeek(seasonID: $seasonId, week: { eq: $weekNumber }) {
                    items {
                        seasonID
                        week
                        contestants
                        players
                        ratings
                        season {
                            contestantExtraTags
                            id
                            currentWeek
                            marketStatus
                            name
                            nextMarketClose
                            nextMarketOpen
                            shortName
                            status
                        }
                    }
                }
            }
        `,
        convert: (data) => {
            if (data.weeksBySeasonWeek.items.length === 0) {
                return null;
            }
            let item = data.weeksBySeasonWeek.items[0];
            let week = {
                seasonId: item.seasonID,
                seasonName: item.season.name,
                seasonShortName: item.season.shortname,
                currentWeek: parseInt(item.season.currentWeek || 0),
                marketStatus: item.season.marketStatus,
                nextMarketClose: item.season.nextMarketClose,
                nextMarketOpen: item.season.nextMarketOpen,
                seasonStatus: item.season.status,
                contestantExtraTags: JSON.parse(item.season.contestantExtraTags || '[]'),
                contestants: JSON.parse(item.contestants || '[]'),
                players: JSON.parse(item.players || '[]'),
                ratings: JSON.parse(item.ratings || '{}}'),
            };
            for (let i in week.contestants) {
                if (week.contestants[i].extraTags === undefined) {
                    week.contestants[i].extraTags = [];
                }
            }
            return week;
        },
    },
};

async function Fetch(requestType, variables) {
    console.log('Fetch', requestType, variables);
    const { query, convert } = queries[requestType];
    let result;
    switch (requestType) {
        case 'profile':
        case 'player':
        case 'show':
        case 'season':
        case 'week':
            console.log('fetch before', requestType, variables);
            result = convert((await API.graphql({ query, variables, authMode: 'AWS_IAM' })).data);
            console.log('fetch after', result);
            break;
        case 'transactionsByPlayer':
        case 'listShows':
            {
                let output = { nextToken: null, result: [] };
                do {
                    console.log('before graphql', requestType);
                    let response = (await API.graphql({ query, variables, authMode: 'AWS_IAM' }))
                        .data;
                    console.log('after graphql', response);
                    output = convert(response, output.result);
                } while (output.nextToken);
                result = output.result;
            }
            break;
        default:
            console.log('Unknown request type');
            result = null;
    }
    return result;
}

export default Fetch;
