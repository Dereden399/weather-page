/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        waterBackground: "url('assets/BackgroundWaterDrops.png')",
        sunnyBackground: "url('assets/sunnyBackground.png')",
      }),
      colors: {
        mainColor: {
          100: "rgb(var(--mainColor-100) / <alpha-value> )",
          200: "rgb(var(--mainColor-200) / <alpha-value> )",
          300: "rgb(var(--mainColor-300) / <alpha-value> )",
          400: "rgb(var(--mainColor-400) / <alpha-value> )",
          500: "rgb(var(--mainColor-500) / <alpha-value> )",
          600: "rgb(var(--mainColor-600) / <alpha-value> )",
          700: "rgb(var(--mainColor-700) / <alpha-value> )",
        },
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
