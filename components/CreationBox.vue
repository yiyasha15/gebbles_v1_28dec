<template>
    <v-card elevation="0" outlined class="mb-6 pa-md-6 pa-3 text-center">
        <h3 class="px-2 pa-md-5 font-weight-medium"> Share your story... </h3>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" 
                    v-on="on">
                    <v-icon color="primary">mdi-book-heart-outline</v-icon>
                </v-btn>
            </template>
            <span>Share your journey</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" @click="upload_video=true"
                    v-on="on">
                    <v-icon color="primary">mdi-play-circle-outline</v-icon>
                </v-btn>
            </template>
            <span>Upload a video</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs"
                    v-on="on">
                    <v-icon color="primary">mdi-all-inclusive</v-icon>
                </v-btn>
            </template>
            <span>Give a shoutout</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs"
                    v-on="on">
                    <v-icon color="primary">mdi-google-circles-communities</v-icon>
                </v-btn>
            </template>
            <span>Create an event</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs"
                    v-on="on">
                    <v-icon color="primary">mdi-leaf-circle-outline</v-icon>
                </v-btn>
            </template>
            <span>Create a workshop</span>
        </v-tooltip>
        <v-dialog max-width="550" 
        v-model="upload_video">
        <v-container class="rounded-lg white px-4">
        <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon color="error" class="float-right" @click="close_upload_video">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
        <upload-video-card></upload-video-card>
        </v-container>
        </v-dialog>
        <!-- <v-card-title >Create a page for your event</v-card-title>
        <v-row class="pa-3">
            <v-col cols="12" md="6">
                <v-hover
                v-slot="{ hover }">
                <v-card :elevation="hover ? 6 : 0" class="pa-5 transition-swing text-center cp" outlined>
                    <v-icon class="pr-2">mdi-google-circles-communities</v-icon><br>
                    Create an event page
                </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" md="6">
                <v-hover
                v-slot="{ hover }">
                <v-card :elevation="hover ? 6 : 0" class="pa-5 transition-swing text-center cp" outlined>
                    <v-icon class="pr-2">mdi-leaf-circle-outline</v-icon><br>
                    Create a workshop page</v-card>
                </v-hover>
            </v-col>
        </v-row> -->
    </v-card>
</template>
<script>
import {mapGetters} from 'vuex'
import UploadVideoCard from './UploadVideoCard.vue'
export default {
  components: { UploadVideoCard },
    data(){
        return{
            upload_video:false
        }
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])},
    methods:{
        close_upload_video(){
            this.$store.dispatch("remove_cook_obj")
            this.upload_video=false; 
        }
    }
}
</script>
<style scoped>
.cp{
    cursor: pointer;
}
.v-icon{
    color:primary;
}
</style>