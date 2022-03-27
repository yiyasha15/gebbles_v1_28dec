<template>
<v-hover v-slot:default="{ hover }">
    <v-card
      style="margin:2px;"
      data-view
      :to="'/e1t1/' + share.id" 
      :elevation="hover ? 12 : 0"
      outlined
      width="215" 
      max-height="205">
      <v-img v-if="share.sp_thumb"
          :src = "share.sp_thumb"
          height="134" width="215"/>
      <v-img v-else :src="require('@/assets/gebbleslogo3.png')" height="134" width="215" contain/>
      <v-card-actions height="32px">
        <div  width="70" class="text-decoration-none caption" style=" height: 1.7em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:134px; font-size:0.8rem!important;">{{share.username}}</p>
        </div>
        <v-spacer></v-spacer>
          <country-flag :country= 'share.s_student_country' size='small'/>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
    export default {
      name: 'StudentsCard',
      props: {
        //artist: Object,
        share: Object
      },
      components:{
         CountryFlag
      },
      computed: {
        ...mapGetters([ 'userHasPortfolio'])
      },
      
      
    }
</script>

