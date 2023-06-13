import React, { useEffect, useState } from 'react';

const showContainerStyle = {
  margin: '20px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const showTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const showInfoStyle = {
  fontSize: '16px',
  marginBottom: '5px',
};

function AllShows(props) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('http://localhost:8080/movie/api/show/all');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Alle shows</h1>
      {shows.map((show) => (
        <div key={show.id} style={showContainerStyle}>
          <h2 style={showTitleStyle}>{show.name}</h2>
          <p style={showInfoStyle}>Duration: {show.duration}</p>
          <p style={showInfoStyle}>Location: {show.location}</p>
          <p style={showInfoStyle}>Start Date: {show.startDate}</p>
          <p style={showInfoStyle}>Start Time: {show.startTime}</p>
        </div>
      ))}
    </div>
  );
}

export default AllShows;
