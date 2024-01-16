/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#005cff",

          secondary: "#00a397",

          accent: "#009600",

          neutral: "#1b1b2b",

          "base-100": "#f6fdff",

          info: "#00bfff",

          success: "#5f8900",

          warning: "#ffbc00",

          error: "#f40047",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
