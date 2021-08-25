import { useRouter } from 'next/router';
import { useRatings } from 'backend/Games';
import { difference } from 'lodash';

const Ratings = () => {
    const router = useRouter();
    const { showId, seasonId, week } = router.query;
    const { ratings, changeExtras, changeRating } = useRatings(showId, seasonId, week);

    const extras = ratings.contestants.map((contestant) => {
        const extras = contestant.contestantExtraTags.map((name) => (
            <li key={name}>
                <button>{name} -</button>
            </li>
        ));
        const availableExtras = difference(
            ratings.contestantExtraTags,
            contestant.contestantExtraTags
        ).map((name) => <button key={name}>{name} +</button>);
        return (
            <div key={contestant.contestantId}>
                <h1>{contestant.contestantNickname}</h1>
                <ul>{extras}</ul>
                {availableExtras}
            </div>
        );
    });

    const ratingsTable = [];

    return (
        <>
            <h2>{ratings.title}</h2>
            <h3>Extras</h3>
            {extras}
            <h3>Ratings</h3>
            {ratingsTable}
        </>
    );
};

export default Ratings;
