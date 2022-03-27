<template>
<v-hover v-slot:default="{ hover }">
  <v-card
      style="margin:2px;"
      data-view
      :to="'/e1t1/' + e1t1.id"
      :elevation="hover ? 12 : 0"
      outlined
      width="215" 
      max-height="205"
    >
    <v-img v-if = e1t1.sp_thumb  :src = "e1t1.sp_thumb" :lazy-src= "e1t1.sp_thumb" height="134" width="215"></v-img>
    <v-img v-else :src="require('@/assets/gebbleslogo3.png')" height="134"  width="215" contain/>
      <v-card-actions height="32px">
        <div  width="70" class="text-decoration-none caption" style=" height: 1.7em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:134px; font-size:0.8rem!important;">{{e1t1.s_teacher_name}} </p>
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

