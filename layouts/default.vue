<template>
  <v-app>
    <!-- <the-header/> -->
    <dashboard/>
      <nuxt class="mt-78"/>
    <the-footer/>
  </v-app>
</template>

<script>
// import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import Dashboard from '~/components/Dashboard.vue'
export default {
  components:{
    // TheHeader,
    TheFooter,
    Dashboard
  },
  head() {  //head function (a property of vue-meta), returns an object
    return {
      titleTemplate: '%s',
      meta: [
        {
          hid: 'description', //create page overrides the description, hid helps to stop redundancy
          name: 'description',
          content: 
              'Gebbles- a thread connecting music, movement and artists.'
        }
      ]
    }
  } 
}
</script>
<style>
.mt-78{
  margin-top: 78px;
}
</style>


