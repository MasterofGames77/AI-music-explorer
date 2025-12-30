import { AudioClip } from '@/types';

// Mock data pools for generating diverse clips
const GENRES = [
  'Electronic', 'Rock', 'Jazz', 'Hip-Hop', 'Pop', 'Ambient',
  'Classical', 'Folk', 'R&B', 'Country', 'Reggae', 'Blues'
];

const MOODS = [
  'Energetic', 'Calm', 'Melancholic', 'Upbeat', 'Dark', 'Dreamy',
  'Aggressive', 'Peaceful', 'Nostalgic', 'Futuristic', 'Romantic', 'Mysterious'
];

const INSTRUMENTS = [
  'Piano', 'Guitar', 'Drums', 'Bass', 'Synthesizer', 'Violin',
  'Vocals', 'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Harp',
  'Electric Guitar', 'Organ', 'Percussion'
];

const TITLES = [
  'Midnight Drive', 'Ocean Waves', 'City Lights', 'Desert Wind',
  'Neon Dreams', 'Forest Path', 'Space Journey', 'Rainy Day',
  'Summer Breeze', 'Winter Storm', 'Golden Hour', 'Deep Blue',
  'Electric Pulse', 'Silent Echo', 'Crystal Clear', 'Fading Light',
  'Rising Sun', 'Twilight Zone', 'Cosmic Dance', 'Urban Beat'
];

// Generate a random waveform for visualization
function generateWaveform(length: number = 100): number[] {
  return Array.from({ length }, () => Math.random() * 0.5 + 0.25);
}

// Generate a single mock audio clip
function generateClip(id: number): AudioClip {
  const genre = GENRES[Math.floor(Math.random() * GENRES.length)];
  const mood = MOODS[Math.floor(Math.random() * MOODS.length)];
  const numInstruments = Math.floor(Math.random() * 4) + 2;
  const instruments = Array.from({ length: numInstruments }, () =>
    INSTRUMENTS[Math.floor(Math.random() * INSTRUMENTS.length)]
  );
  // Remove duplicates
  const uniqueInstruments = Array.from(new Set(instruments));
  
  const energy = Math.floor(Math.random() * 100);
  const tempo = Math.floor(Math.random() * 100) + 60; // 60-160 BPM
  const duration = Math.random() * 30 + 10; // 10-40 seconds
  
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];
  
  // Generate tags based on properties
  const tags = [
    genre.toLowerCase(),
    mood.toLowerCase(),
    energy > 70 ? 'high-energy' : energy < 30 ? 'low-energy' : 'medium-energy',
    tempo > 120 ? 'fast' : tempo < 80 ? 'slow' : 'moderate',
    ...uniqueInstruments.slice(0, 2).map(i => i.toLowerCase())
  ];

  // Generate a random date within the last 90 days
  const daysAgo = Math.floor(Math.random() * 90);
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - daysAgo);

  return {
    id: `clip-${id}`,
    title: `${title} ${id}`,
    duration,
    genre,
    mood,
    tempo,
    instruments: uniqueInstruments,
    energy,
    tags,
    createdAt,
    waveform: generateWaveform(),
  };
}

// Generate multiple mock clips
export function generateMockClips(count: number = 50): AudioClip[] {
  return Array.from({ length: count }, (_, i) => generateClip(i + 1));
}

// Get unique values for filters
export function getUniqueGenres(clips: AudioClip[]): string[] {
  return Array.from(new Set(clips.map(c => c.genre))).sort();
}

export function getUniqueMoods(clips: AudioClip[]): string[] {
  return Array.from(new Set(clips.map(c => c.mood))).sort();
}

export function getUniqueInstruments(clips: AudioClip[]): string[] {
  const allInstruments = clips.flatMap(c => c.instruments);
  return Array.from(new Set(allInstruments)).sort();
}

export function getTempoRange(clips: AudioClip[]): { min: number; max: number } {
  const tempos = clips.map(c => c.tempo);
  return {
    min: Math.min(...tempos),
    max: Math.max(...tempos),
  };
}

