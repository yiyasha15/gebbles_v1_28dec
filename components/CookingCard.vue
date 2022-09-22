<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      @click="dialog=true"
      :elevation="hover ? 12 : 0"
      outlined
      :width="cardwidth" 
      :max-height="cardheight">
    <v-img v-if="cook.thumbjs"
      :src="cook.thumbjs"
      :height="imgheight"
      :width="cardwidth" />
    <v-img v-else
      :src="youtube_thumb"
      :height="imgheight"
      :width="cardwidth" />
      <v-dialog
        :retain-focus="false"
        v-model="dialog"
        width="800px"
        persistent>
        <v-container class="rounded-lg white pa-2 pa-md-4">
        <v-btn icon color="error" class="float-right" @click="dialog=false; ">
            <v-icon>mdi-close</v-icon>
        </v-btn>
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
        cardheight () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 105
            case 'sm': return 205
            case 'md': return 205
            case 'lg': return 205
            case 'xl': return 205
          }
        },
        cardwidth () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 115
            case 'sm': return 115
            case 'md': return 215
            case 'lg': return 215
            case 'xl': return 215
          }
        },
        imgheight () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 84
            case 'sm': return 84
            case 'md': return 134
            case 'lg': return 134
            case 'xl': return 134
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
