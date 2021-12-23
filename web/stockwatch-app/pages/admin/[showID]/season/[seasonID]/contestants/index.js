import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContestants } from 'backend/Shows';
import { useBackendContext } from 'backend/context';
import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import { imageUrlPrefix, blankImage } from 'backend/config';

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
    //const [image, setImage] = useState('');
    const [localImage, setLocalImage] = useState(blankImage);
    const [localImageFile, setLocalImageFile] = useState('');

    const contestantElements = contestants
        ? contestants.map((contestant) => {
              const image = contestant.image ? imageUrlPrefix + contestant.image : blankImage;
              let del = <></>;
              if (isAdmin) {
                  del = <Button onClick={() => deleteContestant(contestant.id)}>X</Button>;
              }

              return (
                  <li key={contestant.id}>
                      <img src={image} height="100" alt="" />
                      {contestant.firstName} {contestant.lastName} ({contestant.nickName}){' '}
                      {contestant.slug}
                      {del}
                  </li>
              );
          })
        : [];

    function create() {
        createContestant({ firstName, lastName, nickName, slug, image: localImageFile });
        setFirstName('');
        setLastName('');
        setNickName('');
        setSlug('');
        setLocalImage((image) => {
            if (image != blankImage) {
                URL.revokeObjectURL(image);
            }
            return blankImage;
        });
        setLocalImageFile('');
    }
    function imageChanged(e) {
        setLocalImage((image) => {
            if (image != blankImage) {
                URL.revokeObjectURL(image);
            }
            return URL.createObjectURL(e.target.files[0]);
        });
        setLocalImageFile(e.target.files[0]);
    }
    if (isAdmin) {
        contestantElements.push(
            <li key="create">
                <h3>Create new contestant</h3>
                <img width="200" src={localImage} alt="Preview contestant" />
                <Input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={(e) => imageChanged(e)}
                />
                <p>
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
            </p>
            <h2>Contestants</h2>
            <ul>{contestantElements}</ul>
        </>
    );
};
export default Contestants;
