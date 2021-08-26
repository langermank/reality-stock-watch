import { API } from 'aws-amplify';
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
    ratings: {
        query: /* GraphQL */ `
            query ratings($seasonId: ID!, $week: Int!) {
                ratingsBySeasonWeek(seasonID: $seasonId, week: { eq: $week }) {
                    nextToken
                    items {
                        contestantID
                        rating
                        id
                        playerID
                        player {
                            user {
                                displayName
                                avatarID
                                id
                            }
                        }
                    }
                }
                getSeason(id: $seasonId) {
                    id
                    contestantExtraTags
                    currentWeek
                    marketStatus
                    name
                    nextMarketClose
                    nextMarketOpen
                    shortName
                    status
                    contestants {
                        items {
                            nickName
                            id
                            image
                            slug
                            status
                            extraTags
                        }
                    }
                }
            }
        `,
        convert: (data) => {
            let ratings = {
                seasonId: data.getSeason.id,
                seasonName: data.getSeason.name,
                seasonShortName: data.getSeason.shortname,
                currentWeek: parseInt(data.getSeason.currentWeek || 0),
                marketStatus: data.getSeason.marketStatus,
                nextMarketClose: data.getSeason.nextMarketClose,
                nextMarketOpen: data.getSeason.nextMarketOpen,
                seasonStatus: data.getSeason.status,
                contestantExtraTags: JSON.parse(data.getSeason.contestantExtraTags || '[]'),
                contestants: [],
                players: [],
                ratings: {},
            };
            data.ratingsBySeasonWeek.items.forEach((rating) => {
                if (!ratings.ratings[rating.playerID]) {
                    ratings.ratings[rating.playerID] = {};
                }
                ratings.ratings[rating.playerID][rating.contestantID] = rating.rating;
                ratings.players.push({
                    playerId: rating.playerID,
                    playerDisplayName: rating.player.user.displayName,
                    playerAvatarId: rating.player.user.avatarID,
                });
            });
            ratings.players = uniqBy(ratings.players, 'playerId');
            data.getSeason.contestants.items.forEach((contestant) => {
                ratings.contestants.push({
                    contestantId: contestant.id,
                    contestantNickName: contestant.nickName,
                    contestantImage: contestant.image,
                    contestantSlug: contestant.slug,
                    contestantStatus: contestant.status,
                    contestantExtraTags: JSON.parse(contestant.extraTags || '[]'),
                });
            });
            return ratings;
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
        case 'ratings':
            result = convert((await API.graphql({ query, variables, authMode: 'AWS_IAM' })).data);
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
