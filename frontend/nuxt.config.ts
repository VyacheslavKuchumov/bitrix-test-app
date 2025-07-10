// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {

    public: {
      BITRIX_WEBHOOK_URL: process.env.BITRIX_WEBHOOK_URL,
    }
  }
})