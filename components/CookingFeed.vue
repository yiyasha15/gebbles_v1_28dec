<template>
    <div>
        <div class="my-md-2 my-0" > 
            <v-list-item two-line class="px-md-0">
                <v-list-item-avatar v-if="cook.profile_photo">
                    <v-img :src="cook.profile_photo"></v-img>
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                <v-icon size="36" class="ma-0">mdi-account-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title><nuxt-link :to="'/'+ cook.username" v-if="cook.username" class="text-decoration-none">
                        {{cook.username}}
                    </nuxt-link></v-list-item-title>
                    <v-list-item-subtitle>{{moment(this.cook.timestamp)}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-menu v-if="isAuthenticated && loggedInUser.username == cook.username" 
                        transition="slide-y-transition" open-on-hover offset-y bottom left>
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
                            ><v-list-item-icon>
                            <v-icon>mdi-book-edit-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                            class="text-decoration-none pl-5 pr-8"
                            @click="dialog = true"
                            >
                            <v-list-item-icon>
                        <v-icon>mdi-delete-outline</v-icon>
                        </v-list-item-icon>
                            <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item-action>
            </v-list-item>
            <div class="body-1 feed_content mb-2 mb-md-5 px-md-0 px-4">{{cook.lesson}}</div>
            <youtube width="100%" :height="height" :video-id= 'videoId' v-if="videoId"></youtube>
            <video id="videoId" width="100%" :height="height" controls playsinline :poster="cook.thumbjs" preload="none" controlsList="nodownload" v-else>
                <source :src="cook.video" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="px-4 px-md-0 my-1">
                <!-- {{cook.taggedteachers}} -->
                <span v-for="obj in cook.taggedteachers" :key="obj.id">
                <nuxt-link class="text-decoration-none" v-if="obj.shareidobj" :to="'/e1t1/'+ obj.shareidobj.uuid">
                    <v-chip color="black grey" dark outlined class="mr-1 mb-1 " style="cursor:pointer;">
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
                </span>
            </div>
            <div :class="{'px-3': $vuetify.breakpoint.smAndDown}" align="left" justify="left">
            <div class="my-2 my-sm-3">
                <v-row>
                    <v-col>
                        <v-btn icon @click="react_like()">
                        <v-icon v-if="!cook_has_like">mdi-heart-outline</v-icon>
                        <v-icon color="red" v-else>mdi-heart</v-icon>
                        </v-btn>
                        <span class="caption" v-if="like">{{like}}</span>
                        <v-btn icon @click="react_dope()" >
                        <v-icon v-if="!cook_has_dope">mdi-fire</v-icon>
                        <v-icon color="orange" v-else>mdi-fire</v-icon>
                        </v-btn>
                        <span class="caption" v-if="dope">{{dope}}</span>
                        <v-btn icon @click="react_info()" >
                        <v-icon v-if="!cook_has_info">mdi-head-flash-outline</v-icon>
                        <v-icon color="green" v-else>mdi-head-flash-outline</v-icon>
                        </v-btn>
                        <span class="caption" v-if="info">{{info}}</span>
                    </v-col>
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
                        @click="post_comment(cook.id)"
                         dark >Post
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
import GebblesDivider from './GebblesDivider.vue'
export default {
    head() {  
    return {
        title: "gebbles - What's cookin",
        }
    },
    name: 'CookingCard',
    props: {
        cook: Object
    },
    components:{
        LearningCommentsCard,
        GebblesDivider,
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
                if(this.isAuthenticated){
                let check_like = like_arr.filter(likes => likes.username == this.loggedInUser.username);
                if(check_like.length>0){
                this.cook_has_like = true
                this.cook_has_like_id = check_like[0].id
                }
                let check_dope = dope_arr.filter(dopes => dopes.username == this.loggedInUser.username);
                if(check_dope.length>0){
                this.cook_has_dope = true
                this.cook_has_dope_id = check_dope[0].id
                }
                
                let check_info = info_arr.filter(infos => infos.username == this.loggedInUser.username);
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
        this.comments.username = this.loggedInUser.username;
        this.comments.cookingidobj = id
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
                    "Authorization": this.$auth.strategy.token.get()
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
          this.reactForm.username = this.loggedInUser.username;
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
              "Authorization": this.$auth.strategy.token.get()
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
        async react_dope(){
            if(this.isAuthenticated){
            this.reactForm.username = this.loggedInUser.username;
            this.reactForm.cookingidobj = this.cook.id
            this.reactForm.like_type = 'FI'
            if(this.cook_has_dope){
                this.cook_has_dope = !this.cook_has_dope
                this.dope =this.dope-1;
                const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
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
            this.reactForm.cookingidobj = this.cook.id
            this.reactForm.like_type = 'DE'
            if(this.cook_has_info){
                this.cook_has_info = !this.cook_has_info
                this.info =this.info-1;
                const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
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
.feed_content{
    max-height: 146px;
  overflow: auto;
}
/* .v-icon:hover{
    color: #815A44;
} */
</style>
