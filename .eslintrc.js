module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  plugins: ['import', 'flowtype'],
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  rules: {
    'import/prefer-default-export': 0,
    'import/no-unresolved': [2, { ignore: ['pixi.js$'] }],
    'import/extentions': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'max-len': 0,
    'no-mixed-operators': 0,
  },
};
