import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cart, removeFromCart, clearCart, totalCartPrice } = useCart();
  const { playClick } = useTheme();

  if (!isOpen) return null;

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
              <ShoppingCart className="w-5 h-5 text-game-primary" />
              <h3 className="font-display font-bold text-lg text-game-text">
                Keranjang Pesanan ({cart.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-game-muted hover:text-white hover:bg-game-surfaceHover"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ITEM LIST */}
          <div className="p-5 flex-1 overflow-y-auto space-y-3 scrollbar-thin">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-game-dark border border-game-border mx-auto flex items-center justify-center text-game-muted">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="font-gaming font-bold text-base text-game-text">Keranjang Masih Kosong</p>
                <p className="text-xs text-game-muted max-w-xs mx-auto">
                  Jelajahi katalog game pilihan Anda dan klik Tambah ke Keranjang untuk memesan akun.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-game-dark/60 border border-game-border flex items-center justify-between gap-3 group"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-gaming font-bold text-xs text-game-text truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-game-muted mt-0.5">
                      {item.rank} • <span className="font-mono">#{item.id}</span>
                    </p>
                    <p className="font-display font-bold text-sm text-game-primary mt-1">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => { playClick(); removeFromCart(item.id); }}
                    className="p-2 text-game-muted hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Hapus dari keranjang"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-game-border bg-game-dark/80 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-game-muted">Total Pembayaran:</span>
                <span className="font-display font-extrabold text-2xl text-game-primary">
                  {formatRupiah(totalCartPrice)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Terlindungi Rekber Escrow Khanza.NET 100% Aman</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => { playClick(); clearCart(); }}
                  className="py-3 px-3 rounded-xl border border-game-border text-game-muted hover:text-rose-400 text-xs font-gaming font-semibold transition-colors"
                >
                  Kosongkan
                </button>
                <button
                  onClick={() => {
                    playClick();
                    onClose();
                    onCheckout();
                  }}
                  className="col-span-2 py-3 px-4 rounded-xl bg-gradient-to-r from-game-primary to-game-primaryHover text-white font-gaming font-bold text-xs tracking-wider shadow-glow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Checkout Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
