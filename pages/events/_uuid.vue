<template>
  <v-app>
        <v-container class="mx-auto" fluid style="max-width:950px" >
        <!-- <v-btn icon class="elevation-0" v-if="isAuthenticated && loggedInUser.user.username != event.username" @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn> -->
        <v-row class="ma-0">
            <v-col cols="12" md="6" >
                <v-row>
                    <v-col class="px-0">
                        <v-btn icon class="elevation-0 " @click="goback()" style="margin-left:-6px"
                        v-if="isAuthenticated && loggedInUser.user.username == event.username">
                            <v-icon class="float-left">mdi-arrow-left</v-icon>
                        </v-btn>
                        <v-btn icon class="elevation-0 " @click="goback()" style="margin-left:-6px" v-else>
                            <v-icon class="float-left">mdi-arrow-left</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col align="end" class="pt-5 px-0" v-if="isAuthenticated && loggedInUser.user.username == event.username" >
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small icon v-bind="attrs"
                        v-on="on">
                        <v-icon small color="black" @click="editEvent(event)">mdi-circle-edit-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Edit</span>
                    </v-tooltip>
                    <v-dialog v-model="deletedialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-tooltip top v-bind="attrs" v-on="on">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small icon >
                            <v-icon small color="error" @click="deletedialog = true" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete</span>
                        </v-tooltip>
                    </template>
                    <v-card class="pa-4">
                        <p>Are you sure you want to delete this event?</p>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="deleteLoading"
                            @click="deleteEvent">Delete</v-btn>
                        <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="deletedialog = false">
                            Cancel
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    </v-col>
                </v-row>
                <div style="max-width:440px" class="mx-auto">
                <v-row class="mt-md-2">
                <v-col cols="12" class="pa-0"> <h1 >{{event.name}}</h1></v-col>
                </v-row>
                <v-row>
                <h3 v-if="event.start_date" class="red--text mt-1 font-weight-light " > <v-icon class="mr-2 black--text" >mdi-calendar</v-icon> {{moment(event.start_date)}}
                <!-- {{getTime(event.start_date).date}} -->
                </h3>
                </v-row>
                <v-row v-if="event.date_time">
                <h3 class="red--text font-weight-light"> {{event.date_time}}</h3>
                </v-row>
                <v-row v-if="event.city || event.venue || event.country">
                    <h4 class="mr-2 mt-2 font-weight-light" ><v-icon class="mr-2 black--text">mdi-map-marker-outline</v-icon>{{event.venue}} <b >{{event.city}}<span v-if="event.city && event.country">, </span> {{countryIs(event.country)}}</b></h4>
                </v-row>
                <v-row class="mb-2">
                    <v-btn v-if="!imgoing" small class="elevation-0 text-decoration-none mt-6" color="#815A44" outlined @click="imgoingApi">
                        <h4 class="font-weight-medium" style="text-transform: capitalize;"> <v-icon small class="pr-2">mdi-star-outline</v-icon>going</h4>
                    </v-btn>
                    <v-btn v-else small class="elevation-0 text-decoration-none mt-6" color="#815A44" dark @click="imgoingApi">
                        <h4 class="font-weight-medium" style="text-transform: capitalize;"> <v-icon small class="pr-2">mdi-star-outline</v-icon>going</h4>
                    </v-btn>
                    <v-btn small class="elevation-0 text-decoration-none mt-6 ml-2" @click="openLink" v-if="event.link">
                        <h4 class="font-weight-medium" style="text-transform: capitalize;"><v-icon small class="pr-2">mdi-info-outline</v-icon>More Info</h4>
                    </v-btn>
                </v-row>
                <v-row v-if="goingList && goingList.length>0">
                    <p class="hover" @click="showGoingList =true">{{goingList.length}} people joining</p>
                </v-row>
                <v-dialog
                :retain-focus="false"
                v-model="showGoingList"
                width="480px" 
                persistent>
                <v-container class="rounded-lg white pa-4">
                <v-row align="end" justify="end" class="pa-0 ma-0" >
                <v-btn icon  color="error" class="float-right" @click="showGoingList =false;">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-row>
                <p>People attending</p>
                <v-text-field label="check em out" v-model= "search" solo rounded
                prepend-inner-icon="mdi-magnify"
                ></v-text-field>
                <div v-for="people in filterPeople" :key="people.uuid" class="mb-2 mb-md-4">
                    <nuxt-link v-if="people.artist && people.artist.username" :to="'/'+people.artist.username" class="text-decoration-none"><v-avatar size="26px" v-if="people.artist && people.artist.thumb">
                        <v-img :src="people.artist.thumb"></v-img>
                    </v-avatar>
                     <span class="pl-2">{{people.artist.artist_name}}</span></nuxt-link>
                    <p v-else>{{people.username}} </p>
                </div>
                </v-container>
            </v-dialog> 
                <!-- <span v-if="event.about" style=""></span> -->
                <v-row class="mt-6" v-if="event.about">
                <div style="
                    max-height:190px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    text-align:justify;">
                <p class="font-weight-light ">{{event.about}}</p>
                </div>
                </v-row>
                </div>
            </v-col>
            <v-col cols="12" md="6" class="px-0">
                <v-img :src = "event.poster"  maxHeight="415px" contain ></v-img>
            </v-col>
        </v-row>
        <v-row v-if="videoId" class="ma-0 mt-10">
            <youtube class=" mx-auto" aspect-ratio="1" :video-id= 'videoId'></youtube>
            <!-- <youtube style="max-width:95%; margin:auto;height:auto;" class="hidden-sm-and-up" :video-id= 'videoId'></youtube> -->
        </v-row>
        <h2 v-if="event.event_guests && event.event_guests.length>0" class="my-6" > Guests</h2>
        <v-row class="ma-0" >
            <v-col cols="6" sm="4" v-for="guest in event.event_guests" :key ="guest.index" class="pa-1">
            <guest-card :guest="guest" :poster="event.poster"></guest-card>
            </v-col>
        </v-row>
        <h2 v-if="event.event_battles.length>0 || event.event_subevents.length>0" class="my-6" > Programs</h2>
        <v-row class="ma-0" >
            <v-col cols="6" sm="6" v-for="category in event.event_battles" :key ="category.index" class="pa-1">
            <category-card :category="category" :poster="event.poster"></category-card>
            </v-col>
            <v-col cols="6" sm="6" v-for="category in event.event_subevents" :key ="category.index" class="pa-1">
            <category-card :category="category" :poster="event.poster"></category-card>
            </v-col>
        </v-row>
        <!-- <v-row>
            <p>Contact organisers</p>
        </v-row> -->
        </v-container>
        <v-snackbar v-model="going_snackbar">
            Great, see you there.
        </v-snackbar>
        <v-snackbar v-model="notgoing_snackbar">
            See you next time.
        </v-snackbar>
        <v-snackbar v-model="login_snackbar">
            Please sign in first.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            Some error occured. Please try again.
        </v-snackbar>
  </v-app>
