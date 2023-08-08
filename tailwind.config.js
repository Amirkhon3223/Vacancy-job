/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "/index.html",
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Светлая тема
        primary: '#0A0B0B',
        secondary: '#CCFF00',
        dark_text: '#ECECEC',
        // Другие цвета светлой темы...

        // Темная тема
        dark: {
          gray_white: '#ECECEC',
          white_text: '#FFFFFF',
          primary: '#ccff00',
          secondary: '#0a0b0b',
          // Другие цвета темной темы...
        }
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('flowbite/plugin')
    // Дополнительные плагины, если есть
  ],
}
