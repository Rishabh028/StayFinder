/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
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
        border: "var(--color-border)", /* slate-200 */
        input: "var(--color-input)", /* slate-50 */
        ring: "var(--color-ring)", /* blue-600 */
        background: "var(--color-background)", /* white */
        foreground: "var(--color-foreground)", /* slate-800 */
        primary: {
          DEFAULT: "var(--color-primary)", /* blue-600 */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* slate-900 */
          foreground: "var(--color-secondary-foreground)", /* slate-50 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-500 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* slate-50 */
          foreground: "var(--color-muted-foreground)", /* slate-500 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* amber-500 */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* slate-800 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* slate-800 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* emerald-500 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-500 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-500 */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: "var(--color-surface)", /* slate-50 */
        "text-primary": "var(--color-text-primary)", /* slate-800 */
        "text-secondary": "var(--color-text-secondary)", /* slate-500 */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        accent: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'brand-hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'brand-heading': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'brand-subheading': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'brand-body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'brand-caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'brand-sm': '0 2px 8px rgba(37, 99, 235, 0.1)',
        'brand-md': '0 4px 16px rgba(37, 99, 235, 0.15)',
        'brand-lg': '0 8px 32px rgba(37, 99, 235, 0.2)',
        'brand-xl': '0 12px 48px rgba(37, 99, 235, 0.25)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "pulse-brand": "pulse-brand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "pulse-brand": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      backdropBlur: {
        'brand': '10px',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      gridTemplateColumns: {
        'brand-hero': '1fr 400px 1fr',
        'brand-features': 'repeat(auto-fit, minmax(300px, 1fr))',
        'brand-testimonials': 'repeat(auto-fit, minmax(280px, 1fr))',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}