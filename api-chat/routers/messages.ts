import express from 'express';
import {Application} from 'express';
import expressWs from 'express-ws';
import {WebSocket} from 'ws';
import {IncomingMessage} from '../types';
import User from '../models/User';
import Message from '../models/Message';

const router = express.Router();
const connectedClients: { ws: WebSocket; username: string }[] = [];

const messagesRouter = (app: Application) => {
  const wsInstance = expressWs(app);

  wsInstance.app.ws('/chat', (ws, req) => {
    let username = 'Anonymous';
    let userId: string | null = null;

    ws.on('message', async (message) => {
      try {
        const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;

        if (decodedMessage.type === 'LOGIN') {
          const token = decodedMessage.payload;
          if (!token) {
            ws.send(JSON.stringify({type: 'ERROR', payload: 'Missing token'}));
            ws.close();
            return;
          }
          const user = await User.findOne({token});

          if (!user) {
            ws.send(JSON.stringify({type: 'ERROR', payload: 'Invalid token'}));
            ws.close();
            return;
          }

          username = user.username;
          userId = user._id.toString();
          connectedClients.push({ws, username});

          passUserList();

          const lastMessages = await Message
            .find()
            .sort({_id: -1})
            .limit(30)
            .populate('user', 'username');

          ws.send(JSON.stringify({
            type: 'LAST_MESSAGES',
            payload: lastMessages.map(message => ({
              username: message.user,
              message: message.message,
            })),
          }));
        }

        if (decodedMessage.type === 'SEND_MESSAGE' && userId) {
          const newMessage = new Message({
            user: userId,
            message: decodedMessage.payload,
          });

          await newMessage.save();

          connectedClients.forEach(client => {
            client.ws.send(JSON.stringify({
              type: 'NEW_MESSAGE',
              payload: {
                username,
                message: decodedMessage.payload,
              },
            }));
          });
        }
      } catch (error) {
        ws.send(JSON.stringify({error: error}));
      }
    });

    ws.on('close', () => {
      const index = connectedClients.findIndex(client => client.ws === ws);
      if (index !== -1) {
        const disconnectedUser = connectedClients[index].username;
        connectedClients.splice(index, 1);
        passUserList();
      }
    });
  });

  const passUserList = () => {
    const onlineUsernames = connectedClients.map(client => client.username);
    const userUpdateMessage = {
      type: 'ONLINE_USERS',
      payload: onlineUsernames,
    };

    connectedClients.forEach(client => {
      client.ws.send(JSON.stringify(userUpdateMessage));
    });
  };

  return router;
};

export default messagesRouter;
