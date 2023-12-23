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

export const fetchReplies = createAsyncThunk(
  'comments/fetchReplies',
  async ({ photoId, commentId }, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.get(`${baseURL}/photos/${photoId}/comments/${commentId}/replies`);
      return { replies: response.data, commentId };
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to connect');
    }
  },
);

export const createReply = createAsyncThunk(
  'comments/createReply',
  async ({ formData, photoId, commentId }, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.post(`${baseURL}/photos/${photoId}/comments/${commentId}/replies`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to connect');
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ id, photoId }, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.delete(`${baseURL}/photos/${photoId}/comments/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to connect');
    }
  },
);

export const deleteReply = createAsyncThunk(
  'comments/deleteReply',
  async ({ id, photoId, commentId }, thunkAPI) => {
    try {
      setHeaders();
      const response = await axios.delete(`${baseURL}/photos/${photoId}/comments/${commentId}/replies/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to connect');
    }
  },
);

export const likeComment = createAsyncThunk(
  'comments/likeComment',
  async ({ id, photoId, liked }, thunkAPI) => {
    try {
      setHeaders();
      const response = liked
        ? await axios.delete(`${baseURL}/photos/${photoId}/comments/${id}/unlike`)
        : await axios.post(`${baseURL}/photos/${photoId}/comments/${id}/like`);

      return { liked: response.data.liked, likes: response.data.likes, id };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to like');
    }
  },
);

export const likeReply = createAsyncThunk(
  'comments/likeReply',
  async ({
    id, photoId, commentId, liked,
  }, thunkAPI) => {
    try {
      setHeaders();
      const response = liked
        ? await axios.delete(`${baseURL}/photos/${photoId}/comments/${commentId}/replies/${id}/unlike`)
        : await axios.post(`${baseURL}/photos/${photoId}/comments/${commentId}/replies/${id}/like`);

      return { liked: response.data.liked, likes: response.data.likes, id };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to like');
    }
  },
);

const initialState = {
  comments: [],
  comment: {},
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
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Fetch Replies
      .addCase(fetchReplies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReplies.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchReplies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Create Comment
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Create Reply
      .addCase(createReply.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReply.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createReply.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Delete Comment
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Delete Reply
      .addCase(deleteReply.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReply.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteReply.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Like Comment
      .addCase(likeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = state.comments.map((obj) => (obj.id === payload.id
          ? { ...obj, liked: payload.liked, likes: payload.likes }
          : obj));
        if (state.comment.id === payload.id) {
          state.comment = {
            ...state.comment,
            liked: payload.liked,
            likes: payload.likes,
          };
        }
      })
      .addCase(likeComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Like Reply
      .addCase(likeReply.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeReply.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(likeReply.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },

});

export default commentSlice.reducer;
