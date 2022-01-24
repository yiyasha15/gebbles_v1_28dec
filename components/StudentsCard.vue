<template>
<v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-1"
      data-view
      :to="'/e1t1/' + share.id" 
      :elevation="hover ? 12 : 0"
      outlined
      min-width="96" 
      max-height="96">
          <div v-for = "artist in artists" :key = "artist.index">
            <v-img v-if="share.username === artist.username"
              :src = "artist.thumb"
              height="60" width="96"/>
          </div>
          <v-card-actions  max-height="32px" class="pa-1">
          <div width="80" class="text-decoration-none caption" style=" height: 1em;
            line-height: initial;
            overflow: hidden">
          <p style="max-width:72px; font-size:0.5rem!important;">{{share.username}}</p>
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
        ...mapGetters(['artists', 'userHasPortfolio'])
      },
      
      
    }
</script>

