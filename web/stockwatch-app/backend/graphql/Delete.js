import { API } from 'backend/Configure';

const mutations = {
    show: {
        mutation: /* GraphQL */ `
            mutation deleteShow($id: ID!) {
                deleteShow(input: { id: $id }) {
                    id
                }
            }
        `,
        convert: (data) => {
            return { ...data.deleteShow };
        },
    },
    contestant: {
        mutation: /* GraphQL */ `
            mutation deleteContestant($id: ID!) {
                deleteContestant(input: { id: $id }) {
                    id
                }
            }
        `,
        convert: (data) => {
            return { ...data.deleteContestant };
        },
    },
    season: {
        mutation: /* GraphQL */ `
            mutation deleteSeason($id: ID!) {
                deleteSeason(input: { id: $id }) {
                    id
                }
            }
        `,
        convert: (data) => {
            return { ...data.deleteSeason };
        },
    },
    week: {
        mutation: /* GraphQL */ `
            mutation deleteWeek($id: ID!) {
                deleteWeek(input: { id: $id }) {
                    id
                }
            }
        `,
        convert: (data) => {
            return { ...data.deleteWeek };
        },
    },
};

async function Delete(requestType, variables) {
    const { mutation, convert } = mutations[requestType];
    let result;
    switch (requestType) {
        case 'show':
        case 'season':
        case 'week':
        case 'contestant':
            result = convert(
                (await API.graphql({ query: mutation, variables, authMode: 'AWS_IAM' })).data
            );
            break;
        default:
            console.log('Unknown request type');
            result = null;
    }
    return result;
}

export default Delete;
