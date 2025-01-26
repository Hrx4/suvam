/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'], // Lora Regular 400
        kanit: ['Kanit', 'sans-serif'], // Kanit Regular 400
        macondo: ['Macondo', 'cursive'], // Macondo Regular 400
        bona: ['Bona Nova SC', 'serif'], // Add the font-family

      },
      boxShadow: {
        customLight: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        customMedium:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      },
    },
  },
  plugins: [],
};
