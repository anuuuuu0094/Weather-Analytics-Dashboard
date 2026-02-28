# 🌦️ Weather Analytics Dashboard

A **premium, real-time weather analytics web app** built with **React + Redux Toolkit + Vite** that allows users to search cities, visualize forecasts, analyze trends, and view weather insights on an interactive map.

---

## 🚀 Live Features

✅ Search any city worldwide (Autocomplete enabled)
✅ Real-time weather data using WeatherAPI
✅ Smart caching (avoids unnecessary API calls)
✅ Favorite cities with priority sorting ⭐
✅ Dynamic weather-based background (image/GIF per condition)
✅ Interactive map with selected city location
✅ 7-Day forecast with selectable day view
✅ Hourly breakdown with charts
✅ Analytics:

* 🌡️ Temperature trend
* 🌧️ Precipitation analysis
* 🌬️ Wind speed patterns
  ✅ “Outdoor Safety Index” — tells if it's safe to go outside
  ✅ Redux Persist → Data survives refresh
  ✅ Fully responsive premium UI
  ✅ Deployed on **Vercel (SPA routing fixed)**

---

## 🧠 Tech Stack

| Layer            | Tech                           |
| ---------------- | ------------------------------ |
| Frontend         | React + Vite                   |
| State Management | Redux Toolkit                  |
| Persistence      | Redux Persist                  |
| Charts           | Recharts                       |
| Maps             | Leaflet + OpenStreetMap        |
| API              | WeatherAPI                     |
| Caching          | LocalStorage-based cache layer |
| Styling          | Custom CSS (No Tailwind)       |
| Deployment       | Vercel                         |

---

## 📂 Project Structure

```
src/
 ├── app/
 │    └── store.js
 ├── features/
 │    ├── weather/
 │    ├── favorites/
 │    └── settings/
 ├── components/
 │    ├── charts/
 │    └── WeatherMap.jsx
 ├── services/
 │    ├── weatherService.js
 │    └── cacheService.js
 ├── utils/
 │    ├── temperature.js
 │    └── getWeatherImage.js
 ├── pages/
 │    ├── Dashboard.jsx
 │    └── CityDetails.jsx
 └── styles/
      └── cityDetails.css
```

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/weather-analytics-dashboard.git
cd weather-analytics-dashboard
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Add Environment Variable

Create `.env` file:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

Get API key from:
👉 https://www.weatherapi.com/

---

### 4️⃣ Run Development Server

```
npm run dev
```

App runs on:

```
https://weather-analytics-dashboard-hfmi.vercel.app/
```

---

## 🔁 Smart Caching System

The app avoids repeated API calls using:

```
cacheService.js
```

Flow:
1️⃣ Check LocalStorage
2️⃣ If data exists → return cached
3️⃣ Else → fetch from API
4️⃣ Save to cache with timestamp

This dramatically improves performance.

---

## ⭐ Favorites Logic

* Star a city → moves to top
* Searching same city again → refreshes data, doesn’t duplicate
* Favorites persist across refresh (Redux Persist)

---

## 🗺️ Map Integration

Each selected city renders a **live map preview** using Leaflet:

* Auto-centers to coordinates
* Updates when user searches a new city

---

## 📊 Analytics Engine

We convert raw API data into meaningful insights:

| Metric            | Source                 |
| ----------------- | ---------------------- |
| Temperature Trend | hourly.temp_c          |
| Rain Intensity    | hourly.precip_mm       |
| Wind Pattern      | hourly.wind_kph        |
| Outdoor Safety    | UV + AQI + Rain + Wind |

---

## 🌤️ Outdoor Safety Algorithm

We compute a human-readable status like:

```
🟢 Great Weather — Perfect for outdoor activities
🟡 Moderate — Stay hydrated
🔴 Not Recommended — High UV / Rain / Pollution
```

Derived from:

* UV Index
* Air Quality (AQI)
* Rain probability
* Wind speed

---

## 🚀 Deployment (Vercel)

### Important: SPA Routing Fix

`vercel.json`

```
{
  "rewrites": [
    {
      "source": "/((?!assets/|.*\\..*).*)",
      "destination": "/index.html"
    }
  ]
}
```

This prevents:

```
MIME type errors
404 on refresh
Broken routing
```

---

## 📦 Build for Production

```
npm run build
```

---

## 🧩 Performance Notes

✔ API caching reduces calls by ~70%
✔ Code structured for dynamic splitting
✔ Optimized chart rendering
✔ No unnecessary re-renders (memo-friendly structure)

---

## 🔮 Future Improvements

* 🌍 Multi-language support
* 📱 PWA offline mode
* 📈 Historical weather analytics
* 🔔 Weather alerts
* 🌐 Edge caching

---

## 🙌 Author

**Anubhav Maurya**
Full Stack Developer (MERN)

---

## 📜 License

MIT License — Free to use & modify.

---

> Built to demonstrate real-world frontend architecture, data visualization, and performance optimization.
