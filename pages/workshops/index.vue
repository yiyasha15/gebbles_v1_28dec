<template>
    <v-app>
      <v-container class="mx-auto width" >
      <v-row>
        <v-col cols="12" md="6"  class="justify-center">
          <h2 class ="xs12 font-weight-medium">Workshops</h2>
          <!-- <v-spacer></v-spacer> -->
        </v-col>
        <v-col cols="12" md="6" class= "justify-end py-0 py-md-3" >
          <v-autocomplete
              v-if="filterByCountry"
              label="Filter by country" v-model= "search" solo rounded
              @input="debounceSearchCountry" prepend-inner-icon="mdi-earth"
              :items="countries"
              item-text="name"
              item-value="code"
              value="name"
              clearable
          >
          <template v-slot:append-outer>
          <v-menu offset-y bottom left >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="float-right" v-bind="attrs" v-on="on">
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByThisMonth"
                >
                <v-list-item-title>This month</v-list-item-title>
                </v-list-item>
                <!-- <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByCountry =true; filterByName = false; filterByMonth=false;"
                >
                <v-list-item-title>Country</v-list-item-title>
                </v-list-item> -->
                <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByName=true; filterByCountry =false; filterByMonth=false;"
                >
                <v-list-item-title>Workshop name</v-list-item-title>
                </v-list-item>
                
                <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="seeAll"
                >
                <v-list-item-title>See All</v-list-item-title>
                </v-list-item>
            </v-list>
          </v-menu>
          </template>
          </v-autocomplete>
          <v-text-field 
              v-if="filterByName"
              label="Workshop name" v-model= "search" solo rounded
              @input="debounceSearchName" prepend-inner-icon="mdi-calendar-heart-outline"
              clearable
          >
          <template v-slot:append-outer>
          <v-menu offset-y bottom left >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="float-right" v-bind="attrs" v-on="on">
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByThisMonth"
                >
                <v-list-item-title>This month</v-list-item-title>
                </v-list-item>
                <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByCountry =true; filterByName = false; filterByMonth=false;"
                >
                <v-list-item-title>Country</v-list-item-title>
                </v-list-item>
                <!-- <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByCountry =false; filterByName = true; filterByMonth=false;"
                >
                <v-list-item-title>Workshop name</v-list-item-title>
                </v-list-item> -->
                <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="seeAll"
                >
                <v-list-item-title>See All</v-list-item-title>
                </v-list-item>
            </v-list>
          </v-menu>
          </template>
          </v-text-field>
          <v-text-field
            max-length=0
              v-if="filterByMonth"
              label="This month" v-model= "search" solo rounded 
              prepend-inner-icon="mdi-calendar-heart-outline"
              clearable
          >
          <template v-slot:append-outer>
          <v-menu offset-y bottom left >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="float-right" v-bind="attrs" v-on="on">
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </template>
            <v-list>
              <!-- <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByMonth"
                >
                <v-list-item-title>This month</v-list-item-title>
                </v-list-item> -->
                <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByCountry =true; filterByName = false; filterByMonth=false;"
                >
                <v-list-item-title>Country</v-list-item-title>
                </v-list-item>
                <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="filterByCountry =false; filterByName = true; filterByMonth=false;"
                >
                <v-list-item-title>Workshop name</v-list-item-title>
                </v-list-item>
                <v-list-item
                class="text-decoration-none pl-6 pr-12"
                @click="seeAll"
                >
                <v-list-item-title>See All</v-list-item-title>
                </v-list-item>
            </v-list>
          </v-menu>
          </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-layout wrap row justify-start v-if="firstLoad" >
        <div v-for="n in this.looploader" :key ="n.index">
          <card-skeleton-loader></card-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" >
        <div v-for="workshop in workshops" :key ="workshop.index">
            <workshop-card :workshop="workshop" ></workshop-card>
        </div>
      </v-layout>
      <v-card v-intersect="infiniteScrolling"></v-card>
      <center v-if="!workshops.length && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo.png')"/>
        <h3>No workshops found. </h3>
      </center>
      </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
import WorkshopCard from '~/components/WorkshopCard.vue'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
export default {
  scrollToTop: true,
  head() {  
    return {
      title: 'workshops',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'gebbles - workshops'
        }
      ]
    }
  },
  created(){
    this.getAllWorkshops();
  },
  methods:{
    async getAllWorkshops(){
      try {
      const response = await EventService.getAllWorkshops()
      // console.log(response);
      this.workshops = response.data.results
      this.page = response.data.next
      this.firstLoad = false
      } catch (e) {
          console.log(e);
          this.firstLoad = false
      }
    },
    infiniteScrolling(entries, observer, isIntersecting) {
        if(this.page){
        const key = 'uuid';
        this.$axios.get(this.page).then(response => {
              this.page= response.data.next;
              response.data.results.forEach(item => this.workshops.push(item));
              // filter array so no duplicates
              this.workshops = [...new Map(this.workshops.map(item =>
                [item[key], item])).values()];
          })
          .catch(err => {
            console.log(err);
          });
        }
    },
    debounceSearchCountry() {
    this.firstLoad = true;
    this.workshops=[];
    this.page='';
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
      if(this.search){EventService.getSearchedWorkshopCountry(this.search).then((value) => {
        console.log("this.search",this.search,value.data);
      this.firstLoad = false
      this.workshops = value.data
      });}
      else{
        this.getAllWorkshops();
      }
      }, 600)
    },
    debounceSearchName() {
    this.firstLoad = true;
    this.workshops=[];
    this.page='';
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
      if(this.search){EventService.getSearchedWorkshopName(this.search).then((value) => {
        console.log("this.search",this.search,value.data);
      this.firstLoad = false
      this.workshops = value.data
      });}
      else{
        this.getAllWorkshops();
      }
      }, 600)
    },
    async filterByThisMonth(){
      this.filterByMonth=true
      this.filterByName=false; 
      this.filterByCountry =false
      this.firstLoad = true
      this.workshops=[]
      this.page=''
      try {
      const response = await EventService.getSearchedWorkshopThisMonth()
      console.log(response);
      this.workshops = response.data
      // this.page = response.data.next
      this.firstLoad = false
      } catch (e) {
          console.log(e, e.response);
          this.firstLoad = false
      }
    },
    seeAll(){
      this.firstLoad = true;
      this.workshops=[];
      this.page='';
      this.getAllWorkshops();
      this.filterByCountry=true;
      this.filterByName=false;
      this.filterByMonth=false;
    }
  },
  components: {
    WorkshopCard,
    CardSkeletonLoader

  },
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      workshops:[],
      search: "",
      debounce: null,
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
      filterByCountry:true,
      filterByName:false,
      filterByMonth:false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
    // filterApi: function(){
    //   return this.workshops.filter((event) => {
    //     return event.country.toLowerCase().match(this.search.toLowerCase())||event.name.toLowerCase().match(this.search.toLowerCase());
    //   });
    // }
  },
}
</script>
<style scoped>

.width{
    max-width: 670px;
  }
@media only screen and (max-width: 960px) {
  .width{
  max-width: 357px;
}
}
</style>
