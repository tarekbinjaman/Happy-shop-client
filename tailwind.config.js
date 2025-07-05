module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        integral: ['"Integral CF"', 'sans-serif'], // Matches font-integral
      },
    },
  },
  // Safelist the font class to prevent purging
  safelist: [
    { pattern: /font-integral/ }, // Keeps all classes containing "font-integral"
  ],
  plugins: [],
};