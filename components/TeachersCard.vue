<template>
<v-hover v-slot:default="{ hover }">
  <v-card
      class="ma-1"
      data-view
      :to="'/e1t1/' + e1t1.id"
      :elevation="hover ? 12 : 0"
      outlined
      min-width="160" 
      max-height="160"
    >
    <v-img v-if = e1t1.sp_thumb  :src = "e1t1.sp_thumb" :lazy-src= "e1t1.sp_thumb" width="160px" height="100px"></v-img>
    <v-img v-else :src="require('@/assets/e1t11.jpeg')" height="100" width="160" contain/>
      <v-card-actions height="32px">
        <div width="100" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:126px;">{{e1t1.s_teacher_name}}</p>
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

