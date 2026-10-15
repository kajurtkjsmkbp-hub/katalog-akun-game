import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  Heart, 
  ShoppingCart, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  Zap,
  MessageCircle,
  LayoutDashboard
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { GAMES } from '../data/games';

export function Navbar({ onOpenAddModal, onOpenCart, onOpenWishlist, onOpenAdminCMS, searchTerm, setSearchTerm }) {
  const { currentGame, activeGameId, selectGame, audioEnabled, toggleAudio, playClick } = useTheme();
  const { cart, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/90 border-b border-indigo-500/25 transition-all duration-500 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LOGO & BRAND */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer select-none group" 
            onClick={() => selectGame('all')}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-indigo-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-400 uppercase">
                  KHANZA<span className="text-cyan-400">.NET</span> <span className="text-indigo-400 text-lg">STORE</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                  LEGAL & TERVERIFIKASI
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-300 font-semibold">A Member of <span className="text-indigo-300">PT. Khanza Digital Nusantara</span></span>
              </p>
            </div>
          </div>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={`Cari akun ${currentGame.shortName !== 'Semua' ? currentGame.name : 'skin, rank, hero, ID'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/90 text-white placeholder-slate-400 text-xs sm:text-sm rounded-2xl pl-10 pr-10 py-3 border border-slate-700/80 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-white bg-slate-800 p-1 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* RIGHT CONTROLS & ACTIONS */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* Admin CMS Trigger Button */}
            <button
              onClick={() => { playClick(); onOpenAdminCMS(); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-indigo-500/40 hover:border-indigo-400 text-cyan-300 hover:text-white text-xs font-gaming font-bold shadow-sm transition-all"
              title="Buka CMS Admin Panel"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              <span>CMS Admin</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              title={audioEnabled ? "Matikan Efek Suara (Audio ON)" : "Nyalakan Efek Suara (Audio OFF)"}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-white transition-all"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => { playClick(); onOpenWishlist(); }}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-all"
              title="Daftar Keinginan"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => { playClick(); onOpenCart(); }}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-cyan-400 transition-all"
              title="Keranjang Belanja"
            >
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Jual / Pasang Akun Button */}
            <button
              onClick={() => { playClick(); onOpenAddModal(); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-gaming font-bold text-xs tracking-wider shadow-lg shadow-indigo-500/25 transform hover:-translate-y-0.5 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Jual Akun</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => { playClick(); onOpenAdminCMS(); }}
              className="p-2 rounded-xl bg-slate-900 border border-indigo-500/40 text-cyan-300 text-xs font-bold"
              title="CMS Admin"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            <button
              onClick={() => { playClick(); onOpenCart(); }}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={`Cari akun ${currentGame.shortName}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 text-white placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* MOBILE EXPANDED MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenWishlist(); }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Wishlist ({wishlist.length})</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdminCMS(); }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-indigo-500/40 text-xs font-semibold text-cyan-300"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>CMS Admin</span>
              </button>
            </div>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAddModal(); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-gaming font-bold text-xs tracking-wider"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Jual / Pasang Akun Baru</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
