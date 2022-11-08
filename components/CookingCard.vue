<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="transition-swing ma-md-2 ma-1"
      data-view
      @click="dialog=true"
      :elevation="hover ? 6 : 0"
      outlined
      :width="card_width" 
      :max-height="card_height">
    <v-img v-if="cook.thumbjs"
      :src="cook.thumbjs"
      :height="img_height"
      :width="card_width" />
    <v-img v-else
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
import CookingFeed from '@/components/CookingFeed.vue'
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
          CookingFeed
        },
        created(){
          let yt_re =/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
          let url =this.$props.cook.video 
          if(yt_re.test(url))
          {
            this.youtube_thumb = this.getThumb(url);
          }
        },
        data() {
          return {
            dialog:false,
            youtube_thumb:''
          }
        },
        computed:{
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
        },
        methods:{
          postDelete(){
            this.$forceUpdate();
            this.dialog=false
            this.$emit("postDelete");
          },
          getThumb(url){
            let results = url.match('[\\?&]v=([^&#]*)');
            let video   = (results === null) ? url : results[1];
            let big_thumb ='http://img.youtube.com/vi/' + video + '/0.jpg';
            let thumb = 'http://img.youtube.com/vi/' + video + '/2.jpg';
            return big_thumb;
          }
        }
    }
</script>
