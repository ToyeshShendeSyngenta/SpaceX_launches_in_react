// FrontPage.js

import "./frontPage.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FrontPage = () => {
  const [launchData, setLaunchData] = useState([]);

  useEffect(() => {
    axios.get('https://api.spaceXdata.com/v3/launches?limit=100') 
      .then(response => setLaunchData(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      <h2>SpaceX Launch Programs</h2>
      <div className="main">
        <div className="filters">filter</div>
        <div className="cards">
          {launchData.map((launch) => (
            <div key={launch.flight_number} className="card">
              <img src={launch.links.mission_patch_small} alt={launch.mission_name} />
              <h3 className="heading">{`${launch.mission_name} #${launch.flight_number}`}</h3>
              <p><b>Mission IDs: </b> {launch.mission_id.join(', ')}</p>
              <p><b>Launch Year: </b> {launch.launch_year}</p>
              <p><b>Launch Success: </b> {launch.launch_success ? 'Yes' : 'No'}</p>
              <p><b>Successful Landing : </b>{launch.rocket.first_stage.cores[0].land_success ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
