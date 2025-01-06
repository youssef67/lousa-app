/* eslint-disable nuxt/nuxt-config-keys-order */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  runtimeConfig: {
    apiHost: process.env.API_HOST,
    apiEnv: process.env.API_ENV,
    apiKey: process.env.API_KEY
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/device'
  ],
  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/my-icons'
      }
    ]
  },
  fonts: {
    families: [
      // do not resolve this font with any provider from `@nuxt/fonts`
      // only resolve this font with the `google` provider
      {
        name: 'Poppins',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800, 900]
      }
    ]
  },
  ui: {
    safelistColors: [
      'secondary',
      'lousa-primary',
      'lousatest',
      'lousa-input-bg',
      'lousa-panel-bg',
      'lousa-background',
      'lousa-foreground',
      'color-lousa-background-dark',
      'lousa-text-over-bg',
      'lousa-text-over-input'
    ]
  },
  typescript: {
    strict: false
  },
  colorMode: {
    preference: 'dark'
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})