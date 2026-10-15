// High-reliability offline SVG game banner generator
// Guarantees 100% render success even without internet or if external CDNs are blocked

export function getGameFallbackPoster(gameId, title = '', rank = '') {
  const g = (gameId || '').toLowerCase();

  let c1 = '#4f46e5';
  let c2 = '#06b6d4';
  let c3 = '#0f172a';
  let gameName = 'GAME ACCOUNT';
  let iconPath = '';
  let emblemColor = '#38bdf8';
  let subTag = rank || 'VERIFIED ACCOUNT';

  if (g.includes('mlbb') || g.includes('mobile')) {
    c1 = '#d97706'; // Mythic Gold
    c2 = '#2563eb'; // Royal Blue
    c3 = '#060a17';
    gameName = 'MOBILE LEGENDS';
    emblemColor = '#fbbf24';
    subTag = rank || 'MYTHICAL IMMORTAL';
    // Swords / Mythic Crest
    iconPath = `
      <path d="M70 110 L130 50 L140 60 L80 120 Z" fill="${emblemColor}" opacity="0.85"/>
      <path d="M130 110 L70 50 L60 60 L120 120 Z" fill="${emblemColor}" opacity="0.85"/>
      <circle cx="100" cy="80" r="18" fill="none" stroke="${emblemColor}" stroke-width="4"/>
      <polygon points="100,55 106,72 125,72 110,84 116,102 100,90 84,102 90,84 75,72 94,72" fill="#f59e0b"/>
    `;
  } else if (g.includes('val')) {
    c1 = '#dc2626'; // Tactical Red
    c2 = '#06b6d4'; // Cyan
    c3 = '#09090b';
    gameName = 'VALORANT';
    emblemColor = '#f87171';
    subTag = rank || 'RADIANT / IMMORTAL';
    // Valorant V logo & crosshair
    iconPath = `
      <polygon points="75,55 95,55 125,105 105,105" fill="#ff4655"/>
      <polygon points="105,55 125,55 115,75 95,75" fill="#ff4655"/>
      <circle cx="100" cy="80" r="28" fill="none" stroke="#22d3ee" stroke-width="2" stroke-dasharray="6,4"/>
      <line x1="100" y1="46" x2="100" y2="114" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.6"/>
      <line x1="66" y1="80" x2="134" y2="80" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.6"/>
    `;
  } else if (g.includes('gen')) {
    c1 = '#eab308'; // Primogem Gold
    c2 = '#6366f1'; // Celestial Indigo
    c3 = '#070a1a';
    gameName = 'GENSHIN IMPACT';
    emblemColor = '#facc15';
    subTag = rank || 'AR 60 SULTAN C6R5';
    // Primogem star shape
    iconPath = `
      <polygon points="100,45 110,73 138,80 110,87 100,115 90,87 62,80 90,73" fill="url(#primoglow)"/>
      <circle cx="100" cy="80" r="32" fill="none" stroke="#e0e7ff" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
      <circle cx="100" cy="80" r="6" fill="#ffffff"/>
    `;
  } else if (g.includes('ff') || g.includes('free')) {
    c1 = '#ea580c'; // Fire Orange
    c2 = '#dc2626'; // Deep Red
    c3 = '#0c0a09';
    gameName = 'FREE FIRE';
    emblemColor = '#fb923c';
    subTag = rank || 'SAKURA S1 & EVO GUN MAX';
    // Flame & Skull shield
    iconPath = `
      <path d="M100 45 C115 65 130 80 120 105 C110 118 90 118 80 105 C70 80 85 65 100 45 Z" fill="#f97316"/>
      <path d="M100 65 C108 78 115 88 110 100 C105 108 95 108 90 100 C85 88 92 78 100 65 Z" fill="#fde047"/>
    `;
  } else if (g.includes('pubg')) {
    c1 = '#f59e0b'; // Hazard Gold
    c2 = '#10b981'; // Military Green
    c3 = '#0a0d0d';
    gameName = 'PUBG MOBILE';
    emblemColor = '#fcd34d';
    subTag = rank || 'CONQUEROR & GLACIER MAX';
    // Helmet / Airdrop motif
    iconPath = `
      <rect x="75" y="60" width="50" height="40" rx="6" fill="#b91c1c" stroke="#f59e0b" stroke-width="3"/>
      <rect x="72" y="55" width="56" height="10" rx="3" fill="#1e3a8a"/>
      <line x1="100" y1="55" x2="100" y2="100" stroke="#fef08a" stroke-width="3"/>
    `;
  } else if (g.includes('hsr') || g.includes('honkai') || g.includes('star')) {
    c1 = '#8b5cf6'; // Astral Violet
    c2 = '#06b6d4'; // Cyan
    c3 = '#090614';
    gameName = 'HONKAI: STAR RAIL';
    emblemColor = '#c084fc';
    subTag = rank || 'ASTRAL EXPRESS SULTAN';
    // Star & Rail compass
    iconPath = `
      <circle cx="100" cy="80" r="30" fill="none" stroke="#a855f7" stroke-width="2.5"/>
      <polygon points="100,50 107,73 130,80 107,87 100,110 93,87 70,80 93,73" fill="#38bdf8"/>
      <circle cx="100" cy="80" r="5" fill="#f8fafc"/>
    `;
  }

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0.95" />
        <stop offset="50%" stop-color="${c2}" stop-opacity="0.4" />
        <stop offset="100%" stop-color="${c3}" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="primoglow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      </pattern>
    </defs>
    
    <!-- Deep Gradient Background -->
    <rect width="400" height="250" fill="url(#bgGrad)"/>
    <rect width="400" height="250" fill="url(#grid)"/>
    
    <!-- Cyber Geometric Light Accents -->
    <circle cx="340" cy="40" r="120" fill="${c1}" opacity="0.3" filter="blur(40px)"/>
    <circle cx="60" cy="210" r="90" fill="${c2}" opacity="0.25" filter="blur(30px)"/>
    
    <!-- High-Tech Frame Lines -->
    <path d="M 20,20 L 60,20 L 20,60 Z" fill="${emblemColor}" opacity="0.7"/>
    <path d="M 380,230 L 340,230 L 380,190 Z" fill="${emblemColor}" opacity="0.7"/>
    <line x1="30" y1="20" x2="370" y2="20" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <line x1="30" y1="230" x2="370" y2="230" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>

    <!-- Central Emblem Graphics -->
    <g transform="translate(100, 20)">
      ${iconPath}
    </g>

    <!-- Game Name Banner -->
    <rect x="50" y="150" width="300" height="26" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${emblemColor}" stroke-width="1" stroke-opacity="0.4"/>
    <text x="200" y="167" fill="#ffffff" font-family="Rajdhani, sans-serif" font-weight="800" font-size="14" letter-spacing="3" text-anchor="middle">
      ${gameName}
    </text>

    <!-- Rank / Specification Subtitle -->
    <text x="200" y="195" fill="${emblemColor}" font-family="Inter, sans-serif" font-weight="700" font-size="11" letter-spacing="1" text-anchor="middle">
      ${subTag.toUpperCase()}
    </text>

    <!-- Khanza Store Official Watermark Badge -->
    <rect x="120" y="210" width="160" height="18" rx="9" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(6, 182, 212, 0.4)" stroke-width="0.8"/>
    <text x="200" y="222" fill="#67e8f9" font-family="Inter, sans-serif" font-weight="600" font-size="8.5" letter-spacing="1.5" text-anchor="middle">
      KHANZA.NET STORE VERIFIED
    </text>
  </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}
