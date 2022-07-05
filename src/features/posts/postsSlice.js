import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { act } from "react-dom/test-utils";
import postsService from "./postsService";

const initialState = {
  posts: {},
  isLoading: false,
  post: {},
  user: null,
};

export const getAll = createAsyncThunk(
  "posts/getAll",
  async (page = 1) => {
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

export const getPostsByUserId = createAsyncThunk(
  "post/getPostsByUserId",
  async ({ userId, page = 1 }) => {
    try {
      return await postsService.getPostsByUserId({ userId, page });
    } catch (error) {
      console.error(error)
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePosts",
  async (id, thunkAPI) => {
    try {
      return await postsService.deletePost(id);
    } catch (error) {
      console.info(error);
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
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

export const getSomeUser = createAsyncThunk(
  "users/getSomeUser",
  async (id, thunkAPI) => {
    try {
      return await postsService.getSomeUser(id);
    } catch (error) {
      console.log("error.response.data", error.response.data)
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id, thunkAPI) => {
    try {
      return await postsService.deleteComment(id);
    } catch (error) {
      console.log("error.response.data", error.response.data)
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async (postData, thunkAPI) => {
    try {
      return await postsService.updatePost(postData);
    } catch (error) {
      console.log("Slice: updatePost", error.response.data);
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async (commentData, thunkAPI) => {
    try {
      return await postsService.updateComment(commentData);
    } catch (error) {
      console.log("Slide: updateComment", error.response.data);
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
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
      })
      .addCase(getPostsByUserId.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPostsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const posts = state.posts.posts?.filter(p => p._id !== action.payload.post._id);
        state.posts = { ...state.posts, posts }
        notification.success({ message: "Deleted" });
      })
      .addCase(deletePost.rejected, (state, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts?.posts.pop();
        state.posts?.posts.unshift(action.payload.post);
        state.posts = { ...state.posts };
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.post.comments = [action.payload.comment, ...state.post.comments]
      })
      .addCase(getSomeUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getSomeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSomeUser.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const comments = state.post.comments
          .filter(c => c._id !== action.payload.comment._id);
        state.post = { ...state.post, comments };
      })
      .addCase(deleteComment.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.post = action.payload.post;
      })
      .addCase(updatePost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const comments = state.post.comments
          .filter(c => c._id !== action.payload.comment._id);
        state.post.comments = [action.payload.comment, ...comments];
      })
      .addCase(updateComment.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;