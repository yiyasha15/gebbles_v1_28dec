<template>
  <v-hover v-slot:default="{ hover }">
    <v-card 
    class="transition-swing ma-md-2 ma-1"
      data-view
      :to="'/workshops/' + workshop.uuid" 
      :elevation="hover ? 6 : 0"
      outlined
      :width="card_width" 
      :max-height="card_height"
    >
      <v-img
        v-if = workshop.poster :src = "workshop.poster" 
        :lazy-src= "workshop.poster" 
        :height="img_height"
        :width="card_width"
      />
      <v-img
        v-else :src="require('@/assets/gebbleslogo3.png')"
        contain
        :height="img_height"
        :width="card_width"
      />
      <v-card-actions height="32px">
        <div class="text-decoration-none caption width">
        <p class="workshop_p" >{{ workshop.title }} </p>
        </div>
        <v-spacer></v-spacer>
        <country-flag size=small  :country= 'workshop.country' />
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
import CountryFlag from 'vue-country-flag'
    export default {
      head() {  //head function (a property of vue-meta), returns an object
      return {
          title: 'gebbles - workshops',
          }
      },
      name: 'WorkshopCard',
      props: {
        workshop: Object
      },
      components: {
        CountryFlag
      },
      computed: {
      img_height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 73
          case 'sm': return 73
          case 'md': return 134
          case 'lg': return 134
          case 'xl': return 134
        }
      },
      card_width () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 110
          case 'sm': return 110
          case 'md': return 205
          case 'lg': return 205
          case 'xl': return 205
        }
      },
      card_height() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 105
          case 'sm': return 105
          case 'md': return 205
          case 'lg': return 205
          case 'xl': return 205
        }
      }
      },
      }
</script>
<style scoped>

.width{
    width: 177px;
    height: 1.7em;
    line-height: initial;
  overflow: hidden
  }
.workshop_p{
  max-width:177px; 
  font-size:0.8rem!important;
}
@media only screen and (max-width: 960px) {
  .width{
  width: 78px;
  height: 1.3em;
  line-height: initial;
  overflow: hidden
}
.workshop_p{
  max-width:78px;
   font-size:0.6rem!important;
}
}
</style>
