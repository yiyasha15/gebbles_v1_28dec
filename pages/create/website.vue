<template>
    <v-container style="max-width:1072px;">
        <div>
            <v-btn icon class="elevation-0 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </div>
            <h2 align="center" justify="center">Create your portfolio</h2>
        <!-- <v-divider class="mx-4" ></v-divider> -->
            <v-row  class="mt-md-8 mt-5">
                <!-- hidden-sm-and-down -->
            <v-col cols="12" md="6" sm="7" >
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
            </v-col>
            <v-col cols="12" md="6" sm="5">
                <v-form v-on:submit.prevent="submit_about">
                    <!-- <v-row class="py-4 justify-center text-center hidden-md-and-up">
                            <croppa
                                v-model="cropImage1"
                                canvas-color="transparent"
                                :width="320"
                                :height="320"
                                :show-loading="true"
                                :initial-image="initialImage"
                                :prevent-white-space="true"
                                :remove-button-color="'black'"
                            ></croppa>
                        </v-row> -->
                        <!-- <v-row class="py-4 justify-center text-center hidden-sm-and-down">
                        <croppa
                            v-model="cropImage"
                            canvas-color="transparent"
                            :width="580"
                            :height="580"
                            :show-loading="true"
                            :initial-image="initialImage"
                            :prevent-white-space="true"
                            :remove-button-color="'black'"
                        ></croppa></v-row> -->
                        <v-row>
                            <v-col cols="12" md="10">
                                <v-text-field
                                    required 
                                    v-model = "artist_data.artist_name"
                                    label="Artist Name"
                                    prepend-icon="mdi-account-edit-outline"
                                    :maxlength="255"
                                    clearable
                                    counter>
                                </v-text-field>
                                <v-autocomplete label="Representing(country)" v-model= "artist_data.country"
                                    :items="countries" prepend-icon="mdi-earth"
                                    item-text="name"
                                    item-value="code"
                                    required clearable
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                </v-form>
                <v-form v-on:submit.prevent="submit">
                    <v-row>
                        <v-col cols="12" md="10">
                            <v-textarea
                                clearable
                                v-model= "artist_data.introduction"
                                label="About *a little background">
                            </v-textarea>
                            <v-text-field
                                v-model= "bio.crew"
                                label="Crew you represent"
                                :maxlength="255"
                                counter
                                clearable>
                            </v-text-field>
                            <v-text-field
                                clearable
                                v-model= "bio.quote"
                                label="How does hiphop empower you?"
                                :maxlength="255"
                                counter>
                            </v-text-field>
                            <!-- <v-btn v-show="!inputInsta &&!bio.ig" icon color=pink @click="inputInsta=true"><v-icon>mdi-instagram</v-icon></v-btn> -->
                            <!-- @click:append="bio.ig=''; inputInsta=!inputInsta" -->
                            <v-text-field
                                prepend-icon="mdi-email"
                                v-model= "bio.work_email"
                                clearable
                                label="Contact email"
                                >
                            </v-text-field>
                            <v-text-field
                                :rules="websiteRules" 
                                prepend-icon="mdi-instagram"
                                v-model= "bio.ig"
                                clearable
                                label="Instagram ID"
                                :maxlength="255"
                                
                                >
                            </v-text-field>
                            <v-text-field
                                :rules="websiteRules" 
                                prepend-icon="mdi-facebook"
                                v-model= "bio.fb"
                                label="Facebook ID"
                                clearable
                                :maxlength="255"
                                >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="mdi-youtube"
                                v-model= "bio.yt"
                                label="Youtube channel link"
                                clearable>
                            </v-text-field>
                            <v-text-field
                            :error-messages="linkError"
                                prepend-icon="mdi-earth"
                                v-model= "bio.site"
                                label="Personal Website URL"
                                @change="checkLink"
                                clearable
                                >
                            </v-text-field>
                            <!-- <v-btn v-show="!bio.vid1 && !yt" icon color=red @click="yt=true"><v-icon>mdi-youtube</v-icon></v-btn> -->
                            <v-text-field
                                :error-messages="ytLinkError1"
                                color="red"
                                v-model= "bio.vid1"
                                label="YouTube video link"
                                prepend-icon="mdi-youtube"
                                clearable
                                @input="showYoutubeVideo(1)"
                                >
                            </v-text-field>
                            <v-text-field
                            :error-messages="ytLinkError2"
                            @input="showYoutubeVideo(2)"
                                color="red"
                                v-model= "bio.vid2"
                                label="YouTube video link"
                                prepend-icon="mdi-youtube"
                                clearable
                                >
                            </v-text-field>
                            <v-text-field
                            :error-messages="ytLinkError3"
                            @input="showYoutubeVideo(3)"
                                color="red"
                                v-model= "bio.vid3"
                                label="YouTube video link"
                                prepend-icon="mdi-youtube"
                                clearable
                                >
                            </v-text-field>
                            <v-text-field
                            :error-messages="ytLinkError4"
                            @input="showYoutubeVideo(4)"
                                color="red"
                                v-model= "bio.vid4"
                                label="YouTube video link"
                                prepend-icon="mdi-youtube"
                                clearable
                                >
                            </v-text-field>
                            <v-row class="my-1">
                                <v-col
                                v-if="videoId1"
                                class="d-flex child-flex"
                                cols="6">
                                <youtube width="auto" height="100%" :video-id= 'videoId1'></youtube>
                                </v-col>
                                <v-col
                                v-if="videoId2"
                                class="d-flex child-flex"
                                cols="6">
                                <youtube width="auto" height="100%" :video-id= 'videoId2'></youtube>
                                </v-col>
                                <v-col
                                v-if="videoId3"
                                class="d-flex child-flex"
                                cols="6">
                                <youtube width="auto" height="100%" :video-id= 'videoId3'></youtube>
                                </v-col>
                                <v-col
                                v-if="videoId4"
                                class="d-flex child-flex"
                                cols="6">
                                <youtube width="auto" height="100%" :video-id= 'videoId4'></youtube>
                                </v-col>
                            </v-row>
                            <v-btn v-if="!userHasBio && !userHasPortfolio" outlined small class="text-decoration-none"  color="black" dark
                                @click="submit" :loading="progressbar">Submit</v-btn>
                                <v-btn v-if="userHasBio && userHasPortfolio" small class="mt-2 mr-2 text-decoration-none" outlined  color="black" dark
                                @click="update" :loading="progressbar">Update</v-btn>
                            <v-dialog  v-model="dialog" width="500">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-if="userHasBio || userHasPortfolio" dark small color="error" class="mt-2 mr-2 text-decoration-none" 
                                v-bind="attrs" v-on="on">Delete Website</v-btn>
                            </template>
                            <v-card class="pa-4">
                                <p>Are you sure you want to delete your website?</p>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn small class="px-4 text-decoration-none"  color="error" dark :loading="delete_progressbar"
                                    @click="deleted">Delete</v-btn>
                                <v-btn color="black" small class="px-4 text-decoration-none"  dark outlined  @click="dialog = false">
                                    Cancel
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <!-- <v-col cols="12" md="6" class="lighten-4 rounded-xl  hidden-sm-and-down">
                <h3 class="my-4">Preview your website</h3>
                <v-col>
                    <v-row class="pb-6 justify-center text-center">
                        <h2 class="font-weight-light "> {{artist_data.artist_name}}</h2>
                        <v-spacer></v-spacer>
                        <v-btn v-if="artist_data.country " icon class="text-decoration-none" >
                            <country-flag :country= artist_data.country />
                        </v-btn>
                    </v-row> 
                    <v-row class="pb-6 justify-center text-center">
                        <croppa
                            v-model="cropImage"
                            canvas-color="transparent"
                            :width="580"
                            :height="580"
                            :show-loading="true"
                            :initial-image="initialImage"
                            :prevent-white-space="true"
                            :remove-button-color="'black'"
                        ></croppa>
                    </v-row>
                    </v-col>
                    <v-col>
                    <v-row class="pb-6 justify-center text-center">
                        <h5 class="font-weight-light text-center">{{bio.introduction}} </h5>
                    </v-row>
                    <v-row v-if="bio.quote" class="pb-6 justify-center text-center">
                        <h5 class="font-weight-light  text-center font-italic">"{{bio.quote}}" </h5>
                    </v-row>
                    <v-row v-if="bio.style" class="pb-6 justify-center text-center">
                        <h5 class="text-center font-weight-light  font-italic">{{bio.style}} </h5>
                    </v-row>
                    <v-row v-if="bio.crew" class="pb-6 justify-center text-center">
                        <h5 class="font-weight-light  text-center">Representing: {{bio.crew}} 🙏 </h5>
                    </v-row>
                    <v-row class="pb-6 justify-center text-center">
                        <v-col v-if="bio.ig"><v-icon>mdi-instagram</v-icon></v-col>
                        <v-col v-if="bio.fb"><v-icon>mdi-facebook</v-icon></v-col>
                        <v-col v-if="bio.site"><v-icon>mdi-email</v-icon></v-col>
                    </v-row>
                    </v-col>
                    <v-row >
                    <v-col
                    v-if="videoId1"
                    class="d-flex child-flex"
                    cols="6">
                    <youtube width="auto" height="100%" :video-id= 'videoId1'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId2"
                    class="d-flex child-flex"
                    cols="6">
                    <youtube width="auto" height="100%" :video-id= 'videoId2'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId3"
                    class="d-flex child-flex"
                    cols="6">
                    <youtube width="auto" height="100%" :video-id= 'videoId3'></youtube>
                    </v-col>
                    <v-col
                    v-if="videoId4"
                    class="d-flex child-flex"
                    cols="6">
                    <youtube width="auto" height="100%" :video-id= 'videoId4'></youtube>
                    </v-col>
                </v-row>
            </v-col> -->
        </v-row>
        <v-snackbar v-model="snackbar" >
            Changes saved successfully.
        </v-snackbar>
        <v-snackbar v-model="fill_image_snackbar">
            Please upload an image.
        </v-snackbar>
        <v-snackbar v-model="fill_intro_snackbar">
            Please fill your introduction.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">{{errortext}}
            gSome error occured. Please try again.
        </v-snackbar>
    </v-container>
