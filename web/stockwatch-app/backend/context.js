import { createContext, useContext } from 'react';
import { useActiveSeasons, useStocks } from 'backend/Games';
import { useUser } from 'backend/User';

const Context = createContext();

const Provider = (props) => {
    const activeSeasonData = useActiveSeasons();
    const userData = useUser();
    const stocks = useStocks(userData.user.id, activeSeasonData.selectedSeasonID);

    return (
        <Context.Provider value={{ ...activeSeasonData, ...userData, ...stocks }}>
            {props.children}
        </Context.Provider>
    );
};

function useBackendContext() {
    return useContext(Context);
}

export { Provider, useBackendContext };
export default Context;
