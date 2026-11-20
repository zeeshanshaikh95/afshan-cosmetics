/**
 * AFSHAN COSMETICS & JEWELLERY design system.
 *
 * A rose-gold counter in a quiet Mumbai boutique: warm cream paper, cocoa ink,
 * blush rose and champagne gold, an airy serif for headlines, generous space and
 * soft arches instead of hard boxes. Deliberately softer and more precious than
 * the loud menu-board storefront this stack was first built for.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#FBF5EF', // page — warm cream paper
        ivory: '#FFFDFA', // raised surfaces
        sand: '#F3E7DE', // fills, skeletons
        clay: '#E7D3C6',
        ink: '#2A1C18', // cocoa plum — text and dark sections
        'ink-soft': '#6E5A52',
        'ink-faint': '#A08D84',

        rose: {
          50: '#FEF6F4',
          100: '#FBEAE7',
          200: '#F5D3CE',
          300: '#E9B0AA',
          400: '#D98C86',
          500: '#C4655F',
          600: '#A54A47',
          700: '#7F3533',
          900: '#4A1E1D',
        },
        gold: {
          100: '#FBF3E2',
          200: '#F4E4C4',
          300: '#E9CE96',
          400: '#D9B56F',
          500: '#C2933B',
          700: '#8A6422',
        },

        // Legacy token names kept so every existing admin surface inherits the
        // new palette without a sweeping class rename.
        chilli: {
          50: '#FEF6F4',
          100: '#FBEAE7',
          200: '#F5D3CE',
          400: '#D98C86',
          500: '#C4655F',
          600: '#A54A47',
          700: '#7F3533',
          900: '#4A1E1D',
        },
        fry: {
          100: '#FBF3E2',
          200: '#F4E4C4',
          300: '#E9CE96',
          400: '#D9B56F',
          500: '#C2933B',
          700: '#8A6422',
        },
        herb: {
          100: '#E9EDE4',
          300: '#C6D0BD',
          500: '#8B9A82',
          700: '#5A6A52',
        },
        sage: {
          50: '#F4F6F1',
          100: '#E9EDE4',
          200: '#D8E0D0',
          400: '#AEBBA2',
          500: '#8B9A82',
          600: '#6E7E65',
          700: '#5A6A52',
          900: '#33402D',
        },
        taupe: {
          100: '#F7EFE9',
          300: '#E2CDBF',
          500: '#C0A08C',
          700: '#8A6E5C',
        },
        wine: {
          500: '#A54A47',
          600: '#7F3533',
          700: '#5E2725',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        body: ['Jost', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        micro: '0.26em',
        wide2: '0.16em',
        tight2: '-0.015em',
      },
      borderRadius: {
        none: '0',
        xs: '4px',
        sm: '8px',
        md: '14px',
        lg: '22px',
        xl: '32px',
        arch: '999px 999px 18px 18px',
        pill: '999px',
      },
      boxShadow: {
        lift: '0 22px 50px -34px rgba(70, 40, 30, 0.45)',
        panel: '0 30px 70px -40px rgba(70, 40, 30, 0.4)',
        sticker: '0 2px 0 0 rgba(42, 28, 24, 1)',
        glow: '0 0 0 1px rgba(194, 147, 59, 0.35), 0 16px 40px -28px rgba(194, 147, 59, 0.6)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        silk: 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.01)' },
          '100%': { transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'ken-burns': 'ken-burns 12s ease-out both',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
