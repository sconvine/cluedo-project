import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import * as React from 'react';


export default function CardMenu() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleCloseMenu = (event: Event | React.SyntheticEvent) => {
        console.log('closing menu', event)
       setAnchorEl(null);
    };


    return (
        <Popper
            open={!!anchorEl}
            anchorEl={anchorEl}
            transition
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleCloseMenu}>
                            <MenuList
                                autoFocusItem={!!anchorEl}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                            >
                                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                                <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}