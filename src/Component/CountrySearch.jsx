import React, { useState, useEffect } from "react";

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log("Fetching countries..."); // Debug log
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );

        console.log("Response status:", response.status); // Debug log

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data); // Debug log

        if (!Array.isArray(data)) {
          throw new Error("API did not return an array of countries");
        }

        setCountries(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Current state:", {
    // Debug log
    countries,
    searchTerm,
    filteredCountries,
    loading,
    error,
  });

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Loading countries...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <input
        type="text"
        placeholder="Search for countries"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {filteredCountries.length === 0 && searchTerm ? (
        <div style={{ textAlign: "center", fontSize: "18px" }}>
          No countries found matching "{searchTerm}".
        </div>
      ) : filteredCountries.length === 0 ? (
        <div style={{ textAlign: "center", fontSize: "18px" }}>
          No countries data available.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {filteredCountries.map((country) => (
            <div
              key={country.common}
              className="countryCard"
              style={{
                width: "200px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={country.png}
                alt={`Flag of ${country.common}`}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
                onError={(e) => {
                  console.error("Error loading flag for", country.common);
                  e.target.style.display = "none";
                }}
              />
              <h3 style={{ margin: "0", textAlign: "center" }}>
                {country.common}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
