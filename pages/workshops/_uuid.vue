<template>
  <v-app>
        <v-container class=" mx-auto" fluid style="max-width:950px" >
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <!-- <v-spacer></v-spacer> -->
        <div v-if="isAuthenticated && loggedInUser.username == workshop.username" class="float-right">
        <v-col class="pa-1" >
        <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-btn small icon v-bind="attrs"
            v-on="on">
            <v-icon small color="black" @click="editWorkshop(workshop)">mdi-circle-edit-outline</v-icon>
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
            <p>Are you sure you want to delete this workshop?</p>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="deleteLoading"
                @click="deleteWorkshop">Delete</v-btn>
            <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="deletedialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        </v-col>
        </div>
        </v-container>
        <v-container class="mx-auto" fluid style="max-width:950px" >
        <v-row>
            <v-col cols="12" sm="6" align="center" justify="center">
                <v-img :src = "workshop.poster" class="black" maxHeight="540px" contain ></v-img>
            </v-col>
            <v-col cols="12" sm="6" justify="center" > 
            <h5 class="caption font-weight-light">{{moment(workshop.created)}} </h5>
            <h1 class="font-weight-medium display-1">{{workshop.title}}</h1>
            <h4 v-if="workshop.start_date" class="red--text mt-2 font-weight-medium " > 
                <v-icon class="mr-2" >mdi-calendar</v-icon> {{moment(workshop.start_date)}}
            </h4>
            <h4 v-if="workshop.datetime" class="red--text font-weight-medium mt-2"> 
                <v-icon class="mr-2" >mdi-clock</v-icon> {{workshop.datetime}}</h4>
            <h4 v-if=" workshop.venue || workshop.country" class="mr-2 mt-2 font-weight-medium " >
                <v-icon class="mr-2">mdi-map-marker-outline</v-icon>
                {{workshop.venue}}<span v-if="workshop.venue && workshop.country">, 
                    </span> {{countryIs(workshop.country)}}</h4>
            <div class="py-4 py-md-6">
            <v-btn v-if="!imgoing" small class="elevation-0 text-decoration-none " color="#815A44" outlined @click="imgoingApi">
                <h4 class="font-weight-medium" style="text-transform: capitalize;"> <v-icon small class="pr-2">mdi-hand-back-left-outline</v-icon>Going</h4>
            </v-btn>
            <v-btn v-else small class="elevation-0 text-decoration-none" color="#815A44" dark @click="imgoingApi">
                <h4 class="font-weight-medium" style="text-transform: capitalize;"> <v-icon small class="pr-2">mdi-hand-back-left-outline</v-icon>Going</h4>
            </v-btn>
            <p v-if="goingList && goingList.length>0" class="hover font-weight-medium mt-4 mb-0" @click="showGoingList =true">{{goingList.length}}<span v-if="goingList.length==1"> person</span> <span v-else> people</span> joining</p>

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
            <nuxt-link :to="'/' + workshop.teacher1" v-if=" workshop.teacher1" class="text-decoration-none">
                <h3 v-if="workshop.name1" class="font-weight-light ">{{workshop.name1}}</h3>
            </nuxt-link>
            <h3 v-else class="font-weight-light ">{{workshop.name1}}</h3>
                <p v-if="workshop.content" class="font-weight-light text-pre-wrap about_content ">{{workshop.content}}</p>
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
        <h2 v-if="workshop.iglink || workshop.contact_email" class="my-6">Social handles</h2>
        <v-row class="mb-md-12 mb-6" >
            <v-btn v-if="workshop.iglink"  class="text-decoration-none mx-2" color="black" icon @click="openig" >
                <v-icon class="mr-1">mdi-instagram</v-icon>
            </v-btn>
            <v-btn v-if="workshop.contact_email" class="text-decoration-none mx-2" color="black" icon @click="openemail" >
                <v-icon class="mr-1">mdi-email</v-icon>
            </v-btn>
        </v-row>
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
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import GuestCard from '~/components/GuestCard.vue'
import moment from 'moment'
export default {
    head() {
        return {
            title: 'gebbles - workshops',     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this workshop #'
                }
            ]
        }
    },
    layout:'simple',
    created(){
        this.checkGoing();
    },
    mounted(){
        if(this.workshop.videolink )
        this.videoId = getIdFromURL(this.workshop.videolink )//getting id from video url
        // this.imgoingId = await EventService.getEvent(params.uuid)
        //call api to see if user exists in imgoing data base
        // this.imgoing = true
        //save id of that instance
    },
    components:{
        Youtube,
        GuestCard
    },
    data(){
          return {
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
                    workshop:""
                },
                workshop:{},
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
         let workshop = await EventService.getWorkshop(params.uuid)
         return {
             workshop : workshop.data
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
            EventService.getIamGoingWorkshopList(this.workshop.uuid).then(res=>{
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
        openig(){
            var url = this.workshop.iglink;
            var win = window.open(url, '_blank');
            win.focus();
        },
        openemail(){
            var url = "mailto:"+this.workshop.contact_email;;
            var win = window.open(url, '_blank');
            win.focus();
        },
        countryIs(code){
            let country = this.countries[this.countries.findIndex(country => country.code == code)].name
            return country;
        },
        //check country name based on code
        deleteWorkshop(){
            this.deleteLoading = true;
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            try {
                this.$axios.$delete("/v1/workshops/"+this.workshop.uuid, config).then(res=>{
                console.log("workshop deleted",res);
                this.deleteLoading = false;
                this.$router.push("/workshops");
                })
            } catch (e) {
                console.log(e.response);
                this.deleteLoading = false;
            }
        },
        editWorkshop(workshop){
        this.$store.dispatch("check_editing_workshop_obj", workshop);
        this.$router.push("/create/workshop");
        },
        async imgoingApi(){
            // check database for username in going workshop
            //if yes->delete; if no ->create
            if(this.isAuthenticated){
                this.goingForm.username = this.loggedInUser.username;
                this.goingForm.workshop = this.workshop.uuid;
                this.imgoing = !this.imgoing
                if(!this.imgoing){
                    const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                    };
                    try {
                        await this.$axios.$delete("/v1/workshops/iamgoing/"+this.imgoingId , config)
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
                        let res = await this.$axios.$post("/v1/workshops/iamgoing/create/", formData, config)
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
    text-decoration: underline;
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
