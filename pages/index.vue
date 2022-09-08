<template>
  <v-app>
    <div v-if="!isAuthenticated" class="mt-md-16 mt-8">
      <div align="center" justify="center" class="mt-md-10 mt-2">
        <v-img
          :lazy-src="require('@/assets/home.png')"
          :max-width="maxwidth"
          :src="require('@/assets/home.png')"
        ></v-img>
      </div>
      <v-row justify="center" class="my-3" grey>
        <!-- <h1 class="text-center font-weight-black hidden-sm-and-down " style="font-size:2em">
          Connecting the groove, <br>
          celebrating<span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); -webkit-background-clip: text;-webkit-text-fill-color: transparent;"> Each one Teach one.</span>
        </h1>
        <h3 class="text-center hidden-md-and-up mt-2 mx-4 font-weight-black"  style="font-size:1.5em">
          "Connecting the groove, <br>
          celebrating<br>
          <span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); -webkit-background-clip: text;-webkit-text-fill-color: transparent;" > Each one Teach one.</span>"
        </h3> -->
        <h1 class="text-center font-weight-medium mb-2 mx-4" style="font-size:0.9em">
        at gebbles, people share the stories about <br>how you touched their lives through your art.  
        </h1>
        <br>
      </v-row>
      <v-row justify="center" class="mb-2">
        <h4 class="caption">movement + music + culture</h4>
      </v-row>
        <center class="mt-6">
        <v-row  style="max-width:370px; margin:auto">
          <v-col><nuxt-link to="/artists/" class="text-decoration-none outlined"><h5 class="font-weight-light">community</h5></nuxt-link></v-col>
          <!-- <v-col><nuxt-link to="/whatiscooking/" class="text-decoration-none "><h5 class="font-weight-light">what's cooking</h5></nuxt-link></v-col> -->
          <v-col><nuxt-link to="/events/" class="text-decoration-none "><h5 class="font-weight-light">events</h5></nuxt-link></v-col>
          <v-col v-if="!userHasPortfolio"><nuxt-link to="/create/" class="text-decoration-none "><h5 class="font-weight-light">get started</h5></nuxt-link></v-col>
        </v-row>
      </center>
    </div>
    <v-container v-else class="pa-0 mt-4 mt-md-8" >
    <v-row class="mx-auto width">
      <v-col cols="12" md="8"  class="justify-center ">
        <nuxt-link to="/" class="text-decoration-none outlined"><h2 class ="xs12 d-inline font-weight-light">Community</h2></nuxt-link> 
        <!-- / <nuxt-link class="text-decoration-none outlined" to="/whatiscooking"><h3 class ="xs12 d-inline font-weight-light">What's cooking</h3></nuxt-link> -->
      </v-col>
      <v-col cols="12" md="4" class= "justify-end py-0 py-md-3" >
        <v-text-field
          label="Search artists"
          rounded
          solo
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        @input="debounceSearch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-layout wrap row justify-start v-if="firstLoad" class="mx-auto width" >
      <div v-for="n in this.looploader" :key ="n.index">
        <v-skeleton-loader style="margin:2px;" :width="cardwidth" :max-height="cardheight" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
      </div>
    </v-layout>
    <v-layout wrap row justify-start v-show="!firstLoad" class="mx-auto width" >
      <div v-for="artist in artists" :key ="artist.index">
        <ArtistCard :artist="artist" ></ArtistCard> 
      </div>
    </v-layout>

    <v-card v-intersect="infiniteScrolling"></v-card>
    <center v-if="!artists.length && !firstLoad">
      <img
      :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
      class="ml-2 mt-6 clickable"
      :src="require('@/assets/gebbleslogo.png')"/>
      <h3>No artists found. </h3>
    </center>
    </v-container>
  </v-app>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue'
import EventService from '@/services/EventService.js'
import {mapGetters} from 'vuex'
export default {
  head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'Gebbles',
        meta: [{
          hid: 'description', //create page overrides the description, hid helps to stop redundancy
          name: 'description',
          content: 
              'gebbles - The thread connecting music, movement and artists.'
        }]
        }
  },
  created(){
    console.log(this.isAuthenticated);
    this.$store.dispatch("check_notifications");
    this.$store.dispatch("check_user_portfolio");
    this.getartists();
  },
  methods:{
    async getartists(){
      try {
      const response = await EventService.getArtists()
      this.artists = response.data.results
      this.page = response.data.next
      this.firstLoad = false
    } catch (e) {
        console.log(e);
        this.firstLoad = false
    }
    },
    infiniteScrolling(entries, observer, isIntersecting) {
        if(this.page){
        const key = 'username';
        this.$axios.get(this.page).then(response => {
              this.page= response.data.next;
              response.data.results.forEach(item => this.artists.push(item));
              // filter array so no duplicates
              this.artists = [...new Map(this.artists.map(item =>
                [item[key], item])).values()];
          })
          .catch(err => {
            console.log(err);
          });
        }
    },
    debounceSearch() {
    this.firstLoad = true
    this.artists=[]
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
      if(this.search){EventService.getSearchedArtist(this.search).then((value) => {
      this.firstLoad = false
      this.artists = value.data
      });}
      else{
        this.getartists();
      }
      }, 600)
    },
  },
  components: {
    ArtistCard
  },
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      artists:[],
      search: "",
      debounce: null
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio']),
    cardheight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 105
          case 'sm': return 105
          case 'md': return 185
          case 'lg': return 185
          case 'xl': return 185
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
    maxwidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 340
        case 'sm': return 340
        case 'md': return 340
        case 'lg': return 340
        case 'xl': return 340
      }
    },
  },
}
//https://stackoverflow.com/questions/57800048/how-to-enable-dark-mode-with-custom-colors-in-light-theme-in-vuetify
//You know that you have a groove that no other dancer has in this 
// world. We all have our grooves. It is our identity as dancers.
// When you dance someone connects deeply with you without your notice. 
// When you teach, a part of you lives in their dance. we are all unique
//yet connected.This is how Hip Hop connects, through sharing. Each One Teach One. 
// "In My Groove" is an effort to connect us 
//a little more, connect Hip Hop a little more, connect the students with their 
//teachers and the teachers with their students a little more so that the legacy stays forever.

</script>
<style scoped>
/* .home{
  width: 860px;
  margin: auto;
} */
h2:hover{
  color: black;
  /* text-decoration: underline; */
}
h5:hover{
  color: black;
  text-decoration: underline;
}
h3:hover{
  color: black;
  text-decoration: underline;
}
.width{
    max-width: 670px;
  }
@media only screen and (max-width: 960px) {
  .width{
  max-width: 357px;
}
}
</style>