<template>
    <v-app> 
        <v-container class="width mx-auto">
            <h2 class="font-weight-medium mb-4">Settings</h2>
            <v-card class="my-6 pa-2 width" elevation="0" outlined>
            <div class="ma-2 ma-md-6">
                <h3 class="font-weight-medium my-4 my-md-6">User</h3>
                <v-form>
                    <v-text-field readonly v-model="email" label="Email" prepend-icon="mdi-account-circle" />
                    <v-text-field readonly v-model="username" label="Username" prepend-icon="mdi-account-circle" />
                </v-form>
            <!-- <v-btn small class="text-decoration-none" outlined  color="black" dark
                @click="save_information">Save Information</v-btn> -->
            </div>
            </v-card>
            <v-card  class="my-6 pa-2 width" elevation="0" outlined>
            <div class="ma-2 ma-md-6">
                <h3 class="font-weight-medium my-4 my-md-6">Account</h3>
                <v-form ref="form">
                    <v-text-field     
					:error-messages="errorPasswordOld"
					:rules="[rules.required]"   
                    v-model="info.old_password"
					:type="showPasswordOld ? 'text' : 'password'"
					label="Old password"
					prepend-icon="mdi-lock"
					:append-icon="showPasswordOld ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPasswordOld = !showPasswordOld"
                    @input="clearErrorOld"
				    />
                    <v-text-field     
					:error-messages="errorPassword1"
					:rules="[rules.required, rules.min]"   
                    v-model="info.new_password1"
					:type="showPassword1 ? 'text' : 'password'"
					label="Set new password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword1 = !showPassword1"
                    @input="clearErrorNew1"
				    />
                    <v-text-field   
                    :error-messages="errorPassword2" 
                        v-model="info.new_password2"
                        :type="showPassword2 ? 'text' : 'password'"
                        label="Confirm Password"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword2 = !showPassword2"
                        @input="clearErrorNew2"
                    />
                </v-form>
            <v-btn small class="text-decoration-none" outlined  color="black" dark :loading="set_new_password_loading"
                @click="set_new_password">Set New Password</v-btn>
            </div>
            </v-card>
            <v-card class="my-6 pa-2 width" elevation="0" outlined>
            <div class="ma-2 ma-md-6">
                <h3 class="font-weight-medium my-4 my-md-6">Delete Account</h3>
                <p>Deleting your account will make you loose all your data.</p>
            <v-btn small class="text-decoration-none mt-2" outlined  color="error" dark
                @click="delete_account">Delete Account</v-btn>
            </div>
            </v-card>
            <v-snackbar v-model="change_snackbar"> 
                Password changed successfully.
            </v-snackbar>
            <v-snackbar v-model="delete_snackbar"> 
                Account deleted successfully.
            </v-snackbar>
            <v-snackbar v-model="deletetemp_snackbar"> 
                Sorry, this feature is currently unavailable. Please contact us.
            </v-snackbar>
            <v-snackbar v-model="change_snackbar"> 
                Changes saved successfully.
            </v-snackbar>
        </v-container>
    </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    data() {
      return {
        rules: {
            required: v => !!v || "Password is required.",
            nospace: v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed',
            min: v => (v && v.length >= 8) || "Min 8 characters",
        },
        errorPasswordOld:'',
        errorPassword1:'',
        errorPassword2:'',
        change_snackbar: false,
        deletetemp_snackbar: false,
        delete_snackbar: false,
        save_snackbar: false,
        showPasswordOld: false,
        showPassword1: false,
        showPassword2: false,
        hasName: false,
        set_new_password_loading:false,
        email: this.$store.state.auth.user.email,
        username: this.$store.state.auth.user.username,
        info: {
            old_password: '',
            new_password1: '',
            new_password2: '',
        },
      }
    },
     mounted() {
    this.$store.dispatch("check_user_portfolio");
    },
    computed: {
    ...mapGetters(['loggedInUser']),
    },
    methods: {
        clearErrorOld(){this.errorPasswordOld=''},      
        clearErrorNew1(){this.errorPassword1 = ''},  
        clearErrorNew2(){this.errorPassword2 =''},           
        async save_information() {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            try {
                // let response = await this.$axios.$delete("/v1/artist/", config)
                //user,username, email changes
                console.log("changed successfully");
                this.save_snackbar = true;
            } catch (e) {
                console.log(e);
            }
            
        }, 
        async set_new_password() {
            this.set_new_password_loading = true;
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            try {
                let formPassword = new FormData();
                formPassword.append('old_password', this.info.old_password)
                formPassword.append('new_password1', this.info.new_password1)
                formPassword.append('new_password2', this.info.new_password2)
                console.log(formPassword);
                let res= await this.$axios.$post("/v1/auth/password/change/", formPassword, config)
                //new password
                this.set_new_password_loading=false;
                this.info.old_password=''
                this.info.new_password1=''
                this.info.new_password2=''
                this.errorPasswordOld =''
                this.errorPassword1 =''
                this.errorPassword2 =''
                this.$refs.form.resetValidation()
                console.log("new password changed successfully");
                this.change_snackbar = true;
                // this.$router.push("/settings");
            } catch (err) {
                this.set_new_password_loading =false
                if(err.response.data){
                    let er = err.response.data
                    console.log(er);
                    for (const key in er) {
                        if(`${key}` == 'new_password1'){
                        this.errorPassword1 = `${er[key]}`
                        }
                        if(`${key}` == 'new_password2'){
                        this.errorPassword2 = `${er[key]}`
                        }
                        if(`${key}` == 'old_password'){
                        this.errorPasswordOld= `${er[key]}`
                        }
                        // console.log(`${key}: ${er[key]}`);
                    }
                }
            }
            
        },  
        async delete_account() {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            try {
                // let response = await this.$axios.$delete("/v1/artist/25", config)
                //delete account
                // console.log("Deleted account successfully");
                this.deletetemp_snackbar = true;
            } catch (e) {
                console.log(e);
            }
            
        }      
    }
}
</script>
<style scoped>

.width{
    max-width: 670px;
  }
@media only screen and (max-width: 960px) {
  .width{
  max-width: 420px;
}
}
</style>