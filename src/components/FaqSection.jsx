import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const FAQS = [
    {
      q: 'Apa itu istilah Monsep (Moonton Sepaket) dan All Unbind?',
      a: 'Monsep (Moonton Sepaket) berarti akun Mobile Legends diberikan bersamaan dengan email aslinya (Gmail/Outlook) sehingga Anda mendapatkan kontrol penuh 100%. "All Unbind" berarti akun tidak terhubung ke pihak ketiga seperti Facebook, TikTok, atau VK milik orang lain sehingga sangat aman.'
    },
    {
      q: 'Bagaimana prosedur klaim jika terjadi Hackback (HB)?',
      a: 'Semua akun di katalog kami dilindungi garansi resmi. Jika dalam masa garansi terjadi revert atau penarikan oleh pemilik asal yang terbukti sah, kami memberikan garansi penggantian unit akun setara atau uang kembali (refund) 100% tanpa potongan.'
    },
    {
      q: 'Berapa lama proses serah terima akun setelah pembayaran?',
      a: 'Proses serah terima berlangsung sangat cepat (rata-rata 3 hingga 5 menit). Setelah bukti transfer terverifikasi oleh Admin Rekber, Anda akan langsung dihubungi untuk menerima kredensial akun dan dipandu mengganti kata sandi serta mengaktifkan verifikasi 2 langkah (2FA).'
    },
    {
      q: 'Metode pembayaran apa saja yang didukung?',
      a: 'Kami menerima pembayaran melalui QRIS (bisa scan pakai BCA, Livin Mandiri, BRImo, DANA, GoPay, OVO, ShopeePay), Transfer Bank Langsung, dan E-Wallet tanpa ribet.'
    },
    {
      q: 'Apakah saya bisa menjual akun game saya sendiri di sini?',
      a: 'Bisa! Anda dapat mengklik tombol "Jual Akun" di bagian atas untuk mendaftarkan akun Anda ke katalog kami. Setelah diverifikasi oleh admin, akun Anda akan langsung tampil dan dipromosikan ke ribuan calon pembeli.'
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <span className="text-xs font-gaming font-extrabold text-indigo-400 uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 inline-flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>PUSAT BANTUAN & INFORMASI</span>
        </span>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-3">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
      </div>

      <div className="space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen 
                  ? 'bg-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10' 
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-gaming font-bold text-base sm:text-lg text-white hover:text-cyan-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
