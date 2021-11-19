import { Auth } from 'aws-amplify';
import { FacebookLogo, TwitchLogo, TwitterLogo, GoogleLogo, DiscordLogo } from 'phosphor-react';
import clsx from 'clsx';
import styles from '../styles/login.module.scss';
import { useBackendContext } from 'backend/context';
import EditProfile from 'components/EditProfile';
import Dashboard from 'components/Dashboard';

// The display prop is a bit of a hack to avoid problems with
// hooks.  The hooks need to remain the same throughout the
// life of the page, so we have to render all the components
// regardless of whether or not the should be displayed.

function Login({ display }) {
    if (!display) return <></>;
    return (
        <div className={styles.login} key="login">
            <h3>Login or join through social</h3>
            <a
                onClick={() => Auth.federatedSignIn({ provider: 'Twitter' })}
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
                onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
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
                onClick={() => Auth.federatedSignIn({ provider: 'DiscordPython' })}
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
                onClick={() => Auth.federatedSignIn({ provider: 'Twitch' })}
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
                onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
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

export default function Home() {
    const { isLoggedIn, isUserLoaded, profileDisplayNameSet } = useBackendContext();
    const showLogin = isUserLoaded && !isLoggedIn;
    const showEditProfile = isUserLoaded && isLoggedIn && !profileDisplayNameSet;
    const showDashboard = !showLogin && !showEditProfile;
    return (
        <>
            <Login display={showLogin} />
            <EditProfile display={showEditProfile} />
            <Dashboard display={showDashboard} />
        </>
    );
}
