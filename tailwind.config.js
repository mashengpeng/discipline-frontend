module.exports = {
  content: [
    "**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "md": "900px",
        "xl": "1200px"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
