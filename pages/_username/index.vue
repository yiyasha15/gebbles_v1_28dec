<template>
    <v-app>
        <div v-if="artist.artist_name || artist.cover|| 
        artist.thumb|| artist.country || bio.style || bio.quote
        || artist.introduction || bio.crew || bio.ig || bio.fb || bio.site
        || bio.gallery1|| bio.gallery2 || bio.gallery3 || bio.gallery4 
        || bio.vid1 || bio.vid2 || bio.vid3 || bio.vid4 ">
        <div class="mb-4">
        <v-container class="w-1036">
            <v-row justify="end" class="hidden-xs-only">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn to="/create/website" small outlined
                      class="mx-3 my-sm-3"
                        elevation="0" 
                        v-bind="attrs"
                        v-on="on"
                        v-if="isAuthenticated && artist.username == loggedInUser.username">
                    <v-icon>mdi-account-edit-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Edit portfolio</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="openPayToArtistDialog" small outlined
                      class="mx-3 my-sm-3"
                        elevation="0" 
                        v-bind="attrs"
                        v-on="on"
                        v-if="isAuthenticated && artist.username != loggedInUser.username && hasPaymentInfo">
                    <v-icon size="22">mdi-hand-heart-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Support {{artist.username}}</span>
                </v-tooltip>
            </v-row>
            <v-row class="mt-0">
                <v-col cols="12" md="6">
                    <v-img contain
                    max-height="460"
                    :src = "artist.cover"></v-img>
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-content-center flex-wrap">
                    <v-card outlined v-if="artist.introduction"
                    max-width="492" max-height="460"
                    elevation="0" class="pa-sm-5 pa-3 overflow-y-auto mx-auto">
                    <h4 class="font-weight-light text-pre-wrap text-left">
                        {{ artist.introduction }}
                    </h4>
                    </v-card>
                </v-col>
            </v-row>
        <v-row v-if="bio.quote || bio.crew" class="my-md-12 my-8">
            <v-card max-width="750" class="text-center mx-auto px-5 background" elevation="0">
                <h5 class="font-weight-light font-italic mt-6">
                "{{ bio.quote }}" - {{artist.artist_name }} <country-flag class="pt-6" :country= 'artist.country' /> 
                </h5> 
                <h4 class="my-6 font-weight-medium" v-if="bio.crew">
                    {{bio.crew}}
                </h4>
            </v-card>
        </v-row>
        <v-row v-if="videoId1 || videoId2|| videoId3||videoId" class="mb-6" >
            <v-col
            v-if="videoId"
            class="d-flex child-flex px-5"
            cols="12" sm="6">
            <youtube style="max-width:100%; height:280px;" :video-id= 'videoId'></youtube>
            </v-col>
            <v-col
            v-if="videoId1"
            class="d-flex child-flex px-5"
            cols="12" sm="6">
            <youtube style="max-width:100%; height:280px;"  :video-id= 'videoId1'></youtube>
            </v-col>
            <v-col
            v-if="videoId2"
            class="d-flex child-flex px-5"
            cols="12" sm="6">
            <youtube style="max-width:100%; height:280px;"  :video-id= 'videoId2'></youtube>
            </v-col>
            <v-col
            v-if="videoId3"
            class="d-flex child-flex px-5"
            cols="12" sm="6">
            <youtube style="max-width:100%; height:280px;"  :video-id= 'videoId3'></youtube>
            </v-col>
        </v-row>
        <v-row >
            <v-col cols="12" class="mb-md-6 my-0">
                <h2 v-if="bio.ig || bio.fb|| bio.site || bio.yt" align="center" justify="center" style="font-size: 2.5rem;" class="grey--text text--darken-3">contact</h2>
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
        </div>
        <div v-else-if="isAuthenticated && loggedInUser.username==artist.username" class="mt-16 px-2">
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h5 class="mt-8 mb-2">Hi {{artist.username}}, let's make your portfolio.</h5>
                <nuxt-link :to="'/create/website/'" class="text-decoration-none"><h5 class="icon">Edit Portfolio <v-icon dense class="icon">mdi-chevron-right</v-icon></h5></nuxt-link>
            </center> 
        </div>
        <div v-else class="mt-16 px-2">
            <center>
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h5>{{artist.username}} has not updated the portfolio yet. </h5>
            </center>   
        </div>
        <v-dialog v-model="payToArtistDialog" width="450">
            <v-card class="pa-8 text-center">
                <img
                    :height="$vuetify.breakpoint.smAndDown ? 38 : 48"
                    class="clickable mt-8"
                    :src="require('@/assets/gebbleslogo_tab.png')"/>
                    <v-card-title class="justify-center">
                        <h3 class="font-weight-medium">Support {{artist.artist_name}}</h3>
                    </v-card-title>
                    <v-text-field outlined color="primary" v-if="!togglePay"
                    prepend-icon="mdi-currency-usd"
                            v-model="supportAmount"
                    ></v-text-field>
                    <p v-else>Pay {{supportAmount}} to {{artist.artist_name}}</p>
                    <!-- <v-spacer></v-spacer> -->
                    <v-btn class="px-4 text-decoration-none" small color="primary" dark 
                        @click="payAmount()">Pay</v-btn>
                    <v-btn color="black" class="px-4 text-decoration-none" small outlined  @click="payToArtistDialog = false">
                        Cancel
                    </v-btn>
            </v-card>
        </v-dialog>
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
        ...mapGetters(['isAuthenticated', 'loggedInUser', 'usersBio','usersPortfolio',]),
        videoWidth () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 300
            case 'sm': return 300
            case 'md': return 450
            case 'lg': return 450
            case 'xl': return 450
            }
        },
        videoHeight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 160
          case 'sm': return 160
          case 'md': return 250
          case 'lg': return 250
          case 'xl': return 250
        }
      },
    },
    scrollToTop: true,
    data () {
      return {
            videoId:'',
            videoId1:'',
            videoId2:'',
            videoId3:'',
            style:'',
            supportAmount:10,
            hasPaymentInfo:true,
            payToArtistDialog:false,
            togglePay:false
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
    props: ["artist", "bio"],
    components:{
        CountryFlag,
        Youtube
    },
    methods:{
        openPayToArtistDialog(){
            //save PayTo details
            this.payToArtistDialog = true
        },
        payAmount(){
            this.togglePay = !this.togglePay;
            console.log("pay to artist", this.supportAmount);
        },
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
iframe{
    height:250px;
    width:450px;
}
.v-icon:hover{
    color: #815A44;
}
.w-1036{
    max-width: 1036px !important;
}
</style>