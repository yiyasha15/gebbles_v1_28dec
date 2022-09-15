<template>
  <v-container class="ma-2 px-8">
    <section>
          <div v-for="(message, i) in messages" :key="i" class="d-flex align-start">
              <div v-for="artist in artists" :key ="artist.index">
                <nuxt-link :to="'/'+ message.username">
                    <v-list-item-avatar v-if=" message.username == artist.username">
                            <img :src = "artist.thumb" alt="img">
                    </v-list-item-avatar>
                </nuxt-link>
              </div>
              <div>
                <div class="subtitle grey--text">
                  <nuxt-link :to="'/'+ message.username">{{message.username}}</nuxt-link>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs"
                        v-on="on">
                        {{moment(message.created)}}</span>
                    </template>
                    <span>{{exact_moment(message.created)}}</span>
                  </v-tooltip>
                </div>
                <p class="messageFormat">{{message.messagetext}}</p></div>
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
                v-if="message.username == loggedInUser.username"
                class="text-decoration-none pl-6 pr-12"
                color="error"
                @click="deleted(message.uuid,message.shareid)"
                >
                <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
                <v-list-item
                v-else
                class="text-decoration-none pl-6 pr-12"
                @click="reported(message.uuid)"
                >
                <v-list-item-title>Report</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
            <!-- <v-divider v-if="i + 1 < message.length"></v-divider> -->
        </div>
    </section>
    <v-snackbar v-model="delete_snackbar">
            Message deleted.
            <template v-slot:action="{ attrs }">
            <v-btn
                color="error"
                icon
                v-bind="attrs"
                @click="delete_snackbar = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </template>
    </v-snackbar>
    <v-snackbar v-model="report_snackbar">
        Message reported.
        <template v-slot:action="{ attrs }">
        <v-btn
            color="error"
            icon
            v-bind="attrs"
            @click="report_snackbar = false"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
  export default {
    props: {
      messages: Array,
    },
    data() {
      return {
        value: new Date(),
        show: false,
        report_snackbar: false,
        delete_snackbar :false
        }
    },
    mounted(){
      // console.log(this.messages);
    },
    components: {
    },
    computed: {
        ...mapGetters(['loggedInUser', 'artists' ,'isAuthenticated']),
    },
    methods:{
      moment(date) {
        // moment(date).format("MMM Do, YYYY")
        return moment(date).fromNow()
      },
      exact_moment(date){
        return moment(date).format('lll')
      },
      async deleted(uuid, shareid){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
        };
        try {
            let response = await this.$axios.$delete("/v1/chat/"+ uuid, config)
            this.$store.dispatch("check_personal_room", shareid)
            this.delete_snackbar =true
        } catch (e) {
            console.log(e.response);
        }
      },
      async reported(message){
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
    }
  }
</script>
<style scoped>
.messageFormat{
   white-space: pre-line;  
}
</style>

