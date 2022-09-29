<template>
<v-app>
    <v-container class="mx-auto" style="max-width:550px;">
        <div>
            <v-btn icon class="elevation-0 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </div>
        <v-row >
        <v-col>
             <h2 class="mb-md-8 mb-4 font-weight-medium" align="center" justify="center" v-if="!editing_obj">Share your journey</h2>
             <h2 class="mb-md-8 mb-4 font-weight-medium" align="center" justify="center" v-else>Edit your journey</h2>
            <v-stepper v-model="e6" vertical elevation="0">
                <v-stepper-step :complete="e6 > 1" step="1" @click.native="e6 = 1" style="cursor:pointer">
                Share images* <small v-if="journey.event" class="mt-1">add this event to your journey</small>
                </v-stepper-step>
                <v-stepper-content style="border-left: none;" step="1" width="100%" class="ma-0 pa-5"> 
                    <v-slide-group
                    min-width="2px"
                    v-model="model"
                    class="pb-4 ma-0"
                    show-arrows>
                    <v-slide-item>
                        <div class="mr-1">
                        <div v-if="!imageData1" @click="onPick(1)" style="cursor:pointer;" class=" rounded-lg grey lighten-2" >
                            <v-icon class="pa-9 pa-sm-16">mdi-plus</v-icon>
                            <input 
                            type="file" 
                            name = "gallery" 
                            style="display:none" 
                            ref="fileInput1" 
                            accept="image/*"
                            required
                            @change="onFileChange1">
                        </div>
                        <div v-else class=" rounded-lg grey lighten-2" >
                        <v-img :src="imageData1" :height="img_height" :width="img_height" id="imgOne" contain>
                            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(1)">
                            <v-icon color="black" small>mdi-close</v-icon>
                            </v-btn>
                        </v-img>
                        </div>
                        </div>
                    </v-slide-item>
                    <v-slide-item>
                        <div class="mr-1">
                        <div v-if="!imageData2" @click="onPick(2)" style="cursor:pointer;" class=" rounded-lg grey lighten-2" >
                            <v-icon class="pa-9 pa-sm-16">mdi-plus</v-icon>
                            <input 
                            type="file" 
                            name = "gallery" 
                            style="display:none" 
                            ref="fileInput2" 
                            accept="image/*"
                            required
                            @change="onFileChange2">
                        </div>
                        <div v-else class=" rounded-lg grey lighten-2" > 
                        <v-img :src="imageData2" :height="img_height" :width="img_height" contain>
                            <v-btn style="background:white " icon small class="float-right ma-1" @click="removeImage(2)">
                            <v-icon color="black" small >mdi-close</v-icon>
                            </v-btn>
                        </v-img>
                        </div>
                        </div>
                    </v-slide-item>
                    <v-slide-item>
                        <div>
                        <div v-if="!imageData3 " @click="onPick(3)" style="cursor:pointer;" class=" rounded-lg grey lighten-2" >
                            <v-icon class="pa-9 pa-sm-16">mdi-plus</v-icon>
                            <input 
                            type="file" 
                            name = "gallery" 
                            style="display:none" 
                            ref="fileInput3" 
                            accept="image/*"
                            required
                            @change="onFileChange3">
                        </div>
                        <div v-else class=" rounded-lg grey lighten-2" > 
                        <v-img :src="imageData3" :height="img_height" :width="img_height" contain>
                            <v-btn style="background:white " icon small class="float-right ma-1" @click="removeImage(3)">
                            <v-icon color="black" small >mdi-close</v-icon>
                            </v-btn>
                        </v-img>
                        </div>
                        </div>
                    </v-slide-item>
                    <!-- <v-slide-item v-if="imageData3">
                        <div class="mx-2 rounded-lg grey lighten-2">
                            <v-img :src="imageData4" height="150px" width="150px"></v-img>
                            <v-btn icon>
                                <v-icon color="black" small @click="onPick(4)">mdi-image-plus</v-icon>
                            </v-btn>
                            <input 
                            type="file" 
                            name = "gallery" 
                            style="display:none" 
                            ref="fileInput4" 
                            accept="image/*"
                            required
                            @change="onFileChange4">
                            <v-btn icon>
                                <v-icon color="error" small @click="removeImage(4)">mdi-delete-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-slide-item> -->
                    <!-- <v-slide-item v-if="imageData4">
                        <div class="mx-2 rounded-lg grey lighten-2">
                            <v-img :src="imageData5" height="150px" width="150px"></v-img>
                            <v-btn icon>
                                <v-icon color="black" small @click="onPick(5)">mdi-image-plus</v-icon>
                            </v-btn>
                            <input 
                            type="file" 
                            name = "gallery" 
                            style="display:none" 
                            ref="fileInput5" 
                            accept="image/*"
                            required
                            @change="onFileChange5">
                            <v-btn icon>
                                <v-icon color="error" small @click="removeImage(5)">mdi-delete-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-slide-item> -->
                    </v-slide-group>
                <v-btn color="black" text small outlined @click="e6 = 2">Next</v-btn>
                <!-- <v-btn color="black" text @click="e6 = 1">Previous</v-btn> -->
                <v-btn text @click="goback" small color="primary">Cancel</v-btn>
                </v-stepper-content>
        
                <v-stepper-step :complete="e6 > 2" step="2" @click.native="e6 = 2" style="cursor:pointer">Journey details*</v-stepper-step>
                <v-stepper-content step="2" class="ma-0" style="border-left: none;">
                    <v-form ref="journey_form">
                    <v-text-field
                        v-model = "journey.joevent"
                        label= "Title*"
                        :rules="titleRules"
                        :maxlength="255"
                        counter
                        >
                    </v-text-field>
                    <v-text-field
                        prepend-icon="mdi-map-marker-outline" 
                        v-model = "journey.city"
                        label= "City"
                        :maxlength="255"
                        counter
                        >
                    </v-text-field>
                    <v-autocomplete label="Country" v-model= "journey.country" prepend-icon="mdi-earth"
                        :items="countries"
                        item-text="name"
                        item-value="code"
                        required 
                    ></v-autocomplete>
                    <v-textarea
                    prepend-icon="mdi-information-outline" 
                        v-model = "journey.jocontent"
                        label= "Caption"
                        >
                    </v-textarea>
                    <!-- <p class="caption">If the date is in the future it will be added as an upcoming event.</p> -->
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
                            v-model= "journey.jodate"
                            label="Date"
                            prepend-icon="mdi-calendar"        
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model= "journey.jodate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text small color="black" @click="menu = false">Cancel</v-btn>
                            <v-btn text small color="black" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-text-field 
                    prepend-icon="mdi-link" 
                        v-model = "journey.jolink"
                        label= "Add a link"
                        :maxlength="255"
                        :rules="urlRules">
                    </v-text-field>
                    <v-text-field 
                    prepend-icon="mdi-instagram" 
                        v-model = "journey.joiglink"
                        label= "Instagram link"
                        :maxlength="255"
                        :rules="urlRules">
                    </v-text-field>
                    <v-text-field 
                    prepend-icon="mdi-youtube" 
                        v-model = "journey.joytlink"
                        label= "Youtube link"
                        :maxlength="255"
                        :rules="urlRules">
                    </v-text-field>
                    </v-form>
                    <v-btn color="black" text small outlined @click="e6 = 3">Next</v-btn>
                    <v-btn color="error" text small @click="e6 = 1">Previous</v-btn>
                    <v-btn text @click="goback" small color="primary">Cancel</v-btn>
                </v-stepper-content>
        
                <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3" style="cursor:pointer">Highlights and Privacy</v-stepper-step>
                <v-stepper-content step="3" class="ma-0" style="border-left: none;">
                    <h4 class="font-weight-light">Add to highlights</h4>
                        <v-radio-group
                            v-model="journey.ishighlight"
                            row
                            >
                            <v-radio
                                label="Yes"
                                :value="true"
                            ></v-radio>
                            <v-radio
                                label="No"
                                :value="false"
                            ></v-radio>
                        </v-radio-group>
                    <h4 class="font-weight-light">Do you want to keep it private?</h4>
                        <v-radio-group
                            v-model="journey.isprivate"
                            row
                            >
                            <v-radio
                                label="Yes"
                                :value="true"
                            ></v-radio>
                            <v-radio
                                label="No"
                                :value="false"
                            ></v-radio>
                        </v-radio-group>
                    <v-btn color="error" small text @click="e6 = 2">Previous</v-btn>
                    <v-btn text small @click="goback" color="primary">Cancel</v-btn>
                </v-stepper-content>
                <div class="mx-sm-7 mx-6">
                    <v-btn v-if="!editing_obj" outlined small class="text-decoration-none"  color="black"
                    @click="submit" :loading="progressbar" >Submit</v-btn>
                    <v-btn v-else outlined small class="text-decoration-none"  color="black"
                    @click="update" :loading="progressbar">Update</v-btn>
                </div>
            </v-stepper>
        </v-col>
        <!-- <v-col cols="12" md="6" class="px-sm-8 lighten-2 rounded-xl hidden-sm-and-down">
            <h3 class="ma-4">Preview your journey</h3>
            <v-row v-if="journey.jodate" class="pb-2">
                <caption class="ma-6">{{journey.jodate}} </caption>
            </v-row>
            <v-row v-if="journey.joevent" class="pb-6 justify-center text-center">
                <h3 class="text-center font-weight-light ">{{journey.joevent}} </h3>
                <v-btn v-if="journey.country " icon class="text-decoration-none pb-2 pl-4" >
                <country-flag :country= journey.country />
            </v-btn>
            </v-row>
            <client-only>
                  <Slider v-if="imageData1"
                      :autoplay = false
                      width="320px"
                      height="150px">
                      <div v-if="imageData1">
                      <SliderItem >
                      <v-img
                            :src="imageData1"
                            contain
                            height="150px"
                            width="320px"
                          ></v-img>
                      </SliderItem>
                      </div>
                      <div v-if="imageData2">
                      <SliderItem>
                      <v-img
                            :src="imageData2"
                            contain
                            height="150px"
                            width="320px"
                          ></v-img>
                      </SliderItem>
                      </div>
                  </Slider>
            </client-only>
            
            <v-row v-if="journey.jocontent" class="pb-6 pt-4 justify-center text-center">
                <h4 class=" text-center font-weight-light "> {{journey.username}}: {{journey.jocontent}} </h4>
            </v-row>
            <v-row v-if="journey.jolink" class="pb-6 justify-center text-center">
                <v-btn v-if="journey.jolink"  icon color="black" @click="openlink">
                  <v-icon >mdi-link</v-icon>
                </v-btn>
                <v-tooltip v-if="journey.ishighlight" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                        v-on="on">
                        <v-icon class="pl-2 float-right" small color="orange">mdi-star</v-icon>
                    </v-btn>
                  </template>
                  <span>This is a highlighted post.</span>
                </v-tooltip>
                <v-tooltip v-if="journey.isprivate" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs"
                        v-on="on">
                        <v-icon class="pl-2 float-right" small>mdi-lock</v-icon>
                    </v-btn>
                  </template>
                  <span>This is your private post.</span>
                </v-tooltip>
            </v-row>
        </v-col> -->
        <!-- {{journey}} -->
        </v-row>
        <v-snackbar v-model="posted_snackbar">
            Journey posted.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            Some error occured. Please try again.
        </v-snackbar>
        <v-snackbar v-model="valid_snackbar">
            Please fill the required details.
        </v-snackbar>
    </v-container>
