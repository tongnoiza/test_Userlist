// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  // ssr: true,
  build: {
    transpile: ['vuetify'],
  },
  modules: ["@sidebase/nuxt-auth",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  auth: {
    provider: {
      type: 'authjs',
    },
  globalAppMiddleware: {
    isEnabled: true
  },
    baseURL: `http://test-userlist.vercel.app:${process.env.PORT || 3000}`
  },
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3002',
    },
    authSecret: '123',
  },
  routeRules: {
    '/with-caching': {
      swr: 86400000,
      auth: {
        disableServerSideAuth: true
      }
    }
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-08-19',
})