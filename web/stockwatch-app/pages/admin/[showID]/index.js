import { useRouter } from 'next/router';
import Link from 'next/link';
import { useShow } from 'backend/Shows';
import { useBackendContext } from 'backend/context';
import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';

function toISODate(date) {
    const year = date.getFullYear();
    const month = ('0' + date.getMonth()).slice(-2);
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

const Show = () => {
    const router = useRouter();
    const { showID } = router.query;
    const { isAdmin } = useBackendContext();
    const { show, createSeason, deleteSeason } = useShow(showID);

    // Season form
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [startDate, setStartDate] = useState(toISODate(new Date()));

    const seasons = show.seasons.map((season) => {
        let del = <></>;
        if (isAdmin && season.status && season.status == 'not started') {
            del = <Button onClick={() => deleteSeason(season.id)}>X</Button>;
        }

        return (
            <li key={season.id}>
                <Link
                    href={{
                        pathname: '/admin/[showID]/season/[seasonId]',
                        query: { showID, seasonId: season.id },
                    }}>
                    <a>{season.name}</a>
                </Link>
                {del}
            </li>
        );
    });

    function create() {
        createSeason({ name, shortName, startDate });
        setName('');
        setShortName('');
        setStartDate(new Date().toISOString());
    }
    if (isAdmin) {
        seasons.push(
            <li key="create">
                <p>
                    Add Season:
                    <br />
                    Name: <Input value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    Short Name:{' '}
                    <Input value={shortName} onChange={(e) => setShortName(e.target.value)} />
                    <br />
                    Start Date:{' '}
                    <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </p>
                <Button onClick={create}>Create</Button>
            </li>
        );
    }

    return (
        <>
            <h2>{show.name}</h2>
            <ul>{seasons}</ul>
        </>
    );
};
export default Show;
