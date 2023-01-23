<template>
    <!-- {{ firstLoadL }} {{ firstLoadC }} {{ firstLoadS }} -->
    <v-tabs v-model="active_tab" v-if="!firstLoadY" class="width mx-auto background" centered>
        <v-tab @click="getLearn">
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Learn</p>
            <!-- <p class="font-weight-light ma-0" style="font-size:10px; text-transform: lowercase;">(each one)</p> -->
        </v-tab>
        <v-tab>
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Create<v-icon size="small" class="pl-2">mdi-lock</v-icon></p>
            <!-- <p class="font-weight-light  ma-0" style="text-transform: lowercase; font-size:10px">(teach one)</p> -->
        </v-tab>
        <v-tab @click="getShare">
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Share</p>
            <!-- <p class="font-weight-light  ma-0" style="text-transform: lowercase; font-size:10px">(teach one)</p> -->
        </v-tab>
        <v-tab-item class="background">
            <div class="ml-1 py-2 grey--text text-center caption"><v-icon small>mdi-all-inclusive</v-icon> artists <b>{{artist.username}}</b> gave a shoutout to</div>
            <v-row class="ma-0" v-show="firstLoadL" >
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </v-col>
            </v-row>
            <div v-if="teachers.length && !firstLoadL">
            <v-row class="ma-0">
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="share in teachers" :key ="share.index">
                    <TeachersCard :e1t1="share" ></TeachersCard>
                </v-col>
            </v-row>
            </div>
            <center v-if="!teachers.length && !firstLoadL">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <p class="grey--text mt-4">No posts found. </p>
            </center>
            <v-card v-intersect="infiniteScrollingTeacher" class="background"></v-card>
        </v-tab-item>
        <v-tab-item class="background">
            <div class="py-2 grey--text caption text-center">all your videos are private, except your last post</div>
            <v-row class="ma-0" v-show="firstLoadY" >
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </v-col>
            </v-row>
            <!-- {{ cooking }} -->
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
        <!-- <v-tab-item class="background">
            <div class="ml-1 py-2 grey--text text-center caption"> <v-icon small>mdi-play-outline</v-icon> artists that mentioned you</div>
            <v-row class="ma-0" v-if="cooking_mentioned.length && !firstLoadC">
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="cook in cooking_mentioned" :key ="cook.index">
                    <cooking-card-sharing :cook="cook" ></cooking-card-sharing> 
                </v-col>
            </v-row>
            <v-row class="ma-0" v-if="firstLoadC">
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </v-col>
            </v-row>
            <center v-if="!cooking_mentioned.length && !firstLoadC">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <p class="grey--text mt-4">No posts found. </p>
            </center>
            <v-card v-intersect="infiniteScrollingMentioned" class="background"></v-card>
        </v-tab-item> -->
        <v-tab-item class="background">
            <div class="ml-1 py-2 grey--text text-center caption"> <v-icon small>mdi-all-inclusive</v-icon> artists that gave <b>{{artist.username}}</b> a shoutout</div>
            <v-row class="ma-0" v-if="students.length && !firstLoadS">
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="share in students" :key ="share.index">
                    <StudentsCard :share="share" ></StudentsCard>
                </v-col>
            </v-row>
            <v-row class="ma-0" v-if="firstLoadS">
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
                </v-col>
            </v-row>
            <center v-if="!students.length && !firstLoadS">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <p class="grey--text mt-4">No posts found. </p>
            </center>
            <v-card v-intersect="infiniteScrollingStudents" class="background"></v-card>
        </v-tab-item>
    </v-tabs>
    <div v-else class="width mx-auto background">
        <v-row class="ma-0">
            <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
            <card-skeleton-loader></card-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
import CookingCardSharing from './CookingCardSharing.vue'
import CookingCard from './CookingCard.vue'

