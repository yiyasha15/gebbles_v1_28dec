<template>
<div>
    <v-btn icon small @click="drawer_right=!drawer_right"
        class="text-decoration-none mx-1">
        <v-avatar size="32" v-if="isAuthenticated && usersPortfolio && usersPortfolio.thumb">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 22 : 20"
            :src = "usersPortfolio.thumb" 
            alt="img"
        >
        </v-avatar>
        <v-avatar size="32" v-else >
            <v-icon dark  color="black">
                mdi-account-circle
            </v-icon>
        </v-avatar>
    </v-btn>
    <v-navigation-drawer height="90.2vh"
        clipped-right temporary
        class="ml-md-4 mt-16 pa-3 rounded-lg" 
        app
        right 
        hide-overlay
        v-model="drawer_right"
        >
        <v-list v-if="!isAuthenticated" dense>
        <v-subheader>Welcome</v-subheader>
        <v-list-item to="/">
            <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item to="/create">
            <v-list-item-icon>
            <!-- <v-icon> -->
                <v-img contain
                    :width="$vuetify.breakpoint.smAndDown ? 24 : 22"
                    :height="$vuetify.breakpoint.smAndDown ? 24 : 22"
                    :src="require('@/assets/gebbleslogo_tab.png')"
                    />
            <!-- </v-icon> -->
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Get started</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item to="/help">
            <v-list-item-icon>
            <v-icon>mdi-comment-question-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list>
        <v-list two-line v-if="isAuthenticated">
            <v-list-item >
                <v-list-item-avatar v-if="usersPortfolio && usersPortfolio.thumb">
                    <img
                    :width="$vuetify.breakpoint.smAndDown ? 24 : 22"
                    :height="$vuetify.breakpoint.smAndDown ? 24 : 22"
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
                <nuxt-link :to="'/'+loggedInUser.username" class="text-decoration-none">
                <v-list-item-title>
                    {{loggedInUser.username}}
                    </v-list-item-title>
                </nuxt-link>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list dense>
            <v-subheader>Explore</v-subheader>
            <v-list-item-group
                v-model="explore"
                color="primary"
            >
            <v-list-item to="/artists">
                <!-- Explore -->
                <v-list-item-icon >
                <v-icon>mdi-account-group-outline</v-icon>
                </v-list-item-icon>
                <!-- <v-list-item-icon v-else>
                <v-icon>mdi-account-group</v-icon>
                </v-list-item-icon> -->
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
                <v-icon>mdi-calendar-heart</v-icon>
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
            </v-list-item-group>
        </v-list>
        <v-list v-if="isAuthenticated" dense>
        <v-subheader>Each one teach one</v-subheader>
        <v-list-item-group
            v-model="e1t1"
            color="primary"
        >
        <v-list-item to="/learning">
            <v-list-item-icon>
            <v-icon>mdi-notebook-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Learning</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item to="/sharing">
            <v-list-item-icon>
            <v-icon>mdi-all-inclusive</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Sharing</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
        </v-list>
        <!-- <v-list v-if="isAuthenticated" dense>
        <v-subheader>What's cookin</v-subheader>
        <v-list-item-group
            v-model="whatiscooking"
            color="primary"
        >
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
        </v-list-item-group>
        </v-list> -->
        <v-list v-if="isAuthenticated" dense>
        <v-subheader>Events</v-subheader>
        <v-list-item-group
            v-model="events"
            color="primary"
        >
        <v-list-item to="/invited-events">
            <v-list-item-icon>
            <v-icon>mdi-card-account-details-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Invited Events</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item to="/organised-events">
            <v-list-item-icon>
            <v-icon>mdi-pin-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Organised Events</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item to="/attending-events">
            <v-list-item-icon>
            <v-icon>mdi-hand-peace</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Attending Events</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
        </v-list>
        <v-list v-if="isAuthenticated" dense>
            <v-subheader>Account</v-subheader>
            <v-list-item-group
                v-model="account"
                color="primary"
            >
            <v-list-item to="/help" >
                <v-list-item-icon>
            <v-icon>mdi-comment-question-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Help</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/settings" >
                <v-list-item-icon>
                    <v-icon>mdi-tune-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/logout" >
                <v-list-item-icon>
                    <v-icon>mdi-bag-personal-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Sign out</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-list dense>
            <!-- <v-subheader>Account</v-subheader> -->
            <v-list-item @click="toggleTheme">
                <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title v-if="!$vuetify.theme.dark">Dark Mode</v-list-item-title>
                <v-list-item-title v-else>Light Mode</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-btn v-if="!isAuthenticated" dark class="text-decoration-none text-capitalize ma-4" to="/register">Sign Up</v-btn>
    </v-navigation-drawer>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio']),
    },
    methods:{
        toggleTheme() {
            this.$vuetify.theme.dark=!this.$vuetify.theme.dark;
            localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
        }
    },
    data() {
      return {
          drawer_right:false,
          explore:1,
          e1t1:1,
          events:1,
          account:1,
          whatiscooking:1
      }
    },
}
</script>