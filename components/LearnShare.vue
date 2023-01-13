<template>
    <v-tabs v-if="!firstLoad" class="width mx-auto background" centered>
        <v-tab>
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Learning</p>
            <p class="font-weight-light ma-0" style="font-size:10px; text-transform: lowercase;">(each one)</p>
        </v-tab>
        <v-tab v-if="!studentAccess">
            <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Sharing</p>
            <p class="font-weight-light  ma-0" style="text-transform: lowercase; font-size:10px">(teach one)</p>
        </v-tab>
        <v-tab-item class="background">
            <!-- {{ accessAllowed }}
            {{ studentAccess }} -->
            <div class="ml-1 py-2 grey--text text-center caption"><v-icon small>mdi-all-inclusive</v-icon> artists <b>{{artist.username}}</b> gave a shoutout to</div>
            <div v-if="accessAllowed">
            <div v-if="teachers.length">
            <v-row class="ma-0">
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="share in teachers" :key ="share.index">
                    <TeachersCard :e1t1="share" ></TeachersCard>
                </v-col>
            </v-row>
            </div>
            <center v-if="!teachers.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <p class="grey--text mt-4">No posts found. </p>
            </center>
            <v-card v-intersect="infiniteScrollingTeacher" class="background"></v-card>
            </div>
            <center v-else>
                <p class="grey--text text-center mt-12"><v-icon>mdi-lock</v-icon>
                    Access is not allowed.</p><p class="grey--text text-center">
                    To view their each 1 teach 1, you need to give a shoutout and wait for approval.
                </p>
            </center>
        </v-tab-item>
        <v-tab-item class="background">
            <div class="ml-1 py-2 grey--text text-center caption"> <v-icon small>mdi-all-inclusive</v-icon> artists that gave <b>{{artist.username}}</b> a shoutout</div>
            <div v-if="students.length">
            <v-row class="ma-0">
                <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="share in students" :key ="share.index">
                    <StudentsCard :share="share" ></StudentsCard>
                </v-col>
            </v-row>
            </div>
            <center v-if="!students.length && !firstLoad">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <p class="grey--text mt-4">No posts found. </p>
            </center>
            <v-card v-intersect="infiniteScrollingStudents" class="background"></v-card>
        </v-tab-item>
    </v-tabs>
    <div v-else>
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
        async getOtherSharing(){
            this.studentAccess = true
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            try {
            const teachers_response = await EventService.getOthersSharing(this.artist.username, config)
            // const students_response = await EventService.getEach1Teach1_students(config)
            this.teachers = teachers_response.data.results
            // this.students = students_response.data.results
            this.teachers_page = teachers_response.data.next
            // this.students_page = students_response.data.next
            this.accessAllowed= true
            this.firstLoad = false
            console.log(teachers_response);
            } catch (e) {
                this.firstLoad = false
                console.log(e.response);
                if(e.response.data.detail == 'Authentication credentials were not provided.' || e.response.data.detail =='You do not have permission to perform this action.')
                {this.accessAllowed= false
                }
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
        accessAllowed:false,
        studentAccess:false
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