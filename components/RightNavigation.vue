<template>
<div>
    <v-btn icon small v-if="isAuthenticated" @click="drawer_right=!drawer_right"
        class="text-decoration-none mx-1">
        <v-avatar size="32" v-if="usersPortfolio && usersPortfolio.thumb">
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
    <v-btn icon small v-else @click="drawer_right=!drawer_right"
        class="text-decoration-none mx-1">
        <v-avatar size="32">
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
            <!-- <v-list-item to="/whatiscooking">
                <v-list-item-icon>
                <v-icon>mdi-play-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>What's cookin</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
            <v-list-item to="/">
                <v-list-item-icon>
                <v-icon>mdi-home-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
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
        </v-list-item-group>
        </v-list>
        <v-list v-if="isAuthenticated" dense>
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
        </v-list>
        <v-list v-if="isAuthenticated" dense>
        <v-subheader>Events</v-subheader>
        <v-list-item-group
            v-model="events"
            color="primary"
        >
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
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio']),
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