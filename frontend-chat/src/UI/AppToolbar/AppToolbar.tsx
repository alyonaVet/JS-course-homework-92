import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <Box sx={{m: 0}}>
      <AppBar position="static" sx={{backgroundColor: '#448aff'}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <NavLink to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <Typography variant="h6">
              Chat
            </Typography>
          </NavLink>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <AnonymousMenu />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;