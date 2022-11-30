<template>
    <v-hover v-slot:default="{ hover }">
      <v-card 
        data-view v-show="workshop"
        :elevation="hover ? 6 : 0"
        class="transition-swing ma-md-2 ma-1"
        outlined
        :width="card_width" 
        :max-height="card_height"
        @click="workshopDialog=true"
      >
      {{workshop}}
        <!-- <v-img
          v-if = workshop.workshop.poster 
          :src = "workshop.workshop.poster" 
          :height="img_height"
          :width="card_width">
          <v-btn icon small class="float-right ma-1 white" 
          @click.stop="goToWorkshop">
          <v-icon color="black" small>mdi-calendar-heart</v-icon>
          </v-btn>
          <v-btn v-if="isAuthenticated && workshop.username == loggedInUser.username" icon small class="float-right ma-1 white" 
          @click.stop="addToJourney">
          <v-icon color="black" small>mdi-plus</v-icon>
          </v-btn>
          </v-img>
        <v-img
          v-else :src="require('@/assets/gebbleslogo3.png')"
          contain
          :height="img_height"
          :width="card_width">
          <v-btn icon small class="float-right ma-1 white" 
          @click.stop="goToWorkshop">
          <v-icon color="black" small>mdi-calendar-heart</v-icon>
          </v-btn>
          <v-btn v-if="isAuthenticated && workshop.username == loggedInUser.username" icon small class="float-right ma-1 white" 
          @click.stop="addToJourney">
          <v-icon color="black" small>mdi-plus</v-icon>
          </v-btn>
        </v-img>
        <v-card-actions height="32px">
          <div v-if="workshop.workshop.title" class="text-decoration-none caption width">
          <p class="event_p" >{{ workshop.workshop.title }} </p>
          </div>
          <v-spacer></v-spacer>
          <country-flag size=small  :country= 'workshop.workshop.country' />
        </v-card-actions> -->
        <v-dialog
          :retain-focus="false"
          v-model="workshopDialog"
          width="480px" 
          persistent>
          {{workshop}}
          <v-container class="rounded-lg white pa-4">
            <v-row align="end" justify="end" class="pa-0 ma-0" >
            <v-btn icon  color="error" class="float-right" @click="workshopDialog =false; ">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-row>
          <div v-if="workshop.workshop" >
          <v-img class="my-4 mx-auto" v-if="workshop.workshop.poster" max-height="400px" contain :src="workshop.workshop.poster">
            <v-btn icon small class="float-right ma-2 ml-0 white" 
            @click.stop="goToWorkshop">
            <v-icon color="black" small>mdi-calendar-heart</v-icon>
            </v-btn>
            <v-btn v-if="isAuthenticated && workshop.username == loggedInUser.username" icon small class="float-right ma-2 ml-0 white" 
            @click.stop="addToJourney">
            <v-icon color="black" small>mdi-plus</v-icon>
            </v-btn>
          </v-img>
          <h3 class="font-weight-medium d-inline">{{workshop.workshop.title}}</h3><span class="d-inline float-right "> <country-flag size='normal'  :country= 'workshop.workshop.country' /> </span>
          </div>
          </v-container>
      </v-dialog> 
      </v-card>
    </v-hover>
  </template>
  <script>
  import { mapGetters } from 'vuex'
  import CountryFlag from 'vue-country-flag'
      export default {
        head() {  //head function (a property of vue-meta), returns an object
        return {
            title: 'gebbles workshop',
            }
        },
        data(){
          return{
            workshopDialog:false
          }
        },
        name: 'WorkshopCardGoing',
        props: {
          workshop: Object
        },
        components: {
          CountryFlag
        },
        computed:{
          ...mapGetters(['loggedInUser' ,'isAuthenticated']),
          img_height () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 73
            case 'sm': return 73
            case 'md': return 134
            case 'lg': return 134
            case 'xl': return 134
          }
          },
          card_width () {
            switch (this.$vuetify.breakpoint.name) {
              case 'xs': return 110
              case 'sm': return 110
              case 'md': return 205
              case 'lg': return 205
              case 'xl': return 205
            }
          },
          card_height() {
            switch (this.$vuetify.breakpoint.name) {
              case 'xs': return 105
              case 'sm': return 105
              case 'md': return 205
              case 'lg': return 205
              case 'xl': return 205
            }
          }
        },
        methods:{
          addToJourney(){
            this.$router.push({
                name: 'create-journey',
                params: {workshop: this.workshop}
              });
          },
          goToWorkshop(){
            this.$router.push('/workshops/'+ this.workshop.workshop.uuid);
          }
        }
        }
  </script>
  <style scoped>
  
  .width{
      width: 177px;
      height: 1.7em;
      line-height: initial;
      overflow: hidden
    }
  .event_p{
    max-width:177px; 
    font-size:0.8rem!important;
  }
  @media only screen and (max-width: 960px) {
    .width{
    width: 80px;
    height: 1.3em;
    line-height: initial;
    overflow: hidden
  }
  .event_p{
    max-width:80px;
     font-size:0.6rem!important;
  }
  }
  </style>
  