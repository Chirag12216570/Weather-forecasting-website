import React, { useState, useEffect } from "react";
import WeatherForecast from "./WeatherForecast"; 
import "../styles/WeatherCard.css";

function WeatherCard({ place }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!place || !place.name) return;

        const API_KEY = "33c3ec784454d95896e68aa69a75f279";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${place.name}&units=metric&appid=${API_KEY}`;

        const fetchWeather = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod !== 200) {
                    throw new Error("Invalid city name");
                }

                setWeather(data);
                setError("");
            } catch (err) {
                setError("Could not fetch weather data");
                setWeather(null);
            }
            setLoading(false);
        };

        fetchWeather();
    }, [place]); // ✅ Runs when "place" changes, including recent searches

    return (
        <div className="weather-card-container">
            {loading && <p className="loading-text">Loading weather...</p>}
            {error && <p className="error-text">{error}</p>}
            {weather && (
                <>
                    <div className="weather-card">
                        <h2 className="city-name">{weather.name}</h2>
                        <p className="timezone">UTC Offset: {weather.timezone / 3600} hrs</p>
                        <p className="temperature">{Math.round(weather.main.temp)}°C</p>
                        <p className="feels-like">Feels Like: {Math.round(weather.main.feels_like)}°C</p>
                        <p className="min-max-temp">Min: {Math.round(weather.main.temp_min)}°C | Max: {Math.round(weather.main.temp_max)}°C</p>
                        <p className="weather-details">Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} km/h</p>
                        <img className="weather-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                    </div>

                    {/* 5-Day Forecast Component */}
                    <WeatherForecast lat={weather.coord.lat} lon={weather.coord.lon} />
                </>
            )}
        </div>
    );
}

export default WeatherCard;
