<template>
  <v-hover v-slot:default="{ hover }">
    <v-card 
      data-view v-show="event && event.event"
      :elevation="hover ? 6 : 0"
      class="transition-swing"
      outlined
      @click="eventDialog=true"
    >
      <v-img
        v-if = event.event.poster :src = "event.event.poster" 
        :lazy-src= "event.event.poster" 
        :height="img_height">
        <v-btn icon small class="float-right ma-1 white" 
        @click.stop="goToEvent">
        <v-icon color="black" small>mdi-calendar-heart</v-icon>
        </v-btn>
        <v-btn v-if="isAuthenticated && event.username == loggedInUser.username" icon small class="float-right ma-1 white" 
        @click.stop="addToJourney">
        <v-icon color="black" small>mdi-plus</v-icon>
        </v-btn>
        </v-img>
      <v-img
        v-else :src="require('@/assets/gebbleslogo3.png')"
        contain
        :height="img_height">
        <v-btn icon small class="float-right ma-1 white" 
        @click.stop="goToEvent">
        <v-icon color="black" small>mdi-calendar-heart</v-icon>
        </v-btn>
        <v-btn v-if="isAuthenticated && event.username == loggedInUser.username" icon small class="float-right ma-1 white" 
        @click.stop="addToJourney">
        <v-icon color="black" small>mdi-plus</v-icon>
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
        <div v-if="event.event" >
        <v-img class="my-4 mx-auto" v-if="event.event.poster" max-height="400px" contain :src="event.event.poster">
          <v-btn icon small class="float-right ma-2 ml-0 white" 
          @click.stop="goToEvent">
          <v-icon color="black" small>mdi-calendar-heart</v-icon>
          </v-btn>
          <v-btn v-if="isAuthenticated && event.username == loggedInUser.username" icon small class="float-right ma-2 ml-0 white" 
          @click.stop="addToJourney">
          <v-icon color="black" small>mdi-plus</v-icon>
          </v-btn>
        </v-img>
        <h3 class="font-weight-medium d-inline">{{event.event.name}}</h3><span class="d-inline float-right "> <country-flag size='normal'  :country= 'event.event.country' /> </span>
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
          title: 'gebbles event',
          }
      },
      data(){
        return{
          eventDialog:false
        }
      },
      name: 'EventsCardGoing',
      props: {
        event: Object
      },
      components: {
        CountryFlag
      },
      computed:{
        ...mapGetters(['loggedInUser' ,'isAuthenticated']),
        img_height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 104
          case 'sm': return 134
          case 'md': return 134
          case 'lg': return 134
          case 'xl': return 184
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
