<template>
  <v-app>
      <register-header/>
      <nuxt/>
    <the-footer/>
  </v-app>
</template>

<script>
import RegisterHeader from '@/components/RegisterHeader'
import TheFooter from '@/components/TheFooter'
export default {
  components:{
    RegisterHeader,
    TheFooter
  },
  head() {  //head function (a property of vue-meta), returns an object
    return {
      titleTemplate: '%s - Sign Up',
      meta: [
        {
          hid: 'description', //create page overrides the description, hid helps to stop redundancy
          name: 'description',
          content: 
              'gebbles - The thread connecting music, movement and artists.'
        }
      ]
    }
  } 
}
</script>


