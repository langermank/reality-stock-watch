/* eslint-disable react/display-name */
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
// import Button from './Button.jsx';

export function Dialog({ children, ...props }) {
    return (
        <DialogPrimitive.Root {...props}>
            <DialogPrimitive.Overlay />
            {children}
        </DialogPrimitive.Root>
    );
}

export const DialogContent = React.forwardRef(({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Content {...props} ref={forwardedRef}>
        {children}
        <DialogPrimitive.Close>
            <X />
        </DialogPrimitive.Close>
    </DialogPrimitive.Content>
));

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

Dialog.displayName = 'Dialog';

{
    /* <Button
    variant="primary"
    onClick={toggleLogin}
    iconPosition="rightCentered"
    icon={<SignIn />}
    // fix state issue later
    // iconOnly={activePanel === 'closed'}
    width="fullWidth"
    className={styles.iconOnlyHack}>
    <div className={styles.dropdownTriggerLabel}>Sign-in or join</div>
</Button>; */
}
