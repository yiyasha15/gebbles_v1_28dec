<template>
    <v-card max-width="330" class="mx-auto">
        <v-btn @click="open"> Support gebbles</v-btn>
    </v-card>
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