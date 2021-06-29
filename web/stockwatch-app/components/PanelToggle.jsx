import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ArrowLineLeft, ArrowLineRight, List, X } from 'phosphor-react';
import styles from '../styles/navbar.module.scss';

const PanelToggle = ({ mobileToggle, desktopToggle }) => {
    const [activePanel, setActivePanel] = useState(document.body.dataset.panelState);
    const inactivePanel = activePanel === 'open' ? 'closed' : 'open';

    useEffect(() => {
        document.body.dataset.panelState = activePanel;
        window.localStorage.setItem('panelState', activePanel);
    }, [activePanel]);

    return (
        <button
            onClick={() => setActivePanel(inactivePanel)}
            className={clsx(styles.collapseButton, mobileToggle && styles.mobileMenuBtn)}>
            {desktopToggle && activePanel === 'open' && (
                <ArrowLineLeft className={styles.itemIcon} />
            )}
            {desktopToggle && activePanel === 'closed' && (
                <ArrowLineRight className={styles.itemIcon} />
            )}
            {mobileToggle && activePanel === 'open' && <X className={styles.itemIcon} />}
            {mobileToggle && activePanel === 'closed' && <List className={styles.itemIcon} />}

            <span className={styles.itemLabel}>Collapse panel</span>
        </button>
    );
};

PanelToggle.propTypes = {
    mobileToggle: PropTypes.bool,
    desktopToggle: PropTypes.bool,
};

PanelToggle.defaultProps = {
    mobileToggle: false,
    desktopToggle: false,
};

export default PanelToggle;
