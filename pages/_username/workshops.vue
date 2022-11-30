<template>
    <v-app>
        <left-navigation></left-navigation>
        <v-container style="max-width:670px;" class="pa-0 background">
            <v-btn icon class="elevation-0 mt-1 " @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
            <v-tabs class="width mx-auto background" centered>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Attending Workshops</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Invited Workshops</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Organised Workshops</p>
            </v-tab>
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center"><v-btn icon x-small outlined><v-icon x-small>mdi-plus</v-icon> </v-btn> to add the attended workshops to your journey</div>
                <v-layout wrap row justify-start v-if="firstLoadGoing" class="pt-2 background">
                    <div v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                    </div>
                </v-layout>
                <v-layout wrap justify-start v-show="!firstLoadGoing" class=" mx-auto width pt-2 background" >
                    <div v-for="workshop in goingWorkshops" :key ="workshop.index">
                        <workshop-card-going :workshop="workshop" ></workshop-card-going>
                    </div>
                </v-layout>
                <v-card v-intersect="infiniteScrollingGoingWorkshops"></v-card>
                <center v-if="!goingWorkshops.length && !firstLoadGoing" class="background">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                    class="ml-2 mt-6 clickable"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <h3>No workshops found. </h3>
                </center>
            </v-tab-item>
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center"><v-btn icon x-small outlined><v-icon x-small>mdi-plus</v-icon> </v-btn>  to add the invited workshops to your portfolio journey</div>
                <!-- tagged Workshops -->
                <v-layout wrap row justify-start v-if="firstLoadTagged" class="pt-2 background">
                    <div v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                    </div>
                </v-layout>
                <v-layout wrap justify-start v-show="!firstLoadTagged" class=" mx-auto width pt-2 background" >
                    <div v-for="workshop in taggedWorkshops" :key ="workshop.index">
                        <workshop-card-tagged :workshop="workshop"></workshop-card-tagged>
                    </div>
                </v-layout>
                <v-card v-intersect="infiniteScrollingTaggedWorkshops"></v-card>
                <center v-if="!taggedWorkshops.length && !firstLoadTagged" class="background">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                    class="ml-2 mt-6 clickable"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <h3>No workshops found. </h3>
                </center>
            </v-tab-item>
            <v-tab-item>
                <div class="ml-1 py-2 grey--text caption text-center">all the workshops you organised..</div>
            <v-layout wrap row justify-start v-if="firstLoadOrg" class="pt-2 background">
                    <div v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                    </div>
                </v-layout>
                <v-layout wrap justify-start v-show="!firstLoadOrg" class=" mx-auto width pt-2 background" >
                    <div v-for="workshop in orgWorkshops" :key ="workshop.index">
                        <workshop-card-organised :workshop="workshop"></workshop-card-organised>
                    </div>
                </v-layout>
                <v-card v-intersect="infiniteScrollingOrgWorkshops"></v-card>
                <center v-if="!orgWorkshops.length && !firstLoadOrg" class="background">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                    class="ml-2 mt-6 clickable"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <h3>No workshops found. </h3>
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
import LeftNavigation from '~/components/LeftNavigation.vue'
import WorkshopCardGoing from '~/components/WorkshopCardGoing.vue'
import WorkshopCardTagged from '~/components/WorkshopCardTagged.vue'
import WorkshopCardOrganised from '~/components/WorkshopCardOrganised.vue'
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
    props: ["artist"],
    middleware : 'check_auth',
    components:{
    CardSkeletonLoader, LeftNavigation,
    WorkshopCardGoing,
        WorkshopCardOrganised,
        WorkshopCardTagged
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'
     ])
    },
    data() {
        return {
        search: "",
        orgWorkshops:[],
        taggedWorkshops:[],
        goingWorkshops:[],
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
    created(){
        this.getMyOrganizedWorkshops();
        this.getTaggedWorkshops();
        this.getGoingWorkshops();
    },
    methods: {
    goback(){
        window.history.back();
    },
    async getMyOrganizedWorkshops(){
        try {
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
        const response = await EventService.getMyOrganizedWorkshops(config);
        // console.log(response);
        const orgWorkshops = response.data.results
        //filter Workshops which are duplicate
        // a Set to track seen Workshops
        // const seen = new Set();
        this.orgWorkshops = orgWorkshops.filter(event => {
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
    async getTaggedWorkshops(){
        try {
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
        const response = await EventService.getMyInvitedWorkshops(config);
        // console.log(response);
        const taggedWorkshops = response.data.results
        //filter Workshops which are duplicate
        // a Set to track seen Workshops
        // const seen = new Set();
        this.taggedWorkshops = taggedWorkshops.filter(event => {
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
    async getGoingWorkshops(){
        try {
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
        const response = await EventService.getMyGoingWorkshops(config);
        // console.log(response);
        const goingWorkshops = response.data.results
        //filter Workshops which are duplicate
            // a Set to track seen Workshops
            // const seen = new Set();
            this.goingWorkshops = goingWorkshops.filter(event => {
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
    infiniteScrollingTaggedWorkshops(entries, observer, isIntersecting) {
        if(this.page){
        const key = 'uuid';
        this.$axios.get(this.page).then(response => {
            this.page= response.data.next;

            let res = response.data.results
            //filter Workshops which are duplicate
            // a Set to track seen Workshops
            let taggedWorkshopsPage = res.filter(event => {
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
            taggedWorkshopsPage.forEach(item => this.taggedWorkshops.push(item));
            this.taggedWorkshops = [...new Map(this.taggedWorkshops.map(item =>
            [item[key], item])).values()];
          })
          .catch(err => {
            console.log(err);
          });
        }
    },
    infiniteScrollingGoingWorkshops(entries, observer, isIntersecting) {
        if(this.pageGoing){
        const key = 'uuid';
        this.$axios.get(this.pageGoing).then(response => {
            this.pageGoing= response.data.next;

            let res = response.data.results
            //filter Workshops which are duplicate
            // a Set to track seen Workshops
            let goingWorkshopsPage = res.filter(event => {
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
            goingWorkshopsPage.forEach(item => this.goingWorkshops.push(item));
            this.goingWorkshops = [...new Map(this.goingWorkshops.map(item =>
            [item[key], item])).values()];
          })
          .catch(err => {
            console.log(err);
          });
        }
    },
    infiniteScrollingOrgWorkshops(entries, observer, isIntersecting) {
        if(this.pageOrg){
        const key = 'uuid';
        this.$axios.get(this.pageOrg).then(response => {
            this.pageOrg= response.data.next;

            let res = response.data.results
            //filter Workshops which are duplicate
            // a Set to track seen Workshops
            let orgWorkshopsPage = res.filter(event => {
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
            orgWorkshopsPage.forEach(item => this.orgWorkshops.push(item));
            this.orgWorkshops = [...new Map(this.orgWorkshops.map(item =>
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