<template>
    <v-app>
        <v-container>
        <nuxt-child :sharing="sharing"/>
        <div v-if="sharing.length">
            <div class="mb-4">
        <h3 class="font-weight-light mt-4 d-inline">My Teachers</h3>
        <v-btn x-small v-if="isAuthenticated && loggedInUser.user.username==artist.username" icon outlined color="indigo" class="ml-2" to="/create/each1teach1/">
        <v-icon>mdi-plus</v-icon>
        </v-btn></div>
        <!-- responsive -->
        <v-layout wrap row :class="{'mt-4 justify-center': $vuetify.breakpoint.smAndDown, 'mt-4': $vuetify.breakpoint.mdAndUp}">
            <div v-for="share in sharing" :key ="share.index">
                <v-flex v-if="share.username === artist.username"> 
                <TeachersCard :e1t1="share" ></TeachersCard>
                </v-flex>
                </div>
        </v-layout>
        <!-- responsive -->
        <h3 class="font-weight-light mt-8">My Students</h3>
        <v-layout wrap row :class="{'mt-2 justify-center': $vuetify.breakpoint.smAndDown, 'mt-2': $vuetify.breakpoint.mdAndUp}" >
            <div v-for="share in sharing" :key ="share.index">
                <v-flex > 
                    <StudentsCard v-if="share.s_teacher_name === artist.username" :share="share" ></StudentsCard>
                </v-flex>
                </div>
        </v-layout>
        </div>
        <div v-else >
            <div v-if="isAuthenticated && loggedInUser.user.username==artist.username" >
            <h3 class="font-weight-light mb-4 pl-4 mt-4 d-inline">Add Each One Teach One</h3>
            <v-btn x-small v-if="isAuthenticated && loggedInUser.user.username==artist.username" icon outlined color="indigo" class="ml-2" to="/create/each1teach1/">
            <v-icon>mdi-plus</v-icon>
            </v-btn>
            </div>
            <center>
                    <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
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