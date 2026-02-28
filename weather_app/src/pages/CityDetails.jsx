import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import TemperatureChart from "../components/charts/TemperatureChart";
import PrecipitationChart from "../components/charts/PrecipitationChart";
import WindChart from "../components/charts/WindChart";

import { convertTemp } from "../utils/temperature";
import { getWeatherImage } from "../utils/getWeatherImage";

import "../styles/cityDetails.css";

const CityDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { cities } = useSelector((state) => state.weather);
  const { unit } = useSelector((state) => state.settings);

  const data = cities[name];
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  if (!data) {
    return (
      <div className="app-container">
        <button className="unit-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <p>City data not found.</p>
      </div>
    );
  }

  const forecastDays = data.forecast.forecastday;
  const selectedDay = forecastDays[selectedDayIndex];
  const hourlyData = selectedDay.hour;

  const current = data.current;
  const dayInfo = selectedDay.day;

  const cardGif = getWeatherImage(dayInfo.condition.text);


  const getAQILabel = (pm25) => {
    if (!pm25) return { label: "N/A", color: "#ccc" };
    if (pm25 <= 12) return { label: "Excellent", color: "#22c55e" };
    if (pm25 <= 35) return { label: "Moderate", color: "#eab308" };
    if (pm25 <= 55) return { label: "Unhealthy (Sensitive)", color: "#f97316" };
    if (pm25 <= 150) return { label: "Unhealthy", color: "#ef4444" };
    return { label: "Hazardous", color: "#991b1b" };
  };

  const air = current.air_quality;
  const airLabel = air ? getAQILabel(air.pm2_5) : null;

  const getOutdoorAdvice = () => {
    if (dayInfo.daily_chance_of_rain > 70)
      return "🌧 High chance of rain — carry umbrella";
    if (dayInfo.uv > 8)
      return "☀ UV very strong — sunscreen recommended";
    if (dayInfo.maxwind_kph > 40)
      return "💨 Windy conditions — avoid biking/open areas";
    if (current.vis_km < 3)
      return "🌫 Low visibility — drive carefully";
    return "✅ Weather looks comfortable for outdoor plans";
  };

  const outdoorAdvice = getOutdoorAdvice();


  return (
    <>
      <div className="app-bg"></div>

      <div className="app-container">
        <button
          className="unit-btn"
          style={{ marginBottom: 24 }}
          onClick={() => navigate("/")}
        >
          ← Back to Dashboard
        </button>

        <div className="details-top">
          <div
            className="summary-card"
            style={{ backgroundImage: `url(${cardGif})` }}
          >
            <div className="card-overlay" />

            <div className="card-inner">
              <h1>{data.location.name}</h1>
              <p className="meta">
                {data.location.region}, {data.location.country}
              </p>

              <div className="hero-temp-row">
                <img src={dayInfo.condition.icon} alt="" />
                <div>
                  <div className="hero-temp">
                    {convertTemp(dayInfo.avgtemp_c, unit)}
                  </div>
                  <div className="meta">{dayInfo.condition.text}</div>
                </div>
              </div>

              <div className="stats-grid">
                <div>Humidity {dayInfo.avghumidity}%</div>
                <div>Wind {dayInfo.maxwind_kph} kph</div>
                <div>UV Index {dayInfo.uv}</div>
                <div>Rain Chance {dayInfo.daily_chance_of_rain}%</div>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <TemperatureChart hourlyData={hourlyData} unit={unit} />
          </div>
        </div>

        <div className="forecast-row">
          {forecastDays.map((day, index) => {
            const dateObj = new Date(day.date);
            const label =
              index === 0
                ? "Today"
                : dateObj.toLocaleDateString("en-US", { weekday: "short" });

            return (
              <div
                key={day.date}
                className={`forecast-card ${
                  selectedDayIndex === index ? "active" : ""
                }`}
                onClick={() => setSelectedDayIndex(index)}
              >
                <div className="forecast-day">{label}</div>
                <img src={day.day.condition.icon} alt="" />
                <div className="forecast-temp">
                  {convertTemp(day.day.avgtemp_c, unit)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="hourly-row">
          {hourlyData.slice(0, 24).map((hour) => (
            <div key={hour.time} className="hour-card">
              <span>{hour.time.split(" ")[1]}</span>
              <img src={hour.condition.icon} alt="" />
              <strong>{convertTemp(hour.temp_c, unit)}</strong>
            </div>
          ))}
        </div>

        <div className="details-analytics">
          <div className="chart-panel">
            <PrecipitationChart hourlyData={hourlyData} />
          </div>

          <div className="chart-panel">
            <WindChart hourlyData={hourlyData} />
          </div>
        </div>

        <div className="life-card">
          <h2>Comfort & Safety Index</h2>

          <div className="life-grid">
            <div>
              <span>Feels Like</span>
              <strong>{convertTemp(current.feelslike_c, unit)}</strong>
            </div>

            <div>
              <span>Visibility</span>
              <strong>{current.vis_km} km</strong>
            </div>

            <div>
              <span>Wind Gust</span>
              <strong>{current.gust_kph} kph</strong>
            </div>

            <div>
              <span>Pressure</span>
              <strong>{current.pressure_mb} mb</strong>
            </div>

            <div>
              <span>Sunrise</span>
              <strong>{selectedDay.astro.sunrise}</strong>
            </div>

            <div>
              <span>Sunset</span>
              <strong>{selectedDay.astro.sunset}</strong>
            </div>
          </div>

          {air && (
            <div className="aqi-box">
              Air Quality:
              <strong style={{ color: airLabel.color }}>
                {" "}{airLabel.label} (PM2.5 {air.pm2_5.toFixed(1)})
              </strong>
            </div>
          )}

          <div className="advice-box">{outdoorAdvice}</div>
        </div>
      </div>
    </>
  );
};

export default CityDetails;