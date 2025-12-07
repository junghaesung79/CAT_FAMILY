/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5F0',
        sand: '#EFE8E1',
        beige: '#D9C8B4',
        coffee: '#3B3129',
        cocoa: '#6E5E52',
        forest: '#2F6F62',
        terracotta: '#C76E52',
      },
      boxShadow: {
        card: '0 12px 30px rgba(59, 49, 41, 0.08)',
        subtle: '0 4px 12px rgba(47, 111, 98, 0.18)',
      },
      borderRadius: {
        soft: '12px',
      },
      fontFamily: {
        display: ['"Pretendard Variable"', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        'content-lg': '1200px',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fade: 'fade 0.4s ease forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

