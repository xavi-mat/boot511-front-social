import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import postsService from "./postsService";

const initialState = {
  posts: {},
  isLoading: false,
  post: {},
  commentsData: {},
  user: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (page = 1) => {
    try {
      return await postsService.getAllPosts(page);
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
  async (postData, thunkAPI) => {
    try {
      return await postsService.createPost(postData);
    } catch (error) {
      console.error("posts/createPost", error.response.data);
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentsData, thunkAPI) => {
    try {
      return await postsService.createComment(commentsData);
    } catch (error) {
      console.error("comments/createComment", error.response.data);
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
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
  async (commentsData, thunkAPI) => {
    try {
      return await postsService.updateComment(commentsData);
    } catch (error) {
      console.log("Slice: updateComment", error.response.data);
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCommentsByPostId = createAsyncThunk(
  "comments/getByPostId",
  async (data, thunkAPI) => {
    try {
      return await postsService.getCommentsByPostId(data);
    } catch (error) {
      console.log("Slice: getByPostId", error.response.data);
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
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
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
      .addCase(deletePost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts?.posts.pop();
        state.posts?.posts.unshift(action.payload.post);
        state.posts = { ...state.posts };
      })
      .addCase(createPost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentsData.comments = state.commentsData.comments ?? [];
        state.commentsData.comments = [action.payload.comment, ...state.commentsData.comments]
      })
      .addCase(createComment.rejected, (_, action) => {
        notification.error({ message: action.payload });
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
        state.commentsData.comments = state.commentsData.comments ?? [];
        const comments = state.commentsData.comments.filter(
          c => c._id !== action.payload.comment._id
        );
        state.commentsData.comments = [...comments];
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
        state.commentsData.comments = state.commentsData.comments ?? [];
        const comments = state.commentsData.comments
          .filter(c => c._id !== action.payload.comment._id);
        state.commentsData.comments = [action.payload.comment, ...comments];
      })
      .addCase(updateComment.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        state.commentsData.total = action.payload.total;
        state.commentsData.page = action.payload.page;
        state.commentsData.maxPages = action.payload.maxPages;
        state.commentsData.comments = state.commentsData.comments ?? [];
        state.commentsData.comments = [...state.commentsData.comments, ...action.payload.comments];
      })
      .addCase(getCommentsByPostId.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;