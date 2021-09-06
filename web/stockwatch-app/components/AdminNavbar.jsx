import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../styles/components/subnav.module.scss';
import { fetchShows } from 'backend/Shows';
import Link from 'next/link';
import NavLink from './NavLink';

// wasn't able to get the shows data over to this page (undefined)
// hardcoded values for now

const AdminNavbar = ({}) => {
    // const showList = shows.map((show) => (
    //     <li key={show.id}>
    //         <Link href={{ pathname: '/show/[showId]', query: { showId: show.id } }} passHref>
    //             <NavLink
    //                 // dataActive={router.pathname == '/trade'}
    //                 linkText={show.name}
    //             />
    //         </Link>
    //     </li>
    // ));

    return (
        <div>
            <h4>Games</h4>
            <h4>Big Brother</h4>
            <ul>
                <li>
                    <Link href="/show/2/season/4" passHref>
                        <NavLink
                            // dataActive={router.pathname == '/trade'}
                            linkText='BB21'
                        />
                    </Link>
                </li>
                <li>
                    <Link href="/show/2/season/2" passHref>
                        <NavLink
                            // dataActive={router.pathname == '/trade'}
                            linkText='BB22'
                        />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export async function getStaticProps() {
    const shows = await fetchShows();
    return {
        props: { shows },
    };
}

AdminNavbar.propTypes = {};

AdminNavbar.defaultProps = {};

export default AdminNavbar;
