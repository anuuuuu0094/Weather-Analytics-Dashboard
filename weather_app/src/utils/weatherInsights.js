export const getAirQualityLabel = (pm25) => {
  if (pm25 <= 12) return { label: "Excellent", color: "#22c55e" };
  if (pm25 <= 35) return { label: "Moderate", color: "#eab308" };
  if (pm25 <= 55) return { label: "Unhealthy (Sensitive)", color: "#f97316" };
  if (pm25 <= 150) return { label: "Unhealthy", color: "#ef4444" };
  return { label: "Hazardous", color: "#7f1d1d" };
};

export const getOutdoorAdvice = ({ uv, rainChance, wind }) => {
  if (rainChance > 70) return "🌧 Avoid outdoor plans — High rain probability";
  if (uv > 8) return "☀ Use sunscreen — UV very high";
  if (wind > 40) return "💨 Windy — Avoid biking or open areas";
  return "✅ Weather looks good for outdoor activities";
};