import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSeason } from 'backend/Shows';

const Season = () => {
    const router = useRouter();
    const { showId, seasonId } = router.query;
    const { season } = useSeason(seasonId);
    console.log('Season', showId, seasonId, season);
    if (!season) return <h2>Loading...</h2>;

    let weeks = [];
    if (season.currentWeek) {
        for (let i = 1; i <= season.currentWeek; i++) {
            weeks.push(
                <li key={i}>
                    Week {i}:
                    <Link
                        href={{
                            pathname: '/show/[showId]/season/[seasonId]/week/[week]/ratings',
                            query: { showId, seasonId, week: i },
                        }}>
                        <a>Ratings</a>
                    </Link>
                </li>
            );
        }
    }

    return (
        <>
            <h2>{season.name}</h2>
            <ul>{weeks}</ul>
        </>
    );
};

export default Season;
