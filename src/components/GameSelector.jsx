import React from 'react';
import { 
  Gamepad2, 
  Sword, 
  Crosshair, 
  Sparkles, 
  Flame, 
  Shield, 
  Rocket 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { GAMES } from '../data/games';

const ICON_MAP = {
  Gamepad2,
  Sword,
  Crosshair,
  Sparkles,
  Flame,
  Shield,
  Rocket
};

export function GameSelector() {
  const { activeGameId, selectGame } = useTheme();
  const { accounts } = useCart();

  const getAccountCount = (gameId) => {
    if (gameId === 'all') return accounts.length;
    return accounts.filter(acc => acc.gameId === gameId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white flex items-center gap-2.5">
            <span>Pilih Game Universe</span>
            <span className="text-[11px] px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-cyan-300 font-bold uppercase tracking-wider">
              Auto-Adapt Theme
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Klik game favorit Anda di bawah untuk mengubah nuansa visual, warna tema, dan katalog secara langsung
          </p>
        </div>
      </div>

      {/* GAME TABS HORIZONTAL SCROLLER */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
        {GAMES.map((game) => {
          const Icon = ICON_MAP[game.icon] || Gamepad2;
          const isActive = activeGameId === game.id;
          const count = getAccountCount(game.id);

          return (
            <button
              key={game.id}
              onClick={() => selectGame(game.id)}
              className={`flex-shrink-0 relative group flex items-center gap-3.5 px-5 py-3.5 rounded-2xl border transition-all duration-300 text-left select-none ${
                isActive
                  ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/20 scale-[1.03] ring-1 ring-indigo-500/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850 hover:scale-[1.01]'
              }`}
            >
              {/* ICON */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-950 text-slate-400 group-hover:text-white group-hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* INFO */}
              <div>
                <p className={`font-gaming font-extrabold text-sm sm:text-base tracking-wide ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {game.shortName}
                </p>
                <p className={`text-[11px] font-medium ${isActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {count} Akun Siap
                </p>
              </div>

              {/* ACTIVE GLOW INDICATOR */}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
