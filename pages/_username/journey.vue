<template>
    <v-app>
        <v-container class="pa-0" v-show="!journeyLoaded" style="max-width:670px;">
        <!-- <div v-if="isAuthenticated && loggedInUser.user.username==artist.username" class="my-4 hidden-sm-and-down">
            <h3 class="d-inline pl-2 font-weight-medium">Share your journey</h3>
            <v-btn x-small icon outlined color="black" class="ml-2" @click="createJourney"> 
                <v-icon >mdi-plus</v-icon>
            </v-btn>
        </div>
        <div v-if="isAuthenticated && loggedInUser.user.username==artist.username" class="my-4 hidden-md-and-up"
        style="max-width:357px; margin:auto;">
            <h3 class="d-inline pl-2 font-weight-medium">Share your journey</h3>
            <v-btn x-small icon outlined color="black" class="ml-2" @click="createJourney"> 
                <v-icon >mdi-plus</v-icon>
            </v-btn>
        </div> -->
        <div v-if="upcoming.length || journey.length || highlights.length"> 
        <!-- check if journey is available -->
        <div v-if="upcoming.length">
        <div class="my-4">
        <h3 class="font-weight-light pl-2 hidden-md-and-up" style="max-width:357px; margin:auto;">Upcoming events</h3>
        <h3 class="font-weight-light pl-2 hidden-sm-and-down" style="max-width:670px; margin:auto;">Upcoming events</h3>
        </div>
        <v-layout wrap row justify-start class="my-2 hidden-md-and-up" style="max-width:357px; margin:auto;">
            <div v-for="journey in upcoming" :key ="journey.index">
                <journey-card :journey = "journey" ></journey-card>
            </div>
        </v-layout>
        <v-layout wrap row justify-start class="my-2 hidden-sm-and-down" style="max-width: 670px; margin:auto;" >
            <div v-for="journey in upcoming" :key ="journey.index">
                <journey-card-desktop :journey = "journey" ></journey-card-desktop>
            </div>
        </v-layout>
        <v-card v-intersect="infiniteScrollingUpcoming"></v-card>
        </div>
        <div v-if="highlights.length">
        <div class="my-4" >
        <h3 class="font-weight-light pl-2 hidden-md-and-up" style="max-width:357px; margin:auto;">Highlights</h3>
        <h3 class="font-weight-light pl-2 hidden-sm-and-down" style="max-width:670px; margin:auto;">Highlights</h3>
        
        </div>
        <v-layout wrap row justify-start class="my-2 hidden-md-and-up" style="max-width:357px; margin:auto;" >
            <div v-for="journey in highlights" :key ="journey.index">
                <journey-card :journey = "journey" ></journey-card>
            </div>
        </v-layout>
        <v-layout wrap row justify-start class="my-2 hidden-sm-and-down" style="max-width: 670px; margin:auto;" >
            <div v-for="journey in highlights" :key ="journey.index">
                <journey-card-desktop :journey = "journey" ></journey-card-desktop>
            </div>
        </v-layout>
        <v-card v-intersect="infiniteScrollingHighlights"></v-card>
        </div>
        <div v-if="journey.length">
        <div class="my-4">
        <h3 class="font-weight-light pl-2 hidden-md-and-up" style="max-width:357px; margin:auto;">Journey</h3>
        <h3 class="font-weight-light pl-2 hidden-sm-and-down" style="max-width:670px; margin:auto;">Journey</h3>
        </div>
            <v-layout wrap row justify-start class="my-2 hidden-md-and-up" style="max-width:357px; margin:auto;">
                <div v-for="journey in journey" :key ="journey.index">
                    <journey-card :journey = "journey" ></journey-card>
                </div>
            </v-layout>
            <v-layout wrap row justify-start class="my-2 hidden-sm-and-down" style="max-width: 670px; margin:auto;" >
                <div v-for="journey in journey" :key ="journey.index">
                    <journey-card-desktop :journey = "journey" ></journey-card-desktop>
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
        <h3 class="font-weight-light pl-2 hidden-md-and-up" style="max-width:357px; margin:auto;">Journey</h3>
        <h3 class="font-weight-light pl-2 hidden-sm-and-down" style="max-width:670px; margin:auto;">Journey</h3>
        </div>
            <v-layout wrap row justify-start class="my-2 hidden-md-and-up" style="max-width:357px; margin:auto;">
                <div v-for="n in this.looploader" :key ="n.index">
                        <v-skeleton-loader style="margin:2px" width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
                    </div>
            </v-layout>
            <v-layout wrap row justify-start class="my-2 hidden-sm-and-down" style="max-width: 670px; margin:auto;" >
                <div v-for="n in this.looploader" :key ="n.index">
                        <v-skeleton-loader style="margin:2px;" width="215" max-height="195" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
                    </div>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
import { mapGetters} from 'vuex'
// import EventService from '@/services/EventService.js'
import JourneyCard from "@/components/JourneyCard.vue"
import JourneyCardDesktop from "@/components/JourneyCardDesktop.vue"
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
        JourneyCard, JourneyCardDesktop
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'journey','upcoming','highlights', 'journeyLoaded']),
    },
    props: ["artist"],
    created(){
        this.getJourneyApi(this.$route.params);
    },
    data() {
        return {
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
    //     console.log(err);
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