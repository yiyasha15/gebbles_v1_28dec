<template>
  <v-footer class="ma-6 background">
      <v-row :class="{'justify-center': $vuetify.breakpoint.smAndDown, 'justify-end': $vuetify.breakpoint.mdAndUp}">
          <!-- <nuxt-link to="/help" >Help</nuxt-link> -->
            <h5 class="ma-2 font-weight-light">&copy; gebbles {{ new Date().getFullYear() }}</h5>
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
a{
  text-decoration:none ;
  margin: 0px 8px;
}
a:hover{
  color: black;
}
</style>