import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye, 
  Sparkles,
  MessageCircle,
  Zap,
  Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { GAMES } from '../data/games';

export function AccountCard({ account, onOpenDetail, onFastBuy }) {
  const { playClick, playSuccess } = useTheme();
  const { isWishlisted, toggleWishlist, addToCart, cart } = useCart();
  const wishlisted = isWishlisted(account.id);
  const inCart = cart.some(item => item.id === account.id);

  const gameData = GAMES.find(g => g.id === account.gameId) || GAMES[0];

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
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <img
          src={account.thumbnail}
          alt={account.title}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap z-10">
          {account.badge && (
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-gaming font-extrabold tracking-wider uppercase shadow-lg ${
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
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black tracking-wide shadow-md">
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
          className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110'
              : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900/90'
          }`}
          title={wishlisted ? "Hapus dari wishlist" : "Simpan ke wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* RANK BADGE DISPLAY */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-xs font-gaming font-bold text-amber-400 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-white">{account.rank}</span>
            {account.rankDetail && (
              <span className="text-[10px] text-slate-400 font-normal">
                • {account.rankDetail}
              </span>
            )}
          </div>

          <span className="text-[10px] text-slate-300 font-mono bg-slate-950/90 px-2 py-1 rounded-lg border border-slate-800">
            #{account.id}
          </span>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* TITLE */}
        <div>
          <h3 
            onClick={() => onOpenDetail(account)}
            className="font-gaming font-bold text-base sm:text-lg text-white line-clamp-2 hover:text-indigo-400 cursor-pointer transition-colors leading-snug tracking-wide"
            title={account.title}
          >
            {account.title}
          </h3>

          {/* HIGHLIGHT ITEMS CHIPS */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {account.highlightItems?.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/60 text-slate-300 font-medium"
              >
                {item}
              </span>
            ))}
            {account.highlightItems?.length > 3 && (
              <span className="text-[10px] px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                +{account.highlightItems.length - 3} lagi
              </span>
            )}
          </div>
        </div>

        {/* KEY SPECS GRID */}
        {account.specs && (
          <div className="grid grid-cols-2 gap-2 text-xs py-2.5 px-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            {Object.entries(account.specs).slice(0, 2).map(([key, value], idx) => (
              <div key={idx} className="truncate">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">{key}</span>
                <span className="font-semibold text-slate-200 truncate block mt-0.5">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* SELLER & GUARANTEE INFO */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 text-xs truncate max-w-[120px]">
              {account.seller?.name || 'Verified Seller'}
            </span>
            <div className="flex items-center text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current inline mr-0.5" />
              <span>{account.seller?.rating || '4.9'}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-HB</span>
          </div>
        </div>

        {/* PRICE & BUTTONS */}
        <div className="pt-3 border-t border-slate-800/80 flex items-end justify-between gap-3">
          <div>
            {account.originalPrice && account.originalPrice > account.price && (
              <span className="text-xs text-slate-400 line-through block font-mono">
                {formatRupiah(account.originalPrice)}
              </span>
            )}
            <span className="font-display font-extrabold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-400">
              {formatRupiah(account.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick WhatsApp Button */}
            <button
              onClick={handleQuickWhatsApp}
              className="p-2.5 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 transition-all"
              title="Tanya & Beli Cepat via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                playClick();
                addToCart(account);
              }}
              className={`p-2.5 rounded-2xl border transition-all ${
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
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-gaming font-bold text-xs tracking-wider shadow-lg shadow-indigo-500/25 flex items-center gap-1.5 transition-all transform hover:scale-105"
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
