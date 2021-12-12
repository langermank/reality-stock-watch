import PropTypes from 'prop-types';

function BankInfo({ styles, className, bankLoaded, displayName, bankBalance, netWorth }) {
    const bankBalanceRendered = bankLoaded
        ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
          }).format(bankBalance)
        : '$ **.**';
    const netWorthRendered = bankLoaded
        ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
          }).format(netWorth)
        : '$ **.**';
    return (
        <div className={className}>
            <div className={styles.funds}>
                <p>{displayName}</p>
                <p className={styles.availFunds}>Available Funds</p>
                <h1>{bankBalanceRendered}</h1>
                <p className={styles.netWorth}>Net worth: {netWorthRendered}</p>
            </div>
        </div>
    );
}

BankInfo.propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    bankLoaded: PropTypes.bool,
    displayName: PropTypes.string,
    bankBalance: PropTypes.number,
    netWorth: PropTypes.number,
};

export default BankInfo;
