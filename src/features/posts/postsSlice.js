import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import postsService from "./postsService";

const initialState = {
  posts: {},
  isLoading: false,
  post: {},
  commentsData: {},
  user: null,
  moreLiked: [],
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

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id, thunkAPI) => {
    try {
      return await postsService.getPostById(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchPostsByText = createAsyncThunk(
  "post/searchPostsByText",
  async (postData) => {
    try {
      return await postsService.searchPostsByText(postData);
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

export const likePost = createAsyncThunk(
  "posts/like",
  async (id, thunkAPI) => {
    try {
      return await postsService.likePost(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "posts/unlike",
  async (id, thunkAPI) => {
    try {
      return await postsService.unlikePost(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comments/like",
  async (id, thunkAPI) => {
    try {
      return await postsService.likeComment(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unlikeComment = createAsyncThunk(
  "comments/unlike",
  async (id, thunkAPI) => {
    try {
      return await postsService.unlikeComment(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMoreLiked = createAsyncThunk(
  "posts/getMoreLiked",
  async (_, thunkAPI) => {
    try {
      return await postsService.getMoreLiked();
    } catch (error) {
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
    },
    emptyComments: (state) => {
      state.commentsData.comments = [];
    },
    changeFollowersNum: (state, action) => {
      state.user.followersCount += action.payload;
    },
    resetPostsData: (state) => {
      state.posts = {};
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
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload.post;
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.post = null;
        notification.error({ message: action.payload })
      })
      .addCase(searchPostsByText.fulfilled, (state, action) => {
        state.posts.total = action.payload.total;
        state.posts.page = action.payload.page;
        state.posts.maxPages = action.payload.maxPages;
        state.posts.posts = state.posts.posts ?? [];
        state.posts.posts = [...state.posts.posts, ...action.payload.posts];
      })
      .addCase(searchPostsByText.pending, (state) => {
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
        // Just update array if page 1 is showing
        if (+state.posts.page === 1) {
          state.posts?.posts.pop();
          state.posts?.posts.unshift(action.payload.post);
          state.posts = { ...state.posts };
        } else {
          notification.success({ message: action.payload.msg });
        }
      })
      .addCase(createPost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentsData.comments = state.commentsData.comments ?? [];
        state.commentsData.comments = [action.payload.comment, ...state.commentsData.comments];
        state.post.commentsCount++;
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
        state.post.commentsCount--;
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
      .addCase(likePost.fulfilled, (state, action) => {
        const _id = action.payload._id;
        if (state.post?._id === _id) {
          state.post.likesCount++;
        }
        const posts = state.posts.posts?.map(p => {
          if (p._id === _id) { p.likesCount++; }
          return p;
        })
        state.posts.posts = posts;
      })
      .addCase(likePost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const _id = action.payload._id;
        if (state.post?._id === _id) {
          state.post.likesCount--;
        }
        const posts = state.posts.posts.map(p => {
          if (p._id === _id) { p.likesCount--; }
          return p;
        })
        state.posts.posts = posts;
      })
      .addCase(unlikePost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const _id = action.payload._id;
        const comments = state.commentsData.comments.map(c => {
          if (c._id === _id) { c.likesCount++; }
          return c
        })
        state.commentsData.comments = comments;
      })
      .addCase(likeComment.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        const _id = action.payload._id;
        const comments = state.commentsData.comments.map(c => {
          if (c._id === _id) { c.likesCount--; }
          return c;
        })
        state.commentsData.comments = comments;
      })
      .addCase(unlikeComment.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(getMoreLiked.fulfilled, (state, action) => {
        state.moreLiked = action.payload.posts;
      })
      .addCase(getMoreLiked.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
  },
});

export const { reset, emptyComments, changeFollowersNum, resetPostsData } = postsSlice.actions;
export default postsSlice.reducer;