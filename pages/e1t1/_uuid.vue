<template>
  <v-app>
    <v-container class="width mx-auto" >
        <v-row>
            <v-btn icon class="elevation-0  " @click="goback()" >
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-row>
        <!-- <v-row>
            <v-col class="py-0">
            <h5 class="caption font-weight-light" >
                Posted {{moment(e1t1.created)}}
                </h5>
            </v-col>
        </v-row> -->
        <v-list two-line class="pa-0">
        <v-list-item class="pa-0">
            <v-list-item-avatar>
                <v-icon size="36" class="ma-0">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title><nuxt-link class="text-decoration-none" to="e1t1.username">{{e1t1.username}}</nuxt-link></v-list-item-title>
            <v-list-item-subtitle>{{emoment(e1t1.created)}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-menu v-if="isAuthenticated && loggedInUser.username == e1t1.username ||loggedInUser.username == e1t1.teacher" 
                    transition="slide-y-transition" open-on-hover offset-y bottom left>
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                        </div>
                    </template>
                    <v-list>
                        <v-list-item v-if="e1t1.teacher!= null && loggedInUser.username == e1t1.username ||loggedInUser.username == e1t1.teacher" 
                        class="text-decoration-none pl-5 pr-8"
                        @click="personalDialog=true"
                        >
                        <v-list-item-icon>
                        <v-icon>mdi-message-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Say Hi</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="loggedInUser.username == e1t1.username"
                        class="text-decoration-none pl-5 pr-8"
                        @click="editWorkshop(workshop)"
                        >
                        <v-list-item-icon>
                        <v-icon>mdi-card-account-details-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Gebbles Card</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="loggedInUser.username == e1t1.username"
                        class="text-decoration-none pl-5 pr-8"
                        @click="editE1t1()"
                        >
                        <v-list-item-icon>
                        <v-icon>mdi-book-edit-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="loggedInUser.username == e1t1.username"
                        class="text-decoration-none pl-5 pr-8"
                        @click="deletedialog = true" 
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
        </v-list>
        <v-dialog
            :retain-focus="false"
            v-model="cardDialog"
            width="500px"
            persistent>
            <v-container class="rounded-lg white pa-2">
            <v-btn icon color="error" class="float-right" @click="cardDialog=false; ">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-col cols="12" >
            <v-row class="mt-4">
                <v-col cols="12" class="justify-center ">
                    <h5 class ="font-weight-light">Get your gebbles card for {{e1t1.s_teacher_name}} <v-btn icon text @click="download"><v-icon color="black">mdi-download-circle-outline</v-icon></v-btn></h5>
                </v-col>
                <v-col cols="12" class="justify-center ">
                    <v-img v-if="gebbles_card_url" :src = "gebbles_card_url" maxHeight="420px" contain >
                    </v-img>
                    <template v-else>
                        <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        >
                        <v-progress-circular
                            indeterminate
                            color="black"
                        ></v-progress-circular>
                        </v-row>
                    </template>
                </v-col>
            </v-row>
            </v-col>
            </v-container>
        </v-dialog> 
        <v-dialog v-if="loggedInUser" v-model="deletedialog" width="500" persistent>
            <v-card class="pa-4">
                <p>Are you sure you want to delete the shoutout?</p>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="deleteLoading"
                    @click="deleted">Delete</v-btn>
                <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="deletedialog = false">
                    Cancel
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        <v-row>
            <v-col cols="12" sm="6" align="center" justify="center">
                <v-img :src = "e1t1.image"  maxHeight="380px" contain></v-img>
            </v-col>
            <v-col cols="12" sm="6" >
                <v-row>
                    <v-col>
                    <h5 class="caption" >
                        {{moment(e1t1.s_date)}}
                        <!-- {{e1t1.s_date}}  -->
                        </h5><h5 class="caption mt-1" > {{e1t1.s_location}}</h5>
                    </v-col>
                </v-row>
                <div>
                <v-layout row wrap justify-space-between class="mt-3 mx-0">
                    <v-flex xs10 md4 class="overflow-hidden">
                        <nuxt-link :to="'/'+ e1t1.s_teacher_name" v-if="e1t1.teacher" class="text-decoration-none">
                            <h4 class="font-weight-medium">{{e1t1.teacher}}</h4> 
                        </nuxt-link>
                        <div v-else>
                            <h4 class="font-weight-medium">{{e1t1.s_teacher_name}}</h4> 
                        </div>
                    </v-flex>
                    <v-flex xs2 md2>
                        <div class="pl-1 pt-1" >
                            <country-flag :country= 'e1t1.s_teacher_country' />
                        </div>
                    </v-flex>
                    <v-flex xs10 md4 class="overflow-hidden">
                        <nuxt-link :to="'/'+ e1t1.username" class="text-decoration-none">
                                <h4 class="font-weight-medium" >{{e1t1.username}}</h4> 
                            </nuxt-link>
                    </v-flex>
                    <v-flex xs2 md2>
                            <div class="pl-1 pt-1" >
                            <country-flag :country= 'e1t1.s_student_country' />
                            </div>
                    </v-flex>
                </v-layout>
                <v-layout row wrap justify-start class="mx-0 mb-2">
                    <v-flex md2 xs2>
                        <v-btn icon @click="react_love">
                            <v-icon color="red" v-if="!share_has_love">mdi-heart-outline</v-icon>
                            <v-icon color="red" v-else>mdi-heart</v-icon>
                            <div v-if="love">{{love}}</div>
                        </v-btn>
                    </v-flex>
                    <!-- <v-flex md2 xs2>
                        <v-btn icon class="mx-1" @click="$vuetify.goTo('#scroll_comments')">
                            <v-icon color="black">mdi-comment-outline</v-icon><span v-if="share_comments_list.length" >{{share_comments_list.length}}</span>
                            </v-btn>
                    </v-flex> -->
                </v-layout>
                </div>
                <v-row>
                    <v-col >
                    <h5  class="font-weight-light mt-2 mb-4 text-pre-wrap appreciation">{{e1t1.s_appreciation}}</h5>
                    <v-btn class="mt-4" small outlined color="black" @click="learntDialog=true" v-if="e1t1.s_learnings">
                        <h4 class="font-weight-medium" style="text-transform: capitalize;">Learning</h4>
                        </v-btn>
                    <!-- <span v-if="e1t1.teacher!= null && loggedInUser">
                        <v-btn class="mt-4" small outlined color="black" @click="personalDialog=true" v-if="loggedInUser.username == e1t1.teacher || loggedInUser.username == e1t1.username">
                            <h4 class="font-weight-medium" style="text-transform: capitalize;">Say Hi</h4><v-icon x-small class="pl-1">mdi-lock-outline</v-icon></v-btn>
                    </span> -->
                    </v-col>
                </v-row>
                <v-dialog
                :retain-focus="false"
                v-model="learntDialog"
                width="700px"
                persistent>
                <v-container class="rounded-lg white pa-2">
                <!-- <v-col cols="12" align="end" justify="end"> -->
                <v-btn icon color="error" class="float-right" @click="learntDialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <!-- </v-col> -->
                <v-col cols="12" >
                <h4 class ="font-weight-medium">Learning</h4>
                <h5 class="font-weight-light my-2 text-pre-wrap">{{e1t1.s_learnings}}</h5>
                </v-col>
                </v-container>
                </v-dialog> 
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
                    <v-flex md2 sm3><center>
                        <v-btn small 
                        @click="post_personal_text" class="px-4 px-md-8"
                        color="black" dark >Post
                    </v-btn></center>
                    </v-flex>
                </v-layout>
                <div v-if="personalMessages.length" >
                    <personal-messages-card :messages= "personalMessages"></personal-messages-card>
                </div>
                <!-- <v-card v-intersect="infiniteScrollingComments"></v-card> -->
                </v-col>
                </v-container>
                </v-dialog> 
            </v-col>
            <v-col cols="12" v-if="videoId">
                <center>
                    <youtube width="100%" :height="ytheight" :video-id= 'videoId'></youtube>
                </center>
            </v-col>
            <v-col cols="12">
                <v-btn class="mt-4" small outlined color="black" @click="upload_video = true" v-if="loggedInUser.username == e1t1.username">
                    <h4 class="font-weight-medium" style="text-transform: capitalize;">Upload a video</h4><v-icon small class="pl-1">mdi-play-circle-outline</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12">
                <div v-if="cookingLoaded">
                    <v-layout class="pa-2" v-if="cookingsfiltered.length>0" wrap row justify-start>
                    <div v-for="learn in cookingsfiltered" :key ="learn.index">
                    <cooking-card :cook= "learn"></cooking-card>
                    </div>   
                    </v-layout>
                </div>
                <div v-else>
                    <v-layout class="pa-2" wrap row justify-start>
                    <div v-for="n in this.looploader" :key ="n.index">
                        <card-skeleton-loader></card-skeleton-loader>
                    </div>
                    </v-layout>
                </div>
            </v-col>
        </v-row>
        <v-card v-intersect="infiniteScrollingCooking"></v-card>
    </v-container>  
    <v-dialog max-width="550" 
        v-model="upload_video">
        <v-container class="rounded-lg white px-4">
        <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon color="error" class="float-right" @click="close_upload_video">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
        <upload-video-card></upload-video-card>
        </v-container>
        </v-dialog>
    <v-snackbar v-model="valid_snackbar2">
        Write something to post.
    </v-snackbar>
    <v-snackbar v-model="login_snackbar">
        Please sign in first.
    </v-snackbar>
    <v-snackbar v-model="thankyou_snackbar">
         Message posted.
    </v-snackbar>
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
// import CommentsCard from '~/components/CommentsCard.vue'
import LearningCard from '~/components/LearningCard.vue'
import PersonalMessagesCard from '~/components/PersonalMessagesCard.vue'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import moment from 'moment'
import CookingCard from '~/components/CookingCard.vue'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
import UploadVideoCard from '~/components/UploadVideoCard.vue'
export default {
    head() {
        return {
            title: 'gebbles - each one teach one',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this e1t1 #'
                }
            ]
        }
    },
    layout:'simple',
    created(){
        let url1 =this.e1t1.s_teacher_video //getting value of youtube video urls
        if(url1){
        let videoId = getIdFromURL(url1) //getting id from video url
        this.videoId = videoId //assigning the id to <youtube> video id
        } 
        this.$store.dispatch("check_share_love", this.e1t1.id)
        this.get_cookings_filtered(this.e1t1.username,this.e1t1.id);
    },
    mounted() {
        this.$store.dispatch("check_share_love", this.e1t1.id)
        if(this.isAuthenticated)
        {
        if(this.loggedInUser.username == this.e1t1.teacher || this.loggedInUser.username ==this.e1t1.username){
            this.isYourRoom = true
            this.$store.dispatch("check_personal_room", this.e1t1.id);
            this.items = this.personalMessages;
        }
        }
	},
    components:{
        CountryFlag,
        // CommentsCard,
        LearningCard,
        PersonalMessagesCard,
        Youtube,
        CookingCard ,
        CardSkeletonLoader,
        UploadVideoCard
    },
    data(){
          return {
            looploader:[1,1,1,1,1,1],
            loading: true,
            cardDialog:false,
            gebbles_card_url:'',
            deleteLoading:false,
            love_id:'',
            videoId:'',
            addDedicated:false,
            dialog: false,
            learntDialog:false,
            personalDialog: false,
            valid_snackbar2: false,
            login_snackbar: false,
            thankyou_snackbar: false,
            cookings:[],
            cookingsfiltered:[],
            // comments : {
            //     username : "",
            //     comment: "",
            //     shareidobj: ""
            // },
            loveForm:{
                username: "",
                shareidobj: ""
            },
            personal:{
                shareid: null,
                username: null,
                messagetext: ""
            },
            cookingLoaded: false,
            putVideo:"",
            videoData:'',
            isShowing:false,
            isYourRoom: false,
            items: [],
            upload_video:false,
            }
    },
	computed: {
        ...mapGetters([ 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', 'share_comments_list', 'love', 
        'personalMessages','personalMessagesNotifications', 
        'share_has_love', 'share_has_love_id']),
        ytheight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 410
          case 'md': return 410
          case 'lg': return 410
          case 'xl': return 410
        }
      },
      cardheight () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 84
            case 'sm': return 134
            case 'md': return 134
            case 'lg': return 134
            case 'xl': return 134
          }
        },
        cardwidth () {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 115
            case 'sm': return 215
            case 'md': return 215
            case 'lg': return 215
            case 'xl': return 215
          }
        },
	},
    async asyncData({error, params}) {
      try {
         let each1teach1 = await EventService.getEach1Teach1(params.uuid)
         return {
             e1t1 : each1teach1.data
             }
        } catch (err) {
            console.log(err);
            error({statusCode:503,  message: err.message})
        }
    },
    methods:{
        moment(date){
           return moment(date).format("ll")
        },
        emoment(date){
           return moment(date).fromNow()
        },
         get_cookings_filtered(username,id){
            // console.log("filtering..",username,id);
            EventService.getWhatsCookingUsername(username).then(res =>
            {
                this.cookings = res.data
                // console.log(this.cookings);
                if(this.cookings.length>0)
                {
                let taggedteacherpresent = this.cookings.filter(obj => obj.taggedteachers.length>0)
                let arr=[];
                for(let i=0 ; i<taggedteacherpresent.length; i++)
                {
                    for(let j=0; j<taggedteacherpresent[i].taggedteachers.length;j++)
                    arr.push(taggedteacherpresent[i].taggedteachers[j]);
                }
                let final = arr.filter(obj => obj.shareidobj!=null)
                let f2=[];
                let f3 =[];
                f2 = final.filter(obj => obj.shareidobj.id ==id);

                f2.forEach(element => f3.push(element.id));
                for(let i=0 ; i<taggedteacherpresent.length; i++)
                {
                    for(let j=0; j<taggedteacherpresent[i].taggedteachers.length;j++)
                    {
                    if(f3.find(element => element == taggedteacherpresent[i].taggedteachers[j].id))
                    {
                        this.cookingsfiltered.push(taggedteacherpresent[i])
                    }
                    }
                }
                this.cookingLoaded = true
                }
            }).catch(error =>{
                console.log("error",error);
                this.cookingLoaded = true
            })
        },
        async capture(){
            // send gebbles card post request
            this.cardDialog =true
            if(this.gebbles_card_url == ''){
                let formData = new FormData();
                formData.append('s3_obj_url', this.e1t1.image_mini);
                formData.append('message_text', this.e1t1.s_appreciation);
                formData.append('name', this.loggedInUser.username);
                try {
                    let res = await this.$axios.$post("https://lptmv2b4j9.execute-api.us-east-2.amazonaws.com/dev/upload", formData)
                    this.gebbles_card_url =res
                } catch (e) {
                    console.log(e.response);
                }
            }
        },
        download(){
            const link = document.createElement('a');
            link.href =  this.gebbles_card_url;
            link.setAttribute('download', this.loggedInUser.username+'_card.png'); //or any other extension
            link.click();
        },
        close_upload_video(){
            this.$store.dispatch("remove_cook_obj")
            this.upload_video=false; 
        },
        filtercooking(){
            // this.$store.dispatch("check_cookings_filtered",this.e1t1.id)
        },
        infiniteScrollingCooking(entries, observer, isIntersecting) {
            // this.$store.dispatch("update_user_cookings");
        },
        // infiniteScrollingComments(entries, observer, isIntersecting) {
        //     this.$store.dispatch("update_user_comments");
        // },
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
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            this.$store.dispatch("remove_share_obj")
            try {
                let response = await this.$axios.$delete("/v1/e1t1/sharing/"+this.e1t1.uuid, config)
                // console.log("e1t1 deleted.");
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
        async react_love(){
            if(this.isAuthenticated){
                this.loveForm.username = this.loggedInUser.username;
                this.loveForm.shareidobj = this.e1t1.id
                if(this.share_has_love){
                    this.$store.dispatch("change_love");
                    const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                    };
                     try {
                        await this.$axios.$delete("/v1/e1t1/sharing/love/"+this.share_has_love_id , config)
                        this.$store.dispatch("check_share_love", this.e1t1.id)
                        //store make share love flse
                    } catch (e) {
                        console.log(e);
                    }
                }
                else{
                    this.$store.dispatch("change_love");
                    const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
                let formData = new FormData();
                for (let data in this.loveForm) {
                    formData.append(data, this.loveForm[data]);
                }
                    try {
                        await this.$axios.$post("/v1/e1t1/sharing/love/", formData, config)
                        this.$store.dispatch("check_share_love", this.e1t1.id)
                        //make share love true
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            else{
                this.login_snackbar = true
            }
        },
        // async post_comment() {
        //     if(this.isAuthenticated){
        //     if(this.comments.comment != "" )
        //     {
        //     this.comments.username = this.loggedInUser.username;
        //     this.comments.shareidobj = this.e1t1.id
        //     const config = {
        //         headers: {"content-type": "multipart/form-data",
        //             "Authorization": this.$auth.strategy.token.get()
        //         }
        //     };
        //     let formData = new FormData();
        //     for (let data in this.comments) {
        //         formData.append(data, this.comments[data]);
        //     }
        //     try {
        //         let response = await this.$axios.$post("/v1/e1t1/sharing/comments/", formData, config)
        //         this.$store.dispatch("check_share_comments", this.e1t1.id)
        //         this.comments.comment = ''
        //         this.thankyou_snackbar = true
        //     } catch (e) {
        //         console.log(e);
        //     }
        //     }
        //     else{
        //         this.valid_snackbar2 = true
        //     }}
        //     else{
        //         this.login_snackbar = true
        //     }
        // },
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
                await this.$axios.$post("/v1/chat/", formData, config)
                this.personal.messagetext = ''
                this.personal.shareid = null
                this.personal.username = null
                this.thankyou_snackbar = true
                this.$store.dispatch("check_personal_room", this.e1t1.id);
            } catch (e) {
                console.log(e.response);
            }}else{
                this.valid_snackbar2 =true
            }
        },
        
    }
    
}
</script>
<style  scoped>
.v-dialog{
    margin:12px
}
.appreciation{
    text-align:justify;
    max-height: 200px;
    overflow: auto;
}
.width{
    max-width: 950px;
  }
@media only screen and (max-width: 600px) {
  .width{
    max-width: 600px;
  }

}
</style>
