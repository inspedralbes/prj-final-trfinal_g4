// tailwind.config.js
module.exports = {
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#ff4500',
        secondary: '#008080',
      },
      fontFamily: {
        sans: ['Pixelify Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
