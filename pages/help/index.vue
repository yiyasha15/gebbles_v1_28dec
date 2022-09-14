<template>
<v-app>
    <v-container class="width">
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <h3 class="font-weight-medium d-inline">
            A quick walk-around
        </h3>
        <p class="my-2">
            <ul>
                <li><nuxt-link to="help/getting_started">Get started with gebbles</nuxt-link></li>
                <li><nuxt-link to="help/thoughts">Thoughts behind the process</nuxt-link>
                </li>
                <li><nuxt-link to="help/updates">(Upcoming) Updates</nuxt-link></li>
                <li><nuxt-link to="help/issues">Support</nuxt-link>
                </li>
                <!-- <li>all these services help in making a close knitted network of our community and help us root back to our history.
                </li> -->
            </ul>
        </p>
    </v-container>
</v-app>
</template>
<script>
export default {
    methods: {
        goback(){
            window.history.back();
        },
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