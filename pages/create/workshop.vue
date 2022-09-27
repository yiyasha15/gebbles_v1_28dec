<template>
    <v-app>
        <v-container class=" mx-auto" fluid style="max-width:550px" >
            <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
        </v-container>
        <!-- {{workshop}} -->
        <h2 class="font-weight-medium" align="center" justify="center" v-if="!editing_workshop_obj">Create your workshop</h2>
        <h2 class="font-weight-medium" align="center" justify="center" v-else>Edit your workshop</h2>
        <v-container class="mx-auto" fluid style="max-width:550px" >
            <v-card class="pa-6 pa-md-8">
                <v-form ref="workshop_form">
            <div v-if="!workshop.poster" @click="onPick()" style="cursor:pointer;  width:274px;" class=" mx-auto my-4 rounded-lg grey lighten-2" >
                <v-icon class="pa-image">mdi-plus</v-icon>
                <input 
                type="file" 
                name = "poster" 
                style="display:none" 
                ref="fileInput" 
                accept="image/*"
                required
                @change="onFileChange">
            </div>
            <div v-else class="ma-4">
            <v-img v-if="typeof(workshop.poster) === 'string'" :src="workshop.poster" class="mx-auto" height="300px" width="352px" contain>
                <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage()">
                <v-icon color="black" small>mdi-close</v-icon>
                </v-btn>
            </v-img>
            </div>
            <!-- <v-card class="pa-4" outlined elevation="0">
               <p class="caption">About the artist</p> -->
            <v-text-field
                v-model= "workshop.title"
                label= "Title*"
                :maxlength="255"
                counter
                :rules="nameRules">
            </v-text-field>
            <v-combobox
                v-model="artist_obj"
                :items="artists"
                maxlength="255"
                prepend-icon="mdi-account-search-outline"
                label="Tag artist"
                item-text="artist_name"
                item-value="username"
                ref="artistListComboBox"
                @change="onAutoCompleteSelection"
                @keyup="customOnChangeHandler"
                @paste="customOnChangeHandler"
                @input="addSearchGuest"
                >
                <!-- when its a chip -->
                <template v-slot:selection="data">
                    <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click:close="artist_obj = null; workshop.teacher1 = '';"
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
                <!-- when it loads -->
                <template v-slot:item="data">
                    <v-list-item-avatar v-if="data.item.thumb">
                        <img :src="data.item.thumb">
                    </v-list-item-avatar>
                    <v-list-item-avatar v-else size="40">
                        <v-icon>
                            mdi-account-circle
                        </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-if="data.item.artist_name" v-html="data.item.artist_name"></v-list-item-title>
                        <v-list-item-subtitle v-if="data.item.username" v-html="'@'+data.item.username "></v-list-item-subtitle>
                </v-list-item-content>
                </template>
            </v-combobox>
            <v-text-field
                v-model= "workshop.name1"
                label= "Artist's name"
                :maxlength="255"
                counter>
            </v-text-field>
            <!-- </v-card> -->
            <v-menu
                ref="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    
                        v-model= "workshop.start_date"
                        label="Date*"
                        prepend-icon="mdi-calendar"
                        readonly 
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model= "workshop.start_date"
                    :active-picker.sync="activePicker"
                    @change="save(workshop.start_date)"
                    ></v-date-picker>
            </v-menu>
            <v-menu
            ref="menutime"
            v-model="menutime"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="workshop.datetime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="workshop.datetime"
                label="Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
            </template>
            <v-time-picker
            v-if="menutime"
            v-model="workshop.datetime"
            full-width
            @click:minute="$refs.menutime.save(workshop.datetime)"
            ></v-time-picker>
            </v-menu>
            <v-text-field prepend-icon="mdi-map-marker-outline"
                v-model = "workshop.venue"
                label= "Venue"
                :maxlength="255"
                counter>
            </v-text-field>
            <v-autocomplete label="Country*" v-model= "workshop.country"
                prepend-icon="mdi-earth"
                :items="countries"
                item-text="name"
                item-value="code"
            ></v-autocomplete>
            <v-textarea prepend-icon="mdi-information-outline"
                v-model = "workshop.content"
                label= "Info"
                :maxlength="255"
                counter>
            </v-textarea>
            <v-text-field prepend-icon="mdi-instagram"
                v-model = "workshop.iglink"
                label= "Instagram link"
                :maxlength="255"
                counter>
            </v-text-field>
            <v-text-field prepend-icon="mdi-youtube"
                v-model = "workshop.videolink"
                label= "Youtube link"
                :maxlength="255"
                counter>
            </v-text-field>
            <v-text-field prepend-icon="mdi-email"
                v-model = "workshop.contact_email"
                label= "Email ID"
                :maxlength="255"
                counter>
            </v-text-field>
                </v-form>
                <v-btn outlined small class="text-decoration-none" 
                    v-if="!editing_workshop_obj" 
                    color="black" :loading="progressbar"
                    @click="addWorkshop()" >Create workshop</v-btn>
                <v-btn v-else outlined small class="text-decoration-none"  color="black" :loading="progressbar"
                @click="updateWorkshop()" >Update workshop</v-btn>
            </v-card>
        </v-container>
        <v-snackbar v-model="image_snackbar">
            Image is required.
        </v-snackbar>
        <v-snackbar v-model="workshop_added_snackbar">
            Workshop added.
        </v-snackbar>
        <v-snackbar v-model="workshop_update_snackbar">
            Workshop updated.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            {{text}}
        </v-snackbar>
    </v-app>
