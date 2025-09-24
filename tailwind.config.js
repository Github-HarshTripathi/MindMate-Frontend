// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        'neon-purple': '#c084fc',
        'neon-pink': '#ec4899',
        'neon-red': '#ff0000',
        'neon-cyan': '#00f7ff',
      },
      animation: {
        'hue-rotate': 'hue-rotate 20s linear infinite',
      },
      keyframes: {
        'hue-rotate': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};