/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false // tắt class container mặc định
  },
  theme: {
    extend: {
      // ee4a00
      colors: {
        primaryColor: "rgba(31, 31, 31, 0.9)", // == #1f1f1f/90
        primaryGray: "#27323f",
        grayText: "#4d4d4d"
      }
    }
  },
  darkMode: "class",
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          // set up class container mới
          maxWidth: "80rem", // 1280px
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "16px",
          paddingRight: "16px"
        }
      })
    }),
    require("tailwindcss-animate"),
    require("@tailwindcss/line-clamp")
    // thêm lớp line-clamp quá số dòng thì ...
  ]
}
