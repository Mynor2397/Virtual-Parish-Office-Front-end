module.exports = {
  important: true,
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        danger: "#fcb00b"
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}
