import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LS_FAV_KEY = 'favouriteRepos';

type GithubState = {
  favourites: string[],
}

const initialState: GithubState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
}

const GithubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavourites(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
    removeFavourites(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter(fav => fav !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
  }
})

export default GithubSlice.reducer;
export const { addFavourites, removeFavourites } = GithubSlice.actions;