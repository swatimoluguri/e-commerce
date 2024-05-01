/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
            'app-green': '#214A25',
            'app-yellow': '#FFBA35',
          },
      },
    },
    plugins: [],
  }