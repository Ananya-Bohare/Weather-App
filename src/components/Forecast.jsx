function Forecast({ forecastData }) {
  if (!forecastData || !forecastData.list) {
    return <div className="flex justify-center items-center p-4"></div>;
  }

  const dailyForecast = {};
  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date

  forecastData.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // Extract date
    if (!dailyForecast[date]) {
      dailyForecast[date] = [];
    }
    dailyForecast[date].push(item);
  });

  const dailyForecastArray = Object.entries(dailyForecast);

  // Filter out today's forecast
  const nextDaysForecast = dailyForecastArray.filter(([date]) => date !== todayDate);

  // Take the next 7 days
  const next7DaysForecast = nextDaysForecast.slice(0, 7);

  // Function to get weekday name
  const getWeekday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" }); // Shorter weekday
  };

  return (
    <div className="bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-filter backdrop-blur-lg shadow rounded p-6 my-4 w-full sm:w-[48%] h-596 "
    >
      <h3 className="text-xl font-semibold mb-3 text-center text-gray-800 dark:text-gray-100">
        Weekly Forecast
      </h3>
      <div className="space-y-3">
        {dailyForecastArray.map(([date, items]) => {
          const avgTemp = Math.round(
            items.reduce((sum, item) => sum + item.main.temp, 0) / items.length
          );
          const minTemp = Math.min(...items.map((item) => item.main.temp_min));
          const maxTemp = Math.max(...items.map((item) => item.main.temp_max));
          const humidity = Math.round(
            items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length
          );
          const windSpeed = Math.round(
            items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length
          );
          const icon = items[0].weather[0].icon;
          const description = items[0].weather[0].description;

          return (
            <div
              key={date}
              className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 p-2 rounded-lg shadow-sm flex items-center justify-between space-x-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt={description}
                  className="w-8 h-8"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
                    {getWeekday(date)}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {avgTemp}°C
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                  {description}
                </p>
              </div>
              <div className="text-right text-gray-700 dark:text-gray-300">
                <p className="text-xs">
                  Min: {minTemp}°C | Max: {maxTemp}°C
                </p>
                <p className="text-xs">
                  💧 {humidity}% | 🌫 {windSpeed} km/h
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
