<template>
  <v-footer class="ma-6 white">
      <v-row class="my-2 hidden-sm-and-down">
        <v-col cols="6" >
          <v-row>
            <h5 class="ma-2 font-weight-light">&copy; gebbles {{ new Date().getFullYear() }}</h5><br>
          </v-row>
        </v-col>
      <v-spacer></v-spacer>
      <v-col cols="6">
        <v-row :class="{'justify-end': $vuetify.breakpoint.smAndDown, 'justify-end': $vuetify.breakpoint.mdAndUp}">
        <v-btn plain small text :to= "`/about_us/`"><h5>About</h5></v-btn>
          <v-btn plain small text :to= "`/contact/`"><h5>Contact Us</h5></v-btn>
          <v-btn small icon class="text-decoration-none"  @click="openig" >
            <v-icon>mdi-instagram</v-icon>
        </v-btn>
        </v-row>
      </v-col>
      </v-row>
      <v-row class="my-2 hidden-md-and-up justify-center">
        <v-col cols="12" >
          <v-row class="justify-center">
            <h5 class="ma-2 body-1">&copy; gebbles {{ new Date().getFullYear() }}</h5><br>
          </v-row>
        </v-col>
      <v-col cols="12">
        <v-row class="justify-center">
        <v-btn plain small text :to= "`/about_us/`"><h5>About</h5></v-btn>
          <v-btn plain small text :to= "`/contact/`"><h5>Contact Us</h5></v-btn>
          <v-btn small icon class="text-decoration-none"  @click="openig" >
            <v-icon>mdi-instagram</v-icon>
        </v-btn>
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