<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      :to="'/' + artist.username" 
      :elevation="hover ? 12 : 0"
      outlined
      :width="img_width" 
      :max-height="card_height"
    >
      <v-img
        v-if = artist.thumb :src = "artist.thumb" 
        :lazy-src= "artist.thumb" 
        :height="img_height"
        :width="img_width" 
      />
      <v-img
        v-else :src="require('@/assets/gebbleslogo3.png')"
        contain
        :height="img_height"
        :width="img_width" 
      />
      <v-card-actions height="32px">
        <div v-if="artist.artist_name" class="text-decoration-none caption width">
        <p class="event_p">{{ artist.artist_name }} </p>
        </div>
        <div v-else class="text-decoration-none caption width">
        <p class="event_p">{{ artist.username }} </p>
        </div>
        <v-spacer></v-spacer>
        <country-flag size=small  :country= 'artist.country' />
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
import CountryFlag from 'vue-country-flag'
    export default {
      head() {  //head function (a property of vue-meta), returns an object
      return {
          title: 'gebbles - artists',
          }
      },
      name: 'ArtistCard',
      props: {
        artist: Object
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
      img_width () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 115
          case 'sm': return 115
          case 'md': return 215
          case 'lg': return 215
          case 'xl': return 215
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
   font-size:0.6rem!important;
}
}
</style>
