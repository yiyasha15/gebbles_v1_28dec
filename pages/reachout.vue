
<template>
    <v-app> 
        <v-container class="width">
            <div class="my-6">
                <h1 class="my-4">Reach out!</h1>
                <p class="my-2 font-weight-light">Gebbles is an entirely homegrown community platform, hence in this version you might find bugs or error during your use.
                    You can contact us using any(preferablly mail with the subject to be addressed) of the below addresses and send us your queries/issues and we will try and solve it for you.
                    <!-- Thankyou. -->
                    </p>
                <p>Email <a href="https://mailto:gebbles.io@gmail.com" target="_blank">gebbles.io@gmail.com</a>.</p>
                <p>Instagram <a href="https://instagram.com/gebbles.io/" target="_blank">@gebbles.io.</a></p>
                <p class="py-2">To report or suggest any features for gebbles.</p>
                <v-card max-width="540" elevation="0" outlined class="mt-2">
                    <v-card-text>
                <v-text-field
                label="Name" color="#cead8f"
                :error-messages="errorName"
                v-model="report.name"
                ></v-text-field>
                <v-text-field
                label="Email" color="#cead8f"
                v-model="report.email"
                :error-messages="errorEmail"></v-text-field>
                <v-textarea
                label="Message" color="#cead8f"
                    v-model="report.question"
                    :error-messages="errorQuestion">
                </v-textarea>
                <v-btn outlined small class="text-decoration-none px-6"  color="black" dark
                     @click="submit">Send</v-btn>
                    </v-card-text>
                </v-card>
            </div>
        </v-container>
        <v-snackbar v-model="snackbar">Thankyou for your feedback</v-snackbar>
    </v-app>
</template>
<script>
export default {
    data(){
        return{
            report: {
                name:'',
                email:'',
                question:''
            },
            errorEmail:'',
            errorName:'',
            errorQuestion:'',
            snackbar:false
        }
    },
    methods:{
        clearform(){
            this.report.name=''
            this.report.email=''
            this.report.question=''
            this.errorEmail =''
            this.errorName =''
            this.errorQuestion =''
            this.snackbar =true
        },
        async submit(){
            console.log("submit", this.report);
            //post request
            try{
            await this.$axios.$post("/v1/inquiry/", this.report).then(resp=>{this.errorName = ``
            this.errorQuestion =''
            this.errorQuestion=''
            this.clearform();
            this.snackbar = true
            })}
            catch(err){
                console.log("errorrr",err.response.data);
                let er = err.response.data
                for (const key in er) {
						if(`${key}` == 'name'){
						this.errorName = `${er[key]}`
						}
						if(`${key}` == 'email'){
						this.errorEmail = `${er[key]}`
						}
						if(`${key}` == 'question'){
						this.errorQuestion= `${er[key]}`
						}
						// console.log(`${key}: ${er[key]}`);
					}
            }

        }
    }
}
</script>
<style scoped>
.width{
    max-width: 1024px;
}
</style>