</template>
<script>
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import Vue from "vue";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
Vue.use(Croppa);
export default {
    middleware : 'check_auth',
    layout:'simple',
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'gebbles - create workshop',
        }
    },
     created (){
        if(this.$store.state.editing_workshop_obj)
        {
            this.workshop = Object.assign({}, this.$store.getters.editing_workshop_obj);
            console.log(this.workshop );
            if(this.workshop.teacher1){
                //tag artist
            }
            if(this.workshop.teacher1)
            {
                EventService.getArtist(this.workshop.teacher1).then(
                res =>  {   
                    this.artist_obj=res.data //show artist found
                    this.addSearchGuest();
                }
                ).catch(e=>
                    {if(e.response.status =='404'){
                        this.artist_obj = this.workshop.teacher1; // artists not there
                    }}
                )
            }
        }
    },
    computed: {
        ...mapGetters(['editing_workshop_obj','loggedInUser']),
        img_height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 96
          case 'sm': return 150
          case 'md': return 150
          case 'lg': return 150
          case 'xl': return 150
        }
    }
    },
    data(){
        return {
            workshop:{
                username:this.$store.state.auth.user.username,
                title:'', // # must
                poster:'', // # must
                start_date:null, // # must
                datetime:null,
                country:null,
                city:'',
                venue:'',
                content:'', 
                iglink:'',
                videolink:'',
                contact_email:'',
                name1:'',
                photo1:'',
                videolink1:'',
                country1:'',
                info1:'',
                event:'',
                teacher1:''
            },
            artists:[],
            artist_obj:null,
            menutime:false,
            comboBoxModel:null,
            date:null,
            activePicker:null,
            progressbar:false,
            workshop_added_snackbar:false,
            workshop_update_snackbar:false,
            image_snackbar:false,
            error_snackbar:false,
            text:'',
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
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 255) || 'Must be less than 255 characters',
            ],
        }
    },
    watch: {
        menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
        artist_obj: function() {
            if(this.artist_obj)
            {
                EventService.getSearchedArtist(this.artist_obj).then((value) => {
                this.artists = value.data});
            }
        },
    },
    methods:{
    save(date){
        this.$refs.menu.save(date)
    },
    goback(){
        this.$store.dispatch("remove_editing_workshop_obj")
        window.history.back();
    },
    onPick() //changing the click from button to input using refs
    {
        this.$refs.fileInput.click()
    },
    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (files[0]) {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            this.workshop.poster = e.target.result;
        }
        fileReader.readAsDataURL(files[0]);
        this.workshop.poster = files[0];
        }
    },
    removeImage(){
        this.workshop.poster ="";
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
    async putImage(image){
        if(image.includes("minithumbnails.s3")|| image.includes("mediumthumbnails.s3"))
        {
        // console.log("already s3ed",image);
        return image
        }
        let fileData = this.dataURLtoFile(image, "coverimage.png");
        let res = await this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1")
        delete this.$axios.defaults.headers.common['Authorization']
        let filename = res.key
        let url = res.body
        url = url.slice(1, -1);
        let put = await this.$axios.$put(url, fileData)
        return "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
    },
    searchArtists(){
        this.artists=[]
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
        if(this.comboBoxModel){EventService.getSearchedArtist(this.comboBoxModel).then((value) => {
        this.artists = value.data
        });}
        }, 100)
    },
    onAutoCompleteSelection(){
        this.comboBoxModel = this.artist_obj;
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
    addSearchGuest(){
        let t_name = typeof this.artist_obj;
        if(this.artist_obj && t_name == 'object') //if teacher exists then changing the value of teacher to username 
        {
            this.workshop.teacher1 = this.artist_obj.username
            this.workshop.country1 = this.artist_obj.country
            if(this.workshop.photo1 =='' && this.artist_obj.thumb!='')
            this.workshop.photo1 = this.artist_obj.thumb
            if(this.workshop.name1 =='' && this.artist_obj.artist_name!='')
            this.workshop.name1 = this.artist_obj.artist_name
        }
        else
        {
            // this.workshop.name1 = this.artist_obj
        }
    },
    async addWorkshop(){
        if(this.workshop.poster){
            if(this.$refs.workshop_form.validate())
            {
                this.progressbar =true
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                }
                if(this.workshop.poster)
                {this.workshop.poster = await this.putImage(this.workshop.poster)}
                if(this.workshop.teacher1 && typeof this.workshop.teacher1=='object')
                {
                    this.workshop.teacher1 = this.workshop.teacher1.username
                }
                let formWorkshopData = new FormData();
                for (let data in this.workshop) {
                    formWorkshopData.append(data, this.workshop[data]);
                }
                try {
                    let res= await this.$axios.$post("/v1/workshops/create/", formWorkshopData, config)
                    console.log(res);
                    this.$refs.workshop_form.reset();

                    this.$router.push("/workshops/"+res.uuid);
                    this.workshop_added_snackbar=true
                    this.progressbar =false
                } catch (error) {
                    console.log(error,error.response);
                    this.progressbar =false
                }
            }
        }
        else{
            this.image_snackbar=true;
            // console.log("image is req");
        }
    },
    async updateWorkshop(){
        if(this.workshop.poster){
        if(this.$refs.workshop_form.validate())
        {
        try{
            this.progressbar =true
            if(this.workshop.poster != this.editing_workshop_obj.poster)
            this.workshop.poster = await this.putImage(this.workshop.poster);
            this.formUpdate();
        }
        catch(error){
            console.log(error.response.data);
            this.progressbar = false
        }
        }
        }else{
            this.image_snackbar =true
        }
    },
    async formUpdate(){
        const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()
            }
        };
        let myObj1 = this.editing_workshop_obj 
        let myObj2 = this.workshop
        // find keys 
        let keyObj1 = Object.keys(myObj1); 
        let keyObj2 = Object.keys(myObj2);
            
        // find values 
        let valueObj1 = Object.values(myObj1); 
        let valueObj2 = Object.values(myObj2); 
        
        // now compare their keys and values 
        let update = false; 
        try {
            let formName = new FormData();
            for(var i=0; i<keyObj1.length; i++) { 
                if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 
                    // console.log(" value not changed for: ",keyObj1[i]+' -> '+valueObj2[i]);	 
                } 
                else { 
                    update = true;
                    // it prints keys have different values 
                    formName.append(keyObj1[i], valueObj2[i]);
                    console.log( valueObj2[i] ," gonna change"); 
                }
            }
            if(update)
            {
                formName.append("id", this.workshop['id']);
                await this.$axios.$patch("/v1/workshops/"+this.workshop.uuid, formName, config).then(res => {
                    console.log(res," changed"); 
                    this.$refs.workshop_form.reset();
                    this.detail_update_snackbar = true;
                    update = false;
                })
            }else{
                this.text="Workshop upto date.";
                this.snackbar = true;
            }
            this.$store.dispatch("remove_editing_workshop_obj");
            this.progressbar =false
            // this.refresh();
            this.$router.push("/workshops/"+this.workshop.uuid);
        } catch (error) {
            console.log(error, error.response);
            this.text="Some error occured. "+error.response.data
            this.error_snackbar =true
            this.progressbar =false
        }
    },

    }
}
</script>
<style scoped>
.pa-image{
    padding: 60px 125px;
}
</style>