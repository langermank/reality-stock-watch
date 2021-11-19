import PropTypes from 'prop-types';
import { isUndefined } from 'lodash';

// FIXME: make configurable
const imageUrlPrefix = 'https://dsw9arc6h9tqj.cloudfront.net';

const ShowCard = ({ id, currentWeek, marketStatus, name, bankBalance, netWorth }) => {
    const bankBalanceRendered = isUndefined(bankBalance) ? <></> : <p>Bank: {bankBalance}</p>;
    const netWorthRendered = isUndefined(netWorth) ? <></> : <p>Net Worth: {netWorth}</p>;
    return (
        <li>
            <div>
                <h3>{name}</h3>
                <p>Current week:{currentWeek}</p>
                {bankBalanceRendered}
                {netWorthRendered}
                <p>Market is {marketStatus}.</p>
            </div>
        </li>
    );
};

ShowCard.propTypes = {
    id: PropTypes.id,
    name: PropTypes.string,
    currentWeek: PropTypes.string,
    marketStatus: PropTypes.string,
};

ShowCard.defaultProps = {
    id: '',
    name: 'Show',
    currentWeek: 0,
    marketStatus: 'closed',
};

export default ShowCard;
