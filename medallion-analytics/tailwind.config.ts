import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'purple-hard': '#7400B8',
        'purple-soft': '#6930C3',
        'purple-blue': '#5E60CE',
        'deep-blue': '#5390D9',
        'blue-blue': '#4EA8DE',
        'azure-deep': '#48BFE3',
        'azure-azure': '#56CFE1',
        'azure-green': '#64DFDF',
        'green-deep': '#72EFDD',
        'green-mint': '#80FFDB',
        background: '#FFFFFF',
        foreground: '#000000',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        nav: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, function({ addBase, theme }: PluginAPI) {
    addBase({
      'h1, h2, h3, nav': {
        fontFamily: theme('fontFamily.heading')
      }
    })
  }],
} satisfies Config

export default config as Config