import {Box, Container, Stack} from '@mui/material';
import OnlineUsers from './components/OnlineUsers';
import ChatRoom from './components/ChatRoom';
import AddMessageForm from './components/AddMessageForm';

const ChatPage = () => {
  return (
    <Container maxWidth="lg" sx={{mt: 2}}>
      <Stack direction="row" gap={2}>
        <Box sx={{width: '25%'}}>
          <OnlineUsers />
        </Box>
        <Box sx={{width: '75%'}}>
          <ChatRoom />
          <AddMessageForm onSubmit={() => null} isLoading={false}/>
        </Box>
      </Stack>

    </Container>
  );
};

export default ChatPage;