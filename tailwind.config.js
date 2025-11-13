/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          primary: '#CDAF7A',
          light: '#d9c4aa',
          dark: '#b89463',
        },
      },
      fontFamily: {
        display: ['Bodoni Moda', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        num: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
};




