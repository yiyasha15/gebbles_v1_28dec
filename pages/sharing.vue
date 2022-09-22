<template>
    <v-app>
        <v-container  class="width mx-auto">
           <h2 class="font-weight-medium mb-4">Sharing</h2>
            <div v-if="!firstLoad">
                <div v-if="students.length">
                <v-layout wrap row justify-start class="my-2 ">
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
                    <h4>No posts yet. </h4>
                </center>
                <v-card v-intersect="infiniteScrollingStudents"></v-card>
            </div>
            <div v-else>
                <v-layout wrap row justify-start class="my-2">
                <div v-for="n in this.looploader" :key ="n.index">
                    <v-skeleton-loader style="margin:2px;" :width="cardwidth" :max-height="cardheight" :loading="loading" type="card" ></v-skeleton-loader>
                </div>
                </v-layout>
            </div>
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import StudentsCard from '@/components/StudentsCard.vue'
import { mapGetters} from 'vuex'

export default {
    middleware : 'check_auth',
    components: {
        StudentsCard,
    }, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    cardheight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 105
          case 'sm': return 105
          case 'md': return 172
          case 'lg': return 172
          case 'xl': return 172
        }
      },
      cardwidth () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 115
          case 'sm': return 115
          case 'md': return 215
          case 'lg': return 215
          case 'xl': return 215
        }
      },
    },
    head() {
        return {
            title: this.loggedInUser.username + 'shoutouts',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.loggedInUser.username
                }
            ]
        }
    },
    methods:{
        postDelete(){
            this.$forceUpdate();
            console.log("updated?");
            this.getsharing(this.loggedInUser.username);
            },
        goback(){
            window.history.back();
        },
        async getsharing(){
            const key = 'id';
            try {
            const students_response = await EventService.getEach1Teach1_students(this.loggedInUser.username)
            this.students = students_response.data.results
            this.students_page = students_response.data.next
            this.firstLoad = false
            } catch (e) {
                console.log(e);
                this.firstLoad = false
            }
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
        this.getsharing();
    },
    data() {
    return {
        students_page:"",
        students:[],
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