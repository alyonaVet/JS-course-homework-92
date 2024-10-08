import {Box, Typography} from '@mui/material';

const OnlineUsers = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" color="textSecondary" mb={1}>
        Online users
      </Typography>
      <Box sx={{border: '1px solid #b0bec5', height: '80vh'}}>

      </Box>
    </Box>
  );
};

export default OnlineUsers;