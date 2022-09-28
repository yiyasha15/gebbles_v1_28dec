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
            <plus-button v-if="userHasPortfolio"></plus-button>
            <!-- {{notifications_notseen}} -->
            <v-btn small v-if="userHasPortfolio && notifications_notseen>0" icon dark color="black" class=" mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-badge color="error" overlap :content='notifications_notseen'>
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-badge>
            </v-btn>
            <v-btn small v-if="userHasPortfolio && notifications_notseen==0" icon dark color="black" class=" mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-btn>
            </template>
            <register-login v-else></register-login>
            <right-navigation></right-navigation>
        </v-app-bar>
        <v-navigation-drawer height="90.2vh"
            color="transparent"
            mobile-breakpoint="1190"
            floating
            clipped
            class="ml-md-4 mt-16"
            app
            left 
            hide-overlay
            v-model="drawer"
            >
            <v-list v-if="!isAuthenticated" dense>
            <v-subheader>Welcome</v-subheader>
            <v-list-item to="/">
                <v-list-item-icon>
                🏠
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/create">
                <v-list-item-icon>
                🥷
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Get started</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/help">
                <v-list-item-icon>
                💬
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Help</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
            <v-list-item v-if="isAuthenticated" two-line>
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
            <v-list dense>
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
                <!-- <v-list-item to="/journeys">
                    <v-list-item-icon>
                    <v-icon>mdi-chart-line-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title> Journey</v-list-item-title>
                    </v-list-item-content>
                </v-list-item> -->
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
                <v-list-item to="/workshops">
                    <v-list-item-icon>
                    <v-icon>mdi-leaf-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>Workshops</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-if="isAuthenticated" dense>
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
            <v-list v-if="isAuthenticated" dense>
            <v-subheader>What's cookin</v-subheader>
            <v-list-item to="/your-videos">
                <v-list-item-icon>
                🎞️
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Your videos</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/mentioned-videos">
                <v-list-item-icon>
                🏷️
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Mentioned videos</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
            <v-list v-if="isAuthenticated" dense>
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
            <v-list v-if="isAuthenticated" dense>
                <v-subheader>Account</v-subheader>
                <v-list-item to="/help" >
                    <v-list-item-icon>
                    💬
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>Help</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
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
            <v-btn v-if="!isAuthenticated" dark color="black" class="text-decoration-none text-capitalize ma-4" to="/register">Sign Up</v-btn>
        </v-navigation-drawer>
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
    components: { RegisterLogin, RightNavigation, PlusButton},
    computed: {
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
