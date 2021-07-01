import Head from 'next/head';
import { Navbar } from '../components/Navbar';
// import Image from 'next/image';
import Logo from '../components/SWLogo';
import { FacebookLogo, TwitchLogo, TwitterLogo, GoogleLogo, DiscordLogo } from 'phosphor-react';
import clsx from 'clsx';
import styles from '../styles/login.module.scss';

export default function Home() {
    return (
        <div className={styles.login}>
            <h3>Login or join through social</h3>
            <a
                href="/"
                className={clsx(
                    styles.btnBase,
                    styles.prepend,
                    styles.fullWidth,
                    styles.twitter,
                    styles.icon
                )}>
                <TwitterLogo />
                <span>Sign-in with Twitter</span>
            </a>
            <a
                href="/"
                className={clsx(
                    styles.btnBase,
                    styles.prepend,
                    styles.fullWidth,
                    styles.facebook,
                    styles.icon
                )}>
                <FacebookLogo />
                <span>Sign-in with Facebook</span>
            </a>
            <a
                href="/"
                className={clsx(
                    styles.btnBase,
                    styles.prepend,
                    styles.fullWidth,
                    styles.discord,
                    styles.icon
                )}>
                <DiscordLogo />
                <span>Sign-in with Discord</span>
            </a>
            <a
                href="/"
                className={clsx(
                    styles.btnBase,
                    styles.prepend,
                    styles.fullWidth,
                    styles.twitch,
                    styles.icon
                )}>
                <TwitchLogo />
                <span>Sign-in with Twitch</span>
            </a>
            <a
                href="/"
                className={clsx(
                    styles.btnBase,
                    styles.prepend,
                    styles.fullWidth,
                    styles.google,
                    styles.icon
                )}>
                <GoogleLogo />
                <span>Sign-in with Google</span>
            </a>
        </div>
    );
}
