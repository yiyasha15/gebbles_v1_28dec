<template>
    <v-app>
      <v-container class="pa-0">
      <v-row style="max-width: 670px; margin: auto;" class="hidden-sm-and-down">
        <v-col cols="12" md="8"  class="justify-center pa-1">
          <h2 class ="xs12 d-inline font-weight-light">Events</h2>
        </v-col>
        <v-col cols="12" md="4" class= "justify-end pa-1" >
          <v-text-field
            label="Show events by country"
            rounded
            solo
            prepend-inner-icon="mdi-magnify"
            v-model="search"
            @input="debounceSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row style="max-width: 357px; margin: auto;" class="hidden-md-and-up" >
        <v-col cols="12" md="8"  class="justify-center px-1">
          <h3 class ="xs12 d-inline font-weight-light">Events</h3>
        </v-col>
        <v-col cols="12" md="4" class= "justify-end pa-0" >
          <v-text-field
            label="Search events"
            rounded
            solo
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          @input="debounceSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-layout wrap row justify-start v-if="firstLoad" class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-if="firstLoad" class="hidden-sm-and-down" style="max-width: 670px; margin:auto;">
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;"  width="215" max-height="185" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
        <div v-for="event in events" :key ="event.index">
          <events-card :event="event" ></events-card> 
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-sm-and-down" style="max-width: 670px; margin:auto;">
        <div v-for="event in events" :key ="event.index">
          <events-card-desktop :event="event" ></events-card-desktop> 
        </div>
      </v-layout>
      <v-card v-intersect="infiniteScrolling"></v-card>
      <center v-if="!events && !firstLoad">
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
import EventsCardDesktop from '@/components/EventsCardDesktop.vue'
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
              'Gebbles community'
        }
      ]
    }
  },
  created(){
    this.getEvents();
  },
  methods:{
    async getEvents(){
      try {
      const response = await EventService.getEvents()
      console.log(response);
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
    debounceSearch() {
    // this.firstLoad = true
    // this.events=[]
    //   clearTimeout(this.debounce)
    //   this.debounce = setTimeout(() => {
    //   if(this.search){EventService.getSearchedArtist(this.search).then((value) => {
    //   this.firstLoad = false
    //   this.events = value.data
    //   });}
    //   else{
    //     this.getevents();
    //   }
    //   }, 600)
    },
  },
  components: {
      EventsCard, EventsCardDesktop

  },
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      events:[],
      search: "",
      debounce: null
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    // filterApi: function(){
    //   return this.events.filter((event) => {
    //     return event.country.toLowerCase().match(this.search.toLowerCase())||event.country.toLowerCase().match(this.search.toLowerCase());
    //   });
    // }
  },
}
</script>
