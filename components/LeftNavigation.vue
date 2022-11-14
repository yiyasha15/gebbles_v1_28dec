<template>
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
                        <v-icon dark >
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
            <v-list dense v-if="isAuthenticated">
                <v-subheader>Explore</v-subheader>
                <v-list-item-group
                    v-model="explore"
                    color="primary"
                >
                <v-list-item to="/">
                    <v-list-item-icon>
                    <v-icon>mdi-home-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
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
            <v-divider width="180" class="mx-auto my-3"></v-divider>
        <v-list v-if="isAuthenticated" dense>
            <v-subheader>Your</v-subheader>
        <v-list-item-group
            v-model="e1t1"
            color="primary"
        >
        <v-list-item :to="'/' +loggedInUser.username+ '/journey/'">
            <v-list-item-icon>
                <v-icon>mdi-book-heart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Journey</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'/' +loggedInUser.username+ '/videos/'">
            <v-list-item-icon>
                <v-icon>mdi-play-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Videos</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'/' +loggedInUser.username+ '/each1teach1/'">
            <v-list-item-icon>
                <v-icon>mdi-all-inclusive</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Each one Teach one</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'/' +loggedInUser.username+ '/events/'">
            <v-list-item-icon>
                <v-icon>mdi-calendar-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Events</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'/' +loggedInUser.username+ '/workshops/'">
            <v-list-item-icon>
                <v-icon>mdi-leaf-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Workshops</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item :to="'/' +loggedInUser.username+ '/videos/'">
            <v-list-item-icon>
                <v-icon>mdi-play-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Videos</v-list-item-title>
            </v-list-item-content>
        </v-list-item> -->
        </v-list-item-group>
        </v-list>
        </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
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
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio']),
    },
    data() {
      return {
          drawer: this.width,
          explore:1,
          e1t1:1,
      }
    },
}
</script>