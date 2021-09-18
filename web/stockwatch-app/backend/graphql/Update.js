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
            mutation trade($playerID: ID!, $lines: AWSJSON!) {
                trade(input: { playerID: $playerID, lines: $lines }) {
                    message
                    bankBalance
                    netWorth
                }
            }
        `,
        convert: (data) => {
            return data.trade;
        },
    },
};

async function Update(requestType, variables) {
    console.log('Mutate', requestType, variables);
    const { mutation, convert } = mutations[requestType];
    let result;
    switch (requestType) {
        case 'weekContestants':
        case 'weekRatings':
        case 'weekPlayers':
        case 'trade':
        case 'displayName':
            console.log('mutate before', requestType, variables);
            result = convert(
                (await API.graphql({ query: mutation, variables, authMode: 'AWS_IAM' })).data
            );
            console.log('mutate after', result);
            break;
        default:
            console.log('Unknown request type');
            result = null;
    }
    return result;
}

export default Update;
