export const getWeatherImage = (condition) => {
  if (!condition) return "/weather/default.jpg";

  const text = condition.toLowerCase();

  if (text.includes("sun") || text.includes("clear"))
    return "/weather/sunny.gif";

  if (text.includes("rain") || text.includes("drizzle"))
    return "/weather/rain.gif";

  if (text.includes("cloud"))
    return "/weather/cloudy.gif";

  if (text.includes("snow"))
    return "/weather/snow.gif";

  if (text.includes("thunder") || text.includes("storm"))
    return "/weather/storm.gif";

  return "/weather/default.gif";
};