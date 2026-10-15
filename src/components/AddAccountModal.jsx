import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Image, Check, AlertCircle } from 'lucide-react';
import { GAMES } from '../data/games';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export function AddAccountModal({ onClose }) {
  const { addNewAccount } = useCart();
  const { playSuccess, playClick } = useTheme();

  const [gameId, setGameId] = useState('mlbb');
  const [title, setTitle] = useState('');
  const [rank, setRank] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [badge, setBadge] = useState('AKUN SULTAN');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [highlightItems, setHighlightItems] = useState('');
  const [description, setDescription] = useState('');
  const [heroCount, setHeroCount] = useState('110 Hero');
  const [skinCount, setSkinCount] = useState('250 Skin');
  const [bindStatus, setBindStatus] = useState('Monsep Aman No Minus');

  const selectedGame = GAMES.find(g => g.id === gameId) || GAMES[1];

  const handlePresetImage = (url) => {
    playClick();
    setThumbnailUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !rank) {
      alert('Mohon isi Judul, Rank, dan Harga akun.');
      return;
    }

    const newId = `${selectedGame.shortName.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAcc = {
      id: newId,
      gameId: gameId,
      title: title.trim(),
      rank: rank.trim(),
      price: parseInt(price, 10),
      originalPrice: originalPrice ? parseInt(originalPrice, 10) : null,
      badge: badge,
      status: 'available',
      thumbnail: thumbnailUrl || selectedGame.bannerBg,
      images: [
        thumbnailUrl || selectedGame.bannerBg,
        selectedGame.bannerBg
      ],
      highlightItems: highlightItems 
        ? highlightItems.split(',').map(s => s.trim()).filter(Boolean)
        : ['Skin Langka', 'Akun Rawatan'],
      specs: {
        'Total Hero / Karakter': heroCount || '100+',
        'Total Skin / Koleksi': skinCount || '200+',
        'Status Bind': bindStatus || 'All Unbind Aman',
        'Server': 'Indonesia / Asia'
      },
      guarantee: 'Garansi Anti HB 100% Rekber',
      seller: {
        name: 'Seller Resmi Khanza.NET',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
        rating: 5.0,
        salesCount: 1,
        verified: true
      },
      description: description || 'Akun pribadi siap pakai, aman terverifikasi rekber.'
    };

    addNewAccount(newAcc);
    playSuccess();
    alert(`Akun berhasil ditambahkan dengan ID #${newId}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-game-surface border border-game-border rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-game-border bg-game-dark/60">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-game-primary" />
            <h3 className="font-display font-bold text-lg text-game-text">
              Pasang / Tambah Akun Game Baru
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-game-muted hover:text-white hover:bg-game-surfaceHover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-5 scrollbar-thin">
          
          {/* GAME SELECTOR */}
          <div>
            <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1.5">
              Pilih Game
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {GAMES.filter(g => g.id !== 'all').map((g) => (
                <button
                  type="button"
                  key={g.id}
                  onClick={() => { setGameId(g.id); setRank(''); }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    gameId === g.id
                      ? 'bg-game-primary/20 border-game-primary shadow-glow-sm text-white font-bold'
                      : 'bg-game-dark/60 border-game-border/60 text-game-muted hover:text-game-text'
                  }`}
                >
                  <p className="text-xs font-gaming">{g.shortName}</p>
                </button>
              ))}
            </div>
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1">
              Judul Listing Akun *
            </label>
            <input
              type="text"
              placeholder="Contoh: MLBB SULTAN - 4 COLLECTOR + KOF CHOU + FULL EMBLEM"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3.5 py-2.5 border border-game-border focus:outline-none focus:border-game-primary"
              required
            />
          </div>

          {/* RANK & BADGE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1">
                Rank / Tier *
              </label>
              <input
                type="text"
                placeholder={selectedGame.ranks ? selectedGame.ranks[1] : 'Mythic Glory / Radiant'}
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3.5 py-2.5 border border-game-border focus:outline-none focus:border-game-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1">
                Badge / Label Khusus
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3 py-2.5 border border-game-border focus:outline-none focus:border-game-primary"
              >
                <option value="AKUN SULTAN">👑 AKUN SULTAN</option>
                <option value="FLASH SALE">⚡ FLASH SALE</option>
                <option value="BEST SELLER">🔥 BEST SELLER</option>
                <option value="BUDGET GANTENG">💎 BUDGET GANTENG</option>
              </select>
            </div>
          </div>

          {/* PRICE & ORIGINAL PRICE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1">
                Harga Jual (Rp) *
              </label>
              <input
                type="number"
                placeholder="Contoh: 750000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3.5 py-2.5 border border-game-border focus:outline-none focus:border-game-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1">
                Harga Coret (Opsional)
              </label>
              <input
                type="number"
                placeholder="Contoh: 1100000"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3.5 py-2.5 border border-game-border focus:outline-none focus:border-game-primary"
              />
            </div>
          </div>

          {/* IMAGE URL & PRESETS */}
          <div className="space-y-1.5">
            <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1">
              URL Foto / Screenshot Akun
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3.5 py-2.5 border border-game-border focus:outline-none focus:border-game-primary"
            />
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-game-muted">Gunakan Wallpaper Game Bawaan:</span>
              <button
                type="button"
                onClick={() => handlePresetImage(selectedGame.bannerBg)}
                className="text-[10px] text-game-primary hover:underline font-bold"
              >
                Pakai Cover {selectedGame.shortName}
              </button>
            </div>
          </div>

          {/* HIGHLIGHT ITEMS */}
          <div>
            <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1">
              Item Langka / Skin Utama (Pisahkan dengan tanda koma)
            </label>
            <input
              type="text"
              placeholder="Contoh: Skin Collector Chou, Aspirant Fanny, M4 Glacier Lv 4"
              value={highlightItems}
              onChange={(e) => setHighlightItems(e.target.value)}
              className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3.5 py-2.5 border border-game-border focus:outline-none focus:border-game-primary"
            />
          </div>

          {/* SPECS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-game-muted mb-1">Total Hero/Agent</label>
              <input
                type="text"
                value={heroCount}
                onChange={(e) => setHeroCount(e.target.value)}
                className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3 py-2 border border-game-border"
              />
            </div>
            <div>
              <label className="block text-[11px] text-game-muted mb-1">Total Skin</label>
              <input
                type="text"
                value={skinCount}
                onChange={(e) => setSkinCount(e.target.value)}
                className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3 py-2 border border-game-border"
              />
            </div>
            <div>
              <label className="block text-[11px] text-game-muted mb-1">Status Bind</label>
              <input
                type="text"
                value={bindStatus}
                onChange={(e) => setBindStatus(e.target.value)}
                className="w-full bg-game-dark text-game-text text-xs rounded-xl px-3 py-2 border border-game-border"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-gaming font-bold text-game-muted uppercase tracking-wider mb-1">
              Catatan / Riwayat Akun
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan kondisi akun, alasan jual, atau informasi garansi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-game-dark text-game-text text-xs rounded-xl p-3 border border-game-border focus:outline-none focus:border-game-primary resize-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-game-primary to-game-primaryHover text-white font-gaming font-bold text-sm tracking-wider shadow-glow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Terbitkan Akun ke Katalog</span>
          </button>

        </form>

      </div>
    </div>
  );
}
