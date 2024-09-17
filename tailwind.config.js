/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "479px" },
      xs: { max: "319px" },
    },

    extend: {
      colors: {
        blue: "#6B85A8",
        black: "#2B2B2B",
        red: "#BC5766",
        grey: "#D9D9D9",
      },
      spacing: {
        6.5: "1.625rem",
        7.5: "1.875rem",
        15: "3.75rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};
