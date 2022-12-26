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
            <v-btn elevation="4" icon small class="float-right ma-1 white" v-if="share.st_latest_cooking_uuid"
              @click.stop="showCooking()"> 
              <v-icon v-if="!share.st_latest_cooking_watched" color="red">mdi-play-circle-outline</v-icon>
              <v-icon v-else color="black">mdi-play-circle-outline</v-icon>
            </v-btn>
        </v-img>
        <v-img v-else :src="require('@/assets/gebbleslogo3.png')" :height="img_height" :width="card_width" contain>
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
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import CookingCard from './CookingCard.vue'
    export default {
      name: 'SharingsCard',
      props: {
        //artist: Object,
        share: Object
      },
      data(){
      return{
        dialog:false,
        videoId:'',
        cook:{},
        loadingCooking:false
      }
    },
      components:{
        CountryFlag,
        CookingCard
      },
      computed: {
        ...mapGetters([ 'userHasPortfolio']),
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
      }
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
          let formName = new FormData();
          formName.append("st_latest_cooking_watched", true);
          formName.append("id", this.share['id']);
          this.$axios.$patch("/v1/e1t1/sharing/"+this.share.uuid, formName, config).then(res=>{
            console.log(res);
          })
        }).catch(error=>{
          this.loadingCooking = false
          console.log(error);
        })
      },
      goToE1t1(uuid){
        this.$router.push('/e1t1/'+uuid)
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
