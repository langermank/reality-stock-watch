/* eslint-disable react/prop-types */

import { fetchShows, useShows } from 'backend/Shows';
import { useBackendContext } from 'backend/context';
import Button from 'components/Button';
import Input from 'components/Input';
import Link from 'next/link';
import { useState } from 'react';

const Shows = ({ initialShows }) => {
    const { shows, createShow, deleteShow } = useShows({ initialShows });
    const { isAdmin } = useBackendContext();
    const [name, setName] = useState('');

    let showList = shows.map((show) => {
        let del = <></>;
        if (isAdmin && show.seasons.length == 0) {
            del = <Button onClick={() => deleteShow(show.id)}>X</Button>;
        }
        console.log('show is', show);
        return (
            <li key={show.id}>
                <Link href={{ pathname: '/admin/[showId]', query: { showId: show.id } }}>
                    <a>{show.name}</a>
                </Link>
                {del}
            </li>
        );
    });

    function create() {
        createShow({ name });
        setName('');
    }
    if (isAdmin) {
        showList.push(
            <li key="create">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                <Button onClick={create}>Create</Button>
            </li>
        );
    }

    return (
        <>
            <h2>Shows</h2>
            <ul>{showList}</ul>
        </>
    );
};

export async function getStaticProps() {
    const initialShows = await fetchShows();
    return {
        props: { initialShows },
    };
}

export default Shows;
