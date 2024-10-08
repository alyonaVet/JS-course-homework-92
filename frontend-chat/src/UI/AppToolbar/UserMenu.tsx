import {Box, Button, Menu, MenuItem} from '@mui/material';
import {User} from '../../types';
import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../features/users/usersThunk';
import {useNavigate} from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <Box display="flex" alignItems="center">
      <Button onClick={handleClick} color="inherit">
        {user.username}
      </Button>
      <Menu anchorEl={anchorEl} open={isOpen} keepMounted onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;