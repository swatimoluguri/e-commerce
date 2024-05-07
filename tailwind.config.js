/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
            'app-green': '#214A25',
            'app-yellow': '#FFBA35',
            'app-dark-green': '#123316',
            'app-dark-yellow': '#ebaa2c',
          },
          spacing:{
            '112': '28rem',
            '128': '32rem',
          },
          backgroundImage: {
            'grey-bg': "url('./src/assets/bg.jpg')",
          },
          transitionDuration: {
            DEFAULT: "300ms",
          },
          transitionTimingFunction: {
            DEFAULT: "ease-in-out",
          },
      },
    },
    plugins: [],
  }