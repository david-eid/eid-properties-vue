export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        gold: "#C9A84C",
        "gold-light": "#E8C96A",
        dark: "#0A0A0A",
        "dark-2": "#141414",
        "dark-3": "#1e1e1e",
        "dark-4": "#2a2a2a",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        mont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
