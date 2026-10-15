import React from 'react';
import { 
  Home, 
  Gamepad2, 
  Heart, 
  ShoppingCart, 
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export function MobileBottomNav({ 
  onOpenCart, 
  onOpenWishlist, 
  onOpenAdminCMS, 
  onExploreCatalog 
}) {
  const { playClick, selectGame } = useTheme();
  const { cart, wishlist } = useCart();

  const handleHome = () => {
    playClick();
    selectGame('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatalog = () => {
    playClick();
    if (onExploreCatalog) {
      onExploreCatalog();
    } else {
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-xl md:hidden px-2 py-1.5 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* BERANDA */}
        <button
          onClick={handleHome}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-white transition-colors active:scale-95 group"
        >
          <Home className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
          <span className="text-[10px] font-gaming font-semibold mt-0.5 tracking-wider">Home</span>
        </button>

        {/* KATALOG */}
        <button
          onClick={handleCatalog}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-white transition-colors active:scale-95 group"
        >
          <Gamepad2 className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
          <span className="text-[10px] font-gaming font-semibold mt-0.5 tracking-wider">Katalog</span>
        </button>

        {/* WISHLIST */}
        <button
          onClick={() => { playClick(); onOpenWishlist(); }}
          className="relative flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-white transition-colors active:scale-95 group"
        >
          <Heart className="w-5 h-5 group-hover:text-rose-400 transition-colors" />
          <span className="text-[10px] font-gaming font-semibold mt-0.5 tracking-wider">Wishlist</span>
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-slate-950">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* KERANJANG */}
        <button
          onClick={() => { playClick(); onOpenCart(); }}
          className="relative flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-white transition-colors active:scale-95 group"
        >
          <ShoppingCart className="w-5 h-5 group-hover:text-cyan-300 transition-colors" />
          <span className="text-[10px] font-gaming font-semibold mt-0.5 tracking-wider">Keranjang</span>
          {cart.length > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-slate-950">
              {cart.length}
            </span>
          )}
        </button>

        {/* CMS ADMIN */}
        <button
          onClick={() => { playClick(); onOpenAdminCMS(); }}
          className="flex flex-col items-center justify-center py-1 px-3 text-cyan-400 hover:text-cyan-300 transition-colors active:scale-95 group"
        >
          <div className="relative">
            <LayoutDashboard className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-slate-950 animate-pulse" />
          </div>
          <span className="text-[10px] font-gaming font-bold mt-0.5 tracking-wider text-cyan-300">Admin</span>
        </button>

      </div>
    </nav>
  );
}
