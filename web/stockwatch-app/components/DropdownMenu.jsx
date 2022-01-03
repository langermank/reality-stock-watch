/* eslint-disable react/display-name */
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check } from 'phosphor-react';
// import { CheckIcon } from '@radix-ui/react-icons';
export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.Content ref={forwardedRef}>
            {children}

            {/* <DropdownMenuPrimitive.Arrow /> */}
        </DropdownMenuPrimitive.Content>
    );
});
export const DropdownMenuLabel = DropdownMenuPrimitive.Label;

export const DropdownMenuItem = DropdownMenuPrimitive.Item;

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuCheckboxItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <DropdownMenuPrimitive.CheckboxItem {...props} ref={forwardedRef}>
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
        <DropdownMenuPrimitive.RadioItem {...props} ref={forwardedRef}>
            {children}

            <DropdownMenuPrimitive.ItemIndicator>
                <Check />
            </DropdownMenuPrimitive.ItemIndicator>
        </DropdownMenuPrimitive.RadioItem>
    );
});
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
