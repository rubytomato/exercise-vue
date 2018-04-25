// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    //'plugin:prettier/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'space-before-function-paren': [
    //   'error', 
    //   {
    //     'anonymous': 'always',
    //     'named': 'always',
    //     'asyncArrow': 'always'
    //   }
    // ],
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     //'trailingComma': 'es5',
    //     singleQuote: true,
    //     semi: false,
    //     bracketSpacing: true,
    //     printWidth: 120
    //   }
    // ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
