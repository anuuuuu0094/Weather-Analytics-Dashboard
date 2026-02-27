import { createSlice } from "@reduxjs/toolkit";

const loadUnit = () => {
  return localStorage.getItem("unit") || "C";
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    unit: loadUnit(), // C or F
  },
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "C" ? "F" : "C";
      localStorage.setItem("unit", state.unit);
    },
  },
});

export const { toggleUnit } = settingsSlice.actions;
export default settingsSlice.reducer;