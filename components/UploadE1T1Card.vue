<template>
    <div>
        <v-container class="mx-auto pa-0" fluid style="max-width:550px" >
            <v-card class="px-1 pt-3" elevation=0 >
                <div class="font-weight-medium mb-4 text-h6 text-sm-h5" align="center" justify="center" v-if="!share_obj">Give a shoutout<br>
                    <span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); 
                    -webkit-background-clip: text;-webkit-text-fill-color: transparent;"> Each one Teach one</span></div>
                 <div class="font-weight-medium mb-4 text-h6 text-sm-h5" align="center" justify="center" v-else>Edit your shoutout</div>
                <gebbles-divider class="mb-3"></gebbles-divider>
                <v-stepper v-model="e6" vertical class="elevation-0">
                    <v-stepper-step :complete="e6 > 1" step="1" @click.native="e6 = 1" style="cursor:pointer">
                        *Mention the person that inspired you.
                    <small class="pt-1">If that person is not yet in this platform, mention them now and tag them later when they join.<br></small>
                    </v-stepper-step>
                    <v-stepper-content step="1" style="border-left: none;" width="100%" class="ma-0">
                        <v-combobox
                            :maxlength="255"
                            v-model="teacher_obj"
                            :items="artists"
                            prepend-icon="mdi-account-search-outline"
                            label="Search artists..."
                            item-text="artist_name"
                            item-value="username"
                            ref="artistListComboBox"
                            :error-messages="teacherAlreadyMentioned"
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
                                <v-list-item-content>
                                <v-list-item-title v-if="data.item.artist_name" v-html="data.item.artist_name"></v-list-item-title>
                                    <v-list-item-subtitle v-if="data.item.username" v-html="'@'+data.item.username "></v-list-item-subtitle>
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
                        >
                        </v-autocomplete>
                    <v-btn color="black" small text outlined @click="e6 = 2">Next</v-btn>
                    </v-stepper-content>
                    <v-stepper-step :complete="e6 > 2" step="2"  @click.native="e6 = 2" style="cursor:pointer">*Upload a photo together.
                        <small class="pt-1">or you can add their photo.</small>
                    </v-stepper-step>
                    <v-stepper-content step="2" style="border-left: none;" width="100%" class="ma-0">
                        <div>
                        <!-- <div v-if="!imageData" @click="onPick" style="cursor:pointer; width:274px;" class="mx-auto mb-4 rounded-lg grey lighten-2" >
                            <v-icon class="pa-image">mdi-plus</v-icon>
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
                        </div> -->
                        <upload-image-component @newimage="getUrl" @removeimage="removeUrl" :initialImage="sharing.image"></upload-image-component>
                        </div>
                        <v-btn color="black" text outlined @click="e6 = 3" small>Next</v-btn>
                        <v-btn color="primary" text @click="e6 = 1" small>Previous</v-btn>
                    </v-stepper-content>
                
                    <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3" style="cursor:pointer">*Each One Teach One</v-stepper-step>
                    <v-stepper-content step="3" style="border-left: none;" width="100%" class="ma-0">
                        <v-form ref="e1t1_form">
                        <v-textarea
                        :maxlength="485"
                        counter
                            v-model = "sharing.s_appreciation"
                            prepend-icon="mdi-account-heart-outline"
                            label= "*Share what you remember the most about them."
                            >
                        </v-textarea>
                        <v-text-field 
                        prepend-icon="mdi-map-marker-outline"
                            v-model = "sharing.s_location"
                            label= "Where did you meet?"
                            :maxlength="255"
                            counter
                            >
                        </v-text-field>
                        <v-textarea
                        prepend-icon="mdi-book-outline"
                            v-model = "sharing.s_learnings"
                            label= "Share about what you learnt from them."
                            >
                        </v-textarea>
                        <v-text-field
                            :error-messages="ytLinkError" 
                            :maxlength="255"
                            counter
                            v-model= "sharing.s_teacher_video"
                            label="Youtube link"
                            prepend-icon="mdi-youtube"
                            
                            :rules="youtubeRules"
                            >
                        </v-text-field>
                        </v-form>
                        <v-row v-if="videoId" class=" justify-center text-center mt-2 mb-4">
                            <youtube width="auto" height="100%"  :video-id= 'videoId'></youtube>
                        </v-row>
                        <v-btn color="primary" small text @click="e6 = 2">Previous</v-btn>
                    </v-stepper-content>
                    <div class="mx-sm-7 mx-6">
                    <p v-if="progressbar" class="caption"> Please wait..</p>
                        <v-btn v-if="!share_obj" outlined small class="text-decoration-none" 
                        color="black" :loading="progressbar"
                        @click="submit">Submit</v-btn>
                        <v-btn v-else outlined small class="text-decoration-none"  color="black"
                        :loading="progressbar" 
                        @click="update">Update</v-btn>
                        <!-- <v-btn color="error" small text @click="clear">Cancel</v-btn> -->
                    </div>
                </v-stepper>
            </v-card>
        </v-container>
        <v-snackbar v-model="mention_teacher_snackbar">
            Mention(about) your friend or teacher.
        </v-snackbar>
        <v-snackbar v-model="imageRules">
            Image is required.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            Some error occured. Please try again.
        </v-snackbar>
    </div>
