<template>
    <v-app>
        <v-tabs class="width mx-auto background" centered>
        <v-tab>
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Journey</p>
        </v-tab>
        <v-tab v-if="visitOwnPage">
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Invited Events</p>
        </v-tab>
        <v-tab v-if="visitOwnPage">
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Attending Events</p>
        </v-tab>
        <v-tab-item>
            <v-container class="pa-0 background" v-show="!journeyLoaded" style="max-width:670px;">
                <v-row>
                    <v-col class="text-right">
                        <v-btn icon @click="filterJourneyByEvents" small class="ma-2" >
                        <!-- <v-icon>mdi-filter-variant</v-icon> -->
                        <v-icon size="20">mdi-calendar-heart</v-icon>
                    </v-btn>
                    </v-col>
                </v-row>
                <div v-if="!showEventsJourney">
                    <div v-if=" journey.length || highlights.length"> 

                    <!-- check if journey is available -->
                    <div v-if="highlights.length">
                    <v-layout wrap row justify-start class="mx-auto width background pb-3">
                        <div v-for="journey in highlights" :key ="journey.index">
                            <journey-card :journey = "journey" ></journey-card>
                        </div>
                    </v-layout>
                    <v-card v-intersect="infiniteScrollingHighlights"></v-card>
                    </div>
                    <div v-if="journey.length">
                        <v-layout wrap row justify-start class="mx-auto width background pb-3">
                            <div v-for="journey in journey" :key ="journey.index">
                                <journey-card :journey = "journey" v-if="!journey.ishighlight" ></journey-card>
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
                <div v-else>
                    <div v-if="filteredJourneyByEventArray.length">
                        <v-layout wrap row justify-start class="mx-auto width background pb-3">
                            <div v-for="journey in filteredJourneyByEventArray" :key ="journey.index">
                                <journey-card :journey = "journey" ></journey-card>
                            </div>
                        </v-layout>
                    </div>
                </div>
            </v-container>
            <v-container v-if="journeyLoaded" class="pa-0" style="max-width:670px;">
            <v-layout wrap row justify-start class="mx-auto width background" style="margin:8px 0px;">
            <div v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
            </div>
            </v-layout>
            </v-container>
        </v-tab-item>
        <v-tab-item v-if="visitOwnPage">
            <div class="ml-1 py-2 grey--text caption text-center"><v-btn icon x-small outlined><v-icon x-small>mdi-plus</v-icon> </v-btn>  to add the invited events to your portfolio journey</div>
            <!-- tagged events -->
            <v-layout wrap row justify-start v-if="firstLoadTagged" class="pt-2 background">
                <div v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </div>
            </v-layout>
            <v-layout wrap row justify-start v-show="!firstLoadTagged" class=" mx-auto width pt-2 background" >
                <div v-for="event in taggedEvents" :key ="event.index">
                <tagged-events-card v-if="event.event" :event="event"></tagged-events-card>
                </div>
            </v-layout>
            <v-card v-intersect="infiniteScrollingTaggedEvents"></v-card>
            <center v-if="!taggedEvents.length && !firstLoadTagged" class="background">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h3>No events found. </h3>
            </center>
        </v-tab-item>
        <v-tab-item v-if="visitOwnPage">
            <div class="ml-1 py-2 grey--text caption text-center"><v-btn icon x-small outlined><v-icon x-small>mdi-plus</v-icon> </v-btn> to add the attended events to your journey</div>

            <v-layout wrap row justify-start v-if="firstLoadGoing" class="pt-2 background">
                <div v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </div>
            </v-layout>
            <v-layout wrap row justify-start v-show="!firstLoadGoing" class=" mx-auto width pt-2 background" >
                <div v-for="event in goingEvents" :key ="event.index">
                    <going-events-card v-if="event.event" :event="event"></going-events-card>
                </div>
            </v-layout>
            <v-card v-intersect="infiniteScrollingGoingEvents"></v-card>
            <center v-if="!goingEvents.length && !firstLoadGoing" class="background">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h3>No events found. </h3>
            </center>
        </v-tab-item>
        </v-tabs>
    </v-app>
