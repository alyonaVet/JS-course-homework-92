import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatMessage} from '../../types';

interface MessagesState {
  messages: ChatMessage[];
}

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
  },
});
export const messagesReducer =  messagesSlice.reducer;

export const { addMessage } = messagesSlice.actions;


