import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const loginData = JSON.parse(localStorage.getItem("loginData"));

const initialState = {
  loginData: loginData ?? {},
  isError: false,
  isSuccess: false,
  message: "",
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


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    updateUser: (state, action) => {
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
  },
});

export const { reset, updateUser } = authSlice.actions;

export default authSlice.reducer;