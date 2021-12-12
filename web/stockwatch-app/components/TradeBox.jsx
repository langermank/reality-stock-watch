import PropTypes from 'prop-types';
import Button from 'components/Button';
import { MinusCircle } from 'phosphor-react';

function TradeBox({ styles, className, remainingBalance, transactionLines, clearTrade }) {
    if (transactionLines.length == 0) {
        return <></>;
    }

    const tradeLines = transactionLines.map(({ contestantID, nickname, quantity, subtotal }) => (
        <li key={contestantID} className={styles.cartItem}>
            <span className={styles.cartItemWrap}>
                <span className={styles.quantity}>{quantity}x</span>

                <span>{nickname}</span>
                <span>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(subtotal)}
                </span>
            </span>
            <Button
                variant="secondaryHint"
                iconOnly
                onClick={() => clearTrade(contestantID)}
                icon={<MinusCircle />}
                size="small">
                Remove item
            </Button>
        </li>
    ));
    return (
        <div className={className}>
            <div className={styles.funds}>
                <ul className={styles.tradeLinesWrap}>{tradeLines}</ul>
                <p>
                    Remaining funds:{' '}
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(remainingBalance)}
                </p>
            </div>
        </div>
    );
}

TradeBox.propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    remainingBalance: PropTypes.number,
    transactionLines: PropTypes.array,
    clearTrade: PropTypes.func,
};

export default TradeBox;
