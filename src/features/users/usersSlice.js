import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { notification } from 'antd';
import usersService from './usersService';

const initialState = {
  users: [],
}

export const getUsersByName = createAsyncThunk(
  "users/getByName",
  async (name, thunkAPI) => {
    try {
      return await usersService.getUsersByName(name);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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

// export const { } = usersSlice.actions
export default usersSlice.reducer