<template>
    <div v-if="isAuthenticated">
        <v-navigation-drawer 
            :permanent="$vuetify.breakpoint.mdAndUp"
            class="ml-md-4 pt-md-5"
            app
            left 
            hide-overlay
            v-model="drawer"
            >
        <template v-slot:prepend>
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
        </template>

        <!-- <v-divider class="my-3"></v-divider> -->
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
            </v-list>
            <!-- <v-divider class="my-3"></v-divider> -->
            <v-list dense>
            <v-subheader>Events</v-subheader>
            <v-list-item to="/events">
                <v-list-item-icon>
                <v-icon>mdi-google-circles-communities</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Events</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
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
        </v-navigation-drawer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    data() {
      return {
          drawer: this.$vuetify.breakpoint.mdAndUp
      }
    },
    computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated', 'usersPortfolio']),
    },
    methods: {  
    }
}
</script>