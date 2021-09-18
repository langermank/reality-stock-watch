import { useProfile } from 'backend/Profile';
import { useRouter } from 'next/router';

function renderGames(games) {
    return games.map((game) => (
        <div key={game.seasonID}>
            <p>{game.showName}</p>
            <p>{game.seasonName}</p>
            <div>
                <ul>
                    <li key="money">Net worth: {game.netWorth}</li>
                    <li key="status">Status: {game.status}</li>
                </ul>
            </div>
        </div>
    ));
}

const Profile = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { profile, loading } = useProfile(userId);

    const enrolledGames =
        loading || !profile || !profile.enrolledGames ? (
            []
        ) : (
            <>
                <h2>Current Games</h2>
                <div>{renderGames(profile.enrolledGames)}</div>
            </>
        );
    const completedGames =
        loading || !profile || !profile.completedGames ? (
            []
        ) : (
            <>
                <h2>Past Games</h2>
                <div>{renderGames(profile.completedGames)}</div>
            </>
        );
    return (
        <>
            <h2>{profile.displayName}</h2>
            <p>Total Net Worth: {profile.netWorth}</p>
            {enrolledGames}
            {completedGames}
        </>
    );
};

export default Profile;
