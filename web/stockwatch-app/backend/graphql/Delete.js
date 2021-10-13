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
};

async function Delete(requestType, variables) {
    const { mutation, convert } = mutations[requestType];
    let result;
    switch (requestType) {
        case 'show':
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
