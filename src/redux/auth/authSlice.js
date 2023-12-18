import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://i-share-api.onrender.com';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const login = await axios.post(`${baseURL}/auth/sign_in`, formData);
      const authHeaders = {
        uid: login.headers.uid,
        client: login.headers.client,
        'access-token': login.headers['access-token'],
      };
      const { username } = login.data.data;
      return { authHeaders, username };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  username: Cookies.get('username') || null,
  authHeaders: Cookies.get('authHeaders') || {},
  isLoading: true,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
    // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authHeaders = payload.authHeaders;
        state.username = payload.username;
        Cookies.set('authHeaders', JSON.stringify(state.authHeaders));
        Cookies.set('username', JSON.stringify(state.username));
        console.log(state.authHeaders);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
