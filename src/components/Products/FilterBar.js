
import React from 'react';
import { debounce } from 'lodash';

const FilterBar = ({ categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) => {
  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border rounded p-2"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
