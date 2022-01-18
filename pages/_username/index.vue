<template>
    <v-app>
        <div v-if="artist.artist_name || artist.cover|| 
        artist.thumb|| artist.country || bio.style || bio.quote
        || bio.introduction || bio.crew || bio.ig || bio.fb || bio.site
        || bio.gallery1|| bio.gallery2 || bio.gallery3 || bio.gallery4 
        || bio.vid1 || bio.vid2 || bio.vid3 || bio.vid4 || 
        usersPortfolio.artist_name || usersPortfolio.cover|| 
        usersPortfolio.thumb|| usersPortfolio.country || usersBio.style || usersBio.quote
        || usersBio.introduction || usersBio.crew || usersBio.ig || usersBio.fb || usersBio.site
        || usersBio.gallery1|| usersBio.gallery2 || usersBio.gallery3 || usersBio.gallery4 
        || usersBio.vid1 || usersBio.vid2 || usersBio.vid3 || usersBio.vid4">
        <div v-if="isAuthenticated && loggedInUser.user.username==artist.username" class="mb-6">
        <center v-if="usersPortfolio.cover">
            <v-img
            class="hidden-md-and-up"
                height="300"
                :src = "usersPortfolio.cover"></v-img>
            <v-img
            class="hidden-sm-and-down"
                height="700"
                :src = "usersPortfolio.cover"></v-img>
        </center>
        <br>
        <v-container>
        <v-row v-if="usersBio.introduction">
            <v-col cols="12" style="margin:auto; max-width:750px" class="my-md-6 pa-4">
                <h2 style="font-size: 2.5rem;" >about</h2><br>
                <h2 class="mb-5 font-weight-light" style="line-height:2;">
                    {{ usersBio.introduction }}
                </h2>
                <v-row >
                <v-col v-if="usersBio.crew" style="margin:auto; max-width:750px">
                    <h2 class="mb-2 " >
                        Representing: {{usersBio.crew}}
                    </h2>
                </v-col>
            </v-row>
            <v-row v-if="usersBio.quote" class="mt-16 mb-6">
                <v-col align="center">
                <h3 class="font-weight-light font-italic">
                "{{ usersBio.quote }}" - {{usersPortfolio.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
                </h3> </v-col>
            </v-row>
            </v-col>
        </v-row>
        </v-container>
        <v-container>
        <v-row v-if="videoId1 || videoId2|| videoId3||videoId" class="mb-6">
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
            <v-btn v-if="usersBio.ig" icon class="text-decoration-none mx-4" color="indigo"  @click="openig" >
                <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn v-if="usersBio.fb" icon class="text-decoration-none mx-4" color="indigo"  @click="openfb" >
                <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn v-if="usersBio.site" icon class="text-decoration-none mx-4" color="indigo"  @click="openpersonal" >
                <v-icon>mdi-email</v-icon>
            </v-btn>
        </v-row>
        </v-container>
        </div>
        <div v-else class="mb-4"> 
        <center v-if="artist.cover">
            <v-img
            class="hidden-md-and-up"
                height="300"
                :src = "artist.cover"></v-img>
            <v-img
            class="hidden-sm-and-down"
                height="700"
                :src = "artist.cover"></v-img>
        </center>
        <br>
        <v-container>
        <v-row v-if="bio.introduction">
            <v-col cols="12" style="margin:auto; max-width:750px" class="my-md-6 pa-4">
                <h2 style="font-size: 2.5rem;" >about</h2><br>
                <h2 class="mb-5 font-weight-light" style="line-height:2;">
                    {{ bio.introduction }}
                </h2>
                <v-row >
                <v-col v-if="bio.crew" style="margin:auto; max-width:750px">
                    <h2 class="mb-2 " >
                        Representing: {{bio.crew}}
                    </h2>
                </v-col>
            </v-row>
            <v-row v-if="bio.quote" class="mt-16 mb-6">
                <v-col align="center">
                <h3 class="font-weight-light font-italic">
                "{{ bio.quote }}" - {{artist.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
                </h3> </v-col>
            </v-row>
            </v-col>
        </v-row>
        <v-row v-if="videoId1 || videoId2|| videoId3||videoId" class="my-6">
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
                <h2 v-if="bio.ig || bio.fb|| bio.site" align="center" justify="center" style="font-size: 5rem;" >contact</h2>
            </v-col>
        </v-row>
        <v-row class="mt-4" align="center" justify="center">
            <v-btn v-if="bio.ig" icon class="text-decoration-none mx-4" color="indigo"  @click="openig" >
                <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn v-if="bio.fb" icon class="text-decoration-none mx-4" color="indigo"  @click="openfb" >
                <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn v-if="bio.site" icon class="text-decoration-none mx-4" color="indigo"  @click="openpersonal" >
                <v-icon>mdi-email</v-icon>
            </v-btn>
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
                <h3 class="font-weight-light font-italic">
                "{{ bio.quote }}" - {{artist.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
                </h3>    
            </v-container>
            </v-col> -->
            <!-- :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-4': $vuetify.breakpoint.mdAndUp}" -->
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
                <h3 class="font-weight-light font-italic">
                "{{ bio.quote }}" - {{artist.artist_name }} <country-flag class="pt-4" :country= 'artist.country' /> 
                </h3>    
            </v-container>
        </center> -->
        </div>
        <div v-else class="mt-16 px-2">
            <div v-if="loggedInUser && loggedInUser.user.username == artist.username" >
            <!-- <img src = "~/assets/make_portfolio.png"  width="50%" alt="team"><br> -->
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h3 class="mt-8 mb-2">hi {{artist.username}}, let's make your portfolio.</h3>
                <nuxt-link :to="'/create/website/'" class="text-decoration-none"><h3 class="icon">Edit Portfolio <v-icon dense class="icon">mdi-chevron-right</v-icon></h3></nuxt-link>
            </center>
            </div>
            <div v-else >
                <center>
                    <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                <h3>{{artist.username}} has not updated the portfolio yet. </h3></center>
                <!-- <img src = "~/assets/no_portfolio.png"  width="50%" alt="team"> -->
            </div>
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
        let url1 =this.$props.bio.vid1 //getting value of youtube video urls
        let url2 = this.$props.bio.vid2
        let url3 = this.$props.bio.vid3
        let url4 = this.$props.bio.vid4
        let videoId = getIdFromURL(url1) //getting id from video url
        this.videoId = videoId //assigning the id to <youtube> video id
        let videoId1 = getIdFromURL(url2)
        this.videoId1 = videoId1
        let videoId2 = getIdFromURL(url3)
        this.videoId2 = videoId2
        let videoId3 = getIdFromURL(url4)
        this.videoId3 = videoId3
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