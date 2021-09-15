import React, { useState } from 'react';
import Shows from '../components/AdminNavbar.jsx';
import Link from 'next/link';
import styles from '../styles/games.module.scss';
import Button from '../components/Button.jsx';
import Image from 'next/image';
import bb21 from '../public/bb21-game.svg';
import bb22 from '../public/bb22-game.svg';
import bbcan7 from '../public/bbcan7-game.svg';
import bbcan8 from '../public/bbcan8-game.svg';
import bbcan9 from '../public/bbcan9-game.svg';
import upcoming from '../public/upcoming-game.svg';

function Games() {
    return (
        <div className={styles.page}>
            <h1>Games</h1>
            <h2>Current games</h2>
            <section className={styles.GameWrap}>
                <div className={styles.prevGame}>
                    <h3>Survivor 30</h3>
                    <Image src={upcoming} alt="" width={200} height={200} layout="fixed" />
                    <Button variant="primary">Join game</Button>
                </div>
            </section>
            <h3>Previous games</h3>
            <section className={styles.GameWrap}>
                <div className={styles.prevGame}>
                    <Image src={bb21} alt="" width={200} height={200} layout="fixed" />
                    <Link href="/">Big Brother 21</Link>
                </div>
                <div className={styles.prevGame}>
                    <Image src={bb22} alt="" width={200} height={200} layout="fixed" />
                    <Link href="/">Big Brother 22</Link>
                </div>
                <div className={styles.prevGame}>
                    <Image src={bbcan7} alt="" width={200} height={200} layout="fixed" />
                    <Link href="/">Big Brother Canada 7</Link>
                </div>
                <div className={styles.prevGame}>
                    <Image src={bbcan8} alt="" width={200} height={200} layout="fixed" />
                    <Link href="/">Big Brother Canada 8</Link>
                </div>
                <div className={styles.prevGame}>
                    <Image src={bbcan9} alt="" width={200} height={200} layout="fixed" />
                    <Link href="/">Big Brother Canada 9</Link>
                </div>
            </section>
        </div>
    );
}

export default Games;
