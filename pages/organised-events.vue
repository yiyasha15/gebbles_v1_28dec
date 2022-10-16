<template>
    <v-app>
      <v-container class="mx-auto width">
          <h2 class ="mb-4 font-weight-medium">Organised events</h2>
      <v-layout wrap row justify-start v-if="firstLoad">
        <div v-for="n in this.looploader" :key ="n.index">
          <card-skeleton-loader></card-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad">
        <div v-for="event in events" :key ="event.index">
          <events-card :event="event" ></events-card> 
        </div>
      </v-layout>
      <v-card v-intersect="infiniteScrolling"></v-card>
      <center v-if="!events.length && !firstLoad" class="mt-3">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo_tab.png')"/>
        <h3>No events found. </h3>
        <p class="caption">A place for all the events you organise.</p>
      </center>
      </v-container>
    </v-app>
</template>

<script>
import EventsCard from '@/components/EventsCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
export default {
  scrollToTop: true,
  middleware : 'check_auth',
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
      this.getMyOrganizedEvents();
    }
  },
  methods:{
    async getMyOrganizedEvents(){
      try {
      const response = await EventService.getMyOrganizedEvents(this.loggedInUser.username)
      // console.log(response);
      this.events = response.data.results;
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
      EventsCard,
      CardSkeletonLoader

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
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
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
