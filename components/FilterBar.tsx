"use client";

import { Search, Filter, X } from "lucide-react";
import { FilterState } from "@/types";
import { getUniqueGenres, getUniqueMoods } from "@/lib/mockData";
import { AudioClip } from "@/types";

interface FilterBarProps {
  clips: AudioClip[];
  filterState: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  resultCount: number;
}

export default function FilterBar({
  clips,
  filterState,
  onFilterChange,
  resultCount,
}: FilterBarProps) {
  const genres = getUniqueGenres(clips);
  const moods = getUniqueMoods(clips);

  const handleSearchChange = (value: string) => {
    onFilterChange({ searchQuery: value });
  };

  const clearFilters = () => {
    onFilterChange({
      genre: null,
      mood: null,
      minEnergy: 0,
      maxEnergy: 100,
      searchQuery: "",
    });
  };

  const hasActiveFilters =
    filterState.genre !== null ||
    filterState.mood !== null ||
    filterState.minEnergy > 0 ||
    filterState.maxEnergy < 100 ||
    filterState.searchQuery !== "";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search clips by title, genre, mood, or tags..."
            value={filterState.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            value={filterState.genre || ""}
            onChange={(e) => onFilterChange({ genre: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mood
          </label>
          <select
            value={filterState.mood || ""}
            onChange={(e) => onFilterChange({ mood: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            <option value="">All Moods</option>
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Energy: {filterState.minEnergy}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filterState.minEnergy}
            onChange={(e) =>
              onFilterChange({ minEnergy: parseInt(e.target.value) })
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Energy: {filterState.maxEnergy}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filterState.maxEnergy}
            onChange={(e) =>
              onFilterChange({ maxEnergy: parseInt(e.target.value) })
            }
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing <span className="font-semibold">{resultCount}</span> of{" "}
        <span className="font-semibold">{clips.length}</span> clips
      </div>
    </div>
  );
}
