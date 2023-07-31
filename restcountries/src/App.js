import React, { useState, useEffect, createContext } from "react";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { fetchFromAPI } from "./fetchFromAPI";
import { Navigate } from "react-router-dom";
import CountryDetails from "./Pages/CountryDetails";

const Data = createContext();

const App = () => {
  const [data, setData] = useState([]);

  const [uniqueData, setUniqueData] = useState([]);

  const [name, setName] = useState("");

  const [selectedRegion, setSelectedRegion] = useState("");

  const [currentCountry, setCurrentCountry] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFromAPI(name);
        setData(result);
        const uniqueRegions = [...new Set(result.map((item) => item.region))];
        setUniqueData(uniqueRegions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [name]);

  console.log(data);

  return (
    <Router>
      <Header />
      <Data.Provider
        value={{
          data: data,
          name: name,
          setName: setName,
          setData: setData,
          uniqueData: uniqueData,
          setUniqueData: setUniqueData,
          selectedRegion: selectedRegion,
          setSelectedRegion: setSelectedRegion,
          currentCountry: currentCountry,
          setCurrentCountry: setCurrentCountry,
        }}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate to="/countries" />}
          />
          <Route
            path="/countries"
            element={<Home />}
          />
          <Route
            path="/countries/:countryName"
            element={<CountryDetails />}
          />
        </Routes>
      </Data.Provider>
    </Router>
  );
};

export default App;
export { Data };
