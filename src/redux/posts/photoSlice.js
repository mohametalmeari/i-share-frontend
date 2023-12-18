import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://i-share-api.onrender.com';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (_, thunkAPI) => {
    try {
      const authHeaders = JSON.parse(Cookies.get('authHeaders')) || null;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.headers.common.uid = authHeaders.uid;
      axios.defaults.headers.common.client = authHeaders.client;
      axios.defaults.headers.common['access-token'] = authHeaders['access-token'];

      const response = await axios.get(`${baseURL}/photos`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('failed to connect');
    }
  },
);

const initialState = {
  photos: [],
  isLoading: true,
  error: undefined,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.photos = payload;
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },

});

export default photoSlice.reducer;
