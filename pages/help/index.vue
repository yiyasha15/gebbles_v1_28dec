<template>
<v-app>
    <v-container class="width mx-auto">
        <h2 class="font-weight-medium mb-6">
             Help
        </h2>
        <p class="my-2">
            <ul class="mb-2">
                <li><nuxt-link to="help/getting_started">Get started with gebbles</nuxt-link></li>
                <!-- <li><nuxt-link to="help/thoughts">Thoughts behind the process</nuxt-link></li>
                <li><nuxt-link to="help/updates">(Upcoming) Updates</nuxt-link></li> -->
                <li><nuxt-link to="/subscription">Subscription</nuxt-link></li>
                <li><nuxt-link to="/contact">Contact</nuxt-link></li>
                <li><nuxt-link to="/terms">Terms of use</nuxt-link></li>
                <li><nuxt-link to="/privacy">Privacy Policy</nuxt-link></li>
                <!-- <li v-if="isAuthenticated && loggedInUser.username == 'yiyasha15' || loggedInUser.username == 'river'"><nuxt-link to="/help/admin">Admin</nuxt-link></li> -->
            </ul>
            <!-- <li><nuxt-link to="help/issues">Support</nuxt-link></li> -->
            <!-- all these services help in making a close knitted network of our community and help us root back to our history. -->
            <!-- <v-row>
                <v-col cols="12" md="7">
                     <v-hover v-slot:default="{ hover }">
                    <v-card
                    :elevation="hover ? 0 : 0"
                    outlined
                    class="px-6 py-3 rounded-lg transition-swing"
                    to="help/getting_started"
                    :ripple="false"
                    >
                    Get started with gebbles
                    </v-card>
                     </v-hover>
                </v-col>
                <v-col cols="12" md="7">
                    <v-card
                        
                        outlined
                        class="px-6 py-3 rounded-lg"
                        to="/contact"
                        :ripple="false"
                        >
                        Contact
                    </v-card>
                </v-col>
                <v-col cols="12" md="7">
                    <v-card
                        
                        outlined
                        class="px-6 py-3 rounded-lg"
                        to="/terms"
                        :ripple="false"
                        >
                        Terms of use
                    </v-card>
                </v-col>
                <v-col cols="12" md="7">
                    <v-card
                        outlined
                        class="px-6 py-3 rounded-lg"
                        to="/privacy"
                        :ripple="false"
                        >
                        Privacy
                    </v-card>
                </v-col>
            </v-row> -->
        </p>
    </v-container>
</v-app>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    methods: {
    },
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])}
}
</script>
<style scoped>
a{
    text-decoration: none;
}
.width{
    max-width: 670px;
  }
</style>