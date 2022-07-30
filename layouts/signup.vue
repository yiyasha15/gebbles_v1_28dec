<template>
  <v-app>
        <blank-header/>
        <nuxt/>
        <the-footer />
  </v-app>
</template>

<script>
import BlankHeader from '@/components/BlankHeader'
import TheFooter from '@/components/TheFooter'
export default {
  components:{
    BlankHeader,
    TheFooter
  },
  head() {  //head function (a property of vue-meta), returns an object
    return {
      titleTemplate: '%s - gebbles',
      meta: [
        {
          hid: 'description', //create page overrides the description, hid helps to stop redundancy
          name: 'description',
          content: 
            'gebbles - The thread connecting music, movement and artists, connecting HipHop Elements'
        }
      ]
    }
  } 
}
</script>


