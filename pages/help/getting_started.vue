<template>
<v-app>
    <v-container class="width mx-auto">
        <!-- <v-breadcrumbs class="px-2"
        divider="/"
        :items="items"></v-breadcrumbs> -->
        <h3 class="font-weight-medium d-inline">
           <v-icon size="36">mdi-flag-checkered</v-icon> Getting started
        </h3>
        <p class="grey--text text--darken-1 mt-3">
            Hello, what's up everybody.
            Before starting out .. 
        </p>
    </v-container>
</v-app>
</template>
<script>
export default {
    methods: {
    },
    data() {
        return{
        items: [
        {
            text: 'Help',
            href: '/help',
        },
        {
            text: 'Getting Started',
            href: '/help/getting_started',
        },
        ],
    }
    },
}
</script>
<style scoped>
.width{
    max-width: 670px;
}
a:hover{
  color: black;
}
a{
    text-decoration: none;
}
</style>