<template>
	<v-app>
		<center>
		<v-card max-width="450" class="mx-2 mt-6 " elevation="0" outlined>
				<nuxt-link :to="'/'" class="text-decoration-none">
			<img
			:height="$vuetify.breakpoint.smAndDown ? 38 : 48"
			class="clickable mt-8"
			:src="require('@/assets/gebbleslogo_tab.png')"/></nuxt-link>
			<v-card-title class="justify-center">
				<h3 class="font-weight-medium">Sign in to gebbles</h3>
			</v-card-title>
			<v-form ref="form">
			<v-card-text>
				<v-text-field 
					:error-messages="errorEmail"
					v-model="userInfo.email" 
					label="Email" 
					:rules=" emailRules"
					prepend-icon="mdi-account-circle"
					color="#cead8f" />
				<v-text-field  
					:error-messages="errorPassword"    
					v-model="userInfo.password"
					:rules="passwordRules" 
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
					color="#cead8f"/>
			</v-card-text>
			<v-card-actions class="mb-3 justify-center">
				<v-btn @click="submitForm()" class="px-8" small outlined  :loading="progressbar1">Sign in</v-btn>
				<!-- <v-btn to='/register' class="ml-4 px-4 text-decoration-none" small  color="primary" >Register first</v-btn> -->
			</v-card-actions>
			</v-form>
			<center> <h5 class="py-4 font-weight-light"> <nuxt-link :to="'/passwordrenew'" style="text-decoration:none">I forgot my password. </nuxt-link></h5></center>
			<v-divider></v-divider>
			<center> <h5 class="py-4 font-weight-light">Don't have an account? <nuxt-link :to="'/register'" style="text-decoration:none">Sign up. </nuxt-link></h5></center>
			<!-- <p class="text-center pa-4">gebbles is currently a community of {{img_artists}} dancers.</p> -->
		</v-card>
		</center>
	</v-app>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
	methods:{
		async submitForm(){
			if(this.$refs.form.validate())
			{
				this.progressbar1 = true;
				try{
					const config = {
						headers: {"content-type": "multipart/form-data"}
					};
					let res = await this.$auth.loginWith('local', {
					data: {
						'email':this.userInfo.email,
						'password':this.userInfo.password
						}
					}).then(res => { 
						console.log(res.data);
						this.$auth.setUser(res.data)
						this.$auth.$storage.setUniversal('user', res.data, true)
						this.$auth.strategy.token.set(res.data.access_token)
						// this.$auth.strategy.refreshToken.set(res.data.refresh_token)
						this.$store.dispatch("check_user_portfolio");
						this.$store.dispatch("check_user_bio");
						this.$store.dispatch("check_user_teachers");
						this.$store.dispatch("check_notifications");
						this.progressbar1 = false;
						this.$router.push('/')
					})
				}catch(error){
					this.progressbar1 = false;
					if(error.response.data.non_field_errors){
						this.errorEmail = `${error.response.data.non_field_errors}`
					}
					if(error.response.data.email){
						this.errorEmail = `${error.response.data.email}`
					}
				}
			}
		}
	},
	data() {
      return {
		emailRules: [
		// v => !!v || "Email is required.",
		// v => /.+@.+\..+/.test(v) || "E-mail must be valid."
		],
		passwordRules: [
		// v => !!v || "Password is required.",
		// v => (v && v.length >= 8) || "Min 8 characters."
		],
		errorEmail:'',
		errorPassword:'',
		showPassword: false,
		progressbar1:false,
		hasName: false,
        userInfo: {
          email: '',
		  password: ''
        },
        // ...validations
      }
	},
	// mounted() {
	// this.$store.dispatch("check_artists");
	// },
	// computed: {
	// 	...mapGetters(['img_artists'])
	// },
	layout: 'signup'
}
</script>