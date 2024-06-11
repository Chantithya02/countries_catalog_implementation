// import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryInfo/CountryModal";

function App() {
  return (
    <div className="w-full">
      <div className="header bg-gray-800 py-4">
        <div className="container mx-auto">
          <h5 className="text-white text-xl font-semibold">
            Countries Catalog Implementation
          </h5>
        </div>
      </div>
      <div className="">
        <AllCountries />
        <Routes>
          <Route path="/" element={AllCountries} />
          <Route path="/country:countryName" element={CountryInfo} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
