<template>
  <v-app>
  <v-container class="mx-auto width">
      <v-btn class="elevation-0 white text-decoration-none" icon @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-col align="center" justify="center">
      <div v-if="error.message === 'userNotFound'">
        <!-- <img src="@/assets/vivi.png" width="90px"> -->
        <v-btn small outlined v-if="isAuthenticated && $route.params.username == loggedInUser.username"
        to="/create/website">
          <v-icon color="black" class="pr-2">mdi-account-edit-outline</v-icon>Create your portfolio
        </v-btn>
        <h3 v-else class="font-weight-light mb-6">
          {{artist}}
          {{notfound}}
        </h3>
      </div>
      <h2 v-else-if="error.statusCode === 404" class="font-weight-light">
        {{ pageNotFound }}
        <img src="@/assets/vivi.png" width="90px">
      </h2>
      <h2 v-else class="font-weight-light">
        {{ otherError }}
        <img src="@/assets/vivi.png"  width="90px">
      </h2>
    </v-col>
  </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  layout: 'simple',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters(['loggedInUser','isAuthenticated',])
  },
  methods:{
    goback(){
            window.history.back();
        },
  },
  data () {
    return {
      artist: 'Artist',
      notfound: 'Not Found.',
      pageNotFound: 'Page Not Found',
      otherError: 'An Error Occurred'
    }
  },
  head () {
    let title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    if(this.error.message === 'userNotFound')
    title = 'Artist not found'
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
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

