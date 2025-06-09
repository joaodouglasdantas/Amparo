'use strict'

const { defineConfig } = require("eslint/config");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");
const reactNativePlugin = require("eslint-plugin-react-native");
const js = require("@eslint/js"); 

const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path"); 

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
   
});

module.exports = defineConfig([

    {
        ignores: [
            "eslint.config.cjs",
            "jest.config.cjs", 
            "metro.config.js", 
            "babel.config.js",  
           
        ],
    },

    ...compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", 
        "plugin:react/recommended",
        "plugin:react-native/all"
    ),

    {
        files: ["**/*.{ts,tsx,js,jsx}"], 

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                
            },
            globals: {
                
            },
        },

        plugins: {
            
            "@typescript-eslint": typescriptEslintPlugin,
            "react": reactPlugin,
            "react-native": reactNativePlugin,
        },

        settings: { 
            react: {
                version: "detect",
            },
        },

        rules: {
            'react-native/no-color-literals': 'off', 
            'react-native/no-inline-styles': 'off', 
            '@typescript-eslint/no-explicit-any': 'warn',
            'react-native/sort-styles': 'off',
            'react-native/no-raw-text': 'off',
            '@typescript-eslint/no-unused-vars': 'warn'
        },
    }
]);
