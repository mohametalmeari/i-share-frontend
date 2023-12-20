import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL, setHeaders } from '../utils';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (_, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.get(`${baseURL}/photos`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to connect');
    }
  },
);

export const createPhoto = createAsyncThunk(
  'photos/createPhoto',
  async (formData, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.post(`${baseURL}/photos`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to create');
    }
  },
);

export const deletePhoto = createAsyncThunk(
  'photos/deletePhoto',
  async (photoId, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.delete(`${baseURL}/photos/${photoId}`);
      return { deleted: response.data.message === 'deleted', photoId };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to delete');
    }
  },
);

export const archivePhoto = createAsyncThunk(
  'photos/archivePhoto',
  async (photoId, thunkAPI) => {
    try {
      setHeaders();

      const response = await axios.put(`${baseURL}/photos/${photoId}`);
      return { archive: response.data.archive, photoId };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to archive');
    }
  },
);

export const likePhoto = createAsyncThunk(
  'photos/likePhoto',
  async ({ id, liked }, thunkAPI) => {
    try {
      setHeaders();
      const response = liked
        ? await axios.delete(`${baseURL}/photos/${id}/unlike`)
        : await axios.post(`${baseURL}/photos/${id}/like`);

      return { liked: response.data.liked, id };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to like');
    }
  },
);

export const fetchPhoto = createAsyncThunk(
  'photos/fetchPhoto',
  async (photoId, thunkAPI) => {
    try {
      setHeaders();
      const response = await axios.get(`${baseURL}/photos/${photoId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('failed to like');
    }
  },
);

const initialState = {
  photos: [],
  photo: {
    id: 0, image_url: '', caption: '', likes: 0, liked: false, user: { name: '', username: '', control: false },
  },
  isLoading: true,
  error: undefined,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  extraReducers: (builder) => {
    builder
    // Fetch Photos
      .addCase(fetchPhotos.pending, () => {
        // state.isLoading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        // state.isLoading = false;
        state.photos = payload;
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        // state.isLoading = false;
        state.error = payload;
      })
    // Create Photo
      .addCase(createPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPhoto.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPhoto.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Delete Photo
      .addCase(deletePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.deleted) {
          state.photos = state.photos.filter((obj) => (obj.id !== payload.photoId));
        }
      })
      .addCase(deletePhoto.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Archive Photo
      .addCase(archivePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(archivePhoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.archive) {
          state.photos = state.photos.filter((obj) => (obj.id !== payload.photoId));
        }
      })
      .addCase(archivePhoto.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Like Photo
      .addCase(likePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePhoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.photos = state.photos.map((obj) => (obj.id === payload.id
          ? { ...obj, liked: payload.liked, likes: (payload.liked ? obj.likes + 1 : obj.likes - 1) }
          : obj));
        if (state.photo.id === payload.id) {
          state.photo = {
            ...state.photo,
            liked: payload.liked,
            likes: (payload.liked ? state.photo.likes + 1 : state.photo.likes - 1),
          };
        }
      })
      .addCase(likePhoto.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
    // Fetch Photo
      .addCase(fetchPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPhoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.photo = payload;
      })
      .addCase(fetchPhoto.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },

});

export default photoSlice.reducer;
