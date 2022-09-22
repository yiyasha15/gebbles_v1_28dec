<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      :to="'/whatiscooking/'+cook.cookingidobj.uuid" 
      :elevation="hover ? 12 : 0"
      outlined
      :width="cardwidth" 
      :max-height="cardheight"
    >
    <v-img v-if="cook.cookingidobj.thumbjs"
        :src="cook.cookingidobj.thumbjs"
        :height="imgheight"
        :width="cardwidth" 
      />
      <v-img v-else
        :src="require('@/assets/gebbleslogo3.png')"
        contain
        :height="imgheight"
        :width="cardwidth" 
      />
      <v-card-actions class="pa-1">
        <div class="text-decoration-none caption width">
        <p class="event_p">{{cook.username}} </p>
        </div>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
    export default {
        head() {  
        return {
            title: "What's cookin",
            }
        },
        name: 'CookingCard',
        props: {
            cook: Object
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
        imgheight () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 84
            case 'sm': return 84
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
  width: 78px;
  height: 1.3em;
  line-height: initial;
  overflow: hidden
}
.event_p{
  max-width:78px;
   font-size:0.6rem!important;
}
}
</style>

