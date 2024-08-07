import React, { useState } from "react";
import "./App.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCity = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    setLoading(true);
    setWeather(null);
    setError("");

    const apiKey = "d42f08cf7415b017ff224e02e22a5366";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        setError("Error fetching weather data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          className="city-input"
          onChange={getCity}
          value={city}
        />
        <button className="fetch-button" onClick={fetchWeather}>
          Fetch Weather
        </button>
      </div>
      <div className="weather-info">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weather && (
          <>
             <p className="temperature">Temperature: {weather.main.temp - 273.15}°C</p>
            <p className="humidity">Humidity: {weather.main.humidity}%</p>
            <p className="condition">Condition: {weather.weather[0].description}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
