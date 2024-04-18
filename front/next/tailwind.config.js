/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'], // Configura la purga para eliminar el CSS no utilizado en producción
  darkMode: false, // Habilita el modo oscuro si es necesario
  theme: {
    extend: {
      colors: {
        // Personaliza los colores si es necesario
        primary: '#ff4500',
        secondary: '#008080',
      },
      fontFamily: {
        // Personaliza las fuentes si es necesario
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      // Personaliza las variantes si es necesario
    },
  },
  plugins: [
    // Agrega plugins de terceros si es necesario
  ],
};
