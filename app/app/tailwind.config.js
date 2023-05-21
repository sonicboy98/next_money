/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        "slide-in-bottom": "slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-out-bottom": "slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both"
      },
      keyframes: {
          "slide-in-bottom": {
              "0%": {
                  transform: "translateY(1000px)",
                  opacity: "0"
              },
              to: {
                  transform: "translateY(0)",
                  opacity: "1"
              }
          },
          "slide-out-bottom": {
            "0%": {
                transform: "translateY(0)",
                opacity: "1"
            },
            to: {
                transform: "translateY(1000px)",
                opacity: "0"
            }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
