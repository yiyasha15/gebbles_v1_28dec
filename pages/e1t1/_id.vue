<template>
  <v-app>
       <v-container class=" mx-auto" fluid style="max-width:750px" >
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
       </v-container>
    <v-container class="mx-auto" fluid style="max-width:750px" >
        <v-row>
            <v-col cols="12" md="6" align="center" justify="center">
                <v-img :src = "e1t1.s_photo" class="centerImage" maxHeight="520px"></v-img>
            </v-col>
            <v-col cols="12" md="6" >
                <v-row>
                    <v-col >
                    <h5 class="caption"> {{e1t1.s_date}}</h5>
                    </v-col>
                    <div v-if="loggedInUser">
                    <v-col v-if="loggedInUser.user.username == e1t1.username" >
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small icon v-bind="attrs"
                        v-on="on">
                        <v-icon small color="indigo" @click="editE1t1">mdi-circle-edit-outline</v-icon>
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
                        <v-btn small class="px-4 text-decoration-none" color="error" dark
                            @click="deleted">Delete</v-btn>
                        <v-btn small color="indigo" class="px-4text-decoration-none" outlined  @click="dialog = false">
                            Cancel
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    </v-col>
                    </div>
                </v-row>
                <div>
                <v-layout row wrap justify-space-between class="my-3 mx-0">
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
                <v-layout row wrap justify-start class="mx-0 mb-3">
                    <v-flex md2 xs2>
                        <v-btn icon @click="react_love">
                            <v-icon color="black" v-if="!share_has_love">mdi-heart-outline</v-icon>
                            <v-icon color="red" v-else>mdi-heart</v-icon>
                            <div v-if="love.length">{{love.length}}</div>
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
                    <h4 class="font-weight-light mt-2 mb-4">{{e1t1.s_appreciation}}</h4>
                    <v-btn small color="error" @click="learntDialog=true" v-if="e1t1.s_learnings">Learning</v-btn>
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
                </v-col>
        </v-row>
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
    </div>
        <v-row class="mt-2">
            <v-col cols="12" class="justify-center">
                <h3 class ="font-weight-light xs12 d-inline ">Dedicated to {{e1t1.s_teacher_name}}</h3>
                <v-btn v-if="loggedInUser && loggedInUser.user.username == e1t1.username" small icon outlined color="indigo" class="mb-2 ml-2" @click="addLearning = true">
                <v-icon small>mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="mx-0" v-if="learnings.length>0 ">
            <v-layout row wrap :class="{' justify-center': $vuetify.breakpoint.smAndDown, 'ma-0': $vuetify.breakpoint.mdAndUp}">
            <div v-for="learning in learnings" :key ="learning.index">
            <v-flex > 
            <learning-card :learning = "learning"></learning-card>
            </v-flex>
            </div>   
            </v-layout>   
        </v-row>
        <v-row class="mt-8">
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
                <v-avatar size="36" color="indigo" v-else >
                <v-icon dark>
                    mdi-account-circle
                </v-icon>
                </v-avatar></center>
            </v-flex>
            <v-flex md9 sm8>
                <v-textarea v-if="isAuthenticated && userHasPortfolio"
                v-model= "comments.comment"
                outlined
                auto-grow
                rows="1"
                row-height="15"
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
                color="indigo" dark >Post
            </v-btn></center>
            </v-flex>
        </v-layout>
        <v-row  v-if="share_comments_list.length">
            <!-- <div v-for = "comments in comments" :key = "comments.index" > -->
                <comments-card :comments = "share_comments_list"></comments-card>
            <!-- </div> -->
        </v-row>
    </v-container>
    <v-dialog
      v-model="addLearning"
      max-width="500">
      <v-card :class="{'pa-6': $vuetify.breakpoint.smAndDown, 'pa-8': $vuetify.breakpoint.mdAndUp}">
          <v-form v-on:submit.prevent="submit">
            <v-row>
                <v-col cols="12" align="end" justify="end" class="pa-0">
                    <v-btn icon color="error" @click="addLearning = false" >
                        <v-icon >mdi-close</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12">
                    <h3 class ="font-weight-light xs12 pb-4">Dedicating a dance for {{e1t1.s_teacher_name}}</h3>
                    <input style="display:none" ref="fileInputVideo" type="file" accept="video/*" @change="onFileChange"> 
                    <video width="100%" height="240" controls id="videoPreview">
                    Your browser does not support the video tag.
                    </video><br>
                    <v-btn outlined  class="my-2 " @click="onPick" >
                        <!-- <h5> -->
                            Upload a video
                        <!-- </h5> -->
                        <v-icon right dark> mdi-cloud-upload </v-icon>
                    </v-btn>
                    <!-- <video id="videoPreview" width="300" height="300" controls></video> -->
                    <v-text-field
                        v-model = "learningForm.lesson"
                        label= "Caption">
                    </v-text-field>
                    <!-- <v-file-input
                        show-size
                        v-model = "learningForm.video" 
                        label="Upload video" 
                        accept="video/*"
                        prepend-icon="mdi-video"
                    ></v-file-input> -->
                        <v-btn class="text-decoration-none"  color="indigo" dark outlined
                        @click="submitLearning" :loading="progressbar">Submit</v-btn>
                </v-col>
            </v-row>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="sizeExceed">
        Size exceeded.
    </v-snackbar>
    <v-snackbar v-model="valid_snackbar1">
        Select a video.
    </v-snackbar>
    <v-snackbar v-model="valid_snackbar2">
        Write something to post.
    </v-snackbar>
    <v-snackbar v-model="login_snackbar" centered>
        Please login first.
    </v-snackbar>
    <v-snackbar v-model="thankyou_snackbar">
         Thank you for sharing.
    </v-snackbar>
  </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import CommentsCard from '~/components/CommentsCard.vue'
