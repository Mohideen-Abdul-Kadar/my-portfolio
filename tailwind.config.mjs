/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#111111',
        border: '#1f1f1f',
        primary: '#ffffff',
        secondary: '#9ca3af',
        accent: '#00e5ff',
        'accent-dim': '#00b8cc',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 16s linear infinite',
        'marquee-reverse': 'marquee-reverse 16s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,229,255,0.6)' },
        },
      },
      backgroundImage: {
        'radial-accent': 'radial-gradient(ellipse at center, rgba(0,229,255,0.15) 0%, transparent 70%)',
        'grid-pattern': 'linear-gradient(rgba(31,31,31,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(31,31,31,0.5) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
