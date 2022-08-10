<template>
<v-hover v-slot:default="{ hover }">
  <v-card
      style="margin:2px;"
      data-view
      :to="'/e1t1/' + e1t1.uuid"
      :elevation="hover ? 12 : 0"
      outlined
      :width="cardwidth" 
      :max-height="cardheight"
    >
    <v-img v-if = e1t1.image_mini  :src = "e1t1.image_mini" :lazy-src= "e1t1.image_mini" :height="img_height" :width="cardwidth"></v-img>
    <v-img v-else :src="require('@/assets/gebbleslogo3.png')" :height="img_height"  :width="cardwidth" contain/>
      <v-card-actions height="32px">
        <div class="text-decoration-none caption width">
        <p class="event_p">{{e1t1.s_teacher_name}} </p>
        </div>
        <v-spacer></v-spacer>
          <country-flag :country= 'e1t1.s_teacher_country' size='small'/>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import CountryFlag from 'vue-country-flag'
    export default {
      name: 'TeachersCard',
      props: {
        e1t1: Object
      },
      components:{
        CountryFlag
        },
      computed: {
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
.event_p{
  max-width:177px; 
  font-size:0.8rem!important;
}
@media only screen and (max-width: 960px) {
  .width{
  width: 80px;
  height: 1.3em;
  line-height: initial;
  overflow: hidden
}
.event_p{
  max-width:80px;
   font-size:0.6rem!important;
}
}
</style>

