<template>
   <!-- <v-container> -->
    <v-toolbar flat class="mt-2" style="flex:none; position:sticky">
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
        <v-btn icon small 
        :to="'/'"
        v-if="isAuthenticated"
        class="text-decoration-none mr-sm-2 mr-md-3 mr-1"
        >
        <v-icon size="26" color="black" >mdi-home-circle-outline</v-icon>
        </v-btn>
        <v-menu v-if="isAuthenticated" transition="slide-y-transition" offset-y bottom left>
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
                v-if="userHasPortfolio"
                :to="'/create/uploadvideo'"
                class="text-decoration-none pl-6 pr-12"
                ><v-icon color="black" class="pr-2">mdi-upload</v-icon>
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
        <v-btn small v-if="isAuthenticated && userHasPortfolio && notifications_notseen>0" icon dark color="black" class="mr-sm-2 mr-md-3 mr-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
        <v-badge color="error" overlap :content='notifications_notseen'>
        <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
        </v-badge>
        </v-btn>
        <v-btn small v-if="isAuthenticated && userHasPortfolio && notifications_notseen==0" icon dark color="black" class="mr-sm-2 mr-md-3 mr-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
        <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
        </v-btn>
        <v-menu v-if="isAuthenticated" transition="slide-y-transition" offset-y bottom left>
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
            
            <v-list dense>
            <v-list-item two-line>
                <v-list-item-avatar v-if="usersPortfolio && usersPortfolio.thumb">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 22 : 20"
                        :src = "usersPortfolio.thumb" 
                        alt="img"
                    >
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon dark  color="black">
                            mdi-account-circle
                        </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                <v-list-item-title>{{loggedInUser.username}}</v-list-item-title>
                <v-list-item-subtitle>
                    <!-- <v-icon color="green">mdi-circle-medium</v-icon> -->
                    <nuxt-link :to="'/'+loggedInUser.username" class="text-decoration-none"> gebbles.io/{{loggedInUser.username}}</nuxt-link>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-subheader>Explore</v-subheader>
            <v-list-item to="/artists">
                <!-- Explore -->
                <v-list-item-icon>
                <v-icon>mdi-account-group-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title> Artists</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/journeys">
                <v-list-item-icon>
                <v-icon>mdi-chart-line-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title> Journey</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/whatiscooking">
                <v-list-item-icon>
                <v-icon>mdi-play-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>What's cookin</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/events">
                <v-list-item-icon>
                <v-icon>mdi-google-circles-communities</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Events</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
            <!-- <v-divider class="my-3"></v-divider> -->
            <v-list dense>
            <v-subheader>Events</v-subheader>
            <v-list-item to="/invited-events">
                <v-list-item-icon>
                💌
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Invited Events</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/organised-events">
                <v-list-item-icon>
                📌
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Organised Events</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/attending-events">
                <v-list-item-icon>
                ✋
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Attending Events</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
            <!-- <v-divider class="my-3"></v-divider> -->
            <v-list dense>
            <v-subheader>Each one teach one</v-subheader>
            <v-list-item to="/learning">
                <v-list-item-icon>
                📝
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Learning</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/sharing">
                <v-list-item-icon>
                🔗
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Sharing</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
            <v-list dense>
                <v-subheader>Account</v-subheader>
                <v-list-item to="/settings" >
                    <v-list-item-icon>
                    🛠️
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/logout" >
                    <v-list-item-icon>
                    💼
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>Sign out</v-list-item-title>
                    </v-list-item-content>
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