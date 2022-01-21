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
        <div>
            <h1>Reality Stock Watch</h1>
            <h4>
                The Stock Watch is a virtual stock market game for North American reality TV shows
                like Big Brother & Survivor
            </h4>
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
