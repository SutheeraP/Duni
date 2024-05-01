import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors:{
      ...colors,
      back: '#141A1C',
      btn: '#1D2A30',
      light: '#88DAB3',
      fade: '#8CA39F',
    },
    dropShadow: {
      'fade': '0 0 5px #88DAB320',
    }
  },
  plugins: [],
};
export default config;
