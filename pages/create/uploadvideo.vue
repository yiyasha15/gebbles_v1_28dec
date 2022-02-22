<template>
    <v-app>
        <v-container class=" mx-auto" fluid style="max-width:550px" >
            <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <v-container class="mx-auto" fluid style="max-width:550px" >
            <v-card :class="{'pa-6': $vuetify.breakpoint.smAndDown, 'pa-8': $vuetify.breakpoint.mdAndUp}">
            <v-form v-on:submit.prevent="submit">
                <v-row>
                    <v-col cols="12">
                        <!-- <h3 class ="font-weight-light xs12 pb-4">Dedicating a dance for {{e1t1.s_teacher_name}}</h3> -->
                        <h3 class ="font-weight-light xs12 pb-4">Upload your video</h3>
                        <canvas style="display:none;" id="canvas"></canvas>
                        <input style="display:none" ref="fileInputVideo" type="file" accept="video/*" @change="onFileChange"> 
                        <video width="100%" height="240" controls id="videoPreview">
                        Your browser does not support the video tag.
                        </video>
                        <p class="caption">Scroll to desired frame to make thumbnail.</p>
                        <!-- <v-btn outlined  class="my-2 " @click="capture" >Make thumbnail
                        </v-btn> -->
                        <v-btn outlined  class="my-2 " @click="onPick" >
                            <!-- <h5> -->
                            Select a video
                            <!-- </h5> -->
                            <v-icon right dark> mdi-cloud-upload </v-icon>
                        </v-btn>
                        <v-text-field
                            v-model = "cookingForm.lesson"
                            label= "Caption">
                        </v-text-field>
                            <h3 class ="font-weight-light xs12">Mention the artist if you have used any of their teaching in this video.</h3>
                        <small>This will be added in the learnings and they will be notified.</small>
                        <!-- {{this.selectedTeachers}}
                        {{this.usersTeachers}} -->
                        <v-autocomplete
                            class="pt-4"
                            v-model="selectedTeachers"
                            :disabled="isUpdating"
                            :items="usersTeachers"
                            filled
                            chips
                            clearable solo
                            label="Artist appreciation"
                            item-text="s_teacher_name"
                            item-value="id"
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
                        <v-btn class="text-decoration-none"  color="black" dark outlined
                        @click="submitCooking" :loading="progressbar">Submit</v-btn>
                        <v-btn class="text-decoration-none"  color="error" dark outlined
                        @click="cancelCooking">Cancel</v-btn> 
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
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
middleware : 'check_auth',
created(){
    this.usersTeacher= this.usersTeachers
    console.log(this.cook_obj);
    if(this.cook_obj)
    {
        this.cookingForm.lesson = this.cook_obj.lesson
        // this.selectedTeachers = this.cook_obj.taggedteachers.shareidobj
        //if tagged teacher exists populate the selected teachers array with it's taggedteacher
        for(let i =0 ;i <this.cook_obj.taggedteachers.length ; i++)
        this.selectedTeachers.push(this.cook_obj.taggedteachers[i].shareidobj)
        console.log(this.cookingForm);
        // document.getElementById("videoPreview").src = this.cook_obj.video;
        // this.initialImage = this.artist_data.cover
    }
},
data(){
    return {
        sizeExceed:false,
        valid_snackbar1: false,
        valid_snackbar2: false,
        thankyou_snackbar: false,
        cookingForm: {
            username:this.$store.state.auth.user.user.username,
            lesson: "",
            video: "",
            thumbjs:"",
        },
        progressbar: false,
        putVideo:"",
        videoData:'',
        selectedTeachers: [],
        isUpdating: false,
        }
},
computed: {
    ...mapGetters(['isAuthenticated','loggedInUser', 'usersTeachers','cook_obj']),
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
    goback(){
        window.history.back();
    },
    cancelCooking(){
        this.$store.dispatch("remove_cook_obj");
        this.$router.push("/whatiscooking");
    },
    async submitCooking(){
        if(this.putVideo != ''){
            if(this.cookingForm.lesson){
                this.progressbar =true;
                this.capture();
                console.log(this.cookingForm);
                try {
                    let res = await this.$axios.$get("https://bkgqvz7q1m.execute-api.us-east-2.amazonaws.com/v1");
                    if(res.statusCode == 200)
                    {
                        delete this.$axios.defaults.headers.common['Authorization']
                        let filename = res.key
                        let url = res.body
                        url = url.slice(1, -1);
                        await this.$axios.$put(url, this.putVideo).then((value) => {
                        this.cookingForm.video = "https://presignedurl1.s3.us-east-2.amazonaws.com/" + filename
                        const config = {
                            headers: {"content-type": "multipart/form-data",
                            "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
                        };
                        let formData = new FormData();
                        for (let data in this.cookingForm) {
                            formData.append(data, this.cookingForm[data]);
                        }
                        this.$axios.$post("/v1/whatiscooking/cooking/", formData, config).then((res) => {
                            console.log(res);
                            console.log(this.selectedTeachers);
                            if(this.selectedTeachers.length){
                                for (let data of this.selectedTeachers){
                                let formData = new FormData();
                                formData.append("username", this.$store.state.auth.user.user.username);
                                formData.append("cookingidobj",res.id)
                                formData.append("shareidobj",data)
                                formData.append("idea",data)
                                this.$axios.$post("/v1/whatiscooking/taggedteachers/", formData, config).then((res) => {
                                    console.log(res);
                                    this.progressbar = false
                                })
                            }
                            console.log("teacher exists");
                            }else console.log("no teachers");
                            this.progressbar = false
                            console.log(this.cookingForm);
                            this.refreshLearning();
                            this.addLearning = false;
                            this.$router.push("/whatiscooking");
                        })
                        }); 
                    }
                } 
                catch (error) {
                    console.log("unsuccess",error.response);
                    this.progressbar =false
                }
            }else {
                this.valid_snackbar2 =true
                this.progressbar =false}
        }
        else {
            this.valid_snackbar1 =true
            this.progressbar =false}
        // alert("complete the api river!!")
    },
    capture(){
    var canvas = document.getElementById('canvas');
    var video = document.getElementById('videoPreview');
    console.log(video);
    canvas.getContext('2d').drawImage(video, 0, 0, 300, 200);
    let imgData = canvas.toDataURL("image/jpeg",0.75);console.log(imgData);
    this.cookingForm.thumbjs = imgData
    },
    refreshLearning(){
        this.cookingForm.username = this.$store.state.auth.user.user.username;
        this.cookingForm.lesson= "";
        this.cookingForm.video= "";
        this.videoData ="";
        this.selectedTeachers= []
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
