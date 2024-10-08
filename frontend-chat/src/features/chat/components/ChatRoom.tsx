import {Box, Typography} from '@mui/material';

const ChatRoom = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" color="textSecondary" mb={1}>
        Chat room
      </Typography>
      <Box sx={{border: '1px solid #b0bec5', height: '65vh'}}>

      </Box>
    </Box>
  );
};

export default ChatRoom;