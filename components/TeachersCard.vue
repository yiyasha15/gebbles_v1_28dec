<template>
<v-hover v-slot:default="{ hover }">
  <v-card
      class="ma-1"
      data-view
      :to="'/e1t1/' + e1t1.id"
      :elevation="hover ? 12 : 0"
      outlined
      min-width="92" 
      max-height="92"
    >
    <v-img v-if = e1t1.sp_thumb  :src = "e1t1.sp_thumb" :lazy-src= "e1t1.sp_thumb" width="92" height="60"></v-img>
    <v-img v-else :src="require('@/assets/gebbleslogo3.png')" height="60" width="92" contain/>
      <v-card-actions height="32px">
        <div width="70" class="text-decoration-none caption" style=" height: 1.4em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:60px;">{{e1t1.s_teacher_name}}</p>
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

