<template>
    <v-app>
        <div v-if="artist.artist_name || artist.cover|| 
        artist.thumb|| artist.country || bio.style || bio.quote
        || artist.introduction || bio.crew || bio.ig || bio.fb || bio.site
        || bio.gallery1|| bio.gallery2 || bio.gallery3 || bio.gallery4 
        || bio.vid1 || bio.vid2 || bio.vid3 || bio.vid4 ">
        <div class="mb-4">
        <v-container style="max-width:1072px;">
        <v-row>
            <v-col cols="12" md="6" class="pt-sm-10 pl-md-0">
                <v-img contain
                max-height="560"
                :src = "artist.cover"></v-img>
            </v-col>
            <v-col cols="12" md="6" class="pr-md-0 w-560">
                <div class="d-flex justify-space-between mt-sm-6">
                <h2 style="font-size: 2.5rem;" class="mb-sm-6 " >about</h2>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn to="/create/website" small outlined
                        class="ma-2 mt-4"
                        elevation="0" 
                        v-bind="attrs"
                        v-on="on"
                        v-if="isAuthenticated && artist.username == loggedInUser.username">
                    <v-icon>mdi-account-edit-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Edit portfolio</span>
                  </v-tooltip>
                </div>
                <h4 class="mb-5 mr-sm-3 font-weight-light text-pre-wrap artist_about">
                    {{ artist.introduction }}
                </h4>
            </v-col>
        </v-row>
        <v-row v-if="bio.quote || bio.crew" class="mt-md-12 mb-md-6">
            <v-col align="center" style="margin:auto; max-width:750px">
            <h5 class="font-weight-light font-italic">
            "{{ bio.quote }}" - {{artist.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
            </h5> 
            <h4 class="my-6 font-weight-medium" v-if="bio.crew">
                {{bio.crew}}
            </h4>
            </v-col>
        </v-row>
        <v-row v-if="videoId1 || videoId2|| videoId3||videoId" class="mb-md-6 mt-md-12 mt-4 mb-4" >
            <template>
                <v-row>
                    <v-col
                    v-if="videoId"
                    class="d-flex child-flex"
                    cols="12" sm="6">
                    <youtube class="hidden-xs-only" aspect-ratio="1" :video-id= 'videoId'></youtube>
                    <youtube style="max-width:90%; margin:auto;height:auto;" class="hidden-sm-and-up" :video-id= 'videoId'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId1"
                    class="d-flex child-flex"
                    cols="12" sm="6">
                    <youtube class="hidden-xs-only" aspect-ratio="1" :video-id= 'videoId1'></youtube>
                    <youtube style="max-width:90%; margin:auto;height:auto;" class="hidden-sm-and-up" :video-id= 'videoId1'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId2"
                    class="d-flex child-flex"
                    cols="12" sm="6">
                    <youtube class="hidden-xs-only" aspect-ratio="1" :video-id= 'videoId2'></youtube>
                    <youtube style="max-width:90%; margin:auto;height:auto;" class="hidden-sm-and-up" :video-id= 'videoId2'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId3"
                    class="d-flex child-flex"
                    cols="12" sm="6">
                    <youtube class="hidden-xs-only" aspect-ratio="1" :video-id= 'videoId3'></youtube>
                    <youtube style="max-width:90%; margin:auto; height:auto;" class="hidden-sm-and-up" :video-id= 'videoId3'></youtube>
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
            <v-btn v-if="bio.work_email" class="text-decoration-none mx-2" color="black" icon @click="openemail" >
                <v-icon class="mr-1">mdi-email</v-icon>
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
        <div v-else-if="isAuthenticated && loggedInUser.username==artist.username" class="mt-16 px-2">
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
        },
        openemail(){
            var url = "mailto:"+this.bio.work_email;
            var win = window.open(url, '_blank');
            win.focus();
        }
    }
    
}
</script>
<style scoped>
.artist_about{
    line-height:1.8;
    text-align:justify;
    max-height: 456px;
    overflow: auto;
}
.v-icon:hover{
    color: #815A44;
}
.w560{
    max-width: 560px !important;
}
</style>