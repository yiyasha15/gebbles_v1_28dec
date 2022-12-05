<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="transition-swing ma-md-2 ma-1 rounded-sm"
      data-view
      @click="dialog=true"
      :elevation="hover ? 6 : 0"
      outlined 
      :width="card_width" 
      :max-height="card_height">
      <!-- <youtube :width="card_width" :height="img_height" :video-id= 'videoId' v-if="videoId"></youtube> -->
    <v-img v-if="cook.thumbjs" class="rounded-sm"
      :src="cook.thumbjs"
      :height="img_height"
      :width="card_width" />
    <v-img v-else class="rounded-sm"
      :src="youtube_thumb"
      :height="img_height"
      :width="card_width" />
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
        <cooking-feed :cook="cook" @postDelete="postDelete"></cooking-feed>
        </v-container>
      </v-dialog> 
    </v-card>
  </v-hover>
</template>
<script>
import { Youtube } from 'vue-youtube';
import CookingFeed from '@/components/CookingFeed.vue'
import { getIdFromURL } from 'vue-youtube-embed'
    export default {
        head() {  
        return {
            title: "gebbles -What's cookin",
            }
        },
        name: 'CookingCard',
        props: {
            cook: Object
        },
        components: {
          CookingFeed, Youtube
        },
        created(){
          let yt_re =/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
          let url =this.$props.cook.video 
          console.log(url);
          if(yt_re.test(url))
          {
            this.youtube_thumb = this.getThumb(url);
            this.videoId = getIdFromURL(url) 
          }
          
        },
        data() {
          return {
            videoId:'',
            dialog:false,
            youtube_thumb:''
          }
        },
        computed:{
        img_height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 83
          case 'sm': return 83
          case 'md': return 144
          case 'lg': return 144
          case 'xl': return 144
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
            case 'xs': return 115
            case 'sm': return 115
            case 'md': return 205
            case 'lg': return 205
            case 'xl': return 205
          }
        },
        },
        methods:{
          postDelete(){
            this.$forceUpdate();
            this.dialog=false
            this.$emit("postDelete");
          },
          getThumb(url){
            // const videoId = url.split("v=")[1]; 
            let results = url.match('[\\?&]v=([^&#]*)');
            let video   = (results === null) ? url : results[1];

            const imageURL = `https://img.youtube.com/vi/${video}/hqdefault.jpg`; 
            // let big_thumb ='http://img.youtube.com/vi/' + video + '/0.jpg';
            // let thumb = 'http://img.youtube.com/vi/' + video + '/2.jpg';
            // console.log(big_thumb, thumb);
            return imageURL;
          }
        }
    }
</script>
