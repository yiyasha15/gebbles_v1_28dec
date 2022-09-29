<template>
    <v-app>
        <v-container class=" mx-auto" fluid style="max-width:550px" >
            <v-btn icon  @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <upload-video-card></upload-video-card>
        <!-- <p> all teachers</p>
        <ul v-for="t in usersTeachers" :key="t.id">
                <li>{{t}}</li>
        </ul>
        ---<br>
        --
        <p> cook_obj.taggedteachers</p>
        <ul v-for="t in cook_obj.taggedteachers" :key="t.id">
                <li>{{t}}</li>
        </ul>
        ---<br>
        <ul v-for="t in cook_obj.taggedteachers" :key="t.id">
                <li>{{t.shareidobj.id}}</li>
        </ul>
        --
        <p> selectedTeachers</p>
        <ul v-for="t in selectedTeachers" :key="t.id">
                <li>{{t}}</li>
        </ul>
        <ul v-for="t in selectedTeachers" :key="t.id">
                <li>{{typeof t}}</li>
        </ul> -->
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

