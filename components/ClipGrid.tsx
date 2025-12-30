"use client";

import { AudioClip } from "@/types";
import AudioClipCard from "./AudioClipCard";

interface ClipGridProps {
  clips: AudioClip[];
  viewMode: "grid" | "list";
}

export default function ClipGrid({ clips, viewMode }: ClipGridProps) {
  if (clips.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No clips found matching your filters.
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {clips.map((clip) => (
          <AudioClipCard key={clip.id} clip={clip} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {clips.map((clip) => (
        <AudioClipCard key={clip.id} clip={clip} viewMode="grid" />
      ))}
    </div>
  );
}
