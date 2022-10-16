<template>
    <v-app>
        <v-container style="max-width:670px;" class="pa-0 background">
            <v-btn icon class="elevation-0 mt-1 " @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
            <v-tabs class="width mx-auto background" centered>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Organised Events</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Invited Events</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Attending Events</p>
            </v-tab>
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center">all the events you organised</div>
            <v-layout wrap row justify-start v-if="firstLoadOrg" class="pt-2 background">
                    <div v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                    </div>
                </v-layout>
                <v-layout wrap row justify-start v-show="!firstLoadOrg" class=" mx-auto width pt-2 background" >
                    <div v-for="event in orgEvents" :key ="event.index">
                        <events-card-organised :event="event"></events-card-organised>
                    </div>
                </v-layout>
                <v-card v-intersect="infiniteScrollingOrgEvents"></v-card>
                <center v-if="!orgEvents.length && !firstLoadOrg" class="background">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                    class="ml-2 mt-6 clickable"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <h3>No events found. </h3>
                </center>
            </v-tab-item>
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center"><v-btn icon x-small outlined><v-icon x-small>mdi-plus</v-icon> </v-btn>  to add the invited events to your portfolio journey</div>
                <!-- tagged events -->
                <v-layout wrap row justify-start v-if="firstLoadTagged" class="pt-2 background">
                    <div v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                    </div>
                </v-layout>
                <v-layout wrap row justify-start v-show="!firstLoadTagged" class=" mx-auto width pt-2 background" >
                    <div v-for="event in taggedEvents" :key ="event.index">
                        <events-card-tagged v-if="event.event" :event="event"></events-card-tagged>
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
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center"><v-btn icon x-small outlined><v-icon x-small>mdi-plus</v-icon> </v-btn> to add the attended events to your journey</div>

                <v-layout wrap row justify-start v-if="firstLoadGoing" class="pt-2 background">
                    <div v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                    </div>
                </v-layout>
                <v-layout wrap row justify-start v-show="!firstLoadGoing" class=" mx-auto width pt-2 background" >
                    <div v-for="event in goingEvents" :key ="event.index">
                        <events-card-going v-if="event.event" :event="event"></events-card-going>
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
        </v-container>
    </v-app>
</template>
<script>
import { mapGetters} from 'vuex'
import EventService from '@/services/EventService.js'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
import EventsCardOrganised from '../../components/EventsCardOrganised.vue'
import EventsCardGoing from '~/components/EventsCardGoing.vue'
import EventsCardTagged from '~/components/EventsCardTagged.vue'
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
    CardSkeletonLoader,
    EventsCardOrganised,
    EventsCardGoing,
    EventsCardTagged
},
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'
     ])
    },
    props: ["artist"],
    created(){
        this.getMyOrganizedEvents();
        this.getTaggedEvents();
        this.getGoingEvents();
    },
    data() {
        return {
        search: "",
        orgEvents:[],
        taggedEvents:[],
        goingEvents:[],
        pageGoing:'',
        pageOrg:'',
        looploader:[1,1,1,1,1,1,1,1,1],
        page:'',
        firstLoadOrg:true,
        firstLoadTagged:true,
        firstLoadGoing:true,
        seen: new Set(),
        seen2: new Set(),
        seen3: new Set(),
        }
    },
    methods: {
    goback(){
        window.history.back();
    },
    async getMyOrganizedEvents(){
        try {
        const response = await EventService.getMyOrganizedEvents(this.artist.username);
        // console.log(response);
        const orgEvents = response.data.results
        //filter events which are duplicate
            // a Set to track seen events
            // const seen = new Set();
            this.orgEvents = orgEvents.filter(event => {
            // check if the current event is a duplicate
            let isDuplicate;
            if(event.event){
                isDuplicate= this.seen3.has(event.event.uuid);
            // add the current event to the Set
            this.seen3.add(event.event.uuid);}
            // filter() returns the event when isDuplicate is false
            return !isDuplicate;
            });
            // console.log(filtered);
        this.pageOrg = response.data.next
        this.firstLoadOrg = false
        } catch (e) {
            console.log(e);
            this.firstLoadOrg = false
        }
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
    infiniteScrollingOrgEvents(entries, observer, isIntersecting) {
        if(this.pageOrg){
        const key = 'uuid';
        this.$axios.get(this.pageOrg).then(response => {
            this.pageOrg= response.data.next;

            let res = response.data.results
            //filter events which are duplicate
            // a Set to track seen events
            let orgEventsPage = res.filter(event => {
            // check if the current event is a duplicate
            let isDuplicate;
            if(event.event)
            { isDuplicate= this.seen3.has(event.event.uuid);
            // add the current event to the Set
            this.seen3.add(event.event.uuid);
            }
            // filter() returns the event when isDuplicate is false
            return !isDuplicate;
            });
            orgEventsPage.forEach(item => this.orgEvents.push(item));
            this.orgEvents = [...new Map(this.orgEvents.map(item =>
            [item[key], item])).values()];
          })
          .catch(err => {
            console.log(err);
          });
        }
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