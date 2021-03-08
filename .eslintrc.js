module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "parser": "babel-eslint"
  },
  "extends": ['@tencent/eslint-config-tencent', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  // 若是新项目，需要将以下规则放开
  "rules":{
    "no-unused-vars": "off",
    "prefer-promise-reject-errors": "off",
    "no-new-func": "off",
    "no-prototype-builtins": "off",
    "no-async-promise-executor": "off",
    "camelcase": "off",
    "handle-callback-err": "off",
    "no-useless-escape": "off",
    "no-undef": "off",
    "no-underscore-dangle": "off",
    "no-restricted-syntax": "off",
    "no-param-reassign": "off",
    "no-restricted-properties": "off",
    "no-plusplus": "off",
    "prefer-destructuring": "off",
    "operator-linebreak": ["error", "before"]
  }
}
