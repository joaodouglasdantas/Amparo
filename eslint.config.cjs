'use strict'

// Desabilitar regras problemáticas para este arquivo de configuração CommonJS
/* eslint-disable @typescript-eslint/no-require-imports, no-undef */

const { defineConfig } = require("eslint/config");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");
const reactNativePlugin = require("eslint-plugin-react-native");
const js = require("@eslint/js"); // Importante para js.configs.recommended

const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path"); // __dirname está disponível em .cjs

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended, // <-- DESCOMENTE/ADICIONE ESTA LINHA
    // allConfig: js.configs.all, // Opcional, mas bom ter se você usar "eslint:all"
});

module.exports = defineConfig([
    // 1. Objeto de configuração para ignorar o linting deste próprio arquivo e outros arquivos de config
    // Isso evita que regras como '@typescript-eslint/no-require-imports' se apliquem a ele.
    {
        ignores: [
            "eslint.config.cjs",
            "jest.config.cjs", // Se você tiver e ele também for CJS
            "metro.config.js", // Comum em React Native
            "babel.config.js",  // Comum
            // Adicione outros arquivos de configuração JS que são CommonJS
        ],
    },

    // 2. Espalhe as configurações traduzidas pelo FlatCompat
    // O `compat.extends()` retorna um array de objetos de configuração.
    ...compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // Mantém o @typescript-eslint aqui
        "plugin:react/recommended",
        "plugin:react-native/all" // Este é bem abrangente, pode trazer muitas regras
    ),

    // 3. Seu objeto de configuração principal para o código-fonte (TS/TSX)
    // Onde você define o parser, plugins específicos para flat config e suas regras/settings globais.
    {
        files: ["**/*.{ts,tsx,js,jsx}"], // Aplique estas configurações aos seus arquivos de código fonte

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                // project: './tsconfig.json', // Descomente se quiser regras baseadas em tipo (mais lento, mais poderoso)
            },
            globals: {
                // 'plugin:react-native/all' geralmente já define os globais do React Native.
                // Se precisar de globais adicionais, importe 'globals' e adicione:
                // ...require('globals').browser,
                // ...require('globals').node,
                // __DEV__: 'readonly', // Exemplo de global comum em RN
            },
        },

        plugins: {
            // No formato flat config, os plugins são referenciados pelos nomes que você dá aqui.
            // O @typescript-eslint/eslint-plugin é frequentemente referenciado como '@typescript-eslint'
            // As regras nos 'extends' já saberão sobre eles devido ao FlatCompat.
            // Esta seção 'plugins' aqui garante que eles estejam disponíveis para regras customizadas que você adicionar abaixo.
            "@typescript-eslint": typescriptEslintPlugin,
            "react": reactPlugin,
            "react-native": reactNativePlugin,
        },

        settings: { // 'settings' ainda é usado por alguns plugins como eslint-plugin-react
            react: {
                version: "detect",
            },
        },

        rules: {
            'react-native/no-color-literals': 'off', // Muda para aviso em vez de erro
            'react-native/no-inline-styles': 'off', 
            '@typescript-eslint/no-explicit-any': 'warn',
            'react-native/sort-styles': 'off',
            'react-native/no-raw-text': 'off',
            '@typescript-eslint/no-unused-vars': 'warn'
        },
    }
]);

/* eslint-enable @typescript-eslint/no-require-imports, no-undef */