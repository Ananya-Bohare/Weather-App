/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: "#93c5fd", // Light Blue
        darkBg: "#1e3a8a", // Dark Blue (Cobalt)
      },
      height: {
        '596': '520px',
      },
    },
  },
  plugins: [],
}
