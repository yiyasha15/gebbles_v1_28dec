<template>
    <v-container class="ma-24" style="max-width:550px;">
        <v-row>
            <v-col>
                <v-btn icon class="elevation-0 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
                <h2 align="center" justify="center">Each One Teach One</h2>
            </v-col>
        </v-row>
        <v-row>
        <v-col  >
        <v-stepper  v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1" @click.native="e6 = 1" style="cursor:pointer">
            Mention the person that inspired you.*
        <small>If that person is not yet in this platform, mention them and tag them later when they join.<br></small>
        </v-stepper-step>
        <v-stepper-content step="1">
            <v-combobox
                v-model="teacher_obj"
                :items="artists"
                label="Search artists..."
                item-text="artist_name"
                item-value="username"
                ref="artistListComboBox"
                @change="onAutoCompleteSelection"
                @keyup="customOnChangeHandler"
                @paste="customOnChangeHandler"
                @input="addTeacher"
                >
                <template v-slot:selection="data">
                    <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click:close="teacher_obj = ''"
                    >
                    <v-avatar v-if="data.item.thumb" left>
                        <v-img :src="data.item.thumb"></v-img>
                    </v-avatar>
                    <v-avatar v-else left>
                        <v-icon dark>
                            mdi-account-circle
                        </v-icon>
                    </v-avatar>
                    <template  v-if="data.item.username" >
                    {{ data.item.username }}
                    </template>
                    <template v-else >
                    {{ data.item}}
                    </template>
                    </v-chip>
                </template>
                <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item.username"></v-list-item-content>
                    </template>
                    <template v-else>
                    <v-list-item-avatar v-if="data.item.thumb">
                        <img :src="data.item.thumb">
                    </v-list-item-avatar>
                    <v-list-item-avatar v-else >
                        <v-icon>
                            mdi-account-circle
                        </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content v-if="data.item.username">
                        <v-list-item-title v-html="data.item.username"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.country"></v-list-item-subtitle>
                    </v-list-item-content>
                    </template>
                </template>
            </v-combobox>
            <v-select
            :items="countries"
            item-text="name"
            item-value="code"
            v-model = "sharing.s_teacher_country"
            label= "Country they are from"
            clearable>
            </v-select>
        <v-btn color="black" small text outlined @click="e6 = 2">Next</v-btn>
        <v-btn color="primary" small text @click="goback">Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 2" step="2"  @click.native="e6 = 2" style="cursor:pointer">Upload an image together.*
            <small>(or, you can add their image.)</small>
        </v-stepper-step>
        <v-stepper-content step="2" style="border-left: none;">
                <input
                type="file" 
                name = "imageData" 
                style="display:none" 
                ref="fileInput" 
                accept="image/*"
                required
                @change="onFileChange">
                <template v-if="imageData">
                <v-img :src="imageData" height="300px" width="350px"></v-img>
                </template>
                <v-btn small v-if="!imageData" outlined color="black" class="ma-2" @click="onPick" >
                    Upload
                    <!-- <v-icon right> mdi-cloud-upload </v-icon> -->
                </v-btn>
                <v-btn small v-else outlined color="error" class="ma-2" @click="imageData='';" >
                    Remove<v-icon right dark> mdi-close</v-icon>
                </v-btn>
            <v-btn color="black" text outlined @click="e6 = 3" small>Next</v-btn>
            <v-btn color="error" text @click="e6 = 1" small>Previous</v-btn>
            <v-btn color="primary" text @click="goback" small>Cancel</v-btn>
        </v-stepper-content>
    
        <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3" style="cursor:pointer">Each One Teach One*</v-stepper-step>
        <v-stepper-content step="3" style="border-left: none;">
            <v-textarea
            counter :maxlength="485"
                v-model = "sharing.s_appreciation"
                label= "Share the one thing you remember the most about her/him.*"
                clearable>
            </v-textarea>
            <v-text-field 
                v-model = "sharing.s_location"
                label= "Where did you meet?"
                :maxlength="50"
                clearable>
            </v-text-field>
            <v-textarea
                :maxlength="485"
                v-model = "sharing.s_learnings"
                label= "Share about what you learnt from them."
                clearable>
            </v-textarea>
            <v-btn color="black" small text outlined @click="e6 = 4">Next</v-btn>
            <v-btn color="error" small text @click="e6 = 2">Previous</v-btn>
            <v-btn color="primary" text small @click="goback">Cancel</v-btn>
        </v-stepper-content>
    
        <v-stepper-step step="4"  @click.native="e6 = 4" style="cursor:pointer">Share a video</v-stepper-step>
        <v-stepper-content step="4" style="border-left: none;">
            <v-text-field
                :error-messages="ytLinkError" 
                color="red"
                v-model= "sharing.s_teacher_video"
                label="Youtube/Instagram link"
                prepend-icon="mdi-youtube"
                clearable
                @input="showYoutubeVideo"
                >
            </v-text-field>
            <v-row v-if="videoId" class=" justify-center text-center mt-2 mb-4">
                <youtube width="auto" height="100%"  :video-id= 'videoId'></youtube>
                <instagram-embed
                :url="'https://www.instagram.com/p/CEeXLVAAoYl/'"
                :max-width=300
                :hide-caption=true
                />
                </v-row>
                <!-- <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/CeIQHKWrCca/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/CeIQHKWrCca/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">
                <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> 
                    <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> 
                    <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
                        <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" 
                        xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                                <g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)">
                        </div></div></div> </a>
                    </div>
                </blockquote>  -->
            
            <p class="caption" v-if="lockButton"> Please wait..</p>
            <v-btn v-if="!share_obj" outlined small class="text-decoration-none" 
             color="black" :loading="progressbar" :disabled="lockButton"
            @click="submit">Submit</v-btn>
            <v-btn v-else outlined small class="text-decoration-none"  color="black"
             :loading="progressbar" :disabled="lockButton"
            @click="update">Update</v-btn>
            <v-btn color="error" small text @click="e6 = 3">Previous</v-btn>
            <v-btn color="primary" text small @click="goback">Cancel</v-btn>
        </v-stepper-content>
        </v-stepper>
        </v-col>
        <!-- <v-col cols="12" md="6" class="px-sm-8 my-6 hidden-sm-and-down">
                <v-row class="pb-6 pa-4 justify-center text-center">
                    <h2 class="font-weight-light"> {{sharing.s_teacher_name}}</h2>
                    <v-spacer></v-spacer>
                    <h5 class="pt-2 font-weight-light">{{sharing.s_location}}</h5>
                    <v-btn icon class="text-decoration-none" >
                        <country-flag :country= sharing.s_teacher_country />
                    </v-btn>
                </v-row>
                <v-row v-if="imageData" class=" pb-6 justify-center text-center">
                    <v-img :src="imageData" height="500px" width="500px"></v-img>
                </v-row>
                <v-row class="justify-center text-center">
                    <h5 class="pb-6 font-weight-light text-center">{{sharing.s_appreciation}} {{sharing.s_date}} </h5>
                </v-row>
                <v-row v-if="videoId" class=" justify-center text-center ">
                    <youtube width="auto" height="100%"  :video-id= 'videoId'></youtube>
                </v-row>
        </v-col> -->
        </v-row>
        <v-snackbar v-model="mention_teacher_snackbar">
            Please fill the required details.
        </v-snackbar>
        <v-snackbar v-model="youtube_snackbar">
            Youtube link is incorrect.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            Some error occured. Please try again.
        </v-snackbar>
    </v-container>
