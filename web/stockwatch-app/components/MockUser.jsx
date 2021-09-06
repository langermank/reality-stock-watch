import { useUser } from 'backend/User';
import Button from './Button.jsx';

export const MockUser = () => {
    console.log('mockuser');
    const { mockUser, setMockUserID, clearMockUser } = useUser();
    console.log('mockuser', mockUser);
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
