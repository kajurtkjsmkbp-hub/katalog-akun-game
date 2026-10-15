import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import { useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { GameSelector } from './components/GameSelector';
import { FilterBar } from './components/FilterBar';
import { AccountCard } from './components/AccountCard';
import { AccountDetailModal } from './components/AccountDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AddAccountModal } from './components/AddAccountModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { TrustSection } from './components/TrustSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { 
  Gamepad2, 
  RotateCcw, 
  SearchX, 
  PlusCircle, 
  Sparkles,
  Flame,
  ArrowUp,
  LayoutDashboard
} from 'lucide-react';

export function App() {
  const { activeGameId, currentGame, playClick } = useTheme();
  const { accounts, resetToDefault } = useCart();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState('all');
  const [pricePreset, setPricePreset] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [badgeFilter, setBadgeFilter] = useState('all');

  // Modals & Drawers
  const [detailAccount, setDetailAccount] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // Check if any filter is active
  const hasActiveFilters = searchTerm !== '' || selectedRank !== 'all' || pricePreset !== 'all' || sortBy !== 'newest' || badgeFilter !== 'all';

  const resetFilters = () => {
    playClick();
    setSearchTerm('');
    setSelectedRank('all');
    setPricePreset('all');
    setSortBy('newest');
    setBadgeFilter('all');
  };

  // Filtered and Sorted accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      // 1. Game filter
      if (activeGameId !== 'all' && acc.gameId !== activeGameId) {
        return false;
      }

      // 2. Search filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchTitle = acc.title.toLowerCase().includes(query);
        const matchRank = acc.rank.toLowerCase().includes(query);
        const matchId = acc.id.toLowerCase().includes(query);
        const matchItems = acc.highlightItems?.some(item => item.toLowerCase().includes(query));
        if (!matchTitle && !matchRank && !matchId && !matchItems) {
          return false;
        }
      }

      // 3. Rank filter
      if (selectedRank !== 'all') {
        if (!acc.rank.toLowerCase().includes(selectedRank.toLowerCase())) {
          return false;
        }
      }

      // 4. Price range filter
      if (pricePreset !== 'all') {
        const p = acc.price || 0;
        if (pricePreset === 'under500' && p >= 500000) return false;
        if (pricePreset === '500to1500' && (p < 500000 || p > 1500000)) return false;
        if (pricePreset === '1500to3000' && (p < 1500000 || p > 3000000)) return false;
        if (pricePreset === 'above3000' && p <= 3000000) return false;
      }

      // 5. Badge filter
      if (badgeFilter !== 'all' && acc.badge !== badgeFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return (b.seller?.rating || 0) - (a.seller?.rating || 0);
      return 0; // default newest / original order
    });
  }, [accounts, activeGameId, searchTerm, selectedRank, pricePreset, sortBy, badgeFilter]);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col transition-colors duration-700 relative cyber-grid-bg">
      
      {/* NAVBAR */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdminCMS={() => setIsAdminCMSOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="flex-1 pb-16 md:pb-0">
        
        {/* HERO BANNER - DYNAMICALLY THEMED */}
        <HeroBanner onExploreClick={() => {}} />

        {/* GAME UNIVERSE SELECTOR TABS */}
        <GameSelector />

        {/* FILTER & SORT BAR */}
        <FilterBar
          selectedRank={selectedRank}
          setSelectedRank={setSelectedRank}
          pricePreset={pricePreset}
          setPricePreset={setPricePreset}
          sortBy={sortBy}
          setSortBy={setSortBy}
          badgeFilter={badgeFilter}
          setBadgeFilter={setBadgeFilter}
          totalResults={filteredAccounts.length}
          resetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* ACCOUNT CATALOG GRID */}
        <div id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          
          {filteredAccounts.length === 0 ? (
            /* EMPTY STATE */
            <div className="text-center py-20 px-4 rounded-3xl bg-slate-900/80 border border-slate-800 my-8 space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <SearchX className="w-10 h-10" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Tidak Menemukan Akun yang Sesuai
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Coba sesuaikan kata kunci pencarian, ubah filter harga atau rank, atau reset semua filter untuk melihat seluruh katalog.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-gaming font-bold text-xs tracking-wider shadow-md"
                >
                  Reset Semua Filter
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-500 text-white font-gaming font-bold text-xs tracking-wider"
                >
                  Jual Akun Sendiri
                </button>
              </div>
            </div>
          ) : (
            /* ACCOUNT CARDS GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onOpenDetail={(acc) => setDetailAccount(acc)}
                  onFastBuy={(acc) => setCheckoutData({ singleItem: acc })}
                />
              ))}
            </div>
          )}

        </div>

        {/* TRUST & REKBER SECTION */}
        <TrustSection />

        {/* FAQ ACCORDION */}
        <FaqSection />

      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS */}
      {detailAccount && (
        <AccountDetailModal
          account={detailAccount}
          onClose={() => setDetailAccount(null)}
          onCheckoutNow={(acc) => {
            setDetailAccount(null);
            setCheckoutData({ singleItem: acc });
          }}
        />
      )}

      {checkoutData && (
        <CheckoutModal
          items={[]}
          singleItem={checkoutData.singleItem}
          onClose={() => setCheckoutData(null)}
        />
      )}

      {isAddModalOpen && (
        <AddAccountModal
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {isAdminCMSOpen && (
        <AdminCMSModal
          isOpen={isAdminCMSOpen}
          onClose={() => setIsAdminCMSOpen(false)}
          onOpenAddNew={() => {
            setIsAdminCMSOpen(false);
            setIsAddModalOpen(true);
          }}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setCheckoutData({ items: [] });
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onOpenDetail={(acc) => setDetailAccount(acc)}
      />

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-24 md:bottom-6 right-3 sm:right-6 z-30 flex flex-col items-center gap-2">
        
        {/* Quick Admin CMS Floating Trigger (Desktop Only, since Mobile has it in bottom nav) */}
        <button
          onClick={() => { playClick(); setIsAdminCMSOpen(true); }}
          className="hidden md:flex p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400/50 backdrop-blur-md transition-all duration-300 transform hover:scale-110"
          title="Buka CMS Admin Panel"
        >
          <LayoutDashboard className="w-5 h-5" />
        </button>

        {/* Scroll To Top - only visible when scrolled down */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2 sm:p-2.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:border-indigo-500 shadow-xl backdrop-blur-md transition-all duration-300 animate-fadeIn"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <MobileBottomNav
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdminCMS={() => setIsAdminCMSOpen(true)}
        onExploreCatalog={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    </div>
  );
}
