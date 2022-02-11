<template>
  <v-app>
       <v-container class=" mx-auto" fluid style="max-width:750px" >
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
       </v-container>
    <v-container class="mx-auto" fluid style="max-width:750px" >
        <v-card :class="{'pa-6': $vuetify.breakpoint.smAndDown, 'pa-8': $vuetify.breakpoint.mdAndUp}">
          <v-form v-on:submit.prevent="submit">
            <v-row>
                <v-col cols="12">
                    <!-- <h3 class ="font-weight-light xs12 pb-4">Dedicating a dance for {{e1t1.s_teacher_name}}</h3> -->
                    <h3 class ="font-weight-light xs12 pb-4">Upload your video</h3>
                    <input style="display:none" ref="fileInputVideo" type="file" accept="video/*" @change="onFileChange"> 
                    <video width="100%" height="240" controls id="videoPreview">
                    Your browser does not support the video tag.
                    </video><br>
                    <v-btn outlined  class="my-2 " @click="onPick" >
                        <!-- <h5> -->
                           Select a video
                        <!-- </h5> -->
                        <v-icon right dark> mdi-cloud-upload </v-icon>
                    </v-btn>
                    <v-text-field
                        v-model = "learningForm.lesson"
                        label= "Caption">
                    </v-text-field>
                        <v-btn class="text-decoration-none"  color="indigo" dark outlined
                        @click="next">Next</v-btn>
                </v-col>
            </v-row>
        </v-form>
      </v-card>
      <v-dialog 
      v-model="selectTeacher"
      max-width="500">
      <v-card :class="{'pa-3': $vuetify.breakpoint.smAndDown, 'pa-6': $vuetify.breakpoint.mdAndUp}">
        <div align="end">
        <v-btn icon color="error" @click="selectTeacher=false" >
            <v-icon >mdi-close</v-icon>
        </v-btn>
        </div>
        <h3 class ="font-weight-light xs12">Mention your teachers if you have used any of their teaching in this video.</h3>
        <small>This will be added in the learnings and they will be notified.</small>
        <v-autocomplete
            class="pt-4"
            v-model="selectedTeachers"
            :disabled="isUpdating"
            :items="usersTeachers"
            filled
            chips
            color="blue-grey lighten-2"
            label="Teacher appreciation"
            item-text="s_teacher_name"
            item-value="s_teacher_name"
            multiple
            >
            <template v-slot:selection="data">
                <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
                >
                <v-avatar v-if="data.item.sp_thumb" left>
                    <v-img :src="data.item.sp_thumb"></v-img>
                </v-avatar>
                <v-avatar v-else >
                <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
                <span class="pl-1">{{ data.item.s_teacher_name }}</span>
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template>
                <v-list-item-avatar v-if="data.item.sp_thumb">
                    <img :src="data.item.sp_thumb">
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.s_teacher_name"></v-list-item-title>
                    <!-- <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle> -->
                </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>    
        <v-btn class="text-decoration-none"  color="indigo" dark outlined
        @click="submitLearning" :loading="progressbar">Submit</v-btn>     
      </v-card>
    </v-dialog>
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
    <v-snackbar v-model="thankyou_snackbar">
         Thank you for sharing.
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
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
    this.usersTeacher= this.usersTeachers
},
data(){
    return {
        sizeExceed:false,
        selectTeacher:false,
        valid_snackbar1: false,
        valid_snackbar2: false,
        thankyou_snackbar: false,
        learningForm: {
            username: "",
            lesson: "",
            video: "",
            shareidobj: "",
        },
        progressbar: false,
        putVideo:"",
        videoData:'',
        selectedTeachers: [],
        isUpdating: false,
        }
},
computed: {
    ...mapGetters(['isAuthenticated','loggedInUser', 'usersTeachers']),
},
methods:{
    next(){
        if(this.putVideo!=''){
            if(this.learningForm.lesson){
                this.selectTeacher = true
            }else{
                this.valid_snackbar2 = true
            }}else{
            this.valid_snackbar1 = true
        }
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
    goback(){
        window.history.back();
    },
    
    async submitLearning(){
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
                if(this.selectedTeachers.length){
                    console.log("teacher exists");
                }
                // this.learningForm.shareidobj = this.e1t1.id
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
                    // this.$store.dispatch("check_learnings", this.e1t1.id)
                    this.addLearning = false;
                    // this.$router.push("/e1t1/"+this.e1t1.id);
                })
                }); 
            }
            
        } 
        catch (error) {
            console.log("unsuccess",error.response);
            this.progressbar =false
        }
    },
    refreshLearning(){
        this.learningForm.username = this.$store.state.auth.user.user.username;
        this.learningForm.lesson= "";
        this.learningForm.video= "";
        this.videoData ="";
        this.learningForm.shareidobj= "";
    },
    remove (item) {
        const index = this.selectedTeachers.indexOf(item.s_teacher_name)
        if (index >= 0) this.selectedTeachers.splice(index, 1)
    },
},
watch: {
    isUpdating (val) {
        if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
    }
},
},
}
</script>
<style  scoped>

</style>
