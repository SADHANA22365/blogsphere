/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPink: "#ec4899",
        brandPurple: "#9333ea",
        brandCyan: "#22d3ee",
      },
    },
  },
  plugins: [],
};
