import React from "react";
import "../styles/RecentSearches.css";

function RecentSearches({ recentSearches = [], setSelectedPlace }) {
    if (!Array.isArray(recentSearches) || recentSearches.length === 0) {
        return null; // Don't render if no searches
    }

    return (
        <div className="recent-searches-container">
            <span className="recent-searches-title">Recent Searches:</span>
            <span className="recent-searches-list">
                {recentSearches.map((place, index) => (
                    <span 
                        key={index} 
                        className="recent-search-item" 
                        onClick={() => setSelectedPlace(place)} // ✅ Fixed function name
                    >
                        {place.name}
                    </span>
                ))}
            </span>
        </div>
    );
}

export default RecentSearches;
