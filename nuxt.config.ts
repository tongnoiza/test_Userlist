// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  ssr:false,
  // pages: true,
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
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  // modules: [ '@ant-design-vue/nuxt'],
  auth: {
    // isEnabled: true,
        // disableServerSideAuth: true,
        // baseURL: 'http://localhost:3002',
    // baseURL:'https://user-list-xts0.onrender.com',
    provider: {
        type: 'authjs',
        trustHost: false,
        // defaultProvider: 'github',
        // addDefaultCallbackUrl: true
    }
    ,  globalAppMiddleware: true
},
runtimeConfig: {
  public: {
    baseURL: 'http://localhost:3002',
  },
  authSecret: '123',
},
  devtools: { enabled: true },
})