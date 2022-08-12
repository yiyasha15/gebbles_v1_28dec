<template>
    <v-app>
      <v-container class="pa-0 mt-4 mt-md-8" >
      <v-row class="mx-auto width">
        <v-col cols="12" md="7"  class="justify-center ">
          <h2 class ="xs12 d-inline font-weight-light">Community</h2>
        </v-col>
        <v-col cols="12" md="5" class= "justify-end py-0 py-md-3" >
          <v-text-field
            label="Search artists"
            rounded
            solo clearable
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          @input="debounceSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-layout wrap row justify-start v-if="firstLoad" class="mx-auto width" >
      <div v-for="n in this.looploader" :key ="n.index">
        <v-skeleton-loader style="margin:2px;" :width="cardwidth" :max-height="cardheight" :loading="true" type="card" transition="fade-transition"></v-skeleton-loader>
      </div>
    </v-layout>
    <v-layout wrap row justify-start v-show="!firstLoad" class="mx-auto width" >
      <div v-for="artist in artists" :key ="artist.index">
        <ArtistCard :artist="artist" ></ArtistCard> 
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
    </v-app>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  scrollToTop: true,
  head() {  
    return {
      title: 'Artists',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'Gebbles community'
        }
      ]
    }
  },
  created(){
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
      firstLoad: true,
      page:"",
      artists:[],
      search: "",
      debounce: null
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
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
    // filterApi: function(){
    //   return this.artists.filter((artist) => {
    //     return artist.artist_name.toLowerCase().match(this.search.toLowerCase())||artist.username.toLowerCase().match(this.search.toLowerCase());
    //   });
    // }
  },
      
}
</script>
<style scoped>

.width{
    max-width: 670px;
  }
@media only screen and (max-width: 960px) {
  .width{
  max-width: 357px;
}
}
</style>
