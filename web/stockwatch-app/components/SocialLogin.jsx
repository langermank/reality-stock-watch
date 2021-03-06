import { Auth } from 'aws-amplify';
import { FacebookLogo, TwitchLogo, TwitterLogo, GoogleLogo, DiscordLogo } from 'phosphor-react';
import Button from './Button.jsx';
import clsx from 'clsx';
import styles from '../styles/login.module.scss';

const SocialLogin = ({}) => {
    return (
        <div className={styles.login}>
            <h3>Login or join through social</h3>
            <Button
                width="fullWidth"
                onClick={() => Auth.federatedSignIn({ provider: 'Twitter' })}
                icon={<TwitterLogo />}
                variant="unstyled">
                Sign-in with Twitter
            </Button>
            <Button
                width="fullWidth"
                onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
                icon={<FacebookLogo />}
                variant="unstyled">
                Sign-in with Facebook
            </Button>
            <Button
                width="fullWidth"
                onClick={() => Auth.federatedSignIn({ provider: 'DiscordPython' })}
                icon={<DiscordLogo />}
                variant="unstyled">
                Sign-in with Discord
            </Button>
            <Button
                width="fullWidth"
                onClick={() => Auth.federatedSignIn({ provider: 'Twitch' })}
                icon={<TwitchLogo />}
                variant="unstyled">
                Sign-in with Twitch
            </Button>
            <Button
                width="fullWidth"
                onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
                icon={<GoogleLogo />}
                variant="unstyled">
                Sign-in with Google
            </Button>
        </div>
    );
};

export default SocialLogin;
