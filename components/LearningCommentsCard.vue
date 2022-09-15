<template>
  <v-container>
    <section >
      <div v-for="(comment, i) in comments" :key="i" class="d-flex align-start">
          <nuxt-link :to="'/'+ comment.username" class="text-decoration-none">
          <center>
              <v-list-item-avatar size="36" v-if=" comment.artist_metadata.thumb">
                <img :src = "comment.artist_metadata.thumb" alt="img">
              </v-list-item-avatar>
              <v-list-item-avatar color="black" size="36" v-else >
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-list-item-avatar>
          </center>
          </nuxt-link>
        <div class="mb-2">
          <p class="caption ma-0 pa-0 subtitle grey--text text-decoration-none">{{moment(comment.timestamp)}}</p>
          <nuxt-link :to="'/'+ comment.username" class="text-decoration-none d-inline">{{comment.username}}: </nuxt-link><span class="font-weight-light"> {{comment.comment}}</span>
        </div>
            <v-spacer></v-spacer>
            <v-menu v-if="isAuthenticated" transition="slide-y-transition" open-on-hover offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                    </div>
                </template>
                <v-list>
                    <v-list-item
                    v-if="comment.username == loggedInUser.username"
                    class="text-decoration-none pl-6 pr-12"
                    color="error"
                    @click="deleted(comment)"
                    >
                    <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-else
                    class="text-decoration-none pl-6 pr-12"
                    @click="reported(comment)"
                    >
                    <v-list-item-title>Report</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
      </div>
    </section>
    <v-snackbar v-model="delete_snackbar">
        Your comment is deleted.
    </v-snackbar>
    <v-snackbar v-model="report_snackbar">
        We have reported this comment.
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
  export default {
    props: {
      comments: Array,
    },
    data() {
      return {
        show: false,
        report_snackbar: false,
        delete_snackbar :false
        }
    },
    computed: {
      ...mapGetters(['loggedInUser' ,'isAuthenticated']),
    },
    methods:{
      async deleted(comment){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
        };
        try {
            let response = await this.$axios.$delete("/v1/whatiscooking/cooking/comments/"+ comment.id, config)
            this.$store.dispatch("check_cook_comments", comment.cookingidobj)
            this.$emit("commentDelete"); 
            this.delete_snackbar =true
        } catch (e) {
            console.log(e.response);
        }
      },
      async reported(comment){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access
            }
        };
        try {
          this.report_snackbar =true
        } catch (e) {
            console.log(e);
        }
      },
      moment(timestamp){
        return moment(timestamp).fromNow()
      }
    }
  }
</script>
<style scoped>
</style>

