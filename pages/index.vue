<template>
  <div class="home">
      <v-row justify="center" class="ma-md-12 my-8 hidden-sm-and-down " grey >
        <h1 class="text-center font-weight-black" style="font-size:2em">
          Connecting the groove, <br>
          celebrating<span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); -webkit-background-clip: text;-webkit-text-fill-color: transparent;"> Each one Teach one.</span>
        </h1>
      </v-row>
      <v-row class="justify-center align-center mt-12">
        <v-col cols="12" md="6">
          <div align="center" justify="center">
          <img src = "~/assets/e1t1.png"  width="100%" alt="portfolio logo">
          </div>
          <h2 class="text-center hidden-md-and-up my-6 mx-4 font-weight-black"  style="font-size:1.5em">
          "Connecting the groove, <br>
          celebrating<br>
          <span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); -webkit-background-clip: text;-webkit-text-fill-color: transparent;" > Each one Teach one.</span>"
        </h2>
        </v-col>
        <v-col cols="12" md="6">
          <div class="px-4" style="max-width:531px; margin:auto" align-content="left" align="left" justify="center">
              <!-- <h1 style="font-size:28px" >Gebbles</h1><br> -->
              <h3 style="text-align:justify;" class=" font-weight-light">At gebbles, people share the stories about how you touched their lives through your dance and movement philosophy. <span class="font-weight-medium">Gebbles builds the foundation for you to create your own community.</span>
              </h3>
              <v-btn dark color="#815A44" small
              class="text-decoration-none elevation-none mt-4 px-4 justify-end" 
              :to= "`/artists/`"><h4>community</h4>
              <v-icon right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-container>
        <center>
          <v-btn color="#815A44"  outlined small
          class="text-decoration-none elevation-none mb-6 mt-4 px-4" 
          :to= "`/whatiscooking/`"><h4>What's cookin!</h4>
          <v-icon right>
            mdi-arrow-right
          </v-icon>
          </v-btn>
        </center>
      <v-row class="my-16">
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          outlined
          :to="'/create'" 
          :elevation="hover ? 8 : 4"
          class="mx-auto"
          max-width="244"
          max-height="200"
          >
            <v-img
              :src="require('@/assets/bboys.jpeg')"
              height="150px"
              position="top"
              contain
            ></v-img>
          </v-card>
          </v-hover>
          <center>
            <h4 class="font-weight-light mt-4">Create your Portfolio</h4>
          </center>
        </v-col>
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          outlined
          :to="'/create/journeyindex'" 
          :elevation="hover ? 6 : 2"
          class="mx-auto"
          max-width="244"
          max-height="200"
          >
            <v-img
            contain
              :src="require('@/assets/each1teach1.jpeg')"
              height="150px"
              position="top"
            ></v-img>
          </v-card>
          </v-hover>
          <center>
            <h4 class="font-weight-light mt-4">Your dance journey</h4>
          </center>
        </v-col>
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          :to="'/create/e1t1index'" 
          :elevation="hover ? 6 : 2"
          class="mx-auto"
          max-width="244"
          max-height="200"
          outlined
          >
            <v-img contain
              :src="require('@/assets/e1t1.png')"
              height="150px"
              position="top"
            ></v-img>
          </v-card>
          </v-hover>
          <center>
          <h4 class="font-weight-light mt-4">Each One Teach One</h4>
          </center>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      </v-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'Gebbles',
        meta: [{
          hid: 'description', //create page overrides the description, hid helps to stop redundancy
          name: 'description',
          content: 
              'gebbles - The thread connecting music, movement and artists.'
        }]
        }
      },
  computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio'])
  },
}
//https://stackoverflow.com/questions/57800048/how-to-enable-dark-mode-with-custom-colors-in-light-theme-in-vuetify
//You know that you have a groove that no other dancer has in this 
// world. We all have our grooves. It is our identity as dancers.
// When you dance someone connects deeply with you without your notice. 
// When you teach, a part of you lives in their dance. we are all unique
//yet connected.This is how Hip Hop connects, through sharing. Each One Teach One. 
// "In My Groove" is an effort to connect us 
//a little more, connect Hip Hop a little more, connect the students with their 
//teachers and the teachers with their students a little more so that the legacy stays forever.

</script>
<style scoped>
.home{
  max-width: 1072px;
  margin: auto;
}
</style>