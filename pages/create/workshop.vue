<template>
    <v-app>
        <v-container class="mx-auto" style="max-width:550px;">
            <v-btn icon  @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <upload-workshop-card></upload-workshop-card>
    </v-app>
</template>
<script>
import UploadWorkshopCard from '~/components/UploadWorkshopCard.vue';
export default {
  components: { UploadWorkshopCard },
    middleware : 'check_auth',
    layout:'simple',
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'gebbles - create workshop',
        }
    },
    methods:{
        goback(){
            this.$store.dispatch("remove_editing_workshop_obj")
            window.history.back();
        }
    }
}
</script>