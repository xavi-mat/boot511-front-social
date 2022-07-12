import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import adminService from "./adminService";

const initialState = {
  postsData: {},
  usersData: {},
  commentsData: {},
}

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (page = 1, thunkAPI) => {
    try {
      return await adminService.getUsers(page);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activateUser = createAsyncThunk(
  "admin/activateUser",
  async (id, thunkAPI) => {
    try {
      return await adminService.activateUser(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deactivateUser = createAsyncThunk(
  "admin/deactivateUser",
  async (id, thunkAPI) => {
    try {
      return await adminService.deactivateUser(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "admin/getPosts",
  async (page = 1, thunkAPI) => {
    try {
      return await adminService.getPosts(page);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activatePost = createAsyncThunk(
  "admin/activatePost",
  async (id, thunkAPI) => {
    try {
      return await adminService.activatePost(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deactivatePost = createAsyncThunk(
  "admin/deactivatePost",
  async (id, thunkAPI) => {
    try {
      return await adminService.deactivatePost(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getComments = createAsyncThunk(
  "admin/getComments",
  async (page = 1, thunkAPI) => {
    try {
      return await adminService.getComments(page);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activateComment = createAsyncThunk(
  "admin/activateComment",
  async (id, thunkAPI) => {
    try {
      return await adminService.activateComment(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deactivateComment = createAsyncThunk(
  "admin/deactivateComment",
  async (id, thunkAPI) => {
    try {
      return await adminService.deactivateComment(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetUsersData: (state) => {
      state.usersData = {};
    },
    resetPostsData: (state) => {
      state.postsData = {};
    },
    resetCommentsData: (state) => {
      state.commentsData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersData.total = action.payload.total;
        state.usersData.page = action.payload.page;
        state.usersData.maxPage = action.payload.maxPage;
        state.usersData.users = state.usersData.users ?? [];
        state.usersData.users = [...state.usersData.users, ...action.payload.users];
      })
      .addCase(getUsers.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        const users = state.usersData.users.map(u => {
          if (u._id === action.payload._id) {
            u.active = true;
          }
          return u;
        })
        state.usersData.users = [...users];
      })
      .addCase(activateUser.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const users = state.usersData.users.map(u => {
          if (u._id === action.payload._id) {
            u.active = false;
          }
          return u;
        })
        state.usersData.users = [...users];
      })
      .addCase(deactivateUser.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsData.total = action.payload.total;
        state.postsData.page = action.payload.page;
        state.postsData.maxPage = action.payload.maxPage;
        state.postsData.posts = state.postsData.posts ?? [];
        state.postsData.posts = [...state.postsData.posts, ...action.payload.posts];
      })
      .addCase(getPosts.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(activatePost.fulfilled, (state, action) => {
        const posts = state.postsData.posts.map(p => {
          if (p._id === action.payload._id) {
            p.active = true;
          }
          return p;
        })
        state.postsData.posts = [...posts];
      })
      .addCase(activatePost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(deactivatePost.fulfilled, (state, action) => {
        const posts = state.postsData.posts.map(p => {
          if (p._id === action.payload._id) {
            p.active = false;
          }
          return p;
        })
        state.postsData.posts = [...posts];
      })
      .addCase(deactivatePost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.commentsData.total = action.payload.total;
        state.commentsData.page = action.payload.page;
        state.commentsData.maxPage = action.payload.maxPage;
        state.commentsData.comments = state.commentsData.comments ?? [];
        state.commentsData.comments = [...state.commentsData.comments, ...action.payload.comments];
      })
      .addCase(getComments.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(activateComment.fulfilled, (state, action) => {
        const comments = state.commentsData.comments.map(c => {
          if (c._id === action.payload._id) {
            c.active = true;
          }
          return c;
        })
        state.commentsData.comments = [...comments];
      })
      .addCase(activateComment.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(deactivateComment.fulfilled, (state, action) => {
        const comments = state.commentsData.comments.map(c => {
          if (c._id === action.payload._id) {
            c.active = false;
          }
          return c;
        })
        state.commentsData.comments = [...comments];
      })
      .addCase(deactivateComment.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
  }
});

export const {
  resetUsersData,
  resetPostsData,
  resetCommentsData
} = adminSlice.actions;
export default adminSlice.reducer;