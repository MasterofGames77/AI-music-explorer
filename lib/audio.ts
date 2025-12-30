// Web Audio API utilities for low-latency playback

let audioContext: AudioContext | null = null;
const audioBuffers = new Map<string, AudioBuffer>();
const activeSources = new Map<string, AudioBufferSourceNode>();
const gainNodes = new Map<string, GainNode>();

// Initialize AudioContext (handles browser autoplay policies)
export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Resume AudioContext if suspended (required for autoplay policies)
export async function resumeAudioContext(): Promise<void> {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
}

// Generate a simple audio tone for mock playback
// In production, this would load actual audio files
export async function generateMockAudio(
  duration: number,
  frequency: number = 440,
  type: OscillatorType = 'sine'
): Promise<AudioBuffer> {
  const ctx = getAudioContext();
  const sampleRate = ctx.sampleRate;
  const frameCount = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(2, frameCount, sampleRate);
  
  // Generate a more interesting tone with harmonics
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      // Create a more musical tone with multiple frequencies
      const value = 
        Math.sin(2 * Math.PI * frequency * t) * 0.3 +
        Math.sin(2 * Math.PI * frequency * 2 * t) * 0.2 +
        Math.sin(2 * Math.PI * frequency * 3 * t) * 0.1;
      // Apply envelope to avoid clicks
      const envelope = Math.min(1, t * 10) * Math.min(1, (duration - t) * 10);
      channelData[i] = value * envelope;
    }
  }
  
  return buffer;
}

// Preload audio buffer for a clip
export async function preloadAudio(clipId: string, duration: number): Promise<AudioBuffer> {
  if (audioBuffers.has(clipId)) {
    return audioBuffers.get(clipId)!;
  }
  
  // Generate unique frequency based on clip ID for variety
  const frequency = 200 + (parseInt(clipId.split('-')[1] || '0') % 20) * 50;
  const buffer = await generateMockAudio(duration, frequency);
  audioBuffers.set(clipId, buffer);
  return buffer;
}

// Play audio clip
export async function playAudio(
  clipId: string,
  duration: number,
  onEnded?: () => void,
  volume: number = 1
): Promise<void> {
  // Stop any currently playing audio for this clip
  stopAudio(clipId);
  
  await resumeAudioContext();
  const ctx = getAudioContext();
  const buffer = await preloadAudio(clipId, duration);
  
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  
  // Create gain node for volume control
  const gainNode = ctx.createGain();
  gainNode.gain.value = volume;
  source.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  if (onEnded) {
    source.onended = onEnded;
  }
  
  source.start(0);
  activeSources.set(clipId, source);
  gainNodes.set(clipId, gainNode);
}

// Update volume for a playing clip
export function setVolume(clipId: string, volume: number): void {
  const gainNode = gainNodes.get(clipId);
  if (gainNode) {
    gainNode.gain.value = volume;
  }
}

// Stop audio clip
export function stopAudio(clipId: string): void {
  const source = activeSources.get(clipId);
  if (source) {
    try {
      source.stop();
    } catch (e) {
      // Source may already be stopped
    }
    activeSources.delete(clipId);
    gainNodes.delete(clipId);
  }
}

// Stop all audio
export function stopAllAudio(): void {
  activeSources.forEach((source, clipId) => {
    stopAudio(clipId);
  });
}

// Get audio context state
export function getAudioContextState(): AudioContextState {
  return getAudioContext().state;
}

