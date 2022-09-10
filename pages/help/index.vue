<template>
<v-app>
    <v-container class="width">
        <upload-image-component @newimage="getUrl" @removeimage="removeUrl"></upload-image-component>
        <!-- help page: {{url}} -->
        <v-btn icon @click="dataurl">
                <v-icon>mdi-help</v-icon>
            </v-btn>
    </v-container>
</v-app>
</template>
<script>
import UploadImageComponent from '~/components/UploadImageComponent.vue'
export default {
    components:{
        UploadImageComponent

    },
    data(){
        return{
            url:'',
            // remove:''
        }
    },
    methods:{
        dataurl(){
            let a =this.url.generateDataUrl()
            console.log(a);
        },
        getUrl(url){
            this.url = url
            console.log("got url in help",url);
        },
        removeUrl(){
            console.log("remove url at help");
        }

    }
}
</script>