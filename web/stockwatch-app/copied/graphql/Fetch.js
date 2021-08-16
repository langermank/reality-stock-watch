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
};

async function Fetch(requestType, id) {
    const { query, convert } = queries[requestType];
    const result = await API.graphql({ query, variables: { id }, authMode: 'AWS_IAM' });
    return convert(result.data);
}

export default Fetch;
