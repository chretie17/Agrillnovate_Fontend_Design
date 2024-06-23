module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          600: '#2F855A',
          800: '#22543D',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
