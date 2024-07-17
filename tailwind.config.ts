import type { Config } from "tailwindcss";
import  flowbite  from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        'subtle': '0px 1px 2px rgba(0, 0, 0, 0.2)',
        'medium': '0px 2px 4px rgba(0, 0, 0, 0.3)',
        'strong': '0px 4px 8px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
