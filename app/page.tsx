"use client";

import { useState, useMemo, useEffect } from "react";
import { Grid3x3, List, Music } from "lucide-react";
import { generateMockClips } from "@/lib/mockData";
import { FilterState, ViewMode, AudioClip } from "@/types";
import FilterBar from "@/components/FilterBar";
import ClipGrid from "@/components/ClipGrid";
import { stopAllAudio } from "@/lib/audio";

export default function Home() {
  const [clips, setClips] = useState<AudioClip[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterState, setFilterState] = useState<FilterState>({
    genre: null,
    mood: null,
    minEnergy: 0,
    maxEnergy: 100,
    minTempo: 60,
    maxTempo: 160,
    instruments: [],
    startDate: null,
    endDate: null,
    searchQuery: "",
  });

  // Generate mock data only on client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const generatedClips = generateMockClips(50);
    setClips(generatedClips);

    // Initialize tempo range based on generated clips
    const tempos = generatedClips.map((c) => c.tempo);
    const minTempo = Math.min(...tempos);
    const maxTempo = Math.max(...tempos);
    setFilterState((prev) => ({
      ...prev,
      minTempo,
      maxTempo,
    }));
  }, []);

  // Filter clips based on current filter state
  const filteredClips = useMemo(() => {
    return clips.filter((clip) => {
      // Genre filter
      if (filterState.genre && clip.genre !== filterState.genre) {
        return false;
      }

      // Mood filter
      if (filterState.mood && clip.mood !== filterState.mood) {
        return false;
      }

      // Energy filter
      if (
        clip.energy < filterState.minEnergy ||
        clip.energy > filterState.maxEnergy
      ) {
        return false;
      }

      // Tempo filter
      if (
        clip.tempo < filterState.minTempo ||
        clip.tempo > filterState.maxTempo
      ) {
        return false;
      }

      // Instruments filter
      if (filterState.instruments.length > 0) {
        const hasSelectedInstrument = filterState.instruments.some(
          (instrument) => clip.instruments.includes(instrument)
        );
        if (!hasSelectedInstrument) {
          return false;
        }
      }

      // Date range filter
      if (filterState.startDate || filterState.endDate) {
        const clipDate = new Date(clip.createdAt);
        if (filterState.startDate) {
          const startDate = new Date(filterState.startDate);
          if (clipDate < startDate) {
            return false;
          }
        }
        if (filterState.endDate) {
          const endDate = new Date(filterState.endDate);
          // Set to end of day for inclusive comparison
          endDate.setHours(23, 59, 59, 999);
          if (clipDate > endDate) {
            return false;
          }
        }
      }

      // Search query
      if (filterState.searchQuery) {
        const query = filterState.searchQuery.toLowerCase();
        const searchableText = [
          clip.title,
          clip.genre,
          clip.mood,
          ...clip.tags,
          ...clip.instruments,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [clips, filterState]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI-Powered Music Clip Explorer
                </h1>
                <p className="text-sm text-gray-600">
                  Explore AI-tagged audio clips with fast, low-latency playback
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isClient ? (
          <>
            <FilterBar
              clips={clips}
              filterState={filterState}
              onFilterChange={handleFilterChange}
              resultCount={filteredClips.length}
            />

            <ClipGrid clips={filteredClips} viewMode={viewMode} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading clips...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Built with Next.js, React, and Web Audio API • Low-latency audio
            exploration
          </p>
        </div>
      </footer>
    </main>
  );
}
