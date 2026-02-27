import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityDetails from "./pages/CityDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/city/:name" element={<CityDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;