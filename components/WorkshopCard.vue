<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      :to="'/workshops/' + workshop.uuid" 
      :elevation="hover ? 12 : 0"
      outlined
      :width="cardwidth" 
      :max-height="cardheight"
    >
      <v-img
        v-if = workshop.poster :src = "workshop.poster" 
        :lazy-src= "workshop.poster" 
        :height="img_height"
        :width="cardwidth"
      />
      <v-img
        v-else :src="require('@/assets/gebbleslogo3.png')"
        contain
        :height="img_height"
        :width="cardwidth"
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
      computed:{
        cardheight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 105
          case 'sm': return 105
          case 'md': return 205
          case 'lg': return 205
          case 'xl': return 205
        }
        },
        cardwidth () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 115
            case 'sm': return 115
            case 'md': return 215
            case 'lg': return 215
            case 'xl': return 215
          }
        },
        img_height () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 73
            case 'sm': return 73
            case 'md': return 134
            case 'lg': return 134
            case 'xl': return 134
          }
        },
      }
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