export default {
    middleware : 'check_auth',
    props: ['artist'],
    components: {
    StudentsCard,
    TeachersCard,
    CardSkeletonLoader,
    CookingCardSharing,
    CookingCard
}, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser','usersTeachers','userHasTeachers'])
    },
    methods:{
        async getLearn(){
            console.log("get learn");
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            try {
            const teachers_response = await EventService.getEach1Teach1_teachers(config)
            console.log(teachers_response);
            this.teachers = teachers_response.data.results
            this.teachers_page = teachers_response.data.next
            this.firstLoadL = false
            } catch (e) {
                console.log(e);
                this.firstLoadL = false
            }
        },
        async getShare(){
        if(this.firstLoadS){
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            try {
            const students_response = await EventService.getEach1Teach1_students(config)
            console.log(students_response);
            this.students = students_response.data.results
            this.students_page = students_response.data.next
            this.firstLoadS = false
            } catch (e) {
                console.log(e);
                this.firstLoadS = false
            }
        }
        },
        async getYours(){
        // console.log("sup");
        if(this.firstLoadY){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
            try {
                const response = await EventService.getWhatsCookingUsername(config)
                console.log(response); 
                this.cooking = response.data.results
                this.cooking_page = response.data.next
                this.firstLoadY = false
            } catch (e) {
                console.log(e);
                this.firstLoadY = false
            }
        }
        },
        postDelete(){
        this.cooking=[];
        this.firstLoadY = true
        this.getYours();
        },
        infiniteScrollingTeacher(entries, observer, isIntersecting) {
            if(this.teachers_page)
            {
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
                const key = 'id';
                this.$axios.get(this.teachers_page, config).then(response => {
                this.teachers_page= response.data.next;
                response.data.results.forEach(item => this.teachers.push(item));
                // filter array so no duplicates
                this.teachers = [...new Map(this.teachers.map(item =>
                    [item[key], item])).values()];
            })
            .catch(err => {
                console.log(err);
            });}
        },
        infiniteScrollingStudents(entries, observer, isIntersecting) {
            if(this.students_page)
            {
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
                const key = 'id';
                this.$axios.get(this.students_page, config).then(response => {
                this.students_page= response.data.next;
                response.data.results.forEach(item => this.students.push(item));
                // filter array so no duplicates
                this.students = [...new Map(this.students.map(item =>
                    [item[key], item])).values()];
            })
            .catch(err => {
                console.log(err);
            });}
        },
        infiniteScrollingMentioned() {
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
        infiniteScrollingYours() {
        if(this.cooking_page){
        const key = 'id';
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
        this.$axios.get(this.cooking_page, config).then(response => {
            this.cooking_page= response.data.next;
            response.data.results.forEach(item => this.cooking.push(item));
            // filter array so no duplicates
            this.cooking = [...new Map(this.cooking.map(item =>
            [item[key], item])).values()];
        })
        .catch(err => {
            console.log(err);
        });
        }
        },
    },
    created(){
        if(!this.$auth.strategy.token.get()){
			console.log("logged out");
			this.$store.dispatch("remove_portfolio")
			this.$store.dispatch("remove_bio")
			this.$store.dispatch("remove_teachers")
			this.$store.dispatch("remove_share_obj")
			this.$store.dispatch("remove_editing_obj")
			this.$store.dispatch("remove_learnings")
			this.$store.dispatch("remove_notifications")
			this.$store.dispatch("remove_cook_reactions")
			this.$store.dispatch("remove_journey")
			this.$store.dispatch("remove_page")
			localStorage.clear()
			this.$auth.strategy.token.reset();
			this.$auth.logout();
        }
        this.getYours();
    },
    data() {
    return {
        teachers_page:"",
        students_page:"",
        teachers:[],
        students:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        loading: true,
        firstLoadL: true,
        cooking_mentioned_page:"",
        cooking_mentioned:[],
        cooking_page:'',
        cooking:[],
        firstLoadC: true,
        firstLoadS:true,
        firstLoadY:true,
        active_tab:1
    }
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