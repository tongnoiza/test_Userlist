import GithubProvider from 'next-auth/providers/github'
import googleProvider from 'next-auth/providers/google'
import facebookProvider from 'next-auth/providers/facebook'
import twitterProvider from 'next-auth/providers/twitter'
// import youtubeProvider from 'next-auth/providers/youtube'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  // secret: useRuntimeConfig().authSecret,
  // origin:process.env.NEXTAUTH_URL,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: 'Ov23liNSHuXCEoO5yhkm',
      clientSecret: 'a383ec729af653e582c730ec73ce8c84c0e28232'
    }),
  ],
  callbacks: {  
    jwt({ token, account, profile }) {
        if (account) {
          token.sessionToken = account.access_token
        }
        return token
    },
  }
})
