import { API } from 'aws-amplify';

const queries = {
    profile: {
        query: /* GraphQL */ `
            query profile($id: ID!) {
                getUser(id: $id) {
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
            query player($id: ID!) {
                getPlayer(id: $id) {
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
            query transactionsByPlayer($id: ID!) {
                transactionsByPlayer(playerID: $id) {
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
};

async function Fetch(requestType, id) {
    const { query, convert } = queries[requestType];
    let result;
    switch (requestType) {
        case 'profile':
        case 'player':
            result = convert(
                (await API.graphql({ query, variables: { id }, authMode: 'AWS_IAM' })).data
            );
            break;
        case 'transactionsByPlayer':
            {
                let output = { nextToken: null, result: [] };
                do {
                    let data = (
                        await API.graphql({ query, variables: { id }, authMode: 'AWS_IAM' })
                    ).data;
                    output = convert(data, output.result);
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
