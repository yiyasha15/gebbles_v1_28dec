<template>
    <div class="my-2 my-sm-3">
        <v-row>
            <v-col>
                <v-btn icon @click="react_like()">
                <v-icon v-if="!cook_has_like">mdi-heart-outline</v-icon>
                <v-icon color="red" v-else>mdi-heart</v-icon>
                </v-btn>
                <!-- <span class="caption" v-if="like">{{like}}</span> -->
                <v-btn icon @click="react_dope()" >
                <v-icon v-if="!cook_has_dope">mdi-fire</v-icon>
                <v-icon color="orange" v-else>mdi-fire</v-icon>
                </v-btn>
                <!-- <span class="caption" v-if="dope">{{dope}}</span> -->
                <v-btn icon @click="react_info()" >
                <v-icon v-if="!cook_has_info">mdi-head-flash-outline</v-icon>
                <v-icon color="green" v-else>mdi-head-flash-outline</v-icon>
                </v-btn>
                <!-- <span class="caption" v-if="info">{{info}}</span> -->
            </v-col>
        </v-row>
        <v-row no-gutters class="mt-5">
            <v-avatar size="36" v-if="isAuthenticated && userHasPortfolio && usersPortfolio.thumb" >
            <img
                :src = "usersPortfolio.thumb" 
                alt="img"
            >
            </v-avatar>
            <v-avatar size="36" color="black" v-else >
            <v-icon dark>
                mdi-account-circle
            </v-icon>
            </v-avatar>
            <v-text-field v-if="isAuthenticated && userHasPortfolio" class="mx-4 my-0 pt-0"
                v-model= "comments.comment"
                label="Share your thoughts">
            </v-text-field>
            <v-text-field v-else class="mx-4"
                @click="login_snackbar=true"
                outlined
                rows="1"
                row-height="12"
                max-width= "200"
                label="Share your thoughts">
            </v-text-field>
            <v-btn v-if="isAuthenticated && userHasPortfolio && comments.comment"
                small class="text-decoration-none mt-2" 
                @click="post_comment()"
                dark >Post
            </v-btn>
        </v-row>
        <v-snackbar v-model="valid_snackbar">
        Write something to post.
        </v-snackbar>
        <v-snackbar v-model="login_snackbar">
        Please sign in first.
        </v-snackbar>
        <v-snackbar v-model="thankyou_snackbar">
        Thank you for sharing.
        </v-snackbar>
    </div>
</template>
<script>
// import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    head() {  
    return {
        title: "gebbles - What's cookin",
        }
    },
    props: {
        cookuuid: String
    },
    computed: {
     ...mapGetters(['loggedInUser', 'userHasPortfolio','usersPortfolio', 'isAuthenticated']),
    },
    data(){
        return{
            like:0,
            dope:0,
            info:0,
            cook_has_like: false,
            cook_has_dope: false,
            cook_has_info: false,
            valid_snackbar: false,
            login_snackbar: false,
            thankyou_snackbar: false,
            comments : {
                username : "",
                comment: "",
                cookingidobj: ""
            },
            reactForm:{
                username: "",
                cookingidobj: "",
                like_type:"",
            },
        }
    },
    methods:{
        moment(date){
           return moment(date).format("ll")
        },
        async post_comment() {
        if(this.isAuthenticated){
        if(this.comments.comment != "")
        {
        this.comments.username = this.loggedInUser.username;
        this.comments.cookingidobj = this.cookuuid
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()
            }
        };
        let formData = new FormData();
        for (let data in this.comments) {
            formData.append(data, this.comments[data]);
        }
        try {
            let response = await this.$axios.$post("/v1/whatiscooking/cooking/comments/", formData, config)
            console.log(response);
            this.comments.comment = ''
            this.thankyou_snackbar = true
        } catch (e) {
            console.log(e);
        }
        }
        else{
            this.valid_snackbar = true
        }
        }
        else{
            this.login_snackbar = true
        }
        },
        async react_like(){
          if(this.isAuthenticated){
          this.reactForm.username = this.loggedInUser.username;
          this.reactForm.cookingidobj = this.cookuuid
          this.reactForm.like_type = 'LO'
          console.log(this.reactForm);
          if(!this.cook_has_like){
            this.cook_has_like = !this.cook_has_like
            // console.log("like",this.like);
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
          let formData = new FormData();
          for (let data in this.reactForm) {
              formData.append(data, this.reactForm[data]);
          }
          try {
              let res = await this.$axios.$post("/v1/whatiscooking/cooking/likes/", formData, config)
              console.log(res);
              this.cook_reaction();
          } catch (e) {
              console.log("what",e, e.response);
          }
        }
        }
        else{
            this.login_snackbar = true
        }
        },
        async react_dope(){
            if(this.isAuthenticated){
            this.reactForm.username = this.loggedInUser.username;
            this.reactForm.cookingidobj = this.cookuuid
            this.reactForm.like_type = 'FI'
            if(!this.cook_has_dope){
                this.cook_has_dope = !this.cook_has_dope
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
            let formData = new FormData();
            for (let data in this.reactForm) {
                formData.append(data, this.reactForm[data]);
            }
            try {
                await this.$axios.$post("/v1/whatiscooking/cooking/likes/", formData, config)
                this.cook_reaction();
            } catch (e) {
                console.log(e);
            }
            }
        }
            else{
                this.login_snackbar = true
            }
        },
        async react_info(){
            if(this.isAuthenticated){
            this.reactForm.username = this.loggedInUser.username;
            this.reactForm.cookingidobj = this.cookuuid
            this.reactForm.like_type = 'DE'
            if(!this.cook_has_info){
                this.cook_has_info = !this.cook_has_info
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
            let formData = new FormData();
            for (let data in this.reactForm) {
                formData.append(data, this.reactForm[data]);
            }
            try {
                await this.$axios.$post("/v1/whatiscooking/cooking/likes/", formData, config)
                this.cook_reaction();
            } catch (e) {
                console.log(e);
            }
            }
            }
            else{
                this.login_snackbar = true
            }
        }
    }
}
</script>