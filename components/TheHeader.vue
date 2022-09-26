<template>
    <div>
        <!--site navigation -->
        <v-app-bar clipped-left flat fixed color="white">
            <nuxt-link :to="'/'" class="text-decoration-none">
            <v-layout align-center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 38 : 48"
                class="clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <v-toolbar-title> 
                    <h2 class=" hidden-sm-and-down" style="color:black; font-family: 'Poiret One', cursive; margin-bottom:7px">gebbles</h2>
                    <h3 class=" hidden-md-and-up" style="color:black; font-family: 'Poiret One', cursive; margin-bottom:7px">gebbles</h3>
                </v-toolbar-title>
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
            <v-menu transition="slide-y-transition" offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" class=" mr-sm-2 mr-md-3 mx-1"
                v-on="on">
                <v-icon size="26" color="black">mdi-plus-circle-outline</v-icon>
                </div>
                </template>
                <v-list>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/uploadvideo'"
                    class="text-decoration-none pl-6 pr-12"
                    ><v-icon color="black" class="pr-2">mdi-upload</v-icon>
                    <v-list-item-title>Upload a video</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/journey'"
                    class="text-decoration-none pl-6 pr-12"
                    ><v-icon color="black" class="pr-2">mdi-chart-line-variant</v-icon>
                    
                    <v-list-item-title>Share journey</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/each1teach1'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-icon color="black" class="pr-2">mdi-infinity</v-icon>
                    <v-list-item-title>Give a shoutout </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/event'"
                    class="text-decoration-none pl-6 pr-12"
                    ><v-icon color="black" class="pr-2">mdi-calendar-heart</v-icon>
                    <v-list-item-title>Create your event</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/workshop'"
                    class="text-decoration-none pl-6 pr-12"
                    ><v-icon color="black" class="pr-2">mdi-calendar-check-outline</v-icon>
                    <v-list-item-title>Create a workshop</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <!-- {{notifications_notseen}} -->
            <v-btn small v-if="userHasPortfolio && notifications_notseen>0" icon dark color="black" class=" mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-badge color="error" overlap :content='notifications_notseen'>
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-badge>
            </v-btn>
            <v-btn small v-if="userHasPortfolio && notifications_notseen==0" icon dark color="black" class=" mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-btn>
            <right-navigation></right-navigation>
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
import RegisterLogin from './RegisterLogin.vue';
import RightNavigation from './RightNavigation.vue';
export default {
    components: { RegisterLogin, RightNavigation },
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
