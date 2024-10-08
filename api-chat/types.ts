import {Model} from 'mongoose';
import Message from './models/Message';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>

export interface IncomingMessage {
  type: string;
  payload: string;
}