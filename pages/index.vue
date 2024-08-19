<template>
<div>
    test
    <v-btn @click="gotopost">
        goto post
    </v-btn>
</div>
</template>
<script setup>

const r = useRouter()

function gotopost(){
    r.push({path:'/Post'})
}


</script>