</template>

<script>
import CategoryCard from '@/components/CategoryCard.vue'
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import GuestCard from '~/components/GuestCard.vue'
import moment from 'moment'
// import CookingCard from '~/components/CookingCard.vue'
export default {
    head() {
        return {
            title: 'gebbles - events',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this event #'
                }
            ]
        }
    },
    created(){
        this.checkGoing();
    },
    mounted(){
        if(this.event.videolink )
        this.videoId = getIdFromURL(this.event.videolink )//getting id from video url
        // this.imgoingId = await EventService.getEvent(params.uuid)
        //call api to see if user exists in imgoing data base
        // this.imgoing = true
        //save id of that instance
    },
    components:{
        Youtube,
        CategoryCard,
        GuestCard
    },
    data(){
          return {
              search:'',
            deletedialog:false,
            deleteLoading:false,
            looploader:[1,1,1,1,1,1],
            loading: true,
            dynamic_height: 50,
            videoId:'',
            going_snackbar:false,
            notgoing_snackbar:false,
            login_snackbar:false,
            error_snackbar:false,
            goingForm:{
                username: "",
                event:""
            },
            event:{},
            goingList:[],
            showGoingList:false,
            imgoing:false,
            imgoingId:'',
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
            }
    },
	computed: {
        ...mapGetters([ 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', ]),
        filterPeople: function(){
        if(this.search)
        {
            return this.goingList.filter((people) => {
                return people.username.toLowerCase().match(this.search.toLowerCase());});
        }
        else return this.goingList
        }
    },
    async asyncData({error, params}) {
      try {
         let event = await EventService.getEvent(params.uuid)
         return {
             event : event.data
             }
        } catch (err) {
            console.log(err.response);
            error({statusCode:503,  message: err.message})
        }
    },
    methods:{
        moment(date){
           return moment(date).format("ll")
        },
        checkGoing(){
            EventService.getIamGoingList(this.event.uuid).then(res=>{
            this.goingList = res.data.results;
            
            if(this.isAuthenticated){
                let isGoing = this.goingList.find(artist => artist.username == this.loggedInUser.user.username);
                if(isGoing != undefined)
                {
                    //change color of button
                    this.imgoing = true;
                    this.imgoingId = isGoing.uuid;
                }
            }
        })
        },
        goback(){
            window.history.back();
        },
        openLink(){
            var url = this.event.link;
            var win = window.open(url, '_blank');
            win.focus();
        },
        // getTime(timestamp){
        //     const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //     let date = timestamp;
        //     let datetype= date.slice(8, 10);
        //     let month = date.slice(5, 7);
        //     let yeartype = date.slice(0, 4)
        //     const regex = new RegExp("^0+(?!$)",'g');
        //     month = month.replaceAll(regex, "");
        //     let monthtype = months[month-1]
        //     date = datetype+" "+monthtype +" "+yeartype;
        //     return{ date}
        // },
        countryIs(code){
            let country = this.countries[this.countries.findIndex(country => country.code == code)].name
            return country;
        },
        //check country name based on code
        deleteEvent(){
            this.deleteLoading = true;
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            try {
                this.$axios.$delete("/v1/events/"+this.event.uuid, config).then(res=>{
                console.log("event deleted",res);
                this.deleteLoading = false;
                this.$router.push("/events");
                })
            } catch (e) {
                console.log(e.response);
                this.deleteLoading = false;
            }
        },
        editEvent(event){
        console.log("edit");
        this.$store.dispatch("check_editing_event_obj", event);
        this.$router.push("/create/events");
        },
        async imgoingApi(){
            // check database for username in going event
            //if yes->delete; if no ->create
            if(this.isAuthenticated){
                this.goingForm.username = this.loggedInUser.user.username;
                this.goingForm.event = this.event.uuid;
                this.imgoing = !this.imgoing
                if(!this.imgoing){
                    const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                    }
                    };
                    try {
                        await this.$axios.$delete("/v1/events/iamgoing/"+this.imgoingId , config)
                        this.notgoing_snackbar=true;
                        const indexOfObject = this.goingList.findIndex(object => {
                        return object.uuid == this.imgoingId;
                        });
                        this.goingList.splice(indexOfObject, 1);
                        this.imgoingId='';
                    } catch (e) {
                        this.imgoing = !this.imgoing
                        console.log(e, e.response);
                        this.error_snackbar = true;
                    }
                }
                else{
                    const config = {
                        headers: {"content-type": "multipart/form-data",
                            "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                        }
                    };
                    let formData = new FormData();
                    for (let data in this.goingForm) {
                        formData.append(data, this.goingForm[data]);
                    }
                    try {
                        let res = await this.$axios.$post("/v1/events/iamgoing/create/", formData, config)
                        this.checkGoing();
                        this.going_snackbar = true;
                        } catch (e) {
                            this.imgoing = !this.imgoing
                            console.log(e, e.response);
                            this.error_snackbar = true;
                        }
                }
            }
            else{
                this.login_snackbar = true
            }
        }
    }
    
}
</script>
<style  scoped>
.hover:hover{
    cursor: pointer;
    text-decoration: underline;
}
</style>
