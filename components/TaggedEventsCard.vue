<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view v-show="event && event.event"
      :elevation="hover ? 12 : 0"
      outlined
      :width="cardwidth" 
      :max-height="cardheight"
      @click="eventDialog=true"
    >
      <v-img
        v-if = event.event.poster :src = "event.event.poster" 
        :lazy-src= "event.event.poster" 
        :height="img_height"
        :width="cardwidth">
        <v-btn style="background:white" icon small class="float-right ma-1" 
        @click.stop="goToEvent">
        <v-icon color="black" small>mdi-calendar-heart</v-icon>
        </v-btn>
        <v-btn v-if="isAuthenticated && event.guest == loggedInUser.user.username" style="background:white" icon small class="float-right ma-1" 
        @click.stop="addToJourney">
        <v-icon color="black" small>mdi-pencil-outline</v-icon>
        </v-btn>
        </v-img>
      <v-img
        v-else :src="require('@/assets/gebbleslogo3.png')"
        contain
        :height="img_height"
        :width="cardwidth">
        <v-btn style="background:white" icon small class="float-right ma-1" 
        @click.stop="goToEvent">
        <v-icon color="black" small>mdi-calendar-heart</v-icon>
        </v-btn>
        <v-btn v-if="isAuthenticated && event.guest == loggedInUser.user.username" style="background:white" icon small class="float-right ma-1" 
        @click.stop="addToJourney">
        <v-icon color="black" small>mdi-pencil-outline</v-icon>
        </v-btn>
      </v-img>
      <v-card-actions height="32px">
        <div v-if="event.event.name" class="text-decoration-none caption width">
        <p class="event_p" >{{ event.event.name }} </p>
        </div>
        <v-spacer></v-spacer>
        <country-flag size=small  :country= 'event.event.country' />
      </v-card-actions>
      <v-dialog
        :retain-focus="false"
        v-model="eventDialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white pa-4">
          <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon  color="error" class="float-right" @click="eventDialog =false; ">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
          <!-- {{event}} -->
        <div v-if="event.event" >
        <v-img class="my-4 mx-auto" v-if="event.event.poster" max-height="400px" contain :src="event.event.poster">
          <v-btn style="background:white" icon small class="float-right ma-2 ml-0" 
          @click.stop="goToEvent">
          <v-icon color="black" small>mdi-calendar-heart</v-icon>
          </v-btn>
          <v-btn v-if="isAuthenticated && event.guest == loggedInUser.user.username" style="background:white" icon small class="float-right ma-2 ml-0" 
          @click.stop="addToJourney">
          <v-icon color="black" small>mdi-pencil-outline</v-icon>
          </v-btn>
        </v-img>
        <h3 class="font-weight-medium  d-inline">{{event.event.name}}</h3><span class="d-inline float-right "> <country-flag size='normal'  :country= 'event.event.country' /> </span>
        </div>
        <v-img class="my-4 mx-auto" v-if="event.photo" max-height="400px" contain :src="event.photo"></v-img>
         <h3 class="font-weight-medium  d-inline">{{event.guest}}</h3><span class="d-inline float-right "> <country-flag size='normal'  :country= 'event.country' /> </span>
         <h4 class="font-weight-light mt-3 mt-md-5" >{{event.info}}</h4>
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
          title: 'gebbles event',
          }
      },
      data(){
        return{
          eventDialog:false
        }
      },
      name: 'TaggedEventCard',
      props: {
        event: Object
      },
      components: {
        CountryFlag
      },
      computed:{
        ...mapGetters(['loggedInUser' ,'isAuthenticated']),
        cardheight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 105
          case 'sm': return 105
          case 'md': return 205
          case 'lg': return 205
          case 'xl': return 205
        }
        },
        cardwidth () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 115
            case 'sm': return 115
            case 'md': return 215
            case 'lg': return 215
            case 'xl': return 215
          }
        },
        img_height () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 73
            case 'sm': return 73
            case 'md': return 134
            case 'lg': return 134
            case 'xl': return 134
          }
        },
      },
      methods:{
        addToJourney(){
          this.$router.push({
              name: 'create-journey',
              params: {event: this.event}
            });
        },
        goToEvent(){
          this.$router.push('/events/'+ this.event.event.uuid);
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