</v-app>
</template>
<script>
import { Slider, SliderItem } from "vue-easy-slider";
import { mapGetters } from 'vuex'
import CountryFlag from 'vue-country-flag'

export default {
    middleware : 'check_auth',
    layout:'simple',
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'gebbles - artist journey',
        }
    },
    components: {
        Slider,
        SliderItem,
        CountryFlag,
    },
    created (){
        // console.log(this.$route.params, Object.keys(this.$route.params).length === 0);
        //checking if called by event... add to journey
        let check = Object.keys(this.$route.params).length === 0;
        console.log(!check);
        if(!check)
        {
            let event= this.$route.params.event;
            console.log(event);
            this.journey.event = event.event.uuid;
            this.journey.joevent = event.event.name;
            this.journey.jophoto1 = event.event.poster;
            this.imageData1 = this.journey.jophoto1
            if(event.photo){this.journey.jophoto2 = event.photo;
            this.imageData2 = this.journey.jophoto2}
            this.journey.country = event.event.country
            let thumb = this.journey.jophoto1.substring(this.journey.jophoto1.lastIndexOf('/') + 1)
            this.journey.jp1thumb = "https://minithumbnails.s3.us-east-2.amazonaws.com/" + thumb;
            console.log(this.journey);
        }
        else if(this.$store.state.editing_obj)
        {
            this.journey = Object.assign({}, this.$store.getters.editing_obj);
            this.imageData1 = this.journey.jophoto1
            this.imageData2 = this.journey.jophoto2
            this.imageData3 = this.journey.jophoto3
            // this.imageData4 = this.journey.jophoto4
            // this.imageData5 = this.journey.jophoto5
            if(this.journey.ishighlight){
                this.journey.ishighlight = true
            }else{this.journey.ishighlight =false}
            if(this.journey.isprivate){
                this.journey.isprivate =true
            }else{this.journey.isprivate =false}
            if(this.journey.isevent){
                this.journey.isevent =true
            }else{this.journey.isevent =false}
        }
    },
    computed: {
        ...mapGetters(['editing_obj','loggedInUser']),
        img_height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 96
          case 'sm': return 150
          case 'md': return 150
          case 'lg': return 150
          case 'xl': return 150
        }
      },
    },
    data(){
        return {
            rotation:0,
            journey: {
                username: this.$store.state.auth.user.username,
                jocontent: "",
                joevent: "",
                jodate: "",
                jophoto1: "",
                jophoto2: "",
                jophoto3: "",
                country:"",
                city:"",
                // jophoto4: "",
                // jophoto5: "",
                jp1thumb:"",
                jolink: "",
                joiglink:"",
                joytlink:"",
                ishighlight: false,
                isprivate: false,
                event:""
            },
            progressbar: false,
            date:"",
            slide: null,
            imageData1: "",
            imageData2: "",
            imageData3: "",
            // imageData4: "",
            // imageData5: "",
            e6: 1,
            linkError:'',
            model:"",
            valid_snackbar: false,
            error_snackbar:false,
            posted_snackbar: false,
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
            titleRules: [
                v => !!v || 'Journey title is required',
            ],
            urlRules: [
                v => !v || /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(v) ||'URL must be valid',
                v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed.'
            ],
        }
    },
    methods: {
        async putImage(image,thumb){
            if(typeof image == 'string')
            {
                if(image.includes("minithumbnails.s3")|| image.includes("mediumthumbnails.s3"))
                return image
            }
            if(typeof image != 'object')
            {
                return image
            }
            let fileData = image;
            let res = await this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1")
            delete this.$axios.defaults.headers.common['Authorization']
            let filename = res.key
            let url = res.body
            url = url.slice(1, -1);
            let put = await this.$axios.$put(url, fileData)
            if(thumb) //to save first image as thumbmail
            this.journey.jp1thumb = "https://minithumbnails.s3.us-east-2.amazonaws.com/" + filename;
            return "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
        },
        goback(){
            this.$store.dispatch("remove_editing_obj")
            window.history.back();
        },
        onPick(num) //changing the click from button to input using refs
        {
            switch(num) {
                case 1:
                    this.$refs.fileInput1.click()
                    break;
                case 2:
                    this.$refs.fileInput2.click()
                    break;
                case 3:
                    this.$refs.fileInput3.click()
                    break;
                default:
                    // code block
                }
        },
        removeImage(num){
            switch(num) {
                case 1:
                    {this.imageData1 = ""
                    this.journey.jophoto1 = ""
                    this.journey.jp1thumb = ""
                    break;}
                case 2:
                    {this.imageData2 = ""
                    this.journey.jophoto2 =""
                    break;}
                case 3:
                    {this.imageData3 = ""
                    this.journey.jophoto3 =""
                    break;}
                // case 4:
                //     {this.imageData4 = ""
                //     this.journey.jophoto4 =""
                //     break;}
                // case 5:
                //     {this.imageData5 = ""
                //     this.journey.jophoto5 =""
                //     break;}
                default:
                    // code block
                }
        },
        onFileChange1(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData1 = e.target.result;
            }
            if(files[0])
                {
                    fileReader.readAsDataURL(files[0]);
                    this.journey.jophoto1 = files[0];
                }
            }
        },
        onFileChange2(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData2 = e.target.result;
                }
            if(files[0])
                {
                    fileReader.readAsDataURL(files[0]);
                    this.journey.jophoto2 = files[0];
                }
            }
        },
        onFileChange3(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData3 = e.target.result;
                }
            if(files[0])
                {
                    fileReader.readAsDataURL(files[0]);
                    this.journey.jophoto3 = files[0];
                    console.log(this.journey);
                }
            }
        },
        openlink(){
            var url = this.journey.jolink;
            var win = window.open(url, '_blank');
            win.focus();
        },
        refresh(){
            this.date ="";
            this.imageData1 = '',
            this.imageData2='',
            this.imageData3='',
            // this.imageData4='',
            // this.imageData5='',
            this.journey.username = this.loggedInUser.username;
            this.journey.jocontent= "";
            this.journey.joevent= "";
            this.journey.jodate= "";
            this.journey.jophoto1= "";
            this.journey.jophoto2= "";
            this.journey.jp1thumb = "";
            this.journey.jophoto3= "";
            // this.journey.jophoto4= null;
            // this.journey.jophoto5= null;

            this.journey.jolink= "";
            this.journey.joiglink= "";
            this.journey.joytlink= "";
            this.journey.ishighlight= false;
            this.journey.isprivate = false;
            this.journey.event =""
        },
        async submit(){
            if(this.journey.joevent == '' || this.journey.jophoto1 == '')
                this.valid_snackbar =true; 
            else{
                this.progressbar=true;
                //post first image
                if(this.journey.jophoto1 ){
                    this.journey.jophoto1 = await this.putImage(this.journey.jophoto1, true)
                }
                if(this.journey.jophoto2 ){
                    this.journey.jophoto2 = await this.putImage(this.journey.jophoto2,false)
                }
                if(this.journey.jophoto3 ){
                    this.journey.jophoto3 = await this.putImage(this.journey.jophoto3,false)
                }
                const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()}
                };
                let formData = new FormData();
                for (let data in this.journey) {
                    formData.append(data, this.journey[data]);
                }
                try {
                    // console.log(this.$auth.strategy.token.get());
                    await this.$axios.$post("/v1/artist/journey/", formData, config).then(res =>{
                        console.log(res);
                        this.refresh();
                        this.$refs.journey_form.resetValidation();
                        this.progressbar =false;
                        this.posted_snackbar = true;
                        this.$router.push("/"+this.journey.username+"/journey");
                    })
                } catch (e) {
                    this.progressbar =false;
                    this.error_snackbar =true
                    console.log(e, e.response);
                }
            }
        },
        async update() {
            if(this.journey.joevent == '' || this.journey.jophoto1 == '')
            this.valid_snackbar =true; 
            else{
                this.progressbar=true;
                if(this.journey.jophoto1 ){
                    this.journey.jophoto1 = await this.putImage(this.journey.jophoto1, true)
                }
                if(this.journey.jophoto2 ){
                    this.journey.jophoto2 = await this.putImage(this.journey.jophoto2,false)
                }
                if(this.journey.jophoto3 ){
                    this.journey.jophoto3 = await this.putImage(this.journey.jophoto3,false)
                }
                const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
                };
                let myObj1 = this.editing_obj 
                let myObj2 = this.journey
                let keyObj1 = Object.keys(myObj1); 
                let keyObj2 = Object.keys(myObj2);
                let valueObj1 = Object.values(myObj1); 
                let valueObj2 = Object.values(myObj2); 
                try {
                    let formName = new FormData();
                    console.log("appending");
                    for(var i=0; i<keyObj1.length; i++) { 
                        if(keyObj1[i] == keyObj2[i] && valueObj1[i] != valueObj2[i])
                        formName.append(keyObj1[i], valueObj2[i]);
                    }
                formName.append("id", this.journey['id']);
                await this.$axios.$patch("/v1/artist/journey/"+this.editing_obj.id, formName, config)
                // .then(res => {
                //     console.log(res," changed");
                // })
                this.$store.dispatch("remove_editing_obj");
                this.progressbar =false
                this.posted_snackbar = true;
                this.refresh();
                this.$refs.journey_form.resetValidation();
                } catch (error) {
                    console.log("error",error);
                    this.error_snackbar =true
                    this.progressbar =false
                }
                this.$router.push("/"+this.loggedInUser.username+"/journey");
            }
        }, 
    },
    }
</script>