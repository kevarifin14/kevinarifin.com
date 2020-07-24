module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/alt-text": 0,
    "eqeqeq": 0,
    "react/button-has-type": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["."]
      }
    }
  },
};
