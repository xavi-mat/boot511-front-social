import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { notification } from 'antd';
import dataService from './dataService';

const initialState = {
  users: [],
  isCollapsed: false,  // Controls siders layout
}

export const getUsersByName = createAsyncThunk(
  "data/getUsersByName",
  async (name, thunkAPI) => {
    try {
      return await dataService.getUsersByName(name);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dataSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersByName.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(getUsersByName.rejected, (_, action) => {
        notification.error({ message: action.payload })
      })
  }
});

export const { setIsCollapsed } = dataSlice.actions
export default dataSlice.reducer