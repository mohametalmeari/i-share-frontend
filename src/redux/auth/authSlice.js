import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL, setHeaders } from '../utils';

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
      return thunkAPI.rejectWithValue('failed to log in');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      setHeaders();

      const logout = await axios.delete(`${baseURL}/auth/sign_out`);
      return logout.data.success;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to log out');
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (formData, thunkAPI) => {
    try {
      const signup = await axios.post(`${baseURL}/auth`, formData);
      const authHeaders = {
        uid: signup.headers.uid,
        client: signup.headers.client,
        'access-token': signup.headers['access-token'],
      };
      const { username } = signup.data.data;
      return { authHeaders, username };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to sign up');
    }
  },
);

const initialState = {
  loggedIn: Cookies.get('loggedIn') || false,
  username: Cookies.get('username') || null,
  isLoading: false,
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
        state.username = payload.username;
        state.loggedIn = true;

        Cookies.set('loggedIn', JSON.stringify(true));
        Cookies.set('authHeaders', JSON.stringify(payload.authHeaders));
        Cookies.set('username', JSON.stringify(state.username));
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          Cookies.remove('authHeaders');
          Cookies.remove('username');
          Cookies.remove('loggedIn');
          state.username = null;
          state.loggedIn = false;
        }
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.loggedIn = false;
        Cookies.set('loggedIn', JSON.stringify(false));
      })
    // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.username = payload.username;
        state.loggedIn = true;

        Cookies.set('loggedIn', JSON.stringify(true));
        Cookies.set('authHeaders', JSON.stringify(payload.authHeaders));
        Cookies.set('username', JSON.stringify(state.username));
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.loggedIn = false;
        Cookies.set('loggedIn', JSON.stringify(false));
      });
  },
});

export default authSlice.reducer;
