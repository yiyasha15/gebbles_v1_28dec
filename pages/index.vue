<template>
  <v-app>
    <!-- <div>
      <nuxt-link to="/explore/">test</nuxt-link>
    </div> -->
    <div v-if="!isAuthenticated" class="mt-md-16 mt-8">
      <div align="center" justify="center" class="mt-md-16 mt-2">
        <v-img
          :lazy-src="require('@/assets/home.png')"
          max-height="428"
          max-width="538"
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
    <v-container v-else class="pa-0" >
    <v-row style="max-width: 670px; margin: auto;" class="hidden-sm-and-down">
      <v-col cols="12" md="8"  class="justify-center pa-1">
        <nuxt-link to="/" class="text-decoration-none outlined"><h3 class ="xs12 d-inline font-weight-light">Community</h3></nuxt-link> 
        <!-- / <nuxt-link class="text-decoration-none outlined" to="/whatiscooking"><h3 class ="xs12 d-inline font-weight-light">What's cooking</h3></nuxt-link> -->
      </v-col>
      <v-col cols="12" md="4" class= "justify-end pa-1" >
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
    <v-row style="max-width: 357px; margin: auto;" class="hidden-md-and-up" >
      <v-col cols="12" md="8"  class="justify-center px-1">
        <nuxt-link to="/" class="text-decoration-none outlined"><h3 class ="xs12 d-inline font-weight-light">Community</h3></nuxt-link> 
        <!-- / <nuxt-link class="text-decoration-none outlined" to="/whatiscooking"><h3 class ="xs12 d-inline font-weight-light">What's cooking</h3></nuxt-link> -->
      </v-col>
      <v-col cols="12" md="4" class= "justify-end pa-0" >
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
    <v-layout wrap row justify-start v-if="firstLoad" class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
      <div v-for="n in this.looploader" :key ="n.index">
        <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
      </div>
    </v-layout>
    <v-layout wrap row justify-start v-if="firstLoad" class="hidden-sm-and-down" style="max-width: 670px; margin:auto;">
      <div v-for="n in this.looploader" :key ="n.index">
        <v-skeleton-loader style="margin:2px;"  width="215" max-height="185" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
      </div>
    </v-layout>
    <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
      <div v-for="artist in artists" :key ="artist.index">
        <ArtistCard :artist="artist" ></ArtistCard> 
      </div>
    </v-layout>
    <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-sm-and-down" style="max-width: 670px; margin:auto;">
      <div v-for="artist in artists" :key ="artist.index">
        <artist-card-desktop :artist="artist" ></artist-card-desktop>
      </div>
    </v-layout>
    <center v-if="!artists.length && !firstLoad">
      <img
      :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
      class="ml-2 mt-6 clickable"
      :src="require('@/assets/gebbleslogo.png')"/>
      <h3>No artists found. </h3>
    </center>
    </v-container>
      <v-card v-intersect="infiniteScrolling"></v-card>
  </v-app>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue'
import ArtistCardDesktop from '@/components/ArtistCardDesktop.vue'
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
    this.$store.dispatch("check_notifications");
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
    ArtistCard, ArtistCardDesktop
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
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio'])
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
h5:hover{
  color: black;
  text-decoration: underline;
}
h3:hover{
  color: black;
  text-decoration: underline;
}
</style>