module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['Montserrat', 'Fira Code']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'variants', 'screen', 'mixin', 'include']
      }
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested', 'inside-block', 'blockless-after-same-name-blockless', 'blockless-after-blockless']
      }
    ]
  }
}
