<template>
    <v-app>
        <v-container class="mx-auto width">
            <h2 class="font-weight-medium mb-4">Journey</h2>
            <div v-show="!journeyLoaded" >
                <div v-if="journey.length">
                    <v-layout wrap row justify-start>
                        <div v-for="journey in journey" :key ="journey.index" >
                            <all-journey-card :journey = "journey" v-if="!journey.isprivate"></all-journey-card>
                        </div>
                    </v-layout>
                    <v-card v-intersect="infiniteScrollingJourney"></v-card>
                </div>
                <div v-else>
                    <center>
                        <img
                        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                        class="ml-2 mt-6 clickable"
                        :src="require('@/assets/gebbleslogo_tab.png')"/>
                        <h3>No posts. </h3>
                    </center>
                </div>
            </div>
            <div v-if="journeyLoaded">
            <v-layout wrap row justify-start>
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
import EventService from '@/services/EventService.js'
import AllJourneyCard from '~/components/AllJourneyCard.vue'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
export default {
    head() {
        return {
        title: 'Journey',     //do not miss "this"
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'What you need to know about this artist #' 
            }
        ]
        }
    },
    components:{
        AllJourneyCard,
        CardSkeletonLoader, 
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'
     ]),
    },
    created(){
        this.getAllJourneyApi();
    },
    data() {
        return {
        search: "",
        journey:[],
        pageJourney:null,
        looploader:[1,1,1,1,1,1,1,1,1],
        page:'',
        journeyLoaded:true
        }
    },
    methods: {
    async getAllJourneyApi(){
    try {
        let journey_response = await EventService.getAllJourney()
        this.journey= journey_response.data.results;
        this.pageJourney = journey_response.data.next;
        this.journeyLoaded = false
    } catch (err) {
        this.journeyLoaded = false
        console.log(err.response);
    }
    },
    infiniteScrollingJourney(entries, observer, isIntersecting) {
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