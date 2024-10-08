import {Box, List, ListItem, Typography} from '@mui/material';
import React from 'react';
import {User} from '../../../types';

interface OnlineUsersProps {
  onlineUsers: User[];
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({onlineUsers}) => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" color="textSecondary" mb={1}>
        Online users
      </Typography>
      <Box sx={{border: '1px solid #b0bec5', height: '80vh'}}>
        {onlineUsers.length === 0 ? (
          <Typography variant="body2">No users online</Typography>
        ) : (
          <List>
            {onlineUsers.map((user, index) => (
              <ListItem key={index}>
                <Typography variant="body1">{user}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default OnlineUsers;