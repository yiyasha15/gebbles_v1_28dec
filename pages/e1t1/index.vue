<template>
    <v-app>
        <v-container class="width mx-auto">
            <h3 style="text-transform: capitalize;">Each one Teach one</h3>
            <div v-if="!firstLoad">
                <div v-if="teachers.length">
                <v-layout wrap justify-start class="my-2" >
                    <div v-for="share in teachers" :key ="share.index">
                        <TeachersCard :e1t1="share" ></TeachersCard>
                    </div>
                </v-layout>
                </div>
                <center v-else>
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                    class="ml-2 mt-6 clickable"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <h4>No each one teach one yet. </h4>
                </center>
                <v-card v-intersect="infiniteScrollingTeacher"></v-card>
            </div>
            <div v-else>
                <v-layout wrap row justify-start class="my-2">
                <div v-for="n in this.looploader" :key ="n.index">
                    <card-skeleton-loader></card-skeleton-loader>
                </div>
            </v-layout>
            </div>
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import TeachersCard from '@/components/TeachersCard.vue'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'

export default {
    components: {
        TeachersCard,
        CardSkeletonLoader
    }, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser','usersTeachers','userHasTeachers']),
    // filteredTeacher: function(){
    //   return this.teachers.filter((share) => {
    //     return share.username === this.artist.username;
    //   });
    // },
    },
    head() {
        return {
            title: 'Each one teach one',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' 
                }
            ]
        }
    },
    methods:{
        postDelete(){
            this.$forceUpdate();
            console.log("updated?... ");
            this.getsharing();
            },
        goback(){
            window.history.back();
        },
        async getsharing(){
            try {
            const teachers_response = await EventService.getEach1Teach1s()
            this.teachers = teachers_response.data.results
            this.teachers_page = teachers_response.data.next
            this.firstLoad = false
            } catch (e) {
                console.log(e);
                this.firstLoad = false
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
    },
    created(){
        this.getsharing();
    },
    data() {
    return {
        teachers_page:"",
        teachers:[],
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