/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f7fb",
          100: "#e8eef6",
          200: "#cbdbec",
          300: "#9ebddb",
          400: "#6a9ac6",
          500: "#477db0",
          600: "#356494",
          700: "#2c5078",
          800: "#284564",
          900: "#263b54",
          950: "#1c2b3f",
        },
        gray: {
          50: "#fdfcfa",
          100: "#faf6f0",
          200: "#edeae4",
          300: "#dbd8d1",
          400: "#c8c5c0",
          500: "#969490",
          600: "#7d7b78",
          700: "#646260",
          800: "#53504a",
          900: "#37322d",
        },
      },
      animation: {
        pulse: "pulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
