<template>
    <v-app>
      <v-container>
      <v-row>
        <v-col cols="12" md="8"  class="justify-center">
          <h2 class ="pl-6 xs12 d-inline">Our Community</h2>
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
            ></v-text-field>
        </v-col>
      </v-row>
        <v-layout wrap row justify-center>
          <div v-for="artist in artists" :key ="artist.index">
            <v-flex sm6 xs6> 
              <ArtistCard :artist="artist" ></ArtistCard> 
            </v-flex>
            </div>
      </v-layout>
      </v-container>
      <!-- <v-divider></v-divider> -->
      <v-card color="red" height="20px" v-intersect="infiniteScrolling"></v-card>
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
    // this.$store.dispatch("check_artists");
  },
  methods:{
    async getartists(){
      try {
      const response = await EventService.getArtists()
      this.artists = response.data.results
      this.page = response.data.next
    } catch (e) {
        error({statusCode:503, message: "unable to fetch artist data at this point"})
    }
    },
    infiniteScrolling(entries, observer, isIntersecting) {
      // setTimeout(() => {
      //   console.log(entries[0], observer, isIntersecting);
      //   console.log("settimeout", this.page);
        // this.page++;
        const key = 'username';
        this.$axios.get(this.page).then(response => {
            if (response.data.results.length > 1) {
              this.page= response.data.next;
              response.data.results.forEach(item => this.artists.push(item));
              // filter array so no duplicates
              this.artists = [...new Map(this.artists.map(item =>
                [item[key], item])).values()];
            } else {
            }
          })
          .catch(err => {
            console.log(err);
          });
      // }, 500);
    }
  },
  components: {
    ArtistCard
  },
  data() {
    return {
      search: "",
      page:"",
      artists:[],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userHasPortfolio', 'loggedInUser', 'page_artists']),
    // filteredArtists: function(){
    //   return this.artists.filter((artist) => {
    //     return artist.artist_name.toLowerCase().match(this.search.toLowerCase())||artist.username.toLowerCase().match(this.search.toLowerCase());
    //   });
    // }
  }
}
</script>
