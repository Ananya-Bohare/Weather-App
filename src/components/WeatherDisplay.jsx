import Lottie from "react-lottie-player";
import weatherAnimation from "../assets/weather.json";

function WeatherDisplay({ weatherData, forecastData }) {
  if (!weatherData) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Lottie 
          loop 
          animationData={weatherAnimation} 
          play 
          style={{ width: 400, height: 400 }} 
        />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center mt-4">
          Plan your day with confidence—get accurate weather insights for any location worldwide!
        </p>
      </div>
    );
  }

  const { name, main, weather, wind, visibility, sys } = weatherData;
  const { temp, feels_like, humidity, pressure } = main;
  const { description, icon } = weather[0];
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
  const { sunrise, sunset, country } = sys;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Extract today's hourly forecast
  const todayHourly = [];
  const todayDate = new Date().toISOString().split("T")[0];

  if (forecastData && forecastData.list) {
    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (date === todayDate) {
        todayHourly.push(item);
      }
    });
  }

  return (
    <div className="bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-filter backdrop-blur-lg shadow rounded p-6 my-4 w-full sm:w-[48%] h-596">
      {/* Location and Current Weather */}
      <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
        {name}, {country}
      </h2>
      <div className="flex items-center space-x-4 space-y-3">
        <img src={iconUrl} alt={description} className="w-20 h-20" />
        <div>
          <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{temp}°C</p>
          <p className="text-sm text-gray-600 dark:text-gray-200">Feels Like: {feels_like}°C</p>
          <p className="capitalize text-gray-700 dark:text-gray-200">{description}</p>
        </div>
      </div>

      {/* Air Conditions */}
      <div className="mt-4 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 p-4 rounded-lg shadow-sm">
        <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Air Conditions</h4>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          <p><span className="font-semibold">Humidity:</span> {humidity}%</p>
          <p><span className="font-semibold">Pressure:</span> {pressure} hPa</p>
          <p><span className="font-semibold">Wind Speed:</span> {wind.speed} m/s</p>
          <p><span className="font-semibold">Visibility:</span> {visibility / 1000} km</p>
          <p><span className="font-semibold">Sunrise:</span> {formatTime(sunrise)}</p>
          <p><span className="font-semibold">Sunset:</span> {formatTime(sunset)}</p>
        </div>
      </div>

      {/* Today's Hourly Forecast */}
      {todayHourly.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Today's Hourly Forecast</h4>
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {todayHourly.map((hour, index) => (
              <div key={index} className="flex flex-col items-center bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 p-2 rounded-lg shadow-sm">
                <p className="text-xs text-gray-600 dark:text-gray-300">{hour.dt_txt.split(" ")[1].slice(0, 5)}</p>
                <img
                  src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                  className="w-8 h-8"
                />
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{Math.round(hour.main.temp)}°C</p>
                <p className="text-xs capitalize text-gray-700 dark:text-gray-300">{hour.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
