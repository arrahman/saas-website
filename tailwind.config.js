/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0E1116', 800: '#151920', 700: '#2B303A', 600: '#4A505C', 500: '#5A6170', 300: '#B8BDC7' },
        paper: { DEFAULT: '#F6F7F4', 200: '#F2F3EF', 300: '#EBECE7', 400: '#E2E4DE', 500: '#CFD2CA' },
        brand: { DEFAULT: '#2F5BFF', dark: '#1F3FD1', light: '#9DB1FF', tint: '#EAEFFF' },
        ok: { DEFAULT: '#1A7F4B', dark: '#155F39', tint: '#E3F4EA' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '1240px' },
    },
  },
  plugins: [],
};
