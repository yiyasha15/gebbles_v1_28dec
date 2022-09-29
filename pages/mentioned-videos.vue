<template>
    <v-app>
      <v-container class="width mx-auto" >
          <h2 class="font-weight-medium mb-4">Mentioned videos</h2>
      <v-layout wrap row justify-start v-if="firstLoad"  >
        <div v-for="n in this.looploader" :key ="n.index">
          <card-skeleton-loader></card-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" >
        <div v-for="cook in cooking" :key ="cook.index">
          <!-- {{cook}} -->
          <!-- <cooking-card :cook="cook"></cooking-card> -->
          <cooking-card-sharing :cook="cook" ></cooking-card-sharing> 
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
import CookingCardSharing from '@/components/CookingCardSharing.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
// import CookingCard from '~/components/CookingCard.vue'
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
              'Gebbles student community'
        }
      ]
    }
  },
  middleware : 'check_auth',
  created(){
    this.getwhatiscooking();
  },
  methods:{
    async getwhatiscooking(){
      try {
        const response = await EventService.getStudentsCooking(this.loggedInUser.username)
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
  },
  components: {
    CookingCardSharing,
    CardSkeletonLoader,
    // CookingCard
  },
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      cooking:[],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
}
</script>
<style scoped>
/* .home{
  width: 860px;
  margin: auto;
} */
h5:hover{
  color: black;
}
h3:hover{
  color: black;
}
.width{
    max-width: 670px;
  }
@media only screen and (max-width: 960px) {
  .width{
  max-width: 357px;
}
}
</style>
