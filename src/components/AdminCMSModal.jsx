import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Upload, 
  RotateCcw, 
  MessageCircle, 
  ExternalLink,
  ShieldAlert,
  KeyRound,
  Eye,
  EyeOff,
  DollarSign,
  TrendingUp,
  Boxes,
  Zap,
  Check,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { GAMES } from '../data/games';
import { EditAccountModal } from './EditAccountModal';

export function AdminCMSModal({ isOpen, onClose, onOpenAddNew }) {
  const { 
    accounts, 
    orders, 
    vouchers, 
    adminPhone, 
    setAdminPhone, 
    adminPin,
    updateAdminPin,
    updateAccountStatus, 
    deleteAccount, 
    resetToDefault,
    updateOrderStatus,
    deleteOrder,
    addVoucher,
    deleteVoucher
  } = useCart();
  const { playClick, playSuccess } = useTheme();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinError, setPinError] = useState('');

  // CMS Active Tab
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'accounts', 'orders', 'vouchers', 'security', 'settings'

  // Account Tab Filters
  const [accountSearch, setAccountSearch] = useState('');
  const [accountGameFilter, setAccountGameFilter] = useState('all');
  const [accountStatusFilter, setAccountStatusFilter] = useState('all');

  // Order Tab Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Edit Modal State
  const [editingAccount, setEditingAccount] = useState(null);

  // New Voucher Form
  const [newVoucherCode, setNewVoucherCode] = useState('');
  const [newVoucherType, setNewVoucherType] = useState('percent');
  const [newVoucherVal, setNewVoucherVal] = useState('');
  const [newVoucherDesc, setNewVoucherDesc] = useState('');

  // Settings Temp Admin WA
  const [tempPhone, setTempPhone] = useState(adminPhone);

  // Change Password Form State
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Forgot / Reset Password Modal on Login Screen
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  if (!isOpen) return null;

  // Format IDR
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const pin = pinInput.trim();
    if (pin === adminPin) {
      setIsAuthenticated(true);
      setPinError('');
      playSuccess();
    } else {
      setPinError('Password / PIN salah! Silakan coba lagi.');
    }
  };

  // Handle Change Password Form
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    // Check old pin
    if (oldPin !== adminPin) {
      setPasswordError('Password saat ini (lama) tidak sesuai!');
      return;
    }

    // Check new pin length
    if (newPin.trim().length < 4) {
      setPasswordError('Password baru minimal 4 karakter!');
      return;
    }

    // Check confirmation
    if (newPin !== confirmPin) {
      setPasswordError('Konfirmasi password baru tidak cocok!');
      return;
    }

    updateAdminPin(newPin.trim());
    playSuccess();
    setPasswordSuccess('Password Admin Khanza.NET berhasil diperbarui!');
    setOldPin('');
    setNewPin('');
    setConfirmPin('');
  };

  // Handle Emergency Reset PIN
  const handleEmergencyReset = (e) => {
    e.preventDefault();
    if (securityAnswer.trim().toLowerCase() === 'khanza' || securityAnswer.trim().toLowerCase() === 'admin') {
      updateAdminPin('admin123');
      playSuccess();
      setForgotMsg('Password berhasil direset ke default: admin123');
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotMsg('');
        setSecurityAnswer('');
        setPinInput('admin123');
      }, 2000);
    } else {
      setForgotMsg('Jawaban verifikasi salah! Hubungi developer atau ketik "khanza".');
    }
  };

  // Calculations for Dashboard KPIs
  const totalAccountsCount = accounts.length;
  const availableAccountsCount = accounts.filter(a => a.status === 'available').length;
  const soldAccountsCount = accounts.filter(a => a.status === 'sold').length;
  const bookedAccountsCount = accounts.filter(a => a.status === 'booked').length;
  
  const totalInventoryValue = accounts
    .filter(a => a.status === 'available')
    .reduce((sum, a) => sum + (a.price || 0), 0);

  const totalCompletedRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  // Filtered Accounts
  const filteredCmsAccounts = accounts.filter((acc) => {
    if (accountGameFilter !== 'all' && acc.gameId !== accountGameFilter) return false;
    if (accountStatusFilter !== 'all' && acc.status !== accountStatusFilter) return false;
    if (accountSearch.trim() !== '') {
      const q = accountSearch.toLowerCase();
      return acc.title.toLowerCase().includes(q) || acc.id.toLowerCase().includes(q) || acc.rank.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    if (orderStatusFilter !== 'all' && ord.status !== orderStatusFilter) return false;
    return true;
  });

  // Add Voucher Handler
  const handleAddVoucher = (e) => {
    e.preventDefault();
    if (!newVoucherCode || !newVoucherVal) return;

    addVoucher({
      code: newVoucherCode.trim().toUpperCase(),
      type: newVoucherType,
      value: parseInt(newVoucherVal, 10),
      description: newVoucherDesc.trim() || `Diskon ${newVoucherCode}`,
      minPurchase: 0
    });

    playSuccess();
    setNewVoucherCode('');
    setNewVoucherVal('');
    setNewVoucherDesc('');
  };

  // Export Data JSON
  const handleExportJSON = () => {
    playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(accounts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `khanza_accounts_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Save Admin Phone
  const handleSavePhone = (e) => {
    e.preventDefault();
    setAdminPhone(tempPhone.trim());
    playSuccess();
    alert('Nomor WhatsApp Admin Rekber Khanza.NET berhasil diperbarui!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-6xl h-full sm:h-[92vh] bg-slate-900 border-0 sm:border border-slate-800 rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* TOP BAR */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 truncate">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px] shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
              </div>
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-sm sm:text-lg text-white uppercase tracking-wider truncate">
                  KHANZA.NET <span className="text-cyan-400">STORE CMS</span>
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/40">
                  DASHBOARD PUSAT
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                <span className="text-indigo-300 font-semibold">PT. Khanza Digital Nusantara</span> • Panel Admin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 sm:bg-transparent hover:bg-slate-800 transition-colors shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AUTH CHECK */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-950/40">
            <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-center relative">
              
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mx-auto flex items-center justify-center">
                <KeyRound className="w-8 h-8" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[11px] text-indigo-300 font-bold mb-2 uppercase">
                  <span>A Member of PT. Khanza Digital Nusantara</span>
                </div>
                <h3 className="font-display font-black text-xl text-white">Login Admin Khanza.NET STORE</h3>
                <p className="text-xs text-slate-400 mt-1.5">
                  Masukkan PIN otorisasi internal untuk mengakses panel pengelolaan katalog & transaksi.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPinInput ? "text" : "password"}
                    placeholder="Masukkan PIN / Password Admin..."
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full bg-slate-950 text-white text-center text-sm tracking-widest rounded-2xl px-10 py-3.5 border border-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPinInput(!showPinInput)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                  >
                    {showPinInput ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {pinError && (
                    <p className="text-xs text-rose-400 mt-2 font-medium">{pinError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-gaming font-bold text-sm tracking-wider shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Buka Panel Admin
                </button>

                <div className="flex items-center justify-between pt-2 text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Akses Otorisasi Terenkripsi</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-indigo-400 hover:text-cyan-300 underline font-medium"
                  >
                    Lupa Password?
                  </button>
                </div>
              </form>

              {/* FORGOT PASSWORD MODAL */}
              {showForgotModal && (
                <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-center text-left z-20 animate-fadeIn">
                  <h4 className="font-display font-bold text-base text-white flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-cyan-400" />
                    <span>Reset Password ke Default</span>
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Ketik kata verifikasi <code className="text-cyan-300 font-bold">khanza</code> untuk mengembalikan password ke default (<code className="text-emerald-400 font-bold">admin123</code>).
                  </p>
                  <form onSubmit={handleEmergencyReset} className="space-y-3">
                    <input
                      type="text"
                      placeholder='Ketik "khanza" di sini...'
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      className="w-full bg-slate-950 text-white text-xs rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    {forgotMsg && (
                      <p className="text-xs text-emerald-400 font-medium">{forgotMsg}</p>
                    )}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-gaming"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* AUTHENTICATED CMS BODY */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/80 p-2 sm:p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible no-scrollbar shrink-0">
              
              <button
                onClick={() => { playClick(); setActiveTab('dashboard'); }}
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-gaming font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Ringkasan</span>
              </button>

              <button
                onClick={() => { playClick(); setActiveTab('accounts'); }}
                className={`flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-gaming font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'accounts'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 shrink-0" />
                  <span>Katalog Akun</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {accounts.length}
                </span>
              </button>

              <button
                onClick={() => { playClick(); setActiveTab('orders'); }}
                className={`flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-gaming font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'orders'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span>Pesanan</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => { playClick(); setActiveTab('vouchers'); }}
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-gaming font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'vouchers'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Tag className="w-4 h-4 shrink-0" />
                <span>Kupon ({vouchers.length})</span>
              </button>

              {/* GANTI PASSWORD TAB */}
              <button
                onClick={() => { playClick(); setActiveTab('security'); }}
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-gaming font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'security'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Ganti Password</span>
              </button>

              <button
                onClick={() => { playClick(); setActiveTab('settings'); }}
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-gaming font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'settings'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Pengaturan</span>
              </button>

              <div className="mt-auto pt-2 md:pt-4 border-t border-slate-800 text-center shrink-0">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full py-1.5 sm:py-2 px-3 text-[11px] sm:text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors font-medium whitespace-nowrap"
                >
                  Keluar Admin
                </button>
              </div>

            </div>

            {/* MAIN CMS CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 scrollbar-thin">
              
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  
                  {/* KPI STATS ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Aset Inventory Ready</p>
                        <h4 className="font-display font-black text-xl text-white mt-1">
                          {formatRupiah(totalInventoryValue)}
                        </h4>
                        <p className="text-[11px] text-cyan-400 mt-0.5">{availableAccountsCount} akun tersedia</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-cyan-400 flex items-center justify-center">
                        <DollarSign className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Omset Terjual Selesai</p>
                        <h4 className="font-display font-black text-xl text-emerald-400 mt-1">
                          {formatRupiah(totalCompletedRevenue)}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{soldAccountsCount} akun laku terjual</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Total Akun Terdaftar</p>
                        <h4 className="font-display font-black text-2xl text-white mt-1">
                          {totalAccountsCount}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">di 6 Game Universe</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                        <Boxes className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Total Order Masuk</p>
                        <h4 className="font-display font-black text-2xl text-amber-400 mt-1">
                          {orders.length}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">transaksi rekber aktif</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    </div>

                  </div>

                  {/* GAME BREAKDOWN CARD */}
                  <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
                    <h3 className="font-display font-bold text-lg text-white">
                      Distribusi Katalog Per Game
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {GAMES.filter(g => g.id !== 'all').map((g) => {
                        const count = accounts.filter(a => a.gameId === g.id).length;
                        return (
                          <div key={g.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                            <p className="font-gaming font-bold text-xs text-slate-400 uppercase">{g.shortName}</p>
                            <p className="font-display font-black text-xl text-white mt-1">{count}</p>
                            <p className="text-[10px] text-cyan-400">Akun</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* QUICK ACTIONS ROW */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => { playClick(); onOpenAddNew(); }}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-gaming font-bold text-xs tracking-wider shadow-lg shadow-indigo-600/30"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Akun Baru</span>
                    </button>

                    <button
                      onClick={() => { playClick(); setActiveTab('security'); }}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-gaming font-bold text-xs tracking-wider"
                    >
                      <Lock className="w-4 h-4 text-cyan-400" />
                      <span>Ganti Password Admin</span>
                    </button>

                    <button
                      onClick={handleExportJSON}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                    >
                      <Download className="w-4 h-4" />
                      <span>Backup Data Akun</span>
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 2: ACCOUNTS MANAGEMENT */}
              {activeTab === 'accounts' && (
                <div className="space-y-4">
                  
                  {/* SEARCH & FILTERS BAR */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Cari judul, ID akun, rank..."
                        value={accountSearch}
                        onChange={(e) => setAccountSearch(e.target.value)}
                        className="w-full bg-slate-900 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={accountGameFilter}
                        onChange={(e) => setAccountGameFilter(e.target.value)}
                        className="bg-slate-900 text-white text-xs rounded-xl px-3 py-2 border border-slate-800"
                      >
                        <option value="all">Semua Game</option>
                        {GAMES.filter(g => g.id !== 'all').map(g => (
                          <option key={g.id} value={g.id}>{g.shortName}</option>
                        ))}
                      </select>

                      <select
                        value={accountStatusFilter}
                        onChange={(e) => setAccountStatusFilter(e.target.value)}
                        className="bg-slate-900 text-white text-xs rounded-xl px-3 py-2 border border-slate-800"
                      >
                        <option value="all">Semua Status</option>
                        <option value="available">Tersedia</option>
                        <option value="sold">Terjual</option>
                        <option value="booked">Booked</option>
                      </select>

                      <button
                        onClick={() => { playClick(); onOpenAddNew(); }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-gaming font-bold shadow-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Akun</span>
                      </button>
                    </div>

                  </div>

                  {/* ACCOUNTS TABLE */}
                  <div className="rounded-2xl border border-slate-800 overflow-x-auto bg-slate-950/60">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-gaming uppercase tracking-wider text-[11px]">
                          <th className="p-3.5">Akun & Preview</th>
                          <th className="p-3.5">Game</th>
                          <th className="p-3.5">Rank</th>
                          <th className="p-3.5">Harga</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850">
                        {filteredCmsAccounts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                              Tidak ada akun yang sesuai kriteria pencarian.
                            </td>
                          </tr>
                        ) : (
                          filteredCmsAccounts.map((acc) => (
                            <tr key={acc.id} className="hover:bg-slate-900/60 transition-colors">
                              
                              {/* THUMB & TITLE */}
                              <td className="p-3.5">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={acc.thumbnail}
                                    alt="thumb"
                                    className="w-12 h-9 rounded-lg object-cover flex-shrink-0 border border-slate-800"
                                  />
                                  <div className="max-w-xs sm:max-w-sm truncate">
                                    <p className="font-semibold text-white truncate" title={acc.title}>{acc.title}</p>
                                    <p className="text-[10px] text-slate-400 font-mono">ID: #{acc.id}</p>
                                  </div>
                                </div>
                              </td>

                              {/* GAME */}
                              <td className="p-3.5 uppercase font-gaming font-bold text-indigo-400">
                                {acc.gameId}
                              </td>

                              {/* RANK */}
                              <td className="p-3.5 text-slate-300 font-medium">
                                {acc.rank}
                              </td>

                              {/* PRICE */}
                              <td className="p-3.5 font-bold text-cyan-300">
                                {formatRupiah(acc.price)}
                              </td>

                              {/* STATUS BADGE & TOGGLE */}
                              <td className="p-3.5">
                                <select
                                  value={acc.status || 'available'}
                                  onChange={(e) => updateAccountStatus(acc.id, e.target.value)}
                                  className={`text-[10px] font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                                    acc.status === 'available'
                                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                      : acc.status === 'sold'
                                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  }`}
                                >
                                  <option value="available" className="bg-slate-900 text-white">Tersedia</option>
                                  <option value="booked" className="bg-slate-900 text-white">Booked</option>
                                  <option value="sold" className="bg-slate-900 text-white">Terjual</option>
                                </select>
                              </td>

                              {/* ACTIONS */}
                              <td className="p-3.5 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => { playClick(); setEditingAccount(acc); }}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                                    title="Edit Akun"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (confirm(`Hapus akun #${acc.id}?`)) {
                                        deleteAccount(acc.id);
                                        playClick();
                                      }
                                    }}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                                    title="Hapus Akun"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>

                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 3: ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  
                  {/* ORDERS FILTER */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        Daftar Transaksi Rekber & Pesanan
                      </h3>
                      <p className="text-xs text-slate-400">Kelola konfirmasi pembayaran dan serah terima data login</p>
                    </div>

                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="bg-slate-950 text-white text-xs rounded-xl px-3 py-2 border border-slate-800"
                    >
                      <option value="all">Semua Status Pesanan</option>
                      <option value="pending">Menunggu Pembayaran</option>
                      <option value="processing">Sedang Diproses</option>
                      <option value="completed">Selesai (Success)</option>
                      <option value="cancelled">Dibatalkan</option>
                    </select>
                  </div>

                  {/* ORDERS LIST */}
                  <div className="space-y-3">
                    {filteredOrders.length === 0 ? (
                      <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 italic text-xs">
                        Belum ada pesanan yang sesuai filter.
                      </div>
                    ) : (
                      filteredOrders.map((ord) => {
                        const waMsg = `Halo Kak ${ord.buyerName}, saya Admin Rekber Khanza.NET mengonfirmasi pesanan #${ord.id}. Apakah Kakak sudah siap untuk serah terima kredensial akun?`;
                        const waUrl = `https://wa.me/${ord.buyerWhatsapp?.replace(/\D/g,'')}?text=${encodeURIComponent(waMsg)}`;

                        return (
                          <div
                            key={ord.id}
                            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
                          >
                            {/* ORDER HEADER */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono font-bold text-sm text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                                  #{ord.id}
                                </span>
                                <span className="text-xs text-slate-400">• {ord.date}</span>
                                <span className="text-xs text-slate-300 font-medium">Metode: {ord.paymentMethod}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <select
                                  value={ord.status}
                                  onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer ${
                                    ord.status === 'completed'
                                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                      : ord.status === 'processing'
                                      ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                                      : ord.status === 'cancelled'
                                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  }`}
                                >
                                  <option value="pending" className="bg-slate-900 text-white">Menunggu Pembayaran</option>
                                  <option value="processing" className="bg-slate-900 text-white">Sedang Diproses Admin</option>
                                  <option value="completed" className="bg-slate-900 text-white">Selesai (Akun Diserahkan)</option>
                                  <option value="cancelled" className="bg-slate-900 text-white">Dibatalkan</option>
                                </select>

                                <button
                                  onClick={() => {
                                    if (confirm(`Hapus data invoice #${ord.id}?`)) deleteOrder(ord.id);
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                  title="Hapus Pesanan"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* BUYER INFO & ITEMS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-1">
                                <p className="text-slate-400">Pembeli: <strong className="text-white">{ord.buyerName}</strong></p>
                                <p className="text-slate-400">WhatsApp: <strong className="text-cyan-300">{ord.buyerWhatsapp}</strong></p>
                                <p className="text-slate-400">Email: <span className="text-slate-300">{ord.buyerEmail}</span></p>
                              </div>

                              <div className="space-y-1">
                                <p className="text-slate-400">Total Transfer: <strong className="text-cyan-400 text-sm">{formatRupiah(ord.total)}</strong></p>
                                <p className="text-slate-400">Catatan: <span className="text-slate-300 italic">{ord.notes}</span></p>
                              </div>
                            </div>

                            {/* ORDER ITEMS LIST */}
                            <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap gap-2">
                                {ord.items?.map((item, idx) => (
                                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                                    🎮 {item.title} ({formatRupiah(item.price)})
                                  </span>
                                ))}
                              </div>

                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                                <span>Hubungi Pembeli via WA</span>
                              </a>
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              )}

              {/* TAB 4: VOUCHERS MANAGEMENT */}
              {activeTab === 'vouchers' && (
                <div className="space-y-6">
                  
                  {/* ADD VOUCHER FORM */}
                  <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
                    <h3 className="font-display font-bold text-base text-white">
                      Buat Kupon Promo Baru
                    </h3>
                    
                    <form onSubmit={handleAddVoucher} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Kode Kupon</label>
                        <input
                          type="text"
                          placeholder="Misal: PROMO2026"
                          value={newVoucherCode}
                          onChange={(e) => setNewVoucherCode(e.target.value)}
                          className="w-full bg-slate-900 text-white uppercase text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Tipe Diskon</label>
                        <select
                          value={newVoucherType}
                          onChange={(e) => setNewVoucherType(e.target.value)}
                          className="w-full bg-slate-900 text-white text-xs rounded-xl px-3 py-2 border border-slate-800"
                        >
                          <option value="percent">Persentase (%)</option>
                          <option value="fixed">Nominal Tetap (Rp)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Nilai Diskon</label>
                        <input
                          type="number"
                          placeholder={newVoucherType === 'percent' ? "Contoh: 10" : "Contoh: 50000"}
                          value={newVoucherVal}
                          onChange={(e) => setNewVoucherVal(e.target.value)}
                          className="w-full bg-slate-900 text-white text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-indigo-500"
                          required
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-gaming font-bold text-xs"
                        >
                          + Tambah Kupon
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* VOUCHERS LIST */}
                  <div className="space-y-3">
                    <h4 className="font-gaming font-bold text-sm text-slate-400 uppercase tracking-wider">
                      Daftar Kupon Aktif
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {vouchers.map((v) => (
                        <div
                          key={v.code}
                          className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-mono font-bold text-sm text-cyan-300">{v.code}</span>
                            <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                              {v.type === 'percent' ? `${v.value}% OFF` : formatRupiah(v.value)}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1">{v.description}</p>
                          </div>
                          <button
                            onClick={() => deleteVoucher(v.code)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg"
                            title="Hapus Kupon"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: GANTI PASSWORD / KEAMANAN */}
              {activeTab === 'security' && (
                <div className="space-y-6 max-w-xl">
                  
                  <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-white">
                          Ganti Password / PIN Admin
                        </h3>
                        <p className="text-xs text-slate-400">
                          Perbarui kata sandi otorisasi untuk mengamankan akses ke CMS Admin Khanza.NET
                        </p>
                      </div>
                    </div>

                    {passwordSuccess && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{passwordSuccess}</span>
                      </div>
                    )}

                    {passwordError && (
                      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span>{passwordError}</span>
                      </div>
                    )}

                    <form onSubmit={handleChangePassword} className="space-y-4 pt-1">
                      
                      {/* OLD PASSWORD */}
                      <div>
                        <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Password Saat Ini (Lama) *
                        </label>
                        <div className="relative">
                          <input
                            type={showOldPin ? "text" : "password"}
                            placeholder="Masukkan password saat ini..."
                            value={oldPin}
                            onChange={(e) => setOldPin(e.target.value)}
                            className="w-full bg-slate-900 text-white text-xs rounded-xl pl-3.5 pr-10 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPin(!showOldPin)}
                            className="absolute right-3 top-3 text-slate-400 hover:text-white"
                          >
                            {showOldPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* NEW PASSWORD */}
                      <div>
                        <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Password Baru *
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPin ? "text" : "password"}
                            placeholder="Minimal 4 karakter (angka/huruf)..."
                            value={newPin}
                            onChange={(e) => setNewPin(e.target.value)}
                            className="w-full bg-slate-900 text-white text-xs rounded-xl pl-3.5 pr-10 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPin(!showNewPin)}
                            className="absolute right-3 top-3 text-slate-400 hover:text-white"
                          >
                            {showNewPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* CONFIRM NEW PASSWORD */}
                      <div>
                        <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Ulangi Password Baru *
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPin ? "text" : "password"}
                            placeholder="Ketik ulang password baru..."
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value)}
                            className="w-full bg-slate-900 text-white text-xs rounded-xl pl-3.5 pr-10 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPin(!showConfirmPin)}
                            className="absolute right-3 top-3 text-slate-400 hover:text-white"
                          >
                            {showConfirmPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-gaming font-bold text-xs tracking-wider shadow-lg shadow-indigo-500/25 transition-all"
                        >
                          Simpan Password Baru
                        </button>
                      </div>

                    </form>

                  </div>

                </div>
              )}

              {/* TAB 6: SETTINGS & BACKUP */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-xl">
                  
                  {/* WHATSAPP ADMIN PHONE */}
                  <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <h3 className="font-display font-bold text-base text-white">
                      Nomor WhatsApp Admin Rekber Khanza.NET
                    </h3>
                    <p className="text-xs text-slate-400">
                      Semua tombol "Beli via WhatsApp" di website akan mengarah ke nomor ini secara otomatis.
                    </p>
                    <form onSubmit={handleSavePhone} className="flex gap-2">
                      <input
                        type="text"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        placeholder="Contoh: 6281234567890"
                        className="flex-1 bg-slate-900 text-white text-xs rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-gaming font-bold"
                      >
                        Simpan
                      </button>
                    </form>
                  </div>

                  {/* DATA BACKUP & RESET */}
                  <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
                    <h3 className="font-display font-bold text-base text-white">
                      Backup & Pemulihan Data
                    </h3>
                    
                    <div className="space-y-2">
                      <button
                        onClick={handleExportJSON}
                        className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left text-xs text-white"
                      >
                        <div>
                          <p className="font-semibold">Unduh Cadangan Database (JSON)</p>
                          <p className="text-[11px] text-slate-400">Simpan seluruh katalog akun Anda ke file JSON di komputer.</p>
                        </div>
                        <Download className="w-5 h-5 text-indigo-400" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Yakin ingin mereset seluruh database katalog akun ke data bawaan awal? Semua perubahan custom akan dikembalikan.')) {
                            resetToDefault();
                            playSuccess();
                            alert('Database dan PIN berhasil direset ke pengaturan awal (admin123)!');
                          }
                        }}
                        className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-left text-xs text-rose-300"
                      >
                        <div>
                          <p className="font-semibold">Reset ke Akun Bawaan (Factory Reset)</p>
                          <p className="text-[11px] text-rose-400/80">Mengembalikan katalog dan PIN ke bawaan (admin123).</p>
                        </div>
                        <RotateCcw className="w-5 h-5 text-rose-400" />
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* EDIT MODAL */}
      {editingAccount && (
        <EditAccountModal
          account={editingAccount}
          onClose={() => setEditingAccount(null)}
        />
      )}

    </div>
  );
}
