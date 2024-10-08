import {Box, Container, Stack} from '@mui/material';
import OnlineUsers from './components/OnlineUsers';
import ChatRoom from './components/ChatRoom';
import AddMessageForm from './components/AddMessageForm';
import {ChatMessage, IncomingMessage, User} from '../../types';
import {useEffect, useRef, useState} from 'react';
import {addOnlineUser, removeOnlineUser, selectOnlineUsers, selectUser} from '../users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

const ChatPage = () => {
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/chat');

    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.current?.send(JSON.stringify({ type: 'LOGIN', payload: currentUser?.token }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'ONLINE_USERS') {
        data.payload.forEach((user: User) => {
          dispatch(addOnlineUser(user));
        });
      }

      if (data.type === 'USER_DISCONNECTED') {
        dispatch(removeOnlineUser(data.payload.username));
      }

      if (data.type === 'NEW_MESSAGE') {
        setMessages((prev) => [...prev, data.payload]);
      }

      if (data.type === 'LAST_MESSAGES') {
        setMessages(data.payload.map((message: IncomingMessage) => ({
          user: message.username.username,
          message: message.message,
        })));
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed, attempting to reconnect...');
    };

    return () => {
      ws.current?.close();
    };
  }, [currentUser]);

  const handleSubmit = (message: ChatMessage) => {
    if (!ws.current) return;
    setMessages((prev) => [...prev, message]);

    ws.current.send(JSON.stringify({
      type: 'SEND_MESSAGE',
      payload: message,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Stack direction="row" gap={2}>
        <Box sx={{ width: '25%' }}>
          <OnlineUsers onlineUsers={onlineUsers} />
        </Box>

        <Box sx={{ width: '75%' }}>
          <ChatRoom messages={messages} />
          <AddMessageForm onSubmit={handleSubmit} isLoading={false} />
        </Box>
      </Stack>
    </Container>
  );
};

export default ChatPage;
