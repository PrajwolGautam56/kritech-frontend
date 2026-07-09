/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kritech: {
          ink: '#06120d',
          panel: '#0a1711',
          green: '#00c36b',
          darkGreen: '#058a49',
          line: 'rgba(148, 255, 190, 0.16)'
        }
      },
      boxShadow: {
        tech: '0 24px 90px rgba(0, 0, 0, 0.34)',
        glow: '0 0 44px rgba(0, 195, 107, 0.24)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace']
      }
    }
  },
  plugins: []
};
