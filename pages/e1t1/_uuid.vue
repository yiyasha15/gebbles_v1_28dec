<template>
  <v-app>
       <v-container class=" mx-auto" fluid style="max-width:950px" >
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <!-- <v-spacer></v-spacer> -->
        <div v-if="loggedInUser" class="float-right">
        <v-col v-if="loggedInUser.username == e1t1.username" class="pa-1" >
            <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-btn small icon v-bind="attrs"
            v-on="on">
            <v-icon small color="black" @click="capture">mdi-card-account-details-outline</v-icon>
        </v-btn>
        </template>
        <span>Gebbles card</span>
        </v-tooltip>
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
        <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-btn small icon v-bind="attrs"
            v-on="on">
            <v-icon small color="black" @click="editE1t1">mdi-circle-edit-outline</v-icon>
        </v-btn>
        </template>
        <span>Edit</span>
        </v-tooltip>
        <v-dialog v-if="loggedInUser" v-model="dialog" width="500" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip top v-bind="attrs" v-on="on">
            <template v-slot:activator="{ on, attrs }">
                <v-btn small icon >
                <v-icon small color="error" @click="dialog = true" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                </v-btn>
            </template>
            <span>Delete</span>
            </v-tooltip>
        </template>
        <v-card class="pa-4">
            <p>Are you sure you want to delete the shoutout?</p>
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
        </v-col>
        </div>
       </v-container>
        <v-container class="mx-auto" fluid style="max-width:950px" >
        <v-row class="pb-4">
            <v-col cols="12" sm="6" align="center" justify="center">
                <v-img :src = "e1t1.image"  maxHeight="380px" contain></v-img>
            </v-col>
            <v-col cols="12" sm="6" >
                <v-row>
                    <v-col>
                    <h5 class="caption mt-1" >
                        {{moment(e1t1.s_date)}}
                         <!-- {{e1t1.s_date}}  -->
                         </h5><h5 class="caption mt-1" > {{e1t1.s_location}}</h5>
                    </v-col>
                    <!-- <div v-if="loggedInUser">
                    <v-col v-if="loggedInUser.username == e1t1.username" >
                        <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small icon v-bind="attrs"
                        v-on="on">
                        <v-icon small color="black" @click="capture">mdi-card-account-details-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Gebbles card</span>
                    </v-tooltip>
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
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small icon v-bind="attrs"
                        v-on="on">
                        <v-icon small color="black" @click="editE1t1">mdi-circle-edit-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Edit</span>
                    </v-tooltip>
                    <v-dialog v-if="loggedInUser" v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-tooltip top v-bind="attrs" v-on="on">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small icon >
                            <v-icon small color="error" @click="dialog = true" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete</span>
                        </v-tooltip>
                    </template>
                    <v-card class="pa-4">
                        <p>Are you sure you want to delete the shoutout?</p>
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
                    </v-col>
                    </div> -->
                </v-row>
                <div>
                <v-layout row wrap justify-space-between class="mt-3 mx-0">
                    <v-flex xs10 md4 class="overflow-hidden">
                        <nuxt-link :to="'/'+ e1t1.s_teacher_name" v-if="e1t1.teacher" class="text-decoration-none">
                            <h4 >{{e1t1.teacher}}</h4> 
                        </nuxt-link>
                        <div v-else>
                            <h4>{{e1t1.s_teacher_name}}</h4> 
                        </div>
                    </v-flex>
                    <v-flex xs2 md2>
                        <div class="pl-1 pt-1" >
                            <country-flag :country= 'e1t1.s_teacher_country' />
                        </div>
                    </v-flex>
                    <v-flex xs10 md4 class="overflow-hidden">
                        <nuxt-link :to="'/'+ e1t1.username" class="text-decoration-none">
                                <h4 >{{e1t1.username}}</h4> 
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
                    <!-- <h4 v-if="e1t1.s_appreciation">Appreciation</h4> -->
                    <h5  class="font-weight-light mt-2 mb-4 text-pre-wrap appreciation">{{e1t1.s_appreciation}}</h5>
                    <v-btn class="mt-4" small outlined color="black" @click="learntDialog=true" v-if="e1t1.s_learnings">
                        <h4 class="font-weight-medium" style="text-transform: capitalize;">Learning</h4>
                        </v-btn>
                    <span v-if="e1t1.teacher!= null && loggedInUser">
                        <v-btn class="mt-4" small outlined color="black" @click="personalDialog=true" v-if="loggedInUser.username == e1t1.teacher || loggedInUser.username == e1t1.username">
                            <h4 class="font-weight-medium" style="text-transform: capitalize;">Say Hi</h4><v-icon x-small class="pl-1">mdi-lock-outline</v-icon></v-btn>
                    </span>
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
                <h5 >Learning</h5>
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
                        <h4 class ="font-weight-light">Chat room ({{e1t1.s_teacher_name}}, {{e1t1.username}}) </h4>
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
        </v-row>
        <div v-if="videoId" >
            <center class="py-6 hidden-xs-only">
                <youtube width="100%" height="408" :video-id= 'videoId'></youtube>
            </center>
            <center class="my-6 hidden-sm-and-up">
                <youtube width="100%" height="220" :video-id= 'videoId'></youtube>
            </center>
        </div>
        </v-container>
        <!-- <v-container class="pa-0">
        <v-row class="mx-0 mb-4" v-if="cookingLoaded">
            <v-layout  v-if="cookingsfiltered.length>0" wrap row justify-start class="hidden-md-and-up" style="max-width:381px; margin:auto; padding-left:12px; padding-right:12px">
            <div v-for="learn in cookingsfiltered" :key ="learn.index">
            <cooking-card :cook= "learn"></cooking-card>
            </div>   
            </v-layout>
            <v-layout  v-if="cookingsfiltered.length>0" wrap row justify-start class=" hidden-sm-and-down" style="max-width: 750px; margin:auto;  padding-left:12px; padding-right:12px" >
                <div v-for="learn in cookingsfiltered" :key ="learn.index">
            <cooking-card :cook= "learn"></cooking-card>
            </div>   
            </v-layout> 
        </v-row>
        <v-row class="mx-0 mb-4" v-else>
            <v-layout wrap row justify-start class="hidden-md-and-up" style="max-width:381px; margin:auto; padding-left:12px; padding-right:12px">
            <div v-for="n in this.looploader" :key ="n.index">
                <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" ></v-skeleton-loader>
            </div>
            </v-layout>
            <v-layout wrap row justify-start class=" hidden-sm-and-down" style="max-width: 750px; margin:auto;  padding-left:12px; padding-right:12px" >
                <div v-for="n in this.looploader" :key ="n.index">
                <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" ></v-skeleton-loader>
            </div> 
            </v-layout> 
        </v-row>
        
        </v-container> -->
        <v-container class="mx-auto" fluid style="max-width:750px">
        <!-- <v-card v-intersect="infiniteScrollingCooking"></v-card> -->
        <v-divider></v-divider>
        <!-- <v-row class="mt-8">
            <v-col cols="12" class="justify-center " id="scroll_comments">
                <h3 class ="font-weight-light">Comments <span v-if="share_comments_list.length">{{share_comments_list.length}}</span></h3>
            </v-col>
        </v-row> 
        <v-layout class="pt-6">
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
                <v-textarea v-if="isAuthenticated && userHasPortfolio"
                v-model= "comments.comment"
                outlined
                auto-grow
                rows="1"
                row-height="10"
                max-width= "100%"
                label="Share your thoughts">
                </v-textarea>
                <v-textarea v-else
                    @click="login_snackbar=true"
                    outlined
                    rows="1"
                    row-height="15"
                    max-width= "100%"
                    label="Share your thoughts">
                </v-textarea>
            </v-flex>
            <v-flex md2 sm3><center>
                <v-btn v-if="isAuthenticated && userHasPortfolio" small 
                @click="post_comment" :class="{'px-4': $vuetify.breakpoint.xsAndDown, 'px-8': $vuetify.breakpoint.smAndUp}"
                color="black" dark >Post
            </v-btn></center>
            </v-flex>
        </v-layout>
        <div v-if="share_comments_list.length" >
            <comments-card :comments = "share_comments_list"></comments-card>
        </div>
        <v-card v-intersect="infiniteScrollingComments"></v-card> -->
    </v-container>
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
// import CookingCard from '~/components/CookingCard.vue'
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
    created(){
        let url1 =this.e1t1.s_teacher_video //getting value of youtube video urls
        if(url1){
        let videoId = getIdFromURL(url1) //getting id from video url
        this.videoId = videoId //assigning the id to <youtube> video id
        } 
        this.$store.dispatch("check_share_love", this.e1t1.id)
        // this.get_cookings_filtered(this.e1t1.username,this.e1t1.id);
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
        // CookingCard 
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
            dynamic_height: 50,
            }
    },
    
	computed: {
        ...mapGetters([ 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', 'share_comments_list', 'love', 
        'personalMessages','personalMessagesNotifications', 
         'share_has_love', 'share_has_love_id']),
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
        // get_cookings_filtered(username,id){
        //     // console.log("filtering..",username,id);
        //     EventService.getWhatsCookingUsername(username).then(res =>
        //     {
        //         this.cookings = res.data
        //         if(this.cookings.length>0)
        //     {
        //     let taggedteacherpresent = this.cookings.filter(obj => obj.taggedteachers.length>0)
        //     let arr=[];
        //     for(let i=0 ; i<taggedteacherpresent.length; i++)
        //     {
        //         for(let j=0; j<taggedteacherpresent[i].taggedteachers.length;j++)
        //         arr.push(taggedteacherpresent[i].taggedteachers[j]);
        //     }
        //     let final = arr.filter(obj => obj.shareidobj!=null)
        //     let f2=[];
        //     let f3 =[];
        //     f2 = final.filter(obj => obj.shareidobj.id ==id);

        //     f2.forEach(element => f3.push(element.id));
        //     for(let i=0 ; i<taggedteacherpresent.length; i++)
        //     {
        //         for(let j=0; j<taggedteacherpresent[i].taggedteachers.length;j++)
        //         {
        //         if(f3.find(element => element == taggedteacherpresent[i].taggedteachers[j].id))
        //         {
        //             this.cookingsfiltered.push(taggedteacherpresent[i])
        //         }
        //         }
        //     }
        //     this.cookingLoaded = true
        //     }
        //     })
        // },
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
        // filtercooking(){
        //     this.$store.dispatch("check_cookings_filtered",this.e1t1.id)
        // },
        // infiniteScrollingCooking(entries, observer, isIntersecting) {
        //     this.$store.dispatch("update_user_cookings");
        // },
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
</style>
