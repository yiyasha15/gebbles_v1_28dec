<template>
   <!-- <v-container> -->
        <v-toolbar flat class="mt-2">
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
            <v-btn small v-if="isAuthenticated && notifications_notseen.length>0" icon dark color="indigo" class="mr-2 text-decoration-none" :to= "`/${loggedInUser.user.username}/notifications`">
            <v-badge color="error" overlap :content='notifications_notseen.length'>
            <v-icon color="black">mdi-bell</v-icon>
            </v-badge>
            </v-btn>
            <v-btn small v-if="isAuthenticated && notifications_notseen.length==0" icon dark color="indigo" class="mr-2 text-decoration-none" :to= "`/${loggedInUser.user.username}/notifications`">
            <v-icon color="black">mdi-bell</v-icon>
            </v-btn>
            <!-- <v-btn to= "/notificationss">test</v-btn> -->
            <v-menu v-if="isAuthenticated" transition="slide-y-transition" open-on-hover offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                    </div>
                </template>
                <v-list>
                    <v-list-item
                    :to="'/'"
                    class="text-decoration-none pl-5"
                    >
                    <img
                    height="38"
                        :src="require('@/assets/gebbleslogo.png')"
                        alt="img"
                    >
                    <v-list-item-title class="pl-2" ><h3 style="font-family: 'Poiret One', cursive;">gebbles</h3></v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/'+ loggedInUser.user.username"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-avatar size="36" v-if="usersPortfolio.thumb">
                    <img
                    :height="$vuetify.breakpoint.smAndDown ? 22 : 20"
                        :src = "usersPortfolio.thumb" 
                        alt="img"
                    >
                    </v-avatar>
                    <v-avatar size="36" color="indigo" v-else >
                        <v-icon dark>
                            mdi-account-circle
                        </v-icon>
                    </v-avatar>
                    <v-list-item-title class="pl-2">@{{ loggedInUser.user.username }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="!userHasPortfolio"
                    :to="'/create/website'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Create a portfolio</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/website'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Edit your portfolio</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/journey'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Add journey</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/each1teach1'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-list-item-title>Create E1T1</v-list-item-title>
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
                    <v-list-item-title>Log Out</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        <div v-if="!isAuthenticated" class=" hidden-sm-and-down">
            <v-btn small dark color="#ccbf4d" class="mr-2 text-decoration-none" to="/login">Sign In</v-btn>
            <v-btn small outlined  color="indigo" class="mr-2 text-decoration-none" to="/register">Sign Up</v-btn>
        </div>
        <div v-if="!isAuthenticated" class=" hidden-md-and-up">
            <v-btn x-small dark color="#ccbf4d" class="mr-2 text-decoration-none" to="/login">Sign In</v-btn>
            <v-btn x-small outlined  color="indigo" class="mr-2 text-decoration-none" to="/register">Sign Up</v-btn>
        </div>
        </v-toolbar>
    <!-- </v-container> -->
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio','usersPortfolio', 'notifications', 'notifications_notseen']),
    },
}
</script>
<style>
.v-toolbar{
    flex:0;
}
</style>