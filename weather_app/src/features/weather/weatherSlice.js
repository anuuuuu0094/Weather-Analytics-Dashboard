import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherByCity } from "../../services/weatherService";
import { getCachedData, setCachedData } from "../../services/cacheService";

// Async thunk with caching
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const cacheKey = `weather-${city}`;

    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const data = await getWeatherByCity(city);

    setCachedData(cacheKey, data);
    return data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        const cityName = action.payload.location.name;
        state.cities[cityName] = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch weather";
      });
  },
});

export default weatherSlice.reducer;