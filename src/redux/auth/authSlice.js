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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const authHeaders = JSON.parse(Cookies.get('authHeaders')) || null;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.headers.common.uid = authHeaders.uid;
      axios.defaults.headers.common.client = authHeaders.client;
      axios.defaults.headers.common['access-token'] = authHeaders['access-token'];

      const logout = await axios.delete(`${baseURL}/auth/sign_out`);
      return logout.data.success;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  username: Cookies.get('username') || null,
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
        state.username = payload.username;
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
          state.username = null;
        }
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
