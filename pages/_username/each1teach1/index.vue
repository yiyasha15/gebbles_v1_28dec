<template>
    <v-app>
        <v-container v-show="!firstLoad" style="max-width:670px;" class="pa-0">
        <center>
        <v-tabs style="max-width:670px; margin:auto;" class="hidden-sm-and-down">
        <v-tab>
            <h4 class="font-weight-light pl-2" style="text-transform: capitalize;">Learnings</h4><br>
            <p class="font-weight-light caption ma-0" style="text-transform: lowercase;">(each one)</p>
        </v-tab>
        <v-tab>
            <h4 class="font-weight-light pl-2 " style="text-transform: capitalize;">Sharings</h4>
             <p class="font-weight-light caption ma-0" style="text-transform: lowercase;">(teach one)</p>
        </v-tab>
        <v-tab>
            <h4 class="font-weight-light pl-2 " style="text-transform: capitalize;">Videos</h4>
        </v-tab>
        <v-tab-item>
            <div v-if="teachers.length">
            <v-layout wrap class="my-6">
                <div v-for="share in teachers" :key ="share.index">
                        <teachers-card-desktop :e1t1="share" ></teachers-card-desktop>
                    </div>
            </v-layout>
            </div>
            <center v-if="!teachers.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h4>No learnings yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingTeacher"></v-card>
        </v-tab-item>
        <v-tab-item>
            <div v-if="students.length">
            <v-layout wrap justify-start class="my-6">
                <div v-for="share in students" :key ="share.index">
                    <students-card-desktop :share="share" ></students-card-desktop>
                </div>
            </v-layout>
            </div>
            <center v-if="!students.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h4>No students yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingStudents"></v-card>
        </v-tab-item>
        <v-tab-item>
            <!-- <div v-if="cooking.length">
            <v-layout wrap justify-start class="my-6" >
                <div v-for="cook in cooking" :key ="cook.index">
                <cooking-card-sharing-desktop :cook="cook" ></cooking-card-sharing-desktop>
                </div>
            </v-layout>
            </div> -->
            <div v-if="own_cooking.length">
            <v-layout wrap  justify-start class="my-6" >
                <div v-for="cook in own_cooking" :key ="cook.index">
                <cooking-card-desktop :cook="cook"></cooking-card-desktop>
                </div>
            </v-layout>
            </div>
            <center v-if="!own_cooking.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h4>No videos yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingCooking"></v-card>
        </v-tab-item>
        </v-tabs>
        </center>
        <v-tabs style="max-width:357px; margin:auto;" class="hidden-md-and-up">
        <v-tab>
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:10px">Learnings</p>
            <p class="font-weight-light ma-0" style="font-size:8px; text-transform: lowercase;">(each one)</p>
        </v-tab>
        <v-tab>
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:10px">Sharings</p>
            <p class="font-weight-light  ma-0" style="text-transform: lowercase; font-size:8px">(teach one)</p>
        </v-tab>
        <v-tab>
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:10px">Videos</p>
        </v-tab>
        <v-tab-item>
            <div v-if="teachers.length">
            <v-layout wrap justify-start class="my-6" >
                <div v-for="share in teachers" :key ="share.index">
                    <TeachersCard :e1t1="share" ></TeachersCard>
                </div>
            </v-layout>
            </div>
            <center v-if="!teachers.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h4>No learnings yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingTeacher"></v-card>
        </v-tab-item>
        <v-tab-item>
            <div v-if="students.length">
            <v-layout wrap  justify-start class="my-6 ">
                <div v-for="share in students" :key ="share.index">
                    <StudentsCard :share="share" ></StudentsCard>
                </div>
            </v-layout>
            </div>
            <center v-if="!students.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h4>No students yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingStudents"></v-card>
        </v-tab-item>
        <v-tab-item>
            <!-- <div v-if="cooking.length">
            <v-layout wrap  justify-start class="my-6" >
                <div v-for="cook in cooking" :key ="cook.index">
                <cooking-card-sharing :cook="cook"></cooking-card-sharing>
                </div>
            </v-layout>
            </div>
            <v-divider v-if="cooking.length && own_cooking.length"></v-divider> -->
            <div v-if="own_cooking.length">
            <v-layout wrap  justify-start class="my-6" >
                <div v-for="cook in own_cooking" :key ="cook.index">
                <cooking-card :cook="cook"></cooking-card>
                </div>
            </v-layout>
            </div>
            <center v-if=" !firstLoad && !own_cooking.length">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h4>No videos yet. </h4>
            </center>
            <v-card v-intersect="infiniteScrollingCooking"></v-card>
        </v-tab-item>
        </v-tabs>
        <div v-show="!students.length && !teachers.length && !cooking.length">
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h4>No posts yet. </h4>
            </center>
        </div>
        </v-container>
        <v-container v-if="firstLoad" style="max-width:670px;" class="pa-0">
            <v-tabs style="max-width:670px; margin:auto;" >
            <v-tab>
                <p class="font-weight-light pl-2 hidden-md-and-up" style="max-width:357px; margin:auto;text-transform: capitalize;font-size:10px ">Learnings</p>
                <h4 class="font-weight-light pl-2 hidden-sm-and-down" style="max-width:670px; margin:auto;text-transform: capitalize;">Learnings</h4>
                <p class="font-weight-light  ma-0" style="font-size:8px; text-transform: lowercase;">(each one)</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 hidden-md-and-up" style="max-width:357px; margin:auto;text-transform: capitalize; font-size:10px">Sharings</p>
                <h4 class="font-weight-light pl-2 hidden-sm-and-down" style="max-width:670px; margin:auto;text-transform: capitalize;">Sharings</h4>
                <p class="font-weight-light  ma-0" style="font-size:8px; text-transform: lowercase;">(teach one)</p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 hidden-md-and-up" style="max-width:357px; margin:auto;text-transform: capitalize; font-size:10px">Videos</p>
                <h4 class="font-weight-light pl-2 hidden-sm-and-down" style="max-width:670px; margin:auto;text-transform: capitalize;">Videos</h4>
            </v-tab>
            <v-tab-item>
                 <v-layout wrap row justify-start class="my-6 hidden-md-and-up" style="max-width:357px; margin:auto;">
            <div v-for="n in this.looploader" :key ="n.index">
                <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" ></v-skeleton-loader>
            </div>
            </v-layout>
            <v-layout wrap row justify-start class="my-6 hidden-sm-and-down" style="max-width: 670px; margin:auto;" >
                <div v-for="n in this.looploader" :key ="n.index">
                        <v-skeleton-loader style="margin:2px;" width="215" max-height="195" :loading="loading" type="card" ></v-skeleton-loader>
                    </div>
            </v-layout>
            </v-tab-item>
            <v-tab-item>
                 <v-layout wrap row justify-start class="my-6 hidden-md-and-up" style="max-width:357px; margin:auto;">
                    <div v-for="n in this.looploader" :key ="n.index">
                        <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" ></v-skeleton-loader>
                    </div>
                </v-layout>
                <v-layout wrap row justify-start class="my-6 hidden-sm-and-down" style="max-width: 670px; margin:auto;" >
                    <div v-for="n in this.looploader" :key ="n.index">
                        <v-skeleton-loader style="margin:2px;" width="215" max-height="195" :loading="loading" type="card" ></v-skeleton-loader>
                    </div>
                </v-layout>
            </v-tab-item>
            </v-tabs>
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'
import StudentsCardDesktop from '@/components/StudentsCardDesktop.vue'
import TeachersCardDesktop from '@/components/TeachersCardDesktop.vue'
import CookingCardSharing from '@/components/CookingCardSharing.vue'
import CookingCardSharingDesktop from '@/components/CookingCardSharingDesktop.vue'
import { mapGetters} from 'vuex'
import CookingCard from '~/components/CookingCard.vue'
import CookingCardDesktop from '~/components/CookingCardDesktop.vue'

