<template>
    <v-app>
        <v-container v-show="!firstLoad">
            <div v-if="isAuthenticated && loggedInUser.user.username==artist.username">
                <h3 class="font-weight-light d-inline">Share your journey</h3>
                    <v-btn x-small icon outlined color="indigo" class="ml-2" @click="createJourney"> 
                        <v-icon >mdi-plus</v-icon>
                    </v-btn>
                <div v-if="usersUpcoming.length || usersJourney.length"> 
                    <!-- check if journey is available -->
                    <div v-if="usersUpcoming.length">
                    <div class="my-4">
                    <h3 class="font-weight-light d-inline">Upcoming events</h3>
                    </div>
                    <v-layout wrap row :class="{'my-2 justify-center': $vuetify.breakpoint.smAndDown, 'my-2': $vuetify.breakpoint.mdAndUp}" >
                        <div v-for="upcoming in usersUpcoming" :key ="upcoming.index">
                            <v-flex> 
                            <journey-card :journey = "upcoming" ></journey-card>
                            </v-flex>
                        </div>
                    </v-layout>
                    </div>
                    <div v-if="filteredUserHighlight.length">
                    <div class="my-4" >
                    <h3 class="font-weight-light">Highlights</h3>
                    </div>
                    <v-layout wrap row :class="{'my-2 justify-center': $vuetify.breakpoint.smAndDown, 'my-2': $vuetify.breakpoint.mdAndUp}">
                        <div v-for="journey in usersJourney" :key ="journey.index">
                            <v-flex> 
                            <journey-card :journey = "journey" v-if="journey.ishighlight"></journey-card>
                            
                            </v-flex>
                        </div>
                    </v-layout>
                    </div>
                    <div v-if="filteredUserJourney.length">
                    <div class="my-4">
                        <h3 class="font-weight-light">Journey</h3>
                    </div>
                    <v-layout wrap row :class="{'my-2 justify-center': $vuetify.breakpoint.smAndDown, 'my-2': $vuetify.breakpoint.mdAndUp}">
                        <div v-for="journey in usersJourney" :key ="journey.index">
                            <v-flex> 
                            <journey-card :journey = "journey" v-if="!journey.ishighlight"></journey-card>
                            </v-flex>
                            </div>
                    </v-layout>
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
            </div>
            <div v-else>
                <div v-if="upcoming.length || journey.length"> 
                    <!-- check if journey is available -->
                    <div v-if="upcoming.length">
                    <div class="my-4">
                    <h3 class="font-weight-light">Upcoming events</h3>
                    </div>
                        <v-layout wrap row :class="{'my-2 justify-center': $vuetify.breakpoint.smAndDown, 'my-2': $vuetify.breakpoint.mdAndUp}" >
                            <div v-for="upcoming in upcoming" :key ="upcoming.index">
                                <v-flex> 
                                <journey-card :journey = "upcoming" ></journey-card>
                                </v-flex>
                            </div>
                        </v-layout>
                    </div>
                    <div v-if="filteredHighlight.length">
                    <div class="my-4" >
                    <h3 class="font-weight-light">Highlights</h3>
                    </div>
                        <v-layout wrap row :class="{'my-2 justify-center': $vuetify.breakpoint.smAndDown, 'my-2': $vuetify.breakpoint.mdAndUp}">
                            <div v-for="journey in journey" :key ="journey.index">
                                <v-flex> 
                                <journey-card :journey = "journey" v-if="journey.ishighlight"></journey-card>
                                </v-flex>
                            </div>
                        </v-layout>
                    </div>
                    <div v-if="filteredJourney.length">
                    <div class="my-4">
                        <h3 class="font-weight-light">Journey</h3>
                    </div>
                        <v-layout wrap row :class="{'my-2 justify-center': $vuetify.breakpoint.smAndDown, 'my-2': $vuetify.breakpoint.mdAndUp}">
                            <div v-for="journey in journey" :key ="journey.index">
                                <v-flex> 
                                <journey-card :journey = "journey" v-if="!journey.ishighlight"></journey-card>
                                </v-flex>
                                </div>
                        </v-layout>
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

            </div>
        </v-container>
        <v-container v-if="firstLoad">
                <div class="my-4">
                <v-skeleton-loader :loading="loading" type="card-heading" max-width="250" ></v-skeleton-loader>
                </div>
                <v-layout wrap row v-if="firstLoad">
                    <div v-for="n in this.looploader" :key ="n.index">
                        <v-flex sm6 xs6> 
                        <v-skeleton-loader min-width="96" class="ma-1" max-height="96" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
                        </v-flex>
                    </div>
                </v-layout>
        </v-container>
        <v-card v-intersect="infiniteScrolling"></v-card>
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
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'usersJourney', 'usersUpcoming']),
    filteredUserHighlight: function(){
      return this.usersJourney.filter((journey) => {
        return journey.ishighlight;
      });
    },
    filteredUserJourney: function(){
      return this.usersJourney.filter((journey) => {
        return !journey.ishighlight;
      });
    },
    filteredHighlight: function(){
      return this.journey.filter((journey) => {
        return journey.ishighlight;
      });
    },
    filteredJourney: function(){
      return this.journey.filter((journey) => {
        return !journey.ishighlight;
      });
    },
    },
    props: ["artist"],
    // async asyncData({error, params, store}) {
    //     if( store.state.auth.loggedIn && params.username == store.state.portfolio.username){ 
    //     }
    //     else{
    //     try {
    //     let journey_response = await EventService.getJourney(params.username)
    //     let upcoming_events = await EventService.getUpcomingEvents(params.username)
    //     return {
    //             journey: journey_response.data.results,
    //             upcoming: upcoming_events.data.results
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         error({statusCode:503,  message: err.message})
    //     }
    //     }
    // },
    created(){
        // if user is checking own journey, calling from store
        if(this.isAuthenticated &&this.$store.state.auth.user.user.username == this.$route.params.username)
        {
            this.getStoreJourney();
        }else
        {
            this.getJourneyApi(this.$route.params);
        }
    },
    data() {
        return {
        search: "",
        page:null,
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
        let journey_response = await EventService.getJourney(params.username)
        let upcoming_events = await EventService.getUpcomingEvents(params.username)
        this.journey= journey_response.data.results;
        this.upcoming= upcoming_events.data.results;
        // console.log("created",journey_response.data);
        this.page = journey_response.data.next;
        this.firstLoad = false
        } catch (err) {
            console.log(err);
        }
    },
    getStoreJourney(){
        this.firstLoad = false
        // console.log("checking store..");
    },
    infiniteScrolling(entries, observer, isIntersecting) {
      // setTimeout(() => {
        // this.page++;
        if(this.isAuthenticated && this.$store.state.auth.user.user.username == this.$route.params.username){
            //update store to next
            // console.log("check store on scroll..");
            this.$store.dispatch("update_user_journey");
        }
        else{
            // console.log("page url",this.page);
            if(this.page)
            { 
                const key = 'id';
                this.$axios.get(this.page).then(response => {
                // console.log(response.data);
                this.page= response.data.next;
                // console.log("this.page",this.page);
                response.data.results.forEach(item => this.journey.push(item));
                // filter array so no duplicates
                this.journey = [...new Map(this.journey.map(item =>
                    [item[key], item])).values()];
                
            })
                .catch(err => {
                    console.log(err);
                });
            }
        }
      // }, 500);
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