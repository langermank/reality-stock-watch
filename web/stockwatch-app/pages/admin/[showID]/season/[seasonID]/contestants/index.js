import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContestants } from 'backend/Shows';
import { useBackendContext } from 'backend/context';
import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';

const Contestants = () => {
    const router = useRouter();
    const { showID, seasonID } = router.query;
    const { isAdmin } = useBackendContext();
    const { contestants, createContestant, deleteContestant } = useContestants(seasonID);

    // Contestant form
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nickName, setNickName] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');

    const contestantElements = contestants
        ? contestants.map((contestant) => {
              let del = <></>;
              if (isAdmin) {
                  del = <Button onClick={() => deleteContestant(contestant.id)}>X</Button>;
              }

              return (
                  <li key={contestant.id}>
                      {contestant.firstName} {contestant.lastName} ({contestant.nickName}){' '}
                      {contestant.slug}
                      {del}
                  </li>
              );
          })
        : [];

    function create() {
        createContestant({ firstName, lastName, nickName, slug, image });
        setFirstName('');
        setLastName('');
        setNickName('');
        setSlug('');
        setImage('');
    }
    if (isAdmin) {
        contestantElements.push(
            <li key="create">
                <p>
                    Add Contestant:
                    <br />
                    First Name:{' '}
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <br />
                    Last Name:{' '}
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <br />
                    Nick Name:{' '}
                    <Input value={nickName} onChange={(e) => setNickName(e.target.value)} />
                    <br />
                    Slug: <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
                    <br />
                    Image: <Input value={image} onChange={(e) => setImage(e.target.value)} />
                </p>
                <Button onClick={create}>Create</Button>
            </li>
        );
    }

    return (
        <>
            <p>
                <Link
                    href={{
                        pathname: '/admin/[showID]',
                        query: { showID },
                    }}>
                    <a>Show</a>
                </Link>
                /
                <Link
                    href={{
                        pathname: '/admin/[showID]/season/[seasonID]',
                        query: { showID, seasonID },
                    }}>
                    <a>Season</a>
                </Link>
                /
                <Link
                    href={{
                        pathname: '/admin/[showID]/season/[seasonID]/week',
                        query: { showID, seasonID },
                    }}>
                    <a>Weeks</a>
                </Link>
            </p>
            <h2>Contestants</h2>
            <ul>{contestantElements}</ul>
        </>
    );
};
export default Contestants;
