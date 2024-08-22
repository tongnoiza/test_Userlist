<template>
    <div>
        <v-app>  
            <div>     <v-app-bar :elevation="2" rounded>
            <template v-slot:prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-btn @click="signOut()">sing out</v-btn>
            </template>
          
            <v-app-bar-title>Application Bar</v-app-bar-title>
          </v-app-bar>   </div>
         <div style="padding-top: 5%;">
          {{r }}
              <slot/>
         </div>
      </v-app>
    </div>
</template>

<script setup>
const {signOut,getProviders} = useAuth()
const r = await getProviders()
</script>