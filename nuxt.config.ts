// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
const VERCEL_URL='test-userlist-qu37zbtge-tongnoizas-projects.vercel.app'
export default defineNuxtConfig({
  ssr: true,
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
      // trustHost: false,
      // defaultProvider: 'github',
      // addDefaultCallbackUrl: true
    },
  globalAppMiddleware:  true,
  baseURL: process.env.NUXT_AUTH_ORIGIN
  },
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3002',
    },
    authSecret: 'testzaaaaa',
  },
  // routeRules: {
  //   '/with-caching': {
  //     swr: 86400000,
  //     // auth: {
  //     //   disableServerSideAuth: true
  //     // }
  //   }
  // },
  devtools: { enabled: true },
  compatibilityDate: '2024-08-19',
})