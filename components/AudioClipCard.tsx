'use client';

import { memo, useState, useCallback } from 'react';
import { Music, Clock, Zap } from 'lucide-react';
import { AudioClip } from '@/types';
import { formatTime } from '@/lib/utils';
import AudioPlayer from './AudioPlayer';
import Waveform from './Waveform';

interface AudioClipCardProps {
  clip: AudioClip;
  viewMode: 'grid' | 'list';
}

function AudioClipCard({ clip, viewMode }: AudioClipCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Music className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {clip.title}
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTime(clip.duration)}
            </span>
            <span>{clip.genre}</span>
            <span>{clip.mood}</span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              {clip.energy}%
            </span>
          </div>
          <div className="mt-2">
            <Waveform clip={clip} isPlaying={isPlaying} />
          </div>
          <div className="mt-2">
            <AudioPlayer
              clip={clip}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {clip.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all overflow-hidden">
      <div className="p-4">
        <div className="mb-3">
          <div className="w-full h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-2">
            <Music className="w-12 h-12 text-white" />
          </div>
          <Waveform clip={clip} isPlaying={isPlaying} height={30} />
        </div>

        <h3 className="font-semibold text-base text-gray-900 mb-2 truncate">
          {clip.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
          <span>{clip.genre}</span>
          <span>•</span>
          <span>{clip.mood}</span>
          <span>•</span>
          <span>{formatTime(clip.duration)}</span>
        </div>

        <div className="mb-3">
          <AudioPlayer
            clip={clip}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {clip.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(AudioClipCard);

