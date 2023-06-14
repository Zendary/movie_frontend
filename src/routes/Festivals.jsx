import React, { useState, useEffect } from 'react';


const festivalContainerStyle = {
  margin: '20px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const festivalTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const festivalInfoStyle = {
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

const createFestivalButtonStyle = {
  background: 'green',
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

const createFestivalFormStyle = {
  marginTop: '20px',
};

function Festivals(props) {
  const [festivals, setFestivals] = useState([]);
  const [newFestival, setNewFestival] = useState({
    name: '',
    city: '',
    startDate: '',
    duration: '',
  });

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    try {
      const response = await fetch('http://localhost:8080/movie/api/festival/all');
      const data = await response.json();
      setFestivals(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewFestival((prevFestival) => ({
      ...prevFestival,
      [name]: value,
    }));
  };

  const handleCreateFestival = async () => {
    try {
      const response = await fetch('http://localhost:8080/movie/api/festival/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFestival),
      });
      const data = await response.json();
      console.log(data);
      setNewFestival({
        name: '',
        city: '',
        startDate: '',
        duration: '',
      });
      fetchFestivals();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFestival = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/movie/api/festival/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data); 
      fetchFestivals(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Festivals</h1>
      <div>
        <h2>Create New Festival</h2>
        <form style={createFestivalFormStyle}>
          <label>
            Name:
            <input type="text" name="name" value={newFestival.name} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            City:
            <input type="text" name="city" value={newFestival.city} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Start Date:
            <input
              type="text"
              name="startDate"
              value={newFestival.startDate}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Duration:
            <input
              type="text"
              name="duration"
              value={newFestival.duration}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" style={createFestivalButtonStyle} onClick={handleCreateFestival}>
            Create Festival
          </button>
        </form>
      </div>
      <div>
        <h2>Existing Festivals</h2>
        {festivals.map((festival) => (
          <div key={festival.name} style={festivalContainerStyle}>
            <h3 style={festivalTitleStyle}>{festival.name}</h3>
            <p style={festivalInfoStyle}>City: {festival.city}</p>
            <p style={festivalInfoStyle}>Start Date: {festival.startDate}</p>
            <p style={festivalInfoStyle}>Duration: {festival.duration}</p>
            <button
              type="button"
              style={deleteButtonStyle}
              onClick={() => handleDeleteFestival(festival.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Festivals;
