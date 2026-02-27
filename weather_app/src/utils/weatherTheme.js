export const getWeatherTheme = (condition, isDay) => {
  const text = condition.toLowerCase();

  if (text.includes("sunny") || text.includes("clear")) {
    return isDay ? "theme-sunny" : "theme-clear-night";
  }

  if (text.includes("cloud")) return "theme-cloudy";
  if (text.includes("rain") || text.includes("drizzle")) return "theme-rain";
  if (text.includes("snow")) return "theme-snow";
  if (text.includes("thunder")) return "theme-storm";

  return "theme-default";
};