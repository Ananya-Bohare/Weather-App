function RecentSearches({ recentSearches, onCityClick }) {
  return (
    <div className="mb-0">
      <div className="flex flex-wrap items-center space-x-2 space-y-1">
        <h3 className="text-md text-gray-800 dark:text-gray-300 mb-0">Recent Searches</h3>
        {recentSearches.map((city, index) => (
          <span 
            key={index} 
            onClick={() => onCityClick(city)}
            className="cursor-pointer text-gray-800 dark:text-gray-300 font-medium px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;
