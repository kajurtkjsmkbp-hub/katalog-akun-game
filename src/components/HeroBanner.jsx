import React from 'react';
import { ShieldCheck, Zap, Sparkles, CheckCircle2, Flame, Award, Headphones, MessageCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function HeroBanner({ onExploreClick }) {
  const { currentGame, playClick } = useTheme();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 my-6 mx-4 sm:mx-6 lg:mx-8 bg-slate-900/90 shadow-2xl transition-all duration-700">
      
      {/* BACKGROUND IMAGE WITH GAME SPECIFIC OVERLAY */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-35 transform scale-105 transition-all duration-1000 filter blur-[1px]"
        style={{ backgroundImage: `url(${currentGame.bannerBg})` }}
      />
      
      {/* GRADIENT MESH ACCENTS */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40 z-0" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/20 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-cyan-500/15 filter blur-3xl pointer-events-none" />

      {/* HERO CONTENT */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-10 sm:py-14 max-w-4xl">
        
        {/* GAME THEME BADGE */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-cyan-300 text-xs font-gaming font-extrabold tracking-widest uppercase shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{currentGame.badge} — KATALOG RESMI</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>A Member of PT. Khanza Digital Nusantara</span>
          </div>
        </div>

        {/* HERO TITLE */}
        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white mb-4">
          {currentGame.tagline}
        </h1>

        {/* HERO DESCRIPTION */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-8 font-medium">
          {currentGame.description}
        </p>

        {/* HIGHLIGHT PILLS PER GAME */}
        {currentGame.specHighlights && (
          <div className="flex flex-wrap gap-2.5 mb-8">
            {currentGame.specHighlights.map((highlight, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 font-semibold shadow-sm hover:border-indigo-500/60 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        )}

        {/* ACTION BUTTONS & STATS */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Khanza.NET,%20saya%20mau%20konsultasi%20akun%20game"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-gaming font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/30 transform hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Hubungi Admin Rekber</span>
          </a>

          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium px-4 py-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Proses Serah Terima Instan 3 - 5 Menit</span>
          </div>
        </div>

        {/* STATS COUNTER BAR */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-slate-800/80 max-w-xl">
          <div>
            <p className="text-xs text-slate-400 font-medium">Akun Tersedia</p>
            <p className="font-display text-xl sm:text-2xl font-black text-white">
              {currentGame.stats?.totalAccounts || '250+'}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Garansi Resmi</p>
            <p className="font-display text-xl sm:text-2xl font-black text-emerald-400">
              {currentGame.stats?.guarantee || 'Anti HB 100%'}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Layanan Rekber</p>
            <p className="font-display text-xl sm:text-2xl font-black text-cyan-400">
              24 Jam Siap
            </p>
          </div>
        </div>

      </div>

      {/* FLOATING GUARANTEE STAMP */}
      <div className="hidden lg:flex absolute right-12 bottom-12 items-center gap-4 p-5 rounded-3xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <p className="font-gaming font-extrabold text-sm text-white tracking-wider">REKBER ESCROW RESMI</p>
          <p className="text-xs text-slate-300">Dana 100% aman sampai akun siap dimainkan</p>
        </div>
      </div>

    </div>
  );
}
