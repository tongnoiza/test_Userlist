// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  // ssr:false,
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
    // origin: 'https://your-cool-origin.com',
    // isEnabled: true,
        // disableServerSideAuth: true,
        // baseURL: 'https://github.com/login/oauth/authorize',
    // baseURL:'https://user-list-xts0.onrender.com',
    provider: {
        type: 'authjs',
        // trustHost: false,
        // defaultProvider: 'github',
        // addDefaultCallbackUrl: true
    }
    // ,  globalAppMiddleware: true
},
runtimeConfig: {
  public: {
    baseURL: 'http://localhost:3002',
  },
  authOrigin: process.env.NEXTAUTH_URL,
  authSecret: '123',
},
  devtools: { enabled: true },
})