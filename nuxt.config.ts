// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr:true,
  modules: ['@ant-design-vue/nuxt', "@sidebase/nuxt-auth"],
  auth: {
    // isEnabled: true,
        disableServerSideAuth: false,
        // baseURL: 'http://localhost:3000/api/auth',
    baseURL:'',
    provider: {
        type: 'authjs',
        trustHost: true,
        // defaultProvider: 'github',
        addDefaultCallbackUrl: true
    }
    ,  globalAppMiddleware: true
},
runtimeConfig: {
  authSecret: '123',
},
  devtools: { enabled: true },
})