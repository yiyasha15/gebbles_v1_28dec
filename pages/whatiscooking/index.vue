<template>
    <v-app>
      <v-container class="pa-0">
      <v-row style="max-width: 1072px; margin: auto;">
        <v-col cols="12" md="8"  class="justify-center">
          <h2 class ="xs12 d-inline">What's Cooking</h2>
          <v-btn v-if="isAuthenticated" small icon outlined color="black" class="mb-2 ml-2" to="/create/uploadvideo/">
          <v-icon small>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <!-- <v-col cols="12" md="4" class= "justify-end" >
          <v-text-field
            label="Search cooking"
            rounded
            solo
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          @input="debounceSearch"
          ></v-text-field>
        </v-col> -->
      </v-row>
      <v-layout wrap row justify-start v-if="firstLoad" class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-if="firstLoad" class="hidden-sm-and-down" style="max-width: 1072px; margin:auto;">
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;"  width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
        <div v-for="cook in cooking" :key ="cook.index">
          <CookingCard :cook="cook" ></CookingCard> 
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-sm-and-down" style="max-width: 1072px; margin:auto;">
        <div v-for="cook in cooking" :key ="cook.index">
          <CookingCard :cook="cook" ></CookingCard>
        </div>
      </v-layout>
      <center v-if="!cooking.length && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo.png')"/>
        <h3>No videos found. </h3>
      </center>
      </v-container>
      <v-card v-intersect="infiniteScrolling"></v-card>
    </v-app>
</template>

<script>
import CookingCard from '@/components/CookingCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  scrollToTop: true,
  head() {  
    return {
      title: 'Cooking',
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
    this.getwhatiscooking();
  },
  methods:{
    async getwhatiscooking(){
      try {
      const response = await EventService.getWhatsCooking()
      this.cooking = response.data.results
      this.page = response.data.next
      this.firstLoad = false
      } catch (e) {
        console.log(e);
        this.firstLoad = false
    }
    },
    infiniteScrolling() {
      if(this.page){
        console.log(this.page);
      const key = 'id';
      this.$axios.get(this.page).then(response => {
        console.log(response);
        this.page= response.data.next;
        response.data.results.forEach(item => this.cooking.push(item));
        // filter array so no duplicates
        console.log(this.cooking);
        this.cooking = [...new Map(this.cooking.map(item =>
          [item[key], item])).values()];
          console.log(this.cooking);
      })
      .catch(err => {
        console.log(err);
      });
      }
    },
    // debounceSearch() {
    // this.firstLoad = true
    // this.cooking=[]
    //   clearTimeout(this.debounce)
    //   this.debounce = setTimeout(() => {
    //   if(this.search){EventService.getSearchedCooking(this.search).then((value) => {
    //   this.firstLoad = false
    //   this.cooking = value.data
    //   });}
    //   else{
    //     this.getwhatiscooking();
    //   }
    //   }, 600)
    // },
  },
  components: {
    CookingCard
  },
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      cooking:[],
      search: "",
      debounce: null
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
}
</script>
