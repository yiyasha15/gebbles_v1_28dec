<template>
  <v-footer class="ma-6 white">
      <v-row class="my-2" :class="{'justify-center': $vuetify.breakpoint.smAndDown}">
        <v-col cols="12" md="6" >
          <v-row :class="{'justify-center': $vuetify.breakpoint.smAndDown}">
            <h5 class="ma-2 font-weight-light">&copy; gebbles {{ new Date().getFullYear() }}</h5><br>
          </v-row>
        </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6">
        <v-row :class="{'justify-center': $vuetify.breakpoint.smAndDown, 'justify-end': $vuetify.breakpoint.mdAndUp}">
          <nuxt-link to="/help" class="text-decoration-none mx-2">About</nuxt-link>
          <nuxt-link to="/contact" class="text-decoration-none mx-2">Contact</nuxt-link>
          <nuxt-link to="/terms" class="text-decoration-none mx-2">Terms of use</nuxt-link>
          <nuxt-link to="/privacy" class="text-decoration-none mx-2">Privacy Policy</nuxt-link>
          <!-- <v-btn small text :to= "`/reachout/`"><h5 class="font-weight-light">Contact Us</h5></v-btn> -->
          <!-- <v-btn small icon class="text-decoration-none"  @click="openig" >
              <v-icon>mdi-instagram</v-icon>
          </v-btn> -->
        </v-row>
      </v-col>
      </v-row>
  </v-footer>
</template>
<script>
export default {
  methods: {
    openig(){
      var url = 'https://www.instagram.com/gebbles.io/';
      var win = window.open(url, '_blank');
      win.focus();
    },
  }
}
</script>
<style scoped>
a:hover{
  color: black;
  text-decoration: underline;
}
</style>