import express from 'express';
import expressWs from 'express-ws';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import usersRouter from './routers/users';
import messagesRouter from './routers/messages'; // WebSocket router

const app = express();

expressWs(app);

app.use(express.json());
app.use(cors(config.corsOptions));
app.use('/users', usersRouter);

messagesRouter(app);

const port = 8000;
const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
