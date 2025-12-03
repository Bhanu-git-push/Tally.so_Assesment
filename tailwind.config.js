// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// } 
// export default {
//   darkMode: "class",  // <-- IMPORTANT!
//   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: "#f97316",        // orange-500
        secondary: "#4f46e5",      // indigo-600
        lightBg: "#f3f4f6",        // gray-100
        lightCard: "#ffffff",

        // Dark theme colors
        darkBg: "#111827",         // gray-900
        darkCard: "#1f2937",       // gray-800
        darkText: "#e5e7eb",       // gray-200
        darkPrimary: "#ea580c",    // darker orange
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "14px",
      },
    },
  },
  plugins: [],
};

