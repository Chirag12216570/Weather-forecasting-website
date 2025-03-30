import { useState, useEffect, useRef } from "react";
import "../styles/PlaceSearch.css";

function PlaceSearch({ setSelectedPlace, updateRecentSearches }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const suggestionsRef = useRef(null);

    const fetchSuggestions = async (searchQuery) => {
        if (!searchQuery) {
            setSuggestions([]);
            setErrorMessage("");
            return;
        }

        const API_KEY = "33c3ec784454d95896e68aa69a75f279";
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setSuggestions(data);
            setErrorMessage("");
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleSearch = () => {
        const matchedPlace = suggestions.find(
            (place) => place.name.toLowerCase() === query.toLowerCase()
        );

        if (matchedPlace) {
            setSelectedPlace(matchedPlace);
            updateRecentSearches(matchedPlace); // Store in recent searches
            setErrorMessage("");
            setSuggestions([]);
        } else {
            setErrorMessage("Place not found");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="place-search-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a place..."
                    className="search-input"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        fetchSuggestions(e.target.value);
                    }}
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {suggestions.length > 0 && (
                <div ref={suggestionsRef} className="suggestions-container">
                    {suggestions.map((place, index) => (
                        <div key={index} className="suggestion-card" onClick={() => {
                            setSelectedPlace(place);
                            updateRecentSearches(place); // Store in recent searches
                            setSuggestions([]);
                        }}>
                            <p className="suggestion-name">{place.name}</p>
                            <p className="suggestion-location">{place.state ? `${place.state}, ` : ""}{place.country}</p>
                        </div>
                    ))}
                </div>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default PlaceSearch;
