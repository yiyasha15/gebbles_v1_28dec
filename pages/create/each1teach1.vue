<template>
<v-app>
    <v-container class="ma-24" style="max-width:550px;">
        <div align="left" justify="left">
            <v-btn icon class="elevation-0 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </div>
        <v-row>
        <v-col>
            <h2 class="mb-md-8 mb-4"  align="center" justify="center">Each One Teach One</h2>
            <v-stepper  v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" @click.native="e6 = 1" style="cursor:pointer">
                Mention the person that inspired you.*
            <small>If that person is not yet in this platform, mention them and tag them later when they join.<br></small>
            </v-stepper-step>
            <v-stepper-content step="1" style="border-left: none;" width="100%" class="ma-0">
                <v-combobox
                    v-model="teacher_obj"
                    :items="artists"
                    prepend-icon="mdi-account-search-outline"
                    label="Search artists..."
                    item-text="artist_name"
                    item-value="username"
                    ref="artistListComboBox"
                    @change="onAutoCompleteSelection"
                    @keyup="customOnChangeHandler"
                    @paste="customOnChangeHandler"
                    @input="addTeacher"
                    >
                    <template v-slot:selection="data">
                        <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        @click:close="teacher_obj = ''"
                        >
                        <v-avatar v-if="data.item.thumb" left>
                            <v-img :src="data.item.thumb"></v-img>
                        </v-avatar>
                        <v-avatar v-else left>
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                        <template  v-if="data.item.username" >
                        {{ data.item.username }}
                        </template>
                        <template v-else >
                        {{ data.item}}
                        </template>
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item.username"></v-list-item-content>
                        </template>
                        <template v-else>
                        <v-list-item-avatar v-if="data.item.thumb">
                            <img :src="data.item.thumb">
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else >
                            <v-icon>
                                mdi-account-circle
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content v-if="data.item.username">
                            <v-list-item-title v-html="data.item.username"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.country"></v-list-item-subtitle>
                        </v-list-item-content>
                        </template>
                    </template>
                </v-combobox>
                <v-autocomplete
                prepend-icon="mdi-earth"
                :items="countries"
                item-text="name"
                item-value="code"
                v-model = "sharing.s_teacher_country"
                label= "Country they are from"
                clearable>
                </v-autocomplete>
            <v-btn color="black" small text outlined @click="e6 = 2">Next</v-btn>
            <v-btn color="primary" small text @click="goback">Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-step :complete="e6 > 2" step="2"  @click.native="e6 = 2" style="cursor:pointer">Upload an image together.*
                <small>(or, you can add their image.)</small>
            </v-stepper-step>
            <v-stepper-content step="2" style="border-left: none;" width="100%" class="ma-0">
                <div>
                <div v-if="!imageData" @click="onPick" style="cursor:pointer;  width:152px;" class="mb-4 rounded-lg grey lighten-4" >
                    <v-icon class="pa-16">mdi-plus</v-icon>
                    <input 
                    type="file" 
                    name = "imageData" 
                    style="display:none" 
                    ref="fileInput" 
                    accept="image/*"
                    required
                    @change="onFileChange">
                </div>
                <div v-else class="mb-4">
                <v-img :src="imageData" height="auto" width="242px" class="mx-auto" contain>
                    <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage">
                    <v-icon color="black" small>mdi-close</v-icon>
                    </v-btn>
                </v-img>
                </div>
                </div>
                <v-btn color="black" text outlined @click="e6 = 3" small>Next</v-btn>
                <v-btn color="error" text @click="e6 = 1" small>Previous</v-btn>
                <v-btn color="primary" text @click="goback" small>Cancel</v-btn>
            </v-stepper-content>
        
            <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3" style="cursor:pointer">Each One Teach One*</v-stepper-step>
            <v-stepper-content step="3" style="border-left: none;" width="100%" class="ma-0">
                <v-textarea
                counter :maxlength="485"
                    v-model = "sharing.s_appreciation"
                    prepend-icon="mdi-account-heart-outline"
                    label= "Share the one thing you remember the most about her/him.*"
                    clearable>
                </v-textarea>
                <v-text-field 
                prepend-icon="mdi-map-marker-outline"
                    v-model = "sharing.s_location"
                    label= "Where did you meet?"
                    :maxlength="50"
                    clearable>
                </v-text-field>
                <v-textarea
                prepend-icon="mdi-book-outline"
                    :maxlength="485"
                    v-model = "sharing.s_learnings"
                    label= "Share about what you learnt from them."
                    clearable>
                </v-textarea>
                <v-text-field
                    :error-messages="ytLinkError" 
                    color="red"
                    v-model= "sharing.s_teacher_video"
                    label="Youtube link"
                    prepend-icon="mdi-youtube"
                    clearable
                    @input="showYoutubeVideo"
                    >
                </v-text-field>
                <v-row v-if="videoId" class=" justify-center text-center mt-2 mb-4">
                    <youtube width="auto" height="100%"  :video-id= 'videoId'></youtube>
                </v-row>
                <p v-if="progressbar" class="caption"> hi, we're building the page, please wait :)</p>
                <v-btn v-if="!share_obj" outlined small class="text-decoration-none" 
                color="black" :loading="progressbar"
                @click="submit">Submit</v-btn>
                <v-btn v-else outlined small class="text-decoration-none"  color="black"
                :loading="progressbar" 
                @click="update">Update</v-btn>
                <v-btn color="error" small text @click="e6 = 2">Previous</v-btn>
                <v-btn color="primary" text small @click="goback">Cancel</v-btn>
            </v-stepper-content>
            </v-stepper>
        </v-col>
        </v-row>
        <v-snackbar v-model="mention_teacher_snackbar">
            Please fill the required details.
        </v-snackbar>
        <v-snackbar v-model="youtube_snackbar">
            Youtube link is incorrect.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            Some error occured. Please try again.
        </v-snackbar>
    </v-container>
