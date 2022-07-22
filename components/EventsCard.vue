<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      :to="'/events/' + event.uuid" 
      :elevation="hover ? 12 : 0"
      outlined
      width="115" 
      max-height="105"
    >
      <v-img
        v-if = event.poster :src = "event.poster" 
        :lazy-src= "event.poster" 
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
        <div v-if="event.event_name" width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:78px; font-size:0.6rem!important;">{{ event.name }} </p>
        </div>
        <div v-else width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:78px; font-size:0.6rem!important;">{{ event.name }} </p>
        </div>
        <v-spacer></v-spacer>
        <country-flag size=small  :country= 'event.country' />
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
import CountryFlag from 'vue-country-flag'
    export default {
      head() {  //head function (a property of vue-meta), returns an object
      return {
          title: 'gebbles event',
          }
      },
      name: 'eventCard',
      props: {
        event: Object
      },
      components: {
        CountryFlag
      },
      }
</script>

