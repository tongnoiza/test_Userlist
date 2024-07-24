import GithubProvider from 'next-auth/providers/github'
import googleProvider from 'next-auth/providers/google'
import facebookProvider from 'next-auth/providers/facebook'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: 'ss123',
      clientSecret: 'ss123'
    }),
    googleProvider.default({
        clientId: '442233',
        clientSecret: '442233'
      }),
      facebookProvider.default({
        clientId: 'your-client-id',
        clientSecret: 'your-client-secret'
      })
  ]
})