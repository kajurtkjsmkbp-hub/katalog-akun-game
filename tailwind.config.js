/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        game: {
          dark: 'var(--theme-bg-dark)',
          surface: 'var(--theme-surface)',
          surfaceHover: 'var(--theme-surface-hover)',
          card: 'var(--theme-card)',
          border: 'var(--theme-border)',
          primary: 'var(--theme-primary)',
          primaryHover: 'var(--theme-primary-hover)',
          secondary: 'var(--theme-secondary)',
          accent: 'var(--theme-accent)',
          text: 'var(--theme-text)',
          muted: 'var(--theme-muted)',
          glow: 'var(--theme-glow)',
        }
      },
      fontFamily: {
        gaming: ['"Rajdhani"', 'sans-serif'],
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px var(--theme-glow)',
        'glow-md': '0 0 25px 0 var(--theme-glow)',
        'glow-lg': '0 0 40px 5px var(--theme-glow)',
        'neon-border': '0 0 0 1px var(--theme-primary), 0 0 15px var(--theme-glow)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-slow': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      }
    },
  },
  plugins: [],
};
