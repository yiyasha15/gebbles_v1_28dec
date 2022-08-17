<template>
    <v-app>
        <!-- <div v-if=" isAuthenticated && loggedInUser.user.username==artist.username">
        <div v-if="usersPortfolio.artist_name || usersPortfolio.cover|| 
        usersPortfolio.thumb|| usersPortfolio.country || usersBio.style || usersBio.quote
        || usersBio.introduction || usersBio.crew || usersBio.ig || usersBio.fb || usersBio.site
        || usersBio.gallery1|| usersBio.gallery2 || usersBio.gallery3 || usersBio.gallery4 
        || usersBio.vid1 || usersBio.vid2 || usersBio.vid3 || usersBio.vid4" class="mb-6">
        <center v-if="usersPortfolio.cover">
            <v-img
            class="hidden-md-and-up"
                height="550"
                :src = "usersPortfolio.cover"></v-img>
        </center>
        <v-container style="max-width:1072px;">
        <v-row class="hidden-sm-and-down">
            <v-col cols="6" class="pt-10 pl-0">
                <v-img
                height="700"
                :src = "usersPortfolio.cover"></v-img>
            </v-col>
            <v-col cols="6" class="pr-0">
                <h2 style="font-size: 2.5rem;" class="mb-12 pt-6 " >about</h2>
                <div style="
                        height:522px;
                        overflow-x: hidden;
                        overflow-y: auto;
                        text-align:justify;">
                <h5 class="mb-5 font-weight-light" style="line-height:1.7em;text-align:justify;">
                    {{ bio.introduction }}
                </h5></div>
                <h5 class="mb-2 mt-12" v-if="bio.crew">
                    Representing: {{bio.crew}}
                </h5>
            </v-col>
        </v-row>
        <v-row v-if="usersBio.introduction" class="hidden-md-and-up">
            <v-col cols="12" class="my-md-6 pa-4">
                <h2 style="font-size: 2.5rem;" >about</h2><br>
                <h5 class="mb-5 font-weight-light" style="line-height:2;text-align:justify;">
                    {{ usersBio.introduction }}
                </h5>
                <v-row >
                <v-col v-if="usersBio.crew"  class="hidden-md-and-up">
                    <h5 class="mb-2 ">
                        Representing: {{usersBio.crew}}
                    </h5>
                </v-col>
            </v-row>
            <v-row v-if="usersBio.quote" class="mt-16 mb-6">
                <v-col align="center">
                <h5 class="font-weight-light font-italic">
                "{{ usersBio.quote }}" - {{usersPortfolio.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
                </h5> </v-col>
            </v-row>
            </v-col>
        </v-row>
        <v-row v-if="videoId1 || videoId2|| videoId3||videoId" class="mt-16">
            <template>
                <v-row>
                    <v-col
                    v-if="videoId"
                    class="d-flex child-flex"
                    cols="12" md="6">
                    <youtube aspect-ratio="1" :video-id= 'videoId'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId1"
                    class="d-flex child-flex"
                    cols="12" md="6">
                    <youtube  aspect-ratio="1" :video-id= 'videoId1'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId2"
                    class="d-flex child-flex"
                    cols="12" md="6">
                    <youtube aspect-ratio="1" :video-id= 'videoId2'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId3"
                    class="d-flex child-flex"
                    cols="12" md="6">
                    <youtube aspect-ratio="1" :video-id= 'videoId3'></youtube>
                    </v-col>
                </v-row>
            </template>
        </v-row>
        <v-row >
            <v-col cols="12" class="my-6" style="margin:auto; max-width:650px">
                <h2 v-if="usersBio.ig || usersBio.fb|| usersBio.site" align="center" class="hidden-sm-and-down" style="font-size: 5rem;" >contact</h2>
                <h2 v-if="usersBio.ig || usersBio.fb|| usersBio.site" align="center" class="hidden-md-and-up" style="font-size: 2.5rem;" >contact</h2>
            </v-col>
        </v-row>
        <v-row class="mt-4" align="center" justify="center">
            <v-btn v-if="usersBio.ig" icon class="text-decoration-none mx-4" color="black"  @click="openig" >
                <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn v-if="usersBio.fb" icon class="text-decoration-none mx-4" color="black"  @click="openfb" >
                <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn v-if="usersBio.site" icon class="text-decoration-none mx-4" color="black"  @click="openpersonal" >
                <v-icon>mdi-email</v-icon>
            </v-btn>
        </v-row>
        </v-container>
        </div>
        <div v-else>
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h5 class="mt-8 mb-2">hi {{artist.username}}, let's make your portfolio.</h5>
                <nuxt-link :to="'/create/website/'" class="text-decoration-none"><h5 class="icon">Edit Portfolio <v-icon dense class="icon">mdi-chevron-right</v-icon></h5></nuxt-link>
            </center>
        </div>
        </div> -->
        <div v-if="artist.artist_name || artist.cover|| 
        artist.thumb|| artist.country || bio.style || bio.quote
        || artist.introduction || bio.crew || bio.ig || bio.fb || bio.site
        || bio.gallery1|| bio.gallery2 || bio.gallery3 || bio.gallery4 
        || bio.vid1 || bio.vid2 || bio.vid3 || bio.vid4 ">
        <div class="mb-4">
        <center v-if="artist.cover">
            <v-img
            class="hidden-md-and-up"
                height="350"
                :src = "artist.cover"></v-img>
        </center>
        <v-container style="max-width:1072px;">
        <v-row class="hidden-sm-and-down">
            <v-col cols="6" class="pt-10 pl-0">
                <v-img
                height="530"
                :src = "artist.cover"></v-img>
            </v-col>
            <v-col cols="6" class="pr-0">
               
                <h2 style="font-size: 2.5rem;" class="mb-6 pt-4 " >about</h2>
                 <!-- <pre> -->
                     <div style=" 
                        height:456px;
                        overflow-x: hidden;
                        overflow-y: auto;
                        text-align:justify;">
                <h4 class="mb-5 font-weight-light text-pre-wrap" style="line-height:1.7em;text-align:justify;">
                    {{ artist.introduction }}
                </h4></div>
                <!-- </pre> -->
                <!-- <h4 class="mb-2 mt-12 font-weight-medium" v-if="bio.crew">
                    Representing: {{bio.crew}}
                </h4> -->
            </v-col>
        </v-row>
        <v-row v-if="artist.introduction" class="hidden-md-and-up">
            <v-col cols="12" class="my-md-6 pa-4">
                <h2 style="font-size: 2.0rem;" >about</h2>
                    <h5 class="mb-md-5 mt-2 font-weight-light text-pre-wrap" style="line-height:2;text-align:justify;">
                    {{ artist.introduction }}
                </h5>
                </v-col>
        </v-row>
        <!-- <v-row v-if="bio.crew" class="hidden-md-and-up" >
            <v-col v-if="bio.crew">
                <h4 >
                    {{bio.crew}}
                </h4>
            </v-col>
        </v-row> -->
        <v-row v-if="bio.quote" class="mt-md-8 mb-md-6">
            <v-col align="center" style="margin:auto; max-width:750px">
            <h5 class="font-weight-light font-italic">
            "{{ bio.quote }}" - {{artist.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
            </h5> 
            <h4 class="my-6 font-weight-medium" v-if="bio.crew">
                {{bio.crew}}
            </h4>
            </v-col>
        </v-row>
        <v-row v-if="videoId1 || videoId2|| videoId3||videoId" class="mb-md-6 mt-md-16 mt-4 mb-4" >
            <template>
                <v-row>
                    <v-col
                    v-if="videoId"
                    class="d-flex child-flex"
                    cols="12" md="6">
                    <youtube class="hidden-sm-and-down" aspect-ratio="1" :video-id= 'videoId'></youtube>
                    <youtube style="max-width:90%; margin:auto;height:auto;" class="hidden-md-and-up" :video-id= 'videoId'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId1"
                    class="d-flex child-flex"
                    cols="12" md="6">
                    <youtube class="hidden-sm-and-down" aspect-ratio="1" :video-id= 'videoId1'></youtube>
                    <youtube style="max-width:90%; margin:auto;height:auto;" class="hidden-md-and-up" :video-id= 'videoId1'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId2"
                    class="d-flex child-flex"
                    cols="12" md="6">
                    <youtube class="hidden-sm-and-down" aspect-ratio="1" :video-id= 'videoId2'></youtube>
                    <youtube style="max-width:90%; margin:auto;height:auto;" class="hidden-md-and-up" :video-id= 'videoId2'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId3"
                    class="d-flex child-flex"
                    cols="12" md="6">
                    <youtube class="hidden-sm-and-down" aspect-ratio="1" :video-id= 'videoId3'></youtube>
                    <youtube style="max-width:90%; margin:auto; height:auto;" class="hidden-md-and-up" :video-id= 'videoId3'></youtube>
                    </v-col>
                </v-row>
            </template>
        </v-row>
        <v-row >
            <v-col cols="12" class="my-md-6 my-0">
                <h2 v-if="bio.ig || bio.fb|| bio.site" align="center" justify="center" style="font-size: 2.5rem;" >contact</h2>
            </v-col>
        </v-row>
        <v-row class="mb-md-12 mb-6" align="center" justify="center">
            <v-btn v-if="bio.ig"  class="text-decoration-none mx-2" color="black" icon @click="openig" >
                <v-icon class="mr-1">mdi-instagram</v-icon>
            </v-btn>
            <!-- <span v-if="bio.ig">{{bio.ig}}</span> -->
            <v-btn v-if="bio.fb" class="text-decoration-none mx-2" color="black" icon @click="openfb" >
                <v-icon class="mr-1">mdi-facebook</v-icon>
            </v-btn>
            <v-btn v-if="bio.yt" class="text-decoration-none mx-2" color="black" icon @click="openyt" >
                <v-icon class="mr-1">mdi-youtube</v-icon>
            </v-btn>
            <!-- <span v-if="bio.fb">{{bio.fb}}</span> -->
            <v-btn v-if="bio.site" class="text-decoration-none mx-2" color="black" icon @click="openpersonal" >
                <v-icon class="mr-1">mdi-earth</v-icon>
            </v-btn> 
            <!-- <a v-if="bio.site" @click="openpersonal">{{bio.site}}</a> -->
        </v-row>
        </v-container>
        </div>
        <!-- <v-row v-if="bio.quote  &&bio.gallery1 " align="center" class="my-6">
            <v-col align="center" justify="center"
            cols="12">
            <v-container >
                <h2 class="mb-2 " >
                        How hiphop empowers me?
                    </h2>
                <h5 class="font-weight-light font-italic">
                "{{ bio.quote }}" - {{artist.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
                </h5>    
            </v-container>
            </v-col> -->
            <!-- <v-col cols="12" md="6" >
                <v-row>
                    <v-col v-if="bio.gallery1"
                    class="d-flex child-flex"
                    cols="6"
                    >
                    <v-img
                        :src="bio.gallery1"
                        :lazy-src="bio.gallery1"
                        aspect-ratio="1" >
                    </v-img>
                    </v-col>
                    <v-col v-if="bio.gallery2"
                    class="d-flex child-flex"
                    cols="6"
                    >
                    <v-img
                        :src="bio.gallery2"
                        :lazy-src="bio.gallery2"
                        aspect-ratio="1" >
                    </v-img>
                    </v-col>
                    <v-col v-if="bio.gallery3"
                    class="d-flex child-flex"
                    cols="6"
                    >
                    <v-img
                        :src="bio.gallery3"
                        :lazy-src="bio.gallery3"
                        aspect-ratio="1">
                    </v-img>
                    </v-col>
                    <v-col v-if="bio.gallery4"
                    class="d-flex child-flex"
                    cols="6"
                    >
                    <v-img
                        :src="bio.gallery4"
                        :lazy-src="bio.gallery4"
                        aspect-ratio="1">
                    </v-img>
                    </v-col>
                </v-row>
            </v-col> -->
        <!-- </v-row> -->
        <!-- <center class="my-6">
            <v-col cols="12" md="6" v-if="!bio.quote && bio.gallery1">
                <v-row>
                    <v-col v-if="bio.gallery1"
                    class="d-flex child-flex"
                    cols="6"
                    >
                    <v-img
                        :src="bio.gallery1"
                        :lazy-src="bio.gallery1"
                        aspect-ratio="1" >
                    </v-img>
                    </v-col>
                    <v-col v-if="bio.gallery2"
                    class="d-flex child-flex"
                    cols="6"
                    >
                    <v-img
                        :src="bio.gallery2"
                        :lazy-src="bio.gallery2"
                        aspect-ratio="1">
                    </v-img>
                    </v-col>
                    <v-col v-if="bio.gallery3"
                    class="d-flex child-flex"
                    cols="6"
                    >
                    <v-img
                        :src="bio.gallery3"
                        :lazy-src="bio.gallery3"
                        aspect-ratio="1" >
                    </v-img>
                    </v-col>
                    <v-col v-if="bio.gallery4"
                    class="d-flex child-flex"
                    cols="6"
                    >
                    <v-img
                        :src="bio.gallery4"
                        :lazy-src="bio.gallery4"
                        aspect-ratio="1">
                    </v-img>
                    </v-col>
                </v-row>
            </v-col>
             <v-container v-if="!bio.gallery1 &&!bio.gallery2 && !bio.gallery3 && !bio.gallery4 && bio.quote">
                <h5 class="font-weight-light font-italic">
                "{{ bio.quote }}" - {{artist.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
                </h5>    
            </v-container>
        </center> -->
        </div>
        <div v-else-if="isAuthenticated && loggedInUser.user.username==artist.username" class="mt-16 px-2">
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h5 class="mt-8 mb-2">hi {{artist.username}}, let's make your portfolio.</h5>
                <nuxt-link :to="'/create/website/'" class="text-decoration-none"><h5 class="icon">Edit Portfolio <v-icon dense class="icon">mdi-chevron-right</v-icon></h5></nuxt-link>
            </center> 
        </div>
        <div v-else class="mt-16 px-2">
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h5>{{artist.username}} has not updated the portfolio yet. </h5>
            </center>   
        </div>
    </v-app>
</template>
<script>
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
export default {
    head() {
        return {
            title: this.artist.username,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.name
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'usersBio','usersPortfolio',])
    },
    scrollToTop: true,
    data () {
      return {
            videoId:'',
            videoId1:'',
            videoId2:'',
            videoId3:'',
            style:''
      }
    },
    created(){
        // this.$store.dispatch("remove_portfolio")
        let url1 =this.$props.bio.vid1 //getting value of youtube video urls
        let url2 = this.$props.bio.vid2
        let url3 = this.$props.bio.vid3
        let url4 = this.$props.bio.vid4
        if(url1)
        this.videoId = getIdFromURL(url1) //getting id from video url
        if(url2)
        this.videoId1 = getIdFromURL(url2)
        if(url3)
        this.videoId2 = getIdFromURL(url3)
        if(url4)
        this.videoId3 = getIdFromURL(url4)
    },
    // layout: 'username',
    props: ["artist", "bio"],
    components:{
        CountryFlag,
        Youtube
    },
    methods:{
        goback(){
            window.history.back();
        },
        openig(){
            var url = "https://www.instagram.com/"+this.bio.ig;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openfb(){
            var url = "https://www.facebook.com/"+this.bio.fb;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openyt(){
            var url = this.bio.yt;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openpersonal(){
            var url = this.bio.site;
            var win = window.open(url, '_blank');
            win.focus();
        }
    }
    
}
</script>
<style scoped>
</style>