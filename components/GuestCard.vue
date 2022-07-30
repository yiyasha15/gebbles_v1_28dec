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
    >
      <v-img gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        v-if = guest.photo :src = "guest.photo" 
        :height="img_height"
        :width="img_height">
      </v-img>
      <v-img gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
         v-else
        :height="img_height"
        :width="img_height">
      <div class="text-center">
        <h4 style="height:55px; overflow:hidden;" class="font-weight-light white--text mt-md-24 mt-6 hidden-xs-only">{{guest.name}}</h4>
        <p style="height:45px; overflow:hidden;" class="font-weight-light white--text mt-md-24 mt-7 pb-0  hidden-sm-and-up">{{guest.name}}</p>
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
        <v-img class="mt-4 mx-auto" v-if="guest.photo"  max-height="400px" contain :src="guest.photo"></v-img>

        <nuxt-link v-if="guest.username" :to="'/' + guest.username" class="primary text-decoration-none" > <h3 class="font-weight-light mt-2">{{guest.name}}</h3></nuxt-link>
        <h3 v-else class="font-weight-light mt-2">{{guest.name}}</h3>
        <h3 class="font-weight-light mt-2">{{guest.info}}</h3>
        </v-container>
    </v-dialog> 
</div>
</template>
<script>
  export default {
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'events guests',
        }
    },
    name: 'GuestCard',
    props: {
      guest: Object
    },
    
    data(){
      return{
        dialog: false
      }
    },
    computed: {
    img_height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 180
        case 'sm': return 200
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

