<template>
  <v-app>
  <v-container>
      <v-btn class="elevation-0 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-col align="center" justify="center">
      <h3 v-if="error.message === 'userNotFound'" class="font-weight-light">
        artist's portfolio not found.
      </h3>
      <h2 v-else-if="error.statusCode === 404" class="font-weight-light">
        Oops! {{ pageNotFound }}
        <!-- <img src="@/assets/vivi.png" width="150px"> -->
      </h2>
      <h2 v-else class="font-weight-light">
        Oops! {{ otherError }}
        <!-- <img src="@/assets/vivi.png"  width="150px"> -->
      </h2>
    </v-col>
  </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  methods:{
    goback(){
            window.history.back();
        },
  },
  data () {
    return {
      artistNotfound: 'Artist Not Found.',
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
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
</style>
