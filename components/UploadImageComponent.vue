<template>
    <div>
        <v-row class="pb-3 justify-center text-center">
            <croppa
                :accept="'image/*'"
                v-model="cropImage"
                canvas-color="transparent"
                :width="350"
                :height="350"
                placeholder="Upload an image"
                :show-loading="true"
                :initial-image="initialImage"
                :prevent-white-space="true"
                :show-remove-button="false"
            ></croppa>
        </v-row>
        <v-row class="w-350">
            <v-btn icon @click="cropImage.rotate()">
                <v-icon>mdi-file-rotate-right-outline</v-icon>
            </v-btn>
            <v-btn icon @click="cropImage.flipX()">
                <v-icon>mdi-flip-horizontal</v-icon>
            </v-btn>
            <v-btn icon @click="cropImage.remove()">
                <v-icon >mdi-close</v-icon>
            </v-btn>
        </v-row>
        <v-divider class="hidden-sm-and-up mt-2"></v-divider>
    </div>
</template>
<script>
import Vue from "vue";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
Vue.use(Croppa);

export default {
data(){
    return {
        cropImage: null, //imagecropper
        initialImage:'',
    }
},
methods: {
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
        u8arr[n] = bstr.charCodeAt(n);
        }
    return new File([u8arr], filename, {type:mime});
    },
}
}
</script>
<style scoped>
.canvas{
    width: 100%;
}
.w-350{
    max-width: 350px;
    margin: auto;
    padding-top: 10px;
}
</style>