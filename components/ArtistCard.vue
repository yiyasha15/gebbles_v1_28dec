<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      :to="'/' + artist.username" 
      :elevation="hover ? 12 : 0"
      outlined
      width="115" 
      max-height="105"
    >
      <v-img
        v-if = artist.thumb :src = "artist.thumb" 
        :lazy-src= "artist.thumb" 
        height="73"
        width="115"
      />
      <v-img
        v-else :src="require('@/assets/gebbleslogo3.png')"
        contain
        height="73"
        width="115"
      />
      <v-card-actions height="32px">
        <div v-if="artist.artist_name" width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:78px; font-size:0.6rem!important;">{{ artist.artist_name }} </p>
        </div>
        <div v-else width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:78px; font-size:0.6rem!important;">{{ artist.username }} </p>
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
          title: 'gebbles community',
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

