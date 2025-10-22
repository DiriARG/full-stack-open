import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // Plugins adicionales que queremos incluir.
    plugins: {
      'react-hooks': reactHooks, // Reglas para verificar el uso correcto de hooks.
      'react-refresh': reactRefresh, // Reglas relacionadas con React Fast Refresh (Vite).
    },
    rules: {
      // Reglas base recomendadas para JavaScript.
      ...js.configs.recommended.rules,
      // Reglas recomendadas por el plugin de React Hooks ⚛️.
      ...reactHooks.configs.recommended.rules,
      // No permitir variables sin usar (pero ignorar las que empiecen con mayúscula o "_").
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Muestra una advertencia si se exporta algo que puede interferir con React Fast Refresh.
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Permite exportar constantes sin advertencias.
      ],
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  // Configuración específica para archivos de prueba.
  {
    // Aplica esta configuración solo a los archivos con el sufijo .test.js o .test.jsx.
    files: ['**/*.test.{js,jsx}'],
    languageOptions: {
      globals: {
        // Agrega todas las variables globales de Vitest (describe, test, expect, etc.) para que ESLint no las marque como indefinidas en los tests.
        ...globals.vitest
      }
    }
  }
]
