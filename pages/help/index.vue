<template>
<v-app>
    <v-container class="width">
        <h1 class="my-3">Guide</h1>
        <p>Hi there, welcome to gebbles! </p>
        <p>
            <ul>
                <li><nuxt-link to="/help/getting_started"> Getting Started @gebbles.io</nuxt-link></li>
                <li><nuxt-link to="/help/thoughts">Thoughts behind this project</nuxt-link></li>
                <li><nuxt-link to="/help/updates">(Upcoming) Updates</nuxt-link></li>
                <li><nuxt-link to="/help/issues">Known Issues</nuxt-link></li>
                <li><nuxt-link to="/terms">Code of Conduct</nuxt-link></li>
                <li><nuxt-link to="/privacy">Privacy Policy</nuxt-link></li>
            </ul>
        </p>
    </v-container>
</v-app>
</template>
<style scoped>
.width{
    max-width: 1024px;
}
a:hover{
  color: black;
}
a{
    text-decoration: none;
}
</style>