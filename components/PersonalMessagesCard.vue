<template>
  <div>
    <v-badge
        bordered
        top
        color="red"
        offset-x="10"
        offset-y="10"
        :content="new_messages.length"
        v-if="new_messages.length"
    >
    <v-btn class="ml-4" @click="make_is_seen_true" icon>
        <v-icon>mdi-message-outline</v-icon>
    </v-btn>
    </v-badge>
    <v-btn class="ml-4" @click="personalDialog=true" icon v-else>
        <v-icon>mdi-message-outline</v-icon>
    </v-btn>
    <v-dialog
      :retain-focus="false"
      v-model="personalDialog"
      width="700px"
      persistent>
      <v-container class="rounded-lg white pa-2">
      <!-- <v-col cols="12" align="end" justify="end"> -->
      <v-btn icon color="error" class="float-right" @click="personalDialog=false">
          <v-icon>mdi-close</v-icon>
      </v-btn>
      <!-- </v-col> -->
      <v-col cols="12" class="pa-0 pa-md-2">
      <v-row class="mt-3 mx-0">
          <v-col cols="12" class="justify-center ">
              <h4 class ="font-weight-medium">Chat room ({{e1t1.s_teacher_name}}, {{e1t1.username}}) </h4>
          </v-col>
      </v-row> 
      <v-layout class="mt-6">
          <v-flex md1 sm2><center>
              <v-avatar size="36" v-if="isAuthenticated && userHasPortfolio && usersPortfolio.thumb" >
              <img
              :src = "usersPortfolio.thumb" 
              alt="img">
              </v-avatar>
              <v-avatar size="36" color="black" v-else >
              <v-icon dark>
                  mdi-account-circle
              </v-icon>
              </v-avatar>
              </center>
          </v-flex>
          <v-flex md9 sm8>
              <v-textarea
              v-model= "personal.messagetext" 
              outlined
              auto-grow
              rows="1"
              row-height="10"
              max-width= "100%"
              label="Type something..">
              </v-textarea>
          </v-flex>
          <v-flex md2 sm3>
              <center>
                  <v-btn small v-if="personal.messagetext"
                      @click="post_personal_text" class="px-4 px-md-8 black"><span class="white--text">Post</span>
                  </v-btn>
              </center>
          </v-flex>
      </v-layout>
      <v-container >
          <section>
          <div v-for="(message, i) in personalMessages" :key="i" class="d-flex align-start">
              <nuxt-link :to="'/'+ message.username" class="text-decoration-none">
                  <v-list-item-avatar v-if="message.profile_photo">
                      <img :src = "message.profile_photo" alt="img">
                  </v-list-item-avatar>
                  <v-list-item-avatar v-else>
                      <v-icon size="40">mdi-account-circle</v-icon>
                  </v-list-item-avatar>
              </nuxt-link>
              <div>
              <div class="subtitle grey--text">
                  <nuxt-link :to="'/'+ message.username" class="text-decoration-none">{{message.username}}</nuxt-link>
                  <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs"
                      v-on="on" class="caption">
                      {{moment(message.created)}}</span>
                  </template>
                  <span>{{exact_moment(message.created)}}</span>
                  </v-tooltip>
              </div>
              <p class="messageFormat">{{message.messagetext}}</p>
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
                  v-if="message.username == loggedInUser.username"
                  class="text-decoration-none pl-6 pr-12"
                  color="error"
                  @click="deleted(message.id)"
                  >
                  <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                  v-else
                  class="text-decoration-none pl-6 pr-12"
                  @click="reported(message.id)"
                  >
                  <v-list-item-title>Report</v-list-item-title>
                  </v-list-item>
              </v-list>
          </v-menu>
          </div>
          </section>
      </v-container>
          <!-- <v-card v-intersect="infiniteScrollingComments"></v-card> -->
      </v-col>
      </v-container>
      </v-dialog> 
    <v-snackbar v-model="delete_snackbar">
      Message deleted.
    </v-snackbar>
    <v-snackbar v-model="report_snackbar">
        Message reported.
    </v-snackbar>
  </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import moment from 'moment'
  export default {
    props: {
      e1t1: Object,
    },
    created(){
      this.get_messages();
    },
    data() {
      return {
        value: new Date(),
        show: false,
        report_snackbar: false,
        delete_snackbar :false,
        new_messages:[],
        personal:{
            shareid: null,
            username: null,
            messagetext: ""
        },
        personalDialog:false,
        personalMessages:[],
        personalMessages_page:'',
        }
    },
    components: {
    },
    computed: {
        ...mapGetters(['userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio']),
    },
    methods:{
      moment(date) {
        // moment(date).format("MMM Do, YYYY")
        return moment(date).fromNow()
      },
      exact_moment(date){
        return moment(date).format('lll')
      },
      async deleted(id){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()
            }
        };
        try {
            let response = await this.$axios.$delete("/v1/chat/list/"+ id, config)
            this.delete_snackbar =true
        } catch (e) {
            console.log(e.response);
        }
      },
      async reported(id){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access
            }
        };
        try {
            console.log("report","/v1/chat/list/"+ id);
          this.report_snackbar =true
        } catch (e) {
            console.log(e);
        }
      },
      get_messages(){
        EventService.getPersonalMessages(this.e1t1.id).then(res =>
        {
            this.personalMessages = res.data.results;
            this.personalMessages_page = res.data.next;
            this.new_messages = this.personalMessages.filter(item => item.is_seen == false && item.username != this.loggedInUser.username)
        }).catch(error =>{
            console.log("error",error);
        })
      },
      infiniteScrollingMessages(entries, observer, isIntersecting) {
      if(this.personalMessages_page){
      const key = 'id';
      this.$axios.get(this.personalMessages_page).then(response => {
            this.personalMessages_page= response.data.next;
            response.data.results.forEach(item => this.personalMessages.push(item));
            // filter array so no duplicates
            this.personalMessages = [...new Map(this.personalMessages.map(item =>
              [item[key], item])).values()];
        })
        .catch(err => {
          console.log(err);
        });
      }
      },
      async post_personal_text(){
            if(this.personal.messagetext)
            {this.personal.username = this.loggedInUser.username
            this.personal.shareid = this.e1t1.id
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            let formData = new FormData();
            for (let data in this.personal) {
                formData.append(data, this.personal[data]);
            }
            try {
                await this.$axios.$post("/v1/chat/create/", formData, config)
                this.get_messages();
                this.personal.messagetext = ''
                this.personal.shareid = null
                this.personal.username = null
                this.thankyou_snackbar = true
            } catch (e) {
                console.log(e.response);
            }}else{
                this.valid_snackbar2 =true
            }
      },
      async make_is_seen_true(){
        this.personalDialog=true;
        // make all messages is_seen_true
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()
            }
        };
        try {
            for (var i = 0; i < this.new_messages.length; i++)
            {
            let form= new FormData();
            form.append('is_seen', 'true');
            await this.$axios.$put("v1/chat/list/is_seen/"+this.new_messages[i].id , form, config)
            }
        } catch (error) {
            console.log("error..",error,error.response);
        }
      }
    }
  }
</script>
<style scoped>
.messageFormat{
   white-space: pre-line;  
}
</style>

