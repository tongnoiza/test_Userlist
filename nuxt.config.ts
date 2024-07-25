// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr:true,
  modules: ['@ant-design-vue/nuxt', "@sidebase/nuxt-auth"],
  auth: {
    baseURL:'https://user-list-xts0.onrender.com',
    provider: {
        type: 'authjs',
        trustHost: false,
        // defaultProvider: 'github',
        // addDefaultCallbackUrl: true

    }
    ,  globalAppMiddleware: true
},
runtimeConfig: {
  authSecret: '123',
},
  devtools: { enabled: true },
})