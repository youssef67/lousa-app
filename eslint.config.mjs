// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'

export default withNuxt({
  extends: [
    prettier // désactive les règles ESLint qui entrent en conflit avec Prettier
  ],
  plugins: ['prettier'],
  rules: {
    // Règles personnalisées
    '@typescript-eslint/no-explicit-any': 'off',
    'operator-linebreak': ['error', 'after'],
    'prettier/prettier': 'error' // Intégration Prettier dans ESLint
  }
})
