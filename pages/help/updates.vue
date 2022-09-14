<template>
<v-app>
    <v-container class="width">
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <h3 class="font-weight-medium d-inline">
           Updates
        </h3>
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