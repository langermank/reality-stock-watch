import '../styles/globals.scss';
import { Navbar } from '../components/Navbar';
import { ArrowLineLeft, ArrowLineRight } from 'phosphor-react';
import { SSRProvider } from '@react-aria/ssr';
import Head from 'next/head';
import Logo from '../components/SWLogo';
import LogoNav from '../components/SWLogoNav';
import clsx from 'clsx';
import styles from '../styles/app.module.scss';
import dynamic from 'next/dynamic';
import { Provider, useBackendContext } from 'backend/context';
import { useUser } from '/backend/User';
import { NavbarLanding } from 'components/NavbarLanding';

// const PanelToggle = dynamic(() => import('../components/PanelToggle'), {
//     ssr: false,
// });

function MyApp({ Component, pageProps }) {
    const PanelToggle = dynamic(() => import('../components/PanelToggle'), {
        ssr: false,
    });
    // const { isLoggedIn, isUserLoaded } = useBackendContext();
    // const { user } = useUser();
    // const nav = isLoggedIn ? <NavbarLanding /> : <Navbar className={styles.navGrid} />;
    // const loggedOutClass = isUserLoaded && isLoggedIn ? styles.loggedOut : '';
    // console.log(isLoggedIn);

    return (
        <Provider>
            <SSRProvider>
                <div className={clsx(styles.appWrapper)}>
                    <Head>
                        <title>Reality Stock Watch</title>
                        <meta name="description" content="Reality stock watch game" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <aside>
                        <PanelToggle mobileToggle />
                        <a href="/" className={clsx(styles.navLogo, styles.full)}>
                            <LogoNav />
                        </a>
                    </aside>
                    {/* {nav} */}
                    <Navbar className={styles.navGrid} />
                    {/*<NavbarLanding /> */}
                    <main className={styles.main}>
                        <Component {...pageProps} />
                    </main>
                </div>
            </SSRProvider>
        </Provider>
    );
}

export default MyApp;
