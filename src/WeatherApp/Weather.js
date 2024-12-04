import React, { useState } from 'react';
import './Weather.css';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = (city) => {
    const apikey = 'f1ea17d967f24d69b4c63739240412';
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`)
      .then((response) => {
        setWeather(response.data);
        setError('');
      })
      .catch((error) => {
        setError('City not found');
        setWeather(null);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="weather-app">
      <div className="search-form-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      {weather && (
        <div className="weather-card-container">
          <div className="weather-card">
            <div className="weather-icon">
              <img src={weather.current.condition.icon} alt="weather icon" />
            </div>
            <div className="weather-info">
              <div className="weather-temp">{weather.current.temp_c}°C</div>
              <div className="weather-country">{weather.location.country}</div>
              <div className="weather-region">{weather.location.region}</div>
              <div className="weather-condition">
                <p>{weather.current.condition.text}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
