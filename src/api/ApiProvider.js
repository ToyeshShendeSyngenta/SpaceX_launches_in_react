
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [launchData, setLaunchData] = useState([]);
  const [filters, setFilters] = useState({
    launchSuccess: null,
    landSuccess: null,
    launchYear: "",
  });

  useEffect(() => {
    const apiUrl = `https://api.spaceXdata.com/v3/launches?limit=100${getFilterParams()}`;

    axios
      .get(apiUrl).then((response) => setLaunchData(response.data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [filters]);

  const getFilterParams = () => {
    const { launchSuccess, landSuccess, launchYear } = filters;
    let params = "";

    if (launchSuccess !== null) {
      params += `&launch_success=${launchSuccess}`;
    }

    if (landSuccess !== null) {
      params += `&land_success=${landSuccess}`;
    }

    if (launchYear !== "") {
      params += `&launch_year=${launchYear}`;
    }

    return params;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const apiContextValue = {
    launchData,
    filters,
    handleFilterChange,
  };

  return (

    <ApiContext.Provider value={apiContextValue}  data-testid="apiprovider">{children}</ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
