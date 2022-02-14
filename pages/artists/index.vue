<template>
    <v-app>
      <v-container>
      <v-row style="max-width: 1072px;
    margin: auto;">
        <v-col cols="12" md="8"  class="justify-center">
          <h2 class ="xs12 d-inline">Community</h2>
          <v-btn v-if="isAuthenticated" small icon outlined color="black" class="mb-2 ml-2" to="/create/website/">
          <v-icon small>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" class= "justify-end" >
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
      <v-layout wrap row justify-center v-if="firstLoad">
          <div v-for="n in this.looploader" :key ="n.index">
            <v-flex sm6 xs6> 
              <v-skeleton-loader class="ma-1" width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
            </v-flex>
          </div>
      </v-layout>
      <v-layout wrap row justify-center v-show="!firstLoad" class="hidden-md-and-up" >
        <div v-for="artist in artists" :key ="artist.index">
          <!-- <v-flex sm6 xs6>  -->
            <ArtistCard :artist="artist" ></ArtistCard> 
          <!-- </v-flex> -->
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-sm-and-down" style="max-width: 1072px; margin:auto;">
        <div v-for="artist in artists" :key ="artist.index">
          <!-- <v-flex sm6 xs6>  -->
            <ArtistCard :artist="artist" ></ArtistCard> 
          <!-- </v-flex> -->
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
      <!-- <v-divider></v-divider> -->
      <v-card v-intersect="infiniteScrolling"></v-card>
    </v-app>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  scrollToTop: true,
  head() {  //head function (a property of vue-meta), returns an object
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
    ...mapGetters(['isAuthenticated', 'userHasPortfolio', 'loggedInUser']),
    // filterApi: function(){
    //   return this.artists.filter((artist) => {
    //     return artist.artist_name.toLowerCase().match(this.search.toLowerCase())||artist.username.toLowerCase().match(this.search.toLowerCase());
    //   });
    // }
  },
}
</script>
