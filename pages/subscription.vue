<template>
    <v-app>
        <v-card elevation="0" max-width="670" class="mt-12 mx-auto pa-5">

            <v-card-actions>
            <v-btn @click="open" dark> Subscription</v-btn>
            </v-card-actions>
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