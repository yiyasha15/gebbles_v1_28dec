<template>
<v-hover v-slot:default="{ hover }">
  <v-card
      class="ma-1"
      data-view
      :to="'/e1t1/' + e1t1.id"
      :elevation="hover ? 12 : 0"
      outlined
      min-width="96" 
      max-height="96"
    >
    <v-img v-if = e1t1.sp_thumb  :src = "e1t1.sp_thumb" :lazy-src= "e1t1.sp_thumb" width="96" height="60"></v-img>
    <v-img v-else :src="require('@/assets/gebbleslogo3.png')" height="60" width="96" contain/>
      <v-card-actions max-height="32px" class="pa-1">
        <div width="80" class="text-decoration-none caption" style=" height: 1em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:72px; font-size:0.5rem!important;">{{e1t1.s_teacher_name}}</p>
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
         }
    }
</script>

