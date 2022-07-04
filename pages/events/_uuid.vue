<template>
  <v-app>
       <!-- <v-container class=" mx-auto" fluid style="max-width:950px" >
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
       </v-container> -->
        <v-container class="mx-auto" fluid style="max-width:950px" >
        <!-- individual event page
        {{event}} -->
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <v-row class="ma-0">
            <v-col cols="12" md="6" >
                <v-row>
                   <h1 class="mt-4">{{event.name}}</h1>
                </v-row>
                <v-row>
                   <h2 v-if="event.start_date" class="red--text mt-1" >  {{getTime(event.start_date).date}} at 12:45am</h2>
                </v-row>
                <v-row>
                   <h4 v-if="event.city || event.venue" class=" font-weight-light" >{{event.venue}} <b>{{event.city}}</b></h4><country-flag class="ml-2" :country= 'event.country'/>
                </v-row>
                <v-row>
                    <v-btn small  class="elevation-0 text-decoration-none mt-6" @click="openLink">
                        <h4 class="font-weight-medium" style="text-transform: capitalize;">More Info</h4>
                    </v-btn>
                </v-row>
            </v-col>
            <v-col cols="12" md="6" align="center" justify="center" class="px-0">
                <v-img :src = "event.poster"  contain></v-img>
            </v-col>
        </v-row>
        <v-row class="ma-0">
        <h4 class="my-6 font-weight-light" > {{event.about}}</h4>
        </v-row>
        <v-row class="ma-0">
            <youtube class="hidden-sm-and-down mx-auto" aspect-ratio="1" :video-id= 'videoId'></youtube>
            <youtube style="max-width:90%; margin:auto;height:auto;" class="hidden-md-and-up" :video-id= 'videoId'></youtube>
        </v-row>
        <h2 class="my-6 font-weight-light" > Programs</h2>
        <v-row class="ma-0">
            <v-col cols="4"  v-for="category in battle_categories" :key ="category.index" class=" hidden-md-and-up">
            <category-card :category="category"></category-card>
            </v-col>
            <v-col cols="4"  v-for="category in battle_categories" :key ="category.index" class=" hidden-sm-and-down">
            <category-card-desktop :category="category"></category-card-desktop>
            </v-col>
        </v-row>
        </v-container>
  </v-app>
</template>

