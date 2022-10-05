<template>
    <div>
        <!--site navigation -->
        <v-app-bar clipped-left flat fixed class="background">
            <nuxt-link :to="'/'" class="text-decoration-none">
            <v-layout align-center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 28 : 38"
                class="clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h2 class="ml-2" style="font-family: 'Poiret One', cursive;">gebbles</h2>
            </v-layout>
            </nuxt-link>
            <v-spacer></v-spacer>
            <template v-if="isAuthenticated">
            <v-btn icon small 
            :to="'/'"
            class="text-decoration-none mr-sm-2 mr-md-3 mx-1"
            >
            <v-icon size="26" color="black" >mdi-home-circle-outline</v-icon>
            </v-btn>
            <plus-button v-if="userHasPortfolio" class="d-flex d-sm-none"></plus-button>
            <!-- {{notifications_notseen}} -->
            <v-btn small v-if="userHasPortfolio && notifications_notseen>0" icon dark color="black" class=" mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-badge color="error" overlap :content='notifications_notseen'>
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-badge>
            </v-btn>
            <v-btn small v-if="userHasPortfolio && notifications_notseen==0" icon dark color="black" class=" mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-btn>
            <right-navigation v-if="userHasPortfolio"></right-navigation>
            </template>
            <register-login v-else></register-login>
            <v-btn icon small @click="drawer_right=!drawer_right" v-if="!isAuthenticated" class="mr-sm-2 mr-md-3 mx-1">
            <v-avatar size="26" >
                <v-icon dark  color="black">
                    mdi-account-circle
                </v-icon>
            </v-avatar>
            </v-btn>
        </v-app-bar>
    </div>
    <!-- password tooltip -->
    <!-- Your password must be must be at least 8 characters, and contain at least one number and one special character. -->
</template>
<script>
import { mapGetters } from 'vuex'
import PlusButton from './PlusButton.vue';
import RegisterLogin from './RegisterLogin.vue';
import RightNavigation from './RightNavigation.vue';
export default {
    components: { RegisterLogin, RightNavigation, PlusButton },
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio', 'notifications', 'notifications_notseen']),
    },
    middleware : 'check_auth',
}
</script>
<style>
.artist_toolbar_name{
    font-family: 'Poiret One', cursive; 
    overflow: auto;
    max-width: 106px;
}
</style>
