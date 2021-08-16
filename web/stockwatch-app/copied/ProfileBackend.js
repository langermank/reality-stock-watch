import { API } from 'aws-amplify';
import { Database } from 'phosphor-react';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const query = /* GraphQL */ `
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
`;

async function getProfile(requestType, id) {
    const result = await API.graphql({ query, variables: { id }, authMode: 'AWS_IAM' });
    return result.data.getUser;
}
function useProfile(userId) {
    const { data, mutate, error } = useSWR(userId ? ['profile', userId] : null, getProfile, {
        initialData: { displayName: 'Loading...' },
    });
    useEffect(() => {
        mutate();
    }, [userId]);
    const loading = !data && !error;
    let profile = data;
    if (data.id) {
        profile = {
            id: data.id,
            avatarID: data.avatarID,
            displayName: data.displayName,
            netWorth: (parseFloat(data.netWorth) / 100).toFixed(2),
            enrolledGames: [],
            completedGames: [],
        };
        data.players.items.forEach((player) => {
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
    }
    return { profile, loading, error, mutate };
}

export { useProfile };
