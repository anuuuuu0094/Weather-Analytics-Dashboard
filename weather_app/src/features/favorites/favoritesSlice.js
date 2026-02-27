import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadFavorites = () => {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    cities: loadFavorites(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const city = action.payload;

      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((c) => c !== city);
      } else {
        state.cities.push(city);
      }

      localStorage.setItem("favorites", JSON.stringify(state.cities));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;