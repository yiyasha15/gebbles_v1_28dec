<template>
<v-app>
    <v-container class="ma-24" style="max-width:550px;">
        <div align="left" justify="left">
            <v-btn icon class="elevation-0 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </div>
        <v-row>
        <v-col>
            <h2 class="mb-md-8 mb-4 font-weight-medium"  align="center" justify="center">Each One Teach One</h2>
            <v-stepper  v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" @click.native="e6 = 1" style="cursor:pointer">
                Mention the person that inspired you.*
            <small class="pt-1">If that person is not yet in this platform, mention them now and tag them later when they join.<br></small>
            </v-stepper-step>
            <v-stepper-content step="1" style="border-left: none;" width="100%" class="ma-0">
                <v-combobox
                    :maxlength="255"
                    v-model="teacher_obj"
                    :items="artists"
                    prepend-icon="mdi-account-search-outline"
                    label="Search artists..."
                    item-text="artist_name"
                    item-value="username"
                    ref="artistListComboBox"
                    :error-messages="teacherAlreadyMentioned"
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
                        <v-list-item-content>
                           <v-list-item-title v-if="data.item.artist_name" v-html="data.item.artist_name"></v-list-item-title>
                            <v-list-item-subtitle v-if="data.item.username" v-html="'@'+data.item.username "></v-list-item-subtitle>
                        </v-list-item-content>
                        </template>
                    </template>
                </v-combobox>
                <v-autocomplete
                prepend-icon="mdi-earth"
                :items="countries"
                item-text="name"
                item-value="code"
                v-model = "sharing.s_teacher_country"
                label= "Country they are from"
                >
                </v-autocomplete>
            <v-btn color="black" small text outlined @click="e6 = 2">Next</v-btn>
            <v-btn color="primary" small text @click="goback">Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-step :complete="e6 > 2" step="2"  @click.native="e6 = 2" style="cursor:pointer">Upload an image together.*
                <small class="pt-1">You can add their image.</small>
            </v-stepper-step>
            <v-stepper-content step="2" style="border-left: none;" width="100%" class="ma-0">
                <div>
                <!-- <div v-if="!imageData" @click="onPick" style="cursor:pointer; width:274px;" class="mx-auto mb-4 rounded-lg grey lighten-2" >
                    <v-icon class="pa-image">mdi-plus</v-icon>
                    <input 
                    type="file" 
                    name = "imageData" 
                    style="display:none" 
                    ref="fileInput" 
                    accept="image/*"
                    required
                    @change="onFileChange">
                </div>
                <div v-else class="mb-4">
                <v-img :src="imageData" height="auto" width="242px" class="mx-auto" contain>
                    <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage">
                    <v-icon color="black" small>mdi-close</v-icon>
                    </v-btn>
                </v-img>
                </div> -->
                <upload-image-component @newimage="getUrl" @removeimage="removeUrl" :initialImage="sharing.image"></upload-image-component>
                </div>
                <v-btn color="black" text outlined @click="e6 = 3" small>Next</v-btn>
                <v-btn color="error" text @click="e6 = 1" small>Previous</v-btn>
                <v-btn color="primary" text @click="goback" small>Cancel</v-btn>
            </v-stepper-content>
        
            <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3" style="cursor:pointer">Each One Teach One*</v-stepper-step>
            <v-stepper-content step="3" style="border-left: none;" width="100%" class="ma-0">
                <v-form ref="e1t1_form">
                <v-textarea
                :maxlength="485"
                counter
                    v-model = "sharing.s_appreciation"
                    prepend-icon="mdi-account-heart-outline"
                    label= "Share the one thing you remember the most about her/him.*"
                    >
                </v-textarea>
                <v-text-field 
                prepend-icon="mdi-map-marker-outline"
                    v-model = "sharing.s_location"
                    label= "Where did you meet?"
                    :maxlength="255"
                    counter
                    >
                </v-text-field>
                <v-textarea
                prepend-icon="mdi-book-outline"
                    v-model = "sharing.s_learnings"
                    label= "Share about what you learnt from them."
                    >
                </v-textarea>
                <v-text-field
                    :error-messages="ytLinkError" 
                    :maxlength="255"
                    counter
                    v-model= "sharing.s_teacher_video"
                    label="Youtube link"
                    prepend-icon="mdi-youtube"
                    
                    :rules="youtubeRules"
                    >
                </v-text-field>
                </v-form>
                <v-row v-if="videoId" class=" justify-center text-center mt-2 mb-4">
                    <youtube width="auto" height="100%"  :video-id= 'videoId'></youtube>
                </v-row>
                <v-btn color="error" small text @click="e6 = 2">Previous</v-btn>
                <v-btn color="primary" text small @click="goback">Cancel</v-btn>
            </v-stepper-content>
            <div class="mx-sm-7 mx-6">
            <p v-if="progressbar" class="caption"> Please wait..</p>
                <v-btn v-if="!share_obj" outlined small class="text-decoration-none" 
                color="black" :loading="progressbar"
                @click="submit">Submit</v-btn>
                <v-btn v-else outlined small class="text-decoration-none"  color="black"
                :loading="progressbar" 
                @click="update">Update</v-btn>
            </div>
            </v-stepper>
        </v-col>
        </v-row>
        <v-snackbar v-model="mention_teacher_snackbar">
            Mention(about) your friend or teacher.
        </v-snackbar>
        <v-snackbar v-model="imageRules">
            Image is required.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            Some error occured. Please try again.
        </v-snackbar>
    </v-container>
</v-app>
</template>
<script>


export default {
    middleware : 'check_auth',
    head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'gebbles - create e1t1',
        }
    },
    layout:'simple',
    methods: {
        goback(){
            this.$store.dispatch("remove_share_obj")
            window.history.back();
        },
    },
    }
</script>