<script>
import CategoryCard from '@/components/CategoryCard.vue'
import CategoryCardDesktop from '@/components/CategoryCardDesktop.vue'
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
// import CookingCard from '~/components/CookingCard.vue'
export default {
    head() {
        return {
            title: 'event',     //do not miss "this"
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
        let url1 =this.event.videolink //getting value of youtube video urls
        if(url1)
        this.videoId = getIdFromURL(url1) //getting id from video url
    },
    components:{
        Youtube,
        CountryFlag,
        CategoryCard,
        CategoryCardDesktop
    },
    data(){
          return {
            looploader:[1,1,1,1,1,1],
            loading: true,
            dynamic_height: 50,
            videoId:'',
            judges:{
                guest1:'',
                name1:'',
                photo1:'',
                videolink1:'',
                country1:'',
                info1:'',
            },
            battle_categories:[
            {
                event:'', // # must
                type:'battle',
                poster:'',
                name:'Hiphop 1 on 1', // # must
                dj:'DJ Piggo',
                mc:'MC Jenisha',
                judges:'Martha Nabwire',
                date:'',
                date_time:'',
                venue:'Ratopul',
                about:'',
                rules:'',
                prizes:'',
                guest1:'',
                name1:'',
                photo1:'',
                videolink1:'',
                country1:'',
                info1:'',
                guest2:'',
                name2:'',
                photo2:'',
                videolink2:'',
                country2:'',
                info2:'',
                guest3:'',
                name3:'',
                photo3:'',
                videolink3:'',
                country3:'',
                info3:'',
                guest4:'',
                name4:'',
                photo4:'',
                videolink4:'',
                country4:'',
                info4:'',
                guest5:'',
                name5:'',
                photo5:'',
                videolink5:'',
                country5:'',
                info5:'',
                guest6:'',
                name6:'',
                photo6:'',
                videolink6:'',
                country6:'',
                info6:'',
                guest7:'',
                name7:'',
                photo7:'',
                videolink7:'',
                country7:'',
                info7:'',
                dj1:'',
                djname1:'',
                djphoto1:'',
                djvideolink1:'',
                djcountry1:'',
                djinfo1:'',
                dj2:'',
                djname2:'',
                djphoto2:'',
                djvideolink2:'',
                djcountry2:'',
                djinfo2:'',
                mc1:'',
                mcname1:'',
                mcphoto1:'',
                mcvideolink1:'',
                mccountry1:'',
                mcinfo1:'',
                mc2:'',
                mcname2:'',
                mcphoto2:'',
                mcvideolink2:'',
                mccountry2:'',
                mcinfo2:'',
            },
            {
                event:'', // # must
                type:'workhop',
                poster:'',
                name:'Hiphop workshop by Martha', // # must
                dj:'',
                mc:'',
                judges:'',
                date:'',
                date_time:'',
                venue:'Ratopul',
                about:'',
                rules:'',
                prizes:'',
                guest1:'',
                name1:'',
                photo1:'',
                videolink1:'',
                country1:'',
                info1:'',
                guest2:'',
                name2:'',
                photo2:'',
                videolink2:'',
                country2:'',
                info2:'',
                guest3:'',
                name3:'',
                photo3:'',
                videolink3:'',
                country3:'',
                info3:'',
                guest4:'',
                name4:'',
                photo4:'',
                videolink4:'',
                country4:'',
                info4:'',
                guest5:'',
                name5:'',
                photo5:'',
                videolink5:'',
                country5:'',
                info5:'',
                guest6:'',
                name6:'',
                photo6:'',
                videolink6:'',
                country6:'',
                info6:'',
                guest7:'',
                name7:'',
                photo7:'',
                videolink7:'',
                country7:'',
                info7:'',
                dj1:'',
                djname1:'',
                djphoto1:'',
                djvideolink1:'',
                djcountry1:'',
                djinfo1:'',
                dj2:'',
                djname2:'',
                djphoto2:'',
                djvideolink2:'',
                djcountry2:'',
                djinfo2:'',
                mc1:'',
                mcname1:'',
                mcphoto1:'',
                mcvideolink1:'',
                mccountry1:'',
                mcinfo1:'',
                mc2:'',
                mcname2:'',
                mcphoto2:'',
                mcvideolink2:'',
                mccountry2:'',
                mcinfo2:'',
            },
            {
                event:'', // # must
                type:'workhop',
                poster:'',
                name:'Hiphop workshop by Kefton', // # must
                dj:'',
                mc:'',
                judges:'',
                date:'',
                date_time:'',
                venue:'Ratopul',
                about:'',
                rules:'',
                prizes:'',
                guest1:'',
                name1:'',
                photo1:'',
                videolink1:'',
                country1:'',
                info1:'',
                guest2:'',
                name2:'',
                photo2:'',
                videolink2:'',
                country2:'',
                info2:'',
                guest3:'',
                name3:'',
                photo3:'',
                videolink3:'',
                country3:'',
                info3:'',
                guest4:'',
                name4:'',
                photo4:'',
                videolink4:'',
                country4:'',
                info4:'',
                guest5:'',
                name5:'',
                photo5:'',
                videolink5:'',
                country5:'',
                info5:'',
                guest6:'',
                name6:'',
                photo6:'',
                videolink6:'',
                country6:'',
                info6:'',
                guest7:'',
                name7:'',
                photo7:'',
                videolink7:'',
                country7:'',
                info7:'',
                dj1:'',
                djname1:'',
                djphoto1:'',
                djvideolink1:'',
                djcountry1:'',
                djinfo1:'',
                dj2:'',
                djname2:'',
                djphoto2:'',
                djvideolink2:'',
                djcountry2:'',
                djinfo2:'',
                mc1:'',
                mcname1:'',
                mcphoto1:'',
                mcvideolink1:'',
                mccountry1:'',
                mcinfo1:'',
                mc2:'',
                mcname2:'',
                mcphoto2:'',
                mcvideolink2:'',
                mccountry2:'',
                mcinfo2:'',
            },
            ]
            }
    },
	computed: {
        ...mapGetters([ 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', ]),
	},
    async asyncData({error, params}) {
      try {
         let event = await EventService.getEvent(params.uuid)
         console.log(event);
         return {
             event : event.data
             }
        } catch (err) {
            console.log(err.response);
            error({statusCode:503,  message: err.message})
        }
    },
    methods:{
        formatTime() {
        const options = {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute:'2-digit'
        };
        let now = new Date().toLocaleString('en-US', options);
        return now;
        },
        goback(){
            this.$store.dispatch("remove_share_obj")
            this.$store.dispatch("remove_learnings")
            this.$store.dispatch("remove_love")
            window.history.back();
        },
        openLink(){
            var url = this.event.link;
            var win = window.open(url, '_blank');
            win.focus();
        },
        getTime(timestamp){
        const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = timestamp;
        let datetype= date.slice(8, 10);
        let month = date.slice(5, 7);
        let yeartype = date.slice(0, 4)
        const regex = new RegExp("^0+(?!$)",'g');
        month = month.replaceAll(regex, "");
        let monthtype = months[month-1]
        date = datetype+" "+monthtype +" "+yeartype;
        return{ date}
      }
    }
    
}
</script>
<style  scoped>

</style>
