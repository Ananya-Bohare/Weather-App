import React from 'react';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { BellIcon, Square2StackIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <header className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 ">
      {/* Search Bar */}
      <div className="relative w-[400px]">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-14 rounded-md bg-blue-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
        <IoSearchOutline className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />

        <div className="absolute right-11 top-2 flex items-center space-x-1 text-gray-700 text-base border border-gray-300 px-2 py-0.1 rounded-md">
  <span className="font-medium">⌘</span>
</div>
<div className="absolute right-3 top-2 flex items-center space-x-1 text-gray-700 text-base border border-gray-300 px-2 py-0.1 rounded-md">
  <span>K</span>
</div>


        {searchTerm && (
          <button onClick={handleClearSearch} className="absolute right-10 top-2.5 text-gray-400">
            <IoCloseOutline className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-3">
        <button className="border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-200">
          <InformationCircleIcon className="h-5 w-5 text-gray-600" />
        </button>
        <button className="border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-200">
          <Square2StackIcon className="h-5 w-5 text-gray-600" />
        </button>
        <button className="border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-200">
          <BellIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
