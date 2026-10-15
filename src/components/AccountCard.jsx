import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye, 
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { GAMES } from '../data/games';
import { getGameFallbackPoster } from '../utils/gameThumbnails';

export function AccountCard({ account, onOpenDetail, onFastBuy }) {
  const { playClick, playSuccess } = useTheme();
  const { isWishlisted, toggleWishlist, addToCart, cart } = useCart();
  const wishlisted = isWishlisted(account.id);
  const inCart = cart.some(item => item.id === account.id);

  const gameData = GAMES.find(g => g.id === account.gameId) || GAMES[0];

  // Guaranteed fallback poster
  const fallbackPoster = getGameFallbackPoster(account.gameId, account.title, account.rank);
  const [imgSrc, setImgSrc] = useState(() => {
    if (!account.thumbnail || account.thumbnail.includes('unsplash.com')) {
      return fallbackPoster;
    }
    return account.thumbnail;
  });

  // Format IDR Rupiah
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const discountPercent = account.originalPrice && account.originalPrice > account.price
    ? Math.round(((account.originalPrice - account.price) / account.originalPrice) * 100)
    : null;

  // Direct WhatsApp Quick Order
  const handleQuickWhatsApp = (e) => {
    e.stopPropagation();
    playSuccess();
    const phone = "6281234567890";
    const msg = `Halo Admin Khanza.NET STORE (PT. Khanza Digital Nusantara), saya berminat beli cepat akun ini:
• Game: ${gameData.name}
• ID Akun: #${account.id}
• Judul: ${account.title}
• Harga: ${formatRupiah(account.price)}
Apakah masih ready untuk transaksi rekber sekarang?`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="group relative flex flex-col rounded-3xl bg-slate-900/95 border border-slate-800 hover:border-indigo-500/70 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1.5 overflow-hidden">
      
      {/* THUMBNAIL & FLOATING BADGES */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
        <img
          src={imgSrc}
          alt=""
          onError={() => setImgSrc(fallbackPoster)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

        {/* TOP BADGES */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap z-10">
          {account.badge && (
            <span className={`px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-gaming font-extrabold tracking-wider uppercase shadow-md ${
              account.badge === 'AKUN SULTAN'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-black'
                : account.badge === 'FLASH SALE'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
            }`}>
              {account.badge}
            </span>
          )}

          {discountPercent && (
            <span className="px-1.5 py-0.5 rounded-md bg-rose-600 text-white text-[9px] sm:text-[10px] font-black tracking-wide shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* WISHLIST TOGGLE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            toggleWishlist(account.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-105'
              : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
          title={wishlisted ? "Hapus dari wishlist" : "Simpan ke wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* BOTTOM THUMBNAIL INFO BAR: RANK + ID */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-gaming font-bold text-amber-300 shadow-sm truncate max-w-[70%]">
            <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
            <span className="truncate">{account.rank}</span>
          </div>

          <span className="text-[10px] text-slate-300 font-mono bg-slate-950/90 px-2 py-0.5 rounded-lg border border-slate-800 shrink-0">
            #{account.id}
          </span>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* TITLE */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-gaming font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              {gameData.shortName}
            </span>
            {account.rankDetail && (
              <span className="text-[11px] text-slate-400 truncate">
                {account.rankDetail}
              </span>
            )}
          </div>

          <h3 
            onClick={() => onOpenDetail(account)}
            className="font-gaming font-bold text-sm sm:text-base text-white line-clamp-2 hover:text-indigo-400 cursor-pointer transition-colors leading-snug tracking-wide"
            title={account.title}
          >
            {account.title}
          </h3>

          {/* HIGHLIGHT ITEMS CHIPS */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {account.highlightItems?.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/60 text-slate-300 font-medium"
              >
                {item}
              </span>
            ))}
            {account.highlightItems?.length > 3 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                +{account.highlightItems.length - 3} lagi
              </span>
            )}
          </div>
        </div>

        {/* KEY SPECS SUMMARY ROW */}
        {account.specs && (
          <div className="flex items-center justify-between gap-1 text-[11px] py-1.5 px-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {Object.entries(account.specs).slice(0, 2).map(([key, value], idx) => (
              <div key={idx} className="flex items-center gap-1 truncate">
                <span className="text-[10px] text-slate-400 uppercase">{key}:</span>
                <span className="font-semibold text-slate-200 truncate">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* SELLER & GUARANTEE INFO */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="text-slate-400 text-[11px] truncate max-w-[110px]">
              {account.seller?.name || 'Verified Seller'}
            </span>
            <div className="flex items-center text-amber-400 text-[11px] font-bold shrink-0">
              <Star className="w-3 h-3 fill-current inline mr-0.5" />
              <span>{account.seller?.rating || '4.9'}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            <ShieldCheck className="w-3 h-3" />
            <span>Anti-HB</span>
          </div>
        </div>

        {/* PRICE & BUTTONS */}
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="min-w-0">
            {account.originalPrice && account.originalPrice > account.price && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through block font-mono">
                {formatRupiah(account.originalPrice)}
              </span>
            )}
            <span className="font-display font-extrabold text-base sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-400 truncate block">
              {formatRupiah(account.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick WhatsApp Button */}
            <button
              onClick={handleQuickWhatsApp}
              className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 transition-all"
              title="Tanya via WA"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                playClick();
                addToCart(account);
              }}
              className={`p-2 rounded-xl border transition-all ${
                inCart
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400'
                  : 'bg-slate-800/80 border-slate-700/80 hover:border-indigo-500/60 text-slate-300 hover:text-white'
              }`}
              title={inCart ? "Sudah di keranjang" : "Tambah ke Keranjang"}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            {/* Detail Button */}
            <button
              onClick={() => {
                playClick();
                onOpenDetail(account);
              }}
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-gaming font-bold text-xs tracking-wider shadow-md shadow-indigo-500/25 flex items-center gap-1 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detail</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
