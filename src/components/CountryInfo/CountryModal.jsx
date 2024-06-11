import React from "react";

const CountryModal = ({ country, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <div className="aspect-[1.5]">
          <img
            src={country.flags.png}
            className="w-full h-full"
            alt={`Flag of ${country.name.official}`}
          />
        </div>
        <h3 className="text-lg font-bold leading-6 text-gray-900 mt-4">
          {country.name.official}
        </h3>
        <div className="mt-2">
          <div>
            <span className="font-medium">CCA2:</span> {country.cca2}
          </div>
          <div>
            <span className="font-medium">CCA3:</span> {country.cca3}
          </div>
          <div className="mb-2">
            <strong>Native Country Name:</strong>{" "}
            {Object.values(country.name.nativeName || {})
              .map((n) => n.common)
              .join(", ")}
          </div>
          <div>
            <span className="font-medium">Alternative Spellings:</span>{" "}
            {country.altSpellings.join(", ")}
          </div>
          <div>
            <span className="font-medium">IDD:</span> {country.idd.root}
            {country.idd.suffixes.join(", ")}
          </div>
        </div>
        <button
          type="button"
          className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CountryModal;
