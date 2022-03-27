<template>
    <v-app> 
        <v-container>
        <v-card width="490" class="mx-auto mt-16 ">
            <v-card-title class="justify-center align-center">
                <h3 >Set new password</h3>
            </v-card-title>
            <div style="padding:18px">
            <v-text-field     
					:error-messages="errorPassword"
					:rules="[rules.required, passwordRules.min]"   
                    v-model="password1"
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
				<v-text-field   
				:error-messages="errorPassword2" 
                    v-model="password2"
					:type="showPassword2 ? 'text' : 'password'"
					label="Confirm Password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword2 = !showPassword2"
				/><v-card-actions class="mb-3 pb-6 justify-center">
                <v-btn small class="text-decoration-none" outlined :loading="progressbar" color="black" dark
                    @click="reset">Set new password</v-btn>
            </v-card-actions>
            </div>
	    </v-card>
            <v-snackbar v-model="snackbar"> 
                Password is set successfully.
            </v-snackbar>
            <v-snackbar v-model="tryagain"> 
                Please try again.
            </v-snackbar>
        </v-container>
    </v-app>
</template>
<script>
export default {
    data() {
      return {
        progressbar:false,
        password1:'',
        password2:'',
        token:'',
        snackbar:false,
        tryagain:false,
        errorPassword:'',
        errorPassword2:'',
        showPassword: false,
        showPassword2: false,
        rules: {
        required: v => !!v || "Password is required.",
        nospace: v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed',
        },
        passwordRules: {
            min: v => (v && v.length >= 8) || "Min 8 characters"
        },
        }
    },
    mounted(){
        let token = window.location.search; 
        token = token.substring(1);
        this.token = token;
    },
    methods: {
        async reset() {
            if(this.password1!=this.password2){
            this.errorPassword2 = `Passwords doesn't match.`
            return;
            }
            let resetForm = new FormData();
                resetForm.append('token', this.token)
                resetForm.append('password', this.password2)
                console.log(resetForm);
                this.progressbar = true
            try {
                let response = await this.$axios.$post("v1/auth/passwordreset/confirm/",resetForm)
                // console.log(response);
                if(response.status =="OK")
                {this.snackbar = true;}
                this.password1=''
                this.password2 = ''
                this.errorPassword =''
                this.errorPassword2 = ''
                this.progressbar = false
                this.$router.push('/login')
            } catch (err) {
                if(err.response.data){
                    let er = err.response.data
                    console.log("er",er);
                    this.password1=''
                    this.password2 = ''
                    this.progressbar = false
                    for (const key in er) {
                        if(`${key}` == 'detail'){
                        this.errorPassword = `${er[key]}`
                        this.tryagain = true
                        }
                    }
                }
            }
            
        }   
    }
}
</script>