</template>
<script>
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import InstagramEmbed from 'vue-instagram-embed';
import EventService from '@/services/EventService.js' 
import UploadImageComponent from '~/components/UploadImageComponent.vue';
import { mapGetters } from 'vuex'
import CountryFlag from 'vue-country-flag'
import GebblesDivider from '@/components/GebblesDivider.vue'
export default {
    components: {
        GebblesDivider,
        CountryFlag,
        Youtube,
        InstagramEmbed,
        UploadImageComponent
    },
    created (){
        // this.$store.dispatch("check_artists");
        if(this.$store.state.share_obj != null)
        {
            // console.log(this.$store.getters.share_obj, typeof this.url);
            this.sharing = Object.assign({}, this.$store.getters.share_obj);
            // check database if artist exists
            // else
            if(this.sharing.s_teacher_name)
            {
                EventService.getArtist(this.sharing.s_teacher_name).then(
                res =>  {   
                    this.teacher_obj=res.data //show artist found
                    this.addTeacher();
                }
                ).catch(e=>
                    {if(e.response.status =='404'){
                        this.teacher_obj = this.sharing.s_teacher_name; // artists not there
                    }}
                )
            }
            
            // let url1 =this.sharing.s_teacher_video //getting value of youtube video urls
            // if(url1){
            // let videoId = getIdFromURL(url1) //getting id from video url
            // this.videoId = videoId //assigning the id to <youtube> video id
            // }
        }
    },
    computed: {
        ...mapGetters([ 'share_obj','usersPortfolio','loggedInUser']),
        videoId(){
        if(this.sharing.s_teacher_video)
        return getIdFromURL(this.sharing.s_teacher_video)
    },
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
                username: this.$store.state.auth.user.username,
            },
            url:'',
            e6: 1,
            teacher_obj:null,
            progressbar:false,
            imgprogressbar:false,
            mention_teacher_snackbar:false,
            imageRules:false,
            error_snackbar:false,
            ytLinkError:'',
            artists:[],
            debounce: null,
            comboBoxModel: null,
            teacherAlreadyMentioned:'',
            youtubeRules:[
            v => !v || /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(v) ||'Enter a valid Youtube Url',
            v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed.'
        ],
        }
    },
    watch: {
    teacher_obj: function() {
        console.log(this.teacher_obj);
        if(this.teacher_obj)
        {
            EventService.getSearchedArtist(this.teacher_obj).then((value) => {
            this.artists = value.data});
        }else{
            this.sharing.s_teacher_name = ""
            this.sharing.teacher = "" 
            console.log(this.sharing);
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
        onAutoCompleteSelection(){
            this.comboBoxModel = this.teacher_obj;
            this.searchArtists();
        },
        customOnChangeHandler(){
            this.teacherAlreadyMentioned=''
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
        clear(){
            this.$store.dispatch("remove_share_obj")
            this.url='';
            this.sharing.image = '';
            this.sharing.teacher= "",
            this.sharing.s_learnings="",
            this.sharing.s_teacher_name= "",
            this.sharing.image= "",
            this.sharing.image_mini= "",
            this.sharing.s_appreciation= "",
            this.sharing.s_teacher_country= "",
            this.sharing.s_student_country=  "",
            this.sharing.s_date=  "",
            this.sharing.s_location=  "",
            this.sharing.s_teacher_video= "",
            this.sharing.username= this.$store.state.auth.user.username,
            this.$refs.e1t1_form.resetValidation();
            this.teacher_obj = null
            this.e6=1
            // window.history.back();
        },
        getUrl(url){
            this.url = url;
        },
        removeUrl(){
            this.url='';
        },
        dataURLtoFile(dataurl, filename) {
            // console.log( dataurl, filename);
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
            u8arr[n] = bstr.charCodeAt(n);
            }
        return new File([u8arr], filename, {type:mime});
        },
        async submit() {
            if(this.sharing.s_teacher_name != "" && this.sharing.s_appreciation != "" )
            {
                this.progressbar =true
                this.sharing.s_student_country = this.usersPortfolio.country;
                if(this.url)
                {let imageData = this.url.generateDataUrl();
                if(imageData){
                    let fileData = this.dataURLtoFile(imageData, "coverimage.png");
                    this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1").then(
                        res => {
                        if(res.statusCode == 200)
                        {
                            delete this.$axios.defaults.headers.common['Authorization']
                            let filename = res.key
                            let url = res.body
                            url = url.slice(1, -1);
                            this.$axios.$put(url, fileData).then((value) => {
                            this.sharing.image =''
                            this.sharing.image = "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
                            this.sharing.image_mini= "https://minithumbnails.s3.us-east-2.amazonaws.com/" + filename;
                            this.formPost();
                            });
                        }
                    })  
                }
                }    
                else{
                    this.progressbar =false;
                    this.imageRules = true;
                    console.log("no image");
                } 
            }
            else{
                this.progressbar =false;
                this.mention_teacher_snackbar = true
            }
        },
        async update() {
            if(this.sharing.s_teacher_name != "" && this.sharing.s_appreciation != "" )
            {
                this.progressbar =true;
                console.log(this.url , typeof this.url);
                if(typeof this.url != 'string') //image has not been updated
                {
                    let imageData = this.url.generateDataUrl();
                    if(imageData) //if image exists
                    {
                        let fileData = this.dataURLtoFile(imageData, "coverimage.png");
                        this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1").then(
                        res => {
                        if(res.statusCode == 200)
                        {
                            delete this.$axios.defaults.headers.common['Authorization']
                            let filename = res.key
                            let url = res.body
                            url = url.slice(1, -1);
                            this.$axios.$put(url, fileData).then((value) => {
                            this.sharing.image =''
                            this.sharing.image = "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
                            this.sharing.image_mini= "https://minithumbnails.s3.us-east-2.amazonaws.com/" + filename;
                            this.formUpdate();
                            });
                        }
                    })
                    }
                    else
                    {this.imageRules = true
                    this.progressbar = false}
                }
                else
                this.formUpdate();
            }
            else{
                this.progressbar =false;
                this.mention_teacher_snackbar = true
            }
        },
        async formPost(){
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            let formData = new FormData();
                    for (let data in this.sharing) {
                        formData.append(data, this.sharing[data]);
                    }
                    // console.log(this.sharing);
                    try {
                        let response =  await this.$axios.$post("/v1/e1t1/sharing/", formData, config);
                        // console.log(response);
                        this.progressbar =false;
                        this.$store.dispatch("check_user_teachers");
                        this.$router.push("/e1t1/"+response.uuid);
                    } catch (e) {
                        this.progressbar =false;
                        this.error_snackbar=true;
                        console.log(e.response);
                        let er = e.response.data;
                        for (const key in er) {
                            if(`${key}` == 's_teacher_video'){
                            this.ytLinkError = `${er[key]}`
                            }
                            if(`${key}` == '0'){
                                this.e6=1
                            this.teacherAlreadyMentioned = `${er[key]}`
                            }
                        }
                    }
        },
        async formUpdate(){
             const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
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
            try {
                let response =  await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.uuid, formName, config);
                this.progressbar =false;
                this.$store.dispatch("check_user_teachers");
                this.$store.dispatch("remove_share_obj");
                window.history.back();
            } catch (e) {
                this.progressbar =false;
                this.error_snackbar=true;
                let er = e.response.data;
                for (const key in er) {
                    if(`${key}` == 's_teacher_video'){
                    this.ytLinkError = `${er[key]}`
                    }
                    if(`${key}` == '0'){
                    this.teacherAlreadyMentioned = `${er[key]}`
                    }
                }
            }
        }
    },
}
</script>
<style scoped>
.pa-image{
    padding: 60px 125px;
}
</style>