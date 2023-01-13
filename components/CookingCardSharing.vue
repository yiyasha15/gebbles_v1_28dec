<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      data-view
      :elevation="hover ? 6 : 0"
      class="transition-swing"
      outlined
    >
    <v-img v-if="cook.cookingidobj.thumbjs"
    class="pointer"
      @click="goToCook(cook.cookingidobj.uuid)"
        :src="cook.cookingidobj.thumbjs"
        :height="img_height"
      />
      <v-img v-else-if="cook.cookingidobj.video"
      class="pointer"
      @click="goToCook(cook.cookingidobj.uuid)"
      :src="youtube_thumb"
      :height="img_height" />
      <v-img v-else
      class="pointer"
      @click="goToCook(cook.cookingidobj.uuid)"
        :src="require('@/assets/gebbleslogo3.png')"
        contain
        :height="img_height"
      />
      <v-card-actions>
        <div class="text-decoration-none caption width">
        <nuxt-link :to="'/'+ cook.username" class="text-decoration-none" >
          <p class="event_p">{{cook.username}} </p></nuxt-link>
        </div>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
    export default {
        head() {  
        return {
            title: "What's cookin",
            }
        },
        name: 'CookingCard',
        props: {
            cook: Object
        },
        created(){
          let yt_re =/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
          let url =this.$props.cook.cookingidobj.video 
          if(yt_re.test(url))
          {
            this.youtube_thumb = this.getThumb(url);
          }
        },
        data() {
          return {
            youtube_thumb:''
          }
        },
        computed:{
          img_height () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 104
            case 'sm': return 134
            case 'md': return 134
            case 'lg': return 134
            case 'xl': return 184
          }
        }
        },
        methods:{
          getThumb(url){
            let results = url.match('[\\?&]v=([^&#]*)');
            let video   = (results === null) ? url : results[1];
            let big_thumb ='http://img.youtube.com/vi/' + video + '/0.jpg';
            let thumb = 'http://img.youtube.com/vi/' + video + '/2.jpg';
            return big_thumb;
          },
          goToCook(uuid){
          this.$router.push('/whatiscooking/'+uuid)
        }
        }
    }
</script>
<style scoped>
.pointer{
  cursor: pointer;
}
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
  width: 78px;
  height: 1.3em;
  line-height: initial;
  overflow: hidden
}
.event_p{
  max-width:78px;
   font-size:0.6rem!important;
}
}
</style>

