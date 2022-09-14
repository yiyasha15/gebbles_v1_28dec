<template>
   <!-- <v-container> -->
    <v-toolbar flat class="mt-2" style="flex:none;">
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
        <!-- <v-btn icon small
            class="text-decoration-none mr-sm-2 mr-md-3 mr-1"
            :to= "`/help/`">
        <v-icon size="26" color="black" >mdi-help</v-icon>
        </v-btn> -->
        <v-btn icon small
            class="text-decoration-none mr-sm-2 mr-md-3 mr-1"
            :to= "`/whatiscooking/`"
            v-if="isAuthenticated">
        <v-icon size="26" color="black" >mdi-play-circle-outline</v-icon>
        </v-btn>
        <v-btn icon small 
        :to="'/'"
        v-if="isAuthenticated"
        class="text-decoration-none mr-sm-2 mr-md-3 mr-1"
        >
        <v-icon size="26" color="black" >mdi-home-circle-outline</v-icon>
        </v-btn>
        <v-btn icon small
            v-if="isAuthenticated"
            :to="'/events'"
            class="text-decoration-none mr-sm-2 mr-md-3 mr-1"
        >
            <v-icon size="26" color="black" >
                mdi-google-circles-communities
            </v-icon>
        </v-btn>
        <v-menu v-if="isAuthenticated" transition="slide-y-transition" open-on-hover offset-y bottom left>
            <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" class="mr-sm-2 mr-md-3 mr-1"
            v-on="on">
            <v-icon size="26" color="black">mdi-plus-circle-outline</v-icon>
            </div>
            </template>
            <v-list>
                <v-list-item
                v-if="userHasPortfolio"
                :to="'/create/events'"
                class="text-decoration-none pl-6 pr-12"
                ><v-icon color="black" class="pr-2">mdi-calendar-heart</v-icon>
                <v-list-item-title>Create your event</v-list-item-title>
                </v-list-item>
                <v-list-item
                :to="'/create/uploadvideo'"
                class="text-decoration-none pl-6 pr-12"
                ><v-icon color="black" class="pr-2">mdi-tray-arrow-up</v-icon>
                <v-list-item-title>Upload a video</v-list-item-title>
                </v-list-item>
                <v-list-item
                v-if="!userHasPortfolio"
                :to="'/create/website'"
                class="text-decoration-none pl-6 pr-12"
                ><v-icon color="black" class="pr-2">mdi-account-edit-outline</v-icon>
                <v-list-item-title>Create a portfolio</v-list-item-title>
                </v-list-item>
                <v-list-item
                v-if="userHasPortfolio"
                :to="'/create/website'"
                class="text-decoration-none pl-6 pr-12"
                ><v-icon color="black" class="pr-2">mdi-account-edit-outline</v-icon>
                <v-list-item-title>Edit your portfolio</v-list-item-title>
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
            </v-list>
        </v-menu>
        <!-- {{notifications_notseen}} -->
        <v-btn small v-if="isAuthenticated && userHasPortfolio && notifications_notseen>0" icon dark color="black" class="mr-sm-2 mr-md-3 mr-1 text-decoration-none" :to= "`/${loggedInUser.user.username}/notifications`">
    <v-badge color="error" overlap :content='notifications_notseen'>
    <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
    </v-badge>
        </v-btn>
        <v-btn small v-if="isAuthenticated && userHasPortfolio && notifications_notseen==0" icon dark color="black" class="mr-sm-2 mr-md-3 mr-1 text-decoration-none" :to= "`/${loggedInUser.user.username}/notifications`">
        <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
        </v-btn>
        <v-menu v-if="isAuthenticated" transition="slide-y-transition" open-on-hover offset-y bottom left>
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" class="mr-2"
                v-on="on">
                <!-- <v-btn icon small
                class="text-decoration-none mr-1"
                > -->
                <v-avatar size="26" v-if="usersPortfolio && usersPortfolio.thumb">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 22 : 20"
                    :src = "usersPortfolio.thumb" 
                    alt="img"
                >
                </v-avatar>
                <v-avatar size="26" v-else >
                    <v-icon dark  color="black">
                        mdi-account-circle
                    </v-icon>
                </v-avatar>
                <!-- </v-btn> -->
                </div>
            </template>
            <v-list>
                <v-list-item  v-if="userHasPortfolio"
                :to="'/'+ loggedInUser.user.username"
                class="text-decoration-none pl-5"
                >
                <v-list-item-title class="pl-1" ><h3 class="artist_toolbar_name">{{loggedInUser.user.username}}</h3></v-list-item-title>
                </v-list-item>
                <v-list-item  v-if="userHasPortfolio"
                :to="'/'+ loggedInUser.user.username +'/events'"
                class="text-decoration-none pl-6 pr-12"
                >
                <v-list-item-title >My events</v-list-item-title>
                </v-list-item>
                <v-list-item
                :to="'/settings'"
                class="text-decoration-none pl-6 pr-12"
                >
                <v-list-item-title>Settings</v-list-item-title>
                </v-list-item>
                <v-list-item
                :to="'/logout'"
                class="text-decoration-none pl-6 pr-12"
                >
                <v-list-item-title>Sign Out</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <register-login></register-login>
    </v-toolbar>
    <!-- password tooltip -->
    <!-- Your password must be must be at least 8 characters, and contain at least one number and one special character. -->
    <!-- </v-container> -->
</template>
<script>
import { mapGetters } from 'vuex'
import RegisterLogin from './RegisterLogin.vue';
export default {
  components: { RegisterLogin },
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio', 'notifications', 'notifications_notseen']),
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