export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface ChatMessage {
  user: string;
  message: string;
}

export interface IncomingMessage {
  username: {
    username: string;
  };
  message: string;
}

