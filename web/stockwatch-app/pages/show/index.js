import { fetchShows } from 'backend/Shows';
import Link from 'next/link';

const Shows = ({ shows }) => {
    const showList = shows.map((show) => (
        <li key={show.id}>
            <Link href={{ pathname: '/show/[showId]', query: { showId: show.id } }}>
                <a>{show.name}</a>
            </Link>
        </li>
    ));

    return (
        <>
            <h2>Shows</h2>
            <ul>{showList}</ul>
        </>
    );
};

export async function getStaticProps() {
    const shows = await fetchShows();
    return {
        props: { shows },
    };
}

export default Shows;
