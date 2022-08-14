<template>
<div>
  <v-hover v-slot:default="{ hover }">
    <v-card 
      data-view
      @click="opendialog"
      :elevation="hover ? 12 : 0"
      outlined
      :width="img_height"
      :height="img_height"
      class="pa-0 mx-auto"
    >
      <v-img 
        v-if = guest.photo :src = "guest.photo" 
        :height="img_height"
        :width="img_height">
        <!-- <div class="text-center">
          <h3 style="height:55px; overflow:hidden;" class="font-weight-medium px-2 white--text mt-15 hidden-sm-and-up" >{{guest.name}}</h3>
          <h3 style="height:55px; overflow:hidden; margin-top:100px" class="font-weight-medium px-6  white--text hidden-xs-only" >{{guest.name}}</h3>
        </div> -->
      </v-img>
      <v-img gradient="to top right, rgba(129,90,68,.33), rgba(98,71,56,.7)"
         v-else :src = "poster" 
        :height="img_height"
        :width="img_height">
      <div class="text-center">
        <h3 style="height:55px; overflow:hidden;" class="font-weight-medium px-2 white--text mt-15 hidden-sm-and-up" >{{guest.name}}</h3>
        <h3 style="height:55px; overflow:hidden; margin-top:120px" class="font-weight-medium px-6  white--text hidden-xs-only" >{{guest.name}}</h3>
      </div>
      </v-img>
    </v-card>
  </v-hover> 
    <v-dialog
        :retain-focus="false"
        v-model="dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white pa-4">
          <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon  color="error" class="float-right" @click="dialog =false; ">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
        <v-img class="my-4 mx-auto" v-if="guest.photo"  max-height="400px" contain :src="guest.photo"></v-img>
        <!-- {{guest}} -->
        <nuxt-link v-if="guest.guest && typeof guest.guest == 'object'" :to="'/' + guest.guest.username" class="primary--text text-decoration-none" > <h3 class="font-weight-medium d-inline">{{guest.name}}</h3></nuxt-link>
        <h3 v-else class="font-weight-medium  d-inline">{{guest.name}}</h3><span class="d-inline float-right "> <country-flag size='normal'  :country= 'guest.country' /> </span>
        <h4 class="font-weight-light mt-3 mt-md-5" >{{guest.info}}</h4>
        </v-container>
    </v-dialog> 
</div>
</template>
<script>
import CountryFlag from 'vue-country-flag'
  export default {
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'events guests',
        }
    },
    name: 'GuestCard',
    props: {
      guest: Object,
      poster: String
    },
    components: {
        CountryFlag
      },
    data(){
      return{
        dialog: false
      }
    },
    computed: {
    img_height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 185
        case 'sm': return 300
        case 'md': return 300
        case 'lg': return 300
        case 'xl': return 300
      }
    }
  },
    methods:{
      opendialog(){
        this.dialog = true
      },
    }
  }
</script>

