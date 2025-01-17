import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {usersReducer} from '../features/users/usersSlice';
import {persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';
import {messagesReducer} from '../features/chat/MessagesSlice';


const usersPersistConfig = {
  key: 'chat:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  messages: messagesReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;