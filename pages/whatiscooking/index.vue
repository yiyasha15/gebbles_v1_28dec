<template>
    <v-app>
      <v-container class="pa-0">
      <v-row style="max-width: 670px; margin: auto;" class="hidden-sm-and-down" >
        <h3 class ="xs12 d-inline font-weight-light pl-1 py-2">What's Cooking</h3>
      </v-row>
      <v-row style="max-width: 357px; margin: auto;" class="hidden-md-and-up">
        <h3 class ="xs12 d-inline font-weight-light pl-1 py-2">What's Cooking</h3>
      </v-row>
      <v-layout wrap row justify-start v-if="firstLoad"  class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-if="firstLoad" class="hidden-sm-and-down" style="max-width: 670px; margin:auto;">
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;"  width="215" max-height="195" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
        <div v-for="cook in cooking" :key ="cook.index">
          <CookingCard :cook="cook" ></CookingCard> 
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-sm-and-down" style="max-width: 670px; margin:auto;">
        <div v-for="cook in cooking" :key ="cook.index">
          <cooking-card-desktop :cook="cook" ></cooking-card-desktop>
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
import CookingCardDesktop from '@/components/CookingCardDesktop.vue'
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
      const key = 'id';
      this.$axios.get(this.page).then(response => {
        this.page= response.data.next;
        response.data.results.forEach(item => this.cooking.push(item));
        // filter array so no duplicates
        this.cooking = [...new Map(this.cooking.map(item =>
          [item[key], item])).values()];
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
    CookingCard,
    CookingCardDesktop
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
