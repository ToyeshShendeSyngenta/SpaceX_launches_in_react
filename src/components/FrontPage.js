import "./frontPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const FrontPage = () => {
  const [launchData, setLaunchData] = useState([]);
  const [filters, setFilters] = useState({
    launchSuccess: null,
    landSuccess: null,
    launchYear: "",
  });
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    const apiUrl = `https://api.spaceXdata.com/v3/launches?limit=100${getFilterParams()}`;

    axios
      .get(apiUrl)
      .then((response) => setLaunchData(response.data))
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
    console.log(params);
    return params;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const renderYearTags = () => {
    const years = [
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ];

    return years.map((year) => (
      <button
        key={year}
        className={filters.launchYear === year ? "active-tag" : "tag"}
        onClick={() => handleFilterChange("launchYear", year)}
      >
        {year}
      </button>
    ));
  };

  return (
    <div>
      <h2>SpaceX Launch Programs</h2>
      <div className="main">
        <div className="filters">
          <h4>Filters</h4>
          <div className="filter-section">
            <div className="filter-subsection">
              <h4>Name Search</h4>
              <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              ></input>
            </div>
            <div className="filter-subsection">
              <h4>Launch Year</h4>
              <div className="tags">{renderYearTags()}</div>
            </div>
            <div className="filter-subsection1">
              <h4>Successful Launch</h4>
              <button
                className={filters.launchSuccess === true ? "active" : ""}
                onClick={() => handleFilterChange("launchSuccess", true)}
              >
                True
              </button>
              <button
                className={filters.launchSuccess === false ? "active" : ""}
                onClick={() => handleFilterChange("launchSuccess", false)}
              >
                False
              </button>
            </div>
            <div className="filter-subsection1">
              <h4>Successful Landing</h4>
              <button
                className={filters.landSuccess === true ? "active" : ""}
                onClick={() => handleFilterChange("landSuccess", true)}
              >
                True
              </button>
              <button
                className={filters.landSuccess === false ? "active" : ""}
                onClick={() => handleFilterChange("landSuccess", false)}
              >
                False
              </button>
            </div>
          </div>
        </div>
        <div className="cards">
          {launchData
            .filter(
              (launch) =>
                search === "" ||
                launch.mission_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((launch) => (
              <div key={launch.flight_number} className="card">
                <img
                  src={launch.links.mission_patch_small}
                  alt={launch.mission_name}
                />
                <h3 className="heading">{`${launch.mission_name} #${launch.flight_number}`}</h3>
                <p>
                  <b>Mission IDs: </b> {launch.mission_id}
                </p>
                <p>
                  <b>Launch Year: </b> {launch.launch_year}
                </p>
                <p>
                  <b>Launch Success: </b>{" "}
                  {launch.launch_success ? "True" : "False"}
                </p>
                <p>
                  <b>Successful Landing : </b>
                  {launch.launch_landing ? "True" : "False"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
