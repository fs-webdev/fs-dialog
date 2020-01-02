module.exports = {
  extends: [
    'eslint-config-frontier',
    'eslint-config-tree',
  ],
  plugins: [
    // Enable plugins that are not natively supported by Code Climate. Otherwise results in build errors.
    'eslint-plugin-bestpractices',
    'eslint-plugin-deprecate',
    'eslint-plugin-no-only-tests',
    'eslint-plugin-no-skip-tests',
    'eslint-plugin-promise',
    'eslint-plugin-sonarjs',
    'eslint-plugin-test-selectors' // NOTE: Only runs against JSX
  ]
}
