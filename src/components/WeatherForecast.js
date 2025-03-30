import React, { useState, useEffect } from "react";
import "../styles/WeatherForecast.css";

function WeatherForecast({ lat, lon }) {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!lat || !lon) return;

        const API_KEY = "33c3ec784454d95896e68aa69a75f279";
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

        const fetchForecast = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod !== "200") {
                    throw new Error("Failed to fetch forecast");
                }

                // Extract one forecast per day (skip every 8 intervals = 24 hours)
                const dailyForecast = data.list.filter((_, index) => index % 8 === 0);

                setForecast(dailyForecast);
                setError("");
            } catch (err) {
                setError("Could not load forecast data");
                setForecast([]);
            }
            setLoading(false);
        };

        fetchForecast();
    }, [lat, lon]);

    return (
        <div className="forecast-container">
            {loading && <p>Loading forecast...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                <div className="forecast-cards">
                    {forecast.map((day, index) => (
                        <div key={index} className="forecast-card">
                            <p>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</p>
                            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="Weather Icon" />
                            <p>{Math.round(day.main.temp)}°C</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeatherForecast;
