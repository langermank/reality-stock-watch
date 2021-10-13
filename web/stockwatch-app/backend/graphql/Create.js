import { API } from 'backend/Configure';

const mutations = {
    show: {
        mutation: /* GraphQL */ `
            mutation createShow($name: String!) {
                createShow(input: { name: $name }) {
                    id
                    name
                }
            }
        `,
        convert: (data) => {
            return { ...data.createShow, seasons: [] };
        },
    },
};

async function Create(requestType, variables) {
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

export default Create;
