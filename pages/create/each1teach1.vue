<template>
<v-app>
    <v-container class="ma-24" style="max-width:550px;">
        <v-container class="mx-auto" fluid style="max-width:550px" >
            <v-btn icon  @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <upload-e-1-t-1-card></upload-e-1-t-1-card>
    </v-container>
</v-app>
</template>
<script>
import UploadE1T1Card from '~/components/UploadE1T1Card.vue';
export default {
  components: { UploadE1T1Card },
    middleware : 'check_auth',
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'gebbles - create e1t1',
        }
    },
    layout:'simple',
    methods: {
        goback(){
            this.$store.dispatch("remove_share_obj")
            window.history.back();
        },
    },
    }
</script>