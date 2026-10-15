import React, { useState } from 'react';
import { X, Save, Sparkles, Check, Trash2 } from 'lucide-react';
import { GAMES } from '../data/games';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export function EditAccountModal({ account, onClose }) {
  const { editAccount, deleteAccount } = useCart();
  const { playSuccess, playClick } = useTheme();

  if (!account) return null;

  const [title, setTitle] = useState(account.title || '');
  const [rank, setRank] = useState(account.rank || '');
  const [rankDetail, setRankDetail] = useState(account.rankDetail || '');
  const [price, setPrice] = useState(account.price || '');
  const [originalPrice, setOriginalPrice] = useState(account.originalPrice || '');
  const [badge, setBadge] = useState(account.badge || 'AKUN SULTAN');
  const [status, setStatus] = useState(account.status || 'available');
  const [thumbnail, setThumbnail] = useState(account.thumbnail || '');
  const [highlightItems, setHighlightItems] = useState(account.highlightItems ? account.highlightItems.join(', ') : '');
  const [description, setDescription] = useState(account.description || '');

  // Specs
  const [heroCount, setHeroCount] = useState(account.specs?.['Total Hero'] || account.specs?.['Total Hero / Karakter'] || account.specs?.['Total Agent'] || account.specs?.['Karakter 5 Bintang'] || '100+');
  const [skinCount, setSkinCount] = useState(account.specs?.['Total Skin'] || account.specs?.['Total Skin / Koleksi'] || account.specs?.['Total Skin Premium'] || account.specs?.['Total Bundle'] || '200+');
  const [bindStatus, setBindStatus] = useState(account.specs?.['Status Bind'] || account.specs?.['Login'] || account.specs?.['Status Deadlink'] || 'All Unbind Bersih');

  const handleSave = (e) => {
    e.preventDefault();
    if (!title || !price || !rank) {
      alert('Mohon isi Judul, Rank, dan Harga akun.');
      return;
    }

    const updated = {
      title: title.trim(),
      rank: rank.trim(),
      rankDetail: rankDetail.trim(),
      price: parseInt(price, 10),
      originalPrice: originalPrice ? parseInt(originalPrice, 10) : null,
      badge,
      status,
      thumbnail: thumbnail.trim(),
      highlightItems: highlightItems 
        ? highlightItems.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      specs: {
        ...(account.specs || {}),
        'Total Hero / Karakter': heroCount,
        'Total Skin / Koleksi': skinCount,
        'Status Bind': bindStatus
      },
      description: description.trim()
    };

    editAccount(account.id, updated);
    playSuccess();
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`Yakin ingin menghapus akun #${account.id} (${account.title}) secara permanen?`)) {
      deleteAccount(account.id);
      playClick();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="font-display font-bold text-lg text-white">
              Edit Akun #{account.id}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSave} className="p-6 max-h-[80vh] overflow-y-auto space-y-4 scrollbar-thin">
          
          {/* TITLE */}
          <div>
            <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
              Judul Listing Akun *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* STATUS & BADGE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                Status Ketersediaan
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="available">🟢 Tersedia (Ready to Buy)</option>
                <option value="sold">🔴 Terjual (Sold Out)</option>
                <option value="booked">🟡 Ditahan / Booked (Dalam Proses)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                Badge / Label Khusus
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="AKUN SULTAN">👑 AKUN SULTAN</option>
                <option value="FLASH SALE">⚡ FLASH SALE</option>
                <option value="BEST SELLER">🔥 BEST SELLER</option>
                <option value="BUDGET GANTENG">💎 BUDGET GANTENG</option>
              </select>
            </div>
          </div>

          {/* RANK & DETAIL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                Rank / Tier Utama *
              </label>
              <input
                type="text"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                Detail Rank (Bintang / Poin)
              </label>
              <input
                type="text"
                placeholder="Contoh: 120 Bintang / Radiant #250"
                value={rankDetail}
                onChange={(e) => setRankDetail(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* PRICE & ORIGINAL PRICE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                Harga Jual (Rp) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
                Harga Coret Asli (Rp)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* THUMBNAIL URL */}
          <div>
            <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
              URL Foto Sampul / Screenshot
            </label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* HIGHLIGHT ITEMS */}
          <div>
            <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
              Item Langka / Skin Utama (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={highlightItems}
              onChange={(e) => setHighlightItems(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* SPECS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Total Hero/Agent</label>
              <input
                type="text"
                value={heroCount}
                onChange={(e) => setHeroCount(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3 py-2 border border-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Total Skin</label>
              <input
                type="text"
                value={skinCount}
                onChange={(e) => setSkinCount(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3 py-2 border border-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Status Bind</label>
              <input
                type="text"
                value={bindStatus}
                onChange={(e) => setBindStatus(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3 py-2 border border-slate-800"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-gaming font-bold text-slate-400 uppercase tracking-wider mb-1">
              Catatan / Riwayat Akun
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-gaming font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Akun</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-gaming font-semibold hover:bg-slate-700"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-gaming font-bold text-xs tracking-wider shadow-lg flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