</template>
<script>
import { mapGetters} from 'vuex'
import TaggedEventsCard from '@/components/TaggedEventsCard.vue'
import EventService from '@/services/EventService.js'
import JourneyCard from "@/components/JourneyCard.vue"
import GoingEventsCard from '~/components/GoingEventsCard.vue'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
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
        JourneyCard, TaggedEventsCard,
        GoingEventsCard,
        CardSkeletonLoader,
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser',
     'journey','highlights', 
     'journeyLoaded'
     ])
    },
    props: ["artist"],
    created(){
        this.getJourneyApi(this.$route.params);
        if(this.isAuthenticated && this.loggedInUser.username == this.$route.params.username)
        {
            this.visitOwnPage = true;
            this.getTaggedEvents();
            this.getGoingEvents();
        }
    },
    data() {
        return {
        // journeyLoaded:true,
        search: "",
        taggedEvents:[],
        goingEvents:[],
        pageGoing:null,
        pageHighlights:null,
        pageJourney:null,
        filteredJourneyByEventArray:[],
        showEventsJourney:false,
        // pageUpcoming:null,
        // highlights:[],
        // journey:[],
        // upcoming:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        page:'',
        firstLoad:true,
        firstLoadTagged:true,
        firstLoadGoing:true,
        seen: new Set(),
        seen2: new Set(),
        visitOwnPage:false,
        }
    },
    methods: {
    filterJourneyByEvents(){
        this.showEventsJourney = !this.showEventsJourney
        this.filteredJourneyByEventArray = this.journey.filter(journey => journey.event !="" && journey.event != null);
    },
    async getTaggedEvents(){
        try {
        const response = await EventService.getMyInvitedEvents(this.artist.username);
        // console.log(response);
        const taggedEvents = response.data.results
        //filter events which are duplicate
            // a Set to track seen events
            // const seen = new Set();
            this.taggedEvents = taggedEvents.filter(event => {
            // check if the current event is a duplicate
            let isDuplicate;
            if(event.event){isDuplicate= this.seen.has(event.event.uuid);
            // add the current event to the Set
            this.seen.add(event.event.uuid);}
            // filter() returns the event when isDuplicate is false
            return !isDuplicate;
            });
            // console.log(filtered);
        this.page = response.data.next
        this.firstLoadTagged = false
        } catch (e) {
            console.log(e);
            this.firstLoadTagged = false
        }
    },
    async getGoingEvents(){
        try {
        const response = await EventService.getMyGoingEvents(this.artist.username);
        // console.log(response);
        const goingEvents = response.data.results
        //filter events which are duplicate
            // a Set to track seen events
            // const seen = new Set();
            this.goingEvents = goingEvents.filter(event => {
            // check if the current event is a duplicate
            let isDuplicate;
            if(event.event){
                isDuplicate= this.seen2.has(event.event.uuid);
            // add the current event to the Set
            this.seen2.add(event.event.uuid);}
            // filter() returns the event when isDuplicate is false
            return !isDuplicate;
            });
            // console.log(filtered);
        this.pageGoing = response.data.next
        this.firstLoadGoing = false
        } catch (e) {
            console.log(e);
            this.firstLoadGoing = false
        }
    },
    async getJourneyApi(params){
        this.$store.dispatch("remove_journey");
        this.$store.dispatch("check_user_journey", params.username)
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
    infiniteScrollingTaggedEvents(entries, observer, isIntersecting) {
        if(this.page){
        const key = 'uuid';
        this.$axios.get(this.page).then(response => {
            this.page= response.data.next;

            let res = response.data.results
            //filter events which are duplicate
            // a Set to track seen events
            let taggedEventsPage = res.filter(event => {
            // check if the current event is a duplicate
            let isDuplicate;
            if(event.event)
            { isDuplicate= this.seen.has(event.event.uuid);
            // add the current event to the Set
            this.seen.add(event.event.uuid);
            }
            // filter() returns the event when isDuplicate is false
            return !isDuplicate;
            });
            taggedEventsPage.forEach(item => this.taggedEvents.push(item));
            this.taggedEvents = [...new Map(this.taggedEvents.map(item =>
            [item[key], item])).values()];
          })
          .catch(err => {
            console.log(err);
          });
        }
    },
    infiniteScrollingGoingEvents(entries, observer, isIntersecting) {
        if(this.pageGoing){
        const key = 'uuid';
        this.$axios.get(this.pageGoing).then(response => {
            this.pageGoing= response.data.next;

            let res = response.data.results
            //filter events which are duplicate
            // a Set to track seen events
            let goingEventsPage = res.filter(event => {
            // check if the current event is a duplicate
            let isDuplicate;
            if(event.event)
            { isDuplicate= this.seen2.has(event.event.uuid);
            // add the current event to the Set
            this.seen2.add(event.event.uuid);
            }
            // filter() returns the event when isDuplicate is false
            return !isDuplicate;
            });
            goingEventsPage.forEach(item => this.goingEvents.push(item));
            this.goingEvents = [...new Map(this.goingEvents.map(item =>
            [item[key], item])).values()];
          })
          .catch(err => {
            console.log(err);
          });
        }
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