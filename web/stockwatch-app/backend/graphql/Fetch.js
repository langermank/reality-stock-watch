import { API } from 'backend/Configure';

const queries = {
    listContestants: {
        query: /* GraphQL */ `
            query listContestants($seasonID: ID!) {
                contestantsBySeason(seasonID: $seasonID) {
                    items {
                        id
                        seasonID
                        firstName
                        lastName
                        nickName
                        image
                        status
                        weekEvicted
                        slug
                        extraTags
                        averageRatings
                    }
                    nextToken
                }
            }
        `,
        convert: (data, items) => {
            data.contestantsBySeason.items.forEach((item) => {
                items.push(item);
            });
            return { nextToken: data.contestantsBySeason.nextToken, result: items };
        },
    },
    listActiveContestants: {
        query: /* GraphQL */ `
            query listActiveContestants($seasonID: ID!) {
                contestantsBySeason(seasonID: $seasonID, filter: { status: { eq: "active" } }) {
                    items {
                        id
                        seasonID
                        firstName
                        lastName
                        nickName
                        image
                        status
                        weekEvicted
                        slug
                        extraTags
                        averageRatings
                    }
                    nextToken
                }
            }
        `,
        convert: (data, items) => {
            data.contestantsBySeason.items.forEach((item) => {
                items.push({
                    ...item,
                    extraTags: JSON.parse(item.extraTags),
                    averageRatings: JSON.parse(item.averageRatings),
                });
            });
            return { nextToken: data.contestantsBySeason.nextToken, result: items };
        },
    },
    listShows: {
        query: /* GraphQL */ `
            query listShows {
                listShows {
                    items {
                        id
                        name
                        image
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
                    nextToken
                }
            }
        `,
        convert: (data, items) => {
            data.listShows.items.forEach((show) => {
                items.push({
                    id: show.id,
                    name: show.name,
                    image: show.image,
                    seasons: show.seasons.items,
                });
            });
            return { nextToken: data.listShows.nextToken, result: items };
        },
    },
    show: {
        query: /* GraphQL */ `
            query show($showID: ID!) {
                getShow(id: $showID) {
                    id
                    name
                    image
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
                image: data.getShow,
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
    activeSeasons: {
        query: /* GraphQL */ `
            query activeSeasons {
                seasonsByStatusStart(status: "active", sortDirection: DESC) {
                    items {
                        id
                        name
                        shortName
                        currentWeek
                        marketStatus
                        nextMarketOpen
                        nextMarketClose
                        showID
                        status
                    }
                    nextToken
                }
            }
        `,
        convert: (data, items) => {
            data.seasonsByStatusStart.items.forEach((season) => {
                items.push({
                    ...season,
                });
            });
            return { nextToken: data.seasonsByStatusStart.nextToken, result: items };
        },
    },
    season: {
        query: /* GraphQL */ `
            query season($seasonID: ID!) {
                getSeason(id: $seasonID) {
                    id
                    currentWeek
                    lastBatchUpdate
                    status
                    marketStatus
                    name
                    shortName
                    nextMarketClose
                    nextMarketOpen
                    startDate
                    contestantExtraTags
                    startingBankBalance
                    weeklyBankIncrease
                    weeks {
                        items {
                            id
                            week
                            players
                            contestants
                            ratings
                        }
                    }
                }
            }
        `,
        convert: (data) => {
            const weeks = data.getSeason.weeks.items;
            let tweakedData = {
                ...data.getSeason,
                currentWeek: parseInt(data.getSeason.currentWeek),
                weeks,
            };
            if (tweakedData.startingBankBalance) {
                tweakedData.startingBankBalance = parseInt(tweakedData.startingBankBalance) / 100.0;
            }
            if (tweakedData.weeklyBankIncrease) {
                tweakedData.weeklyBankIncrease = parseInt(tweakedData.weeklyBankIncrease) / 100.0;
            }
            return tweakedData;
        },
    },
    profileFull: {
        query: /* GraphQL */ `
            query profile($userID: ID!) {
                getUser(id: $userID) {
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
                    profile.completedGames.push(game);
                } else {
                    profile.enrolledGames.push(game);
                }
            });
            return profile;
        },
    },
    profileSummary: {
        query: /* GraphQL */ `
            query profile($email: String) {
                profile(email: $email) {
                    id
                    rank
                    netWorth
                    isBanned
                    email
                    displayName
                    avatarID
                    isAdmin
                }
            }
        `,
        convert: (data) => {
            let profile = {
                id: data.profile.id,
                rank: parseInt(data.profile.rank),
                isBanned: parseInt(data.profile.isBanned),
                isAdmin: parseInt(data.profile.isAdmin),
                email: data.profile.email,
                avatarID: data.profile.avatarID,
                displayName: data.profile.displayName,
                netWorth: (parseFloat(data.profile.netWorth) / 100).toFixed(2),
            };
            return profile;
        },
    },
    player: {
        query: /* GraphQL */ `
            query player($playerID: ID!) {
                getPlayer(id: $playerID) {
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
                seasonID: data.getPlayer.seasonID,
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
    playerBrief: {
        query: /* GraphQL */ `
            query player($playerID: ID!) {
                getPlayer(id: $playerID) {
                    id
                    bankBalance
                    netWorth
                    userID
                    user {
                        avatarID
                        displayName
                    }
                }
            }
        `,
        convert: (data) => {
            let player = {
                id: data.getPlayer.id,
                netWorth: (parseFloat(data.getPlayer.netWorth) / 100).toFixed(2),
                bankBalance: (parseFloat(data.getPlayer.bankBalance) / 100).toFixed(2),
                userID: data.getPlayer.userID,
                avatarID: data.getPlayer.user.avatarID,
                displayName: data.getPlayer.user.displayName,
            };
            return player;
        },
    },
    listPlayersByUser: {
        query: /* GraphQL */ `
            query listPlayers($userID: ID!) {
                playersByUser(userID: $userID) {
                    items {
                        id
                        seasonID
                        bankBalance
                        netWorth
                    }
                    nextToken
                }
            }
        `,
        convert: (data, items) => {
            data.playersByUser.items.forEach((item) => {
                items.push({
                    ...item,
                    bankBalance: parseFloat(item.bankBalance || '0'),
                    netWorth: parseFloat(item.netWorth || '0'),
                });
            });
            return { nextToken: data.playersByUser.nextToken, result: items };
        },
    },
    playerByUserSeason: {
        query: /* GraphQL */ `
            query player($userID: ID!, $seasonID: ID!) {
                playersByUser(userID: $userID, filter: { seasonID: { eq: $seasonID } }) {
                    items {
                        id
                        bankBalance
                        netWorth
                        stocks {
                            items {
                                contestantID
                                shares
                            }
                        }
                    }
                }
                getSeason(id: $seasonID) {
                    startingBankBalance
                    weeklyBankIncrease
                    currentWeek
                }
            }
        `,
        convert: (data) => {
            const startingBankBalance = parseFloat(data.getSeason.startingBankBalance || '0');
            const weeklyBankIncrease = parseFloat(data.getSeason.weeklyBankIncrease || '0');
            const currentWeek = parseInt(data.getSeason.currentWeek || '0');

            // The weekly increase starts with week 2.
            const numIncreases = Math.max(0, currentWeek - 1);
            let bankBalance = startingBankBalance + weeklyBankIncrease * numIncreases;
            let netWorth = bankBalance;
            let stocks = {};
            let playerID = 'none';

            // The bank balance and net worth in the player record _don't_include_ the
            // "free money". So we need to add the free money to the balance in the
            // player record. This is so that we don't need to adjust all the players'
            // balances every week.
            if (data.playersByUser.items.length > 0) {
                const item = data.playersByUser.items[0];
                playerID = item.id;
                bankBalance += parseFloat(item.bankBalance || '0');
                netWorth += parseFloat(item.netWorth || '0');

                for (let i in item.stocks.items) {
                    stocks[item.stocks.items[i].contestantID] = item.stocks.items[i].shares;
                }
            }
            return {
                playerID,
                netWorth: netWorth / 100,
                bankBalance: bankBalance / 100,
                stocks,
            };
        },
    },
    transactionsByPlayer: {
        query: /* GraphQL */ `
            query transactionsByPlayer($playerID: ID!) {
                transactionsByPlayer(playerID: $playerID) {
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
            query ratings($seasonID: ID!, $weekNumber: Int!) {
                weeksBySeasonWeek(seasonID: $seasonID, week: { eq: $weekNumber }) {
                    items {
                        id
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
                weekId: item.id,
                seasonID: item.seasonID,
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
    prices: {
        query: /* GraphQL */ `
            query prices($seasonID: ID!, $startWeekNumber: Int!, $endWeekNumber: Int!) {
                pricesBySeasonWeek(
                    seasonID: $seasonID
                    week: { between: [$startWeekNumber, $endWeekNumber] }
                ) {
                    nextToken
                    items {
                        contestantID
                        contestant {
                            firstName
                            lastName
                            nickName
                            id
                            image
                            slug
                            status
                            weekEvicted
                            averageRatings
                        }
                        price
                        id
                        week
                    }
                }
            }
        `,
        convert: (data, items) => {
            data.pricesBySeasonWeek.items.forEach((price) => {
                let weekEvicted = null;
                if (price.contestant.status === 'evicted') {
                    weekEvicted = parseInt(price.contestant.weekEvicted);
                }
                items.push({
                    priceID: price.id,
                    week: price.week,
                    contestantID: price.contestant.id,
                    contestantFirstName: price.contestant.firstName,
                    contestantLastName: price.contestant.lastName,
                    contestantNickName: price.contestant.nickName,
                    contestantImage: price.contestant.image,
                    contestantSlug: price.contestant.slug,
                    contestantStatus: price.contestant.status,
                    contestantAverageRatings: JSON.parse(price.contestant.averageRatings || '[]'),
                    contestantWeekEvicted: weekEvicted,
                    price: parseFloat(price.price) / 100,
                });
            });
            return { nextToken: data.pricesBySeasonWeek.nextToken, result: items };
        },
    },
};

async function Fetch(requestType, variables) {
    const { query, convert } = queries[requestType];
    let result;
    switch (requestType) {
        case 'profileFull':
        case 'profileSummary':
        case 'player':
        case 'playerBrief':
        case 'show':
        case 'season':
        case 'week':
        case 'playerByUserSeason':
            try {
                result = {
                    ...convert((await API.graphql({ query, variables, authMode: 'AWS_IAM' })).data),
                    loaded: true,
                    error: false,
                };
            } catch (err) {
                console.log('Fetch error', requestType, variables, err);
                return { loaded: false, error: true };
            }
            break;
        case 'transactionsByPlayer':
        case 'listShows':
        case 'prices':
        case 'activeSeasons':
        case 'listContestants':
        case 'listActiveContestants':
        case 'listPlayersByUser':
            {
                let output = { nextToken: null, result: [] };
                do {
                    let response;
                    try {
                        response = (await API.graphql({ query, variables, authMode: 'AWS_IAM' }))
                            .data;
                    } catch (err) {
                        console.log('Fetch error', requestType, query, variables, err);
                        return [];
                    }
                    output = convert(response, output.result);
                } while (output.nextToken);
                result = output.result;
            }
            break;
        default:
            console.log('Unknown request type', requestType);
            result = null;
    }
    return result;
}

export default Fetch;
