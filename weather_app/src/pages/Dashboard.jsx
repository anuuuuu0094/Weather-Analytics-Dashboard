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

  const [activeCity, setActiveCity] = useState(null);

  const debouncedCity = useDebounce(city, 500);

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

    setActiveCity(selectedCity);

    setCity("");
    setSuggestions([]);
  };

  const cityList = Object.values(cities).sort((a, b) => {
    const aFav = favoriteCities.includes(a.location.name);
    const bFav = favoriteCities.includes(b.location.name);

    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;

    return a.location.name.localeCompare(b.location.name);
  });

  const featuredCity =
    cities[activeCity] || cityList[0] || null;

  return (
    <>
      <div className="app-bg"></div>

      <div className="app-container">
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

        {featuredCity && (
          <div className="feature-section">
            {/* BIG CARD */}
            <div
              className="feature-card"
              style={{
                backgroundImage: `url(${getWeatherImage(
                  featuredCity.current.condition.text
                )})`,
              }}
              onClick={() =>
                navigate(`/city/${featuredCity.location.name}`)
              }
            >
              <div className="feature-content">
                <h2>{featuredCity.location.name}</h2>

                <img src={featuredCity.current.condition.icon} />

                <div className="feature-temp">
                  {convertTemp(featuredCity.current.temp_c, unit)}
                </div>

                <p>{featuredCity.current.condition.text}</p>

                <p className="weather-meta">
                  Humidity {featuredCity.current.humidity}% • Wind{" "}
                  {featuredCity.current.wind_kph} kph
                </p>
              </div>
            </div>

            {/* MAP */}
            <WeatherMap
              lat={featuredCity.location.lat}
              lon={featuredCity.location.lon}
              name={featuredCity.location.name}
            />
          </div>
        )}

        <div className="weather-grid">
          {cityList
            .filter(
              (c) => c.location.name !== featuredCity?.location.name
            )
            .map((data) => {
              const cityName = data.location.name;
              const isFavorite = favoriteCities.includes(cityName);

              return (
                <div
                  key={cityName}
                  className="weather-card"
                  style={{
                    backgroundImage: `url(${getWeatherImage(
                      data.current.condition.text
                    )})`,
                  }}
                  onClick={() => {
                    setActiveCity(cityName); // ⭐ bring to featured
                    navigate(`/city/${cityName}`);
                  }}
                >
                  <div className="weather-card-content">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
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

        {loading && <p>Loading weather...</p>}
        {error && <p style={{ color: "tomato" }}>{error}</p>}
      </div>
    </>
  );
};

export default Dashboard;