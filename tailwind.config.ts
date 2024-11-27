import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "color-mix(in srgb, hsl(var(--primary)) 5%, hsl(var(--background)))",
          100: "color-mix(in srgb, hsl(var(--primary)) 10%, hsl(var(--background)))",
          200: "color-mix(in srgb, hsl(var(--primary)) 20%, hsl(var(--background)))",
          300: "color-mix(in srgb, hsl(var(--primary)) 30%, hsl(var(--background)))",
          400: "color-mix(in srgb, hsl(var(--primary)) 40%, hsl(var(--background)))",
          500: "hsl(var(--primary))",
          600: "color-mix(in srgb, black 10%, hsl(var(--primary)))",
          700: "color-mix(in srgb, black 20%, hsl(var(--primary)))",
          800: "color-mix(in srgb, black 30%, hsl(var(--primary)))",
          900: "color-mix(in srgb, black 40%, hsl(var(--primary)))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "color-mix(in srgb, hsl(var(--secondary)) 5%, hsl(var(--background)))",
          100: "color-mix(in srgb, hsl(var(--secondary)) 10%, hsl(var(--background)))",
          200: "color-mix(in srgb, hsl(var(--secondary)) 20%, hsl(var(--background)))",
          300: "color-mix(in srgb, hsl(var(--secondary)) 30%, hsl(var(--background)))",
          400: "color-mix(in srgb, hsl(var(--secondary)) 40%, hsl(var(--background)))",
          500: "hsl(var(--secondary))",
          600: "color-mix(in srgb, black 10%, hsl(var(--secondary)))",
          700: "color-mix(in srgb, black 20%, hsl(var(--secondary)))",
          800: "color-mix(in srgb, black 30%, hsl(var(--secondary)))",
          900: "color-mix(in srgb, black 40%, hsl(var(--secondary)))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "color-mix(in srgb, hsl(var(--accent)) 5%, hsl(var(--background)))",
          100: "color-mix(in srgb, hsl(var(--accent)) 10%, hsl(var(--background)))",
          200: "color-mix(in srgb, hsl(var(--accent)) 20%, hsl(var(--background)))",
          300: "color-mix(in srgb, hsl(var(--accent)) 30%, hsl(var(--background)))",
          400: "color-mix(in srgb, hsl(var(--accent)) 40%, hsl(var(--background)))",
          500: "hsl(var(--accent))",
          600: "color-mix(in srgb, black 10%, hsl(var(--accent)))",
          700: "color-mix(in srgb, black 20%, hsl(var(--accent)))",
          800: "color-mix(in srgb, black 30%, hsl(var(--accent)))",
          900: "color-mix(in srgb, black 40%, hsl(var(--accent)))",
        },
        success: {
          DEFAULT: "hsl(142, 72%, 29%)",
          foreground: "hsl(var(--background))",
        },
        warning: {
          DEFAULT: "hsl(37, 95%, 45%)",
          foreground: "hsl(var(--background))",
        },
        error: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(var(--background))",
        },
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
}

export default config
