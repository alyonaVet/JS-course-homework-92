import {Box, List, ListItem, ListItemText, Typography} from '@mui/material';
import {ChatMessage} from '../../../types';
import React from 'react';

interface Props {
  messages: ChatMessage[];
}

const ChatRoom: React.FC<Props> = ({messages}) => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" color="textSecondary" mb={1}>
        Chat room
      </Typography>
      <Box sx={{border: '1px solid #b0bec5', height: '65vh'}}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${message.user}: ${message.message}`}/>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ChatRoom;