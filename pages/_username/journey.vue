<template>
    <v-app>
        <v-container v-show="!firstLoad" style="max-width:1185px;">
            <div v-if="isAuthenticated && loggedInUser.user.username==artist.username">
                <h3 class="font-weight-light d-inline">Share your journey</h3>
                    <v-btn x-small icon outlined color="black" class="ml-2" @click="createJourney"> 
                        <v-icon >mdi-plus</v-icon>
                    </v-btn>
            </div>
            <div v-if="upcoming.length || journey.length || highlights.length"> 
                <!-- check if journey is available -->
                <div v-if="upcoming.length">
                <div class="my-4">
                <h3 class="font-weight-light">Upcoming events</h3>
                </div>
                    <v-layout wrap row justify-center class="my-2" >
                        <div v-for="journey in upcoming" :key ="journey.index">
                            <journey-card :journey = "journey" ></journey-card>
                        </div>
                    </v-layout>
                    <v-card v-intersect="infiniteScrollingUpcoming"></v-card>
                </div>
                <div v-if="highlights.length">
                <div class="my-4" >
                <h3 class="font-weight-light">Highlights</h3>
                </div>
                    <v-layout wrap row justify-center class="my-2" >
                        <div v-for="journey in highlights" :key ="journey.index">
                            <journey-card :journey = "journey" ></journey-card>
                        </div>
                    </v-layout>
                    <v-card v-intersect="infiniteScrollingHighlights"></v-card>
                </div>
                <div v-if="journey.length">
                <div class="my-4">
                    <h3 class="font-weight-light">Journey</h3>
                </div>
                    <v-layout wrap row justify-center class="my-2" >
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
        <v-container v-if="firstLoad" style="max-width:1185px;">
                <div class="my-4">
                <h3 class="font-weight-light">Journey</h3>
                </div>
                <v-layout wrap row class="my-2" justify-center>
                    <div v-for="n in this.looploader" :key ="n.index">
                        <v-flex sm6 xs6> 
                        <v-skeleton-loader class="ma-1" width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
                        </v-flex>
                    </div>
                </v-layout>
        </v-container>
    </v-app>
</template>
<script>
import { mapGetters} from 'vuex'
import EventService from '@/services/EventService.js'
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
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    },
    props: ["artist"],
    created(){
        // if user is checking own journey, calling from store
        // if(this.isAuthenticated &&this.$store.state.auth.user.user.username == this.$route.params.username)
        // {
        //     this.getStoreJourney();
        // }else
        // {
            this.getJourneyApi(this.$route.params);
        // }
    },
    data() {
        return {
        search: "",
        pageHighlights:null,
        pageJourney:null,
        pageUpcoming:null,
        highlights:[],
        journey:[],
        upcoming:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        loading: true,
        firstLoad: true,
        }
    },
    methods: {
    async getJourneyApi(params){
        try {
            let config;
            if(this.isAuthenticated &&this.$store.state.auth.user.user.username == this.$route.params.username)
            {config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
            };}
        let journey_response = await EventService.getJourney(params.username,config)
        let upcoming_response = await EventService.getUpcoming(params.username,config)
        let highlights_response = await EventService.getHighlights(params.username,config)
        this.journey= journey_response.data.results;
        this.upcoming= upcoming_response.data.results;
        this.highlights= highlights_response.data.results;
        this.pageJourney = journey_response.data.next;
        this.pageUpcoming = upcoming_response.data.next;
        this.pageHighlights = highlights_response.data.next;
        this.firstLoad = false
        } catch (err) {
            console.log(err);
        }
    },
    // getStoreJourney(){
    //     this.firstLoad = false
    //     console.log("checking store..");
    // },
    infiniteScrollingJourney(entries, observer, isIntersecting) {
        // if(this.isAuthenticated && this.$store.state.auth.user.user.username == this.$route.params.username){
        //     console.log("check store on scroll..");
        //     this.$store.dispatch("update_user_journey");
        // }
        // else{
        if(this.pageJourney)
        { 
            const key = 'id';
            this.$axios.get(this.pageJourney).then(response => {
            this.pageJourney= response.data.next;
            response.data.results.forEach(item => this.journey.push(item));
            // filter array so no duplicates
            this.journey = [...new Map(this.journey.map(item =>
                [item[key], item])).values()];
            
        })
            .catch(err => {
                console.log(err);
            });
        }
        // }
    },
    infiniteScrollingUpcoming(entries, observer, isIntersecting) {
        if(this.pageUpcoming)
        { 
            const key = 'id';
            this.$axios.get(this.pageUpcoming).then(response => {
            this.pageUpcoming= response.data.next;
            response.data.results.forEach(item => this.upcoming.push(item));
            // filter array so no duplicates
            this.upcoming = [...new Map(this.upcoming.map(item =>
            [item[key], item])).values()];
        })
            .catch(err => {
                console.log(err);
            });
        }
    },
    infiniteScrollingHighlights(entries, observer, isIntersecting) {
        if(this.pageHighlights)
        { 
            const key = 'id';
            this.$axios.get(this.pageHighlights).then(response => {
            this.pageHighlights= response.data.next;
            response.data.results.forEach(item => this.highlights.push(item));
            // filter array so no duplicates
            this.highlights = [...new Map(this.highlights.map(item =>
                [item[key], item])).values()];
            
        })
            .catch(err => {
                console.log(err);
            });
        }
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