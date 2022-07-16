<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      style="margin:2px;"
      data-view
      @click="openDialog(journey.id)" 
      :elevation="hover ? 12 : 0"
      outlined
      width="215"
       max-height="205"
    >
    
      <v-img
        v-if = journey.jp1thumb :src = "journey.jp1thumb" 
        :lazy-src= "journey.jp1thumb" 
        class="grey lighten-2 white--text"
        height="134"
        width="215"
      />
      <v-img v-else :src="require('@/assets/gebbleslogo3.png')" height="134"
        width="215" contain/>
      <v-dialog
      max-width="800"
        v-model="dialog"
        persistent
        class="ma-12 ma-md-24 overflow-hidden">
        <div class="rounded-lg white" max-width="800"> 
          <v-row align="end" justify="end" class="pa-4 ma-0" >
          <v-btn icon color="error" @click="closeDialog"  align="end" justify="end" >
            <v-icon >mdi-close</v-icon>
          </v-btn>
          </v-row>
          <v-container style="margin:auto; max-width:768px; " class="pt-0 pb-2" >
          <v-row class="ma-0 pl-2" v-if="fullJourney">
                <h5 v-if="journey.jodate" class="font-weight-light py-2">{{dateFormat(journey.jodate).date}}</h5>
                <v-spacer></v-spacer>
                <v-btn v-if="fullJourney.jolink"  icon color="black" @click="openlink">
                  <v-icon >mdi-link</v-icon>
                </v-btn>
                <v-tooltip v-if="fullJourney.ishighlight" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                        v-on="on">
                        <v-icon class="pl-2 float-right" color="orange" small>mdi-star</v-icon>
                    </v-btn>
                  </template>
                  <span>This is a highlighted post.</span>
                </v-tooltip>
                <v-tooltip v-if="fullJourney.isprivate" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                        v-on="on">
                        <v-icon class="pl-2 float-right" small>mdi-lock</v-icon>
                    </v-btn>
                  </template>
                  <span>This is your private post.</span>
                </v-tooltip>
          </v-row>
          <!-- </v-container> -->
          <v-row align="center" justify="center" class="ma-0">
            <client-only>
              <Slider 
                  :autoplay = false
                  width="768px" height="510px"
                  >
                  <div v-if="fullJourney">
                  <div v-if="fullJourney.jophoto1 !=''">
                  <SliderItem>
                  <v-img
                        :src="fullJourney.jophoto1"
                        contain
                        max-height="510px"
                        max-width="768px"
                      ></v-img>
                  </SliderItem>
                  </div>
                  <div v-if="fullJourney.jophoto2!=''">
                  <SliderItem>
                  <v-img
                        :src="fullJourney.jophoto2"
                        contain
                        height="510px"
                        width="768px"
                      ></v-img>
                  </SliderItem>
                  </div>
                  <!-- <div v-if="fullJourney.jophoto3!=null">
                  <SliderItem>
                  <v-img
                        :src="fullJourney.jophoto3"
                        contain
                        height="510px"
                        width="768px"
                      ></v-img>
                  </SliderItem>
                  </div>
                  <div v-if="fullJourney.jophoto4!=null">
                  <SliderItem>
                  <v-img
                        :src="fullJourney.jophoto4"
                        contain
                        height="510px"
                        width="768px"
                      ></v-img>
                  </SliderItem>
                  </div>
                  <div v-if="fullJourney.jophoto5!=null">
                  <SliderItem>
                  <v-img
                        :src="fullJourney.jophoto5"
                        contain
                        height="510px"
                        width="768px"
                      ></v-img>
                  </SliderItem>
                  </div> -->
                  </div>
              </Slider>
            </client-only>
          </v-row>
            <v-row class="pt-4 px-2 ma-0">
            <h5 ><nuxt-link :to="'/'+ journey.username" class="text-decoration-none">{{journey.username}} </nuxt-link> </h5>
            <v-spacer></v-spacer>
            <div v-if="loggedInUser">
          <v-row align="end" justify="end" v-if="loggedInUser.user.username == journey.username" class="pa-2">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon small>
                  <v-icon  color="black" small @click="editJourney(fullJourney)" v-bind="attrs" v-on="on" >mdi-circle-edit-outline</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
            <v-dialog v-model="dialogDelete" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-tooltip top v-bind="attrs" v-on="on">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small icon >
                            <v-icon color="error" small  @click="saveJourneyId(journey.id)" v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
                </template>
                <v-card class="pa-4">
                    <p> Are you sure you want to delete this journey?</p>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="px-4 text-decoration-none" small color="error" dark :loading="deleteLoading"
                        @click="confirmDelete(rm)">Delete</v-btn>
                    <v-btn color="black" class="px-4 text-decoration-none" small outlined  @click="dialogDelete = false">
                        Cancel
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
          </v-row>
            </div>
          </v-row>
          <v-row class="pt-4 px-2 ma-0" v-if="fullJourney">
              <h5>{{fullJourney.joevent}}</h5> 
              <v-spacer></v-spacer>
              <h5 v-if="fullJourney.city" class="font-weight-light pr-1">{{fullJourney.city}}</h5>
            <country-flag v-if="fullJourney.country" :country= fullJourney.country />
          </v-row>
          <v-row class="py-4 px-2 ma-0">
          <h5 class="font-weight-light" v-if="fullJourney">{{fullJourney.jocontent}}</h5>
          </v-row>
          </v-container>
        </div>
      </v-dialog>
      <v-card-actions height="32px">
        <div  width="70" class="text-decoration-none caption" style=" height: 1.7em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:134px; font-size:0.8rem!important;">{{ journey.joevent }} </p>
        </div>
        <v-spacer></v-spacer>
         <v-icon v-if="journey.ishighlight" class=" float-right" color="orange" x-small>mdi-star</v-icon>
        <v-icon v-if="journey.isprivate" class="pl-1 float-right" x-small>mdi-lock</v-icon>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