import LearningCard from '~/components/LearningCard.vue'
// import PersonalMessagesCard from '~/components/PersonalMessagesCard.vue'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
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
        let videoId = getIdFromURL(url1) //getting id from video url
        this.videoId = videoId //assigning the id to <youtube> video id
    },
    components:{
        CountryFlag,
        CommentsCard,
        LearningCard,
        // PersonalMessagesCard,
        Youtube
    },
    data(){
        return {
            love_id:'',
            videoId:'',
            addLearning:false,
            addDedicated:false,
            video1Dialog: false,
            video2Dialog: false,
            dialog: false,
            sizeExceed:false,
            learntDialog:false,
            // personalDialog: false,
            valid_snackbar1: false,
            valid_snackbar2: false,
            login_snackbar: false,
            thankyou_snackbar: false,
            comments : {
                username : "",
                comment: "",
                shareidobj: ""
            },
            loveForm:{
                username: "",
                shareidobj: ""
            },
            // personal:{
            //     shareid: null,
            //     username: null,
            //     messagetext: ""
            // },
            learningForm: {
                username: "",
                lesson: "",
                video: "",
                shareidobj: "",
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
        this.$store.dispatch("check_learnings", this.e1t1.id)
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = this.e1t1.s_date;
        let datetype= date.slice(8, 10);
        let month = date.slice(5, 7);
        let yeartpye = date.slice(0, 4)
        const regex = new RegExp("^0+(?!$)",'g');
        month = month.replaceAll(regex, "");
        let monthtype = months[month-1]
        this.e1t1.s_date = datetype+" "+monthtype +" "+yeartpye;
        // if(this.isAuthenticated)
        // {
        // if(this.loggedInUser.user.username == this.e1t1.teacher || this.loggedInUser.user.username ==this.e1t1.username){
        //     this.isYourRoom = true
        //     this.$store.dispatch("check_personal_room", this.e1t1.id);
        //     this.items = this.personalMessages;
        // }
        // }
	},
	computed: {
        ...mapGetters(['artists', 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', 'share_comments_list', 'love',
        // 'personalMessages','personalMessagesNotifications', 
        'learnings', 'share_has_love', 'share_has_love_id']),
	},
    async asyncData({error, params}) {
      try {
         let each1teach1 = await EventService.getEach1Teach1(params.id)
         return {
             e1t1 : each1teach1.data
             }
        } catch (err) {
            console.log(err);
            error({statusCode:503,  message: err.message})
        }
    },
    methods:{
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
        closeDialog1() //pressing outside dialog pauses video
        {
            var vid = document.getElementById("video1"); 
            vid.pause();
        },
        closeDialog2() //pressing outside dialog pauses video
        {
            var vid = document.getElementById("video2"); 
            vid.pause();
        },
        goback(){
            this.$store.dispatch("remove_share_obj")
            this.$store.dispatch("remove_learnings")
            this.$store.dispatch("remove_love")
            window.history.back();
        },
        async deleted(){
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            this.$store.dispatch("remove_share_obj")
            try {
                let response = await this.$axios.$delete("/v1/e1t1/sharing/"+this.e1t1.id, config)
                // console.log("e1t1 deleted.");
                this.$router.push("/"+ this.e1t1.username+"/each1teach1");
            } catch (e) {
                console.log(e);
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
        // async post_personal_text(){
        //     this.personal.username = this.$store.state.auth.user.user.username
        //     this.personal.shareid = this.e1t1.id

        //     const config = {
        //         headers: {"content-type": "multipart/form-data",
        //             "Authorization": "Bearer " + this.$store.state.auth.user.access_token
        //         }
        //     };
        //     let formData = new FormData();
        //     for (let data in this.personal) {
        //         formData.append(data, this.personal[data]);
        //     }
        //     try {
        //         await this.$axios.$post("/v1/e1t1/qna/", formData, config)
        //         this.personal.messagetext = ''
        //         this.personal.shareid = null
        //         this.personal.username = null
        //         this.thankyou_snackbar = true
        //         this.$store.dispatch("check_personal_room", this.e1t1.id);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // },
        async submitLearning(){
            if(this.putVideo!=''){
                if(this.learningForm.lesson){
                this.progressbar =true;
                try {
                    let res = await this.$axios.$get("https://bkgqvz7q1m.execute-api.us-east-2.amazonaws.com/v1");
                    if(res.statusCode == 200)
                    {
                        delete this.$axios.defaults.headers.common['Authorization']
                        //got res status 200
                        let filename = res.key
                        //put to storage
                        let url = res.body
                        url = url.slice(1, -1);
                        await this.$axios.$put(url, this.putVideo).then((value) => {
                        this.learningForm.username = this.$store.state.auth.user.user.username;
                        this.learningForm.shareidobj = this.e1t1.id
                        this.learningForm.video = "https://presignedurl1.s3.us-east-2.amazonaws.com/" + filename
                        const config = {
                            headers: {"content-type": "multipart/form-data",
                                "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
                        };
                        let formData = new FormData();
                        for (let data in this.learningForm) {
                            formData.append(data, this.learningForm[data]);
                        }
                        this.$axios.$post("/v1/e1t1/learnings/", formData, config).then((res) => {
                            this.progressbar = false
                            this.refreshLearning();
                            this.$store.dispatch("check_learnings", this.e1t1.id)
                            this.addLearning = false;
                            this.$router.push("/e1t1/"+this.e1t1.id);
                        })
                        }); 
                    }
                    
                } catch (error) {
                    console.log("unsuccess",error.response);
                    this.progressbar =false
                }}else{
                    this.valid_snackbar2 = true
                }
                }else{
                this.valid_snackbar1 = true
            }
        },
        refreshLearning(){
            this.learningForm.username = this.$store.state.auth.user.user.username;
            this.learningForm.lesson= "";
            this.learningForm.video= "";
            this.videoData ="";
            this.learningForm.shareidobj= "";
        },
    }
    
}
</script>
<style  scoped>

</style>
