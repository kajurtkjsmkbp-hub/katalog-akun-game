import React from 'react';
import { Gamepad2, ShieldCheck, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { GAMES } from '../data/games';
import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const { selectGame } = useTheme();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 pt-16 pb-12 mt-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* BRAND */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/25">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-400 uppercase">
                  KHANZA<span className="text-cyan-400">.NET</span> <span className="text-indigo-400 text-lg">STORE</span>
                </span>
                <span className="block text-[11px] text-cyan-300 font-bold tracking-wide">
                  A Member of PT. Khanza Digital Nusantara
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Platform marketplace & katalog jual beli akun game terverifikasi di Indonesia. Dikelola secara profesional dan legal di bawah naungan <strong className="text-slate-300">PT. Khanza Digital Nusantara</strong> dengan perlindungan Escrow Rekber bergaransi seumur hidup.
            </p>

            {/* LEGAL BADGES */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 max-w-md">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-left">
                <p className="text-[10px] text-slate-400 uppercase font-mono">Badan Usaha</p>
                <p className="text-xs font-bold text-white truncate">PT. Khanza Digital Nusantara</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-left">
                <p className="text-[10px] text-slate-400 uppercase font-mono">NIB</p>
                <p className="text-xs font-mono font-bold text-cyan-300">2410260089123</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-left">
                <p className="text-[10px] text-slate-400 uppercase font-mono">PSE Kominfo</p>
                <p className="text-xs font-bold text-emerald-400">Terdaftar Resmi</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600/30 transition-all shadow-md shadow-emerald-500/10"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Customer Care WhatsApp 24 Jam Official</span>
              </a>
            </div>
          </div>

          {/* GAME CATEGORIES */}
          <div>
            <h4 className="font-gaming font-extrabold text-sm text-white uppercase tracking-wider mb-4">
              Katalog Game Universe
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {GAMES.filter(g => g.id !== 'all').map((g) => (
                <li key={g.id}>
                  <button
                    onClick={() => {
                      selectGame(g.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-400 transition-colors text-left flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{g.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* TRUST & SECURITY */}
          <div>
            <h4 className="font-gaming font-extrabold text-sm text-white uppercase tracking-wider mb-4">
              Keamanan Transaksi
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Garansi Anti Hackback 100%</span>
              </li>
              <li>• Rekber Resmi Berbadan Hukum</li>
              <li>• Verifikasi Identitas Penjual</li>
              <li>• Panduan Ganti Email Lengkap</li>
              <li>• Refund Otomatis jika Data Minus</li>
            </ul>
          </div>

        </div>

        {/* PAYMENT BADGES */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium mr-2">Metode Pembayaran Resmi:</span>
            {['QRIS', 'BCA Mobile', 'Mandiri Livin', 'DANA', 'GoPay', 'ShopeePay'].map((pm, i) => (
              <span key={i} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-200 font-mono font-bold shadow-sm">
                {pm}
              </span>
            ))}
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right">
            © 2026 Khanza.NET STORE — A Member of PT. Khanza Digital Nusantara.
          </p>
        </div>

        {/* LEGAL DISCLAIMER */}
        <p className="text-[11px] text-slate-500 text-center leading-relaxed max-w-4xl mx-auto">
          Disclaimer: Khanza.NET adalah marketplace pihak ketiga independen. Segala merk dagang, aset grafis, dan nama game seperti Mobile Legends (Moonton), Valorant (Riot Games), Genshin Impact & Honkai Star Rail (miHoYo / HoYoverse), Free Fire (Garena), dan PUBG Mobile (Krafton / Tencent) merupakan hak cipta milik pengembang masing-masing.
        </p>

      </div>
    </footer>
  );
}
