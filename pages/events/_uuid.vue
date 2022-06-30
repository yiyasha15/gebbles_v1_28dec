<template>
  <v-app>
       <v-container class=" mx-auto" fluid style="max-width:750px" >
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
       </v-container>
        <v-container class="mx-auto" fluid style="max-width:750px" >
        individual event page
        {{event}}
        </v-container>
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
// import CookingCard from '~/components/CookingCard.vue'
export default {
    head() {
        return {
            title: 'e1t1',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this e1t1 #'
                }
            ]
        }
    },
    created(){
        },
    components:{
        Youtube,
    },
    data(){
          return {
            looploader:[1,1,1,1,1,1],
            loading: true,
            dynamic_height: 50,
            }
    },
	computed: {
        ...mapGetters([ 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', ]),
	},
    async asyncData({error, params}) {
      try {
         let event = await EventService.getEvent(params.uuid)
         console.log(event);
         return {
             event : event.data
             }
        } catch (err) {
            console.log(err.response);
            error({statusCode:503,  message: err.message})
        }
    },
    methods:{
        formatTime() {
        const options = {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute:'2-digit'
        };
        let now = new Date().toLocaleString('en-US', options);
        return now;
        },
        goback(){
            this.$store.dispatch("remove_share_obj")
            this.$store.dispatch("remove_learnings")
            this.$store.dispatch("remove_love")
            window.history.back();
        },
        async deleted(){
            this.deleteLoading = true;
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            this.$store.dispatch("remove_share_obj")
            try {
                let response = await this.$axios.$delete("/v1/e1t1/sharing/"+this.e1t1.uuid, config)
                console.log("e1t1 deleted.");
                this.deleteLoading = false;
                this.$store.dispatch("check_user_teachers");
                this.$router.push("/"+ this.e1t1.username+"/each1teach1");
            } catch (e) {
                console.log(e.response);
                this.deleteLoading = false;
            }
        },
        async editE1t1(){
            this.$store.dispatch("check_share_obj", this.e1t1);
            this.$router.push("/create/each1teach1");
        },
        
    }
    
}
</script>
<style  scoped>

</style>
