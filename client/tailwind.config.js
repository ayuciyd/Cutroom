/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--color-ink)',
          light: '#3D3436',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
        },
        paper: {
          DEFAULT: 'var(--color-paper)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
        },
        mist: {
          DEFAULT: 'var(--color-mist)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
        },
        badgeBg: {
          DEFAULT: 'var(--color-badge-bg)',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(30, 25, 26, 0.08)',
        card: '0 2px 8px rgba(30, 25, 26, 0.06)',
      },
    },
  },
  plugins: [],
}
