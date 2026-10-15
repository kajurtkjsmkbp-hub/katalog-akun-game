import React, { createContext, useContext, useState, useEffect } from 'react';
import { GAMES } from '../data/games';
import { soundFx } from '../utils/audio';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [activeGameId, setActiveGameId] = useState('all');
  const [audioEnabled, setAudioEnabled] = useState(true);

  const currentGame = GAMES.find(g => g.id === activeGameId) || GAMES[0];

  useEffect(() => {
    // Apply data-theme to document element for global CSS variables
    const themeKey = currentGame.theme || 'all';
    document.documentElement.setAttribute('data-theme', themeKey);
  }, [currentGame]);

  const selectGame = (gameId) => {
    setActiveGameId(gameId);
    if (audioEnabled) {
      soundFx.playThemeSwitch();
    }
  };

  const toggleAudio = () => {
    const nextState = soundFx.toggle();
    setAudioEnabled(nextState);
    if (nextState) {
      soundFx.playClick();
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        activeGameId,
        currentGame,
        selectGame,
        audioEnabled,
        toggleAudio,
        playClick: () => audioEnabled && soundFx.playClick(),
        playSuccess: () => audioEnabled && soundFx.playSuccess()
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