import {mapGetters} from 'vuex'
import { Slider, SliderItem } from "vue-easy-slider";
import CountryFlag from 'vue-country-flag'
import EventService from '@/services/EventService.js'
export default {
  props: {
    journey: Object,
  },
  components: {
    Slider,
    SliderItem,
    CountryFlag
  },
  methods:{
    dateFormat(recdate){
      if(recdate){
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = recdate;
        let datetype= date.slice(8, 10);
        let month = date.slice(5, 7);
        let yeartype = date.slice(0, 4)
        const regex = new RegExp("^0+(?!$)",'g');
        month = month.replaceAll(regex, "");
        let monthtype = months[month-1]
        date = datetype+" "+monthtype +" "+yeartype
        return{date}
        }
      },
    openDialog() {
    this.dialog= true
    let config ={};
      if(this.loggedInUser && this.loggedInUser.username == this.journey.username){
         config = {
          headers: {"content-type": "multipart/form-data",
              "Authorization": "Bearer " + state.auth.user.access_token}
          };
      }
        EventService.getFullJourney(this.journey.id,config).then(res =>
        {
          this.fullJourney = res.data
        })
    },
    closeDialog() {
    this.dialog= false
    },
    openlink(){
      var url = this.fullJourney.jolink;
      var win = window.open(url, '_blank');
      win.focus();
    },
    saveJourneyId(id){
      this.dialogDelete=true;
      this.rm=id;
    },
    editJourney(journey){
      console.log("edit");
      this.$store.dispatch("check_editing_obj", journey);
      this.$router.push("/create/journey");
    },
    async confirmDelete(id){
      this.deleteLoading =true
      const config = {
      headers: {"content-type": "multipart/form-data",
          "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
      };
      try {
          await this.$axios.$delete("/v1/artist/journey/"+id , config);
          console.log("Journey deleted!");
          this.$store.dispatch("check_user_journey", this.$store.state.auth.user.user.username)
          this.deleteLoading =false
          this.dialogDelete =false;
          this.dialog = false
          this.snackbar = true;
          // this.$router.push("/"+this.$store.state.auth.user.user.username+"/about");
          //send event to parent component i.e journey page
          this.$emit('delete',this.journey.username)
      } 
      catch (e) {
          console.log(e);
          // this.$router.push("/"+this.$store.state.auth.user.user.username+"/about");
          this.deleteLoading =false
      }
      },
    },
    computed: {
        ...mapGetters(['loggedInUser']),
    },
    
    data() {
      return {
        fullJourney:null,
        deleteLoading:false,
        dialog: false,
        dialogDelete:false,
        rm:"",
        list: [
        { width: '100%', height: '100%' },
      ],
        }
    }
  }
</script>
<style scoped>

</style>

