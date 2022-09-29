<template>
<v-hover v-slot:default="{ hover }">
  <v-card
      data-view
      :to="'/e1t1/' + e1t1.uuid"
      :elevation="hover ? 6 : 0"
      class="transition-swing ma-md-2 ma-1"
      outlined
      :width="card_width" 
      :max-height="card_height"
    >
    <v-img v-if = e1t1.image_mini  :src = "e1t1.image_mini" :lazy-src= "e1t1.image_mini" :height="img_height" :width="card_width"></v-img>
    <v-img v-else :src="require('@/assets/gebbleslogo3.png')" :height="img_height"  :width="card_width" contain/>
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

