<template>
  <v-app>
        <v-container class=" mx-auto" fluid style="max-width:950px" >
        <!-- <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn> -->
        <!-- <v-row>
            <v-col class="py-0">
            <h5 class="caption font-weight-light">{{moment(event.created)}} </h5>
            </v-col>
        </v-row> -->
        <v-list two-line class="pa-0" color="background">
        <v-list-item class="pa-0">
            <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <!-- <v-list-item-avatar>
                <v-icon size="36" class="ma-0">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title><nuxt-link class="text-decoration-none" to="event.username">{{event.username}}</nuxt-link></v-list-item-title>
            <v-list-item-subtitle> {{emoment(event.created)}}</v-list-item-subtitle>
            </v-list-item-content> -->
            <v-list-item-action>
                <v-menu v-if="isAuthenticated && loggedInUser.username == event.username" 
                    transition="slide-y-transition" open-on-hover offset-y bottom left>
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                        </div>
                    </template>
                    <v-list>
                        <v-list-item
                        class="text-decoration-none pl-5 pr-8"
                        @click="editEvent(event)"
                        >
                        <v-list-item-icon>
                        <v-icon>mdi-book-edit-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        class="text-decoration-none pl-5 pr-8"
                        @click="deletedialog = true"
                        >
                        <v-list-item-icon>
                        <v-icon>mdi-delete-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-list-item-action>
        </v-list-item>
        </v-list>
        <v-dialog v-model="deletedialog" width="500">
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
        <v-row>
            <v-col cols="12" sm="6" align="center" justify="center" class="d-flex align-content-center flex-wrap">
                <v-img :src = "event.poster" class="black" maxHeight="540px" contain ></v-img>
            </v-col>
            <v-col cols="12" sm="6" justify="center" > 
            <!-- <h5 class="caption font-weight-light">{{moment(event.created)}} </h5> -->
            <h1 class="font-weight-medium display-1">{{event.name}}</h1>
            <h3 v-if="event.start_date" class="red--text mt-2 font-weight-medium " > 
                <v-icon class="mr-2" >mdi-calendar</v-icon> {{moment(event.start_date)}}
            </h3>
            <h3 v-if="event.date_time" class="red--text font-weight-medium "> {{event.date_time}}</h3>
            <h4 v-if="event.city || event.venue || event.country" class="mr-2 mt-2 font-weight-medium " ><v-icon class="mr-2 ">mdi-map-marker-outline</v-icon>{{event.venue}}<span v-if="event.venue && event.country">, </span> {{countryIs(event.country)}}</h4>
            <div class="py-4 py-md-6">
            <v-btn v-if="!imgoing" small class="elevation-0 text-decoration-none " color="#815A44" outlined @click="imgoingApi">
                <h4 class="font-weight-medium" style="text-transform: capitalize;"> <v-icon small class="pr-2">mdi-hand-back-left-outline</v-icon>Going</h4>
            </v-btn>
            <v-btn v-else small class="elevation-0 text-decoration-none" color="#815A44" dark @click="imgoingApi">
                <h4 class="font-weight-medium" style="text-transform: capitalize;"> <v-icon small class="pr-2">mdi-hand-back-left-outline</v-icon>Going</h4>
            </v-btn>
            <v-btn small class="elevation-0 text-decoration-none ml-2" @click="openLink" v-if="event.link">
                <h4 class="font-weight-medium" style="text-transform: capitalize;"><v-icon small class="pr-2">mdi-link</v-icon>More Info</h4>
            </v-btn>
            <p v-if="goingList && goingList.length>0" class="hover font-weight-medium mt-4 mb-0" @click="showGoingList =true">{{goingList.length}}<span v-if="goingList.length==1"> person</span> <span v-else> people</span> joining</p>

            <p v-if="event.photo1|| event.photo2 || event.photo3" class="hover font-weight-medium mt-2 mb-0" @click="glance_dialog =true">A quick glance</p>
            </div>
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
                <p class="px-2">People attending</p>
                <v-text-field label="check em out" v-model= "search" solo rounded class="px-2"
                prepend-inner-icon="mdi-magnify"
                ></v-text-field>
                <div v-for="people in filterPeople" :key="people.uuid" class="mb-2 mb-md-4 px-2">
                    <nuxt-link v-if="people.artist && people.artist.username" :to="'/'+people.artist.username" class="text-decoration-none"><v-avatar size="26px" v-if="people.artist && people.artist.thumb">
                        <v-img :src="people.artist.thumb"></v-img>
                    </v-avatar>
                    <span class="pl-2">{{people.artist.artist_name}}</span></nuxt-link>
                    <p v-else>{{people.username}} </p>
                </div>
                </v-container>
            </v-dialog> 
            <v-card v-if="event.about" elevation="0" outlined class="pa-3">
            <p class="font-weight-light text-pre-wrap about_content mb-0">{{event.about}}</p>
            </v-card>
            </v-col>
        </v-row>
        <div v-if="videoId" class="mt-md-10 mt-4">
            <center class="py-6 hidden-xs-only">
                <youtube width="100%" height="408" :video-id= 'videoId'></youtube>
            </center>
            <center class="my-6 hidden-sm-and-up">
                <youtube width="100%" height="220" :video-id= 'videoId'></youtube>
            </center>
        </div>
        <h2 v-if="event.event_guests.length>0" class="my-6 font-weight-medium" > Guests</h2>
        <v-row class="ma-0" >
            <v-col cols="6" sm="4" v-for="guest in event.event_guests" :key ="guest.index" class="pa-1">
            <guest-card :guest="guest" :poster="event.poster" ></guest-card>
            </v-col>
        </v-row>
        <h2 v-if="event.event_battles.length>0 || event.event_subevents.length>0" class="my-6 font-weight-medium" > Programs</h2>
        <v-row class="ma-0" >
            <v-col cols="6" sm="6" v-for="category in event.event_battles" :key ="category.index" class="pa-1">
            <category-card :category="category" :poster="event.poster"></category-card>
            </v-col>
            <v-col cols="6" sm="6" v-for="category in event.event_subevents" :key ="category.index" class="pa-1">
            <category-card :category="category" :poster="event.poster"></category-card>
            </v-col>
        </v-row>
        <h2 class="my-6">Social handles</h2>
        <v-row class="mb-md-12 mb-6" >
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-if="event.username" class="text-decoration-none mx-2" color="black" icon :to="'/'+event.username" 
                    v-bind="attrs" 
                    v-on="on">
                    <v-icon >mdi-account-outline</v-icon>
                </v-btn>
                </template>
                <span>{{event.username}}</span>
            </v-tooltip>
            <v-btn v-if="event.iglink"  class="text-decoration-none mx-2" color="black" icon @click="openig" >
                <v-icon >mdi-instagram</v-icon>
            </v-btn>
            <v-tooltip bottom v-if="event.contact_email">
                <template v-slot:activator="{ on, attrs }">
                <v-btn class="text-decoration-none mx-2" color="black" icon  @click="openemail"
                    v-bind="attrs" 
                    v-on="on">
                    <v-icon >mdi-email-outline</v-icon>
                </v-btn>
                </template>
                <span>{{event.contact_email}}</span>
            </v-tooltip>
        </v-row>
        <h2 v-if="event_guests_team.length>0" class="my-6">Team</h2>
        <v-row class="ma-0" >
            <v-col cols="6" sm="4" v-for="guest in event_guests_team" :key ="guest.index" class="pa-1">
            <guest-card :guest="guest" :poster="event.poster"></guest-card>
            </v-col>
        </v-row>
        </v-container>
        <v-dialog
            max-width="800"
            v-model="glance_dialog"
            persistent
            class="ma-12 ma-md-24 overflow-hidden">
            <div class="rounded-lg white" max-width="800"> 
            <v-row align="end" justify="end" class="pt-3 px-2 ma-0 " >
            <v-btn icon color="error" @click="glance_dialog = false"  align="end" justify="end" >
                <v-icon >mdi-close</v-icon>
            </v-btn>
            </v-row>
            <v-row align="center" justify="center" class="ma-0 pa-4">
                <client-only>
                <Slider 
                    :autoplay = false
                    width="768px" :height="sliderheight"
                    >
                    <div v-if="event.photo1 !=null">
                    <SliderItem>
                    <v-img
                    :src="event.photo1"
                    contain
                    :max-height="sliderheight"
                    max-width="768px" >
                    </v-img>
                    </SliderItem>
                    </div>
                    <div v-if="event.photo2!=null">
                    <SliderItem>
                    <v-img
                            :src="event.photo2"
                            contain
                            :max-height="sliderheight"
                            width="768px"
                        >
                        </v-img>
                    </SliderItem>
                    </div>
                    <div v-if="event.photo3!=null">
                    <SliderItem>
                    <v-img
                            :src="event.photo3"
                            contain
                            :max-height="sliderheight"
                            width="768px"
                        >
                        </v-img>
                    </SliderItem>
                    </div>
                </Slider>
                </client-only>
            </v-row>
            </div>
        </v-dialog>
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
import { Slider, SliderItem } from "vue-easy-slider";
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
    layout:'simple',
    created(){
        // if(this.event.event_guests.length>0)
        // {this.event_guests_team = this.event.event_guests.filter(item => item.category.includes('5'))
        // this.event.event_guests = this.event.event_guests.filter(item => !item.category.includes('5'))}
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
        GuestCard,
        Slider,
        SliderItem,
    },
    data(){
          return {
                event_guests_team:[],
                search:'',
                deletedialog:false,
                deleteLoading:false,
                looploader:[1,1,1,1,1,1],
                loading: true,
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
                glance_dialog:false,
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
        },
        sliderheight(){
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '310px'
          case 'sm': return '310px'
          case 'md': return '510px'
          case 'lg': return '510px'
          case 'xl': return '510px'
        }
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
        emoment(date){
           return moment(date).fromNow()
        },
        checkGoing(){
            EventService.getIamGoingEventList(this.event.uuid).then(res=>{
            this.goingList = res.data.results;
            
            if(this.isAuthenticated){
                let isGoing = this.goingList.find(artist => artist.username == this.loggedInUser.username);
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
        openig(){
            var url = this.event.iglink;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openemail(){
            var url = "mailto:"+this.event.contact_email;;
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
                    "Authorization": this.$auth.strategy.token.get()
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
        // console.log("edit");
        this.$store.dispatch("check_editing_event_obj", event);
        this.$router.push("/create/event");
        },
        async imgoingApi(){
            // check database for username in going event
            //if yes->delete; if no ->create
            if(this.isAuthenticated){
                this.goingForm.username = this.loggedInUser.username;
                this.goingForm.event = this.event.uuid;
                this.imgoing = !this.imgoing
                if(!this.imgoing){
                    const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
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
                            "Authorization": this.$auth.strategy.token.get()
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
<style scoped>
.v-icon:hover{
    color: #815A44;
}
.about_content{
    max-height:220px;
    overflow-y: auto;
    text-align:justify;
}
.venue_content{
  max-height: 456px;
  overflow: auto;
}
.hover:hover{
    cursor: pointer;
}
.width{
    max-width:950px;
}
@media only screen and (max-width: 960px) {
  .width{
  max-width: 357px;
}
}
</style>
