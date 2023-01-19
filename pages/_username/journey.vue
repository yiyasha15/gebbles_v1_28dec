<template>
    <v-app>
        <left-navigation></left-navigation>
        <v-container class="width background">
            <v-btn icon class="elevation-0 mb-3" @click="goback()" style="margin-left:-6px" v-if="artist.username != loggedInUser.username">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
            <div v-show="!journeyLoaded">
                <div v-if=" journey.length">
                <div class="d-flex mb-3" v-if="artist.username == loggedInUser.username">
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
                    <v-row>
                        <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="journey in journey" :key ="journey.index">
                            <journey-card :journey = "journey"></journey-card>
                        </v-col>
                    </v-row>
                <v-card v-intersect="infiniteScrollingJourney"></v-card>
                </div>
                <div v-if="showPrivate">
                    <v-row>
                        <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="journey in filterPri" :key ="journey.index">
                            <journey-card :journey = "journey"></journey-card>
                        </v-col>
                    </v-row>
                <v-card v-intersect="infiniteScrollingJourney"></v-card>
                </div>
                <div v-if="showEventsJourney">
                    <v-row>
                        <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="journey in filterEve" :key ="journey.index">
                            <journey-card :journey = "journey"></journey-card>
                        </v-col>
                    </v-row>
                <v-card v-intersect="infiniteScrollingJourney"></v-card>
                </div>
                </div>
                <div v-else>
                    <center>
                        <img
                        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                        class="ml-2 mt-6 clickable"
                        :src="require('@/assets/gebbleslogo_tab.png')"/>
                        <p class="grey--text mt-4">No posts found. </p>
                    </center>
                </div>
            </div>
            <v-row v-show="journeyLoaded">
            <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
            <card-skeleton-loader></card-skeleton-loader>
            </v-col>
        </v-row>
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
     ]),
    filterPri: function(){
        return this.journey.filter((jour) => {
        return jour.isprivate;
        });
    },
    filterEve: function(){
      return this.journey.filter((jour) => {
        return jour.event!= 'false' && jour.event;
      });
    }
    },
    props: ["artist"],
    // created(){
    //     this.getJourneyApi(params.username);
    // },
    async asyncData({ params, store}) {
        store.dispatch("remove_journey");
        store.dispatch("check_user_journey", params.username)
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
        this.filteredJourneyByEventArray = this.journey.filter(journey => journey.event != "" && journey.event != null && journey.event != 'false');
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
    max-width: 1070px;
  }
@media only screen and (max-width: 1900px) {
  .width{
  max-width: 670px;
}
}
</style>