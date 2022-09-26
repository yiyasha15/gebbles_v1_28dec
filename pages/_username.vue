<template>
  <v-app>
    <template v-if="userNotFound" >
        <the-header></the-header>
        <h4 class="mx-auto my-12">Artist portfolio not found.</h4>
    </template>
    <template v-else>
         <v-app-bar class="pa-0" flat fixed color="white">
             <nuxt-link :to="'/'" class="text-decoration-none">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 38 : 48"
                class="clickable"
                :src="require('@/assets/gebbleslogo.png')"/>
                </nuxt-link>
                <nuxt-link :to="'/'+artist.username" class="text-decoration-none align-center">
                <div> 
                    <h2 v-if="artist.artist_name" class="xs12 artist_toolbar_name1">{{artist.artist_name}}</h2>
                    <h2 v-else class="xs12 artist_toolbar_name1">{{artist.username}} </h2>
                </div>
                </nuxt-link>
            <v-spacer></v-spacer>
            <v-btn small class="hidden-xs-only elevation-0 text-decoration-none mr-sm-2 mr-md-3 mx-1" :to= "`/${artist.username}/about`"><h4 class="font-weight-medium text-capitalize">About</h4></v-btn>
            <v-btn small class="hidden-xs-only elevation-0 text-decoration-none mr-sm-2 mr-md-3 mx-1" :to= "`/${artist.username}/journey`"> <h4 class="font-weight-medium text-capitalize" >Journey</h4></v-btn> 
            <v-btn small class="hidden-xs-only elevation-0 text-decoration-none mr-sm-2 mr-md-3 mx-1" :to= "`/${artist.username}/each1teach1`"><h4 class="font-weight-medium text-capitalize">E1T1</h4></v-btn>
            <v-btn icon small 
            :to="'/'"
            class="text-decoration-none mr-sm-2 mr-md-3 mx-1"
            >
            <v-icon size="26" color="black" >mdi-home-circle-outline</v-icon>
            </v-btn>
            <template v-if="isAuthenticated">
            <v-menu transition="slide-y-transition" offset-y bottom left>
                <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" class="mr-sm-2 mr-md-3 mx-1"
                v-on="on">
                <v-icon size="26" color="black">mdi-plus-circle-outline</v-icon>
                </div>
                </template>
                <v-list>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/uploadvideo'"
                    class="text-decoration-none pl-6 pr-12"
                    ><v-icon color="black" class="pr-2">mdi-upload</v-icon>
                    <v-list-item-title>Upload a video</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/journey'"
                    class="text-decoration-none pl-6 pr-12"
                    ><v-icon color="black" class="pr-2">mdi-chart-line-variant</v-icon>
                    
                    <v-list-item-title>Share journey</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/each1teach1'"
                    class="text-decoration-none pl-6 pr-12"
                    >
                    <v-icon color="black" class="pr-2">mdi-infinity</v-icon>
                    <v-list-item-title>Give a shoutout </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/event'"
                    class="text-decoration-none pl-6 pr-12"
                    ><v-icon color="black" class="pr-2">mdi-calendar-heart</v-icon>
                    <v-list-item-title>Create your event</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-if="userHasPortfolio"
                    :to="'/create/workshop'"
                    class="text-decoration-none pl-6 pr-12"
                    ><v-icon color="black" class="pr-2">mdi-calendar-check-outline</v-icon>
                    <v-list-item-title>Create a workshop</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <!-- {{notifications_notseen}} -->
            <v-btn small v-if="userHasPortfolio && notifications_notseen>0" icon dark color="black" class="mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-badge color="error" overlap :content='notifications_notseen'>
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-badge>
            </v-btn>
            <v-btn small v-if="userHasPortfolio && notifications_notseen==0" icon dark color="black" class="mr-sm-2 mr-md-3 mx-1 text-decoration-none" :to= "`/${loggedInUser.username}/notifications`">
            <v-icon size="26" color="black">mdi-heart-circle-outline</v-icon>
            </v-btn>
            <right-navigation></right-navigation>
            </template>
            <register-login v-else></register-login>
            <v-btn icon small @click="drawer_right=!drawer_right" v-if="!isAuthenticated" class="mx-2">
            <v-avatar size="26" >
                <v-icon dark  color="black">
                    mdi-account-circle
                </v-icon>
            </v-avatar>
            </v-btn>
        </v-app-bar>
        <div class="hidden-sm-and-up">
        <v-row class="mt-16 mb-4 mx-4 d-flex">
            <v-btn small class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}/about`"><h4 class="font-weight-medium text-capitalize">About</h4></v-btn>
            <v-btn small class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}/journey`"> <h4 class="font-weight-medium text-capitalize" >Journey</h4></v-btn> 
            <v-btn small class="elevation-0 text-decoration-none mx-1" :to= "`/${artist.username}/each1teach1`"><h4 class="font-weight-medium text-capitalize ">E1T1</h4></v-btn>
            <!-- <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn to="/create/website" small outlined
                class="ml-auto mx-1"
                elevation="0" 
                v-bind="attrs"
                v-on="on"
                v-if="isAuthenticated && artist.username == loggedInUser.username">
            <v-icon>mdi-account-edit-outline</v-icon>
            </v-btn>
            </template>
            <span>Edit portfolio</span>
            </v-tooltip> -->
        </v-row>
        </div>
    <nuxt-child class="mt-sm-16" :artist='artist' :bio='bio' />
    </template>
    <v-dialog persistent
        v-model="loginDialog"
        max-width="450">
        <center>
        <v-card max-width="450" class="pa-2" elevation="0" outlined>
            <div align="end">
            <v-btn icon color="error" @click="loginDialog=false" >
                <v-icon >mdi-close</v-icon>
            </v-btn>
            </div>
            <nuxt-link :to="'/'" class="text-decoration-none">
            <img
            :height="$vuetify.breakpoint.smAndDown ? 38 : 48"
            class="clickable mt-8"
            :src="require('@/assets/gebbleslogo.png')"/></nuxt-link>
            <v-card-title class="justify-center">
                <h3 class="font-weight-medium">Sign in to gebbles</h3>
            </v-card-title>
            <v-form ref="loginform">
            <v-card-text>
                <v-text-field 
                    :rules=" emailRules" 
                    :error-messages="errorEmail"
                    v-model="userInfo.email" 
                    label="Email" 
                    prepend-icon="mdi-account-circle"
                    color="#cead8f" />
                <v-text-field  
                    :rules="passwordRules"
                    :error-messages="errorPassword"    
                    v-model="userInfo.password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password" 
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    color="#cead8f"/>
            </v-card-text>
            <v-card-actions class="mb-3 justify-center">
                <v-btn @click="submitForm()" class="px-8 " small outlined color="black" dark :loading="progressbar1">Sign in</v-btn>
                <!-- <v-btn to='/register' class="ml-4 px-4 text-decoration-none" small  color="primary" >Register first</v-btn> -->
            </v-card-actions>
            </v-form>
            <center> <h5 class="py-4 font-weight-light"> <span @click="forgot" style="cursor:pointer; text-decoration:none; color:#3f51b5;">I forgot my password. </span></h5></center>
            <v-divider></v-divider>
            <center> <h5 class="py-4 font-weight-light">Don't have an account? <span @click="loginDialog=false; registerDialog=true; " style="cursor:pointer; text-decoration:none; color:#3f51b5;">Sign up. </span></h5></center>
            <!-- <p class="text-center pa-4">gebbles is currently a community of {{img_artists}} dancers.</p> -->
        </v-card>
        </center>
    </v-dialog>
    <v-dialog persistent
        v-model="registerDialog"
        max-width="450">
        <center>
            <v-card max-width="450" class="pa-2 " elevation="0" outlined>
                <div align="end">
                <v-btn icon color="error" @click="registerDialog=false" >
                    <v-icon >mdi-close</v-icon>
                </v-btn>
                </div>
                <div class="mt-8"><nuxt-link :to="'/'" class="text-decoration-none">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 38 : 48"
                class="clickable"
                :src="require('@/assets/gebbleslogo.png')"/></nuxt-link>
                </div>
                <v-card-title class="justify-center">
                    <h3 class="font-weight-medium">Sign up to gebbles</h3>
                </v-card-title>
                <v-card-text>
                <v-form ref="form" >
                    <v-text-field :maxlength="30" 
                    :rules="usernameRules" 
                    v-model="registrationInfo.username" 
                    label="Username" 
                    prepend-icon="mdi-account-circle" 
                    :error-messages="errorUsername"
                    color="#cead8f"/>
                <v-text-field v-model="registrationInfo.email" 
                    :rules="emailRules" 
                    :error-messages="errorEmail1"
                    label="Email" 
                    prepend-icon="mdi-account-circle" 
                    autocomplete="email"
                    color="#cead8f"/>
                <v-text-field     
                    :error-messages="errorPassword1"
                    :rules="passwordRules"   
                    v-model="registrationInfo.password1"
                    :type="showPassword1 ? 'text' : 'password'"
                    label="Password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword1 = !showPassword1"
                    color="#cead8f"
                />
                <v-text-field   
                    :error-messages="errorPassword2" 
                    :rules="passwordRules" 
                    v-model="registrationInfo.password2"
                    :type="showPassword2 ? 'text' : 'password'"
                    label="Confirm Password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword2 = !showPassword2"
                    color="#cead8f"
                />
                <v-autocomplete label="Representing" v-model= "registrationInfo.country"
                :rules="countryRules" 
                    :error-messages="errorCountry" 
                    :items="countries"
                    prepend-icon="mdi-earth"
                    item-text="name"
                    item-value="code"
                    color="#cead8f"
                    required
                ></v-autocomplete>
                <v-radio-group v-model="registrationInfo.gender" :rules="genderRules"  :mandatory="true" row>
                    <v-radio 
                        label="Male" 
                        value="M"
                        color="#cead8f"> 
                    </v-radio>
                    <v-radio 
                        label="Female" 
                        value="F"
                        color="#cead8f">
                    </v-radio>
                    <v-radio 
                        label="Custom" 
                        value="NS"
                        color="#cead8f">
                    </v-radio>
                    <v-text-field color="#cead8f"
                    v-if="registrationInfo.gender == 'NS'"
                    label="What's your gender">
                    </v-text-field>
                </v-radio-group>
                <v-checkbox color="#cead8f" v-model="checkbox" :rules="checkboxRules"  :error-messages="errorCheckbox" >
                <template v-slot:label>
                    <div class="mt-2" >
                    Do you accept the
                    <a href="#" class="text-decoration-none" @click="terms = true">terms</a>
                    and
                    <a href="#" class="text-decoration-none" @click.prevent="conditions = true">conditions?</a>
                    </div>
                </template>
                </v-checkbox>
                <v-card-actions class="mb-3 justify-center">
                <v-btn @click="registerUser(registrationInfo)" dark small class="px-8" color="black" :loading="progressbar" >Create Account</v-btn>
                </v-card-actions>
                </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <center class="py-4"> 
                    <h5 class=" font-weight-light d-inline">Already have an account? 
                        <span @click="registerDialog=false; loginDialog=true;" style="cursor:pointer; text-decoration:none; color:#3f51b5;">Sign in. </span>
                    </h5>
                </center>
                <v-dialog persistent
                v-model="verify"
                max-width="450"
                >
                <v-card>
                <v-card-title class="py-4" >
                    <h4>Instruction is sent.</h4>
                </v-card-title>
                <v-divider class="mx-6"></v-divider>
                <v-card-text class="py-4"
                >
                <p>Please verify your registered email <span class="font-weight-bold">{{this.tempemail}}</span>, by clicking on the link we sent you and sign in to continue.</p>
                <!-- {{this.tempemail}} -->
                </v-card-text>
                <v-card-actions class="px-6 pt-0 pb-4">
                <!-- <v-spacer></v-spacer> -->
                <v-btn 
                    outlined small
                    color="black"
                    @click="loginDialog=true; verify=false"
                >
                    Ok
                </v-btn>
                </v-card-actions>
                </v-card>
                </v-dialog>
                </v-card>
        </center>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import EventService from '@/services/EventService.js'
