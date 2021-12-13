/* eslint-disable react/prop-types */

import { fetchShows, useShows } from 'backend/Shows';
import { useBackendContext } from 'backend/context';
import Button from 'components/Button';
import Input from 'components/Input';
import Link from 'next/link';
import { useState } from 'react';
import { imageUrlPrefix, blankImage } from 'backend/config';

const Shows = ({ initialShows }) => {
    const { shows, createShow, deleteShow } = useShows({ initialShows });
    const { isAdmin } = useBackendContext();
    const [name, setName] = useState('');
    const [localImage, setLocalImage] = useState(blankImage);
    const [localImageFile, setLocalImageFile] = useState('');

    let showList = shows.map((show) => {
        const image = show.image ? imageUrlPrefix + show.image : blankImage;
        let del = <></>;
        if (isAdmin && show.seasons.length == 0) {
            del = <Button onClick={() => deleteShow(show.id)}>X</Button>;
        }
        return (
            <li key={show.id}>
                <img src={image} height="100" alt="" />
                <Link href={{ pathname: '/admin/[showId]', query: { showId: show.id } }}>
                    <a>{show.name}</a>
                </Link>
                {del}
            </li>
        );
    });

    async function create() {
        createShow({ name, thumbnail: localImageFile });
        setName('');
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
        showList.push(
            <li key="create">
                <h3>Create new show</h3>
                <img width="200" src={localImage} alt="Preview show thumbnail" />
                <Input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={(e) => imageChanged(e)}
                />
                <Input
                    placeholder="Enter show name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
