import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Search({ onSearch, isDarkMode }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSearch = async () => {
    if (city.trim() !== '') {
      onSearch(city);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);
    if (inputValue.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`
      );
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    onSearch(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="flex justify-center my-6 relative" ref={searchInputRef}>
      <div className={`flex items-center rounded-full shadow-lg overflow-hidden w-full max-w-2xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={`px-6 py-3 w-full rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 text-gray-300 placeholder-gray-500' : 'bg-white text-gray-700 placeholder-gray-300'
          }`}
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-full hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className={`absolute left-0 right-0 mt-10 rounded-md shadow-md max-h-50 overflow-y-auto z-10 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white'
        }`}>
          {suggestions.map((suggestion) => (
            <li
              key={`${suggestion.name}-${suggestion.lat}-${suggestion.lon}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                isDarkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100'
              }`}
            >
              {suggestion.name}, {suggestion.state}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;