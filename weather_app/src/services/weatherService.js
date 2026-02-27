import axiosInstance from "./axiosInstance";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// ================= CURRENT + FORECAST =================
export const getWeatherByCity = async (city) => {
  const response = await axiosInstance.get("/forecast.json", {
    params: {
      key: API_KEY,
      q: city,
      days: 7,
      aqi: "no",
      alerts: "no",
    },
  });

  return response.data;
};

// ================= SEARCH AUTOCOMPLETE =================
export const searchCities = async (query) => {
  const response = await axiosInstance.get("/search.json", {
    params: {
      key: API_KEY,
      q: query,
    },
  });

  return response.data;
};