export default {
    props: ['artist'],
    components: {
        StudentsCard,
        TeachersCard,
        StudentsCardDesktop,
        TeachersCardDesktop,
        CookingCardSharing,
        CookingCardSharingDesktop,
        CookingCard,
        CookingCardDesktop
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
            title: this.artist.artist_name,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.artist_name
                }
            ]
        }
    },
    methods:{
        goback(){
            window.history.back();
        },
        async getsharing(params){
            const key = 'id';
            try {
            const teachers_response = await EventService.getEach1Teach1_teachers(params.username)
            const students_response = await EventService.getEach1Teach1_students(params.username)
            const cooking_response = await EventService.getStudentsCooking(params.username)
            const cooking_own_response = await EventService.getWhatsCookingUsername(params.username)
            this.teachers = teachers_response.data.results
            this.students = students_response.data.results
            this.cooking = cooking_response.data.results
            this.own_cooking = cooking_own_response.data
            // console.log(this.own_cooking);
            this.teachers_page = teachers_response.data.next
            this.students_page = students_response.data.next
            this.cooking_page = cooking_response.data.next
            this.firstLoad = false
            // console.log(response);
            } catch (e) {
                console.log(e);
                this.firstLoad = false
                // error({statusCode:503, message: "unable to fetch shaaring data at this point"})
            }
        },
        infiniteScrollingCooking() {
        if(this.cooking_page){
        const key = 'id';
        this.$axios.get(this.cooking_page).then(response => {
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
        cooking_page:"",
        teachers:[],
        students:[],
        cooking:[],
        own_cooking:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        loading: true,
        firstLoad: true,
    }
  },
}
</script>
<style scoped>
.v-tab {
    letter-spacing: 0;}
.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right) > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes) .v-slide-group__prev {
display: none;}
</style>