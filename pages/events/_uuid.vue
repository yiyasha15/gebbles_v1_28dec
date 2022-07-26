<template>
  <v-app>
        <v-container class="mx-auto" fluid style="max-width:950px" >
        <v-btn icon class="elevation-0  " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <!-- <v-row align="end" justify="end" class="pa-0 ma-0" > -->
            <v-menu v-if="isAuthenticated && loggedInUser.user.username == event.username"  transition="slide-y-transition" open-on-hover offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" class="float-right"
                    v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                    </div>
                </template>
                <v-list>
                    <v-list-item
                    class="text-decoration-none pl-6 pr-12"
                    color="black"
                    @click="editEvent(event)"
                    >
                    <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    color="error"
                    class="text-decoration-none pl-6 pr-12"
                    @click="deletedialog = true"
                    >
                    <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        <!-- </v-row> -->
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
        <v-row class="ma-0">
            <v-col cols="12" md="6" >
                <v-row class="mt-4">
                <v-col cols="10" class="px-0"> <h1 >{{event.name}}</h1></v-col>
                <v-col cols="2"><country-flag class="mt-1" :country= 'event.country'/></v-col>
                </v-row>
                <v-row>
                   <h3 v-if="event.start_date" class="red--text mt-1 font-weight-light" >  {{getTime(event.start_date).date}}</h3>
                </v-row>
                <v-row>
                   <h3 class="red--text font-weight-light"> {{event.date_time}}</h3>
                </v-row>
                <v-row>
                   <h4 v-if="event.city || event.venue" class=" font-weight-light" >{{event.venue}} <b>{{event.city}}</b></h4>
                </v-row>
                <v-row>
                    <v-btn small v-if="event.link" class="elevation-0 text-decoration-none mt-6" @click="openLink">
                        <h4 class="font-weight-medium" style="text-transform: capitalize;">More Info</h4>
                    </v-btn>
                </v-row>
            </v-col>
            <v-col v-if="event.poster" cols="12" md="6" align="center" justify="center" class="px-0">
                <v-img :src = "event.poster" contain max-height="440px"></v-img>
            </v-col>
        </v-row>
        <v-row v-if="event.about" class="ma-0">
        <h4 class="my-6 font-weight-light" > {{event.about}}</h4>
        </v-row>
        <v-row v-if="videoId" class="ma-0 mt-10">
            <youtube class=" mx-auto" aspect-ratio="1" :video-id= 'videoId'></youtube>
            <!-- <youtube style="max-width:95%; margin:auto;height:auto;" class="hidden-sm-and-up" :video-id= 'videoId'></youtube> -->
        </v-row>
        <h2 v-if="event.event_guests && event.event_guests.length>0" class="my-6  text-center" > Guests</h2>
        <v-row class="ma-0" justify="center">
            <v-col cols="6" sm="4" v-for="guest in event.event_guests" :key ="guest.index" class="px-1 py-1 py-sm-4 px-sm-0">
            <guest-card :guest="guest" ></guest-card>
            </v-col>
        </v-row>
        <h2 v-if="event.event_battles.length>0 || event.event_subevents.length>0" class="my-6  text-center" > Programs</h2>
        <v-row class="ma-0" justify="center">
            <v-col cols="6" sm="6" v-for="category in event.event_battles" :key ="category.index" class="px-1 py-1 py-sm-4 px-sm-0">
            <category-card :category="category"></category-card>
            </v-col>
            <v-col cols="6" sm="6" v-for="category in event.event_subevents" :key ="category.index" class="px-1 py-1 py-sm-4 px-sm-0">
            <category-card :category="category"></category-card>
            </v-col>
        </v-row>
        <!-- <v-row>
            <p>Contact organisers</p>
        </v-row> -->
        </v-container>
  </v-app>
</template>

<script>
import CategoryCard from '@/components/CategoryCard.vue'
// import CategoryCardDesktop from '@/components/CategoryCardDesktop.vue'
import EventService from '@/services/EventService.js'
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import GuestCard from '~/components/GuestCard.vue'
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
        if(this.event.videolink )
        {let url1 =this.event.videolink //getting value of youtube video urls
        if(url1)
        this.videoId = getIdFromURL(url1) }//getting id from video url
    },
    components:{
        Youtube,
        CountryFlag,
        CategoryCard,
        GuestCard
    },
    data(){
          return {
            deletedialog:false,
            deleteLoading:false,
            looploader:[1,1,1,1,1,1],
            loading: true,
            dynamic_height: 50,
            videoId:'',
            }
    },
	computed: {
        ...mapGetters([ 'userHasPortfolio', 'isAuthenticated',
        'loggedInUser', 'usersPortfolio', ]),
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
        },
        
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
    }
    
}
</script>
<style  scoped>

</style>
