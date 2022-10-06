import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./Github/github.api";
import GithubSlice from "./Github/githubSlice";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: GithubSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;