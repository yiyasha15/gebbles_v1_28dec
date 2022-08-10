<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="ma-1" 
      data-view
      @click="dialog=true"
      :elevation="hover ? 12 : 0"
      outlined
      :width="cardwidth" 
      :max-height="cardheight"
    >
    <v-img v-if="cook.thumbjs"
        :src="cook.thumbjs"
        :height="imgheight"
        :width="cardwidth" 
      />
      <v-img v-else
        :src="require('@/assets/gebbleslogo3.png')"
        contain
        :height="imgheight"
       :width="cardwidth" 
      />
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
        data() {
          return {
            dialog:false,
          }
        },
        computed:{
          cardheight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 105
          case 'sm': return 105
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
          }
        }
    }
</script>
