import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState("");
  const [error, setError] = useState("");

  const apiKey = "d42f08cf7415b017ff224e02e22a5366";

  const getWeather = (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    fetchWeather(city);
  };

  function fetchWeather(selectedCity) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.cod === 200) {
          setWeatherData(data);
          setError("");
          setCity("");
        } else {
          setWeatherData("");
          setError(data.message);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setWeatherData("");
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
  }
  return (
    <>
      <main>
        <h1>Check the Weather</h1>

        <form className="input-container" onSubmit={getWeather}>
          <input
            type="text"
            placeholder="Enter city name"
            aria-label="City name"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />

          <button disabled={loading}>Fetch Weather</button>
        </form>

        {loading && <p style={{ color: "green" }}>Loading...</p>}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {weatherData && (
          <div className="stats">
            {/* <h2>Temperature stats in {city}:</h2> */}
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Temperature: {weatherData.weather[0].description}</p>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
