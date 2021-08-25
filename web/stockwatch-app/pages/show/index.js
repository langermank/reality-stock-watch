import { fetchShows } from 'backend/Shows';
import Link from 'next/link';
import { List } from 'semantic-ui-react';

const Shows = ({ shows }) => {
    const showList = shows.map((show) => (
        <List.Item key={show.id}>
            <List.Content>
                <Link href={{ pathname: '/show/[showId]', query: { showId: show.id } }}>
                    <a>{show.name}</a>
                </Link>
            </List.Content>
        </List.Item>
    ));

    return (
        <>
            <h2>Shows</h2>
            {showList}
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
