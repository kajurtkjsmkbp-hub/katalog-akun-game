import React from 'react';
import { ShieldCheck, Lock, Headphones, RefreshCw, Star, CheckCircle2, Award, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function TrustSection() {
  const { currentGame } = useTheme();

  const LIVE_TRANSACTIONS = [
    { time: '2 menit lalu', game: 'Mobile Legends', id: 'MLBB-9021', price: 'Rp 1.850.000', admin: 'Admin Dimas' },
    { time: '6 menit lalu', game: 'Valorant', id: 'VAL-9912', price: 'Rp 3.450.000', admin: 'Admin Kevin' },
    { time: '11 menit lalu', game: 'Genshin Impact', id: 'GEN-7740', price: 'Rp 2.450.000', admin: 'Admin Sarah' },
    { time: '18 menit lalu', game: 'Free Fire', id: 'FF-5011', price: 'Rp 2.100.000', admin: 'Admin Fajar' },
    { time: '24 menit lalu', game: 'PUBG Mobile', id: 'PUBG-8820', price: 'Rp 2.950.000', admin: 'Admin Dimas' },
  ];

  const TRUST_PILLARS = [
    {
      icon: ShieldCheck,
      title: 'Garansi Anti Hackback (HB)',
      desc: 'Perlindungan seumur hidup atau uang kembali 100% jika terjadi revert dari pemilik awal.'
    },
    {
      icon: Lock,
      title: 'Sistem Escrow / Rekber Resmi',
      desc: 'Dana Anda ditahan aman oleh pihak ketiga resmi. Dana baru cair ke seller setelah Anda amankan email.'
    },
    {
      icon: Headphones,
      title: 'Panduan Amankan Akun 24/7',
      desc: 'Admin siap memandu proses ganti email, unbind akun, pasang 2FA sampai benar-benar aman.'
    },
    {
      icon: RefreshCw,
      title: 'Proses Instan 3-5 Menit',
      desc: 'Setelah pembayaran terkonfirmasi, data login dan credential dikirimkan secara instan.'
    }
  ];

  const REVIEWS = [
    {
      name: 'Rian Saputra',
      game: 'Mobile Legends',
      rating: 5,
      date: 'Kemarin',
      comment: 'Mantap banget beli akun Mythical Immortal di sini, skin Chou Iori & Collector lengkap. Admin rekbernya sabar banget nuntun ganti email Moonton sampai kelar.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop'
    },
    {
      name: 'Bima Satria',
      game: 'Valorant',
      rating: 5,
      date: '2 hari lalu',
      comment: 'Akun Radiant AP top notch! Kurunami bundle sama Champions 2021 nya gacor abis. Dikasih email pertama lengkap tanpa minus sama sekali. Recommended seller!',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=120&auto=format&fit=crop'
    },
    {
      name: 'Clarissa Natalia',
      game: 'Genshin Impact',
      rating: 5,
      date: '3 hari lalu',
      comment: 'C6 Furina impian akhirnya kebeli dengan harga terjangkau. Akun beneran no deadlink, langsung ganti password Hoyoverse lancar jaya.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
      
      {/* LIVE TRANSACTION TICKER */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="font-gaming font-extrabold text-xs uppercase tracking-widest text-emerald-400">
              Live Feed Transaksi Sukses
            </span>
          </div>
          <span className="text-xs text-slate-400">Diperbarui secara real-time via Admin Rekber Resmi</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {LIVE_TRANSACTIONS.map((tx, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                <span>{tx.time}</span>
                <span className="text-emerald-400 font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-[10px]">
                  SUKSES
                </span>
              </div>
              <p className="font-gaming font-bold text-sm text-white truncate">{tx.game} (#{tx.id})</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-xs">
                <span className="text-cyan-300 font-extrabold">{tx.price}</span>
                <span className="text-[11px] text-slate-400">{tx.admin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE KHANZA.NET STORE / 4 TRUST PILLARS */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-gaming font-extrabold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>MEMBER OF PT. KHANZA DIGITAL NUSANTARA</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-1">
            Kenapa Beli Akun di Khanza.NET STORE?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
            Dikelola langsung di bawah badan hukum resmi <strong className="text-slate-200">PT. Khanza Digital Nusantara</strong> dengan standar verifikasi berlapis, sistem Rekber Escrow berizin, dan garansi Anti-Hackback seumur hidup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 transition-all hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-gaming font-bold text-lg text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 STEP TRANSACTION ESCROW STEPS */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/95 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-xl mx-auto mb-10">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Alur Transaksi Aman & Terlindungi
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            4 langkah simpel transaksi dengan pengawalan admin resmi
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Pilih Akun Impian', desc: 'Pilih akun yang sesuai budget dan spesifikasi favorit Anda dari katalog.' },
            { step: '02', title: 'Checkout & Transfer', desc: 'Lakukan pembayaran via QRIS, DANA, atau Bank ke rekening resmi Rekber.' },
            { step: '03', title: 'Amankan Data Login', desc: 'Admin menyerahkan email & sandi. Anda dipandu mengubah sandi & memasang 2FA.' },
            { step: '04', title: 'Verifikasi & Selesai', desc: 'Setelah Anda konfirmasi data 100% aman, dana baru diteruskan ke pihak seller.' }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 relative">
              <span className="font-display font-black text-4xl text-slate-800 absolute top-3 right-4 select-none">
                {item.step}
              </span>
              <p className="font-gaming font-extrabold text-base text-white mb-2">{item.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BUYER TESTIMONIALS */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-gaming font-extrabold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            TESTIMONI PEMBELI
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-3">
            Apa Kata Gamers Indonesia?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{review.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-800">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <p className="font-gaming font-bold text-sm text-white">{review.name}</p>
                  <p className="text-xs text-cyan-400 font-medium">{review.game}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
