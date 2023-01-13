<template>
    <v-hover v-slot:default="{ hover }">
      <v-card 
        data-view
        :to="'/' + username" 
        :elevation="hover ? 6 : 0"
        class="transition-swing"
        outlined
      >
        <v-img
          :height="img_height"
          v-if ='img' :src = "img" 
          :lazy-src= "img"
        />
        <v-img
        :height="img_height"
          v-else :src="require('@/assets/gebbleslogo3.png')"
          contain
        />
        <v-card-actions height="32px">
          <div v-if="title" class="text-decoration-none caption width">
          <p class="event_p">{{ title }} </p>
          </div>
          <div v-else class="text-decoration-none caption width">
          <p class="event_p">{{ username }} </p>
          </div>
          <v-spacer></v-spacer>
          <country-flag size=small  :country= 'flag' />
        </v-card-actions>
      </v-card>
    </v-hover>
  </template>
  <script>
  import CountryFlag from 'vue-country-flag'
      export default {
        head() {  //head function (a property of vue-meta), returns an object
        return {
            title: 'gebbles card',
            }
        },
        name: 'GebblesCard',
        props: {
          img: String,
          title: String,
          flag:String,
          username: String
        },
        components: {
          CountryFlag
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
        },
        }
  </script>
  <style scoped>
  .border{
    border-color: #815A44 !important;
  }
  .width{
      width: 177px;
      height: 1.7em;
      line-height: initial;
      overflow: hidden
    }
  .event_p{
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
     font-size:0.6rem!important;
  }
  }
  </style>
  