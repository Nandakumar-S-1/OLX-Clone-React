const { flowbite } = require("flowbite-react/tailwind");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",Flowbite.content],
//   theme: {
//     extend: {},
//   },
//   plugins: [Flowbite.plugins],
// };

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite/**/*.js",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require("flowbite/plugin"),
//   ],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",  // ✅ Important linec
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')  // ✅ Correct way to load plugin
  ],
}

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite/**/*.js",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('flowbite/plugin')
//   ],
// };
