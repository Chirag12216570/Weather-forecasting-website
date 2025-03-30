import React, { useState, useEffect } from "react";
import PlaceSearch from "./components/PlaceSearch";
import WeatherCard from "./components/WeatherCard";
import RecentSearches from "./components/RecentSearches";
import ThemeToggle from "./components/ThemeToggle";  // ✅ Re-add the ThemeToggle
import "./styles/App.css";

function App() {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [recentSearches, setRecentSearches] = useState(() => {
        return JSON.parse(localStorage.getItem("recentSearches")) || [];
    });

    const updateRecentSearches = (place) => {
        setRecentSearches((prev) => {
            const updatedSearches = [place, ...prev.filter((p) => p.name !== place.name)].slice(0, 5);
            localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
            return updatedSearches;
        });
    };

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
        setRecentSearches(storedSearches);
    }, []);

    return (
        <div className="app-container">
            <ThemeToggle />  {/* ✅ Make sure ThemeToggle is added back */}
            <h1>Weather Dashboard</h1>
            <PlaceSearch setSelectedPlace={setSelectedPlace} updateRecentSearches={updateRecentSearches} />
            {selectedPlace && <WeatherCard place={selectedPlace} />}
            <RecentSearches recentSearches={recentSearches} setSelectedPlace={setSelectedPlace} />
        </div>
    );
}

export default App;
