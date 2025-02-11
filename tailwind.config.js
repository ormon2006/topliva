/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    fontFamily: {
      serif: ['Montserrat', 'serif'],
      sans: ['Montserrat', 'sans'],
    },
    colors: {
      blue: '#0589c7',
      green: '#72c200',
      sun: '#faa918',
      yellow: '#ffc715',
      red: '#d33131',
      cinnabar: '#e53838',
      alto: ' #cfcfcf',
      dove: '#6f6f6f',
      tundora: ' #4c4c4c',
      white: 'white',
      black: 'black',
      tandaBtnBg: '#005B50',
      tandaColor: '#1F1F1F',
      tandaTestBg:'rgb(245, 245, 245)',
      TandaBg:'rgb(255, 255, 255)'
    },
    extend: {},
  },
  plugins: [],
};
