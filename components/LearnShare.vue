<template>
    <v-tabs v-if="accessAllowed" class="width mx-auto background" centered>
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
    </v-tabs>
    <div v-else>
        <center>
            <v-icon>mdi-lock</v-icon>
            Access is not allowed.<br>
            To view the content, you need to give a shoutout.
        </center>
    </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import TeachersCard from '@/components/TeachersCard.vue'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'

export default {
    middleware : 'check_auth',
    props: ['artist'],
    components: {
        StudentsCard,
        TeachersCard,
        CardSkeletonLoader
    }, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser','usersTeachers','userHasTeachers'])
    },
    methods:{
        async getsharing(){
            this.accessAllowed= true
            const key = 'id';
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            try {
            const teachers_response = await EventService.getEach1Teach1_teachers(config)
            const students_response = await EventService.getEach1Teach1_students(config)
            this.teachers = teachers_response.data.results
            this.students = students_response.data.results
            this.teachers_page = teachers_response.data.next
            this.students_page = students_response.data.next
            this.firstLoad = false
            } catch (e) {
                console.log(e);
                this.firstLoad = false
            }
        },
        getOtherSharing(){},
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
        if(this.artist.username == this.loggedInUser.username)
        this.getsharing();
        else
        this.getOtherSharing();
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
        accessAllowed:false
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