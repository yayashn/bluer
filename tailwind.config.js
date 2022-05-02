module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        bright: {
          primary: "#abc4ff",
          secondary: "rgb(124,224,195)",
          accent: "rgb(228,121,179)",
          neutral: "rgb(74,153,233)",
          "base-100": "rgb(245,246,246)",
        },
      },
      'night'
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "night",
  },
}