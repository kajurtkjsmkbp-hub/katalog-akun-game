import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Heart, 
  ShoppingCart, 
  Share2, 
  MessageCircle, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Lock, 
  ChevronRight, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { GAMES } from '../data/games';
import { getGameFallbackPoster } from '../utils/gameThumbnails';

export function AccountDetailModal({ account, onClose, onCheckoutNow }) {
  const { playClick, playSuccess } = useTheme();
  const { isWishlisted, toggleWishlist, addToCart, cart } = useCart();
  
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!account) return null;

  const wishlisted = isWishlisted(account.id);
  const inCart = cart.some(item => item.id === account.id);
  const gameData = GAMES.find(g => g.id === account.gameId) || GAMES[0];

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const poster = getGameFallbackPoster(account.gameId, account.title, account.rank);
  const images = (account.images && account.images.length > 0)
    ? account.images.map(img => img.includes('unsplash.com') ? poster : img)
    : [account.thumbnail && !account.thumbnail.includes('unsplash.com') ? account.thumbnail : poster];

  // Generate WhatsApp Order URL
  const generateWhatsAppUrl = () => {
    const phoneNumber = "6281234567890"; // Admin rekber official
    const message = `Halo Admin Khanza.NET STORE, saya berminat membeli akun berikut:
------------------------------------------
🎮 Game: ${gameData.name}
🏷️ Kode Akun: #${account.id}
📌 Judul: ${account.title}
💰 Harga: ${formatRupiah(account.price)}
🛡️ Garansi: ${account.guarantee || 'Anti HB Seumur Hidup'}
------------------------------------------
Apakah akun masih available dan bisa langsung diproses via Rekber Resmi?`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleCopyLink = () => {
    playClick();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl h-full sm:h-auto max-h-full sm:max-h-[92vh] bg-game-surface border-0 sm:border border-game-border rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-game-border bg-game-dark/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-gaming font-bold bg-game-primary/20 text-game-primary border border-game-primary/30">
              {gameData.shortName}
            </span>
            <span className="text-xs text-game-muted font-mono">
              ID: #{account.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-game-surface hover:bg-game-surfaceHover text-game-muted hover:text-white border border-game-border transition-colors text-xs flex items-center gap-1.5"
              title="Salin Link Akun"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Tersalin' : 'Bagikan'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-game-surface hover:bg-rose-500/20 text-game-muted hover:text-rose-400 border border-game-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-5 sm:space-y-6 scrollbar-thin pb-6">
          
          {/* TOP SECTION: GALLERY + QUICK PURCHASE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* IMAGE PREVIEW GALLERY (COL 7) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-game-dark border border-game-border group">
                <img
                  src={images[selectedImageIdx]}
                  alt=""
                  onError={(e) => { e.target.src = poster; }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-game-dark/80 backdrop-blur-md border border-game-border text-xs font-gaming font-bold text-game-primary">
                  {account.rank}
                </div>
              </div>

              {/* THUMBNAIL SELECTORS */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => { playClick(); setSelectedImageIdx(idx); }}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIdx === idx
                          ? 'border-game-primary shadow-glow-sm scale-105'
                          : 'border-game-border/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* QUICK STATS & PRICING (COL 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-game-text leading-snug">
                  {account.title}
                </h2>

                <div className="flex items-center gap-2 mt-3">
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{account.guarantee || 'Garansi Anti HB 100%'}</span>
                  </span>
                </div>

                {/* PRICE BOX */}
                <div className="mt-5 p-4 rounded-2xl bg-game-dark/60 border border-game-border space-y-1">
                  <span className="text-xs text-game-muted font-medium">Harga Resmi Rekber:</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-game-text to-game-primary">
                      {formatRupiah(account.price)}
                    </span>
                    {account.originalPrice && account.originalPrice > account.price && (
                      <span className="text-sm text-game-muted line-through">
                        {formatRupiah(account.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playSuccess}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-gaming font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Beli via WhatsApp Admin Rekber</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      playClick();
                      onCheckoutNow(account);
                    }}
                    className="py-3 px-4 rounded-xl bg-game-primary hover:bg-game-primaryHover text-white font-gaming font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-glow-sm transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Checkout Digital</span>
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      addToCart(account);
                    }}
                    className={`py-3 px-4 rounded-xl border font-gaming font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      inCart
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-game-surface border-game-border hover:border-game-primary text-game-text'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{inCart ? 'Di Keranjang' : '+ Keranjang'}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    toggleWishlist(account.id);
                  }}
                  className="w-full py-2 text-xs text-game-muted hover:text-rose-400 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{wishlisted ? 'Tersimpan di Wishlist' : 'Simpan ke Wishlist'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* RARE ITEMS HIGHLIGHT */}
          {account.highlightItems && account.highlightItems.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-gaming font-bold text-sm text-game-text uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-game-primary" />
                <span>Koleksi Item & Skin Langka</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {account.highlightItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-game-dark/80 border border-game-border text-xs text-game-text font-medium flex items-center gap-2 shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-game-primary shadow-glow-sm" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FULL SPECIFICATION TABLE */}
          {account.specs && (
            <div className="space-y-2">
              <h4 className="font-gaming font-bold text-sm text-game-text uppercase tracking-wider">
                Spesifikasi & Status Akun
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(account.specs).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-game-dark/40 border border-game-border/60 flex items-center justify-between text-xs"
                  >
                    <span className="text-game-muted font-medium">{key}</span>
                    <span className="text-game-text font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          {account.description && (
            <div className="space-y-2">
              <h4 className="font-gaming font-bold text-sm text-game-text uppercase tracking-wider">
                Catatan Penjual
              </h4>
              <p className="text-xs sm:text-sm text-game-muted leading-relaxed p-4 rounded-2xl bg-game-dark/40 border border-game-border/60">
                {account.description}
              </p>
            </div>
          )}

          {/* TRUST / ESCROW REKBER EXPLANATION */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-emerald-300">Proteksi Rekber Escrow • PT. Khanza Digital Nusantara</p>
              <p className="text-emerald-400/80 leading-relaxed">
                Pembayaran Anda disimpan aman oleh Escrow resmi PT. Khanza Digital Nusantara. Dana baru akan diteruskan ke penjual setelah Anda berhasil login, mengamankan email, dan memverifikasi data akun. Jika data tidak sesuai deskripsi, jaminan uang kembali 100%.
              </p>
            </div>
          </div>

          {/* SELLER CARD */}
          {account.seller && (
            <div className="p-4 rounded-2xl bg-game-dark/60 border border-game-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={account.seller.avatar}
                  alt={account.seller.name}
                  className="w-12 h-12 rounded-full object-cover border border-game-border"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-gaming font-bold text-sm text-game-text">{account.seller.name}</span>
                    {account.seller.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" title="Penjual Terverifikasi" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-game-muted mt-0.5">
                    <span className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current inline mr-1" />
                      {account.seller.rating} / 5.0
                    </span>
                    <span>•</span>
                    <span>{account.seller.salesCount}+ Transaksi Sukses</span>
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-game-surface border border-game-border text-[11px] text-emerald-400 font-medium">
                Respon Cepat (&lt; 5 mnt)
              </span>
            </div>
          )}

        </div>

        {/* MOBILE STICKY BOTTOM ACTION BAR */}
        <div className="md:hidden sticky bottom-0 left-0 right-0 p-3 bg-slate-950/95 border-t border-slate-800 flex items-center gap-2 z-20 backdrop-blur-md shrink-0">
          <button
            onClick={() => {
              playClick();
              toggleWishlist(account.id);
            }}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            onClick={() => {
              playClick();
              addToCart(account);
            }}
            className={`p-3 rounded-xl border ${
              inCart
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
            title="Keranjang"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>

          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playSuccess}
            className="flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-gaming font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Beli WA</span>
          </a>

          <button
            onClick={() => {
              playClick();
              onCheckoutNow(account);
            }}
            className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 text-white font-gaming font-bold text-xs tracking-wider flex items-center justify-center gap-1 shadow-lg shadow-indigo-500/30"
          >
            <Sparkles className="w-4 h-4" />
            <span>Checkout</span>
          </button>
        </div>

      </div>
    </div>
  );
}
