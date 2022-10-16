<template>
    <v-app>
        <v-container style="max-width:670px;" class="pa-0 background">
        <v-btn icon class="elevation-0 mt-1 " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <v-tabs class="width mx-auto background" centered>
        <v-tab>
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Learning</p>
            <p class="font-weight-light ma-0" style="font-size:10px; text-transform: lowercase;">(each one)</p>
        </v-tab>
        <v-tab>
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Sharing</p>
            <p class="font-weight-light  ma-0" style="text-transform: lowercase; font-size:10px">(teach one)</p>
        </v-tab>
        <v-tab-item v-if="!firstLoad" class="background">
            <div class="ml-1 py-2 grey--text text-center caption"><v-icon small>mdi-all-inclusive</v-icon> artists <b>{{artist.username}}</b> gave a shoutout to</div>
            <div v-if="teachers.length">
            <v-layout wrap justify-start class="py-2 background" >
                <div v-for="share in teachers" :key ="share.index">
                    <TeachersCard :e1t1="share" ></TeachersCard>
                </div>
            </v-layout>
            </div>
            <center v-if="!teachers.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h4>No posts yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingTeacher" class="background"></v-card>
        </v-tab-item>
        <v-tab-item v-else class="background">
            <div class="ml-1 py-2 grey--text text-center caption"><v-icon small>mdi-all-inclusive</v-icon> artists <b>{{artist.username}}</b> gave a shoutout to</div>
            <v-layout wrap row justify-start class="py-2 background">
            <div v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader></card-skeleton-loader>
            </div>
            </v-layout>
        </v-tab-item>
        <v-tab-item v-if="!firstLoad" class="background">
            <div class="ml-1 py-2 grey--text text-center caption"> <v-icon small>mdi-all-inclusive</v-icon> artists that gave <b>{{artist.username}}</b> a shoutout</div>
            <div v-if="students.length">
            <v-layout wrap  justify-start class="py-2 background">
                <div v-for="share in students" :key ="share.index">
                    <StudentsCard :share="share" ></StudentsCard>
                </div>
            </v-layout>
            </div>
            <center v-if="!students.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h4>No posts yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingStudents" class="background"></v-card>
        </v-tab-item>
        <v-tab-item v-else class="background">
            <div class="ml-1 py-2 grey--text text-center caption"> <v-icon small>mdi-all-inclusive</v-icon> artists that gave <b>{{artist.username}}</b> a shoutout</div>
            <v-layout wrap row justify-start class="py-2 background">
            <div v-for="n in this.looploader" :key ="n.index">
                <v-skeleton-loader></v-skeleton-loader>
            </div>
            </v-layout>
        </v-tab-item>
        <!-- <v-tab-item v-if="!firstLoad">
            <div v-if="own_cooking.length">
            <v-layout wrap  justify-start class="my-2" >
                <div v-for="cook in own_cooking" :key ="cook.index">
                <cooking-card :cook="cook" @postDelete="postDelete"></cooking-card>
                </div>
            </v-layout>
            </div>
            <center v-if=" !firstLoad && !own_cooking.length">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h4>No videos yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingCooking"></v-card>
        </v-tab-item>
        <v-tab-item v-else>
            <v-layout wrap row justify-start class="my-2">
            <div v-for="n in this.looploader" :key ="n.index">
                <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" ></v-skeleton-loader>
            </div>
            </v-layout>
        </v-tab-item> -->
        </v-tabs>
        <!-- <div v-show="!students.length && !teachers.length  && !firstLoad">
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h4>No posts yet. </h4>
            </center>
        </div> -->
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'
// import CookingCardSharing from '@/components/CookingCardSharing.vue'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
// import CookingCard from '~/components/CookingCard.vue'
// import CookingFeed from '~/components/CookingFeed.vue'

export default {
    props: ['artist'],
    components: {
        StudentsCard,
        TeachersCard,
        CardSkeletonLoader,
        // CookingCardSharing,
        // CookingCard,
        // CookingFeed
    }, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser','usersTeachers','userHasTeachers']),
    // filteredTeacher: function(){
    //   return this.teachers.filter((share) => {
    //     return share.username === this.artist.username;
    //   });
    // },
    // filteredStudent: function(){
    //   return this.students.filter((share) => {
    //     return share.s_teacher_name === this.artist.username;
    //   });
    // },
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
    methods:{
        postDelete(){
            this.$forceUpdate();
            console.log("updated?");
            this.getsharing(this.$route.params);
            },
        goback(){
            window.history.back();
        },
        async getsharing(params){
            const key = 'id';
            try {
            const teachers_response = await EventService.getEach1Teach1_teachers(params.username)
            const students_response = await EventService.getEach1Teach1_students(params.username)
            // const cooking_response = await EventService.getStudentsCooking(params.username)
            // const cooking_own_response = await EventService.getWhatsCookingUsername(params.username)
            this.teachers = teachers_response.data.results
            this.students = students_response.data.results
            // this.cooking = cooking_response.data.results
            // this.own_cooking = cooking_own_response.data
            // console.log(this.own_cooking);
            this.teachers_page = teachers_response.data.next
            this.students_page = students_response.data.next
            // this.cooking_page = cooking_response.data.next
            this.firstLoad = false
            // console.log(response);
            } catch (e) {
                console.log(e);
                this.firstLoad = false
                // error({statusCode:503, message: "unable to fetch shaaring data at this point"})
            }
        },
        // infiniteScrollingCooking() {
        // if(this.cooking_page){
        // const key = 'id';
        // this.$axios.get(this.cooking_page).then(response => {
        //     this.cooking_page= response.data.next;
        //     response.data.results.forEach(item => this.cooking.push(item));
        //     // filter array so no duplicates
        //     this.cooking = [...new Map(this.cooking.map(item =>
        //     [item[key], item])).values()];
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        // }
        // },
        infiniteScrollingTeacher(entries, observer, isIntersecting) {
            if(this.teachers_page)
            {
                const key = 'id';
                this.$axios.get(this.teachers_page).then(response => {
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
                const key = 'id';
                this.$axios.get(this.students_page).then(response => {
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
    },
    created(){
        this.getsharing(this.$route.params);
    },
    data() {
    return {
        teachers_page:"",
        students_page:"",
        // cooking_page:"", 
        teachers:[],
        students:[],
        // cooking:[],
        // own_cooking:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        loading: true,
        firstLoad: true,
    }
  },
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