<template>
  <div >
    <section >
      <div v-for="(comment, i) in comments" :key="i" class="d-flex align-start">
          <nuxt-link :to="'/'+ comment.username">
          <center>
              <v-list-item-avatar size="36" v-if=" comment.artist_metadata.thumb">
                <img :src = "comment.artist_metadata.thumb" alt="img">
              </v-list-item-avatar>
              <v-list-item-avatar size="36" v-else>
                <v-icon>
                      mdi-account-circle
                  </v-icon>
              </v-list-item-avatar>
          </center>
          </nuxt-link>
        <div class="mb-2">
          <p class="caption ma-0 pa-0 subtitle grey--text text-decoration-none">{{moment(comment.timestamp)}} </p>
          <h5 class="mr-4"><nuxt-link :to="'/'+ comment.username" class="text-decoration-none d-inline">{{comment.username}} </nuxt-link><span class="font-weight-light"> {{comment.comment}}</span></h5>
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
                    v-if="comment.username == loggedInUser.user.username"
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
  </div>
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
            let response = await this.$axios.$delete("/v1/e1t1/sharing/comments/"+ comment.id, config)
            this.$store.dispatch("check_share_comments", comment.shareidobj)
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
          console.log(comment);
          this.report_snackbar =true
        } catch (e) {
            console.log(e);
        }
      },
      moment(date){
        //    return moment(date).format("ll")
           return moment(date).fromNow()
        },
    }
  }
</script>
<style scoped>
.commentFormat{
   white-space: pre-line;  
}
</style>