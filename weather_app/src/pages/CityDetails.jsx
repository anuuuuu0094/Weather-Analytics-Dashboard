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

  // 👉 GIF only for left summary card
  const cardGif = getWeatherImage(selectedDay.day.condition.text);

  return (
    <>
      <div className="app-bg"></div>

      <div className="app-container">
        {/* BACK BUTTON */}
        <button
          className="unit-btn"
          style={{ marginBottom: 24 }}
          onClick={() => navigate("/")}
        >
          ← Back to Dashboard
        </button>

        {/* ================= TOP SECTION ================= */}
        <div className="details-top">
          {/* LEFT SUMMARY CARD */}
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
                <img src={selectedDay.day.condition.icon} alt="" />

                <div>
                  <div className="hero-temp">
                    {convertTemp(selectedDay.day.avgtemp_c, unit)}
                  </div>
                  <div className="meta">
                    {selectedDay.day.condition.text}
                  </div>
                </div>
              </div>

              <div className="stats-grid">
                <div>Humidity {selectedDay.day.avghumidity}%</div>
                <div>Wind {selectedDay.day.maxwind_kph} kph</div>
                <div>UV Index {selectedDay.day.uv}</div>
                <div>Rain Chance {selectedDay.day.daily_chance_of_rain}%</div>
              </div>
            </div>
          </div>

          {/* RIGHT TEMPERATURE CHART */}
          <div className="chart-card">
            <TemperatureChart hourlyData={hourlyData} unit={unit} />
          </div>
        </div>

        {/* ================= 7 DAY FORECAST ================= */}
        <div className="forecast-row">
          {forecastDays.map((day, index) => {
            const dateObj = new Date(day.date);
            const label =
              index === 0
                ? "Today"
                : dateObj.toLocaleDateString("en-US", {
                    weekday: "short",
                  });

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

        {/* ================= HOURLY ================= */}
        <div className="hourly-row">
          {hourlyData.map((hour) => (
            <div key={hour.time} className="hour-card">
              <span>{hour.time.split(" ")[1]}</span>
              <img src={hour.condition.icon} alt="" />
              <strong>{convertTemp(hour.temp_c, unit)}</strong>
            </div>
          ))}
        </div>

        {/* ================= ANALYTICS ================= */}
        <div className="details-analytics">
          <div className="chart-panel">
            <PrecipitationChart hourlyData={hourlyData} />
          </div>

          <div className="chart-panel">
            <WindChart hourlyData={hourlyData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CityDetails;