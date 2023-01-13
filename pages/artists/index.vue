<template>
  <v-app>
    <v-container class="mx-auto width" >
      <v-btn icon class="elevation-0" @click="goback()" style="margin-left:-6px">
        <v-icon class="float-left">mdi-arrow-left</v-icon>
      </v-btn>
    <v-row>
      <v-col cols="12" md="6"  class="justify-center">
        <h2 class ="xs12 font-weight-medium">Artists</h2>
      </v-col>
      <v-col cols="12" md="6" class= "justify-end py-0 py-md-3" >
        <v-text-field
              label="Search artists"
              rounded
              solo clearable
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              @input="debounceSearch"
          >
          <template v-slot:append-outer>
            <v-btn icon class="float-right" @click="toggleLegacy">
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
        </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-show="firstLoad" >
      <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader
            class="mx-auto"
            :height="img_height"
            type="card"
          ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-show="!firstLoad" >
      <v-col cols="4" xl="3" class="pa-1 pa-sm-2" v-for="artist in artists" :key ="artist.index">
        <ArtistCard :artist="artist"></ArtistCard>
      </v-col>
    </v-row>
    <v-card v-intersect="infiniteScrolling"></v-card>
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
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
import ArtistCard from '~/components/ArtistCard.vue'
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
  goback(){
      window.history.back();
  },
  async getartists(){
    this.artists =[];
    this.page='';
    this.firstLoad = true;
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
  async getLegacyartists(){
    this.artists =[];
    this.page='';
    this.firstLoad = true;
    try {
    const response = await EventService.getLegacyArtists()
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
  toggleLegacy(){
    this.showLegacy = !this.showLegacy
    if(!this.showLegacy){
      this.getartists()
    }
    else{
      this.getLegacyartists()
    }
  }
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
    debounce: null,
    showLegacy:false,
  }
},
computed: {
  ...mapGetters(['isAuthenticated', 'loggedInUser']),
  img_height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 104
        case 'sm': return 134
        case 'md': return 134
        case 'lg': return 134
        case 'xl': return 184
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
    max-width: 1070px;
  }
@media only screen and (max-width: 1900px) {
  .width{
  max-width: 670px;
}
}
</style>