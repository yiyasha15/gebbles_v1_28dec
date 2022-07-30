<template>
    <v-card
        class="my-3"
        :to="'/whatiscooking/'+cook.id" 
        width="650" 
    >
    <video id="videoId" width="100%" height="410px" controls controlsList="nodownload" v-if="cook.video" class="hidden-xs-only">
        <source :src="cook.video" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <video id="videoId" width="100%" height="620px" controls controlsList="nodownload" v-if="cook.video" class="hidden-sm-and-up">
        <source :src="cook.video" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    </v-card>
</template>
<script>
    export default {
        head() {  
        return {
            title: "What's cookin",
            }
        },
        name: 'FeedCard',
        props: {
            cook: Object
        },
    }
</script>

