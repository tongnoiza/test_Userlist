<template>
    <div>
        <v-app>  
            <div>     <v-app-bar :elevation="2" rounded>
            <template v-slot:prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>
          
            <v-app-bar-title>Application Bar</v-app-bar-title>
          </v-app-bar>   </div>
         <div>
              <slot style="margin-top: 15%;"/>
         </div>
          
        
      </v-app>
   
    </div>
</template>