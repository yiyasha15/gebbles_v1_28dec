<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card
        data-views
        @click="goToE1t1(share.uuid)"
        :elevation="hover ? 6 : 0"
        class="transition-swing ma-md-2 ma-1"
        outlined
        :width="card_width" 
        :max-height="card_height">
        <v-img v-if="share.image_mini"
            :src = "share.image_mini"
            :height="img_height" :width="card_width">
            <v-btn elevation="4" icon small class="float-right ma-1 white" v-if="!share.is_approved"
              @click.stop="approveDialog = true"> 
              <v-icon color="red">mdi-check-circle-outline</v-icon>
            </v-btn>
            <v-btn elevation="4" icon small class="float-right ma-1 white" v-if="share.st_latest_cooking_uuid"
              @click.stop="showCooking()"> 
              <v-icon v-if="!share.st_latest_cooking_watched" color="red">mdi-play-circle-outline</v-icon>
              <v-icon v-else color="black">mdi-play-circle-outline</v-icon>
            </v-btn>
        </v-img>
        <v-img v-else :src="require('@/assets/gebbleslogo3.png')" :height="img_height" :width="card_width" contain>
          <v-btn elevation="4" icon small class="float-right ma-1 white" v-if="!share.is_approved"
              @click.stop="approveDialog = true"> 
              <v-icon color="red">mdi-check-circle-outline</v-icon>
            </v-btn>
          <v-btn elevation="4" icon small class="float-right ma-1 white" v-if="share.st_latest_cooking_uuid"
            @click.stop="showCooking()"> 
            <v-icon v-if="!share.st_latest_cooking_watched" color="red">mdi-play-circle-outline</v-icon>
            <v-icon v-else color="black">mdi-play-circle-outline</v-icon>
          </v-btn>
        </v-img>
        <v-card-actions height="32px">
          <div class="text-decoration-none caption width" >
          <p class="event_p">{{share.username}}</p>
          </div>
          <v-spacer></v-spacer>
            <country-flag :country= 'share.s_student_country' size='small'/>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-dialog
      :retain-focus="false"
      v-model="dialog"
      width="800px"
      persistent>
      <v-container class="rounded-lg white pa-2 pa-md-4">
        <v-row align="end" justify="end" class="ma-1 ma-md-0">
        <v-btn icon color="error" @click="dialog=false; ">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-row> 
        <!-- {{share}} -->
        <div v-if="loadingCooking">
          <v-skeleton-loader
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
          <youtube width="100%" :height="height" :video-id= 'videoId' v-if="videoId"></youtube>
          <v-skeleton-loader
              type="list-item-avatar-three-line"
            ></v-skeleton-loader>
        </div>
        <CookingFeed v-else :cook="cook"></CookingFeed>
      </v-container>
    </v-dialog>
    <v-dialog v-model="approveDialog" width="500" persistent>
        <v-card class="pa-6">
            <p>Do you want to approve this shoutout?</p><small>Approving the shoutout will give them access to view your Each one Teach one posts.</small>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="approveLoading"
                @click="approveAsStudent">Approve</v-btn>
            <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="approveDialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import EventService from '@/services/EventService.js'
import CookingFeed from './CookingFeed.vue';

export default {
  name: 'StudentsCard',
  props: {
    //artist: Object,
    share: Object
  },
  data(){
    return{
      dialog:false,
      approveDialog:false,
      videoId:'',
      cook:{},
      loadingCooking:false,
      approveLoading:false
    }
  },
  components:{
    CountryFlag,
    Youtube,
    CookingFeed
  },
  computed: {
  img_height () {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 73
      case 'sm': return 73
      case 'md': return 134
      case 'lg': return 134
      case 'xl': return 134
    }
  },
  card_width () {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 110
      case 'sm': return 110
      case 'md': return 205
      case 'lg': return 205
      case 'xl': return 205
    }
  },
  card_height() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 105
      case 'sm': return 105
      case 'md': return 205
      case 'lg': return 205
      case 'xl': return 205
    }
  },
  height () {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 220
      case 'sm': return 410
      case 'md': return 410
      case 'lg': return 410
      case 'xl': return 410
    }
  },
  },
  methods:{
  showCooking(){
    this.loadingCooking = true
    this.videoId = getIdFromURL(this.share.st_latest_cooking_yt_link) 
    this.dialog = true
    const config = {
      headers: {"content-type": "multipart/form-data",
          "Authorization": this.$auth.strategy.token.get()
      }
    };
    EventService.getWhatsCookingId(this.share.st_latest_cooking_uuid).then(res => {
      this.loadingCooking = false
      this.cook = res.data
      // patch video watched
      if(!this.share.st_latest_cooking_watched){
        let formName = new FormData();
        formName.append("st_latest_cooking_watched", true);
        formName.append("id", this.share['id']);
        this.$axios.$patch("/v1/e1t1/sharing/watched/"+this.share.uuid, formName, config).then(res=>{
        console.log(res);
        this.share.st_latest_cooking_watched = !this.share.st_latest_cooking_watched;
      })
      }
    }).catch(error=>{
      this.loadingCooking = false
      console.log(error);
    })
  },
  goToE1t1(uuid){
    this.$router.push('/e1t1/'+uuid)
  },
  async approveAsStudent(){
    this.approveLoading = true
    const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()
        }
    };
    try {
      let formName = new FormData();
        formName.append("is_approved", true);
        formName.append("id", this.share['id']);
        this.$axios.$patch("/v1/e1t1/sharing/watched/"+this.share.uuid, formName, config).then(res=>{
        console.log(res);
        this.approveDialog = false
        this.approveLoading = false
        this.share.is_approved = !this.share.is_approved;
      })
        
    } catch (e) {
        this.approveDialog = false
        this.approveLoading = false
        console.log(e.response);
    }
  }
  }
}
</script>
<style scoped>

.width{
    width: 177px;
    height: 1.7em;
    line-height: initial;
    overflow: hidden
  }
.event_p{
  max-width:177px; 
  font-size:0.8rem!important;
}
@media only screen and (max-width: 960px) {
  .width{
  width: 80px;
  height: 1.3em;
  line-height: initial;
  overflow: hidden
}
.event_p{
  max-width:80px;
   font-size:0.6rem!important;
}
}
</style>
