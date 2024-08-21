// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  ssr:true,
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
    isEnabled: true,
        disableServerSideAuth: true,
        baseURL: process.env.VERCEL_URL ? `https://${VERCEL_URL}/api/auth` : undefined,
    provider: {
        type: 'authjs',
        trustHost: true,
        defaultProvider: 'github',
        addDefaultCallbackUrl: true
    },globalAppMiddleware: true
},
  runtimeConfig: {
    public: {
      baseURL:'http://localhost:3002',
    },
    authSecret: '123',
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-08-19',
})