<template>
    <v-app>
        <v-container class="mx-auto" style="max-width:550px;">
            <v-btn icon  @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <upload-event-card></upload-event-card>
    </v-app>
</template>
<script>
import UploadEventCard from '~/components/UploadEventCard.vue';
export default {
  components: { UploadEventCard },
    middleware : 'check_auth',
    layout:'simple',
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'gebbles - create event',
        }
    },
    methods: {
        goback(){
            this.$store.dispatch("remove_editing_event_obj")
            window.history.back();
        }
    }
    }
</script>