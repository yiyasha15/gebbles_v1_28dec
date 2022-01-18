<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-1"
      data-view
      :to="'/' + artist.username" 
      :elevation="hover ? 12 : 0"
      outlined
      min-width="96" 
      max-height="96"
    >
      <v-img
        v-if = artist.thumb :src = "artist.thumb" 
        :lazy-src= "artist.thumb" 
        class="grey lighten-2 white--text"
        height="60"
        width="96"
      />
      <v-img
        v-else :src="require('@/assets/gebbleslogo3.png')"
        contain
        height="60"
        width="96"
      />
      <v-card-actions height="32px">
        <div v-if="artist.artist_name" width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:76px; font-size:0.6rem!important;">{{ artist.artist_name }} </p>
        </div>
        <div v-else width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:76px; font-size:0.6rem!important;">{{ artist.username }} </p>
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
          title: 'Gebbles Community',
          }
      },
      name: 'ArtistCard',
      props: {
        artist: Object
      },
      components: {
        CountryFlag
      },
      }
</script>

