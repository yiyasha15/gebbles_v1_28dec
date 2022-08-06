<template>
    <v-app>
        <v-container class="pa-0" v-show="!journeyLoaded" style="max-width:670px;">
        <div v-if="upcoming.length || journey.length || highlights.length"> 
        <!-- check if journey is available -->
        <div v-if="upcoming.length">
        <div class="my-4">
        <h3 class="font-weight-light pl-2 mx-auto width" >Upcoming events</h3>
        </div>
        <v-layout wrap row justify-start class="my-2 mx-auto width">
            <div v-for="journey in upcoming" :key ="journey.index">
                <journey-card :journey = "journey" ></journey-card>
            </div>
        </v-layout>
        <v-card v-intersect="infiniteScrollingUpcoming"></v-card>
        </div>
        <div v-if="highlights.length">
        <div class="my-4" >
        <h3 class="font-weight-light pl-2 mx-auto width" >Highlights</h3>
        </div>
        <v-layout wrap row justify-start class="my-2 mx-auto width">
            <div v-for="journey in highlights" :key ="journey.index">
                <journey-card :journey = "journey" ></journey-card>
            </div>
        </v-layout>
        <v-card v-intersect="infiniteScrollingHighlights"></v-card>
        </div>
        <div v-if="journey.length">
        <div class="my-4">
        <h3 class="font-weight-light pl-2 mx-auto width" >Journey</h3>
        </div>
            <v-layout wrap row justify-start class="my-2 mx-auto width">
                <div v-for="journey in journey" :key ="journey.index">
                    <journey-card :journey = "journey" ></journey-card>
                </div>
            </v-layout>
            <v-card v-intersect="infiniteScrollingJourney"></v-card>
        </div>
        </div>
        <div v-else>
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h3>No posts yet. </h3>
            </center>
        </div>
        </v-container>
        <v-container v-if="journeyLoaded" class="pa-0" style="max-width:670px;">
            <div class="my-4">
            <h3 class="font-weight-light pl-2 mx-auto width">Journey</h3>
            </div>
            <v-layout wrap row justify-start class="mx-auto width" >
            <div v-for="n in this.looploader" :key ="n.index">
                <v-skeleton-loader style="margin:2px;" :width="cardwidth" :max-height="cardheight" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
            </div>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
import { mapGetters} from 'vuex'
import JourneyCard from "@/components/JourneyCard.vue"
export default {
    head() {
        return {
        title: this.artist.username,     //do not miss "this"
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'What you need to know about this artist #' + this.artist.name
            }
        ]
        }
    },
    components:{
        JourneyCard
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser',
     'journey','upcoming','highlights', 
     'journeyLoaded'
     ]),
     cardheight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 105
          case 'sm': return 105
          case 'md': return 185
          case 'lg': return 185
          case 'xl': return 185
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
    props: ["artist"],
    created(){
        this.getJourneyApi(this.$route.params);
    },
    data() {
        return {
        // journeyLoaded:true,
        search: "",
        pageHighlights:null,
        pageJourney:null,
        pageUpcoming:null,
        // highlights:[],
        // journey:[],
        // upcoming:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        loading: true,
        }
    },
    methods: {
    async getJourneyApi(params){
        this.$store.dispatch("remove_journey");
        this.$store.dispatch("check_user_journey", params.username)
    // try {
    //     let config;
    //     if(this.isAuthenticated &&this.$store.state.auth.user.user.username == params.username)
    //     {config = {
    //     headers: {"content-type": "multipart/form-data",
    //         "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
    //     };}
    //     let journey_response = await EventService.getJourney(params.username,config)
    //     let upcoming_response = await EventService.getUpcoming(params.username,config)
    //     let highlights_response = await EventService.getHighlights(params.username,config)
    //     this.journey= journey_response.data.results;
    //     this.upcoming= upcoming_response.data.results;
    //     this.highlights= highlights_response.data.results;
    //     this.pageJourney = journey_response.data.next;
    //     this.pageUpcoming = upcoming_response.data.next;
    //     this.pageHighlights = highlights_response.data.next;
    //     this.journeyLoaded = false
    // } catch (err) {
    //     console.log(err.response);
    // }
    },
    infiniteScrollingJourney(entries, observer, isIntersecting) {
        this.$store.dispatch("update_user_journey")
        // if(this.pageJourney)
        // { 
        //     const key = 'id';
        //     this.$axios.get(this.pageJourney).then(response => {
        //     this.pageJourney= response.data.next;
        //     response.data.results.forEach(item => this.journey.push(item));
        //     // filter array so no duplicates
        //     this.journey = [...new Map(this.journey.map(item =>
        //         [item[key], item])).values()];
            
        // })
        //     .catch(err => {
        //         console.log(err);
        //     });
        // }
    },
    infiniteScrollingUpcoming(entries, observer, isIntersecting) {
        this.$store.dispatch("update_user_upcoming")
        // if(this.pageUpcoming)
        // { 
        //     const key = 'id';
        //     this.$axios.get(this.pageUpcoming).then(response => {
        //     this.pageUpcoming= response.data.next;
        //     response.data.results.forEach(item => this.upcoming.push(item));
        //     // filter array so no duplicates
        //     this.upcoming = [...new Map(this.upcoming.map(item =>
        //     [item[key], item])).values()];
        // })
        //     .catch(err => {
        //         console.log(err);
        //     });
        // }
    },
    infiniteScrollingHighlights(entries, observer, isIntersecting) {
        this.$store.dispatch("update_user_highlights")
        // if(this.pageHighlights)
        // { 
        //     const key = 'id';
        //     this.$axios.get(this.pageHighlights).then(response => {
        //     this.pageHighlights= response.data.next;
        //     response.data.results.forEach(item => this.highlights.push(item));
        //     // filter array so no duplicates
        //     this.highlights = [...new Map(this.highlights.map(item =>
        //         [item[key], item])).values()];
            
        // })
        //     .catch(err => {
        //         console.log(err);
        //     });
        // }
    },
    goback(){
        window.history.back();
    },
    createJourney(){
        this.$store.dispatch("remove_editing_obj");
        this.$router.push("/create/journey");
    }
    }
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