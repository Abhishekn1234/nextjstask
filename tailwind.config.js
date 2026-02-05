/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",      // App Router (if using /src/app)
    "./src/pages/**/*.{js,ts,jsx,tsx}",    // Pages Router (if using /src/pages)
    "./src/components/**/*.{js,ts,jsx,tsx}" // All components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
