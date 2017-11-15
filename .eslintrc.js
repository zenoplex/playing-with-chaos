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
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'max-len': 0,
  }
};
