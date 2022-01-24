<template>
    <v-app>
        <v-container>
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
    async asyncData({error, params, store}) {
        if( store.state.auth.loggedIn && params.username == store.state.portfolio.username){ //if user is checking own data
            // done in store
            // console.log("got from store ze journey");
            // return {
            //     journey: store.state.journey,
            //     upcoming: store.state.upcoming
            // }
        }
        else{
        try {
        let journey_response = await EventService.getJourney(params.username)
        let upcoming_events = await EventService.getUpcomingEvents(params.username)
        return {
                journey: journey_response.data,
                upcoming: upcoming_events.data
            }
        } catch (err) {
            console.log(err);
            error({statusCode:503,  message: err.message})
        }
        }
    },
    methods: {
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