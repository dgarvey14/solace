import React from 'react';
import { SearchFilterProps } from '../types';

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onChange,
  onClick,
}) => (
  <div className="mb-8 space-y-4">
    <div className="flex gap-4 items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solaceGreenLight"
        placeholder="Search advocates..."
      />
      <button
        onClick={onClick}
        className="bg-solaceGreen hover:bg-opacity-80 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-solaceGreenLight"
      >
        Reset Search
      </button>
    </div>
  </div>
);

export default SearchFilter;
