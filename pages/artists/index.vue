<template>
    <v-app>
      <v-container>
      <v-row>
        <v-col cols="12" md="8"  class="justify-center">
          <h2 class ="pl-6 xs12 d-inline">Community</h2>
          <v-btn v-if="isAuthenticated" small icon outlined color="indigo" class="mb-2 ml-2" to="/create/website/">
          <v-icon small>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" class= "pr-6 justify-end px-6" >
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
              <v-skeleton-loader min-width="96" class="ma-1" max-height="96" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
            </v-flex>
          </div>
      </v-layout>
        <v-layout wrap row justify-center v-show="!firstLoad">
          <div v-for="artist in artists" :key ="artist.index">
            <v-flex sm6 xs6> 
              <ArtistCard :artist="artist" ></ArtistCard> 
            </v-flex>
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
      // console.log("api called", response);
      this.artists = response.data.results
      this.page = response.data.next
      this.firstLoad = false
    } catch (e) {
        error({statusCode:503, message: "unable to fetch artist data at this point"})
    }
    },
    infiniteScrolling(entries, observer, isIntersecting) {
        if(this.page){
        const key = 'username';
        this.$axios.get(this.page).then(response => {
          // console.log(response);
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
    // console.log("waiting");
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
      if(this.search){EventService.getSearchedArtist(this.search).then((value) => {
      // console.log("api called", value);
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
  // watch: {
  //   search: function() {
  //     this.firstLoad = true
  //     console.log(this.search)
  //     var vm = this;
  //     setTimeout(() => {
  //       if(vm.search)
  //       {vm.getSearchedArtist();
  //       console.log("search datat");}
  //       else
  //       {vm.getartists();}
  //     }, 2000);
  //     }
  //   },
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
