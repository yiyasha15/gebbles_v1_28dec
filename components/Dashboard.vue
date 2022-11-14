<template>
    <div>
        <!--site navigation -->
        <!--  mx-1 mx-sm-5 -->
        <v-app-bar clipped-left fixed elevation="0" height="80" class="background mx-1 mx-sm-5">
            <nuxt-link :to="'/'" class="text-decoration-none">
            <v-layout align-center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 28 : 38"
                class="clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <h2 class=" ml-2" style="font-family: 'Poiret One'; ">gebbles</h2>
            </v-layout>
            </nuxt-link>
            <v-spacer></v-spacer>
            <template v-if="isAuthenticated">
            <v-btn icon small
            :to="'/'"
            class="text-decoration-none mr-sm-2 mr-md-3 mx-1"
            >
            <v-icon color="black" size="26">mdi-home-circle-outline</v-icon>
            </v-btn>
            <plus-button v-if="userHasPortfolio "></plus-button>
            <!-- {{notifications_notseen}} -->
            <v-btn small v-if="userHasPortfolio && notifications_notseen>0" icon class=" mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-badge color="error" overlap :content='notifications_notseen'>
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-badge>
            </v-btn>
            <v-btn small v-if="userHasPortfolio && notifications_notseen==0" icon class=" mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-btn>
            </template>
            <register-login v-else></register-login>
            <right-navigation></right-navigation>
        </v-app-bar>
        <left-navigation></left-navigation>
    </div>
    <!-- password tooltip -->
    <!-- Your password must be must be at least 8 characters, and contain at least one number and one special character. -->
</template>
<script>
import { mapGetters } from 'vuex'
import LeftNavigation from './LeftNavigation.vue';
import PlusButton from './PlusButton.vue';
import RegisterLogin from './RegisterLogin.vue';
import RightNavigation from './RightNavigation.vue';
export default {
    components: { RegisterLogin, RightNavigation, PlusButton, LeftNavigation},
    computed: {
        desktop() {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return false
            case 'sm': return true
            case 'md': return true
            case 'lg': return true
            case 'xl': return true
          }
        },
        width(){
            console.log("this ",window.innerWidth);
            return window.innerWidth>1190 ?true :false;
        },
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio', 'notifications', 'notifications_notseen']),
    },
    middleware : 'check_auth',
    data() {
      return {
          drawer: this.width,
          explore:1,
          e1t1:1,
          events:1,
          workshop:1,
          account:1,
          whatiscooking:1
      }
    },
    mounted(){
        const theme = localStorage.getItem("useDarkTheme");
        if (theme) {
        if (theme == "true") {
            this.$vuetify.theme.dark = true;
        } else this.$vuetify.theme.dark = false;
        }
    },
}
</script>
<style>
.v-toolbar{
    flex:0;
}
.artist_toolbar_name{
    font-family: 'Poiret One', cursive; 
    overflow: auto;
    max-width: 106px;
}
</style>
