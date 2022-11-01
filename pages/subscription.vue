<template>
    <v-app>
        <v-card max-width="330" class="mt-12 mx-auto">
            <!-- Memberships -->
            <v-btn @click="open"> Subscription</v-btn>
        </v-card>
    </v-app>
</template>
<script>
export default {
    methods:{
        open(){
            var url = "https://buy.stripe.com/test_fZe5lmf0ZfBK6hG3cd";
            var win = window.open(url, '_blank');
            win.focus();
        }
    }
}
</script>