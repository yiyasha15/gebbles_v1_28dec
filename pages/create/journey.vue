<template>
    <v-app>
        <v-container class="mx-auto" style="max-width:550px;">
            <v-btn icon  @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <upload-journey-card></upload-journey-card>
    </v-app>
</template>
<script>
import UploadJourneyCard from '~/components/UploadJourneyCard.vue';

export default {
  components: { UploadJourneyCard },
    middleware : 'check_auth',
    layout:'simple',
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'gebbles - share journey',
        }
    },
    methods:{
        goback(){
            this.$store.dispatch("remove_editing_obj")
            window.history.back();
        },
    }
    }
</script>