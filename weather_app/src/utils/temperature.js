export const convertTemp = (tempC, unit) => {
  if (unit === "C") return `${tempC}°C`;

  const f = (tempC * 9) / 5 + 32;
  return `${f.toFixed(1)}°F`;
};