<template>
    <v-card elevation="0" class="mx-2 mx-sm-0 mb-6 pa-md-4 pa-2 text-center">
        <!-- <h3 class="pa-2 pa-md-3 font-weight-light text-left"> Share your story... </h3> -->
        <div class="pa-2">
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-hover
                v-slot="{ hover }">
                <v-btn fab 
                    small 
                    v-bind="attrs" 
                    :elevation="hover ? 12 : 6" 
                    color="secondary" 
                    class="mx-1 transition-swing"
                    @click="upload_journey=true"
                    v-on="on">
                    <v-icon color="primary">mdi-book-heart-outline</v-icon>
                </v-btn>
                </v-hover>
            </template>
            <span>Share your journey</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-hover
                    v-slot="{ hover }">
                    <v-btn fab small v-bind="attrs" 
                    :elevation="hover ? 12 : 6"  
                    @click="upload_video=true" 
                    color="secondary" 
                    class="mx-1 transition-swing"
                    v-on="on">
                    <v-icon color="primary">mdi-play-circle-outline</v-icon>
                </v-btn>
                </v-hover>
            </template>
            <span>Upload a video</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-hover
                    v-slot="{ hover }">
                    <v-btn fab small  
                    :elevation="hover ? 12 : 6" 
                    color="secondary" 
                    v-bind="attrs" 
                    class="mx-1 transition-swing"
                    @click="upload_e1t1=true" 
                    v-on="on">
                    <v-icon color="primary">mdi-all-inclusive</v-icon>
                </v-btn>
                </v-hover>
            </template>
            <span>Give a shoutout</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-hover
                    v-slot="{ hover }">
                    <v-btn fab small color="secondary" 
                    :elevation="hover ? 12 : 6" 
                    v-bind="attrs" 
                    class="mx-1 transition-swing"
                    @click="upload_workshop=true" 
                    v-on="on">
                    <v-icon color="primary">mdi-leaf-circle-outline</v-icon>
                </v-btn>
                </v-hover>
            </template>
            <span>Create a workshop</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-hover
                    v-slot="{ hover }">
                    <v-btn fab small 
                    :elevation="hover ? 12 : 6" 
                    color="secondary" 
                    v-bind="attrs" 
                    class="mx-1 transition-swing"
                    @click="upload_event=true" 
                    v-on="on">
                    <v-icon color="primary">mdi-google-circles-communities</v-icon>
                </v-btn>
                </v-hover>
            </template>
            <span>Create an event</span>
        </v-tooltip>
        <h3 class="pa-2 pa-md-3 font-weight-light my-3"> Share your story </h3>
        <center>
        <v-divider width="360" />
        </center>
        </div>
        <v-dialog max-width="550" persistent
        v-model="upload_video">
        <v-container class="rounded-lg white px-4">
        <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon color="error" class="float-right" @click="close_upload_video">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
        <upload-video-card :key="videoKey"></upload-video-card>
        </v-container>
        </v-dialog>
        <v-dialog max-width="550" persistent
        v-model="upload_journey">
        <v-container class="rounded-lg white px-4">
        <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon color="error" class="float-right" @click="close_upload_journey">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
        <upload-journey-card :key="journeyKey"> </upload-journey-card>
        </v-container>
        </v-dialog>
        <v-dialog max-width="550" persistent
        v-model="upload_e1t1">
        <v-container class="rounded-lg white px-4">
        <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon color="error" class="float-right" @click="close_upload_e1t1">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
          <upload-e-1-t-1-card :key="e1t1Key"></upload-e-1-t-1-card>
        </v-container>
        </v-dialog>
        <v-dialog max-width="550" persistent
        v-model="upload_event">
        <v-container class="rounded-lg white px-4">
        <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon color="error" class="float-right" @click="close_upload_event">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
          <upload-event-card :key="eventKey"></upload-event-card>
        </v-container>
        </v-dialog>
        <v-dialog max-width="550" persistent
        v-model="upload_workshop">
        <v-container class="rounded-lg white px-4">
        <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon color="error" class="float-right" @click="close_upload_workshop">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
          <upload-workshop-card :key="workshopKey"></upload-workshop-card>
        </v-container>
        </v-dialog>
    </v-card>
</template>
<script>
import {mapGetters} from 'vuex'
import UploadE1T1Card from './UploadE1T1Card.vue'
import UploadEventCard from './UploadEventCard.vue'
import UploadJourneyCard from './UploadJourneyCard.vue'
import UploadVideoCard from './UploadVideoCard.vue'
import UploadWorkshopCard from './UploadWorkshopCard.vue'
export default {
  components: { UploadVideoCard, UploadJourneyCard, UploadE1T1Card, UploadWorkshopCard, UploadEventCard },
    data(){
        return{
            eventKey:1,
            videoKey:1,
            journeyKey:1,
            e1t1Key:1,
            workshopKey:1,
            upload_video:false,
            upload_journey:false,
            upload_e1t1:false,
            upload_event:false,
            upload_workshop:false,
        }
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])},
    methods:{
        close_upload_video(){
            this.$store.dispatch("remove_cook_obj")
            this.videoKey++;
            this.upload_video=false; 
        },
        close_upload_journey(){
            this.$store.dispatch("remove_editing_obj")
            this.journeyKey++;
            this.upload_journey=false; 
        },
        close_upload_e1t1(){
            this.$store.dispatch("remove_share_obj")
            this.e1t1Key++;
            this.upload_e1t1=false; 
        },
        close_upload_event(){
            this.$store.dispatch("remove_editing_event_obj")
            this.eventKey++;
            this.upload_event=false; 
        },
        close_upload_workshop(){
            this.$store.dispatch("remove_editing_workshop_obj")
            this.workshopKey++;
            this.upload_workshop=false; 
        },
    }
}
</script>
<style scoped>
.cp{
    cursor: pointer;
}
</style>