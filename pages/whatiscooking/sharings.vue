<template>
    <v-app>
      <v-container class="pa-0">
      <v-row class="width mx-auto" >
        <h3 class ="xs12 d-inline font-weight-light pl-1 py-2">Sharing</h3>
      </v-row>
      <v-layout wrap row justify-start v-if="firstLoad"  class="width mx-auto"  >
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;" :width="cardwidth" :max-height="cardheight" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="mx-auto width" >
        <div v-for="cook in cooking" :key ="cook.index">
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
    CookingCardSharing
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
  text-decoration: underline;
}
h3:hover{
  color: black;
  text-decoration: underline;
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
