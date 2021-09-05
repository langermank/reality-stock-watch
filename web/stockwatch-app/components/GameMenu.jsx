import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/components/dropdown.module.scss';
import linkStyles from '../styles/components/navbarLink.module.scss';
import { useUser } from '../backend/RealityStockWatchBackend';
import Button from './Button.jsx';
import { Gear, UserCircle, CaretDown, SignIn, SignOut } from 'phosphor-react';
import { useMenuTriggerState } from '@react-stately/menu';
import { useButton } from '@react-aria/button';
import { useMenu, useMenuItem, useMenuTrigger } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';
import { Item } from '@react-stately/collections';
import { mergeProps } from '@react-aria/utils';
import { FocusScope } from '@react-aria/focus';
import { useFocus } from '@react-aria/interactions';
import { useOverlay, DismissButton } from '@react-aria/overlays';

// export const MenuButton = React.forwardRef(({ props }, ref) => {
const MenuButton = (props) => {
    // Create state based on the incoming props
    let state = useMenuTriggerState(props);

    // Get props for the menu trigger and menu elements
    let ref = React.useRef();
    let { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

    // Get props for the button based on the trigger props from useMenuTrigger
    let { buttonProps } = useButton(menuTriggerProps, ref);

    return (
        <div className={styles.dropdownTriggerWrap}>
            <Button
                variant="primary"
                ref={ref}
                {...buttonProps}
                icon={<CaretDown weight="fill" className={styles.dropdownTriggerIcon} />}
                iconPosition="right"
                className={styles.dropdownTrigger}
                width="fullWidth">
                <div className={styles.dropdownTriggerLabelWrap}>
                    <UserCircle className={styles.dropdownTriggerLabelIcon} />
                    <div className={styles.dropdownTriggerLabel}>{props.label}</div>
                </div>
            </Button>
            {/* <button ref={ref} {...buttonProps}>
                hey
            </button> */}
            {state.isOpen && (
                <MenuPopup
                    {...props}
                    domProps={menuProps}
                    autoFocus={state.focusStrategy}
                    onClose={() => state.close()}
                />
            )}
        </div>
    );
};

function MenuPopup(props) {
    // Create menu state based on the incoming props
    let state = useTreeState({ ...props, selectionMode: 'none' });

    // Get props for the menu element
    let ref = React.useRef();
    let { menuProps } = useMenu(props, state, ref);

    // Handle events that should cause the menu to close,
    // e.g. blur, clicking outside, or pressing the escape key.
    let overlayRef = React.useRef();
    let { overlayProps } = useOverlay(
        {
            onClose: props.onClose,
            shouldCloseOnBlur: true,
            isOpen: true,
            isDismissable: true,
        },
        overlayRef
    );

    const { toggleLogin } = useUser();

    // Wrap in <FocusScope> so that focus is restored back to the
    // trigger when the menu is closed. In addition, add hidden
    // <DismissButton> components at the start and end of the list
    // to allow screen reader users to dismiss the popup easily.
    return (
        <FocusScope restoreFocus>
            <div {...overlayProps} ref={overlayRef}>
                <DismissButton onDismiss={props.onClose} />
                <ul
                    {...mergeProps(menuProps, props.domProps)}
                    ref={ref}
                    className={styles.dropdownMenu}>
                    {[...state.collection].map((item) => (
                        <MenuItem
                            key={item.key}
                            item={item}
                            state={state}
                            onAction={props.onAction}
                            onClose={props.onClose}
                            icon={props.icon}
                        />
                    ))}
                </ul>
                <DismissButton onDismiss={props.onClose} />
            </div>
        </FocusScope>
    );
}

function MenuItem({ item, state, onAction, onClose, onClick }) {
    // Get props for the menu item element
    let ref = React.useRef();
    let { menuItemProps } = useMenuItem(
        {
            key: item.key,
            isDisabled: item.isDisabled,
            onAction,
            onClose,
        },
        state,
        ref
    );

    // Handle focus events so we can apply highlighted
    // style to the focused menu item
    let [isFocused, setFocused] = React.useState(false);
    let { focusProps } = useFocus({ onFocusChange: setFocused });

    return (
        <li className={linkStyles.linkWrap}>
            {item.icon}
            <span className={linkStyles.linkLabel} data-visible>
                {item.rendered}
            </span>
        </li>
    );
}

MenuItem.propTypes = {
    icon: PropTypes.node,
};

export const GameMenu = () => {
    function onClick() {
        alert('Hello World!');
    }

    return (
        <MenuButton label="SelectedGame">
            <Item onClick={onClick} icon={<UserCircle />}>
                BBUS23
            </Item>
            <Item onClick={onClick} icon={<Gear weight="fill" />}>
                Survivor30
            </Item>
        </MenuButton>
    );
};
