import { API } from 'backend/Configure';

const mutations = {
    displayName: {
        mutation: /* GraphQL */ `
            mutation updateUser($userID: ID!, $displayName: String!) {
                updateUser(input: { displayName: $displayName, id: $userID }) {
                    id
                    displayName
                }
            }
        `,
        convert: (data) => {
            return data.updateUser;
        },
    },
    weekContestants: {
        mutation: /* GraphQL */ `
            mutation updateWeek($weekId: ID!, $contestants: AWSJSON!) {
                updateWeek(input: { id: $weekId, contestants: $contestants }) {
                    contestants
                }
            }
        `,
        convert: (data) => {
            return data.updateWeek;
        },
    },
    weekRatings: {
        mutation: /* GraphQL */ `
            mutation updateWeek($weekId: ID!, $ratings: AWSJSON!) {
                updateWeek(input: { id: $weekId, ratings: $ratings }) {
                    ratings
                }
            }
        `,
        convert: (data) => {
            return data.updateWeek;
        },
    },
    weekPlayers: {
        mutation: /* GraphQL */ `
            mutation updateWeek($weekId: ID!, $players: AWSJSON!) {
                updateWeek(input: { id: $weekId, players: $players }) {
                    players
                }
            }
        `,
        convert: (data) => {
            return data.updateWeek;
        },
    },
    trade: {
        mutation: /* GraphQL */ `
            mutation trade($seasonID: ID!, $lines: [TradeLine]!) {
                trade(seasonID: $seasonID, lines: $lines) {
                    playerID
                    message
                    bankBalance
                    netWorth
                }
            }
        `,
        convert: (data) => {
            return data.trade;
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
    },
    joinGame: {
        mutation: /* GraphQL */ `
            mutation joinGame($userID: ID!, $seasonID: ID!) {
                createPlayer(
                    input: { userID: $userID, seasonID: $seasonID, bankBalance: 0, netWorth: 0 }
                ) {
                    id
                }
            }
        `,
        convert: (data) => {
            return data.trade;
        },
    },
    season: {
        mutation: /* GraphQL */ `
            mutation updateSeason(
                $id: ID!
                $name: String
                $shortName: String
                $nextMarketClose: AWSDateTime
                $nextMarketOpen: AWSDateTime
                $contestantExtraTags: AWSJSON
                $startingBankBalance: Int
                $weeklyBankIncrease: Int
                $status: String
                $marketStatus: String
            ) {
                updateSeason(
                    input: {
                        id: $id
                        name: $name
                        shortName: $shortName
                        nextMarketClose: $nextMarketClose
                        nextMarketOpen: $nextMarketOpen
                        contestantExtraTags: $contestantExtraTags
                        startingBankBalance: $startingBankBalance
                        weeklyBankIncrease: $weeklyBankIncrease
                        status: $status
                        marketStatus: $marketStatus
                    }
                ) {
                    id
                }
            }
        `,
        convert: (data) => {
            return data.updateSeason;
        },
    },
};

async function Update(requestType, variables) {
    const { mutation, convert, authMode } = mutations[requestType];
    let result;
    switch (requestType) {
        case 'weekContestants':
        case 'weekRatings':
        case 'weekPlayers':
        case 'trade':
        case 'displayName':
        case 'joinGame':
        case 'season':
            result = convert(
                (await API.graphql({ query: mutation, variables, authMode: authMode || 'AWS_IAM' }))
                    .data
            );
            break;
        default:
            console.log('Unknown request type');
            result = null;
    }
    return result;
}

export default Update;
