<template>
    <v-app>
      <v-container class="pa-0">
      <v-row style="max-width: 670px; margin: auto;" class="hidden-sm-and-down">
        <v-col cols="12" md="8"  class="justify-center pa-1">
          <h2 class ="xs12 d-inline font-weight-light">Community</h2>
          <!-- <v-btn v-if="isAuthenticated" small icon outlined color="black" class="mb-2 ml-2" to="/create/website/">
          <v-icon small>mdi-plus</v-icon>
          </v-btn> -->
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
          <h3 class ="xs12 d-inline font-weight-light">Community</h3>
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
      <v-card v-intersect="infiniteScrolling"></v-card>
      <center v-if="!artists && !firstLoad">
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
import ArtistCardDesktop from '@/components/ArtistCardDesktop.vue'
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
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    // filterApi: function(){
    //   return this.artists.filter((artist) => {
    //     return artist.artist_name.toLowerCase().match(this.search.toLowerCase())||artist.username.toLowerCase().match(this.search.toLowerCase());
    //   });
    // }
  },
}
</script>
