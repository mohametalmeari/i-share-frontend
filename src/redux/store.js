import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import photoReducer from './posts/photoSlice';
import commentReducer from './posts/commentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    photo: photoReducer,
    comment: commentReducer,
  },
});

export default store;
