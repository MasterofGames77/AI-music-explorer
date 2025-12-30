# Quick Start Guide

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

This installs:
- Next.js 14+ with React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- clsx (utility)

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Explore the App

The app includes:
- **50 mock audio clips** with AI-generated metadata
- **Grid and List views** - Toggle using the buttons in the header
- **Advanced filtering** - Filter by genre, mood, and energy level
- **Search** - Search across titles, tags, genres, and instruments
- **Audio playback** - Click play on any clip to hear generated audio
- **Waveform visualization** - Visual representation of each clip

## Project Architecture

### Key Files

**Core App:**
- `app/page.tsx` - Main explorer page with state management
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles

**Components:**
- `components/AudioClipCard.tsx` - Individual clip display (memoized)
- `components/AudioPlayer.tsx` - Web Audio API player with controls
- `components/ClipGrid.tsx` - Grid/list view container
- `components/FilterBar.tsx` - Filter and search UI
- `components/Waveform.tsx` - Audio visualization

**Utilities:**
- `lib/audio.ts` - Web Audio API integration (low-latency playback)
- `lib/mockData.ts` - Mock AI metadata generator
- `lib/utils.ts` - Helper functions

**Types:**
- `types/index.ts` - TypeScript type definitions

## How It Works

### Audio Playback
1. Uses Web Audio API for low-latency playback
2. Generates mock audio tones programmatically (unique per clip)
3. Preloads audio buffers for instant playback
4. Manages audio context lifecycle (handles browser autoplay policies)

### Mock Data
- Generates 50 diverse clips with realistic metadata
- Each clip has: genre, mood, tempo, instruments, energy, tags
- Creates unique waveforms for visualization

### Performance
- React.memo for clip cards (prevents unnecessary re-renders)
- useMemo for filtering (only recalculates when filters change)
- Efficient audio buffer management
- Clean audio cleanup on unmount

## Customization

### Add More Clips
Edit `lib/mockData.ts`:
```typescript
// In app/page.tsx, change:
generateMockClips(50) // to generateMockClips(100)
```

### Modify Filters
Edit `components/FilterBar.tsx` to add new filter options.

### Change Styling
Edit `app/globals.css` or component Tailwind classes.

### Add Real Audio
Replace `generateMockAudio` in `lib/audio.ts` with actual audio file loading.

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Audio Not Playing
- Modern browsers require user interaction before playing audio
- Click the play button to enable audio context
- Check browser console for autoplay policy warnings

### Performance Issues
- Reduce number of clips if needed
- Check React DevTools for unnecessary re-renders
- Consider virtual scrolling for very large lists

## Next Steps

1. **Test the app** - Explore all features
2. **Customize** - Add your own styling or features
3. **Deploy** - Deploy to Vercel, Netlify, or your preferred platform
4. **Document** - Update README with your specific implementation details

---

Ready to showcase your skills! 🚀

