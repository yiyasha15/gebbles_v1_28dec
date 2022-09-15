<template>
    <v-app>
      <v-container class="pa-0 mt-4 mt-md-8" >
      <v-row class="mx-auto width">
        <v-col cols="12" md="8"  class="justify-center">
          <h3 class ="font-weight-light">Organised events</h3>
        </v-col>
      </v-row>
      <v-layout wrap row justify-start v-if="firstLoad" class=" mx-auto width">
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;" :width="cardwidth" :max-height="cardheight" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class=" mx-auto width" >
        <div v-for="event in events" :key ="event.index">
          <events-card :event="event" ></events-card> 
        </div>
      </v-layout>
      <v-card v-intersect="infiniteScrolling"></v-card>
      <center v-if="!events.length && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo.png')"/>
        <h3>No events found. </h3>
      </center>
      </v-container>
    </v-app>
</template>

<script>
import EventsCard from '@/components/EventsCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  scrollToTop: true,
  head() {  
    return {
      title: 'events',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'Gebbles - Events'
        }
      ]
    }
  },
  created(){
    if(this.isAuthenticated){
      this.getEvents();
    }
  },
  methods:{
    async getEvents(){
      try {
      const response = await EventService.getMyOrganizedEvents(this.loggedInUser.username)
      // console.log(response);
      this.events = response.data.results
      this.page = response.data.next
      this.firstLoad = false
    } catch (e) {
        console.log(e);
        this.firstLoad = false
    }
    },
    infiniteScrolling(entries, observer, isIntersecting) {
        if(this.page){
        const key = 'uuid';
        this.$axios.get(this.page).then(response => {
              this.page= response.data.next;
              response.data.results.forEach(item => this.events.push(item));
              // filter array so no duplicates
              this.events = [...new Map(this.events.map(item =>
                [item[key], item])).values()];
          })
          .catch(err => {
            console.log(err);
          });
        }
    },
  },
  components: {
      EventsCard

  },
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      events:[],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
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
  },
}
</script>
<style scoped>

.width{
    max-width: 670px;
  }
@media only screen and (max-width: 960px) {
  .width{
  max-width: 357px;
}
}
</style>
