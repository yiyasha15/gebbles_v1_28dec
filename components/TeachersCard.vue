<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card
        data-view
        @click="goToE1t1(e1t1.uuid)"
        :elevation="hover ? 6 : 0"
        class="transition-swing ma-md-2 ma-1"
        outlined
        :width="card_width" 
        :max-height="card_height">
        <v-img v-if = e1t1.image_mini :src = "e1t1.image_mini" :lazy-src= "e1t1.image_mini" :height="img_height" :width="card_width">
          <v-btn elevation="4" icon small class="float-right ma-1 white" v-if="e1t1.teachers_latest_cooking"
            @click.stop="showCooking(e1t1.teachers_latest_cooking,e1t1.latest_cooking_yt_link)"> 
            <v-icon color="red">mdi-play-circle-outline</v-icon>
          </v-btn>
        </v-img>
        <v-img v-else :src="require('@/assets/gebbleslogo3.png')" :height="img_height"  :width="card_width" contain>
        <v-btn icon small class="float-right ma-1 white" 
          @click.stop="showCooking(e1t1.teachers_latest_cooking,e1t1.latest_cooking_yt_link)">
          <v-icon color="red" small>mdi-calendar-heart</v-icon>
          </v-btn>
        </v-img>
        <v-card-actions height="32px">
          <div class="text-decoration-none caption width">
          <p class="event_p">{{e1t1.s_teacher_name}} </p>
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

        <youtube width="100%" :height="height" :video-id= 'videoId' v-if="videoId"></youtube>
      </v-container>
    </v-dialog> 
  </div>
</template>
<script>
import CountryFlag from 'vue-country-flag'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import EventService from '@/services/EventService.js'
  export default {
    name: 'TeachersCard',
    props: {
      e1t1: Object
    },
    data(){
      return{
        dialog:false,
        videoId:''
      }
    },
    components:{
      CountryFlag,
      Youtube
    },
    methods:{
      showCooking(n,url){
        const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
        EventService.getCooking(n,config).then(res => {
          console.log(res);
        })
        this.videoId = getIdFromURL(url) 
        this.dialog = true
      },
      goToE1t1(uuid){
        this.$router.push('/e1t1/'+uuid)
      }
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

