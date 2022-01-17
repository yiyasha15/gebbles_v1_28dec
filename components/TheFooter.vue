<template>
  <v-footer class="ma-6 white">
      <v-row class="mt-2 hidden-sm-and-down">
        <v-col cols="6" >
          <v-row>
            <p class="ma-2">&copy; gebbles {{ new Date().getFullYear() }}</p><br>
          </v-row>
        </v-col>
      <v-spacer></v-spacer>
      <v-col cols="6">
        <v-row :class="{'justify-end': $vuetify.breakpoint.smAndDown, 'justify-end mb-2 ': $vuetify.breakpoint.mdAndUp}">
        <v-btn plain small text :to= "`/about_us/`"><h3>About</h3></v-btn>
          <v-btn plain small text :to= "`/contact/`"><h3>Contact Us</h3></v-btn>
          <v-btn small icon class="text-decoration-none"  @click="openig" >
            <v-icon>mdi-instagram</v-icon>
        </v-btn>
        </v-row>
      </v-col>
      </v-row>
      <v-row class="mt-2 hidden-sd-and-up justify-center">
        <v-col cols="12" >
          <v-row class="justify-center">
            <p class="ma-2">&copy; gebbles {{ new Date().getFullYear() }}</p><br>
          </v-row>
        </v-col>
      <v-col cols="12">
        <v-row class="justify-center">
        <v-btn plain small text :to= "`/about_us/`"><h3>About</h3></v-btn>
          <v-btn plain small text :to= "`/contact/`"><h3>Contact Us</h3></v-btn>
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