</template>
<script>
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import Vue from "vue";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
Vue.use(Croppa);

export default {
middleware : 'check_auth',
components: {
    CountryFlag,
    Youtube
},
computed: {
    ...mapGetters(['usersBio', 'userHasBio', 'usersPortfolio', 'userHasPortfolio', 'loggedInUser'])
},
created(){
    this.$store.dispatch("check_user_portfolio");
    this.$store.dispatch("check_user_bio");
    if(this.userHasPortfolio)
    {
        this.artist_data = Object.assign({}, this.$store.getters.usersPortfolio);
        this.initialImage = this.artist_data.cover
    }
    if(this.userHasBio)
    {
        this.bio = Object.assign({}, this.$store.getters.usersBio);
        let url1 = this.bio.vid1 //getting value of youtube video urls
        let url2 = this.bio.vid2
        let url3 = this.bio.vid3
        let url4 = this.bio.vid4
        if(url1){let videoId1 = getIdFromURL(url1) //getting id from video url
        this.videoId1 = videoId1} //assigning the id to <youtube> video id
        if(url2){let videoId2 = getIdFromURL(url2)
        this.videoId2 = videoId2}
        if(url3){let videoId3 = getIdFromURL(url3)
        this.videoId3 = videoId3}
        if(url4){let videoId4 = getIdFromURL(url4)
        this.videoId4 = videoId4}
    }
    // console.log(this.usersPortfolio, this.usersBio);
},
data(){
    return {
        websiteRules: [
        v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed.',],
            // this is bio object
        bio: {
            username: this.$store.state.auth.user.user.username,
            style: "",
            quote: "",
            crew: "",
            ig: "",
            fb: "",
            yt:"",
            site: "",
            gallery1 : "",
            gallery2 : "",
            gallery3 : "",
            gallery4 : "",
            vid1:"",
            vid2:"",
            vid3:"",
            vid4:"",
            work_email:""
        },
        artist_data: {
            artist_name: "",
            username: this.$store.state.auth.user.user.username,
            country: "",
            cover: "",
            introduction: "",
            thumb:""
        },
        rm:"",
        cropImage: null, //imagecropper
        initialImage:'',
        dialog: false,
        styles: ['Breaking','HipHop', 'House', 'Locking', 'Popping','Experimental','Other', 'Still Exploring'],
        imageData: "",
        videoId1:'',
        videoId2:'',
        videoId3:'',
        videoId4:'',
        linkError:'',
        ytLinkError1:'',
        ytLinkError2:'',
        ytLinkError3:'',
        ytLinkError4:'',
        snackbar: false,
        error_snackbar: false,
        delete_progressbar:false,
        fill_image_snackbar:false,
        fill_intro_snackbar:false,
        overlay: false,
        progressbar: false,
        countries: [
            {"name": "Afghanistan", "code": "AF"},
            {"name": "Åland Islands", "code": "AX"},
            {"name": "Albania", "code": "AL"},
            {"name": "Algeria", "code": "DZ"},
            {"name": "American Samoa", "code": "AS"},
            {"name": "AndorrA", "code": "AD"},
            {"name": "Angola", "code": "AO"},
            {"name": "Anguilla", "code": "AI"},
            {"name": "Antarctica", "code": "AQ"},
            {"name": "Antigua and Barbuda", "code": "AG"},
            {"name": "Argentina", "code": "AR"},
            {"name": "Armenia", "code": "AM"},
            {"name": "Aruba", "code": "AW"},
            {"name": "Australia", "code": "AU"},
            {"name": "Austria", "code": "AT"},
            {"name": "Azerbaijan", "code": "AZ"},
            {"name": "Bahamas", "code": "BS"},
            {"name": "Bahrain", "code": "BH"},
            {"name": "Bangladesh", "code": "BD"},
            {"name": "Barbados", "code": "BB"},
            {"name": "Belarus", "code": "BY"},
            {"name": "Belgium", "code": "BE"},
            {"name": "Belize", "code": "BZ"},
            {"name": "Benin", "code": "BJ"},
            {"name": "Bermuda", "code": "BM"},
            {"name": "Bhutan", "code": "BT"},
            {"name": "Bolivia", "code": "BO"},
            {"name": "Bosnia and Herzegovina", "code": "BA"},
            {"name": "Botswana", "code": "BW"},
            {"name": "Bouvet Island", "code": "BV"},
            {"name": "Brazil", "code": "BR"},
            {"name": "British Indian Ocean Territory", "code": "IO"},
            {"name": "Brunei Darussalam", "code": "BN"},
            {"name": "Bulgaria", "code": "BG"},
            {"name": "Burkina Faso", "code": "BF"},
            {"name": "Burundi", "code": "BI"},
            {"name": "Cambodia", "code": "KH"},
            {"name": "Cameroon", "code": "CM"},
            {"name": "Canada", "code": "CA"},
            {"name": "Cape Verde", "code": "CV"},
            {"name": "Cayman Islands", "code": "KY"},
            {"name": "Central African Republic", "code": "CF"},
            {"name": "Chad", "code": "TD"},
            {"name": "Chile", "code": "CL"},
            {"name": "China", "code": "CN"},
            {"name": "Christmas Island", "code": "CX"},
            {"name": "Cocos (Keeling) Islands", "code": "CC"},
            {"name": "Colombia", "code": "CO"},
            {"name": "Comoros", "code": "KM"},
            {"name": "Congo", "code": "CG"},
            {"name": "Congo, The Democratic Republic of the", "code": "CD"},
            {"name": "Cook Islands", "code": "CK"},
            {"name": "Costa Rica", "code": "CR"},
            {"name": "Cote D'Ivoire", "code": "CI"},
            {"name": "Croatia", "code": "HR"},
            {"name": "Cuba", "code": "CU"},
            {"name": "Cyprus", "code": "CY"},
            {"name": "Czech Republic", "code": "CZ"},
            {"name": "Denmark", "code": "DK"},
            {"name": "Djibouti", "code": "DJ"},
            {"name": "Dominica", "code": "DM"},
            {"name": "Dominican Republic", "code": "DO"},
            {"name": "Ecuador", "code": "EC"},
            {"name": "Egypt", "code": "EG"},
            {"name": "El Salvador", "code": "SV"},
            {"name": "Equatorial Guinea", "code": "GQ"},
            {"name": "Eritrea", "code": "ER"},
            {"name": "Estonia", "code": "EE"},
            {"name": "Ethiopia", "code": "ET"},
            {"name": "Falkland Islands (Malvinas)", "code": "FK"},
            {"name": "Faroe Islands", "code": "FO"},
            {"name": "Fiji", "code": "FJ"},
            {"name": "Finland", "code": "FI"},
            {"name": "France", "code": "FR"},
            {"name": "French Guiana", "code": "GF"},
            {"name": "French Polynesia", "code": "PF"},
            {"name": "French Southern Territories", "code": "TF"},
            {"name": "Gabon", "code": "GA"},
            {"name": "Gambia", "code": "GM"},
            {"name": "Georgia", "code": "GE"},
            {"name": "Germany", "code": "DE"},
            {"name": "Ghana", "code": "GH"},
            {"name": "Gibraltar", "code": "GI"},
            {"name": "Greece", "code": "GR"},
            {"name": "Greenland", "code": "GL"},
            {"name": "Grenada", "code": "GD"},
            {"name": "Guadeloupe", "code": "GP"},
            {"name": "Guam", "code": "GU"},
            {"name": "Guatemala", "code": "GT"},
            {"name": "Guernsey", "code": "GG"},
            {"name": "Guinea", "code": "GN"},
            {"name": "Guinea-Bissau", "code": "GW"},
            {"name": "Guyana", "code": "GY"},
            {"name": "Haiti", "code": "HT"},
            {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
            {"name": "Holy See (Vatican City State)", "code": "VA"},
            {"name": "Honduras", "code": "HN"},
            {"name": "Hong Kong", "code": "HK"},
            {"name": "Hungary", "code": "HU"},
            {"name": "Iceland", "code": "IS"},
            {"name": "India", "code": "IN"},
            {"name": "Indonesia", "code": "ID"},
            {"name": "Iran, Islamic Republic Of", "code": "IR"},
            {"name": "Iraq", "code": "IQ"},
            {"name": "Ireland", "code": "IE"},
            {"name": "Isle of Man", "code": "IM"},
            {"name": "Israel", "code": "IL"},
            {"name": "Italy", "code": "IT"},
            {"name": "Jamaica", "code": "JM"},
            {"name": "Japan", "code": "JP"},
            {"name": "Jersey", "code": "JE"},
            {"name": "Jordan", "code": "JO"},
            {"name": "Kazakhstan", "code": "KZ"},
            {"name": "Kenya", "code": "KE"},
            {"name": "Kiribati", "code": "KI"},
            {"name": "Korea, Democratic People'S Republic of", "code": "KP"},
            {"name": "Korea, Republic of", "code": "KR"},
            {"name": "Kuwait", "code": "KW"},
            {"name": "Kyrgyzstan", "code": "KG"},
            {"name": "Lao People'S Democratic Republic", "code": "LA"},
            {"name": "Latvia", "code": "LV"},
            {"name": "Lebanon", "code": "LB"},
            {"name": "Lesotho", "code": "LS"},
            {"name": "Liberia", "code": "LR"},
            {"name": "Libyan Arab Jamahiriya", "code": "LY"},
            {"name": "Liechtenstein", "code": "LI"},
            {"name": "Lithuania", "code": "LT"},
            {"name": "Luxembourg", "code": "LU"},
            {"name": "Macao", "code": "MO"},
            {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
            {"name": "Madagascar", "code": "MG"},
            {"name": "Malawi", "code": "MW"},
            {"name": "Malaysia", "code": "MY"},
            {"name": "Maldives", "code": "MV"},
            {"name": "Mali", "code": "ML"},
            {"name": "Malta", "code": "MT"},
            {"name": "Marshall Islands", "code": "MH"},
            {"name": "Martinique", "code": "MQ"},
            {"name": "Mauritania", "code": "MR"},
            {"name": "Mauritius", "code": "MU"},
            {"name": "Mayotte", "code": "YT"},
            {"name": "Mexico", "code": "MX"},
            {"name": "Micronesia, Federated States of", "code": "FM"},
            {"name": "Moldova, Republic of", "code": "MD"},
            {"name": "Monaco", "code": "MC"},
            {"name": "Mongolia", "code": "MN"},
            {"name": "Montserrat", "code": "MS"},
            {"name": "Morocco", "code": "MA"},
            {"name": "Mozambique", "code": "MZ"},
            {"name": "Myanmar", "code": "MM"},
            {"name": "Namibia", "code": "NA"},
            {"name": "Nauru", "code": "NR"},
            {"name": "Nepal", "code": "NP"},
            {"name": "Netherlands", "code": "NL"},
            {"name": "Netherlands Antilles", "code": "AN"},
            {"name": "New Caledonia", "code": "NC"},
            {"name": "New Zealand", "code": "NZ"},
            {"name": "Nicaragua", "code": "NI"},
            {"name": "Niger", "code": "NE"},
            {"name": "Nigeria", "code": "NG"},
            {"name": "Niue", "code": "NU"},
            {"name": "Norfolk Island", "code": "NF"},
            {"name": "Northern Mariana Islands", "code": "MP"},
            {"name": "Norway", "code": "NO"},
            {"name": "Oman", "code": "OM"},
            {"name": "Pakistan", "code": "PK"},
            {"name": "Palau", "code": "PW"},
            {"name": "Palestinian Territory, Occupied", "code": "PS"},
            {"name": "Panama", "code": "PA"},
            {"name": "Papua New Guinea", "code": "PG"},
            {"name": "Paraguay", "code": "PY"},
            {"name": "Peru", "code": "PE"},
            {"name": "Philippines", "code": "PH"},
            {"name": "Pitcairn", "code": "PN"},
            {"name": "Poland", "code": "PL"},
            {"name": "Portugal", "code": "PT"},
            {"name": "Puerto Rico", "code": "PR"},
            {"name": "Qatar", "code": "QA"},
            {"name": "Reunion", "code": "RE"},
            {"name": "Romania", "code": "RO"},
            {"name": "Russian Federation", "code": "RU"},
            {"name": "RWANDA", "code": "RW"},
            {"name": "Saint Helena", "code": "SH"},
            {"name": "Saint Kitts and Nevis", "code": "KN"},
            {"name": "Saint Lucia", "code": "LC"},
            {"name": "Saint Pierre and Miquelon", "code": "PM"},
            {"name": "Saint Vincent and the Grenadines", "code": "VC"},
            {"name": "Samoa", "code": "WS"},
            {"name": "San Marino", "code": "SM"},
            {"name": "Sao Tome and Principe", "code": "ST"},
            {"name": "Saudi Arabia", "code": "SA"},
            {"name": "Senegal", "code": "SN"},
            {"name": "Serbia and Montenegro", "code": "CS"},
            {"name": "Seychelles", "code": "SC"},
            {"name": "Sierra Leone", "code": "SL"},
            {"name": "Singapore", "code": "SG"},
            {"name": "Slovakia", "code": "SK"},
            {"name": "Slovenia", "code": "SI"},
            {"name": "Solomon Islands", "code": "SB"},
            {"name": "Somalia", "code": "SO"},
            {"name": "South Africa", "code": "ZA"},
            {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
            {"name": "Spain", "code": "ES"},
            {"name": "Sri Lanka", "code": "LK"},
            {"name": "Sudan", "code": "SD"},
            {"name": "Suriname", "code": "SR"},
            {"name": "Svalbard and Jan Mayen", "code": "SJ"},
            {"name": "Swaziland", "code": "SZ"},
            {"name": "Sweden", "code": "SE"},
            {"name": "Switzerland", "code": "CH"},
            {"name": "Syrian Arab Republic", "code": "SY"},
            {"name": "Taiwan, Province of China", "code": "TW"},
            {"name": "Tajikistan", "code": "TJ"},
            {"name": "Tanzania, United Republic of", "code": "TZ"},
            {"name": "Thailand", "code": "TH"},
            {"name": "Timor-Leste", "code": "TL"},
            {"name": "Togo", "code": "TG"},
            {"name": "Tokelau", "code": "TK"},
            {"name": "Tonga", "code": "TO"},
            {"name": "Trinidad and Tobago", "code": "TT"},
            {"name": "Tunisia", "code": "TN"},
            {"name": "Turkey", "code": "TR"},
            {"name": "Turkmenistan", "code": "TM"},
            {"name": "Turks and Caicos Islands", "code": "TC"},
            {"name": "Tuvalu", "code": "TV"},
            {"name": "Uganda", "code": "UG"},
            {"name": "Ukraine", "code": "UA"},
            {"name": "United Arab Emirates", "code": "AE"},
            {"name": "United Kingdom", "code": "GB"},
            {"name": "United States", "code": "US"},
            {"name": "United States Minor Outlying Islands", "code": "UM"},
            {"name": "Uruguay", "code": "UY"},
            {"name": "Uzbekistan", "code": "UZ"},
            {"name": "Vanuatu", "code": "VU"},
            {"name": "Venezuela", "code": "VE"},
            {"name": "Viet Nam", "code": "VN"},
            {"name": "Virgin Islands, British", "code": "VG"},
            {"name": "Virgin Islands, U.S.", "code": "VI"},
            {"name": "Wallis and Futuna", "code": "WF"},
            {"name": "Western Sahara", "code": "EH"},
            {"name": "Yemen", "code": "YE"},
            {"name": "Zambia", "code": "ZM"},
            {"name": "Zimbabwe", "code": "ZW"}
        ],
        errortext:''
    }
},
methods: {
    checkLink(){
        let urlLink = this.bio.site;
        if(urlLink){ //if link exists check if it's valid
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            let check = !!pattern.test(this.bio.site);
            if(check){
                let checkStartsHttp = urlLink.startsWith('http')
                // console.log( "checkStartsHttp", checkStartsHttp);
                if(!checkStartsHttp)
                {
                    this.bio.site = 'http://'+ this.bio.site
                    this.linkError=``
                    //add http to url
                }
            }
            else{
                this.linkError=`Enter a valid URL.`
            }
        }
    },
    ...mapActions(['check_user_bio','check_user_portfolio']),
    showYoutubeVideo(id){
        switch(id) {
        case 1:
            {
            let url= this.bio.vid1
            if (url && url != undefined && url != '') {        
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                var match = url.match(regExp);
                if (match && match[2].length == 11) {
                    // Do anything for being valid        
                    this.ytLinkError1 =``
                } else {
                    //invalid youtube url
                    this.ytLinkError1 = `Enter a valid Youtube URL.`
                }
                let videoId1 = getIdFromURL(url) //getting id from video url
                this.videoId1 = videoId1
            }
            else{
                this.bio.vid1 =''
                this.videoId1=''
            }
            }
            break;
        case 2:
            {
                let url= this.bio.vid2
                if (url && url != undefined && url != '') {        
                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    if (match && match[2].length == 11) {
                        // Do anything for being valid        
                        this.ytLinkError2 =``
                    } else {
                        //invalid youtube url
                        this.ytLinkError2 = `Enter a valid Youtube URL.`
                    }
                    let videoId2 = getIdFromURL(url) //getting id from video url
                    this.videoId2 = videoId2
                }else{
                this.bio.vid2 =''
                this.videoId2=''
            }
                
            }
            break;
        case 3:
            {
                let url= this.bio.vid3
                if (url && url != undefined && url != '') {        
                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    if (match && match[2].length == 11) {
                        // Do anything for being valid        
                        this.ytLinkError3 =``
                    } else {
                        //invalid youtube url
                        this.ytLinkError3 = `Enter a valid Youtube URL.`
                    }
                    let videoId3 = getIdFromURL(url) //getting id from video url
                    this.videoId3 = videoId3
                }else{
                this.bio.vid3 =''
                this.videoId3=''
            }
                
            }
            break;
        case 4:
            {
                let url= this.bio.vid4
                if (url && url != undefined && url != '') {        
                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    if (match && match[2].length == 11) {
                        // Do anything for being valid        
                        this.ytLinkError4 =``
                    } else {
                        //invalid youtube url
                        this.ytLinkError4 = `Enter a valid Youtube URL.`
                    }
                    let videoId4 = getIdFromURL(url) //getting id from video url
                    this.videoId4 = videoId4
                }else{
                this.bio.vid4 =''
                this.videoId4=''
            }
                
            }
            break;
        default:
            // code block
        }
    },
    goback(){
        window.history.back();
    },
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
        u8arr[n] = bstr.charCodeAt(n);
        }
    return new File([u8arr], filename, {type:mime});
    },
    async submit(){
        this.progressbar =true
        let url = this.cropImage.generateDataUrl();
        let fileData;
        if(this.artist_data.introduction!=""){
            if (!url ){
            this.fill_image_snackbar=true
            this.progressbar =false}
        else{
            fileData = this.dataURLtoFile(url, "coverimage.png");
            // this.artist_data.cover = fileData;
            let res = await this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1");
            if(res.statusCode == 200)
            {
                delete this.$axios.defaults.headers.common['Authorization']
                let filename = res.key
                let url = res.body
                url = url.slice(1, -1);
                this.$axios.$put(url, fileData).then((value) => {
                this.artist_data.cover = "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
                this.artist_data.thumb ="https://minithumbnails.s3.us-east-2.amazonaws.com/" + filename;
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token,
                        }
                };
                let formPortfolio = new FormData();
                let formBio= new FormData();
                //check if instagram and fb are okay..
                let rx_ig =/^(?:@|(?:https?:\/\/)?(?:www\.)?instagr(?:\.am|am\.com)\/)?(\w+)\/?$/;
                let rx_fb = /^(?:@|(?:https?:\/\/)?(?:www\.)?facebook(?:\.am|am\.com)\/)?(\w+)\/?$/;
                let ig_username = rx_ig.exec(this.bio.ig) 
                let fb_username = rx_fb.exec(this.bio.fb)
                // console.log(this.bio.ig,this.bio.ig.length ,ig_username ,ig_username[1]);
                if (this.bio.ig !='' && ig_username[1]!='') {
                    this.bio.ig = ig_username[1]
                    // console.log(this.bio.ig,this.bio.ig.length  ,ig_username[1]);
                }
                if (this.bio.fb !='' && fb_username[1]!='') {
                    this.bio.fb = fb_username[1]
                    // console.log(this.bio.fb ,fb_username[1]);
                }
                for (let data in this.artist_data) //append
                {
                    formPortfolio.append(data, this.artist_data[data]);
                }
                for (let data in this.bio) {
                    formBio.append(data, this.bio[data]);
                }
                if(this.artist_data.cover && this.artist_data.thumb ){
                    try {
                    this.$axios.$post("/v1/artist/portfolios/", formPortfolio, config).then(
                        res =>{
                            this.$store.dispatch("check_user_portfolio");
                            this.$axios.$post("/v1/artist/bios/", formBio, config).then(
                                res => { 
                                    this.$store.dispatch("check_user_bio")})
                            this.progressbar =false
                            this.snackbar = true;
                            this.$router.push("/" + this.bio.username);
                            })
                } catch (e) {
                    this.error_snackbar = true
                    this.progressbar =false
                    console.log(e);
                }
                }else{
                    this.fill_image_snackbar=true
                    this.progressbar =false
                }
                }); 
            }
        }
        }
        else{
            this.progressbar = false
            this.fill_intro_snackbar=true
        }
            // style is taken as array and made into a string
        //required attributes check..
    },
    async update() {
        this.progressbar =true
        console.log("update");
        let url = this.cropImage.generateDataUrl();
        console.log("update",url);
        if(this.artist_data.introduction!=""){
            if (url){
            let fileData = this.dataURLtoFile(url, "coverimage.png");
            let res = await this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1");
            if(res.statusCode == 200)
            {
                delete this.$axios.defaults.headers.common['Authorization']
                let filename = res.key
                let url = res.body
                url = url.slice(1, -1);
                this.$axios.$put(url, fileData).then((value) => {
                console.log("image is put", value);
                this.artist_data.cover = "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
                this.artist_data.thumb ="https://minithumbnails.s3.us-east-2.amazonaws.com/" + filename;
                this.callApi();
            })
            }
            else{
                // console.log("not 200 res");
                this.progressbar =false
                this.error_snackbar = true
            }
            // this.artist_data.cover = fileData;
            }
            else{
                this.progressbar =false
                this.fill_image_snackbar = true
            }
        }
        else{
            this.progressbar = false
            this.fill_intro_snackbar=true
        }
    },
    async callApi(){
        try {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            let rx_ig =/^(?:@|(?:https?:\/\/)?(?:www\.)?instagr(?:\.am|am\.com)\/)?(\w+)\/?$/;
            let rx_fb =/(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([^/?]*)/
            let ig_username = rx_ig.exec(this.bio.ig); 
            let fb_username = rx_fb.exec(this.bio.fb);
            if (this.bio.ig.length !=0) {
                this.bio.ig = ig_username[1]
            }
            if (this.bio.fb.length !=0) {
                if(fb_username && fb_username[1] == undefined)
                    //check if url and then extract username
                    this.bio.fb = fb_username[2]
                else if(this.bio.fb.startsWith('@')){
                    //check if @ exists and remove
                    this.bio.fb= this.bio.fb.substring(1);
                }
            }
            console.log("callapi");
        let myObj1 = this.usersPortfolio 
        let myObj2 = this.artist_data
        let myObj3 = this.usersBio
        let myObj4 = this.bio
        // find keys
        let keyObj1 = Object.keys(myObj1); 
        let keyObj2 = Object.keys(myObj2); 
        let keyObj3 = Object.keys(myObj3); 
        let keyObj4 = Object.keys(myObj4); 
            
        // find values 
        let valueObj1 = Object.values(myObj1); 
        let valueObj2 = Object.values(myObj2); 
        let valueObj3 = Object.values(myObj3); 
        let valueObj4 = Object.values(myObj4); 
        let formName = new FormData();
        // now compare their keys and values  
        for(var i=0; i<keyObj1.length; i++) { 
            if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) {	 
                console.log(" value not changed for: ",keyObj1[i]+' -> '+valueObj2[i]);	
            } else {
                formName.append(keyObj1[i], valueObj2[i]);
            } 
        }
        formName.append("username", this.artist_data['username']);
        await this.$axios.$patch("/v1/artist/portfolios/"+this.usersPortfolio.username + '/', formName, config)
        // console.log("portfolio patched");
        let formName2 = new FormData();
        for(var i=0; i<keyObj3.length; i++) { 
            if(keyObj3[i] == keyObj4[i] && valueObj3[i] == valueObj4[i]) { 
                // console.log(" value not changed for: ",keyObj3[i]+' -> '+valueObj4[i]);	 
            } else { 
                formName2.append(keyObj3[i], valueObj4[i]);
            } 
        }
        formName2.append("username", this.bio['username']);
        // console.log("key obj3: "+keyObj3[i]+"\nkeyobj4: "+keyObj4[i]+'\n myObj3 value: '+ valueObj3[i] + '\nmyObj4 value: '+ valueObj4[i] +'\n');
        await this.$axios.$patch("/v1/artist/bios/"+this.usersPortfolio.username + '/', formName2, config)
        // console.log("bio patched");
        this.progressbar =false
        this.$store.dispatch("check_user_bio");
        this.$store.dispatch("check_user_portfolio");
        this.snackbar = true;
        this.$router.push("/" + this.bio.username);
        } catch (error) {
            console.log(error, error.response);
            this.errortext = error.response
            this.progressbar =false
            this.error_snackbar = true
        }
    },
    async deleted() {
        this.delete_progressbar = true
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.$store.state.auth.user.access_token
            }
        };
        try {
            if(this.usersBio) await this.$axios.$delete("/v1/artist/bios/"+this.usersBio.username, config)
            if(this.usersPortfolio) await this.$axios.$delete("/v1/artist/portfolios/"+this.usersPortfolio.username, config)
            // console.log("Artist Bio deleted.");
            // console.log("Artist portfolio deleted.");
            //update store
            this.$store.dispatch("remove_portfolio")
            this.$store.dispatch("remove_bio")
            for (let data in this.bio) {
                this.bio[data] = ''
            }
            this.artist_data.artist_name = ''
            this.artist_data.country = ''
            this.artist_data.thumb = ''
            this.artist_data.introduction = ''
            this.artist_data.cover = ''
            this.artist_data.username= this.$store.state.auth.user.user.username,
            this.imageData = ''
            this.bio.username= this.$store.state.auth.user.user.username,
            this.videoId1='',
            this.videoId2='',
            this.videoId3='',
            this.videoId4='',
            this.ytLinkError1='',
            this.ytLinkError2='',
            this.ytLinkError3='',
            this.ytLinkError4='',
            this.cropImage.remove()
            this.dialog =false,
            this.snackbar = true;
            this.delete_progressbar = false
            this.$router.push("/create/website");
        } catch (e) {
            console.log(e);
            this.error_snackbar = true
            this.delete_progressbar = false
        }
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
