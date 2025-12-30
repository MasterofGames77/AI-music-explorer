"use client";

import { AudioClip } from "@/types";

interface WaveformProps {
  clip: AudioClip;
  isPlaying?: boolean;
  currentTime?: number;
  height?: number;
}

export default function Waveform({
  clip,
  isPlaying = false,
  currentTime = 0,
  height = 40,
}: WaveformProps) {
  const waveform = clip.waveform || [];
  const progress = clip.duration > 0 ? currentTime / clip.duration : 0;
  const progressIndex = Math.floor(progress * waveform.length);

  return (
    <div
      className="flex items-center gap-0.5 w-full"
      style={{ height: `${height}px` }}
    >
      {waveform.map((amplitude, index) => {
        const barHeight = amplitude * height;
        const isPast = index < progressIndex;
        const isActive = isPlaying && isPast;

        return (
          <div
            key={index}
            className={`flex-1 rounded-sm transition-all duration-75 ${
              isActive ? "bg-blue-600" : isPast ? "bg-blue-400" : "bg-gray-300"
            }`}
            style={{
              height: `${barHeight}px`,
              minHeight: "2px",
            }}
          />
        );
      })}
    </div>
  );
}
