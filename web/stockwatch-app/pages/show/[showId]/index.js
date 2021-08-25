import { useRouter } from 'next/router';
import Link from 'next/link';
import { List } from 'semantic-ui-react';
import { useShow } from 'backend/Shows';

const Show = () => {
    const router = useRouter();
    const { showId } = router.query;
    const { show } = useShow(showId);

    const seasons = show.seasons.map((season) => (
        <List.Item key={season.id}>
            <List.Content>
                <Link
                    href={{
                        pathname: '/show/[showId]/season/[seasonId]',
                        query: { showId, seasonId: season.id },
                    }}>
                    <a>{season.name}</a>
                </Link>
            </List.Content>
        </List.Item>
    ));

    return (
        <>
            <h2>{show.name}</h2>
            <List>{seasons}</List>
        </>
    );
};
export default Show;
