import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL, setHeaders } from '../utils';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (photoId, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.get(`${baseURL}/photos/${photoId}/comments`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to connect');
    }
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ formData, photoId }, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.post(`${baseURL}/photos/${photoId}/comments`, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to connect');
    }
  },
);

const initialState = {
  comments: [],
  isLoading: true,
  error: undefined,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  extraReducers: (builder) => {
    builder
    // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = payload;
        console.log(state.comments);
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Create Comment
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },

});

export default commentSlice.reducer;
