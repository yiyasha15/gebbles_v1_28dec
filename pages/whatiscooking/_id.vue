<template>
    <div :class="{'mt-8': $vuetify.breakpoint.smAndDown, 'mt-14': $vuetify.breakpoint.mdAndUp}">
        <v-container style="max-width:750px; margin:auto;" >
          <div v-if="cook" >
          <video id="videoId" width="100%" height="410px" controls controlsList="nodownload" v-if="cook.video" class="hidden-xs-only">
              <source :src="cook.video" type="video/mp4">
              Your browser does not support the video tag.
          </video>
          <video id="videoId" width="100%" height="220px" controls controlsList="nodownload" v-if="cook.video" class="hidden-sm-and-up">
              <source :src="cook.video" type="video/mp4">
              Your browser does not support the video tag.
          </video>
          <div align="left" justify="left">
          <div class="my-4">
            <h5 class="caption"> {{learndate}}</h5>
          </div>
          <div class="my-4" >
          <nuxt-link :to="'/'+ cook.username" v-if="cook.username" class="text-decoration-none">
            {{cook.username}}{{": "}}
          </nuxt-link>{{cook.lesson}}
          </div>
          <div class="my-2">
          <nuxt-link v-for="obj in cook.taggedteachers" :key="obj.id" :to="'/e1t1/'+ obj.shareidobj.id" class="text-decoration-none">
            <v-chip color="black grey" dark outlined class="mr-1" style="cursor:pointer;">
              <v-avatar left v-if="obj.shareidobj.teacher">
                <v-img :src="obj.shareidobj.teacher.artist_metadata.thumb"></v-img>
              </v-avatar>
              <v-avatar left v-else>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              {{obj.shareidobj.s_teacher_name}}
            </v-chip>
          </nuxt-link>
          </div>
            <div class="my-4">
              <v-btn icon @click="react_like()" class="mr-1">
                <v-icon color="black" v-if="!learn_has_like">mdi-heart-outline</v-icon>
                <v-icon color="red" v-else>mdi-heart</v-icon>
                <div v-if="like.length">{{like.length}}</div>
              </v-btn>
              <v-btn icon @click="react_dope()" class="mx-1">
                <v-icon color="black" v-if="!learn_has_dope">mdi-fire</v-icon>
                <v-icon color="orange" v-else>mdi-fire</v-icon>
                <div v-if="dope.length">{{dope.length}}</div>
              </v-btn>
              <v-btn icon @click="react_info()" class="mx-1">
                <v-icon color="black" v-if="!learn_has_info">mdi-head-flash-outline</v-icon>
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
                    @click="post_comment(cook.id)"
                        color="black" dark >Post
                </v-btn>
            </v-row>
            <v-row v-if="learning_comments_list.length" class="mt-0">
              <learning-comments-card :comments = "learning_comments_list"></learning-comments-card>
            </v-row>
          </div>
          </div>
        </v-container>
        <v-container style="max-width:750px; margin:auto;" v-if="false">
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
        </v-container>
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
  export default {
    components:{
        LearningCommentsCard
    },
    computed: {
      ...mapGetters(['loggedInUser', 'userHasPortfolio', 'usersPortfolio','isAuthenticated',
      'like', 'dope', 'info', 'learn_has_like','learn_has_like_id', 'learning_comments_list',
      'learn_has_dope','learn_has_dope_id','learn_has_info','learn_has_info_id' ]),
    },
    data() {
      return {
        deleteLearnDialog: false,
        timeLearn:'',
        valid_snackbar: false,
        login_snackbar: false,
        thankyou_snackbar: false,
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
        }
    },
    async asyncData({error, params}) {
      try {
         let cook = await EventService.getWhatsCookingId(params.id)
         return {
             cook : cook.data
             }
        } catch (err) {
            console.log(err);
            error({statusCode:503,  message: err.message})
        }
    },
    created(){
      this.dateFormat(this.cook.timestamp)
      // this.$store.dispatch("check_learn_obj",this.cook.id);
      this.$store.dispatch("check_learn_reactions",this.cook.id);
      this.$store.dispatch("check_learn_comments",this.cook.id);
    },
    methods:{
      dateFormat(recdate){
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = recdate;
        let datetype= date.slice(8, 10);
        let month = date.slice(5, 7);
        let yeartpye = date.slice(0, 4)
        const regex = new RegExp("^0+(?!$)",'g');
        month = month.replaceAll(regex, "");
        let monthtype = months[month-1]
        this.learndate = datetype+" "+monthtype +" "+yeartpye;
      },
      async react_like(){
          if(this.isAuthenticated){
          // this.reactForm.username = this.$store.state.auth.user.user.username;
          // this.reactForm.learningidobj = this.cook.id
          // this.reactForm.like_type = 'LO'
          // if(this.learn_has_like){
          //   const config = {
          //   headers: {"content-type": "multipart/form-data",
          //       "Authorization": "Bearer " + this.$store.state.auth.user.access_token
          //   }
          //   };
          //     try {
          //       await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.learn_has_like_id , config)
          //       this.$store.dispatch("check_learn_reactions", this.cook.id)
          //       //store make learn love false
          //   } catch (e) {
          //       console.log(e);
          //   }
          // }
          // else{
          //   const config = {
          //       headers: {"content-type": "multipart/form-data",
          //           "Authorization": "Bearer " + this.$store.state.auth.user.access_token
          //       }
          //   };
          // let formData = new FormData();
          // for (let data in this.reactForm) {
          //     formData.append(data, this.reactForm[data]);
          // }
          // try {
          //     await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
          //     this.$store.dispatch("check_learn_reactions", this.cook.id)
          // } catch (e) {
          //     console.log(e);
          // }
          // }
        }
        else{
            this.login_snackbar = true
        }
      },
      async react_dope(){
        if(this.isAuthenticated){
          // this.reactForm.username = this.$store.state.auth.user.user.username;
          // this.reactForm.learningidobj = this.cook.id
          // this.reactForm.like_type = 'FI'
          // if(this.learn_has_dope){
          //   const config = {
          //   headers: {"content-type": "multipart/form-data",
          //       "Authorization": "Bearer " + this.$store.state.auth.user.access_token
          //   }
          //   };
          //     try {
          //       await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.learn_has_dope_id , config)
          //       this.$store.dispatch("check_learn_reactions", this.cook.id)
          //       //store make learn love false
          //   } catch (e) {
          //       console.log(e);
          //   }
          // }
          // else{
          //   const config = {
          //       headers: {"content-type": "multipart/form-data",
          //           "Authorization": "Bearer " + this.$store.state.auth.user.access_token
          //       }
          //   };
          // let formData = new FormData();
          // for (let data in this.reactForm) {
          //     formData.append(data, this.reactForm[data]);
          // }
          // try {
          //     await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
          //     this.$store.dispatch("check_learn_reactions", this.cook.id)
          // } catch (e) {
          //     console.log(e);
          // }
          // }
        }
        else{
            this.login_snackbar = true
        }
      },
      async react_info(){
        if(this.isAuthenticated){
          // this.reactForm.username = this.$store.state.auth.user.user.username;
          // this.reactForm.learningidobj = this.cook.id
          // this.reactForm.like_type = 'DE'
          // if(this.learn_has_info){
          //   const config = {
          //   headers: {"content-type": "multipart/form-data",
          //       "Authorization": "Bearer " + this.$store.state.auth.user.access_token
          //   }
          //   };
          //     try {
          //       await this.$axios.$delete("/v1/e1t1/learnings/likes/"+this.learn_has_info_id , config)
          //       this.$store.dispatch("check_learn_reactions", this.cook.id)
          //       //store make learn love false
          //   } catch (e) {
          //       console.log(e);
          //   }
          // }
          // else{
          //   const config = {
          //       headers: {"content-type": "multipart/form-data",
          //           "Authorization": "Bearer " + this.$store.state.auth.user.access_token
          //       }
          //   };
          // let formData = new FormData();
          // for (let data in this.reactForm) {
          //     formData.append(data, this.reactForm[data]);
          // }
          // try {
          //     await this.$axios.$post("/v1/e1t1/learnings/likes/", formData, config)
          //     this.$store.dispatch("check_learn_reactions", this.cook.id)
          // } catch (e) {
          //     console.log(e);
          // }
          // }
        }
        else{
            this.login_snackbar = true
        }
      },
      async post_comment(id) {
          if(this.isAuthenticated){
          // if(this.comments.comment != "" )
          // {
          // this.comments.username = this.$store.state.auth.user.user.username;
          // this.comments.learningidobj = id
          // const config = {
          //     headers: {"content-type": "multipart/form-data",
          //         "Authorization": "Bearer " + this.$store.state.auth.user.access_token
          //     }
          // };
          // let formData = new FormData();
          // for (let data in this.comments) {
          //     formData.append(data, this.comments[data]);
          // }
          // try {
          //     let response = await this.$axios.$post("/v1/e1t1/learnings/comments/", formData, config)
          //     this.$store.dispatch("check_learn_comments",id)
          //     this.comments.comment = ''
          //     this.thankyou_snackbar = true
          // } catch (e) {
          //     console.log(e);
          // }
          // }
          // else{
          //     this.valid_snackbar = true
          // }
          }
          else{
              this.login_snackbar = true
          }
      },
    }
  }
</script>