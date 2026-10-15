import React from 'react';
import { X, Heart, ShoppingCart, Trash2, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export function WishlistDrawer({ isOpen, onClose, onOpenDetail }) {
  const { wishlist, toggleWishlist, accounts, addToCart, cart } = useCart();
  const { playClick } = useTheme();

  if (!isOpen) return null;

  const wishlistedAccounts = accounts.filter(acc => wishlist.includes(acc.id));

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-game-surface border-l border-game-border shadow-2xl flex flex-col justify-between">
          
          {/* HEADER */}
          <div className="p-5 border-b border-game-border bg-game-dark/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h3 className="font-display font-bold text-lg text-game-text">
                Daftar Keinginan ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-game-muted hover:text-white hover:bg-game-surfaceHover"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* LIST */}
          <div className="p-5 flex-1 overflow-y-auto space-y-3 scrollbar-thin">
            {wishlistedAccounts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-game-dark border border-game-border mx-auto flex items-center justify-center text-rose-400/50">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="font-gaming font-bold text-base text-game-text">Wishlist Masih Kosong</p>
                <p className="text-xs text-game-muted max-w-xs mx-auto">
                  Klik ikon hati pada akun impian Anda untuk menyimpannya di sini.
                </p>
              </div>
            ) : (
              wishlistedAccounts.map((item) => {
                const inCart = cart.some(c => c.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-game-dark/60 border border-game-border flex items-center justify-between gap-3 group"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-12 rounded-xl object-cover flex-shrink-0 cursor-pointer"
                      onClick={() => { onClose(); onOpenDetail(item); }}
                    />
                    <div className="flex-1 min-w-0">
                      <p 
                        onClick={() => { onClose(); onOpenDetail(item); }}
                        className="font-gaming font-bold text-xs text-game-text truncate cursor-pointer hover:text-game-primary"
                      >
                        {item.title}
                      </p>
                      <p className="text-[11px] text-game-muted mt-0.5">
                        {item.rank} • <span className="font-mono">#{item.id}</span>
                      </p>
                      <p className="font-display font-bold text-sm text-game-primary mt-1">
                        {formatRupiah(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { playClick(); addToCart(item); }}
                        className={`p-2 rounded-lg transition-colors ${
                          inCart
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : 'text-game-muted hover:text-white hover:bg-game-surface'
                        }`}
                        title={inCart ? "Sudah di keranjang" : "Tambah ke Keranjang"}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => { playClick(); toggleWishlist(item.id); }}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Hapus dari wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-game-border bg-game-dark/80 text-center">
            <button
              onClick={onClose}
              className="text-xs text-game-muted hover:text-white font-medium"
            >
              Lanjut Berbelanja
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
