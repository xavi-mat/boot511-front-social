import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {},
};

export const getAll = createAsyncThunk(
  "posts/getAll",
  async () => {
    try {
      return await postsService.getAll();
    } catch (error) {
      console.error(error);
    }
  }
);

export const getById = createAsyncThunk(
  "posts/getById",
  async (id) => {
    try {
      return await postsService.getById(id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getPostsByTitle = createAsyncThunk(
  "post/getPostByTitle",
  async (postTitle) => {
    try {
      return await postsService.getPostsByTitle(postTitle);
    } catch (error) {
      console.error(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.post = action.payload.post;
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsByTitle.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPostsByTitle.pending, (state) => {
        state.isLoading = true;
      })
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;