import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Tag, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function FilterBar({
  selectedRank,
  setSelectedRank,
  pricePreset,
  setPricePreset,
  sortBy,
  setSortBy,
  badgeFilter,
  setBadgeFilter,
  totalResults,
  resetFilters,
  hasActiveFilters
}) {
  const { currentGame, playClick } = useTheme();

  const PRICE_PRESETS = [
    { id: 'all', label: 'Semua Harga' },
    { id: 'under500', label: '< 500 Rb' },
    { id: '500to1500', label: '500Rb - 1.5Jt' },
    { id: '1500to3000', label: '1.5Jt - 3Jt' },
    { id: 'above3000', label: '> 3 Juta' }
  ];

  const BADGE_PRESETS = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'AKUN SULTAN', label: '👑 Sultan' },
    { id: 'FLASH SALE', label: '⚡ Flash Sale' },
    { id: 'BEST SELLER', label: '🔥 Best Seller' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        
        {/* TOP ROW: RANK + SORT + RESET */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* RANK SELECTOR */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              <span>Rank / Tier:</span>
            </span>

            {currentGame.ranks ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentGame.ranks.map((rank) => (
                  <button
                    key={rank}
                    onClick={() => {
                      playClick();
                      setSelectedRank(rank === 'All Rank' || rank === 'All AR' || rank === 'All Level' ? 'all' : rank);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-gaming font-bold transition-all ${
                      (selectedRank === rank || (selectedRank === 'all' && (rank === 'All Rank' || rank === 'All AR' || rank === 'All Level')))
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30 ring-1 ring-indigo-400'
                        : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {rank}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-xs text-slate-400 italic">Pilih game di atas untuk filter rank spesifik</span>
            )}
          </div>

          {/* SORTING SELECT */}
          <div className="flex items-center gap-2 justify-end">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Urutkan:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => { playClick(); setSortBy(e.target.value); }}
              className="bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2 border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="newest">Terbaru Ditambahkan</option>
              <option value="price_low">Harga: Termurah</option>
              <option value="price_high">Harga: Termahal</option>
              <option value="rating">Rating Penjual Tertinggi</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 transition-colors"
                title="Reset Semua Filter"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

        </div>

        {/* BOTTOM ROW: PRICE PRESETS + BADGE CHIPS + COUNTER */}
        <div className="pt-3 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* PRICE PRESETS */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1">Harga:</span>
            {PRICE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => { playClick(); setPricePreset(preset.id); }}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  pricePreset === preset.id
                    ? 'bg-indigo-500/20 text-cyan-300 border border-indigo-500/60 font-bold shadow-sm'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* BADGE PRESETS */}
          <div className="flex flex-wrap items-center gap-2">
            {BADGE_PRESETS.map((badge) => (
              <button
                key={badge.id}
                onClick={() => { playClick(); setBadgeFilter(badge.id); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-gaming font-semibold transition-all ${
                  badgeFilter === badge.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {badge.label}
              </button>
            ))}

            <div className="pl-3 border-l border-slate-800">
              <span className="text-xs font-extrabold text-white font-gaming tracking-wide">
                Total: <span className="text-cyan-400">{totalResults}</span> Akun
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
