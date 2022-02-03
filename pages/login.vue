<template>
	<v-app>
		<center>
		<v-card max-width="450" class="mx-2 mt-6 " elevation="0" outlined>
				<nuxt-link :to="'/'" class="text-decoration-none">
			<img
			:height="$vuetify.breakpoint.smAndDown ? 38 : 48"
			class="clickable mt-8"
			:src="require('@/assets/gebbleslogo.png')"/></nuxt-link>
			<v-card-title class="justify-center">
				<h3>Sign in to gebbles</h3>
			</v-card-title>
			<v-card-text>
				<v-text-field 
					:error-messages="errorEmail"
					v-model="userInfo.email" 
					label="Email" 
					prepend-icon="mdi-account-circle"
					color="#cead8f" />
				<v-text-field  
					:error-messages="errorPassword"    
					v-model="userInfo.password"
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
					color="#cead8f"/>
			</v-card-text>
			<v-card-actions class="mb-3 justify-center">
				<v-btn @click="submitForm()" class="px-8" small outlined color="black" dark :loading="progressbar1">Sign in</v-btn>
				<!-- <v-btn to='/register' class="ml-4 px-4 text-decoration-none" small  color="primary" >Register first</v-btn> -->
			</v-card-actions>

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
				this.$auth.setUser(res.data)
				this.$auth.setUserToken(res.data.access_token)
				this.$auth.setRefreshToken('local', res.data.refresh_token);
				// this.$store.dispatch("check_artists");
				this.$store.dispatch("check_user_portfolio");
				this.$store.dispatch("check_user_bio");
				this.$store.dispatch("check_user_journey");
				this.$store.dispatch("check_user_teachers");
				// this.$store.dispatch("check_notifications");
				this.progressbar1 = false;
				this.$router.push('/')})
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
	},
	data() {
      return {
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