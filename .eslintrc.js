// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    // 'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    // quotes: 'off',
    // semi: 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    'no-unused-vars': 1,
    // 'no-tabs': 'off',
    // 'no-multi-spaces': 'off',
    // 'indent': 'off',
    'comma-dangle': 'off',

    'no-throw-literal': 0, // 允许用字面量{}抛出异常
    'arrow-parens': 0,
    'semi': [2, 'always'], // 语句强制分号结尾
    'indent': [1, 2, { // 缩进风格
      'SwitchCase': 1
    }],
    'one-var': 0, // 一个let或者var只能生命一个变量
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
