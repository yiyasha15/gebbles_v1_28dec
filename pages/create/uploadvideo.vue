<template>
    <v-app>
        <v-container class=" mx-auto" fluid style="max-width:550px" >
            <v-btn icon  @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <upload-video-card></upload-video-card>
    </v-app>
</template>

<script>
import UploadVideoCard from '~/components/UploadVideoCard.vue';
export default {
  components: { UploadVideoCard },
head() {
    return {
        title: 'gebbles - upload video',     //do not miss "this"
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'What you need to know about this e1t1 #'
            }
        ]
    }
},
middleware : 'check_auth',
layout:'simple',
methods:{
    goback(){
        this.$store.dispatch("remove_cook_obj");
        window.history.back();
    }
}
}
</script>

