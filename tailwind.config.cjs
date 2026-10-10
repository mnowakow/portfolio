const { mtConfig } = require("@material-tailwind/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/dist/**/*.{js,cjs}",
  ],
  plugins: [mtConfig()],
};
