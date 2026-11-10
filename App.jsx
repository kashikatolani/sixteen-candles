import React, { useState } from 'react';

export default function App() {
  // States: 'START' -> 'PRELOADER' -> 'MAIN'
  const [appState, setAppState] = useState('START');

  // --- 1. START STATE ---
  // Requires user interaction so the browser allows the video to autoplay
  if (appState === 'START') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center selection:bg-zinc-800">
        <button 
          onClick={() => setAppState('PRELOADER')}
          className="px-8 py-4 border-2 border-zinc-600 hover:bg-zinc-200 hover:text-black transition-all duration-300 tracking-[0.2em] uppercase text-sm text-zinc-300 font-bold"
        >
          Click to Begin
        </button>
      </div>
    );
  }

  // --- 2. PRELOADER STATE ---
  // Plays your montage video. Transitions to MAIN when it ends or is skipped.
  if (appState === 'PRELOADER') {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <video
          src="copy_E3EBE355-9EB4-484B-8F5C-BEDB9885A1E4.mov"
          autoPlay
          playsInline
          onEnded={() => setAppState('MAIN')}
          className="w-full h-full object-cover"
        />
        
        {/* Skip Button */}
        <button 
          onClick={() => setAppState('MAIN')}
          className="absolute bottom-8 right-8 z-50 px-6 py-3 bg-black/50 backdrop-blur-sm border border-zinc-500 hover:bg-black text-white transition-all uppercase tracking-[0.2em] text-xs rounded-full"
        >
          Skip
        </button>
      </div>
    );
  }

  // --- 3. MAIN STATE ---
  // A simple placeholder for where we will build the 16-grid next.
  if (appState === 'MAIN') {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-mono tracking-[0.3em] text-zinc-600 uppercase">
          Grid Coming Soon
        </h1>
      </div>
    );
  }

  return null;
}