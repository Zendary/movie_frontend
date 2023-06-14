import React, { useState, useEffect } from 'react';

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

const deleteButtonStyle = {
  background: 'red',
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

const createShowButtonStyle = {
  background: 'green',
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

const createShowFormStyle = {
  marginTop: '20px',
};

function Shows(props) {
  const [shows, setShows] = useState([]);
  const [newShow, setNewShow] = useState({
    name: '',
    duration: '',
    location: '',
    startDate: '',
    startTime: '',
  });

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewShow((prevShow) => ({
      ...prevShow,
      [name]: value,
    }));
  };

  const handleCreateShow = async () => {
    try {
      const response = await fetch('http://localhost:8080/movie/api/show/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShow),
      });
      const data = await response.json();
      console.log(data);
      setNewShow({
        name: '',
        duration: '',
        location: '',
        startDate: '',
        startTime: '',
      });
      fetchShows();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteShow = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/movie/api/show/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data); 
      fetchShows(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Shows</h1>
      <div>
        <h2>Create New Show</h2>
        <form style={createShowFormStyle}>
          <label>
            Name:
            <input type="text" name="name" value={newShow.name} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Duration:
            <input
              type="text"
              name="duration"
              value={newShow.duration}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={newShow.location}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Start Date:
            <input
              type="text"
              name="startDate"
              value={newShow.startDate}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Start Time:
            <input
              type="text"
              name="startTime"
              value={newShow.startTime}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" style={createShowButtonStyle} onClick={handleCreateShow}>
            Create Show
          </button>
        </form>
      </div>
      <div>
        <h2>Existing Shows</h2>
        {shows.map((show) => (
          <div key={show.id} style={showContainerStyle}>
            <h3 style={showTitleStyle}>{show.name}</h3>
            <p style={showInfoStyle}>Duration: {show.duration}</p>
            <p style={showInfoStyle}>Location: {show.location}</p>
            <p style={showInfoStyle}>Start Date: {show.startDate}</p>
            <p style={showInfoStyle}>Start Time: {show.startTime}</p>
            <button
              type="button"
              style={deleteButtonStyle}
              onClick={() => handleDeleteShow(show.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shows;
