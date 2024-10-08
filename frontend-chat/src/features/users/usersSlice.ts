import {GlobalError, User, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {login, register} from './usersThunk';

export interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  onlineUsers: User[],
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  onlineUsers: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    addOnlineUser(state, action) {
      state.onlineUsers.push(action.payload);
    },
    removeOnlineUser(state, action) {
      state.onlineUsers = state.onlineUsers.filter(user => user.username !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, {payload: user}) => {
        state.registerLoading = false;
        state.user = user;
      })
      .addCase(register.rejected, (state, {payload: error}) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, {payload: user}) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, {payload: error}) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectOnlineUsers: (state) => state.onlineUsers,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
  }
});

export const usersReducer =  usersSlice.reducer;

export const {unsetUser, addOnlineUser, removeOnlineUser} = usersSlice.actions;

export const {
  selectUser,
  selectOnlineUsers,
  selectRegisterError,
  selectLoginError,
} = usersSlice.selectors;