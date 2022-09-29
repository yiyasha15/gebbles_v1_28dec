<template>
  <v-app>
        <div class="h-80"></div>
        <nuxt/>
        <the-footer />
  </v-app>
</template>

<script>
import TheFooter from '@/components/TheFooter'
export default {
  components:{
    TheFooter
  },
  head() {  //head function (a property of vue-meta), returns an object
    return {
      titleTemplate: '%s',
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
<style scoped>
.h-80{
  height: 120px;
}
@media only screen and (max-width: 700px) {
.h-80{
  height: 60px;
}
}
@media only screen and (max-width: 500px) {
.h-80{
  height: 20px;
}
}
</style>


