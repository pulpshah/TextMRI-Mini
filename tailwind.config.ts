import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#131214",
        secondary:"#2F3133",
        republican:"#AC2C2C",
        democrat:"#2C4AAC",
        brand:"#CA60ED",
      },
    },
  },
  plugins: [],
};
export default config;
