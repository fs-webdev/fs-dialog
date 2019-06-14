module.exports = {
  extends: [
    'frontier',
    'tree'
  ],
  plugins: [
    // Enable plugins that are not natively supported by Code Climate. Otherwise results in build errors.
    'eslint-plugin-deprecate',
    'eslint-plugin-sonarjs'
  ],
  rules: {
    'no-invalid-this': 'off'
  }
}
