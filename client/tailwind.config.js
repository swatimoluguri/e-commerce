/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      satisfy: "Satisfy",
    },
    extend: {
      colors: {
        "app-green": "#214A25",
        "app-yellow": "#FFBA35",
        "app-dark-green": "#123316",
        "app-dark-yellow": "#ebaa2c",
      },
      spacing: {
        112: "28rem",
        128: "32rem",
      },
      backgroundImage: {
        "grey-bg": "url('./src/assets/bg.jpg')",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in-out",
      },
      keyframes: {
        growShrink: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
        },
      },
      animation: {
        growShrink: "growShrink 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
