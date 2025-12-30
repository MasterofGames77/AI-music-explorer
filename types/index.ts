// Core types for the AI-Powered Music Clip Explorer

export interface AudioClip {
  id: string;
  title: string;
  duration: number; // in seconds
  genre: string;
  mood: string;
  tempo: number; // BPM
  instruments: string[];
  energy: number; // 0-100
  tags: string[];
  audioUrl?: string; // Optional: for real audio files
  waveform?: number[]; // Pre-computed waveform data
}

export type ViewMode = 'grid' | 'list';

export interface FilterState {
  genre: string | null;
  mood: string | null;
  minEnergy: number;
  maxEnergy: number;
  searchQuery: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentClipId: string | null;
  currentTime: number;
  duration: number;
  volume: number;
}