</template>
<script>
import CountryFlag from 'vue-country-flag'
import { mapGetters } from 'vuex'
import { Youtube } from 'vue-youtube';
import { getIdFromURL } from 'vue-youtube-embed'
import InstagramEmbed from 'vue-instagram-embed';
import EventService from '@/services/EventService.js'

export default {
    middleware : 'check_auth',
    components: {
        CountryFlag,
        Youtube, InstagramEmbed
    },
    created (){
        // this.$store.dispatch("check_artists");
        if(this.$store.state.share_obj != null)
        {
            console.log(this.$store.getters.share_obj);
            this.sharing = Object.assign({}, this.$store.getters.share_obj);
            this.imageData = this.sharing.image;
            this.teacher_obj = this.sharing.s_teacher_name;
            let url1 =this.sharing.s_teacher_video //getting value of youtube video urls
            if(url1){
            let videoId = getIdFromURL(url1) //getting id from video url
            this.videoId = videoId //assigning the id to <youtube> video id
            }
        }
    },
    computed: {
        ...mapGetters([ 'share_obj','usersPortfolio']),
    },
    data(){
        return {
            lockButton:false,
            countries:[
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
            sharing: {
                teacher: "",
                s_learnings:"",
                s_teacher_name: "",
                image:"",
                image_mini:"",
                s_appreciation: "",
                s_teacher_country: "",
                s_student_country: "",
                s_date: "",
                s_location: "",
                s_teacher_video:"",
                username: this.$store.state.auth.user.user.username,
            },
            imageData: "",
            e6: 1,
            teacher_obj:null,
            progressbar:false,
            mention_teacher_snackbar:false,
            youtube_snackbar:false,
            error_snackbar:false,
            videoId:'',
            ytLinkError:'',
            artists:[],
            debounce: null,
            comboBoxModel: null,
        }
    },
    watch: {
    teacher_obj: function() {
        // console.log(this.teacher_obj);
        if(this.teacher_obj)
        {
            EventService.getSearchedArtist(this.teacher_obj).then((value) => {
            this.artists = value.data});
        }
      }
    },
    methods: {
        searchArtists(){
        this.artists=[]
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
        if(this.comboBoxModel){EventService.getSearchedArtist(this.comboBoxModel).then((value) => {
        this.artists = value.data
        });}
        }, 100)
        },
        onAutoCompleteSelection(){
            this.comboBoxModel = this.teacher_obj;
            this.searchArtists();
        },
        customOnChangeHandler(){
        let vm = this;
        setTimeout(function(){
            if(vm.$refs.artistListComboBox){
            vm.comboBoxModel = vm.$refs.artistListComboBox.internalSearch;
            vm.searchArtists();
            }
        });
        },
        showYoutubeVideo(){
            let url= this.sharing.s_teacher_video
            if (url != undefined || url != '') {        
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                var regExpInsta = /(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*/g; //instagram red exp
                var match = url.match(regExp);
                var match2 = url.match(regExpInsta)
                console.log(match,match2);
                if (match && match[2].length == 11) {     
                    this.ytLinkError =``
                } else if (match2 && match2[0].length ) {  
                    this.ytLinkError =``
                } 
                else {
                    //invalid youtube url
                    this.ytLinkError = `Enter a valid Youtube/Instagram URL.`
                }
            }
            let videoId = getIdFromURL(url) //getting id from video url
            this.videoId = videoId
        },
        goback(){
            this.$store.dispatch("remove_share_obj")
            window.history.back();
        },
        onPick() //changing the click from button to input using refs
        {
            this.$refs.fileInput.click()
        },
        onFileChange(e) {
            this.lockButton = true;
            let files = e.target.files || e.dataTransfer.files;
            if (files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                if(files[0])
                {
                    fileReader.readAsDataURL(files[0]);
                    this.sharing.image = files[0];
                    this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1").then(
                        res => {
                            if(res.statusCode == 200)
                            {
                                delete this.$axios.defaults.headers.common['Authorization']
                                let filename = res.key
                                let url = res.body
                                url = url.slice(1, -1);
                                this.$axios.$put(url, this.sharing.image).then((value) => {
                                this.sharing.image =''
                                this.sharing.image = "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
                                this.sharing.image_mini= "https://minithumbnails.s3.us-east-2.amazonaws.com/" + filename;
                                console.log(this.sharing);
                                this.lockButton = false;
                                });
                            }
                        }
                    )
                }else{
                    this.lockButton = false;
                }
            }
        },
        async submit() {
            if(this.sharing.s_teacher_name != "" && this.sharing.s_appreciation != "" && this.sharing.image!='')
            {
                this.progressbar =true
                this.sharing.s_student_country = this.usersPortfolio.country;
                const config = {
                    headers: { "content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
                };
                    let formData = new FormData();
                    for (let data in this.sharing) {
                        formData.append(data, this.sharing[data]);
                    }
                    // console.log(this.sharing);
                    try {
                        let response =  await this.$axios.$post("/v1/e1t1/sharing/", formData, config);
                        console.log(response);
                        this.progressbar =false;
                        this.$store.dispatch("check_user_teachers");
                        this.$router.push("/e1t1/"+response.uuid);
                    } catch (e) {
                        this.progressbar =false;
                        this.error_snackbar=true;
                        this.$router.push("/"+this.sharing.username+"/each1teach1/");
                        console.log("cant post!",e.response.data);
                    }
            }
            else{
                this.progressbar =false;
                this.mention_teacher_snackbar = true
            }
        },
        async update() {
            this.progressbar =true
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            let urlLink = this.sharing.s_teacher_video;
            if(urlLink!= this.share_obj.s_teacher_video){ //if link exists check if it's valid
                var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                let check = !pattern.test(this.share_obj.s_teacher_video);
                // console.log("pattern",pattern);
                // console.log("check",check);
                if(!check){
                    this.youtube_snackbar =true
                    this.progressbar =false;
                    console.log("incorrect yt link");
                    return;
                }
            }
            let myObj1 = this.share_obj 
            let myObj2 = this.sharing
            // find keys 
            let keyObj1 = Object.keys(myObj1); 
            let keyObj2 = Object.keys(myObj2);
                
            // find values 
            let valueObj1 = Object.values(myObj1); 
            let valueObj2 = Object.values(myObj2); 
            
            // now compare their keys and values  
            for(var i=0; i<keyObj1.length; i++) { 
                if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 
                    console.log("no change ",keyObj1[i]+' -> '+valueObj2[i]);	 
                } 
                else{
                    // it prints keys have different values 
                    let formName = new FormData();
                    formName.append(keyObj1[i], valueObj2[i]);
                    formName.append("id", this.sharing['id']);
                    console.log("key obj1: "+keyObj1[i]+"\nkeyobj2: "+keyObj2[i]+'\n myObj1 value: '+ valueObj1[i] + '\nmyObj2 value: '+ valueObj2[i] +'\n');
                    await this.$axios.$patch("/v1/e1t1/sharing/"+this.share_obj.uuid, formName, config);
                    // console.log( valueObj1[i] ," changed"); 
                } 
            }
            this.progressbar =false;
            this.$store.dispatch("check_user_teachers");
            this.$store.dispatch("remove_share_obj");
            window.history.back();
        },
        addTeacher(){
            let t_name = typeof this.teacher_obj;
            // console.log(this.teacher_obj);
            // console.log(t_name);
            // console.log(this.teacher_obj);
            if(t_name == 'object') //if teacher exists then changing the value of teacher to username 
            {
                this.sharing.teacher = this.teacher_obj.username
                this.sharing.s_teacher_name = this.teacher_obj.username 
                this.sharing.s_teacher_country = this.teacher_obj.country
            }
            else
            {
                this.sharing.s_teacher_name = this.teacher_obj 
                this.sharing.teacher = "" //making null because no artists to tag.
            }
        }
    },
    }
</script>