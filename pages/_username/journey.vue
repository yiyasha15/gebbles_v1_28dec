<template>
    <v-app>
        <left-navigation></left-navigation>
        <v-container style="max-width:670px;" class="pa-0 background">
            <div v-show="!journeyLoaded">
                <div v-if=" journey.length"> 
                <!-- <v-btn icon class="elevation-0 mt-1 " @click="goback()" style="margin-left:-6px">
                    <v-icon class="float-left">mdi-arrow-left</v-icon>
                </v-btn> -->
                <div class="d-flex mx-3" v-if="artist.username == loggedInUser.username">
                    <v-btn icon class="elevation-0 mt-1 " @click="goback()" style="margin-left:-6px">
                        <v-icon class="float-left">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon class="elevation-0 mt-1" @click="filterJourneyByEvents" >
                    <v-icon size="20">mdi-calendar</v-icon>
                    </v-btn>
                    <v-btn icon class="elevation-0 mt-1" @click="filterPrivate">
                        <v-icon size="20" >mdi-lock</v-icon>
                    </v-btn>
                </div>
                <div v-if="journey.length && showJourney">
                    <v-layout wrap row justify-start class="mx-auto width background pt-3">
                        <div v-for="journey in journey" :key ="journey.index">
                            <journey-card :journey = "journey" v-if="!journey.ishighlight" ></journey-card>
                        </div>
                    </v-layout>
                <v-card v-intersect="infiniteScrollingJourney"></v-card>
                </div>
                <div v-if="showPrivate">
                    <v-layout wrap row justify-start class="mx-auto width background pt-3">
                        <div v-for="journey in journey" :key ="journey.index">
                            <journey-card :journey = "journey" v-if="journey.isprivate" ></journey-card>
                        </div>
                    </v-layout>
                <v-card v-intersect="infiniteScrollingJourney"></v-card>
                </div>
                <div v-if="showEventsJourney">
                    <v-layout wrap row justify-start class="mx-auto width background pt-3">
                        <div v-for="journey in journey" :key ="journey.index">
                            <journey-card :journey = "journey" v-if="journey.event" ></journey-card>
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
                        :src="require('@/assets/gebbleslogo_tab.png')"/>
                        <h3>No posts yet. </h3>
                    </center>
                </div>
            </div>
            <div v-if="journeyLoaded">
                <v-layout wrap row justify-start class="mx-auto width background" style="margin:8px 0px;">
                <div v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                </div>
                </v-layout>
            </div>
        </v-container>
    </v-app>
</template>
<script>
import { mapGetters} from 'vuex'
import JourneyCard from "@/components/JourneyCard.vue"
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
import LeftNavigation from '~/components/LeftNavigation.vue'
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
        JourneyCard,
        CardSkeletonLoader,
        LeftNavigation,
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser',
     'journey','highlights', 
     'journeyLoaded'
     ])
    },
    props: ["artist"],
    created(){
        this.getJourneyApi(this.artist.username);
    },
    data() {
        return {
        // journeyLoaded:true,
        search: "",
        pageGoing:null,
        pageHighlights:null,
        pageJourney:null,
        filteredJourneyByEventArray:[],
        filteredJourneyByPrivate:[],
        showEventsJourney:false,
        showPrivate:false,
        showJourney:true,
        // pageUpcoming:null,
        // highlights:[],
        // journey:[],
        // upcoming:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        page:'',
        firstLoad:true,
        }
    },
    methods: {
    filterJourneyByEvents(){
        this.showJourney = this.showEventsJourney 
        this.showPrivate = false
        this.showEventsJourney = !this.showEventsJourney
        this.filteredJourneyByEventArray = this.journey.filter(journey => journey.event !="" && journey.event != null);
    },
    filterPrivate(){
        this.showJourney = this.showPrivate
        this.showPrivate = !this.showPrivate
        this.showEventsJourney = false
        this.filteredJourneyByPrivate = this.journey.filter(journey => journey.isprivate == true);
    },
    async getJourneyApi(username){
        this.$store.dispatch("remove_journey");
        this.$store.dispatch("check_user_journey", username)
    // try {
    //     let config;
    //     if(this.isAuthenticated &&this.$store.state.auth.user.username == params.username)
    //     {config = {
    //     headers: {"content-type": "multipart/form-data",
    //         "Authorization": this.$auth.strategy.token.get()}
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
    // infiniteScrollingUpcoming(entries, observer, isIntersecting) {
    //     this.$store.dispatch("update_user_upcoming")
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
    // },
    // infiniteScrollingHighlights(entries, observer, isIntersecting) {
    //     this.$store.dispatch("update_user_highlights")
    //     // if(this.pageHighlights)
    //     // { 
    //     //     const key = 'id';
    //     //     this.$axios.get(this.pageHighlights).then(response => {
    //     //     this.pageHighlights= response.data.next;
    //     //     response.data.results.forEach(item => this.highlights.push(item));
    //     //     // filter array so no duplicates
    //     //     this.highlights = [...new Map(this.highlights.map(item =>
    //     //         [item[key], item])).values()];
            
    //     // })
    //     //     .catch(err => {
    //     //         console.log(err);
    //     //     });
    //     // }
    // },
    goback(){
        window.history.back();
    },
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