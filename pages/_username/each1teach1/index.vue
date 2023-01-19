<template>
    <v-app>
        <left-navigation></left-navigation>
        <v-container class="pa-0 width background">
        <v-btn icon class="elevation-0 mx-3 mt-3 " @click="goback()" >
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <LearnShare :artist="artist"></LearnShare>
        </v-container>
    </v-app>
</template>

<script>
import LeftNavigation from '@/components/LeftNavigation.vue'
import LearnShare from '~/components/LearnShare.vue'

export default {
    // middleware : 'check_auth',
    props: ['artist'],
    components: {
    LeftNavigation,
    LearnShare
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
        goback(){
            window.history.back();
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