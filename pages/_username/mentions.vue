<template>
    <v-app>
        <left-navigation></left-navigation>
        <v-container class="pa-0 width mx-auto background">
            <v-btn icon class="elevation-0 mt-1 " @click="goback()" >
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
            <!-- <div class="pa-2 grey--text caption">all the videos where you are mentioned</div> -->
            <v-row class="ma-0" v-show="firstLoadM" >
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </v-col>
            </v-row>
            <v-row class="ma-0" v-show="!firstLoadM" >
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="cook in cooking_mentioned" :key ="cook.index">
                    <cooking-card-sharing :cook="cook" ></cooking-card-sharing> 
                </v-col>
            </v-row>
            <v-card v-intersect="infiniteScrolling"></v-card>
            <center v-if="!cooking_mentioned.length && !firstLoadM">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <p class="grey--text mt-4">No videos found. </p>
            </center>
            <!-- <v-tabs class="width mx-auto background" centered>
            <v-tab @click="getwhatiscookingmentioned">
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Mentioned</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Create<v-icon size="small" class="pl-2">mdi-lock</v-icon></p>
            </v-tab>
            <v-tab-item class="background">
            <div class="py-2 grey--text caption text-center">all the videos where you are mentioned</div>
            <v-row class="ma-0" v-show="firstLoadM" >
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </v-col>
            </v-row>
            <v-row class="ma-0" v-show="!firstLoadM" >
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="cook in cooking_mentioned" :key ="cook.index">
                    <cooking-card-sharing :cook="cook" ></cooking-card-sharing> 
                </v-col>
            </v-row>
            <v-card v-intersect="infiniteScrolling"></v-card>
            <center v-if="!cooking_mentioned.length && !firstLoadM">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <p class="grey--text mt-4">No videos found. </p>
            </center>
            </v-tab-item>
            <v-tab-item class="background">
            <div class="py-2 grey--text caption text-center">all your videos are private, except your last post</div>
            <v-row class="ma-0" v-show="firstLoadY" >
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </v-col>
            </v-row>
            <v-row class="ma-0" v-show="!firstLoadY" >
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="cook in cooking" :key ="cook.index">
                <cooking-card :cook="cook" @postDelete="postDelete"></cooking-card>
                </v-col>
            </v-row>

            <v-card v-intersect="infiniteScrollingYours"></v-card>
            <center v-if="!cooking.length && !firstLoadY">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <p class="grey--text mt-4">No videos found. </p>
            </center>
            </v-tab-item>
            </v-tabs> -->
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CookingCardSharing from '~/components/CookingCardSharing.vue'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
import CookingCard from '~/components/CookingCard.vue'
import LeftNavigation from '~/components/LeftNavigation.vue'
// import CookingFeed from '~/components/CookingFeed.vue'

export default {
    props: ['artist'],
    middleware : 'check_auth',
    components: {
        CardSkeletonLoader,
        CookingCardSharing,
        CookingCard,
        LeftNavigation
    }, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    },
    head() {
        return {
            title: this.artist.username,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.username
                }
            ]
        }
    },
    created(){
        this.getwhatiscookingmentioned();
    },
    data() {
    return {
        cooking_mentioned_page:"", 
        cooking_page:'',
        cooking:[],
        cooking_mentioned:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        loading: true,
        firstLoadY: true,
        firstLoadM: true,
    }
    },
    methods:{
    goback(){
        window.history.back();
    },
    
    async getwhatiscookingmentioned(){
        if(this.firstLoadM)
        {try {
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()}
        };
        const response = await EventService.getStudentsCooking(this.artist.username, config)
        console.log(response);
        this.cooking_mentioned = response.data.results
        this.cooking_mentioned_page = response.data.next
        this.firstLoadM = false
        } catch (e) {
        console.log(e);
        this.firstLoadM = false
        }}
    },
    infiniteScrolling() {
      if(this.cooking_mentioned_page){
      const key = 'id';
      const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()}
        };
      this.$axios.get(this.cooking_mentioned_page, config).then(response => {
        this.cooking_mentioned_page= response.data.next;
        response.data.results.forEach(item => this.cooking_mentioned.push(item));
        // filter array so no duplicates
        this.cooking_mentioned = [...new Map(this.cooking_mentioned.map(item =>
          [item[key], item])).values()];
      })
      .catch(err => {
        console.log(err);
      });
      }
    },
    },
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