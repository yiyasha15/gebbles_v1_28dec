<template>
<div>
  <v-hover v-slot:default="{ hover }">
    <v-card 
      data-view
      @click="dialog = true"
      :elevation="hover ? 12 : 0"
      outlined
      width="100"
      height="100"
      class="pa-0" style="margin:2px"
    >
      <v-img gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        v-if ="guest.photo && guest.photo!='undefined'" :src = "guest.photo" 
        height="100"
        width="100">
        <v-btn style="background:white" icon small class="float-right ma-1" @click.stop="$emit('editGuest',guest)">
        <v-icon color="black" small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn style="background:white" icon small class="float-right ma-1" @click.stop="$emit('removeGuest',guest)">
        <v-icon color="error" small>mdi-close</v-icon>
        </v-btn>
        <div class="text-center">
        <p style="height:45px; overflow:hidden;" class="font-weight-medium white--text mt-md-24 mt-10 pb-0  ">{{guest.name}}</p>
      </div>
      </v-img>
      <v-img gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
         v-else
        height="100"
        width="100">
        <v-btn style="background:white" icon small class="float-right ma-1" @click.stop="$emit('editGuest',guest)">
        <v-icon color="black" small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn style="background:white" icon small class="float-right ma-1" @click.stop="$emit('removeGuest',guest)">
        <v-icon color="error" small>mdi-close</v-icon>
        </v-btn>
      <div class="text-center">
        <p style="height:45px; overflow:hidden;" class="font-weight-medium white--text mt-md-24 mt-10 pb-0  ">{{guest.name}}</p>
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
  }
</script>

