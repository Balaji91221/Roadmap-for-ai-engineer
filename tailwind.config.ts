import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090B',
        surface: '#101015',
        surface2: '#16171F',
        surface3: '#1F2029',
        border: 'rgba(255,255,255,0.06)',
        border2: 'rgba(255,255,255,0.12)',
        border3: 'rgba(255,255,255,0.18)',
        txt: '#F5F4F2',
        txt2: '#A1A1AA',
        txt3: '#71717A',
        accent: '#7C6AF7',
        accent2: '#A594FF',
        accent3: '#5B47E0',
        teal: '#2DD4BF',
        amber: '#F59E0B',
        coral: '#F97316',
        green: '#22C55E',
        pink: '#EC4899',
        sky: '#0EA5E9',
        rose: '#F43F5E',
      },
      spacing: {
        '13': '3.25rem',
        '55': '13.75rem',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
      },
      boxShadow: {
        soft: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 32px -16px rgba(0,0,0,0.4)',
        glow: '0 0 0 1px rgba(124,106,247,0.3), 0 8px 32px -8px rgba(124,106,247,0.4)',
      },
    },
  },
}

export default config
