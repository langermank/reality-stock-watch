import { useBackendContext } from 'backend/context';
import Button from './Button.jsx';

export const MockUser = () => {
    const { mockUser, setMockUserID, clearMockUser } = useBackendContext();
    return (
        <>
            <p>Mock user: {mockUser.displayName}</p>
            <Button onClick={() => setMockUserID(3)}>Katie Langerman</Button>
            <Button onClick={() => setMockUserID(4)}>Taran Armstrong</Button>
            <Button onClick={() => setMockUserID(430)}>kdibeck0</Button>
            <Button onClick={() => setMockUserID(1631)}>DerrellMVP</Button>
            <Button onClick={() => setMockUserID(1425)}>Brad Keffer</Button>
            <Button onClick={clearMockUser}>Clear</Button>
        </>
    );
};
