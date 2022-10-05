<template>
    <v-card elevation="0" color="background" class="mx-2 mx-sm-0 pa-md-4 pa-2 text-center" rounded="lg">
            <!-- <v-icon size="26" color="secondary" class="mb-4">mdi-brush-outline</v-icon> -->
        <!-- <h3 class="pa-2 pa-md-3 font-weight-light text-left"> Share your story... </h3> -->
        <div class="pa-2">
            <div top v-if="desktop">
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-hover
                        v-slot="{ hover }">
                        <v-card 
                        class="pa-2 mx-1 transition-swing d-inline" 
                        :elevation="hover ? 12 : 6" outlined color="secondary" max-width="100"
                        v-bind="attrs" 
                        @click="upload_journey=true"
                        v-on="on">
                        <v-icon color="dark_primary">mdi-book-heart-outline</v-icon><span class="dark_primary--text ml-1">Share</span>
                        </v-card>
                    </v-hover>
                </template>
                <span>Share your journey</span>
            </v-tooltip> 
            <v-tooltip top >
                <template v-slot:activator="{ on, attrs }">
                    <v-hover
                        v-slot="{ hover }">
                        <v-card 
                        class="pa-2 mx-1 transition-swing d-inline" 
                        :elevation="hover ? 12 : 6" outlined color="secondary" max-width="100"
                        v-bind="attrs" 
                        @click="upload_video=true"
                        v-on="on">
                        <v-icon color="dark_primary">mdi-play-circle-outline</v-icon><span class="dark_primary--text ml-1">Video</span>
                        </v-card>
                    </v-hover>
                </template>
                <span>What's cookin</span>
            </v-tooltip> 
            <v-tooltip top >
                <template v-slot:activator="{ on, attrs }">
                    <v-hover
                        v-slot="{ hover }">
                        <v-card 
                        class="pa-2 mx-1 transition-swing d-inline" 
                        :elevation="hover ? 12 : 6" outlined color="secondary" max-width="100"
                        v-bind="attrs" 
                        @click="upload_e1t1=true"
                        v-on="on">
                        <v-icon color="dark_primary">mdi-all-inclusive</v-icon><span class="dark_primary--text ml-1">Shoutout</span>
                        </v-card>
                    </v-hover>
                </template>
                <span>Give a shoutout</span>
            </v-tooltip> 
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-hover
                        v-slot="{ hover }">
                        <v-card 
                        class="pa-2 mx-1 transition-swing d-inline" 
                        :elevation="hover ? 12 : 6" outlined color="secondary" max-width="100"
                        v-bind="attrs" 
                        @click="upload_workshop=true"
                        v-on="on">
                        <v-icon color="dark_primary">mdi-leaf-circle-outline</v-icon><span class="dark_primary--text ml-1">Workshop</span>
                        </v-card>
                    </v-hover>
                </template>
                <span>Create a workshop</span>
            </v-tooltip> 
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-hover
                        v-slot="{ hover }">
                        <v-card 
                        class="pa-2 mx-1 transition-swing d-inline" 
                        :elevation="hover ? 12 : 6" outlined color="secondary" max-width="100"
                        v-bind="attrs" 
                        @click="upload_event=true"
                        v-on="on">
                        <v-icon color="dark_primary">mdi-google-circles-communities</v-icon><span class="dark_primary--text ml-1">Event</span>
                        </v-card>
                    </v-hover>
                </template>
                <span>Create an event</span>
            </v-tooltip> 
            </div>
            <div v-else>
            <v-btn fab small elevation="6" 
                @click="upload_journey=true" 
                color="secondary" 
                class="mx-1">
                <v-icon color="dark_primary">mdi-book-heart-outline</v-icon>
            </v-btn>
            <v-btn fab small elevation="6" 
                @click="upload_video=true" 
                color="secondary" 
                class="mx-1">
                <v-icon color="dark_primary">mdi-play-circle-outline</v-icon>
            </v-btn>
            <v-btn fab small elevation="6" 
                @click="upload_e1t1=true" 
                color="secondary" 
                class="mx-1">
                <v-icon color="dark_primary">mdi-all-inclusive</v-icon>
            </v-btn>
            <v-btn  fab small elevation="6" 
                @click="upload_workshop=true" 
                color="secondary" 
                class="mx-1">
                <v-icon color="dark_primary">mdi-leaf-circle-outline</v-icon>
            </v-btn>
            <v-btn fab small elevation="6" 
                @click="upload_event=true" 
                color="secondary" 
                class="mx-1">
                <v-icon color="dark_primary">mdi-google-circles-communities</v-icon>
            </v-btn>
            </div>
        <h3 class="pa-2 pa-md-3 font-weight-light my-3"> HipHop Way of Life!</h3>
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
        desktop() {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return false
            case 'sm': return true
            case 'md': return true
            case 'lg': return true
            case 'xl': return true
          }
        },
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