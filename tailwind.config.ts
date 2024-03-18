import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "mainTheme": '#222222',
        "cardTheme": '#333333',
        "inlineTheme": '#444444',
        "underLine": 'rgba(98, 164, 255, 1)',
      },
      boxShadow: {
        '3xl': '0 0 5px 0 rgba(255,255,255,0.5)',
      }
    },
  },
  plugins: [],
};
export default config;
