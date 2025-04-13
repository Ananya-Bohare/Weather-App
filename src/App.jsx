import { useState, useEffect } from "react";
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import RecentSearches from './components/RecentSearches';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem('recentSearches')) || []
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSearch = async (city) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = response.data;
      setWeatherData(data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apiKey}&units=metric`
      );
      setForecastData(forecastResponse.data);

      if (!recentSearches.includes(data.name)) {
        const updatedSearches = [data.name, ...recentSearches.slice(0, 15)];
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    } catch (error) {
      console.error('Error fetching weather or forecast data:', error);
    }
  };

  const handleCityClick = async (city) => {
    handleSearch(city);
  };

  return (
    <div className={`min-h-screen p-4 font-sans relative transition-colors duration-300 
        ${isDarkMode ? "bg-darkBg text-white" : "bg-lightBg text-gray-800"}`}>
  
      {/* Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="absolute right-4 top-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors p-2 rounded-full"
      >
        {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
      </button>
  
      {/* Weather App title */}
      <h1 className="text-3xl font-bold absolute left-4 top-4">
        Weather App
      </h1>
  
      {/* Centered Search Bar */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <Search onSearch={handleSearch} isDarkMode={isDarkMode} />
        </div>
      </div>
      
      <RecentSearches recentSearches={recentSearches} onCityClick={handleCityClick} />
  
      {/* Weather Display and Forecast */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-5 mt-4 min-h-[684px]">
        <WeatherDisplay weatherData={weatherData} forecastData={forecastData} className="flex-1 max-w-lg " />
        <Forecast forecastData={forecastData} className="flex-1 max-w-lg " />
      </div>
    </div>
  );
}

export default App;
