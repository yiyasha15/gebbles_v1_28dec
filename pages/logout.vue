<template>
<v-app>
	<v-container>
	<v-card width="450" elevation="0" outlined class="mx-auto mt-16 ">
		<v-card-title class="justify-center align-center">
            <h5 class="font-weight-medium">Are you sure you want to sign out?</h5>
		</v-card-title>
		<v-card-actions class="pb-6 justify-center">
			<v-btn class="ml-4 px-4" small dark color="error" :loading="progressbar" @click="signout">Sign Out</v-btn>
			<v-btn class="ml-4 px-4" small outlined color="black" @click="cancel">Cancel</v-btn>
		</v-card-actions>
	</v-card>
	</v-container>
</v-app>
</template>

<script>
export default {
	data() {
      return {
		progressbar:false
		}
	},
	// layout: 'simple',
	methods:{
		signout(){this.progressbar = true;
			console.log("logged out");
			this.$store.dispatch("remove_portfolio")
			this.$store.dispatch("remove_bio")
			this.$store.dispatch("remove_teachers")
			this.$store.dispatch("remove_share_obj")
			this.$store.dispatch("remove_editing_obj")
			this.$store.dispatch("remove_learnings")
			this.$store.dispatch("remove_notifications")
			this.$store.dispatch("remove_cook_reactions")
			this.$store.dispatch("remove_journey")
			this.$store.dispatch("remove_page")
			localStorage.clear()
			this.$auth.strategy.token.reset();
			this.$auth.logout();
			this.progressbar = false;
		},
		cancel(){
			this.$router.push("/");
		}
	}
}
</script>