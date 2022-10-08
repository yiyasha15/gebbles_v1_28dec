<template>
    <v-app>
      <v-container class="pa-0 mt-4 mt-md-8" >
      <v-row class="mx-auto width">
        <v-col cols="12" md="7"  class="justify-center ">
          <nuxt-link to="/artists" class="text-decoration-none"><h2 class ="xs12 d-inline font-weight-medium">Artists</h2></nuxt-link> 
        / <nuxt-link class="text-decoration-none" to="/artists/legacy"><h2 class ="xs12 d-inline font-weight-medium">Legacy Artists</h2></nuxt-link>
          <!-- <h2 class ="xs12 d-inline font-weight-light">Artists</h2> -->
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
        <card-skeleton-loader></card-skeleton-loader>
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
      :src="require('@/assets/gebbleslogo_tab.png')"/>
      <h3>No artists found. </h3>
    </center>
      </v-container>
    </v-app>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
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
              'Gebbles'
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
    ArtistCard,
    CardSkeletonLoader
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
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
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
