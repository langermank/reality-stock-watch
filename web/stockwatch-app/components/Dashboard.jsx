import { useBackendContext } from 'backend/context';
import ShowCard from './ShowCard';
import cardStyles from '../styles/showcard.module.scss';
import { usePlayersByUser } from 'backend/Games';
import { find, omit } from 'lodash';

//import { Formik, Form, Field, ErrorMessage } from 'formik';

const Dashboard = ({ display }) => {
    const { profile, profileLoaded, activeSeasons, setSelectedSeasonID } = useBackendContext();
    const { players } = usePlayersByUser(profileLoaded ? profile.id : null);

    console.log('players', players);

    const showCards = activeSeasons.map((season) => {
        const player = omit(find(players, (p) => p.seasonID === season.id) || {}, ['id']);
        return <ShowCard key={season.id} {...player} {...season} />;
    });

    if (!display) return <></>;
    return (
        <div key="dashboard">
            <h2>Dashboard</h2>
            <ul className={cardStyles.showCards}>{showCards}</ul>
        </div>
    );
};

export default Dashboard;
