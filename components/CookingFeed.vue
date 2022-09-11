<template>
<div>
    <div class="my-2" >   
    <!-- <div style="float:left;"> -->
         <youtube width="100%" :height="height" :video-id= 'videoId' v-if="videoId"></youtube>
          <video id="videoId" width="100%" :height="height" controls playsinline :poster="cook.thumbjs" preload="none" controlsList="nodownload" v-else>
                <source :src="cook.video" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        <v-row class="pt-3 pb-2 px-3">
    <h5 class="pl-3 pl-md-0 caption">{{moment(this.cook.timestamp)}}</h5>
        </v-row>
    <!-- </div> -->
    <div :class="{'px-3': $vuetify.breakpoint.smAndDown}" align="left" justify="left">
    <div class="my-1">
        <v-row >
        <v-col class="pa-1">
            <v-btn icon @click="react_like()">
              <v-icon color="black" v-if="!cook_has_like">mdi-heart-outline</v-icon>
              <v-icon color="red" v-else>mdi-heart</v-icon>
            </v-btn>
            <span class="caption" v-if="like">{{like}}</span>
            <v-btn icon @click="react_dope()" >
              <v-icon color="black" v-if="!cook_has_dope">mdi-fire</v-icon>
              <v-icon color="orange" v-else>mdi-fire</v-icon>
            </v-btn>
            <span class="caption" v-if="dope">{{dope}}</span>
            <v-btn icon @click="react_info()" >
              <v-icon color="black" v-if="!cook_has_info">mdi-head-flash-outline</v-icon>
              <v-icon color="green" v-else>mdi-head-flash-outline</v-icon>
            </v-btn>
            <span class="caption" v-if="info">{{info}}</span>
        </v-col>
        <span v-if="loggedInUser">
            <v-col v-if="loggedInUser.user.username == cook.username" >
            <v-menu transition="slide-y-transition" open-on-hover offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                    </div>
                </template>
                <v-list>
                    <v-list-item
                    class="text-decoration-none pl-5 pr-8"
                    @click="editcook"
                    >
                    <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    class="text-decoration-none pl-5 pr-8"
                    @click="dialog = true"
                    >
                    <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            </v-col>
        </span>
    </v-row>
    <v-dialog v-model="dialog" width="500">
        <v-card class="pa-4">
            <p>Are you sure you want to delete the video?</p>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="deleteLoading"
                @click="deleted">Delete</v-btn>
            <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="dialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <div class="my-2" >
    <nuxt-link :to="'/'+ cook.username" v-if="cook.username" class="text-decoration-none">
        {{cook.username}}{{": "}}
    </nuxt-link>{{cook.lesson}}
    </div>
    <nuxt-link v-for="obj in cook.taggedteachers" :key="obj.id" :to="'/e1t1/'+ obj.shareidobj.uuid" class="text-decoration-none">
        <v-chip color="black grey" dark outlined class="mr-1" style="cursor:pointer;">
        <v-avatar left v-if="obj.shareidobj.teacher">
            <v-img :src="obj.shareidobj.teacher.artist_metadata.thumb"></v-img>
        </v-avatar>
        <v-avatar left v-else-if="obj.shareidobj.s_photo">
            <v-img :src="obj.shareidobj.s_photo"></v-img>
        </v-avatar>
        <v-avatar left v-else>
            <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        {{obj.shareidobj.s_teacher_name}}
        </v-chip>
    </nuxt-link>
        <!-- <span class="font-weight-light">
            Comments {{comment_array.length}}
        </span> -->
        <v-row no-gutters style="flex-wrap: nowrap;" class="mt-2">
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
            <v-textarea v-if="isAuthenticated && userHasPortfolio" class="mx-4"
                v-model= "comments.comment"
                outlined
                auto-grow
                rows="1"
                row-height="15"
                max-width= "200"
                label="Share your thoughts">
            </v-textarea>
            <v-textarea v-else class="mx-4"
                @click="login_snackbar=true"
                outlined
                rows="1"
                row-height="15"
                max-width= "200"
                label="Share your thoughts">
            </v-textarea>
            <v-btn v-if="isAuthenticated && userHasPortfolio"
                small class="text-decoration-none mt-2" 
                @click="post_comment(cook.id)"
                    color="black" dark >Post
            </v-btn>
        </v-row>
        <div style="
            max-height:168px;
            overflow-x: hidden;
            overflow-y: auto;
            text-align:justify; margin-top:-16px">
        <v-row v-if="comment_array.length" class="mt-0">
        <learning-comments-card :comments = "comment_array" @commentDelete="commentDelete"></learning-comments-card>
        </v-row>
        </div>
    </div>
    </div>
    </div>
    <v-divider class="my-4"></v-divider>
    
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
import EventService from '@/services/EventService.js'
import LearningCommentsCard from '~/components/LearningCommentsCard.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
export default {
    head() {  
    return {
        title: "What's cookin",
        }
    },
    name: 'CookingCard',
    props: {
        cook: Object
    },
    components:{
        LearningCommentsCard,
        Youtube
    },
    computed: {
    ...mapGetters(['loggedInUser', 'userHasPortfolio','usersPortfolio', 'isAuthenticated', 'learning_comments_list']),
    height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 410
          case 'md': return 410
          case 'lg': return 410
          case 'xl': return 410
        }
      },
    },
    data(){
        return{
            videoId:'',
            dialog:false,
            deleteLoading:false,
            deleteLearnDialog: false,
            comment_array:[],
            like:0,
            dope:0,
            info:0,
            cook_has_like:false,
            cook_has_dope:false,
            cook_has_info:false,
            cook_has_like_id: '',
            cook_has_dope_id: '',
            cook_has_info_id: '',
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
    created(){
        let yt_re =/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
        let url =this.$props.cook.video 
        if(yt_re.test(url))
        {
        //getting value of youtube video urls
        if(url)
        this.videoId = getIdFromURL(url) 
        }
        else{
            //show prev video
        }
        this.cook_reaction();
        this.cook_comments();
    },
    methods:{
        moment(date){
           return moment(date).format("ll")
        },
        async cook_comments(){
            EventService.getCookComments(this.cook.id).then(res =>  this.comment_array=res.data.results)
        },
        async cook_reaction(){
            EventService.getCookReaction(this.cook.id).then(res => {
            if(res.data){
                let react = res.data
                let like_arr = react.filter(react => react.like_type == "LO");
                let dope_arr = react.filter(react => react.like_type == "FI");
                let info_arr = react.filter(react => react.like_type == "DE");
                this.like = like_arr.length
                this.dope = dope_arr.length
                this.info = info_arr.length
                if(this.loggedInUser){
                let check_like = like_arr.filter(likes => likes.username == this.$store.state.auth.user.user.username);
                if(check_like.length>0){
                this.cook_has_like = true
                this.cook_has_like_id = check_like[0].id
                }
                let check_dope = dope_arr.filter(dopes => dopes.username == this.$store.state.auth.user.user.username);
                if(check_dope.length>0){
                this.cook_has_dope = true
                this.cook_has_dope_id = check_dope[0].id
                }
                
                let check_info = info_arr.filter(infos => infos.username == this.$store.state.auth.user.user.username);
                if(check_info.length>0){
                this.cook_has_info = true
                this.cook_has_info_id = check_info[0].id
                }
            }
            }
            })
        },
        async post_comment(id) {
        if(this.isAuthenticated){
        if(this.comments.comment != "" )
        {
        this.comments.username = this.$store.state.auth.user.user.username;
        this.comments.cookingidobj = id
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
        };
        let formData = new FormData();
        for (let data in this.comments) {
            formData.append(data, this.comments[data]);
        }
        try {
            let response = await this.$axios.$post("/v1/whatiscooking/cooking/comments/", formData, config)
            this.cook_comments();
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
        async editcook(){
            this.$store.dispatch("check_cook_obj", this.cook);
            this.$router.push("/create/uploadvideo");
        },
        deleted(){
            this.deleteLoading = true;
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            this.$store.dispatch("remove_cook_obj")
            this.$store.dispatch("remove_cook_reactions")
            try {
                this.$axios.$delete("/v1/whatiscooking/cooking/"+this.cook.uuid, config).then(res=>{
                console.log("cooking deleted",res);
                this.deleteLoading = false;
                this.dialog =false;
                this.$emit("postDelete"); 
                })
            } catch (e) {
                console.log(e.response);
                this.deleteLoading = false;
            }
        },
        async react_like(){
          if(this.isAuthenticated){
          this.reactForm.username = this.$store.state.auth.user.user.username;
          this.reactForm.cookingidobj = this.cook.id
          this.reactForm.like_type = 'LO'
          if(this.cook_has_like){
            this.cook_has_like = !this.cook_has_like
            // console.log(this.like);
            this.like = this.like-1;
            // console.log(this.like);
            const config = {
            headers: {
              "content-type": "multipart/form-data",
              "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
            };
              try {
                await this.$axios.$delete("/v1/whatiscooking/cooking/likes/"+this.cook_has_like_id , config)
                this.cook_reaction();
            } catch (e) {
                console.log(e);
            }
          }
          else{
            this.cook_has_like = !this.cook_has_like
            this.like = this.like+1;
            // console.log("like",this.like);
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
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
        async react_dope(){
            if(this.isAuthenticated){
            this.reactForm.username = this.$store.state.auth.user.user.username;
            this.reactForm.cookingidobj = this.cook.id
            this.reactForm.like_type = 'FI'
            if(this.cook_has_dope){
                this.cook_has_dope = !this.cook_has_dope
                this.dope =this.dope-1;
                const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
                };
                try {
                    await this.$axios.$delete("/v1/whatiscooking/cooking/likes/"+this.cook_has_dope_id , config)
                    this.cook_reaction();
                } catch (e) {
                    console.log(e);
                }
            }
            else{
                this.cook_has_dope = !this.cook_has_dope
                this.dope =this.dope+1;
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token
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
            this.reactForm.username = this.$store.state.auth.user.user.username;
            this.reactForm.cookingidobj = this.cook.id
            this.reactForm.like_type = 'DE'
            if(this.cook_has_info){
                this.cook_has_info = !this.cook_has_info
                this.info =this.info-1;
                const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
                };
                try {
                    await this.$axios.$delete("/v1/whatiscooking/cooking/likes/"+this.cook_has_info_id , config)
                    this.cook_reaction();
                } catch (e) {
                    console.log(e);
                }
            }
            else{
                this.cook_has_info = !this.cook_has_info
                this.info =this.info+1;
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token
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
        commentDelete(){
            this.cook_comments();
        }
    }
}
</script>
<style scoped>
.v-text-field__details {
    display: none !important;
}
</style>
