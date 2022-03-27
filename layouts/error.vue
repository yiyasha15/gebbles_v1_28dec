<template>
  <v-container>
    <v-col align="center" justify="center">
      <h2 v-if="error.statusCode === 404" class="font-weight-light">
        Oops! {{ pageNotFound }}
        <img src="@/assets/vivi.png" width="150px">
      </h2>
      <h2 v-else class="font-weight-light">
        Oops! {{ otherError }}
        <img src="@/assets/vivi.png"  width="150px">
      </h2>
      <h2 class="font-weight-light"> <NuxtLink to="/">Let's return to the home page.</NuxtLink></h2>
    </v-col>
  </v-container>
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
  data () {
    return {
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
