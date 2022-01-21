<template>
<v-app>
	<center>
		<v-card max-width="450" class="mx-2 mt-6 " elevation="0" outlined>
    <center class="mt-8"><nuxt-link :to="'/'" class="text-decoration-none">
      <img
    :height="$vuetify.breakpoint.smAndDown ? 38 : 48"
    class="clickable"
    :src="require('@/assets/gebbleslogo.png')"/></nuxt-link>
    </center>
		<v-card-title class="justify-center">
			<h3 class="font-weight-black">Sign up to gebbles</h3>
		</v-card-title>
		<v-card-text>
    <v-form
    ref="form" v-model="valid">
              <v-text-field :maxlength="30" 
        :rules="usernameRules" 
        v-model="registrationInfo.username" 
        label="Username" 
        prepend-icon="mdi-account-circle" 
        :error-messages="errorUsername"
        color="#cead8f"/>
      <v-text-field v-model="registrationInfo.email" 
        :rules=" emailRules" 
        :error-messages="errorEmail1"
        label="Email" 
        prepend-icon="mdi-account-circle" 
        autocomplete="email"
        color="#cead8f"/>
      <v-text-field     
        :error-messages="errorPassword1"
        :rules="[rules.required, passwordRules.min]"   
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
                  v-model="registrationInfo.password2"
        :type="showPassword2 ? 'text' : 'password'"
        label="Confirm Password"
        prepend-icon="mdi-lock"
        :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword2 = !showPassword2"
        color="#cead8f"
      />
      <v-select label="Representing" v-model= "registrationInfo.country"
        :items="countries"
        item-text="name"
        item-value="code"
        color="#cead8f"
        required
      ></v-select>
      <v-radio-group v-model="registrationInfo.gender" :mandatory="true" row>
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
      <v-checkbox color="#cead8f" v-model="checkbox">
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
      <v-btn @click="registerUser(registrationInfo)" outlined small elevation="4" class="px-8" color="black" :loading="progressbar" :disabled="!formIsValid">Create Account</v-btn>
    </v-card-actions>
    </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <center> <h5 class="py-4 font-weight-light">Already have an account? <nuxt-link :to="'/login'" style="text-decoration:none">Sign in. </nuxt-link></h5></center>
    <v-dialog v-model="terms" max-width="450">
            <v-card>
            <v-card-title class="title">
            Terms
            </v-card-title>
            <v-card-text>
            {{ termsContent }}
            </v-card-text>
            <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn small outlined text color="#cead8f" @click="terms = false">
            Ok
            </v-btn>
            </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog
                v-model="conditions"
                max-width="450"
                >
                <v-card>
                <v-card-title class="title">
                Conditions
                </v-card-title>
                <v-card-text
                >
                {{ conditionContent }} 
                </v-card-text>
                <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <v-btn
                    text
                    small
                    outlined
                    color="#cead8f"
                    @click="conditions = false"
                >
                    Ok
                </v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
    <v-dialog persistent
    v-model="verify"
    max-width="500px"
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
      <!-- <v-card-actions class="px-6 pt-0 pb-4">
      <v-btn 
         outlined small
        color="black"
        to="/login"
      >
        Ok
      </v-btn>
      </v-card-actions> -->
    </v-card>
    </v-dialog>
	</v-card>
  </center>
</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
// import EventService from '@/services/EventService.js'
export default {
	auth : 'guest',
	data() {
    return {
      progressbar:false,
      valid:false,
      errorUsername:'',
      errorEmail1:'',
      errorPassword1:'',
      errorPassword2:'',
      usernameRules: [
        v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed',
      v => !!v || "Username is required."],
      emailRules: [
      v => !!v || "Email is required.",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      rules: {
        required: v => !!v || "Password is required.",
        nospace: v => (v || '').indexOf(' ') < 0 ||'No spaces are allowed',
      },
      passwordRules: {
        min: v => (v && v.length >= 8) || "Min 8 characters"
      },
      showPassword1: false,
      showPassword2: false,
      conditionContent: 'Conditions content',
      termsContent: 'Terms content',
      terms: false,
      conditions: false,
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
      }
	},
	methods: {
	reset (response) {
		console.log("registration succesful",response.data);
		this.$refs.form.reset()
				this.verify =true;
  },
  async registerUser(registrationInfo){
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
	},
	computed: {
		formIsValid () {
      return (
        this.registrationInfo.username &&
        this.registrationInfo.email &&
        this.registrationInfo.password1 &&
        this.checkbox &&
        this.registrationInfo.password2
      )
	  }
	},
	layout: 'signup'
}
</script>
<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>