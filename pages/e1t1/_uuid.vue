<template>
  <v-app>
       <v-container class=" mx-auto" fluid style="max-width:750px" >
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
       </v-container>
        <v-container class="mx-auto" fluid style="max-width:750px" >
        <div id="mycanvas">
        <v-row class="pb-4">
            <v-col cols="12" md="6" align="center" justify="center">
                <v-img :src = "e1t1.s_photo" class="centerImage" maxHeight="520px"></v-img>
            </v-col>
            <v-col cols="12" md="6" >
                <v-row>
                    <v-col >
                    <h5 class="caption mt-1" > {{e1t1.s_date}}</h5>
                    </v-col>
                    <div v-if="loggedInUser">
                    <v-col v-if="loggedInUser.user.username == e1t1.username" >
                        <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small icon v-bind="attrs"
                        v-on="on">
                        <v-icon small color="black" @click="capture">mdi-camera-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Capture</span>
                    </v-tooltip>
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
                        <p>Are you sure you want to delete this experience?</p>
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
                </v-row>
                <div>
                <v-layout row wrap justify-space-between class="mt-3 mx-0">
                    <v-flex xs10 md4 class="overflow-hidden">
                        <nuxt-link :to="'/'+ e1t1.s_teacher_name" v-if="e1t1.teacher" class="text-decoration-none">
                            <h3 >{{e1t1.teacher}}</h3> 
                        </nuxt-link>
                        <div v-else>
                            <h3>{{e1t1.s_teacher_name}}</h3> 
                        </div>
                    </v-flex>
                    <v-flex xs2 md2>
                        <div :class="{'pt-1 pl-2': $vuetify.breakpoint.smAndDown, 'pt-2 pl-2': $vuetify.breakpoint.mdAndUp}" >
                            <country-flag :country= 'e1t1.s_teacher_country' />
                        </div>
                    </v-flex>
                    <v-flex xs10 md4 class="overflow-hidden">
                        <nuxt-link :to="'/'+ e1t1.username" class="text-decoration-none">
                                <h3 >{{e1t1.username}}</h3> 
                            </nuxt-link>
                    </v-flex>
                    <v-flex xs2 md2>
                            <div :class="{'pt-1 pl-2': $vuetify.breakpoint.smAndDown, 'pt-2 pl-2': $vuetify.breakpoint.mdAndUp}" >
                            <country-flag :country= 'e1t1.s_student_country' />
                            </div>
                    </v-flex>
                </v-layout>
                <v-layout row wrap justify-start class="mx-0 mb-2">
                    <v-flex md2 xs2>
                        <v-btn icon @click="react_love">
                            <v-icon color="black" v-if="!share_has_love">mdi-heart-outline</v-icon>
                            <v-icon color="yellow" v-else>mdi-heart</v-icon>
                            <div v-if="love">{{love}}</div>
                        </v-btn>
                    </v-flex>
                    <v-flex md2 xs2>
                        <v-btn icon class="mx-1" @click="$vuetify.goTo('#scroll_comments')">
                            <v-icon color="black">mdi-comment-outline</v-icon><span v-if="share_comments_list.length" >{{share_comments_list.length}}</span>
                            </v-btn>
                    </v-flex>
                </v-layout>
                </div>
                <v-row>
                    <v-col >
                    <h4 v-if="e1t1.s_appreciation">Appreciation</h4>
                    <!-- <read-more more-str="read more" :text="msg" link="#" less-str="read less" :max-chars="50"></read-more> -->
                    <div style="
                        height:200px;
                        overflow-x: hidden;
                        overflow-y: auto;
                        text-align:justify;">
                    <h4 class="font-weight-light mt-2 mb-4">{{e1t1.s_appreciation}}</h4>
                    </div>
                    <v-btn class="mt-4" small outlined color="black" @click="learntDialog=true" v-if="e1t1.s_learnings">Learning</v-btn>
                    <span v-if="e1t1.teacher!= null">
                        <v-btn class="mt-4" small outlined color="black" @click="personalDialog=true" v-if="loggedInUser.user.username == e1t1.teacher || loggedInUser.user.username == e1t1.username">Say hi</v-btn>
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
                <h4 >Learning</h4>
                <h4 class="font-weight-light my-2">{{e1t1.s_learnings}}</h4>
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
                <v-col cols="12" >
                <v-row class="mt-4">
                    <v-col cols="12" class="justify-center ">
                        <h3 class ="font-weight-light">Chat room</h3>
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
                        @click="post_personal_text" :class="{'px-4': $vuetify.breakpoint.xsAndDown, 'px-8': $vuetify.breakpoint.smAndUp}"
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
        </div>
        <div v-if="videoId" >
                <h3  :class="{'font-weight-light pt-4': $vuetify.breakpoint.smAndDown, 'font-weight-light pt-12': $vuetify.breakpoint.mdAndUp}">
                    The video which inspired me
                </h3>
                <center class="py-6 hidden-xs-only">
                    <youtube width="100%" height="408" :video-id= 'videoId'></youtube>
                </center>
                <center class="my-6 hidden-sm-and-up">
                    <youtube width="100%" height="220" :video-id= 'videoId'></youtube>
                </center>
                <!-- <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/CN7h7-jlvSB/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/CN7h7-jlvSB/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">
                <div style=" display: flex; flex-direction: row; align-items: center;">
                    <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div>
                    <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> 
                        <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> 
                        <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div>
                        </div><div style="padding: 19% 0;"></div>
                        <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
                            <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/CN7h7-jlvSB/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by yiyasha (@yiyasha15)</a>
                </p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script> -->
        </div>
        <!-- <v-divider class="mt-8"></v-divider>
        <v-row class="mt-2 mb-4">
            <v-col cols="12" class="justify-center">
                <h3 class ="font-weight-light xs12 d-inline ">Dedicated to {{e1t1.s_teacher_name}}</h3>
            </v-col>
        </v-row> -->
        </v-container>
        <v-container class="pa-0">
        <v-row class="mx-0 mb-4" v-if="cookingsfiltered.length>0 ">
            <v-layout wrap row justify-start class="hidden-md-and-up" style="max-width:357px; margin:auto; padding-left:12px; padding-right:12px">
            <div v-for="learn in cookingsfiltered" :key ="learn.index">
            <cooking-card :cook= "learn"></cooking-card>
            </div>   
            </v-layout>
            <v-layout wrap row justify-start class=" hidden-sm-and-down" style="max-width: 750px; margin:auto;  padding-left:12px; padding-right:12px" >
                <div v-for="learn in cookingsfiltered" :key ="learn.index">
            <cooking-card :cook= "learn"></cooking-card>
            </div>   
            </v-layout> 
        </v-row>
        </v-container>
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
    <v-snackbar v-model="sizeExceed">
        Size exceeded.
    </v-snackbar>
    <v-snackbar v-model="valid_snackbar1">
        Select a video.
    </v-snackbar>
    <v-snackbar v-model="valid_snackbar2">
        Write something to post.
    </v-snackbar>
    <v-snackbar v-model="login_snackbar">
        Please sign in first.
         <!-- <nuxt-link :to="'/login'" class="text-decoration-none" ><span style="color:white">Sign in.</span></nuxt-link> -->
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
import ReadMore from 'vue-read-more';
import PersonalMessagesCard from '~/components/PersonalMessagesCard.vue'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import CookingCard from '~/components/CookingCard.vue'
import html2canvas from 'html2canvas';
import logoutVue from '../logout.vue'
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
        let url1 =this.e1t1.s_teacher_video //getting value of youtube video urls
        if(url1){
        let videoId = getIdFromURL(url1) //getting id from video url
        this.videoId = videoId //assigning the id to <youtube> video id
        }
    },
    components:{
        CountryFlag,
        // CommentsCard,
        LearningCard,
        ReadMore,
        PersonalMessagesCard,
        Youtube,
        CookingCard 
    },
    data(){
          return {
            deleteLoading:false,
            love_id:'',
            videoId:'',
            addDedicated:false,
            dialog: false,
            sizeExceed:false,
            learntDialog:false,
            personalDialog: false,
            valid_snackbar1: false,
            valid_snackbar2: false,
            login_snackbar: false,
            thankyou_snackbar: false,
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
            progressbar: false,
            putVideo:"",
            videoData:'',
            isShowing:false,
            isYourRoom: false,
            items: [],
            dynamic_height: 50,
            }
    },
    mounted() {
        // this.$store.dispatch("check_artists");
        this.$store.dispatch("check_share_love", this.e1t1.id)
        this.$store.dispatch("check_share_comments", this.e1t1.id)
        this.$store.dispatch("check_cookings", this.e1t1.username)
        this.$store.dispatch("check_cookings_filtered",this.e1t1.id)
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = this.e1t1.s_date;
        let datetype= date.slice(8, 10);
        let month = date.slice(5, 7);
        let yeartype = date.slice(0, 4)
        const regex = new RegExp("^0+(?!$)",'g');
        month = month.replaceAll(regex, "");
        let monthtype = months[month-1]
        this.e1t1.s_date = datetype+" "+monthtype +" "+yeartype;
        if(this.isAuthenticated)
        {
        if(this.loggedInUser.user.username == this.e1t1.teacher || this.loggedInUser.user.username ==this.e1t1.username){
            this.isYourRoom = true
            this.$store.dispatch("check_personal_room", this.e1t1.id);
            this.items = this.personalMessages;
        }
        }
	},
	computed: {
        ...mapGetters([ 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', 'share_comments_list', 'love', 'cookingsfiltered',
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
        capture(){
            console.log("proxy url",this.e1t1);
            html2canvas(document.querySelector("#mycanvas"), { useCORS: false,}).then(canvas => {
                var a = document.createElement('a');
                // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                console.log(a);
                a.download = 'somefilename.jpg';
                a.click();
            });
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
        onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInputVideo.click()
        },
        onFileChange(e) {
            let files = e.target.files;
            if (files[0]) {
            console.log(files[0]);
            let i = Math.floor(files[0].size * 0.000001)
            if(i>=120){ 
                this.sizeExceed = true;
            }
            else{
                this.putVideo = files[0]
                let blobURL = URL.createObjectURL(files[0]);
                document.getElementById("videoPreview").src = blobURL;
            };
            }
        },
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
        async react_love(){
            if(this.isAuthenticated){
                this.loveForm.username = this.$store.state.auth.user.user.username;
                this.loveForm.shareidobj = this.e1t1.id
                if(this.share_has_love){
                    this.$store.dispatch("change_love");
                    const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token
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
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token
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
        async post_comment() {
            if(this.isAuthenticated){
            if(this.comments.comment != "" )
            {
            this.comments.username = this.$store.state.auth.user.user.username;
            this.comments.shareidobj = this.e1t1.id
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
                let response = await this.$axios.$post("/v1/e1t1/sharing/comments/", formData, config)
                this.$store.dispatch("check_share_comments", this.e1t1.id)
                this.comments.comment = ''
                this.thankyou_snackbar = true
            } catch (e) {
                console.log(e);
            }
            }
            else{
                this.valid_snackbar2 = true
            }}
            else{
                this.login_snackbar = true
            }
        },
        async post_personal_text(){
            if(this.personal.messagetext)
            {this.personal.username = this.$store.state.auth.user.user.username
            this.personal.shareid = this.e1t1.id
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
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

</style>
