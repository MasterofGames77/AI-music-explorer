# AI-Powered Music Clip Explorer

A modern web application for exploring AI-tagged audio clips with fast, low-latency playback. Built with Next.js, React, and Web Audio API.

## 🎯 Project Overview

This project demonstrates:

- **Low-latency audio playback** using Web Audio API
- **Responsive UI** with grid and list views
- **Fast filtering and search** for exploring audio clips
- **Scalable client-side architecture** with React and TypeScript
- **Performance optimizations** including memoization and efficient rendering

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
ai-music-explorer/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main explorer page
│   └── globals.css         # Global styles
├── components/
│   ├── AudioClipCard.tsx   # Individual clip card component
│   ├── AudioPlayer.tsx     # Web Audio API player
│   ├── ClipGrid.tsx        # Grid/list view container
│   ├── FilterBar.tsx       # Filter/search controls
│   └── Waveform.tsx        # Audio visualization
├── lib/
│   ├── audio.ts            # Web Audio API utilities
│   ├── mockData.ts         # Mock AI metadata generator
│   └── utils.ts            # Helper functions
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## ✨ Features

### Audio Playback

- **Low-latency playback** using Web Audio API
- **Preloaded audio buffers** for instant start
- **Visual waveform** representation
- **Progress tracking** and time display
- **Volume control**

### Exploration

- **Grid and List views** - Toggle between different layouts
- **Advanced filtering** - Filter by genre, mood, and energy level
- **Full-text search** - Search across titles, tags, genres, and instruments
- **Real-time filtering** - Instant results as you type

### Performance

- **React.memo** for optimized re-renders
- **useMemo** for expensive filter computations
- **Efficient audio management** with buffer pooling
- **Responsive design** for all screen sizes

## 🎨 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Web Audio API** - Low-latency audio playback
- **Lucide React** - Modern icon library

## 📝 Key Implementation Details

### Web Audio API Integration

- Uses `AudioContext` for low-latency playback
- Generates mock audio tones programmatically
- Handles browser autoplay policies gracefully
- Manages audio buffer lifecycle efficiently

### Mock Data Generation

- Generates 50 diverse audio clips with AI metadata
- Includes realistic tags: genre, mood, tempo, instruments, energy
- Creates unique waveforms for visualization

### Performance Optimizations

- Memoized components to prevent unnecessary re-renders
- Efficient filtering with useMemo
- Clean audio cleanup on component unmount
- Optimized state management

## 🎯 Resume-Ready Features

This project demonstrates:

- ✅ Low-latency audio playback implementation
- ✅ Responsive, modern UI/UX design
- ✅ Fast filtering and search functionality
- ✅ Scalable component architecture
- ✅ Performance optimizations
- ✅ TypeScript for type safety
- ✅ Clean, maintainable code structure

## 🔮 Future Enhancements

Potential improvements:

- Real audio file support
- Audio upload functionality
- Playlist creation
- Sharing capabilities
- Advanced audio analysis
- User authentication
- Cloud storage integration

## 📄 License

This project is created for portfolio/resume purposes.

---
