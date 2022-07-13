/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        waterBackground: "url('assets/BackgroundWaterDrops.png')",
      }),
      colors: {
        mainBlue: {
          100: "#b5d7ff",
          200: "#8Cafdc",
          300: "#6d93c1",
          400: "#6488b3",
          500: "#3d638c",
          600: "#1b486e",
          700: "#114066",
          800: "#0a2b45",
        },
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
