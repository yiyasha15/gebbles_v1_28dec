<template>
    <v-app>
        <v-container style="max-width:670px;">
            <h2 class="my-4">Dashboard</h2>
        </v-container>
    </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    data() {
      return {
      }
    },
    computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated', 'usersPortfolio']),
    },
    methods: {  
    }
}
</script>