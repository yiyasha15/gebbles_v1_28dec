<template>
<v-app>
    <v-container class="width mx-auto">
        <h2 class="font-weight-medium mb-6">
            Help
        </h2>
        <p class="my-2">
            <!-- <ul>
                <li><nuxt-link to="help/getting_started">Get started with gebbles</nuxt-link></li>
                <li><nuxt-link to="help/thoughts">Thoughts behind the process</nuxt-link></li>
                <li><nuxt-link to="help/updates">(Upcoming) Updates</nuxt-link></li>
                <li><nuxt-link to="/contact">Contact</nuxt-link></li>
                <li><nuxt-link to="/terms">Terms of use</nuxt-link></li>
                <li><nuxt-link to="/privacy">Privacy Policy</nuxt-link></li>
            </ul> -->
            <!-- <li><nuxt-link to="help/issues">Support</nuxt-link></li> -->
            <!-- all these services help in making a close knitted network of our community and help us root back to our history. -->
            <v-row>
                <v-col cols="12" md="7">
                    <v-card
                    
                    outlined
                    class="pa-6 rounded-lg"
                    to="help/getting_started"
                    :ripple="false"
                    >
                    Get started with gebbles
                    </v-card>
                </v-col>
                <v-col cols="12" md="7">
                        <v-card
                        
                        outlined
                        class="pa-6 rounded-lg"
                        to="help/thoughts"
                        :ripple="false"
                        >
                        Thoughts behind the project
                        </v-card>
                </v-col>
                <v-col cols="12" md="7">
                    <v-card
                    
                        outlined
                        class="pa-6 rounded-lg"
                        to="help/updates"
                        :ripple="false"
                        >
                        Updates
                    </v-card>
                </v-col>
                <v-col cols="12" md="7">
                    <v-card
                        
                        outlined
                        class="pa-6 rounded-lg"
                        to="/contact"
                        :ripple="false"
                        >
                        Contact
                    </v-card>
                </v-col>
                <v-col cols="12" md="7">
                    <v-card
                        
                        outlined
                        class="pa-6 rounded-lg"
                        to="/terms"
                        :ripple="false"
                        >
                        Terms of use
                    </v-card>
                </v-col>
                <v-col cols="12" md="7">
                    <v-card
                        
                        outlined
                        class="pa-6 rounded-lg"
                        to="/privacy"
                        :ripple="false"
                        >
                        Privacy
                    </v-card>
                </v-col>
            </v-row>
        </p>
    </v-container>
</v-app>
</template>
<script>
export default {
    methods: {
    }
}
</script>
<style scoped>
a{
    text-decoration: none;
}
a:hover{
  color: black;
}
.width{
    max-width: 670px;
  }
</style>