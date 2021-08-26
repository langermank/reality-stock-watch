import { useRouter } from 'next/router';
import Link from 'next/link';
import { useShow } from 'backend/Shows';

const Show = () => {
    const router = useRouter();
    const { showId } = router.query;
    const { show } = useShow(showId);

    const seasons = show.seasons.map((season) => (
        <li key={season.id}>
            <Link
                href={{
                    pathname: '/show/[showId]/season/[seasonId]',
                    query: { showId, seasonId: season.id },
                }}>
                <a>{season.name}</a>
            </Link>
        </li>
    ));

    return (
        <>
            <h2>{show.name}</h2>
            <ul>{seasons}</ul>
        </>
    );
};
export default Show;
