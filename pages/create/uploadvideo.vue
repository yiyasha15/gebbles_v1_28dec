<template>
    <v-app>
        <v-container class=" mx-auto" fluid style="max-width:550px" >
            <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <h2 align="center" justify="center" v-if="!cook_obj">Upload your video</h2>
        <h2 align="center" justify="center" v-else>Edit your video</h2>
        <v-container class="mx-auto" fluid style="max-width:550px" >
            <v-card class="pa-6 pa-md-8">
            <v-form v-on:submit.prevent="submit" ref="cooking_form">
                <v-row>
                    <v-col cols="12" class="pa-0">
                        <v-text-field
                            :rules="youtubeRules"
                            v-model = "cookingForm.video"
                            label= "Youtube URL">
                        </v-text-field>
                        <v-textarea
                            v-model = "cookingForm.lesson"
                            label= "Title">
                        </v-textarea>
                            <h3 class ="font-weight-light xs12">Mention the artist if you have used any of their teaching in this video.</h3>
                        <small>This will be added in the learnings and they will be notified.</small>
                        <v-autocomplete
                            class="pt-4"
                            v-model="selectedTeachers"
                            :disabled="isUpdating"
                            :items="usersTeachers"
                            filled
                            chips
                            solo
                            label="Artist appreciation"
                            item-text="s_teacher_name"
                            item-value="id"
                            multiple
                            @input="teacherchange"
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
                                </v-list-item-content>
                                </template>
                            </template>
                        </v-autocomplete>    
                        <v-btn class="text-decoration-none" small color="black" dark outlined v-if="!cook_obj"
                        @click="submitCooking" :loading="progressbar">Submit</v-btn>
                        <v-btn v-else outlined small class="text-decoration-none"  color="black" dark
                        @click="updateCooking" :loading="progressbar">Update</v-btn>
                        <v-btn class="text-decoration-none" small color="error" dark outlined
                        @click="goback()">Cancel</v-btn> 
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
        </v-container>
        <v-snackbar v-model="updated">
            Post updated.
        </v-snackbar>
        <v-snackbar v-model="valid_snackbar">
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
        title: 'gebbles - upload video',     //do not miss "this"
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
    if(this.cook_obj)
    {
        this.cookingForm.video = this.cook_obj.video
        this.cookingForm.lesson = this.cook_obj.lesson
        // console.log("this.cook_obj",this.cook_obj);
        if(this.cook_obj.taggedteachers)for(let i =0 ;i <this.cook_obj.taggedteachers.length ; i++)
        {
            this.selectedTeachers.push(this.cook_obj.taggedteachers[i].shareidobj)
        }
    }
},
data(){
    return {
        valid_snackbar: false,
        thankyou_snackbar: false,
        cookingForm: {
            username:this.$store.state.auth.user.user.username,
            lesson: "",
            video: "",
            thumbjs:"",
        },
        progressbar: false,
        selectedTeachers: [],
        isUpdating: false,
        changedTeacherBool:false,
        changedTeachers:[],
        updated:false,
        youtubeRules:[
            v => !v || /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(v) ||'Enter a valid Url',
            v => !!v || 'Url is required',
        ],
        }
},
computed: {
    ...mapGetters(['isAuthenticated','loggedInUser', 'usersTeachers','cook_obj']),
},
methods:{
    goback(){
        this.$store.dispatch("remove_cook_obj");
        window.history.back();
    },
    cancelCooking(){
        this.$store.dispatch("remove_cook_obj");
        this.$router.push("/");
    },
    async submitCooking(){
        if(this.$refs.cooking_form.validate()){
        this.progressbar =true;
        try {
            const config = {
                headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
            };
            let formData = new FormData();
            for (let data in this.cookingForm) {
                formData.append(data, this.cookingForm[data]);
            }
            this.$axios.$post("/v1/whatiscooking/cooking/", formData, config).then((res) => {
                if(this.selectedTeachers.length){
                    for (let data of this.selectedTeachers){
                    let formData = new FormData();
                    formData.append("username", this.$store.state.auth.user.user.username);
                    formData.append("cookingidobj",res.id)
                    formData.append("shareidobj",data)
                    formData.append("idea",data)
                    this.$axios.$post("/v1/whatiscooking/taggedteachers/", formData, config).then((res) => {
                        this.progressbar = false
                    })
                }
                }else console.log("no teachers");
                this.progressbar = false
                this.refresh();
                this.$router.push("/whatiscooking");
            })
        } 
        catch (error) {
            console.log("unsuccess",error.response);
            this.progressbar =false
        }
        }
    },
    async updateCooking() {
        this.progressbar =true;
        try {
        // for lesson
            const config = {
            headers:{
                "content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
            };
            let formName = new FormData();
            if(this.cook_obj.lesson != this.cookingForm.lesson)
            formName.append("lesson", this.cookingForm.lesson);
            if(this.cook_obj.video != this.cookingForm.video)
            formName.append("video", this.cookingForm.video);
            let response= await this.$axios.$patch("/v1/whatiscooking/cooking/"+this.cook_obj.uuid, formName, config);
            //for tagged teachers
            this.updateTeachers();
        } 
        catch (error) {
            console.log("error",error);
            this.progressbar =false
        }
    },
    async updateTeachers(){
        if(this.changedTeacherBool){
            console.log("teacher changed");
            let prevArray = this.cook_obj.taggedteachers
            let currArray=[];
            for (let copy = 0; copy < this.selectedTeachers.length; copy++) {
             currArray[copy] = this.selectedTeachers[copy];
            }
            for(let i=0; i < prevArray.length; i++)
            {
                let a = currArray.includes(prevArray[i].shareidobj.id)
                if(!a)
                {
                    const config = {
                    headers:{
                        "content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                    }
                    };
                    // await this.$axios.$delete("/v1/whatiscooking/taggedteachers/"+prevArray[i].id, config)
                    this.$axios.$delete("/v1/whatiscooking/taggedteachers/"+prevArray[i].id, config).then((res) => {
                    console.log("removed teacher",res);
                })
                }
                else{
                    const index = currArray.indexOf(prevArray[i].shareidobj.id);
                    if (index > -1) {
                    currArray.splice(index, 1); 
                    }
                    // remove from selected teacher
                }
            }
            const result = this.usersTeachers.filter(teacher => currArray.includes(teacher.id));
            const config = {
            headers:{
                "content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
            };
            for(let i=0; i < result.length;i++)
            {
                let formData = new FormData();
                formData.append("username", this.$store.state.auth.user.user.username);
                formData.append("cookingidobj", this.cook_obj.id)
                formData.append("shareidobj",result[i].id)
                formData.append("idea",result[i].id)
                await this.$axios.$post("/v1/whatiscooking/taggedteachers/", formData, config).then((res) => {
                    console.log("added teacher",res);
                    // this.progressbar = false
                })
            }
            this.updated = true;
            this.refresh();
            this.$store.dispatch("remove_cook_obj");
            this.progressbar =false
            this.$router.push("/whatiscooking");
        }
        else console.log("teacher unchanged");
    },
    teacherchange(){
        if(this.cook_obj)
        this.changedTeacherBool = true
    },
    refresh(){
        this.cookingForm.username = this.$store.state.auth.user.user.username;
        this.cookingForm.lesson= "";
        this.cookingForm.video= "";
        this.cookingForm.thumbjs ='';
        this.selectedTeachers= []
        this.changedTeacherBool=false,
        this.changedTeachers=[]
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
