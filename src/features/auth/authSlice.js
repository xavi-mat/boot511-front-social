import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import authService from "./authService";

const loginData = JSON.parse(localStorage.getItem("loginData"));

const initialState = {
  loginData: loginData ?? {},
  isError: false,
  isSuccess: false,
  message: "",
  following: [],
  followers: [],
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.error(error);
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      return await authService.logout();
    } catch (error) {
      console.error(error);
    }
  });

export const updateUser = createAsyncThunk(
  "users/update",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRelations = createAsyncThunk(
  "users/getRelations",
  async (_, thunkAPI) => {
    try {
      return await authService.getRelations();
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const followUser = createAsyncThunk(
  "users/follow",
  async (id, thunkAPI) => {
    try {
      return await authService.followUser(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollow",
  async (id, thunkAPI) => {
    try {
      return await authService.unfollowUser(id);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    refreshUser: (state, action) => {
      state.loginData.user = action.payload;
      localStorage.setItem("loginData", JSON.stringify(state.loginData));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loginData = action.payload;
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loginData = {};
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loginData.user.avatar = action.payload.user.avatar;
      })
      .addCase(updateUser.rejected, () => {
        notification.error({ message: "Error updating user" })
      })
      .addCase(getRelations.fulfilled, (state, action) => {
        state.following = action.payload.user.following;
        state.followers = action.payload.user.followers;
      })
      .addCase(getRelations.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loginData.user.followingCount++;
        state.following = [...state.following, action.payload.user]
      })
      .addCase(followUser.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loginData.user.followingCount--;
        const following = state.following
          .filter(f => f._id !== action.payload._id)
        state.following = following;
      })
      .addCase(unfollowUser.rejected, (_, action) => {
        notification.error({ message: action.payload });
      })
  },
});

export const { reset, refreshUser } = authSlice.actions;

export default authSlice.reducer;