import GithubProvider from 'next-auth/providers/github'
import googleProvider from 'next-auth/providers/google'
import facebookProvider from 'next-auth/providers/facebook'
import twitterProvider from 'next-auth/providers/twitter'
// import youtubeProvider from 'next-auth/providers/youtube'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  // secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: 'Ov23liNSHuXCEoO5yhkm',
      clientSecret: 'a383ec729af653e582c730ec73ce8c84c0e28232'
    })
  ], 
  callbacks: {
    jwt({ token, account, profile }) {
      // console.log('token ',token);
      // console.log('account ',account); 
      // console.log('profile ',profile); 
        if (account) {
          token.sessionToken = account.access_token
            // token.sessionToken = account.session_token
            // console.log('t,oken.sessionToken',token.sessionToken);
        }
        // userdata ={token,account,profile}
        return token
    },
    // async session({ session, token }):Promise<any> {
    //       // Token we injected into the JWT callback above.
    //       const tok = token.sessionToken
    
    //       // Fetch data OR add previous data from the JWT callback.
    //       const additionalUserData:User = await $fetch(`/api/session/${tok}`)
    
    //       // Return the modified session
    //       return {
    //         ...session,
    //         user: {
    //           name: additionalUserData.name,
    //           avatar: additionalUserData.avatar,
    //           role: additionalUserData.role
    //         }
    //       }
    //     },
  }
})
