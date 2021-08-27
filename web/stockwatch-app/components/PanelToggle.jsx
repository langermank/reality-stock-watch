import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from './Button.jsx';
import { ArrowLineLeft, ArrowLineRight, List, X } from 'phosphor-react';
import styles from '../styles/navbar.module.scss';

const PanelToggle = ({ mobileToggle, desktopToggle }) => {
    const [activePanel, setActivePanel] = useState(document.body.dataset.panelState);
    const inactivePanel = activePanel === 'open' ? 'closed' : 'open';

    useEffect(() => {
        document.body.dataset.panelState = activePanel;
        window.localStorage.setItem('panelState', activePanel);
    }, [activePanel]);

    const icons = (
        <>
            {desktopToggle && activePanel === 'open' && <ArrowLineLeft />}
            {desktopToggle && activePanel === 'closed' && <ArrowLineRight />}
            {mobileToggle && activePanel === 'open' && <X />}
            {mobileToggle && activePanel === 'closed' && <List />}
        </>
    );

    return (
        <Button
            variant="secondaryHint"
            onClick={() => setActivePanel(inactivePanel)}
            className={clsx(mobileToggle && styles.mobileMenuBtn)}
            icon={icons}
            iconOnly={mobileToggle || (desktopToggle && activePanel === 'closed')}
            iconPosition="left"
            ariaLabelledById="close-panel"
            width="fullWidth">
            Collapse
        </Button>
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
