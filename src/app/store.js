import { configureStore } from '@reduxjs/toolkit';
import auth from "../features/auth/authSlice";
import posts from "../features/posts/postsSlice";
import data from "../features/data/dataSlice";

export const store = configureStore({
  reducer: {
    auth,
    posts,
    data,
  },
});
