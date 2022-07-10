import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import adminService from "./adminService";

const initialState = {
  postsData: {},
  usersData: {},
  commentsData: {},
}

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
  async (id, thunkAPI)=> {
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
  async (id, thunkAPI)=> {
    try {
      return await adminService.deactivatePost(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsData = action.payload;
      })
      .addCase(getPosts.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(activatePost.fulfilled, (state, action) => {
        const posts = state.postsData.posts.map(p=> {
          if (p._id === action.payload._id){
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
        const posts = state.postsData.posts.map(p=> {
          if (p._id === action.payload._id){
            p.active = false;
          }
          return p;
        })
        state.postsData.posts = [...posts];
      })
      .addCase(deactivatePost.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
  }
});

// export const {HERE REDUCERS} ? adminSlice.actions;
export default adminSlice.reducer;