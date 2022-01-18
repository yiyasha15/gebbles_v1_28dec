<template>
<v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-1"
      data-view
      :to="'/e1t1/' + share.id" 
      :elevation="hover ? 12 : 0"
      outlined
      min-width="92" 
      max-height="92">
          <div v-for = "artist in artists" :key = "artist.index">
            <v-img v-if="share.username === artist.username"
              :src = "artist.thumb"
              height="60" width="92"/>
          </div>
          <v-card-actions height="32px">
          <div width="70" class="text-decoration-none caption" style=" height: 1.4em;
            line-height: initial;
            overflow: hidden">
          <p style="max-width:60px;">{{share.username}}</p>
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

