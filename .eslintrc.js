module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "mocha": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
  "overrides": [
    {
      "files": ["*.ts"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
      },
      "rules": {
        "no-unused-vars": "off",
        "no-redeclare": "off",
        "semi": "off",
        "quotes": "off"
      }
    }
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-useless-escape": "off"
  }
};