</v-app>
</template>
<script>
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import InstagramEmbed from 'vue-instagram-embed';
import EventService from '@/services/EventService.js'

export default {
    middleware : 'check_auth',
    components: {
        CountryFlag,
        Youtube, InstagramEmbed
    },
    created (){
        // this.$store.dispatch("check_artists");
        if(this.$store.state.share_obj != null)
        {
            console.log(this.$store.getters.share_obj);
            this.sharing = Object.assign({}, this.$store.getters.share_obj);
            this.imageData = this.sharing.image;
            this.teacher_obj = this.sharing.s_teacher_name;
            let url1 =this.sharing.s_teacher_video //getting value of youtube video urls
            if(url1){
            let videoId = getIdFromURL(url1) //getting id from video url
            this.videoId = videoId //assigning the id to <youtube> video id
            }
        }
    },
    computed: {
        ...mapGetters([ 'share_obj','usersPortfolio']),
    },
    data(){
        return {
            countries:[
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
            sharing: {
                teacher: "",
                s_learnings:"",
                s_teacher_name: "",
                image:"",
                image_mini:"",
                s_appreciation: "",
                s_teacher_country: "",
                s_student_country: "",
                s_date: "",
                s_location: "",
                s_teacher_video:"",
                username: this.$store.state.auth.user.user.username,
            },
            imageData: "",
            e6: 1,
            teacher_obj:null,
            progressbar:false,
            mention_teacher_snackbar:false,
            youtube_snackbar:false,
            error_snackbar:false,
            videoId:'',
            ytLinkError:'',
            artists:[],
            debounce: null,
            comboBoxModel: null,
        }
    },
    watch: {
    teacher_obj: function() {
        console.log(this.teacher_obj);
        if(this.teacher_obj)
        {
            EventService.getSearchedArtist(this.teacher_obj).then((value) => {
                console.log("how",value);
            this.artists = value.data});
        }
      }
    },
    methods: {
        searchArtists(){
        this.artists=[]
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
            // console.log(this.comboBoxModel);
        if(this.comboBoxModel){EventService.getSearchedArtist(this.comboBoxModel).then((value) => {
        this.artists = value.data
        });}
        }, 100)
        },
        removeImage(){
            this.imageData = ""
            this.sharing.image=""
            this.sharing.image_mini=""
        },
        onAutoCompleteSelection(){
            this.comboBoxModel = this.teacher_obj;
            this.searchArtists();
        },
        customOnChangeHandler(){
        let vm = this;
        setTimeout(function(){
            if(vm.$refs.artistListComboBox){
            vm.comboBoxModel = vm.$refs.artistListComboBox.internalSearch;
            vm.searchArtists();
            }
        });
        },
        addTeacher(){
            let t_name = typeof this.teacher_obj;
            // console.log(this.teacher_obj);
            // console.log(t_name);
            // console.log(this.teacher_obj);
            if(t_name == 'object') //if teacher exists then changing the value of teacher to username 
            {
                this.sharing.teacher = this.teacher_obj.username
                this.sharing.s_teacher_name = this.teacher_obj.username 
                this.sharing.s_teacher_country = this.teacher_obj.country
            }
            else
            {
                this.sharing.s_teacher_name = this.teacher_obj 
                this.sharing.teacher = "" //making null because no artists to tag.
            }
        },
        showYoutubeVideo(){
            let url= this.sharing.s_teacher_video
            if (url != undefined || url != '') {        
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                var regExpInsta = /(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*/g; //instagram red exp
                var match = url.match(regExp);
                var match2 = url.match(regExpInsta)
                console.log(match,match2);
                if (match && match[2].length == 11) {     
                    this.ytLinkError =``
                } else if (match2 && match2[0].length ) {  
                    this.ytLinkError =``
                } 
                else {
                    //invalid youtube url
                    this.ytLinkError = `Enter a valid Youtube/Instagram URL.`
                }
            }
            let videoId = getIdFromURL(url) //getting id from video url
            this.videoId = videoId
        },
        goback(){
            this.$store.dispatch("remove_share_obj")
            window.history.back();
        },
        onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInput.click()
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                if(files[0])
                {
                    fileReader.readAsDataURL(files[0]);
                    this.sharing.image = files[0];
                    
                }
            }
        },
        async submit() {
            if(this.sharing.s_teacher_name != "" && this.sharing.s_appreciation != "" && this.sharing.image!='')
            {
                this.progressbar =true
                this.sharing.s_student_country = this.usersPortfolio.country;
                this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1").then(
                res => {
                if(res.statusCode == 200)
                {
                    delete this.$axios.defaults.headers.common['Authorization']
                    let filename = res.key
                    let url = res.body
                    url = url.slice(1, -1);
                    this.$axios.$put(url, this.sharing.image).then((value) => {
                    this.sharing.image =''
                    this.sharing.image = "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
                    this.sharing.image_mini= "https://minithumbnails.s3.us-east-2.amazonaws.com/" + filename;
                    this.formPost();
                    });
                }
            })
                    
            }
            else{
                this.progressbar =false;
                this.mention_teacher_snackbar = true
            }
        },
        async update() {
            this.progressbar =true
            let urlLink = this.sharing.s_teacher_video;
            if(urlLink!= this.share_obj.s_teacher_video){ //if link exists check if it's valid
                var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                let check = !pattern.test(this.share_obj.s_teacher_video);
                // console.log("pattern",pattern);
                // console.log("check",check);
                if(!check){
                    this.youtube_snackbar =true
                    this.progressbar =false;
                    console.log("incorrect yt link");
                    return;
                }
            }
            if(typeof this.sharing.image == 'object')
            {
                this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1").then(
                res => {
                if(res.statusCode == 200)
                {
                    delete this.$axios.defaults.headers.common['Authorization']
                    let filename = res.key
                    let url = res.body
                    url = url.slice(1, -1);
                    this.$axios.$put(url, this.sharing.image).then((value) => {
                    this.sharing.image =''
                    this.sharing.image = "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
                    this.sharing.image_mini= "https://minithumbnails.s3.us-east-2.amazonaws.com/" + filename;
                    this.formUpdate();
                    });
                }
            })
            }
            else
            this.formUpdate();
           
        },
        async formPost(){
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            let formData = new FormData();
                    for (let data in this.sharing) {
                        formData.append(data, this.sharing[data]);
                    }
                    // console.log(this.sharing);
                    try {
                        let response =  await this.$axios.$post("/v1/e1t1/sharing/", formData, config);
                        console.log(response);
                        this.progressbar =false;
                        this.$store.dispatch("check_user_teachers");
                        this.$router.push("/e1t1/"+response.uuid);
                    } catch (e) {
                        this.progressbar =false;
                        this.error_snackbar=true;
                        this.$router.push("/"+this.sharing.username+"/each1teach1/");
                        console.log("cant post!",e.response.data);
                    }
        },
        async formUpdate(){
             const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            let myObj1 = this.share_obj 
            let myObj2 = this.sharing
            // find keys 
            let keyObj1 = Object.keys(myObj1); 
            let keyObj2 = Object.keys(myObj2);
                
            // find values 
            let valueObj1 = Object.values(myObj1); 
            let valueObj2 = Object.values(myObj2); 
            let formName = new FormData();
            // now compare their keys and values  
            for(var i=0; i<keyObj1.length; i++) { 
                if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 
                    // console.log("no change ",keyObj1[i]+' -> '+valueObj2[i]);	 
                } 
                else{
                    formName.append(keyObj1[i], valueObj2[i]);
                } 
            }
            formName.append("id", this.sharing['id']);
            // console.log("key obj1: "+keyObj1[i]+"\nkeyobj2: "+keyObj2[i]+'\n myObj1 value: '+ valueObj1[i] + '\nmyObj2 value: '+ valueObj2[i] +'\n');
            await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.uuid, formName, config);
            // console.log( valueObj1[i] ," changed"); 
            this.progressbar =false;
            this.$store.dispatch("check_user_teachers");
            this.$store.dispatch("remove_share_obj");
            window.history.back();
        }
    },
    }
</script>