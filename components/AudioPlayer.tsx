"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import {
  playAudio,
  stopAudio,
  resumeAudioContext,
  setVolume as setAudioVolume,
} from "@/lib/audio";
import { formatTime } from "@/lib/utils";
import { AudioClip } from "@/types";

interface AudioPlayerProps {
  clip: AudioClip;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  autoPlay?: boolean;
}

export default function AudioPlayer({
  clip,
  isPlaying,
  onPlay,
  onPause,
  autoPlay = false,
}: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      // Start playback
      playAudio(
        clip.id,
        clip.duration,
        () => {
          onPause();
          setCurrentTime(0);
        },
        volume
      );

      // Update current time
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= clip.duration) {
            onPause();
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      // Stop playback
      stopAudio(clip.id);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      stopAudio(clip.id);
    };
  }, [isPlaying, clip.id, clip.duration, onPlay, onPause, volume]);

  // Update volume when it changes
  useEffect(() => {
    if (isPlaying) {
      setAudioVolume(clip.id, volume);
    }
  }, [volume, isPlaying, clip.id]);

  // Auto-play on mount if enabled
  const hasAutoPlayedRef = useRef(false);
  useEffect(() => {
    if (autoPlay && !isPlaying && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      resumeAudioContext().then(() => {
        onPlay();
      });
    }
  }, [autoPlay, isPlaying, onPlay]);

  const handlePlayPause = async () => {
    await resumeAudioContext();
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const progress = (currentTime / clip.duration) * 100;

  return (
    <div className="flex items-center gap-2 w-full">
      <button
        onClick={handlePlayPause}
        className="flex-shrink-0 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </button>

      <div className="flex-1 flex items-center gap-2">
        <span className="text-xs text-gray-600 min-w-[40px]">
          {formatTime(currentTime)}
        </span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 min-w-[40px]">
          {formatTime(clip.duration)}
        </span>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <Volume2 className="w-4 h-4 text-gray-600" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1"
        />
      </div>
    </div>
  );
}
