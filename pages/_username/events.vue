<template>
    <v-app>
        <left-navigation></left-navigation>
        <v-container class="pa-0 background mx-auto width">
            <v-btn icon class="elevation-0 mt-1 " @click="goback()">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
            <v-tabs class="width mx-auto background" centered>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Attending</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Invited</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Organised</p>
            </v-tab>
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center">
                    <v-btn icon x-small outlined class="mr-1"><v-icon x-small>mdi-plus</v-icon> </v-btn> to add the attended events to your journey</div>
                    <v-row class="ma-0" v-if="firstLoadGoing">
                        <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                        <card-skeleton-loader></card-skeleton-loader>
                        </v-col>
                    </v-row>
                    <v-row class="ma-0" v-show="!firstLoadGoing">
                        <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="event in goingEve" :key ="event.index">
                            <events-card-going :event="event"></events-card-going>
                        </v-col>
                    </v-row>
                <v-card v-intersect="infiniteScrollingGoingEvents"></v-card>
                <center v-if="!goingEvents.length && !firstLoadGoing" class="background mt-4">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                    class="ml-2 mt-6 clickable"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <p class="grey--text mt-4">No events found. </p>
                </center>
            </v-tab-item>
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center"><v-btn icon x-small outlined class="mr-1"><v-icon x-small>mdi-plus</v-icon> </v-btn>  to add the invited events to your journey</div>
                <!-- tagged events -->
                <v-row class="ma-0" v-if="firstLoadTagged">
                    <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                    </v-col>
                </v-row>
                <v-row class="ma-0" v-show="!firstLoadTagged">
                    <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="event in taggedEve" :key ="event.index">
                        <events-card-tagged :event="event"></events-card-tagged>
                    </v-col>
                </v-row>
                <v-card v-intersect="infiniteScrollingTaggedEvents"></v-card>
                <center v-if="!taggedEvents.length && !firstLoadTagged" class="mt-4 background">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                    class="ml-2 mt-6 clickable"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <p class="grey--text mt-4">No events found. </p>
                </center>
            </v-tab-item>
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center">all the events you organised</div>
                <v-row class="ma-0" v-if="firstLoadOrg">
                    <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                    </v-col>
                </v-row>
                <v-row class="ma-0" xl="3" v-show="!firstLoadOrg">
                    <v-col cols="4" class="pa-1 pa-sm-2" v-for="event in orgEvents" :key ="event.index">
                        <events-card-organised :event="event"></events-card-organised>
                    </v-col>
                </v-row>
                <v-card v-intersect="infiniteScrollingOrgEvents"></v-card>
                <center v-if="!orgEvents.length && !firstLoadOrg" class="background mt-4">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                    class="ml-2 mt-6 clickable"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <p class="grey--text mt-4">No events found. </p>
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
import EventsCardOrganised from '~/components/EventsCardOrganised.vue'
import EventsCardGoing from '~/components/EventsCardGoing.vue'
import EventsCardTagged from '~/components/EventsCardTagged.vue'
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
    CardSkeletonLoader,
    EventsCardOrganised,
    EventsCardGoing,
    EventsCardTagged,
    LeftNavigation
},
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'
     ]),
    taggedEve: function(){
    return this.taggedEvents.filter((eve) => {
    return eve.event;
    });
    },
    goingEve: function(){
    return this.goingEvents.filter((eve) => {
    return eve.event;
    });
    }
    },
    props: ["artist"],
    middleware : 'check_auth',
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
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
        const response = await EventService.getMyOrganizedEvents(config);
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
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
        const response = await EventService.getMyInvitedEvents(config);
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
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
        const response = await EventService.getMyGoingEvents(config);
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
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()}
        };
        const key = 'uuid';
        this.$axios.get(this.page, config).then(response => {
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
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()}
        };
        this.$axios.get(this.pageGoing, config).then(response => {
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
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()}
        };
        this.$axios.get(this.pageOrg, config).then(response => {
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
            console.log(err, err.response);
          });
        }
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