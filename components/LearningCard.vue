<template>
<div>
    <v-card
      style="margin:2px;"
      data-view
      @click="openDialog(learning.id,learning.timestamp)"
      outlined
      width="115" 
      max-height="110"
    >
    <v-img
        :src="require('@/assets/play_button1.png')"
        height="73" width="115"
      />
      <v-card-actions height="32px">
        <div width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:78px; font-size:0.6rem!important;">{{ learning.lesson }}</p>
        </div>
        <v-spacer></v-spacer>
        <v-menu v-if=" isAuthenticated && learning.username == loggedInUser.username " transition="slide-y-transition" open-on-hover offset-y bottom left>
        <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" 
            v-on="on">
            <v-icon small>mdi-dots-vertical</v-icon>
            </div>
        </template>
        <v-list>
            <v-list-item
            class="text-decoration-none pl-6 pr-12"
            color="error"
            @click="deleteLearning(learning.id,learning.shareidobj)"
            >
            <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
    <v-dialog
        :retain-focus="false"
        v-model="videoDialog"
        width="700px"
        persistent>
        <v-container class="rounded-lg white pa-2" v-show="!loadingLearning">
          <v-col cols="12" align="end" justify="end">
            <v-btn icon color="error" @click="closeDialog(cook_obj.video)">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12"  v-if="cook_obj" >
          <video id="videoId" width="100%" height="300px" controls controlsList="nodownload" v-if="cook_obj.video" class="hidden-xs-only">
              <source :src="cook_obj.video" type="video/mp4">
              Your browser does not support the video tag.
          </video>
          <video id="videoId" width="100%" height="150px" controls controlsList="nodownload" v-if="cook_obj.video" class="hidden-sm-and-up">
              <source :src="cook_obj.video" type="video/mp4">
              Your browser does not support the video tag.
          </video>
          <div align="left" justify="left">
          <div class="my-4">
            <h5 class="caption"> {{learndate}}</h5>
          </div>
          <div class="my-4" >
          <h4>{{cook_obj.lesson}}</h4>
          </div>
          <div class="my-4">
            <nuxt-link to="/batalla" class="text-decoration-none">
          <v-chip color="black" dark outlined class="mr-1" style="cursor:pointer;">
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            batalla
          </v-chip></nuxt-link>
          <v-chip color="black" dark>
            <v-avatar left>
              <!-- <img
                    :src = "usersPortfolio.thumb" 
                    alt="img"
                > -->
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            martha
          </v-chip>
          </div>
            <div class="my-4">
              <v-btn icon @click="react_like()" class="mr-1">
                <v-icon color="black" v-if="!cook_has_like">mdi-heart-outline</v-icon>
                <v-icon color="red" v-else>mdi-heart</v-icon>
                <div v-if="like.length">{{like.length}}</div>
              </v-btn>
              <v-btn icon @click="react_dope()" class="mx-1">
                <v-icon color="black" v-if="!cook_has_dope">mdi-fire</v-icon>
                <v-icon color="orange" v-else>mdi-fire</v-icon>
                <div v-if="dope.length">{{dope.length}}</div>
              </v-btn>
              <v-btn icon @click="react_info()" class="mx-1">
                <v-icon color="black" v-if="!cook_has_info">mdi-head-flash-outline</v-icon>
                <v-icon color="green" v-else>mdi-head-flash-outline</v-icon>
                <div v-if="info.length">{{info.length}}</div>
              </v-btn>
          </div>
          </div>
          <div>
            <v-row class="my-4 pl-2">
                <h3 class="font-weight-light">
                  Comments <span v-if="learning_comments_list.length" >{{learning_comments_list.length}}</span>
                </h3>
            </v-row>
            <v-row no-gutters style="flex-wrap: nowrap;">
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
                    @click="post_comment(cook_obj.id)"
                        color="black" dark >Post
                </v-btn>
            </v-row>
            <v-row v-if="learning_comments_list.length" class="mt-0">
              <learning-comments-card :comments = "learning_comments_list"></learning-comments-card>
            </v-row>
          </div>
          </v-col>
        </v-container>
        <v-container class="rounded-lg white pa-2" v-if="loadingLearning" >
          <v-col cols="12" align="end" justify="end">
            <v-btn icon color="error" @click="closeDialog(null)">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="12">
          <v-skeleton-loader width="100%" height="300px"  :loading="loading" type="card" ></v-skeleton-loader>
          <div align="left" justify="left">
            <div class="my-2">
              <v-btn icon class="mr-1">
                <v-icon color="black" >mdi-heart</v-icon>
                <div v-if="like.length">{{like.length}}</div>
              </v-btn>
              <v-btn icon class="mx-1">
                <v-icon color="black" >mdi-fire</v-icon>
                <div v-if="dope.length">{{dope.length}}</div>
              </v-btn>
              <v-btn icon  class="mx-1">
                <v-icon color="black" >mdi-head-flash-outline</v-icon>
                <div v-if="info.length">{{info.length}}</div>
              </v-btn>
          </div>
          </div>
          <div>
            <v-row class="my-2 pl-2">
                <h3 class="font-weight-light">
                  Comments 
                </h3>
            </v-row>
            <v-row class="px-4">
              <v-skeleton-loader width="100%" :loading="loading" type="article" ></v-skeleton-loader>
            </v-row>
          </div>
          </v-col>
        </v-container>
    </v-dialog> 
    <v-dialog
      v-model="updateLearning"
      width="800">
      <v-card class="pa-8">
          <v-form v-on:submit.prevent="submit">
            <v-row>
                <v-col cols="12" align="end" justify="end" class="pa-0">
                <v-btn icon color="error" @click="updateLearning = false" >
                    <v-icon >mdi-close</v-icon>
                </v-btn>
          </v-col>
                <v-col cols="12">
                    <v-btn outlined color="blue-grey" class="mb-6 ma-2 white--text" @click="onPick" >
                        Upload
                        <v-icon right dark> mdi-cloud-upload </v-icon>
                    </v-btn><br>
                    <input style="display:none" ref="fileInputVideo" type="file" accept="video/*" @change="onFileChange"> 
                    <video width="320" height="240" controls id="videoPreview">
                    Your browser does not support the video tag.
                    </video>
                    <!-- <video id="videoPreview" width="300" height="300" controls></video> -->
                    <v-text-field
                        v-if="cook_obj "
                        v-model = "cook_obj.lesson"
                        label= "Describe the lessons you learnt.">
                    </v-text-field>
                        <v-btn class="text-decoration-none" outlined  color="black" dark
                        @click="updateLearningBtn">Update</v-btn>
                </v-col>
            </v-row>
        </v-form>
      </v-card>
    </v-dialog>
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
import LearningCommentsCard from '~/components/LearningCommentsCard.vue'
import { mapGetters } from 'vuex'
  export default {
    components:{
        LearningCommentsCard
    },
    props: {
      learning: Object,
    },
    name: 'LearningCard',
    data() {
      return {
        deleteLearnDialog: false,
        updateLearning: false,
        timeLearn:'',
        valid_snackbar: false,
        login_snackbar: false,
        thankyou_snackbar: false,
        videoDialog: false,
        loading:true,
        learndate:'',
        comments : {
            username : "",
            comment: "",
            learningidobj: ""
        },
        reactForm:{
            username: "",
            learningidobj: "",
            like_type:"",
        },
        learningForm: {
                username: "",
                lesson: "",
                video: [],
                shareidobj: "",
            },
        }
    },
    computed: {
      ...mapGetters(['loggedInUser', 'userHasPortfolio', 'usersPortfolio', 'artists' ,'isAuthenticated',
      'like', 'dope', 'info', 'learning_comments_list', 'cook_has_like','cook_has_like_id', 
      'cook_has_dope','cook_has_dope_id','cook_has_info','cook_has_info_id','cook_obj' ,'loadingLearning']),
    },
    methods:{
      closeUpdateLearning(){
        // this.$store.dispatch("remove_cook_obj");
        this.updateLearning = false
      },
      async updateLearningBtn(){
          
      },
      editLearning(){
        // this.$store.dispatch("check_cook_obj",id);
        this.updateLearning = true
      },
      async openDialog(id, time){
        //check likes and comments for particular opened learning id
        this.$store.dispatch("check_cook_obj",id);
        // this.$store.dispatch("check_cook_reactions",id);
        this.$store.dispatch("check_cook_comments",id);
        this.videoDialog= true;
      },
      closeDialog(video) //pressing outside dialog pauses video
      {
        //remove likes and comments for particular opened learning id
        this.$store.dispatch("remove_cook_reactions");
        this.$store.dispatch("remove_cook_obj");
        this.videoDialog =false;
        this.learndate =""
        if(video){
          var vid = document.getElementById("videoId"); 
          vid.pause();
        }
      },
      async deleteLearning(id,shareid){
          const config = {
          headers: {"content-type": "multipart/form-data",
              "Authorization": this.$auth.strategy.token.get()}
          };
          try {
              let response = await this.$axios.$delete("/v1/e1t1/learnings/"+id , config);
              console.log(response);
              this.closeDialog(null)
              this.$store.dispatch("check_learnings", shareid)
              this.$store.dispatch("remove_learnings")
          } 
          catch (e) {
              console.log(e);
          }
          //remove particular gallery image by id
      },
      onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInputVideo.click()
      },
      onFileChange(e) {
          let files = e.target.files;
          if (files[0]) {
              console.log(files[0]);
              let i = Math.floor(files[0].size * 0.000001)
              if(i>=150){
                  this.sizeExceed = true;
              }
              else{
                  this.learningForm.video = files[0];
                  let blobURL = URL.createObjectURL(files[0]);
                  document.getElementById("videoPreview").src = blobURL;
              }
          }
      },
      async react_like(){
          if(this.isAuthenticated){
          this.reactForm.username = this.loggedInUser.username;
          this.reactForm.learningidobj = this.cook_obj.id
          this.reactForm.like_type = 'LO'
          if(this.cook_has_like){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()
            }
            };
              try {
                await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.cook_has_like_id , config)
                // this.$store.dispatch("check_cook_reactions", this.cook_obj.id)
            } catch (e) {
                console.log(e);
            }
          }
          else{
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
              await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
              // this.$store.dispatch("check_cook_reactions", this.cook_obj.id)
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
          this.reactForm.learningidobj = this.cook_obj.id
          this.reactForm.like_type = 'FI'
          if(this.cook_has_dope){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()
            }
            };
              try {
                await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.cook_has_dope_id , config)
                // this.$store.dispatch("check_cook_reactions", this.cook_obj.id)
                //store make learn love false
            } catch (e) {
                console.log(e);
            }
          }
          else{
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
              await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
              // this.$store.dispatch("check_cook_reactions", this.cook_obj.id)
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
          this.reactForm.learningidobj = this.cook_obj.id
          this.reactForm.like_type = 'DE'
          if(this.cook_has_info){
            const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()
            }
            };
              try {
                await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.cook_has_info_id , config)
                // this.$store.dispatch("check_cook_reactions", this.cook_obj.id)
                //store make learn love false
            } catch (e) {
                console.log(e);
            }
          }
          else{
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
              await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
              this.$store.dispatch("check_cook_reactions", this.cook_obj.id)
          } catch (e) {
              console.log(e);
          }
          }
        }
        else{
            this.login_snackbar = true
        }
      },
      async post_comment(id) {
          if(this.isAuthenticated){
          if(this.comments.comment != "" )
          {
          this.comments.username = this.loggedInUser.username;
          this.comments.learningidobj = id
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
              let response = await this.$axios.$post("/v1/e1t1/learnings/comments/", formData, config)
              this.$store.dispatch("check_cook_comments",id)
              this.comments.comment = ''
              this.thankyou_snackbar = true
          } catch (e) {
              console.log(e);
          }
          }
          else{
              this.valid_snackbar = true
          }}
          else{
              this.login_snackbar = true
          }
      },
    }
  }
</script>

