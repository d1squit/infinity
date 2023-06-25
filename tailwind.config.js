/** @type {import('tailwindcss').Config} */
export default {
  content: [
      'index.html',
      './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
        colors: {
            'background-color': '#E5E5E5',
            'main-color': '#334578',
            'other-color': '#7C8DB5',
            'select-color': '#FA7C05',
            'border-color': '#E6EFFB',
            'player-color': '#269393',
            'light-player-color': '#43a1a1',
            'skeleton-color': '#AAAAAA',
        },
        boxShadow: {
            'auth-form': '0 0 10px 0 rgba(0, 0, 0, 0.1)'
        }
    },
  },
  plugins: [],
}

