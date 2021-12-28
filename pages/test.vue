<template>
    <v-app>
        <v-container>
        <input  type="file" accept="video/*" @change="onFileChange">
        <v-btn class="text-decoration-none"  color="indigo" dark outlined
            @click="submitLearning" >Submit</v-btn>
        </v-container>
    </v-app>
</template>
<script>
export default {
    methods:{
        async submitLearning(){
            try {
                if(this.video.name != undefined){
                let res = await this.$axios.$get("https://bkgqvz7q1m.execute-api.us-east-2.amazonaws.com/v1");
                if(res.statusCode == 200)
                {
                    delete this.$axios.defaults.headers.common['Authorization']
                    console.log("res is 200");
                    let filename = res.key
                    console.log(filename);
                    //put to storage
                    let url = res.body
                    url = url.slice(1, -1);
                    let s3form = new FormData();
                    console.log(this.video);
                    s3form.append("key", this.video);
                    // putting directlt in s3 storage
                    await this.$axios.$put(url, s3form).then((value) => {
                    console.log(value);
                    let fullFileName = "https://presignedurl1.s3.us-east-2.amazonaws.com/" + filename
                    console.log(fullFileName);
                    // expected output: "Success!"
                    }); 
                }
                }else{
                    //select video
                    console.log("select video");
                }
                } catch (error) {
                    console.log("unsuccess",error.response);
                }
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
                    this.video = files[0];
                }
            }
        },
    },
    data(){
        return {
            video:[]
        }
        }
}
</script>