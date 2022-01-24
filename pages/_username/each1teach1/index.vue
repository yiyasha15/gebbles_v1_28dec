<template>
    <v-app>
        <v-container>
            <div v-if="isAuthenticated && loggedInUser.user.username==artist.username" class="my-4 " >
            <h3 class="font-weight-light d-inline">Share about your teacher</h3>
            <v-btn x-small icon outlined color="indigo" class="ml-2" to="/create/each1teach1/">
            <v-icon>mdi-plus</v-icon>
            </v-btn>
            </div>
        <nuxt-child :sharing="sharing"/>
        <div v-if="sharing.length">
        <div v-if="filteredTeacher.length">
            <div class="mb-5">
            <h3 class="font-weight-light">My Teachers</h3>
            </div>
        <!-- responsive -->
            <v-layout wrap row :class="{'mb-4 justify-center': $vuetify.breakpoint.smAndDown, 'mb-4': $vuetify.breakpoint.mdAndUp}">
                <div v-for="share in sharing" :key ="share.index">
                    <v-flex v-if="share.username === artist.username"> 
                    <TeachersCard :e1t1="share" ></TeachersCard>
                    </v-flex>
                </div>
            </v-layout>
        </div>
        <div v-if="filteredStudent.length">
        <!-- responsive -->
        <div class="mb-5">
        <h3 class="font-weight-light">My Students</h3>
        </div>
        <v-layout wrap row :class="{'mb-4  justify-center': $vuetify.breakpoint.smAndDown, 'mb-4 ': $vuetify.breakpoint.mdAndUp}" >
            <div v-for="share in sharing" :key ="share.index">
                <v-flex v-if="share.s_teacher_name === artist.username"> 
                    <StudentsCard :share="share" ></StudentsCard>
                </v-flex>
                </div>
        </v-layout>
        </div>
        </div>
        <div v-else>
            <center>
                    <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="mt-6 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h3>No posts yet. </h3></center>
        </div>
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
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    filteredTeacher: function(){
      return this.sharing.filter((share) => {
        return share.username === this.artist.username;
      });
    },
    filteredStudent: function(){
      return this.sharing.filter((share) => {
        return share.s_teacher_name === this.artist.username;
      });
    },
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
    },
    async asyncData({error, params}) {
      try {
        let sharing_response = await EventService.getEach1Teach1_user(params.username)
        return {
            sharing: sharing_response.data
        }
      } catch (err) {
        error({statusCode:503,  message: err.message})
        }
    },
}
</script>