<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      @click="dialog=true"
      :elevation="hover ? 12 : 0"
      outlined
      width="115" 
      max-height="105"
    >
    <v-img v-if="cook.thumbjs"
        :src="cook.thumbjs"
        height="84"
        width="115"
      />
      <v-img v-else
        :src="require('@/assets/gebbleslogo3.png')"
        contain
        height="84"
        width="115"
      />
      <v-dialog
        :retain-focus="false"
        v-model="dialog"
        width="800px"
        persistent>
        <v-container class="rounded-lg white pa-2">
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
            title: "What's cookin",
            }
        },
        name: 'CookingCard',
        props: {
            cook: Object
        },
        components: {
          CookingFeed
        },
        data() {
          return {
            dialog:false,
          }
        },
        methods:{
          postDelete(){
            this.$forceUpdate();
            console.log("updated?");
            this.dialog=false
            // this.getwhatiscooking();
          }
        }
    }
</script>

