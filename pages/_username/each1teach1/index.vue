<template>
    <v-app>
        <left-navigation></left-navigation>
        <v-container class="pa-0 width background">
        <v-btn icon class="elevation-0 mt-1 " @click="goback()" style="margin-left:-6px">
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
    middleware : 'check_auth',
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
    max-width: 670px;
  }
@media only screen and (max-width: 960px) {
  .width{
  max-width: 357px;
}
}
</style>