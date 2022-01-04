/* eslint-disable react/display-name */
import React from 'react';
import styles from '../styles/components/dropdown.module.scss';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, CheckCircle } from 'phosphor-react';
// import { CheckIcon } from '@radix-ui/react-icons';
export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Content ref={forwardedRef} className={styles.dropdownMenuNew}>
            {children}

            {/* <DropdownMenuPrimitive.Arrow /> */}
        </DropdownMenuPrimitive.Content>
    );
});
// export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuLabel = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Label
            {...props}
            ref={forwardedRef}
            className={styles.dropdownMenuGroupLabel}>
            {children}
        </DropdownMenuPrimitive.Label>
    );
});

export const DropdownMenuItem = DropdownMenuPrimitive.Item;

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuCheckboxItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            {...props}
            ref={forwardedRef}
            className={styles.dropdownMenuItem}>
            {children}

            <DropdownMenuPrimitive.ItemIndicator>
                <Check />
            </DropdownMenuPrimitive.ItemIndicator>
        </DropdownMenuPrimitive.CheckboxItem>
    );
});
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.RadioItem
            {...props}
            ref={forwardedRef}
            className={styles.dropdownMenuItem}>
            <DropdownMenuPrimitive.ItemIndicator className={styles.ItemIndicator}>
                <CheckCircle weight="fill" />
            </DropdownMenuPrimitive.ItemIndicator>
            <span className={styles.dropdownMenuItemLabel}>{children}</span>
            {/* {children} */}
        </DropdownMenuPrimitive.RadioItem>
    );
});
// export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;

export const DropdownMenuSeparator = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Separator
            {...props}
            ref={forwardedRef}
            className={styles.dropdownMenuSeparator}>
            {children}
        </DropdownMenuPrimitive.Separator>
    );
});
