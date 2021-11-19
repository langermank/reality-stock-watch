import PropTypes from 'prop-types';
import { isUndefined } from 'lodash';
import { useRouter } from 'next/router';
import { useBackendContext } from 'backend/context';

const ShowCard = ({ id, currentWeek, marketStatus, name, shortName, bankBalance, netWorth }) => {
    const router = useRouter();
    const { setSelectedSeasonID } = useBackendContext();

    const bankBalanceRendered = isUndefined(bankBalance) ? <></> : <p>Bank: {bankBalance}</p>;
    const netWorthRendered = isUndefined(netWorth) ? <></> : <p>Net Worth: {netWorth}</p>;

    const handleClick = (e, seasonID) => {
        e.preventDefault();
        setSelectedSeasonID(seasonID);
        router.push('/trade');
    };
    return (
        <li>
            <button onClick={(e) => handleClick(e, id)}>
                <div>
                    <h3>
                        {name} ({shortName})
                    </h3>
                    <p>Current week:{currentWeek}</p>
                    {bankBalanceRendered}
                    {netWorthRendered}
                    <p>Market is {marketStatus}.</p>
                </div>
            </button>
        </li>
    );
};

ShowCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    shortName: PropTypes.string,
    currentWeek: PropTypes.number,
    marketStatus: PropTypes.string,
    bankBalance: PropTypes.number,
    netWorth: PropTypes.number,
};

ShowCard.defaultProps = {
    id: '',
    name: 'Show',
    currentWeek: 0,
    marketStatus: 'closed',
};

export default ShowCard;
