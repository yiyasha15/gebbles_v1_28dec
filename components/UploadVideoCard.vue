<template>
    <div>
        <v-container class="mx-auto pa-0" fluid style="max-width:550px" >
            <v-card class="pa-4 pb-md-8 px-md-8" color="background" elevation=0 >
                <center><img src = "~/assets/portfolio.png" :width="img_width" alt="video logo"/></center>
                <div class="font-weight-medium mb-4 text-h6 text-sm-h5" align="center" justify="center" v-if="!cook_obj">Upload your video</div>
                 <div class="font-weight-medium mb-4 text-h6 text-sm-h5" align="center" justify="center" v-else>Edit your video</div>
                 <gebbles-divider class="mb-5"></gebbles-divider>
                 <v-form v-on:submit.prevent="submit" ref="cooking_form">
                    <v-row class="ma-0">
                        <v-col cols="12" class="pa-0">
                            <v-text-field
                                :rules="youtubeRules"
                                v-model = "cookingForm.video"
                                label= "*Youtube link">
                            </v-text-field>
                            <v-textarea
                                v-model = "cookingForm.lesson"
                                label= "Share what you're exploring..">
                            </v-textarea>
                            <p class ="font-weight-light body-1 xs12">Let's share about other fellow artists and mention them if they inspired you to work on your craft. </p>
                            <p class="body-2"><b>Give a shoutout to add them here.</b></p>
                            <v-autocomplete
                                class="pt-2"
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
                                    <v-avatar v-if="data.item.image_mini" left>
                                        <v-img :src="data.item.image_mini"></v-img>
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
                                    <v-list-item-avatar v-if="data.item.image_mini">
                                        <img :src="data.item.image_mini">
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
                            <p class="body-2">This will be added in their sharing page and they will be notified.</p>  <br>
                            <v-btn class="text-decoration-none" small color="black" dark outlined v-if="!cook_obj"
                            @click="submitCooking" :loading="progressbar">Submit</v-btn>
                            <v-btn v-else outlined small class="text-decoration-none"  color="black" dark
                            @click="updateCooking" :loading="progressbar">Update</v-btn>
                            <v-btn small color="error" text  @click="clear">Cancel</v-btn> 
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
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import GebblesDivider from './GebblesDivider.vue';
export default {
  components: { GebblesDivider },
created(){
    this.$store.dispatch("check_user_teachers");
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
            username:this.$store.state.auth.user.username,
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
            v => !v || /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm.test(v) ||'Enter a valid Url',
            v => !!v || 'Url is required',
        ],
        }
},
computed: {
    ...mapGetters(['isAuthenticated','loggedInUser', 'usersTeachers','cook_obj']),
    img_width () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 240
            case 'sm': return 240
            case 'md': return 280
            case 'lg': return 300
            case 'xl': return 350
            }
        },
},
methods:{
    clear(){
        this.$store.dispatch("remove_cook_obj");
        this.refresh();
        // this.$router.push("/");
    },
    youTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    },
    async submitCooking(){
        if(this.$refs.cooking_form.validate()){
        this.progressbar =true;
        try {
            const config = {
                headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
            let isShorts = this.cookingForm.video.includes("shorts");
            let videoId;
            if(isShorts){
                let shortId = this.cookingForm.video.split("/").pop(); //get last string
                this.cookingForm.video = "https://www.youtube.com/watch?v="+shortId
            }
                videoId = this.youTubeGetID(this.cookingForm.video)
                this.cookingForm.thumbjs = 'http://img.youtube.com/vi/' + videoId + '/2.jpg';
            let formData = new FormData();
            for (let data in this.cookingForm) {
                formData.append(data, this.cookingForm[data]);
            }
            this.$axios.$post("/v1/whatiscooking/cooking/", formData, config).then((res) => {
                if(this.selectedTeachers.length){
                    for (let data of this.selectedTeachers){
                    let formData = new FormData();
                    formData.append("username", this.loggedInUser.username);
                    formData.append("cookingidobj",res.id)
                    formData.append("shareidobj",data)
                    formData.append("idea",data)
                    this.$axios.$post("/v1/whatiscooking/taggedteachers/", formData, config).then((res) => {

                        this.progressbar = false
                    })
                }
                }else console.log("no teachers");
                this.progressbar = false
                this.$store.dispatch("check_user_teachers");
                this.refresh();
                this.$router.push("/whatiscooking");
            })
            } 
            catch (error) {
                console.log("unsuccess",error, error.response);
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
                "Authorization": this.$auth.strategy.token.get()
            }
            };
            let update=false;
            let formName = new FormData();
            if(this.cook_obj.lesson != this.cookingForm.lesson)
            {formName.append("lesson", this.cookingForm.lesson);
            update = true;}
            if(this.cook_obj.video != this.cookingForm.video)
            {
                let isShorts = this.cookingForm.video.includes("shorts");
                let videoId;
                if(isShorts){
                    let shortId = this.cookingForm.video.split("/").pop(); //get last string
                    this.cookingForm.video = "https://www.youtube.com/watch?v="+shortId
                }
                videoId = this.youTubeGetID(this.cookingForm.video)
                this.cookingForm.thumbjs = 'http://img.youtube.com/vi/' + videoId + '/2.jpg';
                console.log(this.cookingForm.video,this.cookingForm.thumbjs);
                formName.append("video", this.cookingForm.video);
                formName.append("thumbjs", this.cookingForm.thumbjs);
                update = true;
            }
            if(update)
            {let response= await this.$axios.$patch("/v1/whatiscooking/cooking/"+this.cook_obj.id, formName, config);}
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
            // console.log("teacher changed");
            let prevArray = this.cook_obj.taggedteachers;
            let selectedArrayType= '';
            if(this.selectedTeachers.length == 0 && prevArray.length == 0){
                // do nothing
                return;
            }
            //new array empty
            else if(this.selectedTeachers.length == 0) // nothing to add
            {
                //delete all( could be an obj or number)
                const config = {
                    headers:{
                        "content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                    };
                for(let i=0; i < prevArray.length; i++)
                {
                    await this.$axios.$delete("/v1/whatiscooking/taggedteachers/"+prevArray[i].id, config)
                }
            }
            else if(prevArray.length == 0) //nothing to delete
            {
                let newArray=[];
                //make clone of new array
                for (let copy = 0; copy < this.selectedTeachers.length; copy++) {
                newArray[copy] = this.selectedTeachers[copy];
                }
                const config = {
                headers:{
                    "content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
                };
                for(let i=0; i < newArray.length;i++)
                {
                    let formData = new FormData();
                    formData.append("username", this.loggedInUser.username);
                    formData.append("cookingidobj", this.cook_obj.id)
                    formData.append("shareidobj",newArray[i])
                    formData.append("idea",newArray[i])
                    await this.$axios.$post("/v1/whatiscooking/taggedteachers/", formData, config).then((res) => {
                        console.log("added teacher",res);
                    })
                }

            }
            else{ //do computation
            try {
                let prevArrayConverted = this.cook_obj.taggedteachers.map(a => a.shareidobj.id);
                let newArray=[];
                //make clone of new array
                for (let copy = 0; copy < this.selectedTeachers.length; copy++) {
                    selectedArrayType = typeof this.selectedTeachers[copy];
                    newArray[copy] = this.selectedTeachers[copy];
                }
                //if(type is object -> filter and make number)
                // console.log("selectedArrayType:", selectedArrayType);
                if(selectedArrayType =='object'){
                    newArray = this.selectedTeachers.map(a => a.id);
                }
                else if(selectedArrayType =='number'){
                    newArray = this.selectedTeachers;
                }
                // console.log("selected teacher id is ", newArray);
                const config = {
                    headers:{
                        "content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
                //check prev array and delete if new array doesnt contain that
                for(let i=0; i < prevArray.length; i++){
                    if(newArray.indexOf(prevArray[i].shareidobj.id)== -1){
                        await this.$axios.$delete("/v1/whatiscooking/taggedteachers/"+prevArray[i].id, config)
                    }
                }
                //check new array and add if prev array doesn't contain that
                for(let i=0; i < newArray.length; i++){
                    if(prevArrayConverted.indexOf(newArray[i])== -1){
                        console.log("add",newArray[i]);
                        let formData = new FormData();
                        formData.append("username", this.loggedInUser.username);
                        formData.append("cookingidobj", this.cook_obj.id)
                        formData.append("shareidobj",newArray[i])
                        formData.append("idea",newArray[i])
                        await this.$axios.$post("/v1/whatiscooking/taggedteachers/", formData, config).then((res) => {
                            console.log("added teacher",res, newArray[i]);
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
            }
            this.progressbar =false
            this.updated = true;
            this.$store.dispatch("check_user_teachers");
            this.refresh();
            this.$router.push("/whatiscooking/"+this.cook_obj.uuid);
            this.$store.dispatch("remove_cook_obj");
            //updatestore
        }
        else {
            console.log("teacher unchanged");
            this.progressbar =false
            this.updated = true;
            this.refresh();
            this.$router.push("/whatiscooking/"+this.cook_obj.uuid);
            this.$store.dispatch("remove_cook_obj");
            }
    },
    teacherchange(){
        if(this.cook_obj)
        this.changedTeacherBool = true
    },
    refresh(){
        this.cookingForm.username = this.loggedInUser.username;
        this.cookingForm.lesson= "";
        this.cookingForm.video= "";
        this.cookingForm.thumbjs ='';
        this.selectedTeachers= []
        this.changedTeacherBool=false,
        this.changedTeachers=[];
        this.$refs.cooking_form.resetValidation();
    },
    remove (item) {
        let index= -1;
        for(var i = 0; i < this.selectedTeachers.length; i++) {
        if(this.selectedTeachers[i].s_teacher_name === item.s_teacher_name) {
            index = i;
        }
        else if(this.selectedTeachers[i] === item.id){
            index = i;
        }
        }
        if (index >= 0) {
            if(this.cook_obj){this.changedTeacherBool = true}
            this.selectedTeachers.splice(index, 1)
        }
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