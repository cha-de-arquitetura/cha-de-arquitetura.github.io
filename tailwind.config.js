module.exports = {
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      code: ['"Fira Code"', 'sans-serif']
    },
    extend: {
      colors: {
        lightest: '#50ffb1',
        lighter: '#4fb286',
        primary: '#3c896d',
        darker: '#2c363f',
        darkest: '#253237'
      }
    }
  },
  purge: {
    content: [
      'content/**/*.md'
    ]
  }
}
