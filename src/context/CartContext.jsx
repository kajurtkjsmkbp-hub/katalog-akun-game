import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ACCOUNTS } from '../data/mockAccounts';

const CartContext = createContext();

const INITIAL_ORDERS = [
  {
    id: 'INV-849102',
    date: '2026-10-15 12:45',
    buyerName: 'Rian Pratama',
    buyerWhatsapp: '081298765432',
    buyerEmail: 'rian.pratama@gmail.com',
    paymentMethod: 'QRIS (All E-Wallet / Bank)',
    items: [INITIAL_ACCOUNTS[0]],
    subtotal: 1850000,
    discount: 185000,
    fee: 0,
    total: 1665000,
    status: 'completed',
    notes: 'Serah terima data Moonton selesai. Pembeli sudah ganti email.'
  },
  {
    id: 'INV-732109',
    date: '2026-10-15 11:20',
    buyerName: 'Aldi Wijaya',
    buyerWhatsapp: '085712349876',
    buyerEmail: 'aldi.gaming@yahoo.com',
    paymentMethod: 'BCA Virtual Account',
    items: [INITIAL_ACCOUNTS[3]],
    subtotal: 3450000,
    discount: 0,
    fee: 2500,
    total: 3452500,
    status: 'processing',
    notes: 'Sedang proses verifikasi email pertama Riot Games.'
  },
  {
    id: 'INV-619284',
    date: '2026-10-15 09:15',
    buyerName: 'Siti Nurhaliza',
    buyerWhatsapp: '081345678901',
    buyerEmail: 'sitinur@gmail.com',
    paymentMethod: 'DANA Transfer',
    items: [INITIAL_ACCOUNTS[5]],
    subtotal: 2450000,
    discount: 50000,
    fee: 0,
    total: 2400000,
    status: 'completed',
    notes: 'Akun Hoyoverse aman, password dan email diganti pembeli.'
  }
];

const INITIAL_VOUCHERS = [
  { code: 'SULTAN2026', type: 'percent', value: 10, minPurchase: 500000, description: 'Diskon 10% Spesial Sultan' },
  { code: 'DISKON50K', type: 'fixed', value: 50000, minPurchase: 250000, description: 'Potongan Langsung Rp 50.000' },
  { code: 'KHANZANET', type: 'percent', value: 5, minPurchase: 100000, description: 'Diskon 5% Semua Game' },
];

import { getGameFallbackPoster } from '../utils/gameThumbnails';

export function CartProvider({ children }) {
  // Accounts state persisted in localStorage
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('khanza_game_accounts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Auto-migrate any broken Unsplash URLs to guaranteed offline game posters
          return parsed.map(acc => {
            const needsFix = !acc.thumbnail || acc.thumbnail.includes('unsplash.com');
            const poster = getGameFallbackPoster(acc.gameId, acc.title, acc.rank);
            return {
              ...acc,
              thumbnail: needsFix ? poster : acc.thumbnail,
              images: (!acc.images || acc.images.length === 0 || acc.images.every(img => img.includes('unsplash.com')))
                ? [poster]
                : acc.images
            };
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ACCOUNTS;
  });

  // Orders state persisted in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('khanza_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  // Vouchers state
  const [vouchers, setVouchers] = useState(() => {
    try {
      const saved = localStorage.getItem('khanza_vouchers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_VOUCHERS;
  });

  // Cart state persisted
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('khanza_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist persisted
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('khanza_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Store WhatsApp Admin Phone
  const [adminPhone, setAdminPhone] = useState(() => {
    return localStorage.getItem('khanza_admin_phone') || '6281234567890';
  });

  // Store Admin Password / PIN
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('khanza_admin_pin') || 'admin123';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('khanza_game_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('khanza_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('khanza_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('khanza_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('khanza_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('khanza_admin_phone', adminPhone);
  }, [adminPhone]);

  useEffect(() => {
    localStorage.setItem('khanza_admin_pin', adminPin);
  }, [adminPin]);

  // Cart actions
  const addToCart = (account) => {
    if (!cart.some(item => item.id === account.id)) {
      setCart(prev => [...prev, account]);
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlist.includes(id);

  // Accounts CRUD (Admin CMS & Seller)
  const addNewAccount = (newAccount) => {
    setAccounts(prev => [newAccount, ...prev]);
  };

  const editAccount = (id, updatedFields) => {
    setAccounts(prev => 
      prev.map(acc => acc.id === id ? { ...acc, ...updatedFields } : acc)
    );
  };

  const updateAccountStatus = (id, newStatus) => {
    setAccounts(prev => 
      prev.map(acc => acc.id === id ? { ...acc, status: newStatus } : acc)
    );
  };

  const deleteAccount = (id) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
    removeFromCart(id);
  };

  const resetToDefault = () => {
    setAccounts(INITIAL_ACCOUNTS);
    setOrders(INITIAL_ORDERS);
    setVouchers(INITIAL_VOUCHERS);
    setAdminPin('admin123');
    localStorage.removeItem('khanza_game_accounts');
    localStorage.removeItem('khanza_orders');
    localStorage.removeItem('khanza_vouchers');
    localStorage.removeItem('khanza_admin_pin');
  };

  // Orders Management
  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord)
    );
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId));
  };

  // Voucher Management
  const addVoucher = (newVoucher) => {
    setVouchers(prev => [...prev, newVoucher]);
  };

  const deleteVoucher = (code) => {
    setVouchers(prev => prev.filter(v => v.code !== code));
  };

  // Password / PIN Management
  const updateAdminPin = (newPin) => {
    setAdminPin(newPin);
    localStorage.setItem('khanza_admin_pin', newPin);
  };

  return (
    <CartContext.Provider
      value={{
        accounts,
        orders,
        vouchers,
        adminPhone,
        setAdminPhone,
        adminPin,
        updateAdminPin,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        addNewAccount,
        editAccount,
        updateAccountStatus,
        deleteAccount,
        resetToDefault,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addVoucher,
        deleteVoucher,
        totalCartPrice: cart.reduce((sum, item) => sum + (item.price || 0), 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
