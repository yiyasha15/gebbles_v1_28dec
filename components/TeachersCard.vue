<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card
        data-view
        :elevation="hover ? 6 : 0"
        class="transition-swing"
        outlined>
        <v-img @click="goToE1t1(e1t1.uuid)" class="pointer" v-if = e1t1.image_mini :src = "e1t1.image_mini"
         :lazy-src= "e1t1.image_mini" :height="img_height">
          <v-btn elevation="4" icon small class="float-right ma-1 white"
           v-if="e1t1.te_latest_cooking_uuid "
            @click.stop="showCooking()"> 
            <v-icon color="red" v-if="!e1t1.te_latest_cooking_watched">mdi-play-circle-outline</v-icon>
            <v-icon color="black" v-else>mdi-play-circle-outline</v-icon>
          </v-btn>
        </v-img>
        <v-img @click="goToE1t1(e1t1.uuid)" class="pointer" v-else :src="require('@/assets/gebbleslogo3.png')" :height="img_height" contain>
        <v-btn elevation="4" icon small class="float-right ma-1 white" v-if="e1t1.te_latest_cooking_uuid && !e1t1.te_latest_cooking_watched"
            @click.stop="showCooking()"> 
            <v-icon color="red">mdi-play-circle-outline</v-icon>
          </v-btn>
        </v-img>
        <v-card-actions height="32px">
          <div class="caption width">
          <nuxt-link :to="'/'+ e1t1.teacher" class="text-decoration-none" v-if="e1t1.teacher"><p class="event_p">{{e1t1.s_teacher_name}} </p></nuxt-link>
          <p class="event_p" v-else>{{e1t1.s_teacher_name}} </p>
          </div>
          <v-spacer></v-spacer>
            <country-flag :country= 'e1t1.s_teacher_country' size='small'/>
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
        <v-list-item two-line class="px-md-0">
            <v-list-item-avatar v-if="e1t1.image_mini">
              <v-img :src="e1t1.image_mini"></v-img>
            </v-list-item-avatar>
            <v-list-item-avatar v-else>
            <v-icon size="36" class="ma-0">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title><nuxt-link :to="'/'+ e1t1.s_teacher_name" v-if="e1t1.s_teacher_name" class="text-decoration-none">
                    {{e1t1.s_teacher_name}}
                </nuxt-link></v-list-item-title>
                <v-list-item-subtitle>{{moment(this.e1t1.te_created_cooking)}}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-list-item-action>
                <v-btn icon :to="'/whatiscooking/' + e1t1.te_latest_cooking_uuid">
                  <v-icon>mdi-arrow-top-right-thin-circle-outline</v-icon>
                </v-btn>
            </v-list-item-action> -->
        </v-list-item>
        <!-- {{ e1t1 }} -->
        <div class="body-1 feed_content mb-2 mb-md-5 px-md-0 px-4">{{e1t1.te_lesson}}</div>
        <youtube width="100%" :height="height" :video-id= 'videoId' v-if="videoId"></youtube>
        <LikeAndComment :cookuuid="e1t1.te_latest_cooking_uuid"></LikeAndComment>
        <!-- <div v-if="loadingCooking">
          <v-skeleton-loader
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="card" width="100%" 
          ></v-skeleton-loader>
          <v-skeleton-loader
              type="list-item-avatar-three-line"
            ></v-skeleton-loader>
        </div>
        <CookingFeed v-else :cook="cook"></CookingFeed> -->
      </v-container>
    </v-dialog> 
  </div>
</template>
<script>
import CountryFlag from 'vue-country-flag'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import EventService from '@/services/EventService.js'
import CookingFeed from './CookingFeed.vue';
import moment from 'moment'
import LikeAndComment from './LikeAndComment.vue';
  export default {
    name: 'TeachersCard',
    props: {
      e1t1: Object
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
    Youtube,
    CookingFeed,
    LikeAndComment
},
    methods:{
      moment(date){
          return moment(date).format("ll")
      },
      sendLove(){
        console.log("love sent to teacher");
      },
      showCooking(){
        this.videoId = getIdFromURL(this.e1t1.te_latest_cooking_yt_link) 
        this.dialog = true
        const config = {
          headers: {"content-type": "multipart/form-data",
              "Authorization": this.$auth.strategy.token.get()
          }
        };
           if(!this.e1t1.te_latest_cooking_watched){
            this.e1t1.te_latest_cooking_watched = !this.e1t1.te_latest_cooking_watched
            let formName = new FormData();
            formName.append("te_latest_cooking_watched", true);
            formName.append("id", this.e1t1['id']);
            this.$axios.$patch("/v1/e1t1/sharing/watched/"+this.e1t1.uuid, formName, config).then(res=>{
            console.log(res);
          })}
        // const config = {
        //   headers: {"content-type": "multipart/form-data",
        //       "Authorization": this.$auth.strategy.token.get()
        //   }
        // };
        // EventService.getWhatsCookingId(this.e1t1.te_latest_cooking_uuid).then(res => {
        //   this.loadingCooking = false
        //   this.cook = res.data
        //   if(!this.e1t1.te_latest_cooking_watched){
        //     let formName = new FormData();
        //     formName.append("te_latest_cooking_watched", true);
        //     formName.append("id", this.e1t1['id']);
        //     this.$axios.$patch("/v1/e1t1/sharing/watched/"+this.e1t1.uuid, formName, config).then(res=>{
        //     console.log(res);
        //     this.e1t1.te_latest_cooking_watched = !this.e1t1.te_latest_cooking_watched
        //   })}
        // }).catch(error=>{
        //   this.loadingCooking = false
        //   console.log(error);
        // })
      },
      goToE1t1(uuid){
        this.$router.push('/e1t1/'+uuid)
      }
    },
    computed: {
      img_height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 104
        case 'sm': return 134
        case 'md': return 134
        case 'lg': return 134
        case 'xl': return 134
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
.pointer{
  cursor: pointer;
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

