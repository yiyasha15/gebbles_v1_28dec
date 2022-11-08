<template>
    <div>
        <v-row class="pb-3 justify-center text-center">
            <croppa
                :accept="'image/*'"
                v-model="cropImage"
                canvas-color="transparent"
                :width="imgWidth"
                :height="imgHeight"
                placeholder="Upload an image"
                :show-loading="true"
                :initial-image="initialImage"
                initial-size="contain"
                :show-remove-button="false"
                @new-image="$emit('newimage',cropImage)"
                @image-remove="$emit('removeimage')">
            ></croppa>
        </v-row>
        <v-row class="w-350">
            <v-btn icon @click="cropImage.rotate();$emit('newimage',cropImage)">
                <v-icon>mdi-file-rotate-right-outline</v-icon>
            </v-btn>
            <v-btn icon @click="cropImage.flipX();$emit('newimage',cropImage)">
                <v-icon>mdi-flip-horizontal</v-icon>
            </v-btn>
            <v-btn icon @click="cropImage.remove();$emit('newimage',cropImage)">
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
    }
},
props:{
    initialImage:String,
    imgWidth: Number,
    imgHeight: Number 
},
methods: {
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