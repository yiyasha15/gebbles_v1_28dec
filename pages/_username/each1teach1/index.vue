<template>
    <v-app>
        <v-container v-show="!firstLoad" style="max-width:1185px;">
            <div v-if="isAuthenticated && loggedInUser.user.username==artist.username" class="my-4 " >
                <h3 class="d-inline">Share about your teacher</h3>
                <v-btn x-small icon outlined color="black" class="ml-2" to="/create/each1teach1/">
                <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
        <div v-if="teachers.length">
            <div class="my-4">
            <h3 class="font-weight-light">My Teachers</h3>
            </div>
            <v-layout wrap row justify-center  class="mb-4">
                <div v-for="share in teachers" :key ="share.index">
                    <TeachersCard :e1t1="share" ></TeachersCard>
                </div>
            </v-layout>
        </div>
        <v-card v-intersect="infiniteScrollingTeacher"></v-card>
        <div v-if="students.length">
        <!-- responsive -->
        <div class="mb-5">
        <h3 class="font-weight-light">My Students</h3>
        </div>
        <v-layout wrap row justify-center class="mb-4" >
            <div v-for="share in students" :key ="share.index">
                <StudentsCard :share="share" ></StudentsCard>
            </div>
        </v-layout>
        </div>
        <v-card v-intersect="infiniteScrollingStudents"></v-card>
        <div v-show="!students.length && !teachers.length">
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h3>No posts yet. </h3>
            </center>
        </div>
        </v-container>
        <v-container v-if="firstLoad" style="max-width:1185px;">
            <div class="my-4">
            <h3 class="font-weight-light d-inline">My Teachers</h3>
            </div>
            <v-layout wrap row v-if="firstLoad" justify-center class="mb-4">
                <div v-for="n in this.looploader" :key ="n.index">
                    <v-skeleton-loader class="ma-1" width="115" max-height="105" :loading="loading" type="card" ></v-skeleton-loader>
                </div>
            </v-layout>
            <div class="mb-4">
            <h3 class="font-weight-light d-inline">My Students</h3>
            </div>
            <v-layout wrap row justify-center class="mb-4">
                <div v-for="n in this.looploader" :key ="n.index">
                    <v-skeleton-loader class="ma-1" width="115" max-height="105" :loading="loading" type="card" ></v-skeleton-loader>
                </div>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'
import { mapGetters} from 'vuex'

export default {
    props: ['artist'],
    components: {
        StudentsCard,
        TeachersCard
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
            try {
            const teachers_response = await EventService.getEach1Teach1_teachers(params.username)
            const students_response = await EventService.getEach1Teach1_students(params.username)
            this.teachers = teachers_response.data.results
            this.students = students_response.data.results
            this.teachers_page = teachers_response.data.next
            this.students_page = students_response.data.next
            this.firstLoad = false
            // console.log(response);
            } catch (e) {
                console.log(e);
                // error({statusCode:503, message: "unable to fetch shaaring data at this point"})
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
        teachers:[],
        students:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        loading: true,
        firstLoad: true,
    }
  },
}
</script>