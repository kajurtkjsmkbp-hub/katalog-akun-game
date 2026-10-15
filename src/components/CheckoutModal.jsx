import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Building2, 
  Wallet, 
  ShoppingBag, 
  Tag, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MessageCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PAYMENT_METHODS } from '../data/games';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const ICON_MAP = {
  QrCode,
  Smartphone,
  Building2,
  Wallet,
  ShoppingBag
};

export function CheckoutModal({ items, onClose, singleItem = null }) {
  const { clearCart, addOrder, vouchers, adminPhone } = useCart();
  const { playClick, playSuccess } = useTheme();

  const checkoutItems = singleItem ? [singleItem] : items;
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
  const [buyerName, setBuyerName] = useState('');
  const [buyerWhatsapp, setBuyerWhatsapp] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  
  // Voucher Code State
  const [voucherInput, setVoucherInput] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(null);
  const [voucherError, setVoucherError] = useState('');

  // Order Success State
  const [isCompleted, setIsCompleted] = useState(false);
  const [invoiceCode, setInvoiceCode] = useState('');

  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const currentPayment = PAYMENT_METHODS.find(p => p.id === selectedPayment) || PAYMENT_METHODS[0];
  const fee = currentPayment.fee || 0;
  const grandTotal = Math.max(0, subtotal + fee - discountAmount);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleApplyVoucher = () => {
    playClick();
    setVoucherError('');
    const code = voucherInput.trim().toUpperCase();

    const matchedVoucher = vouchers.find(v => v.code.toUpperCase() === code);

    if (matchedVoucher) {
      if (matchedVoucher.minPurchase && subtotal < matchedVoucher.minPurchase) {
        setVoucherError(`Minimal belanja untuk kupon ini adalah ${formatRupiah(matchedVoucher.minPurchase)}`);
        return;
      }

      let discount = 0;
      if (matchedVoucher.type === 'percent') {
        discount = Math.round(subtotal * (matchedVoucher.value / 100));
      } else {
        discount = Math.min(subtotal, matchedVoucher.value);
      }

      setDiscountAmount(discount);
      setVoucherApplied({ code, text: `${matchedVoucher.description} (Hemat ${formatRupiah(discount)})` });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      setVoucherError('Kode voucher tidak ditemukan atau tidak valid.');
    }
  };

  const handleProcessOrder = () => {
    if (!buyerWhatsapp || buyerWhatsapp.trim().length < 9) {
      alert('Mohon isi Nomor WhatsApp aktif untuk konfirmasi pengiriman data akun.');
      return;
    }

    playSuccess();
    const inv = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    setInvoiceCode(inv);

    // Save order into Admin CMS Orders Database!
    const newOrder = {
      id: inv,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      buyerName: buyerName.trim() || 'Pembeli',
      buyerWhatsapp: buyerWhatsapp.trim(),
      buyerEmail: buyerEmail.trim() || '-',
      paymentMethod: currentPayment.name,
      items: checkoutItems,
      subtotal: subtotal,
      discount: discountAmount,
      fee: fee,
      total: grandTotal,
      status: 'pending',
      notes: 'Pesanan baru masuk dari website, menunggu verifikasi transfer.'
    };
    addOrder(newOrder);

    setIsCompleted(true);

    // Burst celebration confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    if (!singleItem) {
      clearCart();
    }
  };

  const sendWhatsAppConfirmation = () => {
    const phone = adminPhone || "6281234567890";
    const itemList = checkoutItems.map(i => `• ${i.title} (ID: #${i.id}) - ${formatRupiah(i.price)}`).join('\n');
    const msg = `Halo Admin Khanza.NET STORE (PT. Khanza Digital Nusantara), saya sudah melakukan pesanan:
------------------------------------------
🧾 No. Invoice: ${invoiceCode}
👤 Nama Pembeli: ${buyerName || 'Pembeli'}
📱 No. WhatsApp: ${buyerWhatsapp}
📧 Email Penerima: ${buyerEmail || '-'}
💳 Metode Bayar: ${currentPayment.name}
------------------------------------------
Daftar Akun:
${itemList}

Subtotal: ${formatRupiah(subtotal)}
Diskon Voucher: -${formatRupiah(discountAmount)}
Biaya Admin Rekber: ${formatRupiah(fee)}
TOTAL BAYAR: ${formatRupiah(grandTotal)}
------------------------------------------
Mohon diproses untuk pengamanan akun dan panduan serah terima data login. Terima kasih!`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl h-full sm:h-auto max-h-full sm:max-h-[92vh] bg-slate-900 border-0 sm:border border-slate-800 rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                {isCompleted ? 'Pesanan Berhasil Dibuat!' : 'Checkout Rekber Khanza.NET STORE'}
              </h3>
              <p className="text-[10px] text-cyan-300 font-medium">A Member of PT. Khanza Digital Nusantara</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ORDER COMPLETED VIEW */}
        {isCompleted ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/40">
                INVOICE: #{invoiceCode}
              </span>
              <h2 className="font-display font-black text-2xl text-white mt-3">
                Pesanan Anda Sedang Diproses Admin!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-2">
                Data pesanan Anda telah tersimpan di sistem CMS rekber Khanza.NET. Silakan klik tombol di bawah untuk verifikasi pembayaran dan menerima data login akun via WhatsApp resmi.
              </p>
            </div>

            {/* INVOICE CARD */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Metode Pembayaran:</span>
                <span className="font-semibold text-white">{currentPayment.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">WhatsApp Pembeli:</span>
                <span className="font-semibold text-white">{buyerWhatsapp}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-sm text-cyan-400 pt-1">
                <span>Total Transfer:</span>
                <span>{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            {/* ACTION */}
            <div className="space-y-3">
              <button
                onClick={sendWhatsAppConfirmation}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-gaming font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/40 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Konfirmasi Pembayaran ke WhatsApp Admin</span>
              </button>

              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Tutup Jendela & Kembali ke Katalog
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-5 sm:space-y-6 scrollbar-thin">
            
            {/* ITEM PREVIEW LIST */}
            <div className="space-y-2">
              <h4 className="text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider">
                Daftar Akun yang Dipesan ({checkoutItems.length})
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {checkoutItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={item.thumbnail}
                        alt="thumb"
                        className="w-12 h-9 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-semibold text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-slate-400">{item.rank} • #{item.id}</p>
                      </div>
                    </div>
                    <span className="font-bold text-cyan-400 whitespace-nowrap ml-3">
                      {formatRupiah(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BUYER INFORMATION */}
            <div className="space-y-3">
              <h4 className="text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider">
                Informasi Kontak Pembeli
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nama Lengkap / Panggilan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Alex Pratama"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Nomor WhatsApp Aktif <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    value={buyerWhatsapp}
                    onChange={(e) => setBuyerWhatsapp(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD SELECTOR */}
            <div className="space-y-3">
              <h4 className="text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Pilih Metode Pembayaran</span>
                <span className="text-[10px] text-emerald-400">Verifikasi Otomatis</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PAYMENT_METHODS.map((pm) => {
                  const Icon = ICON_MAP[pm.icon] || QrCode;
                  const isSelected = selectedPayment === pm.id;

                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => { playClick(); setSelectedPayment(pm.id); }}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-850 text-slate-400 font-medium">
                          {pm.tag}
                        </span>
                      </div>
                      <div>
                        <p className={`font-semibold text-xs leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {pm.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {pm.fee === 0 ? 'Bebas Admin' : `Biaya +${formatRupiah(pm.fee)}`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* VOUCHER / PROMO CODE */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Kupon / Kode Promo</span>
                </span>
                <span className="text-[10px] text-slate-400">Coba: <code className="text-cyan-400 font-bold">SULTAN2026</code> atau <code className="text-cyan-400 font-bold">DISKON50K</code></span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Masukkan kode promo..."
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  className="flex-1 bg-slate-950 text-white uppercase placeholder-slate-500 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleApplyVoucher}
                  className="px-4 py-2 rounded-xl bg-slate-800 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white text-cyan-300 text-xs font-gaming font-bold transition-colors"
                >
                  Terapkan
                </button>
              </div>
              {voucherApplied && (
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{voucherApplied.text}</span>
                </p>
              )}
              {voucherError && (
                <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{voucherError}</span>
                </p>
              )}
            </div>

            {/* PRICE SUMMARY */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({checkoutItems.length} Akun)</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Diskon Promo</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Biaya Layanan Rekber</span>
                <span>{fee === 0 ? 'Gratis (Rp 0)' : formatRupiah(fee)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-display font-bold text-sm text-white">Total Pembayaran:</span>
                <span className="font-display font-extrabold text-xl text-cyan-400">
                  {formatRupiah(grandTotal)}
                </span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleProcessOrder}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-gaming font-bold text-base tracking-wider shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Proses Pesanan Sekarang</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
