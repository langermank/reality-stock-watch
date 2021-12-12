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
    season: {
        mutation: /* GraphQL */ `
            mutation createSeason(
                $showID: ID!
                $name: String!
                $shortName: String!
                $currentWeek: Int!
                $status: String!
                $startDate: AWSDate!
                $nextMarketOpen: AWSDateTime
                $nextMarketClose: AWSDateTime
                $marketStatus: String
                $lastBatchUpdate: AWSDateTime
                $scheduledBatchUpdate: AWSDateTime
                $contestantExtraTags: AWSJSON
                $startingBankBalance: Int
                $weeklyBankIncrease: Int
            ) {
                createSeason(
                    input: {
                        showID: $showID
                        name: $name
                        shortName: $shortName
                        currentWeek: $currentWeek
                        status: $status
                        startDate: $startDate
                        nextMarketOpen: $nextMarketOpen
                        nextMarketClose: $nextMarketClose
                        marketStatus: $marketStatus
                        lastBatchUpdate: $lastBatchUpdate
                        scheduledBatchUpdate: $scheduledBatchUpdate
                        contestantExtraTags: $contestantExtraTags
                        startingBankBalance: $startingBankBalance
                        weeklyBankIncrease: $weeklyBankIncrease
                    }
                ) {
                    id
                    name
                    shortName
                    currentWeek
                    status
                    startDate
                    nextMarketOpen
                    nextMarketClose
                    marketStatus
                    lastBatchUpdate
                    scheduledBatchUpdate
                    contestantExtraTags
                    startingBankBalance
                    weeklyBankIncrease
                }
            }
        `,
        convert: (data) => {
            return { ...data.createSeason };
        },
    },
    contestant: {
        mutation: /* GraphQL */ `
            mutation createContestant(
                $seasonID: ID!
                $firstName: String!
                $lastName: String!
                $nickName: String!
                $slug: String!
                $image: String!
                $weekEvicted: Int!
                $status: String!
                $extraTags: AWSJSON
                $averageRatings: AWSJSON
            ) {
                createContestant(
                    input: {
                        seasonID: $seasonID
                        firstName: $firstName
                        lastName: $lastName
                        nickName: $nickName
                        slug: $slug
                        image: $image
                        weekEvicted: $weekEvicted
                        status: $status
                        extraTags: $extraTags
                        averageRatings: $averageRatings
                    }
                ) {
                    id
                    seasonID
                    firstName
                    lastName
                    nickName
                    slug
                    image
                    weekEvicted
                    status
                    extraTags
                    averageRatings
                }
            }
        `,
        convert: (data) => {
            return { ...data.createContestant };
        },
    },
    // player: {
    //     mutation: /* GraphQL */ `
    //         mutation createPlayer(
    //             $userID: ID!
    //             $seasonID: ID!
    //             $bankBalance: Int!
    //             $netWorth: Int!
    //         ) {
    //             createPlayer(
    //                 input: {
    //                     userID: $userID
    //                     seasonID: $seasonID
    //                     bankBalance: $bankBalance
    //                     netWorth: $netWorth
    //                 }
    //             ) {
    //                 id
    //                 seasonID
    //                 bankBalance
    //                 netWorth
    //             }
    //         }
    //     `,
    //     convert: (data) => {
    //         return { ...data.createPlayer };
    //     },
    // },
    week: {
        mutation: /* GraphQL */ `
            mutation createWeek(
                $seasonID: ID!
                $week: Int!
                $contestants: AWSJSON!
                $players: AWSJSON!
                $ratings: AWSJSON!
            ) {
                createWeek(
                    input: {
                        seasonID: $seasonID
                        week: $week
                        contestants: $contestants
                        players: $players
                        ratings: $ratings
                    }
                ) {
                    id
                    seasonID
                    week
                    contestants
                    players
                    ratings
                }
            }
        `,
        convert: (data) => {
            return { ...data.createWeek };
        },
    },
};

async function Create(requestType, variables) {
    const { mutation, convert } = mutations[requestType];
    let result;
    switch (requestType) {
        case 'show':
        case 'season':
        case 'week':
        case 'contestant':
            //case 'player':
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
