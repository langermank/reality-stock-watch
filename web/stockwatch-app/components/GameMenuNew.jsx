import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/components/dropdown.module.scss';
import Button from './Button.jsx';
import clsx from 'clsx';
import { Diamond, UserCircle, CaretDown, SignIn, SignOut } from 'phosphor-react';
import { useBackendContext } from 'backend/context';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
} from './DropdownMenu.jsx';

// return <MenuButton label={selectedSeason.shortName}>{seasonList}</MenuButton>;

export const GameMenuNew = () => {
    const [checked, setChecked] = React.useState();
    const { activeSeasons, selectedSeason, setSelectedSeasonID } = useBackendContext();
    // console.log(selectedSeason);

    const seasonList = activeSeasons.map((season) => (
        <DropdownMenuRadioItem
            key={season.id}
            value={season.shortName}
            onSelect={(event) => {
                event.preventDefault();
                setSelectedSeasonID(season.id);
            }}>
            {season.shortName}
        </DropdownMenuRadioItem>
    ));
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="primary"
                    icon={<CaretDown weight="fill" className={styles.dropdownTriggerIcon} />}
                    iconPosition="right"
                    className={clsx(styles.dropdownTrigger, styles.iconOnlyHack)}
                    width="fullWidth">
                    <div className={styles.dropdownTriggerLabelWrap}>
                        <Diamond weight="fill" className={styles.dropdownTriggerLabelIcon} />
                        <div className={styles.dropdownTriggerLabel}>
                            {selectedSeason.shortName}
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Active games</DropdownMenuLabel>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuRadioGroup value={checked} onValueChange={setChecked}>
                    {seasonList}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
