import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import photoReducer from './posts/photoSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    photo: photoReducer,
  },
});

export default store;