import TheHeader from '@/components/TheHeader.vue'
import RightNavigation from '~/components/RightNavigation.vue'
export default {
    head() {
        return {
            title: this.artist.username,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.username
                }
            ]
        }
    },
    data() {
      return {
            userNotFound:false,
            loginDialog: false,
            registerDialog: false,
            errorEmail:'',
            errorPassword:'',
            showPassword: false,
            hasName: false,
            userInfo: {
                email: '',
                password: ''
            },
            progressbar:false,
            progressbar1:false,
            errorUsername:'',
            errorEmail1:'',
            errorPassword1:'',
            errorPassword2:'',
            errorCountry:'',
            errorCheckbox:'',
            usernameRules: [
                v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed.',
                v => !!v || "Username is required."],
            emailRules: [
            v => !!v || "Email is required.",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid."
            ],
            passwordRules: [
            v => !!v || "Password is required.",
            v => (v && v.length >= 8) || "Min 8 characters."
            ],
            countryRules: [
            v => !!v || "Country is required.",
            ],
            genderRules: [
            v => !!v || "Gender is required.",
            ],
            checkboxRules: [
            v => !!v || "Please accept the terms and conditions.",
            ],
            showPassword1: false,
            showPassword2: false,
            verify:false,
            checkbox: false,
            tempusername:'',
            tempemail:'',
            registrationInfo: {
                username: '',
                email: '',
                password1: '',
                password2: '',
                country:'',
                gender: ''
            },
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
        // ...validations
      }
    },
    methods:{
		async submitForm(){
           if(this.$refs.loginform.validate()){ 
               this.progressbar1 = true;
			if(this.userInfo.email && this.userInfo.password){
                try{
				const config = {
					headers: {"content-type": "multipart/form-data"}
				};
				let res = await this.$auth.loginWith('local', {
				data: {
					'email':this.userInfo.email,
					'password':this.userInfo.password
					}
				}).then(res => {
				this.$auth.setUser(res.data)
				this.$auth.$storage.setUniversal('user', res.data, true)
				this.$auth.strategy.token.set(res.data.access_token)
                // this.$auth.strategy.refreshToken.set(res.data.refresh_token)
				this.$store.dispatch("check_user_portfolio");
				this.$store.dispatch("check_user_bio");
                this.$store.dispatch("check_user_teachers");
                this.$store.dispatch("check_notifications");
                this.$router.push('/');
                this.progressbar1 = false;
                this.loginDialog = false;
                })
			}catch(error){
                this.progressbar1 = false;
                console.log(error.response.data);
				if(error.response.data.non_field_errors){
					this.errorEmail = `${error.response.data.non_field_errors}`
				}
				if(error.response.data.email){
					this.errorEmail = `${error.response.data.email}`
				}
            }
            }
            else{
                this.progressbar1 = false
            }
            }
        },
        reset (response) {
		console.log("registration successful",response.data);
		this.$refs.form.reset()
				this.verify =true;
        },
        forgot(){
            this.loginDialog=false; 
            this.$router.push('/passwordrenew') 
        },
        async registerUser(registrationInfo){
            if(this.$refs.form.validate())
            {
                try {
            if(this.registrationInfo.password1!=this.registrationInfo.password2){
            this.errorPassword2 = `Passwords doesn't match.`
            return;
            }
            else{this.errorPassword2 = ``}
            this.tempusername= this.registrationInfo.username
            this.tempemail= this.registrationInfo.email
            this.progressbar =true
            const config = {
            headers: {"content-type": "multipart/form-data"},
            // onDownloadProgress: (progressEvent) => {
            //   var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            //   console.log(percentCompleted);
            // }
            };
            var form = new FormData();
            for (let data in registrationInfo) //append
            {
                form.append(data, registrationInfo[data]);
            }
            await this.$axios.post('https://gruw80hfj5.execute-api.us-east-2.amazonaws.com/dev/api/v1/auth/registration/', form, config)
            .then(res=> {
            this.progressbar =false
            // console.log("registered", res);
            this.$refs.form.resetValidation()
            this.$refs.form.reset()
            this.errorUsername=''
            this.errorEmail1=''
            this.errorPassword1=''
            this.errorPassword2=''
            this.verify= true
            this.registerDialog = false;
            })
                } catch(err){
                    this.progressbar =false
                    if(err.response.data){
                    let er = err.response.data
                    console.log(er);
                    for (const key in er) {
                        if(`${key}` == 'username'){
                        this.errorUsername = `${er[key]}`
                        }
                        if(`${key}` == 'email'){
                        this.errorEmail1 = `${er[key]}`
                        }
                        if(`${key}` == 'password1'){
                        this.errorPassword1= `${er[key]}`
                        }
                        // console.log(`${key}: ${er[key]}`);
                    }
                    }
                }
            }
        }
	},
    computed: {
        ...mapGetters(['isAuthenticated','usersBio', 'loggedInUser', 'userHasPortfolio','usersPortfolio', 'notifications', 'notifications_notseen']),
    },
    async asyncData({error, params}) {
        //save api call for loggged in page
        // if(store.state.auth.loggedIn && params.username == store.state.portfolio.username) 
        // {
        //     return{
        //         artist: store.state.portfolio,
        //         bio: store.state.bio,
        //     }
        // }
        // else{}
          try {
          let artist_response = await EventService.getArtist(params.username)
          let bio_response = await EventService.getBio(params.username)
        return {
            artist: artist_response.data,
            bio: bio_response.data,
        }} catch (err) {
            error('userNotFound');
            if(err.response.status=='404')
            {
                console.log("user doesn't exist");
            }
        }
    },
    layout: 'username',
    components:{
        TheHeader,
        RightNavigation
    },
    
}
</script>

<style scoped>
.artist_toolbar_name1{
    font-family: 'Poiret One', cursive; 
    max-height: 36px; 
    overflow: auto;
    color:black;
     margin-bottom:7px ;
}
.artist_menubar_name{
    font-family: 'Poiret One', cursive; 
    overflow: auto;
    max-width: 106px;
}
.v-btn:hover{
    color:#815A44;
}
.v-icon:hover{
    color: #815A44;
}
</style>
