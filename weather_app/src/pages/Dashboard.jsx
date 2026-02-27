import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWeather } from "../features/weather/weatherSlice";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { toggleUnit } from "../features/settings/settingsSlice";
import { convertTemp } from "../utils/temperature";
import { searchCities } from "../services/weatherService";
import { getWeatherImage } from "../utils/getWeatherImage";
import WeatherMap from "../components/WeatherMap";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cities, loading, error } = useSelector((state) => state.weather);
  const { cities: favoriteCities } = useSelector((state) => state.favorites);
  const { unit } = useSelector((state) => state.settings);

  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const debouncedCity = useDebounce(city, 500);

  /* ================= AUTOCOMPLETE ================= */
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedCity.trim()) return setSuggestions([]);

      try {
        const results = await searchCities(debouncedCity);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedCity]);

  const handleSelectCity = (selectedCity) => {
    dispatch(fetchWeather(selectedCity));
    setCity("");
    setSuggestions([]);
  };

  const cityList = Object.values(cities);
  const lastCity = cityList[cityList.length - 1];

 return (
  <>
    <div className="app-bg"></div>

    <div className="app-container">
      {/* ================= HERO ================= */}
      <div className="hero">
        <div>
          <h1 className="hero-title">Weather Analytics</h1>
          <p className="hero-sub">Explore live weather conditions.</p>
        </div>

        <div className="hero-controls">
          <div className="search-box">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
            />

            {suggestions.length > 0 && (
              <div className="search-dropdown">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="search-item"
                    onClick={() => handleSelectCity(item.name)}
                  >
                    {item.name}, {item.country}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => dispatch(toggleUnit())} className="unit-btn">
            °{unit}
          </button>
        </div>
      </div>

      {/* ================= FEATURED SECTION ================= */}
      {lastCity && (
        <div className="feature-section">
          {/* LEFT : BIG WEATHER CARD */}
          <div
            className="feature-card"
            style={{
              backgroundImage: `url(${getWeatherImage(
                lastCity.current.condition.text
              )})`,
            }}
            onClick={() => navigate(`/city/${lastCity.location.name}`)}
          >
            <div className="feature-content">
              <h2>{lastCity.location.name}</h2>

              <img src={lastCity.current.condition.icon} />

              <div className="feature-temp">
                {convertTemp(lastCity.current.temp_c, unit)}
              </div>

              <p>{lastCity.current.condition.text}</p>

              <p className="weather-meta">
                Humidity {lastCity.current.humidity}% • Wind{" "}
                {lastCity.current.wind_kph} kph
              </p>
            </div>
          </div>

          {/* RIGHT : MAP */}
          <WeatherMap
            lat={lastCity.location.lat}
            lon={lastCity.location.lon}
            name={lastCity.location.name}
          />
        </div>
      )}

      {/* ================= ALL OTHER CITIES ================= */}
      <div className="weather-grid">
        {cityList.slice(0, -1).map((data) => {
          const bg = getWeatherImage(data.current.condition.text);
          const cityName = data.location.name;
          const isFavorite = favoriteCities.includes(cityName);

          return (
            <div
              key={cityName}
              className="weather-card"
              style={{ backgroundImage: `url(${bg})` }}
              onClick={() => navigate(`/city/${cityName}`)}
            >
              <div className="weather-card-content">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{cityName}</strong>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleFavorite(cityName));
                    }}
                  >
                    {isFavorite ? "★" : "☆"}
                  </button>
                </div>

                <img src={data.current.condition.icon} />

                <div className="weather-temp">
                  {convertTemp(data.current.temp_c, unit)}
                </div>

                <div className="weather-meta">
                  {data.current.condition.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </>
);
};

export default Dashboard;