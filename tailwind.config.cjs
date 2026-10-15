const { mtConfig } = require("@material-tailwind/react");

// The site is dark only, so the Material Tailwind base palette is the dark
// one. Amber is the single accent and matches the navigation pills.
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/dist/**/*.{js,cjs}",
  ],
  plugins: [
    mtConfig({
      colors: {
        background: "#221d26",
        foreground: "#9ca3af",
        surface: {
          default: "#3a3440",
          dark: "#2e2934",
          light: "#4a4351",
          foreground: "#f3f4f6",
        },
        primary: {
          default: "#fcd34d",
          dark: "#fbbf24",
          light: "#fde68a",
          foreground: "#1a161d",
        },
        secondary: {
          default: "#4a4351",
          dark: "#3a3440",
          light: "#5a5262",
          foreground: "#e5e7eb",
        },
      },
    }),
  ],
};
