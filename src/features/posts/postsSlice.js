import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: {},
  isLoading: false,
  post: {},
};

export const getAll = createAsyncThunk(
  "posts/getAll",
  async (page=1) => {
    try {
      return await postsService.getAll(page);
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

export const getPostsByText = createAsyncThunk(
  "post/getPostByText",
  async (postText) => {
    try {
      return await postsService.getPostsByText(postText);
    } catch (error) {
      console.error(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePosts",
  async (id) => {
    try {
      return await postsService.deletePost(id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const cleanAll = createAsyncThunk(
  "posts/cleanAll",
  async () => {
    try {
      return await postsService.cleanAll();
    } catch (error) {
      console.error(error);
    }
  }
)

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    try {
      return await postsService.createPost(postData);
    } catch (error) {
      console.error(error);
      // const message = error.response.data.msg;
      // return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData) => {
    try {
      return await postsService.createComment(commentData);
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
      .addCase(getPostsByText.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPostsByText.pending, (state) => {
        state.isLoading = true;
      }).
      addCase(deletePost.fulfilled, (state, action) => {
        const posts = state.posts.posts?.filter(p => p._id !== action.payload._id);
        state.posts = { ...state.posts, posts }
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts?.posts.pop();
        state.posts?.posts.unshift(action.payload.post);
        state.posts = { ...state.posts };
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.post.comments = [action.payload.comment, ...state.post.comments]
      })
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;