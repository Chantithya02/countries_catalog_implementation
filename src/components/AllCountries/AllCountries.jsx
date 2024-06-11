import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import ReactPaginate from "react-paginate";
import CountryModal from "../CountryInfo/CountryModal";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countriesPerPage = 25; // Change to 25

  const getAllCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const data = response.data;
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    const fuse = new Fuse(countries, {
      keys: ["name.common"],
      threshold: 0.3,
    });

    const results = searchTerm
      ? fuse.search(searchTerm).map((result) => result.item)
      : countries;

    setFilteredCountries(results);
    setPageNumber(0);
  };

  const handleSort = (order) => {
    const sortedCountries = [...filteredCountries].sort((a, b) => {
      if (order === "asc") {
        return a.name.common.localeCompare(b.name.common);
      } else {
        return b.name.common.localeCompare(a.name.common);
      }
    });

    setFilteredCountries(sortedCountries);
    setSortOrder(order);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleOpenModal = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  // Calculate the range of displayed countries
  const startIndex = pageNumber * countriesPerPage;
  const endIndex = Math.min(
    startIndex + countriesPerPage,
    filteredCountries.length
  );
  const displayCountries = filteredCountries.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <div className="country_top"></div>
      <div className="search">
        <form className="flex items-center justify-center mb-4 mt-5">
          <input
            type="text"
            name="name"
            value={query}
            onChange={handleSearch}
            placeholder="Search a Country"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className={`m-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 ${
              sortOrder === "asc" ? "bg-sky-600 text-white" : ""
            }`}
            onClick={() => handleSort("asc")}
          >
            Ascending
          </button>
          <button
            type="button"
            className={`px-2 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 ${
              sortOrder === "desc" ? "bg-sky-600 text-white" : ""
            }`}
            onClick={() => handleSort("desc")}
          >
            Descending
          </button>
        </form>
      </div>
      <div className="country_bottom">
        {isLoading && !error && <h4>Loading.........</h4>}
        {error && !isLoading && <h4>Error: {error}</h4>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayCountries.map((country, index) => (
            <div className="country_item p-4 mb-4 max-w-xs mx-auto" key={index}>
              <div className="country_img mb-2 h-40 w-full">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="country_data text-center">
                <h3 className="mb-2 text-lg font-semibold">
                  {country.name.common}
                </h3>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => handleOpenModal(country)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {pageNumber > 0 && (
            <button
              onClick={() => setPageNumber(pageNumber - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            >
              Previous
            </button>
          )}
          {filteredCountries.length > (pageNumber + 1) * countriesPerPage && (
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          )}
        </div>
      </div>
      {selectedCountry && (
        <CountryModal country={selectedCountry} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllCountries;
