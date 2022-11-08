<template>
    <v-list>
      <v-list-item >
        <v-list-item-avatar >
            <img v-if="isAuthenticated && userHasPortfolio && usersPortfolio.thumb"
              :src = "usersPortfolio.thumb" 
              alt="img">
              <v-icon dark v-else>
                  mdi-account-circle
              </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-text-field
              v-model= "personal.messagetext" 
              label="Type something..">
            </v-text-field>
        </v-list-item-content>

        <v-list-item-action>
            <v-btn small v-if="personal.messagetext"
                @click="post_personal_text" class="px-4 px-md-8 black"><span class="white--text">Post</span>
            </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-snackbar v-model="thankyou_snackbar">
      Message sent.
    </v-snackbar>
    </v-list>
</template>
<script>
// import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
export default {
    props:{
        e1t1:Object
    },
    computed: {
        ...mapGetters(['userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio']),
    },
    data(){
        return{
            thankyou_snackbar:false,
            personal:{
            shareid: null,
            username: null,
            messagetext: ""
        }
        }
    },
    methods:{
        async post_personal_text(){
            if(this.personal.messagetext)
            {
                this.personal.username = this.loggedInUser.username
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
                    this.$emit('message_posted');
                    this.personal.messagetext = ''
                    this.personal.shareid = null
                    this.personal.username = null
                    this.thankyou_snackbar = true
                } catch (e) {
                    console.log(e.response);
                }
            }
      },
    }
}
</script>