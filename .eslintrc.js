module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:prettier/recommended",
    ],
    overrides: [
        {
            files: ["**/*.test.js", "**/*.test.jsx"],
            rules: {
                "no-undef": "off",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "no-use-before-defined": 0,
        "react/require-default-props": 0,
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                singleQuote: false,
                endOfLine: "auto",
            },
        ],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        indent: ["error", 4],
        quotes: ["error", "double"],
    },
};
