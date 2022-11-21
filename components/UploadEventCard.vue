<template>
    <div>
        <v-container class="mx-auto pa-0" fluid style="max-width:550px" >
            <v-card class="px-1 pt-3" color="background" elevation=0 >
                <center><img src = "~/assets/home.png" :width="img_width" alt="event logo"/></center>
                <div class="font-weight-medium mb-4 text-h6 text-sm-h5 text-center" v-if="!editing_event_obj">Create your event page</div>
                 <div class="font-weight-medium mb-4 text-h6 text-sm-h5 text-center" v-else>Edit your event page</div>
                 <p class="caption text-center">Share about your plan for the jam, your guests, categories and schedule. </p>
                 <gebbles-divider class="mb-5"></gebbles-divider>
                 <v-stepper v-model="e6" vertical class="elevation-0">
                    <v-stepper-step :complete="e6 > 1" step="1" @click.native="e6 = 1" style="cursor:pointer">
                    *Event details
                    <!-- <small>Summarize if needed</small> -->
                    </v-stepper-step>
                    <v-stepper-content step="1" style="border-left: none;" class="ma-0"> 
                        <v-form ref="event_form">
                        <div>
                        <div v-if="!event.poster" @click="onPick(1)" style="cursor:pointer; max-width:274px;" class="mx-auto mb-4 rounded-lg grey_background" >
                            <v-icon class="pa-image" >mdi-plus</v-icon>
                            <input 
                            type="file" 
                            name = "poster" 
                            style="display:none" 
                            ref="fileInput1" 
                            accept="image/*"
                            required
                            @change="onFileChange1">
                        </div>
                        <div v-else class="mb-4">
                        <v-img v-if="typeof(event.poster) === 'string'" :src="event.poster" class="mx-auto" height="300px" width="352px" contain>
                            <v-btn icon small class="float-right ma-1 white" @click="removeImage(1)">
                            <v-icon color="black" small>mdi-close</v-icon>
                            </v-btn>
                        </v-img>
                        </div>
                        </div>
                        <v-text-field
                            :rules="nameRules"
                            required
                            maxlength="255"
                            counter
                            v-model = "event.name"
                            label= "Event name*"
                            >
                        </v-text-field>
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
                                    :rules="dateRules"
                                    v-model= "event.start_date"
                                    label="Date*"
                                    prepend-icon="mdi-calendar"
                                    readonly 
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model= "event.start_date"
                                :active-picker.sync="activePicker"
                                @change="save(event.start_date,1)"
                                ></v-date-picker>
                        </v-menu>
                        <v-text-field
                            maxlength="255"
                            counter
                            prepend-icon="mdi-map-marker-outline"
                            v-model = "event.venue"
                            label= "Event venue">
                        </v-text-field>
                        <!-- <v-text-field
                            prepend-icon="mdi-google-maps"
                            label= "Google Maps URL"
                            :maxlength="255">
                        </v-text-field> -->
                        <v-autocomplete 
                            label="Country*" 
                            v-model= "event.country"
                            prepend-icon="mdi-earth"
                            :items="countries"
                            item-text="name"
                            item-value="code"
                            required
                            :rules="countryRules"
                        ></v-autocomplete>
                        <v-text-field
                            prepend-icon="mdi-clock-time-four-outline"
                            v-model = "event.time"
                            label= "Time">
                        </v-text-field>
                        <v-textarea
                            prepend-icon="mdi-information-outline"
                            v-model = "event.about"
                            label= "About the event">
                        </v-textarea>
                        <v-text-field
                            :error-messages="iglinkError"
                            :rules="instagramRules"
                            prepend-icon="mdi-instagram"
                            v-model = "event.iglink"
                            label= "Instagram link"
                            :maxlength="200"
                            counter
                            >
                        </v-text-field>
                        <v-text-field
                            :maxlength="200"
                            counter
                            :error-messages="ytlinkError"
                            :rules="youtubeRules"
                            prepend-icon="mdi-youtube"
                            v-model = "event.videolink"
                            label= "Youtube video link">
                        </v-text-field>
                        <v-text-field
                            :maxlength="200"
                            counter
                            prepend-icon="mdi-link"
                            :rules="linkRules"
                            v-model = "event.link"
                            label= "Add a link">
                        </v-text-field>
                        <v-text-field
                            :rules="emailRules"
                            prepend-icon="mdi-email"
                            v-model = "event.contact_email"
                            label= "Organiser's Email"
                            :maxlength="254"
                            counter
                            >
                        </v-text-field>
                        <small class="mb-2">Add photos for a quick lookup</small>
                        <v-slide-group
                        min-width="2px"
                        v-model="model"
                        class="pb-4 ma-0"
                        show-arrows>
                        <v-slide-item>
                            <div class="mr-1">
                            <div v-if="!event.photo1" @click="onPick(6)" style="cursor:pointer;" class=" rounded-lg grey_background" >
                                <v-icon class="pa-9 pa-sm-16">mdi-plus</v-icon>
                                <input 
                                type="file" 
                                name = "quick_glance" 
                                style="display:none" 
                                ref="fileInput6" 
                                accept="image/*"
                                required
                                @change="onFileChange6">
                            </div>
                            <div v-else class=" rounded-lg grey_background" >
                            <v-img v-if="typeof(event.photo1) === 'string'" :src="event.photo1" :height="img_height" :width="img_height" contain>
                                <v-btn icon small class="float-right ma-1 white" @click="removeImage(6)">
                                <v-icon color="black" small>mdi-close</v-icon>
                                </v-btn>
                            </v-img>
                            </div>
                            </div>
                        </v-slide-item>
                        <v-slide-item>
                            <div class="mr-1">
                            <div v-if="!event.photo2" @click="onPick(7)" style="cursor:pointer;" class=" rounded-lg grey_background" >
                                <v-icon class="pa-9 pa-sm-16">mdi-plus</v-icon>
                                <input 
                                type="file" 
                                name = "quick_glance" 
                                style="display:none" 
                                ref="fileInput7" 
                                accept="image/*"
                                required
                                @change="onFileChange7">
                            </div>
                            <div v-else class=" rounded-lg grey_background" >
                            <v-img v-if="typeof(event.photo2) === 'string'" :src="event.photo2" :height="img_height" :width="img_height" contain>
                                <v-btn icon small class="float-right ma-1 white" @click="removeImage(7)">
                                <v-icon color="black" small>mdi-close</v-icon>
                                </v-btn>
                            </v-img>
                            </div>
                            </div>
                        </v-slide-item>
                        <v-slide-item>
                            <div >
                            <div v-if="!event.photo3" @click="onPick(8)" style="cursor:pointer;" class=" rounded-lg grey_background" >
                                <v-icon class="pa-9 pa-sm-16">mdi-plus</v-icon>
                                <input 
                                type="file" 
                                name = "quick_glance" 
                                style="display:none" 
                                ref="fileInput8" 
                                accept="image/*"
                                required
                                @change="onFileChange8">
                            </div>
                            <div v-else class=" rounded-lg grey_background" >
                            <v-img v-if="typeof(event.photo3) === 'string'" :src="event.photo3" :height="img_height" :width="img_height" contain>
                                <v-btn icon small class="float-right ma-1 white" @click="removeImage(8)">
                                <v-icon color="black" small>mdi-close</v-icon>
                                </v-btn>
                            </v-img>
                            </div>
                            </div>
                        </v-slide-item>
                        </v-slide-group>
                        </v-form>
                        <v-btn v-if="event_published || editing_event_obj" outlined small class="text-decoration-none"  color="black"
                        @click="update" :loading="progressbar" >Update</v-btn>
                        <v-btn color="black" text small outlined @click="saveAndAdd" :loading="publish_progressbar" v-if="!event_published && !editing_event_obj">Publish and continue</v-btn>
                        <v-btn color="black" text small outlined @click="e6 =2" v-else>Continue</v-btn>
                    </v-stepper-content>
            
                    <v-stepper-step :complete="e6 > 2" step="2" @click.native="e6 = 2" style="cursor:pointer">Event Guests
                       <small class="mt-1"> <v-icon small> mdi-book-outline</v-icon> Event guests will be notified and can add this event to their journey.</small>
                    </v-stepper-step>
                    <v-stepper-content step="2" style="border-left: none;" class="ma-0">
                        <!-- <p class="caption"><v-icon small> mdi-book-outline</v-icon> Event guests can add this event to their journey.</p> -->
                        <v-layout v-if="this.selectedGuests.length>0" wrap row justify-start  style="max-width:340px; margin:auto;" >
                            <div v-for="guest in this.selectedGuests" :key ="guest.index">
                                <guest-card-create :guest="guest"  @removeGuest="removeGuest" @editGuest="editGuest"></guest-card-create>
                            </div>
                        </v-layout>
                        <v-form ref="guest_form">
                        <div v-if="!guest.photo" @click="onPick(4)" style="cursor:pointer; max-width:274px;" class=" mx-auto my-2 rounded-lg grey_background" >
                            <v-icon class="pa-image">mdi-plus</v-icon>
                            <input 
                            type="file" 
                            name = "poster" 
                            style="display:none" 
                            ref="fileInput4" 
                            accept="image/*"
                            required
                            @change="onFileChange4">
                        </div>
                        <div v-else class="ma-4">
                        <v-img v-if="typeof(guest.photo) === 'string'" :src="guest.photo" class="mx-auto" height="300" width="352px" contain>
                            <v-btn icon small class="float-right ma-1 white" @click="removeImage(4)">
                            <v-icon color="black" small>mdi-close</v-icon>
                            </v-btn>
                        </v-img>
                        </div>
                        <v-combobox
                            v-model="artist_obj"
                            :items="artists"
                            maxlength="255"
                            :error-messages="guest_error"
                            prepend-icon="mdi-account-search-outline"
                            label="Tag artist..."
                            item-text="artist_name"
                            item-value="username"
                            ref="artistListComboBox"
                            @change="onAutoCompleteSelection"
                            @keyup="customOnChangeHandler"
                            @paste="customOnChangeHandler"
                            @input="addSearchGuest"
                            >
                            <!-- when its a chip -->
                            <template v-slot:selection="data">
                                <v-chip
                                v-bind="data.attrs"
                                :input-value="data.selected"
                                close
                                @click:close="artist_obj = null; guest.guest = ''; guest_error=''"
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
                            <!-- when it loads -->
                            <template v-slot:item="data">
                                <v-list-item-avatar v-if="data.item.thumb">
                                    <img :src="data.item.thumb">
                                </v-list-item-avatar>
                                <v-list-item-avatar v-else size="40">
                                    <v-icon>
                                        mdi-account-circle
                                    </v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-if="data.item.artist_name" v-html="data.item.artist_name"></v-list-item-title>
                                    <v-list-item-subtitle v-if="data.item.username" v-html="'@'+data.item.username "></v-list-item-subtitle>
                            </v-list-item-content>
                            </template>
                        </v-combobox>
                        <v-text-field
                            v-model= "guest.name"
                            label= "Artist name"
                            :maxlength="255"
                            counter
                            :rules="nameRules">
                        </v-text-field>
                        <v-autocomplete
                        prepend-icon="mdi-earth"
                        :items="countries"
                        item-text="name"
                        item-value="code"
                        v-model = "guest.country"
                        label= "Country"
                        >
                        </v-autocomplete>
                        <v-textarea
                            
                            prepend-icon="mdi-information-outline"
                            v-model = "guest.info"
                            label= "Info">
                        </v-textarea>
                        <!-- <v-checkbox
                            value="6"
                            v-model="isGuest"
                            :label="`Deejay`"
                        ></v-checkbox>
                        <v-checkbox
                            value="7"
                            v-model="isGuest"
                            :label="`Emcee`"
                        ></v-checkbox>
                        <v-checkbox
                            value="1"
                            v-model="isGuest"
                            :label="`Workshop`"
                        ></v-checkbox>
                        <v-checkbox
                            value="2"
                            v-model="isGuest"
                            :label="`Showcase`"
                        ></v-checkbox>
                        <v-checkbox
                            value="3"
                            v-model="isGuest"
                            :label="`Judge`"
                        ></v-checkbox>
                        <v-checkbox
                            value="4"
                            v-model="isGuest"
                            :label="`Battle guest`"
                        ></v-checkbox>
                        <v-checkbox
                            value="5"
                            v-model="isGuest"
                            :label="`Discuss/Talk`"
                        ></v-checkbox> -->
                        <v-btn outlined small class="text-decoration-none"  color="black"
                        @click="addGuests()" v-if="!editing_guest_process" :loading="guest_progressbar">Add guest</v-btn>
                        <!-- <v-btn outlined small class="text-decoration-none mb-3"  color="black"
                        @click="removeGuestFromForm" v-if="this.guest.name" >Remove guest</v-btn> -->
                        <v-btn v-if="editing_guest_process" outlined small class="text-decoration-none"  color="black"
                        @click="updateGuests" :loading="guest_progressbar">Update guest</v-btn>
                        <v-btn v-if="editing_guest_process" outlined small class="text-decoration-none"  color="black"
                        @click="cancel_edit_guest" >Cancel</v-btn><br>
                        </v-form>
                        <v-divider class="my-3"></v-divider>
                        <v-btn color="black" text small outlined @click="e6 = 3">Next</v-btn>
                        <v-btn color="primary" small text @click="e6 = 1">Previous</v-btn>
                        
                    </v-stepper-content>
            
                    <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3" style="cursor:pointer">Event categories</v-stepper-step>
                    <v-stepper-content step="3" class="ma-0" style=" border-left: none; max-width:400px; margin:auto !important">
                        <v-layout v-if="this.categories.length>0 || this.battle_categories.length>0" wrap row justify-start   style="max-width:340px; margin:auto;" >
                            <div v-for="category in this.categories"  :key ="category.index">
                                <category-card-create :category="category" @removeCategory="removeCategory" @editCategory="editCategory"></category-card-create>
                            </div>
                            <div v-for="category in this.battle_categories"  :key ="category.index">
                                <category-card-create :category="category" @removeBattleCategory="removeBattleCategory" @editBattleCategory="editBattleCategory"></category-card-create>
                            </div>
                        </v-layout>
                        <!-- {{this.editing_event_obj}}
                        -->
                        <v-row class="mb-2 pa-0 hidden-xs-only">
                            <v-col >
                                <div style="width:100px; height: 100px; border-radius:10px; cursor:pointer;" class="my-1 grey_background" @click="workshop_dialog = true">
                                    <template class="pa-7"> <h5 class="font-weight-light py-10 px-4 black--text" style="underline:yellow;">Workshop</h5></template>
                                </div>
                            </v-col>
                            <v-col >
                                <div style="width:100px; height: 100px; border-radius:10px; cursor:pointer;" class="my-1 grey_background" @click="battle_dialog = true">
                                    <template class="pa-7"> <h5 class="font-weight-light py-10 px-7 black--text">Battle</h5></template>
                                </div>
                            </v-col>
                            <v-col >
                                <div style="width:100px; height: 100px; border-radius:10px; cursor:pointer;" class="my-1 grey_background" @click="cypher_dialog = true">
                                    <template class="pa-7"> <h5 class="font-weight-light py-10 px-6">Cypher</h5></template>
                                </div>
                            </v-col>
                            <v-col >
                                <div style="width:100px; height: 100px; border-radius:10px; cursor:pointer;" class="my-1 grey_background" @click="showcase_dialog = true">
                                    <template class="pa-7"> <h5 class="font-weight-light py-10 px-4">Showcase</h5></template >
                                </div>
                            </v-col>
                            <v-col >
                                <div style="width:100px; height: 100px;  border-radius:10px; cursor:pointer;" class="my-1 grey_background" @click="party_dialog = true">
                                    <template class="pa-7"> <h5 class="font-weight-light py-10 px-8">Party</h5></template >
                                </div>
                            </v-col>
                            <v-col >
                                <div style="width:100px; height: 100px;  border-radius:10px; cursor:pointer;" class="my-1 grey_background" @click="otherCategory_dialog = true">
                                    <template class="pa-7"> <h5 class="  caption font-weight-light py-10 px-1">CommunityTalk</h5></template >
                                </div>
                            </v-col>
                        </v-row>
                        <v-row class="mb-3 pa-0 hidden-sm-and-up">
                            <v-col class="pa-0" cols="12">
                                <div style="width:250px; height: 50px; border-radius:10px; cursor:pointer;" class="my-1 mx-auto grey_background" @click="workshop_dialog = true">
                                    <div class="pa-2"> <h5 class="font-weight-light py-2 px-16 text-center">Workshop</h5></div >
                                </div>
                            </v-col>
                            <v-col class="pa-0" cols="12">
                                <div style="width:250px; height: 50px; border-radius:10px; cursor:pointer; " class="my-1 mx-auto grey_background" @click="battle_dialog = true">
                                    <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Battle</h5></center >
                                </div>
                            </v-col>
                            <v-col class="pa-0" cols="12">
                                <div style="width:250px; height: 50px; border-radius:10px; cursor:pointer;" class="my-1 mx-auto grey_background" @click="cypher_dialog = true">
                                    <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Cypher</h5></center >
                                </div>
                            </v-col>
                            <v-col class="pa-0" cols="12">
                                <div style="width:250px; height: 50px; border-radius:10px; cursor:pointer;" class="my-1 mx-auto grey_background" @click="showcase_dialog = true">
                                    <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Showcase</h5></center >
                                </div>
                            </v-col>
                            <v-col class="pa-0" cols="12">
                                <div style="width:250px; height: 50px; border-radius:10px; cursor:pointer;" class="my-1 mx-auto grey_background" @click="party_dialog = true">
                                    <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Party</h5></center >
                                </div>
                            </v-col>
                            <v-col class="pa-0" cols="12">
                                <div style="width:250px; height: 50px; border-radius:10px; cursor:pointer;" class="my-1 mx-auto grey_background" @click="otherCategory_dialog = true">
                                    <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">CommunityTalk</h5></center >
                                </div>
                            </v-col>
                        </v-row>
                        <!-- <v-btn v-if="editing_event_obj" outlined small class="text-decoration-none"  color="black"
                        @click="update" :loading="progressbar" >Update</v-btn> -->
                        <v-btn color="primary" small text @click="e6 = 2">Previous</v-btn>
                        
                    </v-stepper-content>
                    <div class="mx-sm-7 mx-6">
                    <!-- <p v-if="progressbar" class="caption"> Hi, we're building the page. Please wait :)</p> -->
                    <v-btn v-if="!editing_event_obj" outlined small class="text-decoration-none"  color="black"
                    @click="submit" :loading="progressbar" >Save and View</v-btn>
                    <!-- <v-btn small color="error" text  @click="clear">Cancel</v-btn>  -->
                    </div>
                </v-stepper>
                <!-- {{this.categories}} -->
            </v-card>
        </v-container>
        <v-dialog
        :retain-focus="false"
        v-model="battle_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white pa-4 pa-md-8">
        <v-btn icon color="error" class="float-right" @click="close_battle_dialog ">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Battles</h3>
        <v-form ref="battle_form">
        <div v-if="!battle_category.poster" @click="onPick(2)" style="cursor:pointer; max-width:274px;" class="mx-auto my-4 rounded-lg grey_background" >
            <v-icon class="pa-image">mdi-plus</v-icon>
            <input 
            type="file" 
            name = "poster" 
            style="display:none" 
            ref="fileInput2" 
            accept="image/*"
            required
            @change="onFileChange2">
        </div>
        <div v-else class="ma-4">
        <v-img v-if="typeof(battle_category.poster) === 'string'" :src="battle_category.poster" class="mx-auto" height="300px" width="352px" contain>
            <v-btn icon small class="float-right ma-1 white" @click="removeImage(2)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
        <!-- {{battle_category}} {{battleEmcee}} {{battleDj}} -->
         <v-text-field
            
            :rules="nameRules"
            v-model= "battle_category.name"
            label= "Title"
            :maxlength="255"
            counter>
        </v-text-field>
        <v-checkbox color="primary" v-model="battle_same_day" label="Same day event"></v-checkbox>
        <v-menu
            ref="menu1"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="battle_category.date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly 
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="battle_category.date"
                :active-picker.sync="activePicker"
                @change="save(battle_category.date, 2)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "battle_category.date_time"
            label= "Time"
            prepend-icon="mdi-clock-time-four-outline"
            :maxlength="255"
            counter>
        </v-text-field>
        <v-text-field
        
            v-model = "battle_category.venue"
            label= "Venue"
            prepend-icon="mdi-map-marker-outline"
            :maxlength="255"
            counter>
        </v-text-field>
        <small class="grey--text text--darken-2">Mention the artists in the guests section to tag them here.</small>
        <v-autocomplete
            class="pt-4"
            v-model="battleEmcee"
            :items="selectedGuests"
            prepend-icon="mdi-microphone-variant"
            
            label="Emcee"
            counter="3"
            item-text="name"
            item-value="name"
            return-object 
            hide-selected
            multiple
            >
            <template v-slot:selection="data">
                <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="battleEmcee.splice(battleEmcee.findIndex(e => e.name === data.item.name),1)"
                >
                <v-avatar v-if="data.item.photo" left>
                    <v-img :src="data.item.photo"></v-img>
                </v-avatar>
                <v-avatar v-else >
                <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
                <span v-if="data.item.name" class="pl-1">{{ data.item.name }}</span>
                <span v-else class="pl-1">{{ data.item }}</span>
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template>
                <v-list-item-avatar v-if="data.item.photo">
                    <img :src="data.item.photo">
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-if="data.item.name" v-html="data.item.name"></v-list-item-title>
                    <v-list-item-title v-else v-html="data.item"></v-list-item-title>
                </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
        <v-autocomplete
            class="pt-4"
            v-model="battleDj"
            :items="selectedGuests"
            prepend-icon="mdi-music"
            label="Deejay"
            counter="3"
            item-text="name"
            item-value="name"
            return-object 
            hide-selected
            multiple
            >
            <template v-slot:selection="data">
                <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="battleDj.splice(battleDj.findIndex(e => e.name === data.item.name),1)"
                >
                <v-avatar v-if="data.item.photo" left>
                    <v-img :src="data.item.photo"></v-img>
                </v-avatar>
                <v-avatar v-else >
                <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
                <span v-if="data.item.name" class="pl-1">{{ data.item.name }}</span>
                <span v-else class="pl-1">{{ data.item }}</span>
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template>
                <v-list-item-avatar v-if="data.item.photo">
                    <img :src="data.item.photo">
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-if="data.item.name" v-html="data.item.name"></v-list-item-title>
                    <v-list-item-title v-else v-html="data.item"></v-list-item-title>
                </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
        <v-autocomplete
            class="pt-4"
            v-model="battleJudges"
            :items="selectedGuests"
            prepend-icon="mdi-account-search-outline"
            
            label="Judges"
            counter="7"
            item-text="name"
            item-value="name"
            return-object 
            hide-selected
            multiple
            >
            <template v-slot:selection="data">
                <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="battleJudges.splice(battleJudges.findIndex(e => e.name === data.item.name),1)"
                >
                <v-avatar v-if="data.item.photo" left>
                    <v-img :src="data.item.photo"></v-img>
                </v-avatar>
                <v-avatar v-else >
                <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
                <span v-if="data.item.name" class="pl-1">{{ data.item.name }}</span>
                <span v-else class="pl-1">{{ data.item }}</span>
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template>
                <v-list-item-avatar v-if="data.item.photo">
                    <img :src="data.item.photo">
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-if="data.item.name" v-html="data.item.name"></v-list-item-title>
                    <v-list-item-title v-else v-html="data.item"></v-list-item-title>
                </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
        <v-autocomplete
            class="pt-4"
            v-model="battleGuests"
            :items="selectedGuests"
            prepend-icon="mdi-star-outline"
            
            label="Battle guests"
            counter="3"
            item-text="name"
            item-value="name"
            return-object 
            hide-selected
            multiple
            >
            <template v-slot:selection="data">
                <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="battleGuests.splice(battleGuests.findIndex(e => e.name === data.item.name),1)"
                >
                <v-avatar v-if="data.item.photo" left>
                    <v-img :src="data.item.photo"></v-img>
                </v-avatar>
                <v-avatar v-else >
                <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
                <span v-if="data.item.name" class="pl-1">{{ data.item.name }}</span>
                <span v-else class="pl-1">{{ data.item }}</span>
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template>
                <v-list-item-avatar v-if="data.item.photo">
                    <img :src="data.item.photo">
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-if="data.item.name" v-html="data.item.name"></v-list-item-title>
                    <v-list-item-title v-else v-html="data.item"></v-list-item-title>
                </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
          <v-text-field
          
        prepend-icon="mdi-book-outline"
            v-model = "battle_category.rules"
            label= "Rules">
        </v-text-field>
        <v-text-field
        
        prepend-icon="mdi-license"
            v-model = "battle_category.prizes"
            label= "Prizes">
        </v-text-field>
        <v-textarea
        
            prepend-icon="mdi-information-outline"
            v-model = "battle_category.about"
            label= "About">
        </v-textarea>
        
        </v-form>
        <!-- <small class="red--text" v-if="error_text">{{error_text}}</small><br> -->
        <v-btn outlined small class="text-decoration-none" 
        v-if="!editing_category_process" 
        color="black" :loading="program_progressbar"
        @click="addBattle()" >Add</v-btn>
        <v-btn v-else outlined small class="text-decoration-none"  color="black" :loading="program_progressbar"
        @click="updateBattle()" >Update </v-btn>
        </v-container>
        </v-dialog> 
        <v-dialog
        :retain-focus="false"
        v-model="workshop_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white pa-4 pa-md-8">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Workshops</h3>
        <v-form ref="workshop_form">
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer; max-width:274px;" class=" mx-auto my-4 rounded-lg grey_background" >
            <v-icon class="pa-image">mdi-plus</v-icon>
            <input 
            type="file" 
            name = "poster" 
            style="display:none" 
            ref="fileInput3" 
            accept="image/*"
            required
            @change="onFileChange3">
        </div>
        <div v-else class="ma-4">
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="300px" width="352px" contain>
            <v-btn icon small class="float-right ma-1 white" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
        <small class="grey--text text--darken-2">Mention the artist in the guests section to tag them here.</small>
        <v-autocomplete
            class="pt-4"
            v-model="selectedGuest"
            :items="selectedGuests"
            prepend-icon="mdi-account-search-outline"
            
            label="Artist"
            item-text="name"
            return-object
            @input="addGuestToCategory()"
            >
            <template v-slot:selection="data">
                <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="selectedGuest={}"
                >
                <v-avatar v-if="data.item.photo" left>
                    <v-img :src="data.item.photo"></v-img>
                </v-avatar>
                <v-avatar v-else >
                <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
                <span class="pl-1">{{ data.item.name }}</span>
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template>
                <v-list-item-avatar v-if="data.item.photo">
                    <img :src="data.item.photo">
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="255"
            counter
            
            :rules="nameRules">
        </v-text-field>
        <v-checkbox color="primary" v-model="same_day" label="Same day event"></v-checkbox>
        <v-menu
            ref="menu2"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                
                    v-model="category.date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly 
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="category.date"
                :active-picker.sync="activePicker"
                @change="save(category.date,3)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "category.date_time"
            label= "Time"
            prepend-icon="mdi-clock-time-four-outline"
            :maxlength="255"
            counter>
        </v-text-field>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            
            v-model = "category.venue"
            label= "Venue"
            :maxlength="255"
            counter>
        </v-text-field>
        </v-form>
        <v-btn outlined small class="text-decoration-none" 
            v-if="!editing_category_process" 
            color="black" :loading="program_progressbar"
            @click="addWorkshop(1)" >Add</v-btn>
        <v-btn v-else outlined small class="text-decoration-none"  color="black" :loading="program_progressbar"
        @click="updateWorkshopCheck(1)" >Update </v-btn>
        </v-container>
        </v-dialog> 
        <v-dialog
        :retain-focus="false"
        v-model="showcase_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white pa-4 pa-md-8">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Showcases</h3>
        <v-form ref="showcase_form">
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer;  max-width:274px;" class=" mx-auto my-4 rounded-lg grey_background" >
            <v-icon class="pa-image">mdi-plus</v-icon>
            <input 
            type="file" 
            name = "poster" 
            style="display:none" 
            ref="fileInput3" 
            accept="image/*"
            required
            @change="onFileChange3">
        </div>
        <div v-else class="ma-4">
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="300px" width="352px" contain>
            <v-btn icon small class="float-right ma-1 white" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
        <small class="grey--text text--darken-2">Mention the artists in the guests section to tag them here.</small>
        <v-autocomplete
            class="pt-4"
            v-model="selectedGuest"
            :items="selectedGuests"
            prepend-icon="mdi-account-search-outline"
            
            label="Artist"
            item-text="name"
            return-object
            @input="addGuestToCategory()"
            >
            <template v-slot:selection="data">
                <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="selectedGuest={}"
                >
                <v-avatar v-if="data.item.photo" left>
                    <v-img :src="data.item.photo"></v-img>
                </v-avatar>
                <v-avatar v-else >
                <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
                <span class="pl-1">{{ data.item.name }}</span>
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template>
                <v-list-item-avatar v-if="data.item.photo">
                    <img :src="data.item.photo">
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="255"
            counter
            
            :rules="nameRules">
        </v-text-field>
        <v-checkbox color="primary" v-model="same_day" label="Same day event"></v-checkbox>
        <v-menu
            ref="menu2"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="category.date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly 
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="category.date"
                :active-picker.sync="activePicker"
                @change="save(category.date,3)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "category.date_time"
            label= "Time"
            prepend-icon="mdi-clock-time-four-outline"
            :maxlength="255"
            counter>
        </v-text-field>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="255"
            counter
            >
        </v-text-field>
        </v-form>
        <v-btn outlined small class="text-decoration-none" 
            v-if="!editing_category_process" 
            color="black" :loading="program_progressbar"
            @click="addWorkshop(2)" >Add</v-btn>
        <v-btn v-else outlined small class="text-decoration-none"  color="black" :loading="program_progressbar"
        @click="updateWorkshopCheck(2)" >Update </v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="party_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white pa-4 pa-md-8">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Party</h3>
        <v-form ref="party_form">
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer; max-width:274px;" class=" mx-auto my-4 rounded-lg grey_background" >
            <v-icon class="pa-image">mdi-plus</v-icon>
            <input 
            type="file" 
            name = "poster" 
            style="display:none" 
            ref="fileInput3" 
            accept="image/*"
            required
            @change="onFileChange3">
        </div>
        <div v-else class="ma-4">
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="300px" width="352px" contain>
            <v-btn icon small class="float-right ma-1 white" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="255"
            counter
            :rules="nameRules">
        </v-text-field>
        <v-checkbox color="primary" v-model="same_day" label="Same day event"></v-checkbox>
        <v-menu
            ref="menu2"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="category.date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly 
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="category.date"
                :active-picker.sync="activePicker"
                @change="save(category.date,3)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "category.date_time"
            label= "Time"
            prepend-icon="mdi-clock-time-four-outline"
            :maxlength="255"
            counter>
        </v-text-field>
        
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="255"
            counter=""
            >
        </v-text-field>
        </v-form>
        <v-btn outlined small class="text-decoration-none" 
            v-if="!editing_category_process" 
            color="black" :loading="program_progressbar"
            @click="addWorkshop(3)" >Add</v-btn>
        <v-btn v-else outlined small class="text-decoration-none"  color="black" :loading="program_progressbar"
        @click="updateWorkshopCheck(3)" >Update </v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="cypher_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white pa-4 pa-md-8">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Cypher Sessions</h3>
        <v-form ref="cypher_form">
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer; max-width:274px;" class="mx-auto my-4 rounded-lg grey_background" >
            <v-icon class="pa-image">mdi-plus</v-icon>
            <input 
            type="file" 
            name = "poster" 
            style="display:none" 
            ref="fileInput3" 
            accept="image/*"
            required
            @change="onFileChange3">
        </div>
        <div v-else class="ma-4">
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="300px" width="352px" contain>
            <v-btn icon small class="float-right ma-1 white" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="255"
            counter
            :rules="nameRules">
        </v-text-field>
        <v-checkbox color="primary" v-model="same_day" label="Same day event"></v-checkbox>
        <v-menu
            ref="menu2"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="category.date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly 
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="category.date"
                :active-picker.sync="activePicker"
                @change="save(category.date,3)"
                ></v-date-picker>
        </v-menu>

        <v-text-field
            v-model = "category.date_time"
            label= "Time"
            prepend-icon="mdi-clock-time-four-outline"
            :maxlength="255"
            counter>
        </v-text-field>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="250"
            countrter
            >
        </v-text-field>
        </v-form>
        <!-- <v-text-field
        prepend-icon="mdi-info"
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field> -->
        <v-btn outlined small class="text-decoration-none" 
            v-if="!editing_category_process" 
            color="black" :loading="program_progressbar"
            @click="addWorkshop(4)" >Add</v-btn>
        <v-btn v-else outlined small class="text-decoration-none"  color="black" :loading="program_progressbar"
        @click="updateWorkshopCheck(4)" >Update </v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="otherCategory_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white pa-4 pa-md-8">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Community Talk</h3>
        <v-form ref="talk_form">
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer; max-width:274px;" class="mx-auto my-4 rounded-lg grey_background" >
            <v-icon class="pa-image">mdi-plus</v-icon>
            <input 
            type="file" 
            name = "poster" 
            style="display:none" 
            ref="fileInput3" 
            accept="image/*"
            required
            @change="onFileChange3">
        </div>
        <div v-else class="ma-4">
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="300px" width="352px" contain>
            <v-btn icon small class="float-right ma-1 white" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
        <small class="grey--text text--darken-2">Mention the artists in the guests section to tag them here.</small>
        <v-autocomplete
            class="pt-4"
            v-model="selectedGuest"
            :items="selectedGuests"
            prepend-icon="mdi-account-search-outline"
            label="Artist"
            item-text="name"
            return-object
            @input="addGuestToCategory()"
            >
            <template v-slot:selection="data">
                <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="selectedGuest={}"
                >
                <v-avatar v-if="data.item.photo" left>
                    <v-img :src="data.item.photo"></v-img>
                </v-avatar>
                <v-avatar v-else >
                <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-avatar>
                <span class="pl-1">{{ data.item.name }}</span>
                </v-chip>
            </template>
            <template v-slot:item="data">
                <template>
                <v-list-item-avatar v-if="data.item.photo">
                    <img :src="data.item.photo">
                </v-list-item-avatar>
                <v-list-item-avatar v-else>
                    <v-icon>
                    mdi-account-circle
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="255"
            counter
            :rules="nameRules">
        </v-text-field>
        <v-checkbox color="primary" v-model="same_day" label="Same day event"></v-checkbox>
        <v-menu
            ref="menu2"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="category.date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly 
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="category.date"
                :active-picker.sync="activePicker"
                @change="save(category.date,3)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "category.date_time"
            label= "Time"
            prepend-icon="mdi-clock-time-four-outline"
            :maxlength="255"
            counter>
        </v-text-field>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="255"
            counter
            >
        </v-text-field>
        </v-form>
        <v-btn outlined small class="text-decoration-none" 
            v-if="!editing_category_process" 
            color="black" :loading="program_progressbar"
            @click="addWorkshop(5)" >Add</v-btn>
        <v-btn v-else outlined small class="text-decoration-none"  color="black" :loading="program_progressbar"
        @click="updateWorkshopCheck(5)" >Update </v-btn>
        </v-container>
        </v-dialog>
        <v-dialog v-model="delete_guest_dialog" width="500">    
        <v-card class="pa-4">
            <p>Are you sure you want to delete this guest?</p>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="deleteLoading"
                @click="deleteGuest">Delete</v-btn>
            <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="delete_guest_dialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="delete_organiser_dialog" width="500">    
        <v-card class="pa-4">
            <p>Are you sure you want to delete this organiser?</p>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="deleteLoadingOrg"
                @click="deleteOrganiser">Delete</v-btn>
            <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="delete_organiser_dialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog> -->
        <v-dialog v-model="delete_category_dialog" width="500">    
        <v-card class="pa-4">
            <p>Are you sure you want to delete this catgegory?</p>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="deleteLoading"
                @click="deleteCategory">Delete</v-btn>
            <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="delete_category_dialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog v-model="delete_battle_category_dialog" width="500">    
        <v-card class="pa-4">
            <p>Are you sure you want to delete this catgegory?</p>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="px-4 text-decoration-none" color="error" dark :loading="deleteLoading"
                @click="deleteBattleCategory">Delete</v-btn>
            <v-btn small color="black" class="px-4text-decoration-none" outlined  @click="delete_battle_category_dialog = false">
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-snackbar v-model="posted_snackbar">
            Event posted.
        </v-snackbar>
        <v-snackbar v-model="image_update_snackbar">
            Event poster updated.
        </v-snackbar>
        <v-snackbar v-model="valid_poster_snackbar">
            Event poster is required.
        </v-snackbar>
        <v-snackbar v-model="detail_update_snackbar">
            Event details updated.
        </v-snackbar>
        <v-snackbar v-model="guest_update_snackbar">
            Event guest updated.
        </v-snackbar>
        <v-snackbar v-model="program_update_snackbar">
            Event program updated.
        </v-snackbar>
        <v-snackbar v-model="guest_added_snackbar">
            Event guest added.
        </v-snackbar>
        <v-snackbar v-model="organiser_added_snackbar">
            Event organiser added.
        </v-snackbar>
        <v-snackbar v-model="organiser_update_snackbar">
            Event organiser updated.
        </v-snackbar>
        <v-snackbar v-model="category_added_snackbar">
            Event category added.
        </v-snackbar>
        <v-snackbar v-model="guest_delete_snackbar">
            Event guest deleted.
        </v-snackbar>
         <v-snackbar v-model="organiser_delete_snackbar">
            Event organiser deleted.
        </v-snackbar>
        <v-snackbar v-model="program_delete_snackbar">
            Event program deleted.
        </v-snackbar>
        <v-snackbar v-model="max_judges_snackbar">
            Maximum 7 artists.
        </v-snackbar>
        <v-snackbar v-model="max_emcee_snackbar">
            Maximum 3 emcees.
        </v-snackbar>
        <v-snackbar v-model="max_bguest_snackbar">
            Maximum 3 battle guests.
        </v-snackbar>
        <v-snackbar v-model="max_dj_snackbar">
            Maximum 3 Deejays.
        </v-snackbar>
        <v-snackbar v-model="max_artist_snackbar">
            Only 1 artist.
        </v-snackbar>
        <v-snackbar v-model="all_good_snackbar">
            All good, check out the events.
        </v-snackbar>
        <v-snackbar v-model="remove_guest_form_snackbar">
            Remove the guest on edit.
        </v-snackbar>
        <v-snackbar v-model="remove_organiser_form_snackbar">
            Remove the organiser on edit.
        </v-snackbar>
        <v-snackbar v-model="remove_category_form_snackbar">
            Remove the category on edit.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            {{error_text}}
        </v-snackbar>
        <v-snackbar v-model="publish_snackbar">
            Event posted, you can add other details.
        </v-snackbar>
    </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import { Slider, SliderItem } from "vue-easy-slider";
import { mapGetters } from 'vuex'
import CountryFlag from 'vue-country-flag'
import CategoryCardCreate from '@/components/CategoryCardCreate.vue'
import Vue from "vue";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import GuestCardCreate from '~/components/GuestCardCreate.vue';
Vue.use(Croppa);
import GebblesDivider from './GebblesDivider.vue';
export default {
    components: { 
        GebblesDivider,
        Slider,
        SliderItem,
        CountryFlag,
        CategoryCardCreate,
        GuestCardCreate 
    },
    created (){
        // let image ="https://mediumthumbnails.s3.us-east-2.amazonaws.com/";
        // let image2="https://minithumbnais.s3.us-east-2.amazonaws.com/"
        // console.log(image.includes("minithumbnails.s3"), image.includes("mediumthumbnails.s3"));
        // if(image.includes("minithumbnails.s3")|| image.includes("mediumthumbnails.s3")){
        //     console.log("s3ed mini");
        // }
        // if(image2.includes("minithumbnails.s3")||image2.includes("mediumthumbnails.s3")){
        //     console.log("s3ed");
        // }
        // console.log(this.$store.state.editing_event_obj.event_battles);
        // const newArr = arr1.map(obj => {
        // if (obj.id === 1) {
        //     return {...obj, name: 'Alfred'};
        // }
        // return obj;
        // });
        if(this.$store.state.editing_event_obj)
        {
            this.event = Object.assign({}, this.$store.getters.editing_event_obj);
            this.battle_categories = this.$store.getters.editing_event_obj.event_battles.map(a => Object.assign({}, a));
            this.categories = this.$store.getters.editing_event_obj.event_subevents.map(a => Object.assign({}, a));
            this.selectedGuests = this.$store.getters.editing_event_obj.event_guests.map(a => Object.assign({}, a));
        }
    },
    computed: {
        ...mapGetters(['editing_event_obj','loggedInUser']),
        img_height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 96
          case 'sm': return 150
          case 'md': return 150
          case 'lg': return 150
          case 'xl': return 150
        }
        },
        img_width () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 180
            case 'sm': return 180
            case 'md': return 200
            case 'lg': return 200
            case 'xl': return 300
            }
        },
    },
    data(){
        return {
            event: {
                username: this.$store.state.auth.user.username,
                name: "",  // # must
                venue: "",
                start_date: '', // # must
                link: "",
                poster: "", // # must
                country:'', // # must
                city:"",
                about:"",
                videolink:'',
                iglink:'',
                photo1:'',
                photo2:'',
                photo3:'',
                contact_email:''
            },
            battle_category:{
                username: this.$store.state.auth.user.username,
                event:'', // # must
                poster:'',
                name:'', // # must
                date: '',
                date_time:'',
                venue:'',
                // about:'',
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
                dj3:'',
                djname3:'',
                djphoto3:'',
                djvideolink3:'',
                djcountry3:'',
                djinfo3:'',
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
                mc3:'',
                mcname3:'',
                mcphoto3:'',
                mcvideolink3:'',
                mccountry3:'',
                mcinfo3:'',
                bg1:'',
                bgname1:'',
                bgphoto1:'',
                bgvideolink1:'',
                bgcountry1:'',
                bginfo1:'',
                bg2:'',
                bgname2:'',
                bgphoto2:'',
                bgvideolink2:'',
                bgcountry2:'',
                bginfo2:'',
                bg3:'',
                bgname3:'',
                bgphoto3:'',
                bgvideolink3:'',
                bgcountry3:'',
                bginfo3:'',
            },
            category:{
                event:'', // # must
                category:'',//
                poster:'',//
                name:'', // # must
                date:'',
                date_time:'',
                venue:'',
                guest1:'',
                name1:'',
                photo1:'',
                videolink1:'',
                country1:'',
                info1:'',
                username:this.$store.state.auth.user.username
            },
            guest:{
                name:'',
                guest:'',
                // category:[],
                photo:'',
                country:'',
                info:'',
                videolink:'',
                event:'',
                uuid:'',
                username:this.$store.state.auth.user.username
            },
            organiser:{
                name:'',
                guest:'',
                photo:'',
                country:'',
                info:'',
                videolink:'',
                event:'',
                uuid:'',
                username:this.$store.state.auth.user.username
            },
            saveUuid:'',
            delete_guest_dialog:false,
            delete_organiser_dialog:false,
            deleteLoading:false,
            deleteLoadingOrg:false,
            delete_category_dialog:false,
            delete_battle_category_dialog:false,
            battle_categories:[],
            categories:[],
            battleJudges:[],
            battleEmcee:[],
            battleGuests:[],
            battleDj:[],
            activePicker: null,
            menu: false,
            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            menu5: false,
            menu6: false,
            party_dialog:false,
            battle_dialog:false,
            showcase_dialog:false,
            workshop_dialog:false,
            cypher_dialog:false,
            otherCategory_dialog:false,
            progressbar: false,
            publish_progressbar: false,
            event_published:false,
            publish_snackbar: false,
            poster_progressbar:false,
            guest_progressbar:false,
            organiser_progressbar:false,
            program_progressbar:false,
            glance_progressbar:false,
            date:null,
            slide: null,
            e6: 1,
            model:"",
            posted_snackbar: false,
            max_bguest_snackbar: false,
            image_update_snackbar: false,
            detail_update_snackbar: false,
            guest_update_snackbar: false,
            organiser_update_snackbar: false,
            program_update_snackbar: false,
            guest_delete_snackbar:false,
            program_delete_snackbar:false,
            organiser_delete_snackbar:false,
            guest_added_snackbar:false,
            organiser_added_snackbar:false,
            category_added_snackbar:false,
            valid_poster_snackbar:false,
            remove_guest_form_snackbar:false,
            remove_organiser_form_snackbar: false,
            remove_category_form_snackbar:false,
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
            open_category_dialog:false,
            workshop:'yellow',
            battle:'red',
            party:'purple',
            cypher:'green',
            showcase:'blue',
            other:'black',
            max_judges_snackbar:false,
            max_dj_snackbar:false,
            max_artist_snackbar:false,
            max_emcee_snackbar:false,
            all_good_snackbar:false,
            artist_obj:null,
            artists:[],
            selectedGuests:[],
            selectedGuest:{},
            debounce: null,
            comboBoxModel: null,
            isUpdating: false,
            editing_organiser_process:false,
            editing_guest_process:false,//if we click on edit guest( this is to know if we will update guest or add guests!)
            editing_category_process:false,
            temp_guest_item:{},
            temp_organiser_item:{},
            temp_category_item:{},

            //errors
            guest_error:'',
            linkError:'',
            iglinkError:'',
            ytlinkError:'',
            error_text:"",
            error_snackbar:false,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 255) || 'Must be less than 255 characters',
            ],
            dateRules: [
                v => !!v || 'Date is required',
            ],
            countryRules: [
                v => !!v || 'Country is required',
            ],
            artistNameRules: [
                v => !!v || 'Artist name is required',
            ],
            categoryRules: [
                v => !!v || 'Category name is required',
            ],
            emailRules: [
                v => !v || /.+@.+\..+/.test(v) || 'E-mail must be valid',
                // v => (v && v.length <= 254) || 'Must be less than 254 characters',
            ],
            instagramRules:[
                v => !v || /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm.test(v) ||'Enter a valid Instagram link.',
                // v => (v && v.length <= 200) || 'Must be less than 200 characters',
            ],
            youtubeRules:[
                v => !v || /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g.test(v) || 'Enter a valid Youtube link.',
                // v => (v && v.length <= 200) || 'Must be less than 200 characters',
            ],
            linkRules:[
                v => !v || /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(v) || 'Enter a valid url.',
                // v => (v && v.length <= 200) || 'Must be less than 200 characters',
            ],
            same_day:false,
            battle_same_day:false
        }
    },
    watch: {
        menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
        isUpdating (val) {
        if (val) {
                setTimeout(() => (this.isUpdating = false), 3000)
            }
        },
        artist_obj: function() {
            if(this.artist_obj)
            {
                EventService.getSearchedArtist(this.artist_obj).then((value) => {
                    console.log(value.data);
                this.artists = value.data});
            }
        },
        battleEmcee (val, prev) {
        if (val.length === prev.length) return
        this.battleEmcee = val.map(v => {
            if (typeof v === 'string') {
            v = {
                name: v,
                guest:'',
                photo:'',
                country:'',
                info:''
            }

            this.battleEmcee.push(v)
            }
            return v})
        },
        same_day () {
            if(this.same_day)
            {
                this.category.date = this.event.start_date
                this.category.date_time = this.event.date_time
                this.category.venue = this.event.venue
            }
            else{
                this.category.date =''
                this.category.date_time = ''
                this.category.venue = ''
            }
        },
        battle_same_day () {
            if(this.battle_same_day)
            {
                this.battle_category.date = this.event.start_date
                this.battle_category.date_time = this.event.date_time
                this.battle_category.venue = this.event.venue
            }
            else{
                this.battle_category.date =''
                this.battle_category.date_time = ''
                this.battle_category.venue = ''
            }
        },
    },
    methods: {
        //global
        save(date, num){
            this.$refs.menu.save(date)
            switch(num) {
                case 1:
                    this.$refs.menu.save(date)
                    break;
                case 2:
                    this.$refs.menu1.save(date)
                    break; 
                case 3:
                    this.$refs.menu2.save(date)
                    break; 
                case 4:
                    this.$refs.menu3.save(date)
                    break;
                case 5:
                    this.$refs.menu4.save(date)
                    break; 
                case 6:
                    this.$refs.menu5.save(date)
                    break; 
                case 7:
                    this.$refs.menu6.save(date)
                    break; 
                default:
                    // code block
                }
        },
        // clear(){
        //     this.$store.dispatch("remove_editing_event_obj")
        //     this.$forceUpdate();
        // },
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
                case 4:
                this.$refs.fileInput4.click()
                break; 
                case 5:
                this.$refs.fileInput5.click()
                break; 
                case 6:
                this.$refs.fileInput6.click()
                break; 
                case 7:
                this.$refs.fileInput7.click()
                break; 
                case 8:
                this.$refs.fileInput8.click()
                break; 
                default:
                    // code block
                }
        },
        removeImage(num){
            switch(num) {
                case 1:
                    {
                    this.event.poster = "";
                    break;}
                case 2:{
                    this.battle_category.poster ="";
                    break;}
                case 3:{
                    this.category.poster ="";
                    break;}
                case 4:{
                    this.guest.photo = "";
                break;}
                case 5:{
                    this.organiser.photo = "";
                break;}
                case 6:{
                    this.event.photo1 = "";
                break;}
                case 7:{
                    this.event.photo2 = "";
                break;}
                case 8:{
                    this.event.photo3 = "";
                break;}
                default:
                    // code block
                }
        },
        onFileChange1(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.event.poster = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.event.poster = files[0];
            }
        },
        onFileChange2(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.battle_category.poster = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.battle_category.poster = files[0];
            }
        },
        onFileChange3(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.category.poster = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.category.poster = files[0];
            }
        },
        onFileChange4(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.guest.photo = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.guest.photo = files[0];
            }
        },
        onFileChange5(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.organiser.photo = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.organiser.photo = files[0];
            }
        },
        onFileChange6(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.event.photo1 = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.event.photo1 = files[0];
            }
        },
        onFileChange7(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.event.photo2 = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.event.photo2 = files[0];
            }
        },
        onFileChange8(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.event.photo3 = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.event.photo3 = files[0];
            }
        },
        dataURLtoFile(dataurl, filename) {
            // console.log( dataurl, filename);
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
            u8arr[n] = bstr.charCodeAt(n);
            }
        return new File([u8arr], filename, {type:mime});
        },
        async putImage(image){
            if(image.includes("minithumbnails.s3")|| image.includes("mediumthumbnails.s3"))
            {
            // console.log("already s3ed",image);
            return image
            }
            let fileData = this.dataURLtoFile(image, "coverimage.png");
            let res = await this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1")
            delete this.$axios.defaults.headers.common['Authorization']
            let filename = res.key
            let url = res.body
            url = url.slice(1, -1);
            let put = await this.$axios.$put(url, fileData)
            return "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
        },
        // searching
        searchArtists(){
        this.artists=[]
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
        if(this.comboBoxModel){EventService.getSearchedArtist(this.comboBoxModel).then((value) => {
            console.log(value.data);
        this.artists = value.data
        });}
        }, 100)
        },
        onAutoCompleteSelection(){
            this.comboBoxModel = this.artist_obj;
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
        customOnChangeHandler2(){
        let vm = this;
        setTimeout(function(){
            if(vm.$refs.artistListComboBox2){
            vm.comboBoxModel = vm.$refs.artistListComboBox2.internalSearch;
            vm.searchArtists();
            }
        });
        },
        addSearchGuest(){
            let t_name = typeof this.artist_obj;
            if(this.artist_obj && t_name == 'object') //if teacher exists then changing the value of teacher to username 
            {
                this.guest.guest = this.artist_obj.username
                this.guest.country = this.artist_obj.country
                if(this.guest.photo =='' && this.artist_obj.thumb!='')
                this.guest.photo = this.artist_obj.thumb
                if(this.guest.name =='' && this.artist_obj.artist_name!='')
                this.guest.name = this.artist_obj.artist_name
            }
            else
            {
                // this.category.name1 = this.artist_obj
            }
        },
        addSearchOrganiser(){
            let t_name = typeof this.artist_obj;
            if(this.artist_obj && t_name == 'object') //if teacher exists then changing the value of teacher to username 
            {
                this.organiser.guest = this.artist_obj.username
                this.organiser.country = this.artist_obj.country
                if(this.organiser.photo =='' && this.artist_obj.thumb!='')
                this.organiser.photo = this.artist_obj.thumb
                if(this.organiser.name =='' && this.artist_obj.artist_name!='')
                this.organiser.name = this.artist_obj.artist_name
            }
            else
            {
                // this.category.name1 = this.artist_obj
            }
        },
        //main event submit
        async submit(){
            if(this.saveUuid){
            try{
            this.progressbar =true
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()}
            };
            // if categories are added
            if(this.selectedGuests.length >0){
                // console.log("guests posts");
            //add event object to all categories
            this.selectedGuests.forEach(guest => guest.event = this.saveUuid);
            //put all images inside category in s3 bucket..
            // console.log("this.selectedGuests",this.selectedGuests);
            for (const item of this.selectedGuests) {
                if(item.photo){
                    item.photo = await this.putImage(item.photo)
                }
            }
            let formGuestData = new FormData();
            for (let data of this.selectedGuests) {
                for (let data2 in data) {
                    formGuestData.append(data2, data[data2]);
                }
                try {
                    let postGuest= await this.$axios.$post("/v1/events/guests/create/", formGuestData, config)
                    // console.log("guest posted",postGuest);
                } catch (error) {
                    this.error_text = error.response.data;
                    if(error.response.data.detail)
                    this.error_text = error.response.data.detail;
                    this.error_snackbar = true
                    console.log(error.response);
                }
            }
            }
            if(this.battle_categories.length >0){
            // console.log("battle posts");
            //add event object to all categories
            this.battle_categories.forEach(category => category.event = this.saveUuid);
            //put all images inside battle category in s3 bucket..
            for (const item of this.battle_categories) {
                console.log(item);
                if(item.poster){
                    item.poster = await this.putImage(item.poster)
                }
                
                if(item.photo1){
                    item.photo1 = await this.putImage(item.photo1)
                }
                if(item.photo2){
                    item.photo2 = await this.putImage(item.photo2)
                }
                if(item.photo3){
                    item.photo3 = await this.putImage(item.photo3)
                }
                if(item.photo4){
                    item.photo4 = await this.putImage(item.photo4)
                }
                if(item.photo5){
                    item.photo5 = await this.putImage(item.photo5)
                }
                if(item.photo6){
                    item.photo6 = await this.putImage(item.photo6)
                }
                if(item.photo7){
                    item.photo7 = await this.putImage(item.photo7)
                }
                if(item.djphoto1){
                    item.djphoto1 = await this.putImage(item.djphoto1)
                }
                if(item.djphoto2){
                    item.djphoto2 = await this.putImage(item.djphoto2)
                }
                if(item.djphoto3){
                    item.djphoto3 = await this.putImage(item.djphoto3)
                }
                if(item.mcphoto1){
                    item.mcphoto1 = await this.putImage(item.mcphoto1)
                }
                if(item.mcphoto2){
                    item.mcphoto2 = await this.putImage(item.mcphoto2)
                }
                if(item.mcphoto3){
                    item.mcphoto3 = await this.putImage(item.mcphoto3)
                }
                if(item.bgphoto1){
                    item.bgphoto1 = await this.putImage(item.bgphoto1)
                }
                if(item.bgphoto2){
                    item.bgphoto2 = await this.putImage(item.bgphoto2)
                }
                if(item.bgphoto3){
                    item.bgphoto3 = await this.putImage(item.bgphoto3)
                }
                // console.log("done",this.battle_categories);
            }
            // battle json readayyy

            // console.log("this.battle_categories ready to be uploaded??",this.battle_categories);
            let formData2 = new FormData();
            for (let data of this.battle_categories) {
                for (let data2 in data) {
                    formData2.append(data2, data[data2]);
                }
                try {
                    let postBattle = await this.$axios.$post("/v1/events/battles/create/", formData2, config)
                    // console.log("battle posted",postBattle);
                } catch (error) {
                    this.error_text = error.response.data;
                    if(error.response.data.detail)
                    this.error_text = error.response.data.detail;
                    this.error_snackbar = true
                    console.log(error.response);
                }
            }
            }
            if(this.categories.length >0){
            //add event object to all categories
            this.categories.forEach(category => category.event = this.saveUuid);
            //put all images inside category in s3 bucket..
            for (const item of this.categories) {
                if(item.poster){
                    item.poster = await this.putImage(item.poster)
                }
                if(item.photo1){
                    item.photo1 = await this.putImage(item.photo1)
                }
            }
            let formData2 = new FormData();
            for (let data of this.categories) {
                for (let data2 in data) {
                    formData2.append(data2, data[data2]);
                }
                try {
                    if(data.category == 1) {
                        console.log("post on workshops/create");
                        await this.$axios.$post("/v1/workshops/create/", formData2, config)
                    }
                    else
                    {
                        let postCategory= await this.$axios.$post("/v1/events/workshops/create/", formData2, config)
                    }
                    // console.log("categories posted",postCategory);
                } catch (error) {
                    this.error_text = error.response.data;
                    if(error.response.data.detail)
                    this.error_text = error.response.data.detail;
                    this.error_snackbar = true
                    console.log(error.response);
                }
            }
            }
            this.progressbar =false;
            this.posted_snackbar = true;
            this.$router.push("/events/"+this.saveUuid);
            }
            catch(error){
            }
            }else
            {
                this.e6 =1;
                this.error_text = 'Please publish the event first.'
                this.error_snackbar = true
            }
        },
        async saveAndAdd(){
            if(this.event.poster != ""){
                if(this.$refs.event_form.validate()){
                    try {
                        this.publish_progressbar =true
                        this.event.poster = await this.putImage(this.event.poster);
                        if(this.event.photo1)
                        this.event.photo1 = await this.putImage(this.event.photo1);
                        if(this.event.photo2)
                        this.event.photo2 = await this.putImage(this.event.photo2);
                        if(this.event.photo3)
                        this.event.photo3 = await this.putImage(this.event.photo3);
                        const config = {
                            headers: {"content-type": "multipart/form-data",
                                "Authorization": this.$auth.strategy.token.get()}
                        };
                        let formData = new FormData();
                        for (let data in this.event) {
                            formData.append(data, this.event[data]);
                        }
                        let resp = await this.$axios.$post("/v1/events/create/", formData, config)
                        this.saveUuid = resp.uuid;
                        this.publish_progressbar =false
                        this.publish_snackbar = true
                        this.event_published = true
                        this.e6 = 2 // event posted add other deatils
                    } catch (error) {
                        this.error_text = error.response.data;
                        if(error.response.data.detail)
                        this.error_text = error.response.data.detail;
                        console.log(error.response.data);
                        let er = error.response.data;
                        for (const key in er) {
                            if(`${key}` == 'iglink'){
                            this.iglinkError = `${er[key]}`
                            }
                            if(`${key}` == 'videolink'){
                            this.ytlinkError = `${er[key]}`
                            }
                            if(`${key}` == 'link'){
                            this.linkError = `${er[key]}`
                            }
                            this.e6 = 1
                        }
                        this.publish_progressbar = false
                        
                    }
                }
            }else{
                this.valid_poster_snackbar =true
            }
        },
        async saveGuestsAndAdd(){
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()}
            };
            // if categories are added
            if(this.selectedGuests.length >0)
            {
                // console.log("guests posts");
            //add event object to all categories
            this.selectedGuests.forEach(guest => guest.event = this.saveUuid);
            //put all images inside category in s3 bucket..
            // console.log("this.selectedGuests",this.selectedGuests);
            for (const item of this.selectedGuests) {
                if(item.photo){
                    item.photo = await this.putImage(item.photo)
                }
            }
            let formGuestData = new FormData();
            for (let data of this.selectedGuests) {
                for (let data2 in data) {
                    formGuestData.append(data2, data[data2]);
                }
                try {
                    let postGuest= await this.$axios.$post("/v1/events/guests/create/", formGuestData, config)
                    // console.log("guest posted",postGuest);
                } catch (error) {
                    this.error_text = error.response.data;
                    if(error.response.data.detail)
                    this.error_text = error.response.data.detail;
                    this.error_snackbar = true
                    console.log(error.response);
                }
            }
            }
        },
        //update event details
        async update(){
            if(this.event.poster != "")
            {
            if(this.$refs.event_form.validate())
            {
            try{
                this.progressbar =true
                if(this.event.poster != this.editing_event_obj.poster)
                this.event.poster = await this.putImage(this.event.poster);
                if(this.event.photo1 != this.editing_event_obj.photo1)
                {this.event.photo1 = await this.putImage(this.event.photo1);}
                if(this.event.photo2 != this.editing_event_obj.photo2)
                {this.event.photo2 = await this.putImage(this.event.photo2);}
                if(this.event.photo3 != this.editing_event_obj.photo3)
                {this.event.photo3 = await this.putImage(this.event.photo3);}
                this.formUpdate();
            }
            catch(error){
                this.error_text = error.response.data;
                if(error.response.data.detail)
                this.error_text = error.response.data.detail;
                console.log(error.response.data);
                let er = error.response.data;
                for (const key in er) {
                    if(`${key}` == 'iglink'){
                    this.iglinkError = `${er[key]}`
                    }
                    if(`${key}` == 'videolink'){
                    this.ytlinkError = `${er[key]}`
                    }
                    if(`${key}` == 'link'){
                    this.linkError = `${er[key]}`
                    }
                }
                this.progressbar = false
            }
            }
            }else{
                this.valid_poster_snackbar =true
            }
        },
        async formUpdate(){
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            };
            let myObj1 = this.editing_event_obj 
            let myObj2 = this.event
            // find keys 
            let keyObj1 = Object.keys(myObj1); 
            let keyObj2 = Object.keys(myObj2);
                
            // find values 
            let valueObj1 = Object.values(myObj1); 
            let valueObj2 = Object.values(myObj2); 
            
            // now compare their keys and values 
            let update = false; 
            try {
                let formName = new FormData();
            
                for(var i=0; i<keyObj1.length; i++) { 
                    if(keyObj1[i]=='event_battles'){}
                    else if(keyObj1[i]=='event_subevents'){}
                    else if (keyObj1[i]=='event_guests'){}
                    else if (keyObj1[i]=='event_guests'){}
                    else
                    {
                        if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 
                            console.log(" value not changed for: ",keyObj1[i]+' -> '+valueObj2[i]);	 
                        } 
                        else { 
                            update = true;
                            // it prints keys have different values 
                            formName.append(keyObj1[i], valueObj2[i]);
                            // console.log( valueObj2[i] ," gonna change"); 
                        } 
                    }
                }
                if(update)
                {
                    formName.append("id", this.event['id']);
                    await this.$axios.$patch("/v1/events/"+this.event.uuid, formName, config).then(res => {
                        // console.log(res," changed"); 
                        this.detail_update_snackbar = true;
                        update = false;
                    })
                }else{
                    this.error_text = 'Event details are upto date.';
                    this.error_snackbar = true
                }
                // this.$store.dispatch("remove_editing_event_obj");
                this.progressbar =false
                // this.refresh();
            } catch (error) {
                this.error_text = error.response.data;
                if(error.response.data.detail)
                this.error_text = error.response.data.detail;
                console.log("error!!!!! ",error, error.response);
                this.error_snackbar =true
                this.progressbar =false
            }
            // this.$router.push("/events/"+this.event.uuid);
        },
        //update guests
        async addGuests(){
            if(this.$refs.guest_form.validate()){
                if(this.editing_event_obj){
                    this.guest_progressbar =true
                    const config = {
                        headers: {"content-type": "multipart/form-data",
                            "Authorization": this.$auth.strategy.token.get()
                        }
                    }
                    this.guest.event = this.editing_event_obj.uuid;
                    if(this.guest.guest && typeof this.guest.guest=='object')
                    {this.guest.guest = this.guest.guest.username}
                    if(this.guest.photo)
                    {this.guest.photo = await this.putImage(this.guest.photo)}
                    let formGuestData = new FormData();
                    for (let data in this.guest) {
                        
                        formGuestData.append(data, this.guest[data]);
                    }
                    try {
                        
                        for (const pair of formGuestData.entries()) {
                        console.log(`${pair[0]}, ${pair[1]}`);
                        }
                        let postGuest= await this.$axios.$post("/v1/events/guests/create/", formGuestData, config)
                        console.log("guest posted",postGuest);
                        this.guest = {...postGuest}
                        this.guest_added_snackbar=true
                        this.guest_progressbar =false
                        this.addGuestToSelectedGuestArray();
                    } catch (error) {
                        if(error.response.data.detail)
                        this.error_text = error.response.data.detail;
                        console.log(error,error.response);
                        // this.error_snackbar = true;
                        this.guest_progressbar =false
                    }
                }
                else
                {
                    this.addGuestToSelectedGuestArray();
                }
            }
        },   
        async updateGuests(){
            if(this.$refs.guest_form.validate())
            {
                if(this.editing_event_obj){
                    this.guest_progressbar = true
                    if(this.guest.photo)
                    {
                        this.guest.photo = await this.putImage(this.guest.photo);
                    }
                    const config = {
                        headers: {"content-type": "multipart/form-data",
                            "Authorization": this.$auth.strategy.token.get()
                        }
                    };
                    let myObj1 = this.selectedGuest 
                    let myObj2 = this.guest
                    // find keys 
                    let keyObj1 = Object.keys(myObj1); 
                    let keyObj2 = Object.keys(myObj2);
                        
                    // find values 
                    let valueObj1 = Object.values(myObj1); 
                    let valueObj2 = Object.values(myObj2); 
                    let update = false;
                    // now compare their keys and values  
                    try {
                        let formName = new FormData();
                        for(var i=0; i<keyObj1.length; i++) {
                            if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 	 
                            } 
                            else { 
                                update = true;
                                formName.append(keyObj1[i], valueObj2[i]);
                            }
                        }
                        if(update)
                        {
                            formName.append("id", this.event['id']); 
                            await this.$axios.$patch("/v1/events/guests/"+this.selectedGuest.uuid, formName, config)
                            this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.id === this.selectedGuest.id),1);
                            this.addGuestToSelectedGuestArray();
                            this.guest_update_snackbar = true;
                            update = false;
                        }else{
                            this.error_text = 'Guest is upto date.'
                            this.error_snackbar=true;
                            this.clearGuestForm();
                        }
                        this.guest_progressbar =false;
                    } catch (error) {
                        this.error_text = error.response.data;
                        if(error.response.data.detail)
                        this.error_text = error.response.data.detail;
                        console.log("error!!!!! ",error, error.response);
                        this.error_snackbar =true
                        this.guest_progressbar =false
                    }
                }
                else{
                    //remove prev obj
                    this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.name === this.selectedGuest.name),1);
                    let clone = {...this.guest}
                    this.selectedGuests.push(clone)
                    this.guest_update_snackbar=true
                    for (var key in this.guest) {
                        this.guest[key] = '';
                    }
                    this.guest.username=this.loggedInUser.username
                    this.artist_obj= null
                    this.$refs.guest_form.resetValidation()
                }
                this.editing_guest_process = false
            }
        },
        addGuestToSelectedGuestArray(){
            let clone = {...this.guest}
            this.selectedGuests.push(clone)
            this.guest_added_snackbar=true
            this.clearGuestForm();
        },
        clearGuestForm(){
            for (var key in this.guest) {
                this.guest[key] = '';
            }
            this.guest.username=this.loggedInUser.username
            this.artist_obj= null
            this.selectedGuest = {}
            this.$refs.guest_form.resetValidation()
        },
        removeGuest (item) {
            // console.log(item);
            // console.log(this.temp_guest_item);
            this.temp_guest_item = item;
            this.delete_guest_dialog = true
        },
        async deleteGuest(){
            console.log(this.temp_guest_item);
            if(this.editing_event_obj)
            {
                this.deleteLoading = true
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
                try {
                    let response = await this.$axios.$delete("/v1/events/guests/"+ this.temp_guest_item.uuid, config)
                    // console.log(response);
                    this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.name === this.temp_guest_item.name),1);
                    this.delete_guest_dialog = false
                    this.deleteLoading = false
                    this.temp_guest_item = {}
                    this.guest_delete_snackbar =true
                    // this.$store.dispatch("check_share_comments", comment.shareidobj)
                    //guest removed
                } catch (e) {
                    this.error_text = e.response.data;
                        if(e.response.data.detail)
                        this.error_text = e.response.data.detail;
                    this.deleteLoading = false
                    this.error_snackbar = true
                    console.log(e,e.response);
                }
                //remove from api too
            }else{
                this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.name === this.temp_guest_item.name),1);
                this.delete_guest_dialog = false

            }
            this.cancel_edit_guest();
        },
        editGuest(item){
            if(!this.editing_guest_process)
            {this.editing_guest_process =true
            this.selectedGuest = Object.assign({}, item);
            // this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.name === item.name),1);
            this.guest= Object.assign({}, item);
            // console.log(this.guest,item );
            // this.guest.name = item.name;
            // this.guest.photo = item.photo;
            // this.guest.videolink = item.videolink;
            // this.guest.country = item.country;
            // this.guest.event = this.event.uuid;
            // this.guest.info = item.info;
            if(typeof item.guest == 'object')
            {
                // this.guest.guest = item.guest.username
                this.artist_obj = item.guest
            }else if (item.guest && typeof item.guest == 'string'){
                // this.guest.guest = item.guest
                console.log(item.guest, typeof item.guest);
                EventService.getArtist(item.guest).then((value) => {
                this.artist_obj = value.data;});
            }}else{
                this.remove_guest_form_snackbar = true
            }
        },
        cancel_edit_guest(){
            // let clone = {...this.selectedGuest}
            // this.selectedGuests.push(clone)
            for (var key in this.guest) {
                this.guest[key] = '';
            }
            
            this.$refs.guest_form.resetValidation()
            this.guest.username=this.loggedInUser.username
            this.artist_obj= null
            this.selectedGuest = {}
            this.editing_guest_process = false
        },
        //update category
        editCategory(item){
            if(!this.editing_category_process)
            {
                this.editing_category_process = true
                this.category = Object.assign({}, item);
                this.temp_category_item = Object.assign({}, item);
                //find object from guests -> name1 == item.name1
                // that object is selectedGuest 
                this.selectedGuest = this.selectedGuests.find(guest => guest.name === item.name1)
                //1:workshop
                //2:showcase
                //3:party
                //4:cypher
                //5:community talk
                let num = item.category;
                switch(num) {
                case 1:
                    {
                    this.workshop_dialog=true
                    break;}
                case 2:{
                    this.showcase_dialog=true
                    break;}
                case 3:{
                    this.party_dialog= true
                    break;}
                case 4:{
                    this.cypher_dialog =true
                break;}
                case 5:{
                    this.otherCategory_dialog = true
                break;}
                default:{}
                }
            }
            else{
                this.remove_category_form_snackbar = true
            }
        },
        updateWorkshopCheck(num){
            switch(num) {
                case 1:
                    if(this.$refs.workshop_form.validate())
                    this.updateWorkshop();
                    break;
                case 2:
                    if(this.$refs.showcase_form.validate())
                    this.updateWorkshop();
                    break;
                case 3:
                    if(this.$refs.party_form.validate())
                    this.updateWorkshop();
                    break;
                case 4:
                    if(this.$refs.cypher_form.validate())
                    this.updateWorkshop();
                    break;
                case 5:
                    if(this.$refs.talk_form.validate())
                    this.updateWorkshop();
                    break;
                default:
                    // code block
            }
        },
        async updateWorkshop(){
            if(this.editing_event_obj){
                this.program_progressbar = true
                if(this.category.poster)
                {
                    this.category.poster = await this.putImage(this.category.poster);
                }
                if(this.category.guest1 && typeof this.category.guest1=='object')
                {
                    this.category.guest1 = this.category.guest1.username
                    }
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
                let myObj1 = this.temp_category_item;
                let myObj2 = this.category;
                // find keys 
                let keyObj1 = Object.keys(myObj1); 
                let keyObj2 = Object.keys(myObj2);
                // find values 
                let valueObj1 = Object.values(myObj1); 
                let valueObj2 = Object.values(myObj2); 
                let update = false;
                // now compare their keys and values  
                try {
                    let formName = new FormData();
                    for(var i=0; i<keyObj1.length; i++) {
                        if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 
                        } 
                        else {
                            update = true;
                            formName.append(keyObj1[i], valueObj2[i]);
                        }
                    }
                    if(update){
                        formName.append("id", this.event['id']);
                        await this.$axios.$patch("/v1/events/workshops/"+this.temp_category_item.uuid, formName, config)
                        //remove from array
                        //addGuestToSelectedGuestArray
                        this.categories.splice(this.categories.findIndex(e => e.id === this.temp_category_item.id),1);
                        this.updateCategoryToArray();
                        update = false;
                    }
                    else{
                        this.error_text= 'This category is upto date.'
                        this.error_snackbar = true;
                        this.close_category_dialog();
                    }
                    this.program_progressbar =false
                } catch (error) {
                    this.error_text = error.response.data;
                    if(error.response.data.detail)
                    this.error_text = error.response.data.detail;
                    console.log("error!!!!! ",error, error.response);
                    this.error_snackbar =true
                    this.program_progressbar =false
                }
            }
            else{
                //remove prev obj
                this.categories.splice(this.categories.findIndex(e => e.name === this.temp_category_item.name),1);
                let clone = {...this.category}
                this.categories.push(clone)
                this.program_update_snackbar=true
                for (var key in this.category) {
                    this.category[key] = '';
                }
                this.category.username=this.loggedInUser.username
                this.artist_obj= null
                this.close_category_dialog();
            }
            this.program_progressbar =false
            this.editing_category_process = false
        },
        close_category_dialog(){
            this.editing_category_process = false;
            for (var key in this.category) {
                this.category[key] = '';
            }
            if(this.$refs.workshop_form)this.$refs.workshop_form.resetValidation()
            if(this.$refs.showcase_form)this.$refs.showcase_form.resetValidation()
            if(this.$refs.party_form)this.$refs.party_form.resetValidation()
            if(this.$refs.cypher_form)this.$refs.cypher_form.resetValidation()
            if(this.$refs.talk_form)this.$refs.talk_form.resetValidation()
            this.artist_obj= null
            this.selectedGuest={}
            this.category.username = this.loggedInUser.username
            this.workshop_dialog=false;
            this.party_dialog=false;
            this.showcase_dialog=false;
            this.cypher_dialog=false;
            this.otherCategory_dialog=false;
            this.same_day =false;
        },
        addWorkshop(num){
            //1:workshop
            //2:showcase
            //3:party
            //4:cypher
            //5:community talk
            switch(num) {
            case 1:
                {
                if(this.$refs.workshop_form.validate())
                {
                    this.category.category = 1
                    this.addWorkshop2();
                }
                break;
                }
            case 2:{
                if(this.$refs.showcase_form.validate())
                {
                    this.category.category = 2
                    this.addWorkshop2();
                }
                break;}
            case 3:{
                if(this.$refs.party_form.validate())
                {
                    this.category.category = 3
                    this.addWorkshop2();
                }
                break;}
            case 4:{
                if(this.$refs.cypher_form.validate())
                {
                    this.category.category = 4
                    this.addWorkshop2();
                }
            break;}
            case 5:{
                if(this.$refs.talk_form.validate())
                {
                    this.category.category = 5
                    this.addWorkshop2();
                }
            break;}
            default:
                // code block
            }
        },
        addWorkshop2(){
            if(this.editing_event_obj){
                this.postCategoryApi();
            }
            else
            {
                this.addCategoryToArray();
            }
        },
        async postCategoryApi(){
            this.program_progressbar =true
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()
                }
            }
            this.category.event = this.editing_event_obj.uuid;
            if(this.category.poster)
            {this.category.poster = await this.putImage(this.category.poster)}
            if(this.category.guest1 && typeof this.category.guest1=='object')
            {
                this.category.guest1 = this.category.guest1.username
            }
            let formCategoryData = new FormData();
            for (let data in this.category) {
                formCategoryData.append(data, this.category[data]);
            }
            try {
                let postCategory= await this.$axios.$post("/v1/events/workshops/create/", formCategoryData, config)
                // console.log("category posted",postCategory);
                this.category = {...postCategory}
                // console.log(this.category);
                this.category_added_snackbar=true
                this.program_progressbar =false
                this.addCategoryToArray();
            } catch (error) {
                this.error_text = error.response.data;
                console.log(error,error.response);
                // this.error_snackbar = true;
                this.program_progressbar =false
            }
        },
        addCategoryToArray(){
            let clone = {...this.category}
            this.categories.push(clone)
            this.category_added_snackbar=true
            this.close_category_dialog();
        },
        updateCategoryToArray(){
            let clone = {...this.category}
            this.categories.push(clone)
            this.program_update_snackbar = true;
            this.close_category_dialog();
        },
        addGuestToCategory(){
            if(this.selectedGuest){
                this.category.name1 = this.selectedGuest.name
                if(this.selectedGuest.guest)this.category.guest1 = this.selectedGuest.guest
                this.category.photo1 = this.selectedGuest.photo
                this.category.country1 = this.selectedGuest.country
                this.category.info1 = this.selectedGuest.info}
            else{this.category.name1 = ''
                this.category.guest1 = ''
                this.category.photo1 = ''
                this.category.country1 = ''
                this.category.info1 = ''
            }
        },
        removeCategory(item){
            this.temp_category_item = item
            this.delete_category_dialog = true
            // this.categories.splice(this.categories.findIndex(e => e.name === item.name && e.category === item.category),1);
        },
        async deleteCategory(){
            if(this.editing_event_obj)
            {
                this.deleteLoading = true
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
                try {
                    let response = await this.$axios.$delete("/v1/events/workshops/"+ this.temp_category_item.uuid, config)
                    console.log("deleted: ",response);
                    this.categories.splice(this.categories.findIndex(e => e.name === this.temp_category_item.name && e.category === this.temp_category_item.category),1);
                    this.delete_category_dialog = false
                    this.deleteLoading = false
                    this.temp_category_item = {}
                    this.program_delete_snackbar = true
                    // this.$store.dispatch("check_share_comments", comment.shareidobj)
                    //guest removed
                } catch (e) {
                    this.error_text = e.response.data;
                        if(error.response.data.detail)
                        this.error_text = e.response.data.detail;
                    this.deleteLoading = false
                    this.error_snackbar = true
                    console.log(e,e.response);
                }
                //remove from api too
            }else{
                console.log(this.temp_category_item);
                this.categories.splice(this.categories.findIndex(e => e.name === this.temp_category_item.name && e.category === this.temp_category_item.category),1);
                this.delete_category_dialog = false

            }
        },
        //add batttle
        async addBattle(){
            if(this.$refs.battle_form.validate()){
                this.battleGuestArrayToJson();
                if(this.editing_event_obj){
                    this.program_progressbar =true
                    const config = {
                        headers: {"content-type": "multipart/form-data",
                            "Authorization": this.$auth.strategy.token.get()
                        }
                    }
                    this.battle_category.event = this.editing_event_obj.uuid;
                    if(this.battle_category.poster)
                    {this.battle_category.poster = await this.putImage(this.battle_category.poster)}
                    let formBattleCategoryData = new FormData();
                    for (let data in this.battle_category) {
                        formBattleCategoryData.append(data, this.battle_category[data]);
                    }
                    try {
                        let postBattleCategory= await this.$axios.$post("/v1/events/battles/create/", formBattleCategoryData, config)
                        // console.log("battle_category posted",postBattleCategory);
                        this.battle_category = {...postBattleCategory}
                        // console.log(this.battle_category);
                        this.category_added_snackbar=true
                        this.program_progressbar =false
                        this.addBattleToArray();
                    } catch (error) {
                        this.error_text = error.response.data;
                        if(error.response.data.detail)
                        this.error_text = error.response.data.detail;
                        console.log(error,error.response);
                        this.error_snackbar = true;
                        this.program_progressbar =false
                    }
                }
                else
                {
                    this.addBattleToArray();
                }
            }
            else{
                this.error_text = 'Name is required'
            }
        },
        battleGuestArrayToJson(){
            // console.log(this.battleDj,this.battleEmcee, this.battleGuests, this.battleJudges);
            if(this.battleDj.length != 0){
                    //from the battleDj array put the selected ones to the battle category json.
                    for(let i =0; i<this.battleDj.length;i++)
                    {
                        if(this.battleDj[i]!= undefined)
                        if(this.battle_category.djname1 == '')
                        {
                            this.battle_category.djname1 = this.battleDj[i].name;
                            this.battle_category.djinfo1 = this.battleDj[i].info;
                            this.battle_category.djphoto1 = this.battleDj[i].photo;
                            if(this.battleDj[i].guest && typeof this.battleDj[i].guest=='object')
                            {this.battle_category.dj1 = this.battleDj[i].guest.username}
                            // this.battle_category.dj1 = this.battleDj[i].guest;
                            this.battle_category.djcountry1 = this.battleDj[i].country;
                            // add tags -> this.battle_category.dj1
                        }else if(this.battle_category.djname2 == ''){
                            this.battle_category.djname2 = this.battleDj[i].name;
                            this.battle_category.djinfo2 = this.battleDj[i].info;
                            this.battle_category.djphotor2 = this.battleDj[i].photo;
                            // this.battle_category.dj2 = this.battleDj[i].guest;
                            if(this.battleDj[i].guest && typeof this.battleDj[i].guest=='object')
                            {this.battle_category.dj2 = this.battleDj[i].guest.username}
                            this.battle_category.djcountry2 = this.battleDj[i].country;
                        }else{
                            this.battle_category.djname3 = this.battleDj[i].name;
                            this.battle_category.djinfo3 = this.battleDj[i].info;
                            this.battle_category.djphotor3 = this.battleDj[i].photo;
                            // this.battle_category.dj2 = this.battleDj[i].guest;
                            if(this.battleDj[i].guest && typeof this.battleDj[i].guest=='object')
                            {this.battle_category.dj3 = this.battleDj[i].guest.username}
                            this.battle_category.djcountry3 = this.battleDj[i].country;
                        }
                    }
            }
            if(this.battleEmcee.length != 0){
                //from the battleEmcee array put the selected ones to the battle category json.
                for(let i =0; i<this.battleEmcee.length;i++)
                {
                    if(this.battleEmcee[i]!= undefined)
                    if(this.battle_category.mcname1 == '')
                    {
                        this.battle_category.mcname1 = this.battleEmcee[i].name;
                        this.battle_category.mcinfo1 = this.battleEmcee[i].info;
                        this.battle_category.mcphoto1 = this.battleEmcee[i].photo;
                        // this.battle_category.mc1 = this.battleEmcee[i].guest;
                        if(this.battleEmcee[i].guest && typeof this.battleEmcee[i].guest=='object')
                        {this.battle_category.mc1 = this.battleEmcee[i].guest.username}
                        this.battle_category.mccountry1 = this.battleEmcee[i].country;
                        // add tags -> this.battle_category.dj1
                    }else if(this.battle_category.mcname2 == ''){
                        this.battle_category.mcname2 = this.battleEmcee[i].name;
                        this.battle_category.mcinfo2 = this.battleEmcee[i].info;
                        this.battle_category.mcphoto2 = this.battleEmcee[i].photo;
                        // this.battle_category.mc2 = this.battleEmcee[i].guest;
                        if(this.battleEmcee[i].guest && typeof this.battleEmcee[i].guest=='object')
                        {this.battle_category.mc2 = this.battleEmcee[i].guest.username}
                        this.battle_category.mccountry2 = this.battleEmcee[i].country;
                    }
                    else{
                        this.battle_category.mcname3 = this.battleEmcee[i].name;
                        this.battle_category.mcinfo3 = this.battleEmcee[i].info;
                        this.battle_category.mcphoto3 = this.battleEmcee[i].photo;
                        // this.battle_category.mc2 = this.battleEmcee[i].guest;
                        if(this.battleEmcee[i].guest && typeof this.battleEmcee[i].guest=='object')
                        {this.battle_category.mc3 = this.battleEmcee[i].guest.username}
                        this.battle_category.mccountry3 = this.battleEmcee[i].country;
                    }
                }
            }
            if(this.battleGuests.length != 0){
                //from the battleGuests array put the selected ones to the battle category json.
                for(let i =0; i<this.battleGuests.length;i++)
                {
                    if(this.battleGuests[i]!= undefined)
                    if(this.battle_category.bgname1 == '')
                    {
                        this.battle_category.bgname1 = this.battleGuests[i].name;
                        this.battle_category.bginfo1 = this.battleGuests[i].info;
                        this.battle_category.bgphoto1 = this.battleGuests[i].photo;
                        // this.battle_category.bg1 = this.battleGuests[i].guest;
                        if(this.battleGuests[i].guest && typeof this.battleGuests[i].guest=='object')
                        {this.battle_category.bg1 = this.battleGuests[i].guest.username}
                        this.battle_category.bgcountry1 = this.battleGuests[i].country;
                        // add tags -> this.battle_category.dj1
                    }
                    else if(this.battle_category.bgname2 == ''){
                        this.battle_category.bgname2 = this.battleGuests[i].name;
                        this.battle_category.bginfo2 = this.battleGuests[i].info;
                        this.battle_category.bgphoto2 = this.battleGuests[i].photo;
                        // this.battle_category.bg2 = this.battleGuests[i].guest;
                        if(this.battleGuests[i].guest && typeof this.battleGuests[i].guest=='object')
                        {this.battle_category.bg2 = this.battleGuests[i].guest.username}
                        this.battle_category.bgcountry2 = this.battleGuests[i].country;
                    }
                    else{
                        this.battle_category.bgname3 = this.battleGuests[i].name;
                        this.battle_category.bginfo3 = this.battleGuests[i].info;
                        this.battle_category.bgphoto3 = this.battleGuests[i].photo;
                        // this.battle_category.bg2 = this.battleGuests[i].guest;
                        if(this.battleGuests[i].guest && typeof this.battleGuests[i].guest=='object')
                        {this.battle_category.bg3 = this.battleGuests[i].guest.username}
                        this.battle_category.bgcountry3 = this.battleGuests[i].country;
                    }
                }
            }
            if(this.battleJudges.length != 0){
                //from the battlejudges array put the selected ones to the battle category json.
                for(let i =0; i<this.battleJudges.length;i++)
                {
                    if(this.battleJudges[i]!= undefined)
                    if(this.battle_category.name1 == '')
                    {
                        this.battle_category.name1 = this.battleJudges[i].name;
                        this.battle_category.info1 = this.battleJudges[i].info;
                        this.battle_category.photo1 = this.battleJudges[i].photo;
                        // this.battle_category.guest1 = this.battleJudges[i].guest;
                        if(this.battleJudges[i].guest && typeof this.battleJudges[i].guest=='object')
                        {this.battle_category.guest1 = this.battleJudges[i].guest.username}
                        this.battle_category.country1 = this.battleJudges[i].country;
                        // add tags -> this.battle_category.dj1
                    }else if(this.battle_category.name2 == '')
                    {
                        this.battle_category.name2 = this.battleJudges[i].name;
                        this.battle_category.info2 = this.battleJudges[i].info;
                        this.battle_category.photo2 = this.battleJudges[i].photo;
                        // this.battle_category.guest2 = this.battleJudges[i].guest;
                        if(this.battleJudges[i].guest && typeof this.battleJudges[i].guest=='object')
                        {this.battle_category.guest2 = this.battleJudges[i].guest.username}
                        this.battle_category.country2 = this.battleJudges[i].country;
                    }else if(this.battle_category.name3 == '')
                    {
                        this.battle_category.name3 = this.battleJudges[i].name;
                        this.battle_category.info3 = this.battleJudges[i].info;
                        this.battle_category.photo3 = this.battleJudges[i].photo;
                        // this.battle_category.guest3 = this.battleJudges[i].guest;
                        if(this.battleJudges[i].guest && typeof this.battleJudges[i].guest=='object')
                        {this.battle_category.guest3 = this.battleJudges[i].guest.username}
                        this.battle_category.country3 = this.battleJudges[i].country;
                    }else if(this.battle_category.name4 == '')
                    {
                        this.battle_category.name4 = this.battleJudges[i].name;
                        this.battle_category.info4 = this.battleJudges[i].info;
                        this.battle_category.photo4 = this.battleJudges[i].photo;
                        // this.battle_category.guest4 = this.battleJudges[i].guest;
                        if(this.battleJudges[i].guest && typeof this.battleJudges[i].guest=='object')
                        {this.battle_category.guest4 = this.battleJudges[i].guest.username}
                        this.battle_category.country4 = this.battleJudges[i].country;
                    }else if(this.battle_category.name5 == '')
                    {
                        this.battle_category.name5 = this.battleJudges[i].name;
                        this.battle_category.info5 = this.battleJudges[i].info;
                        this.battle_category.photo5 = this.battleJudges[i].photo;
                        // this.battle_category.guest5 = this.battleJudges[i].guest;
                        if(this.battleJudges[i].guest && typeof this.battleJudges[i].guest=='object')
                        {this.battle_category.guest5 = this.battleJudges[i].guest.username}
                        this.battle_category.country5 = this.battleJudges[i].country;
                    }else if(this.battle_category.name6 == '')
                    {
                        this.battle_category.name6 = this.battleJudges[i].name;
                        this.battle_category.info6 = this.battleJudges[i].info;
                        this.battle_category.photo6 = this.battleJudges[i].photo;
                        // this.battle_category.guest6 = this.battleJudges[i].guest;
                        if(this.battleJudges[i].guest && typeof this.battleJudges[i].guest=='object')
                        {this.battle_category.guest6 = this.battleJudges[i].guest.username}
                        this.battle_category.country6 = this.battleJudges[i].country;
                    }else if(this.battle_category.name7 == ''){
                        this.battle_category.name7 = this.battleJudges[i].name;
                        this.battle_category.info7 = this.battleJudges[i].info;
                        this.battle_category.photo7 = this.battleJudges[i].photo;
                        // this.battle_category.guest7 = this.battleJudges[i].guest;
                        if(this.battleJudges[i].guest && typeof this.battleJudges[i].guest=='object')
                        {this.battle_category.guest7 = this.battleJudges[i].guest.username}
                        this.battle_category.country7 = this.battleJudges[i].country;
                    }
                }
            }
        },
        addBattleToArray(){
            let clone = {...this.battle_category}
            this.battle_categories.push(clone)
            this.category_added_snackbar=true
            this.close_battle_dialog()
        },
        //update battle category
        async updateBattle(){
            if(this.$refs.battle_form.validate())
            {
                this.updateBattleGuests();
                // console.log("json updated", this.battle_category);
                if(this.editing_event_obj){
                    this.program_progressbar = true
                    if(this.battle_category.poster )
                    {
                        this.battle_category.poster = await this.putImage(this.battle_category.poster);
                    }
                    const config = {
                        headers: {"content-type": "multipart/form-data",
                            "Authorization": this.$auth.strategy.token.get()
                        }
                    };
                    let myObj1 = this.temp_category_item;
                    let myObj2 = this.battle_category;
                    // find keys 
                    let keyObj1 = Object.keys(myObj1); 
                    let keyObj2 = Object.keys(myObj2);
                    // find values 
                    let valueObj1 = Object.values(myObj1); 
                    let valueObj2 = Object.values(myObj2); 
                    
                    // now compare their keys and values  
                    let update = false;
                    try {
                        let formName = new FormData();
                        for(var i=0; i<keyObj1.length; i++) {
                            if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) {
                            } 
                            else {
                                console.log(keyObj1[i], valueObj2[i]);
                                update = true;
                                formName.append(keyObj1[i], valueObj2[i]);
                            }
                        }
                        if(update)
                        {
                            formName.append("id", this.event['id']);
                            await this.$axios.$patch("/v1/events/battles/"+this.temp_category_item.uuid, formName, config)
                            this.battle_categories.splice(this.battle_categories.findIndex(e => e.id === this.temp_category_item.id),1);
                            this.updateBattleToArray();
                            update = false;
                            // console.log(myObj1,myObj2);
                        }else{
                            this.error_text = 'Battle category is upto date.'
                            this.error_snackbar=true;
                            this.close_battle_dialog();
                        }

                        this.program_progressbar =false

                    } catch (error) {
                        this.error_text = error.response.data;
                        if(error.response.data.detail)
                        this.error_text = error.response.data.detail;
                        console.log("error!!!!! ",error, error.response);
                        this.error_snackbar =true
                        this.program_progressbar =false
                    }
                }
                else{
                    //remove prev obj
                    this.battle_categories.splice(this.battle_categories.findIndex(e => e.name === this.temp_category_item.name),1);
                    let clone = {...this.battle_category}
                    this.battle_categories.push(clone)
                    this.program_update_snackbar=true
                    for (var key in this.battle_category) {
                        this.battle_category[key] = '';
                    }
                    this.battle_category.username=this.loggedInUser.username
                    this.artist_obj= null
                    this.close_battle_dialog();
                }
                this.program_progressbar =false
                 this.editing_category_process = false
            }
        },
        updateBattleGuests(){
            // remove current battle_category guests
            // add the ones in battlemc/dj/judges array!!
            // for (var key in this.battle_category) {
            //     this.battle_category[key] = '';
            // }
                this.battle_category.guest1=''
                this.battle_category.name1=''
                this.battle_category.photo1=''
                this.battle_category.videolink1=''
                this.battle_category.country1=''
                this.battle_category.info1=''
                this.battle_category.guest2=''
                this.battle_category.name2=''
                this.battle_category.photo2=''
                this.battle_category.videolink2=''
                this.battle_category.country2=''
                this.battle_category.info2=''
                this.battle_category.guest3=''
                this.battle_category.name3=''
                this.battle_category.photo3=''
                this.battle_category.videolink3=''
                this.battle_category.country3=''
                this.battle_category.info3=''
                this.battle_category.guest4=''
                this.battle_category.name4=''
                this.battle_category.photo4=''
                this.battle_category.videolink4=''
                this.battle_category.country4=''
                this.battle_category.info4=''
                this.battle_category.guest5=''
                this.battle_category.name5=''
                this.battle_category.photo5=''
                this.battle_category.videolink5=''
                this.battle_category.country5=''
                this.battle_category.info5=''
                this.battle_category.guest6=''
                this.battle_category.name6=''
                this.battle_category.photo6=''
                this.battle_category.videolink6=''
                this.battle_category.country6=''
                this.battle_category.info6=''
                this.battle_category.guest7=''
                this.battle_category.name7=''
                this.battle_category.photo7=''
                this.battle_category.videolink7=''
                this.battle_category.country7=''
                this.battle_category.info7=''
                this.battle_category.dj1=''
                this.battle_category.djname1=''
                this.battle_category.djphoto1=''
                this.battle_category.djvideolink1=''
                this.battle_category.djcountry1=''
                this.battle_category.djinfo1=''
                this.battle_category.dj2=''
                this.battle_category.djname2=''
                this.battle_category.djphoto2=''
                this.battle_category.djvideolink2=''
                this.battle_category.djcountry2=''
                this.battle_category.djinfo2=''
                this.battle_category.dj3=''
                this.battle_category.djname3=''
                this.battle_category.djphoto3=''
                this.battle_category.djvideolink3=''
                this.battle_category.djcountry3=''
                this.battle_category.djinfo3=''
                this.battle_category.mc1=''
                this.battle_category.mcname1=''
                this.battle_category.mcphoto1=''
                this.battle_category.mcvideolink1=''
                this.battle_category.mccountry1=''
                this.battle_category.mcinfo1=''
                this.battle_category.mc2=''
                this.battle_category.mcname2=''
                this.battle_category.mcphoto2=''
                this.battle_category.mcvideolink2=''
                this.battle_category.mccountry2=''
                this.battle_category.mcinfo2=''
                this.battle_category.mc3=''
                this.battle_category.mcname3=''
                this.battle_category.mcphoto3=''
                this.battle_category.mcvideolink3=''
                this.battle_category.mccountry3=''
                this.battle_category.mcinfo3='';
                this.battle_category.bg1=''
                this.battle_category.bgname1=''
                this.battle_category.bgphoto1=''
                this.battle_category.bgvideolink1=''
                this.battle_category.bgcountry1=''
                this.battle_category.bginfo1=''
                this.battle_category.bg2=''
                this.battle_category.bgname2=''
                this.battle_category.bgphoto2=''
                this.battle_category.bgvideolink2=''
                this.battle_category.bgcountry2=''
                this.battle_category.bginfo2=''
                this.battle_category.bg3=''
                this.battle_category.bgname3=''
                this.battle_category.bgphoto3=''
                this.battle_category.bgvideolink3=''
                this.battle_category.bgcountry3=''
                this.battle_category.bginfo3='';
                this.battleGuestArrayToJson();
        },
        
        updateBattleToArray(){
            let clone = {...this.battle_category}
            this.battle_categories.push(clone)
            this.program_update_snackbar = true;
            this.close_battle_dialog();
        },
        editBattleCategory(item){
            if(!this.editing_category_process)
            {
                this.editing_category_process= true
                this.battle_dialog= true
                this.battle_category = Object.assign({}, item);
                this.temp_category_item = Object.assign({}, item);
                // console.log("initial", this.battle_category,this.temp_category_item);
                //find object from guests -> name1 == item.name1
                // that object is selectedGuest 
                if(item.name1)
                {
                    let j1 = this.selectedGuests.find(guest => guest.name === item.name1);
                    this.battleJudges.push(j1)
                }if(item.name2)
                {
                    let j2 = this.selectedGuests.find(guest => guest.name === item.name2);
                    this.battleJudges.push(j2)
                }if(item.name3)
                {
                    let j3 = this.selectedGuests.find(guest => guest.name === item.name3);
                    this.battleJudges.push(j3)
                }if(item.name4)
                {
                    let j4 = this.selectedGuests.find(guest => guest.name === item.name4);
                    this.battleJudges.push(j4)
                }if(item.name5)
                {
                    let j5 = this.selectedGuests.find(guest => guest.name === item.name5);
                    this.battleJudges.push(j5)
                }if(item.name6)
                {
                    let j6 = this.selectedGuests.find(guest => guest.name === item.name6);
                    this.battleJudges.push(j6)
                }if(item.name7)
                {
                    let j7 = this.selectedGuests.find(guest => guest.name === item.name7);
                    this.battleJudges.push(j7)
                }if(item.mcname1)
                {
                    let m1 = this.selectedGuests.find(guest => guest.name === item.mcname1);
                    this.battleEmcee.push(m1)
                }if(item.mcname2)
                {
                    let m2 = this.selectedGuests.find(guest => guest.name === item.mcname2);
                    this.battleEmcee.push(m2)
                }if(item.mcname3)
                {
                    let m3 = this.selectedGuests.find(guest => guest.name === item.mcname3);
                    this.battleEmcee.push(m3)
                }if(item.djname1)
                {
                    let d1 = this.selectedGuests.find(guest => guest.name === item.djname1);
                    this.battleDj.push(d1)
                }if(item.djname2)
                {
                    let d2 = this.selectedGuests.find(guest => guest.name === item.djname2);
                    this.battleDj.push(d2)
                }if(item.djname3)
                {
                    let d3 = this.selectedGuests.find(guest => guest.name === item.djname3);
                    this.battleDj.push(d3)
                }if(item.bgname1)
                {
                    let bg1 = this.selectedGuests.find(guest => guest.name === item.bgname1);
                    this.battleGuests.push(bg1)
                }if(item.bgname2)
                {
                    let bg2 = this.selectedGuests.find(guest => guest.name === item.bgname2);
                    this.battleGuests.push(bg2)
                }if(item.bgname3)
                {
                    let bg3 = this.selectedGuests.find(guest => guest.name === item.bgname3);
                    this.battleGuests.push(bg3)
                }
            }
            else{
                this.remove_category_form_snackbar = true
            }
        },
        close_battle_dialog(){
            this.editing_category_process = false;
            for (var key in this.battle_category) {
                this.battle_category[key] = '';
            }
            this.$refs.battle_form.resetValidation()
            this.artist_obj= null
            this.selectedGuest={}
            this.battle_category.username = this.loggedInUser.username
            this.battleEmcee =[];
            this.battleJudges=[];
            this.battleDj=[];
            this.battleGuests =[];
            this.battle_dialog=false;
            this.battle_same_day=false;
        },
        removeBattleCategory(item){
            this.temp_category_item = item
            this.delete_battle_category_dialog = true
            // this.battle_categories.splice(this.battle_categories.findIndex(e => e.name === item.name && e.category === item.category),1);
        },
        async deleteBattleCategory(){
            if(this.editing_event_obj)
            {
                this.deleteLoading = true
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": this.$auth.strategy.token.get()
                    }
                };
                try {
                    let response = await this.$axios.$delete("/v1/events/battles/"+ this.temp_category_item.uuid, config)
                    // console.log(response);
                    this.battle_categories.splice(this.battle_categories.findIndex(e => e.name === this.temp_category_item.name && e.category === this.temp_category_item.category),1);
                    this.delete_battle_category_dialog = false
                    this.deleteLoading = false
                    this.temp_category_item = {}
                    this.program_delete_snackbar = true
                    // this.$store.dispatch("check_share_comments", comment.shareidobj)
                    //guest removed
                } catch (e) {
                    this.error_text = e.response.data;
                        if(error.response.data.detail)
                        this.error_text = e.response.data.detail;
                    this.deleteLoading = false
                    this.error_snackbar = true
                    console.log(e,e.response);
                }
                //remove from api too
            }else{
                // this.battle_categories.splice(this.battle_categories.findIndex(e => e.name === item.name && e.category === item.category),1);
                this.battle_categories.splice(this.battle_categories.findIndex(e => e.name === this.temp_category_item.name && e.category === this.temp_category_item.category),1);
                this.delete_battle_category_dialog = false

            }
        },
        //update organisers
        // editOrganiser(item){
        //     if(!this.editing_organiser_process)
        //     {this.editing_organiser_process =true
        //     this.selectedOrganiser = Object.assign({}, item);
        //     // this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.name === item.name),1);
        //     this.organiser= Object.assign({}, item);
        //     // console.log(this.guest,item );
        //     // this.guest.name = item.name;
        //     // this.guest.photo = item.photo;
        //     // this.guest.videolink = item.videolink;
        //     // this.guest.country = item.country;
        //     // this.guest.event = this.event.uuid;
        //     // this.guest.info = item.info;
        //     if(typeof item.guest == 'object')
        //     {
        //         // this.guest.guest = item.guest.username
        //         this.artist_obj = item.guest
        //     }else if (item.guest && typeof item.guest == 'string'){
        //         EventService.getArtist(item.guest).then((value) => {
        //         this.artist_obj = value.data;});
        //     }}else{
        //         this.remove_organiser_form_snackbar = true
        //     }
        // },
        // async addOrganiser(){
        //     if(this.organiser.name){
        //         this.organiser.category=[]
        //         this.organiser.category.push(5);
        //         if(this.editing_event_obj){
        //             this.organiser_progressbar =true
        //             const config = {
        //                 headers: {"content-type": "multipart/form-data",
        //                     "Authorization": this.$auth.strategy.token.get()
        //                 }
        //             }
        //             this.organiser.event = this.editing_event_obj.uuid;
        //             if(this.organiser.guest && typeof this.organiser.guest=='object')
        //             {this.organiser.guest = this.organiser.guest.username}
        //             if(this.organiser.photo)
        //             {this.organiser.photo = await this.putImage(this.organiser.photo)}
        //             let formOrganiserData = new FormData();
        //             for (let data in this.organiser) {
        //                 formOrganiserData.append(data, this.organiser[data]);
        //             }
        //             try {
        //                 let postOrganiser= await this.$axios.$post("/v1/events/guests/create/", formOrganiserData, config)
        //                 console.log("organiser posted",postOrganiser);
        //                 this.organiser = {...postOrganiser}
        //                 this.organiser_added_snackbar=true
        //                 this.organiser_progressbar =false
        //                 this.addOrganiserToSelectedOrgArray();
        //             } catch (error) {
        //                 console.log(error,error.response);
        //                 this.error_snackbar = true;
        //                 this.organiser_progressbar =false
        //             }
        //         }
        //         else
        //         {
        //             this.addOrganiserToSelectedOrgArray();
        //         }
        //     }else this.cat_valid_snackbar = true
        // },   
        // addOrganiserToSelectedOrgArray(){
        //     let clone = {...this.organiser}
        //     this.selectedGuests.push(clone)
        //     this.organiser_added_snackbar=true
        //     for (var key in this.organiser) {
        //         this.organiser[key] = '';
        //     }
        //     this.organiser.category=[];
        //     this.organiser.username=this.loggedInUser.username
        //     this.artist_obj= null
        //     this.selectedOrganiser = {}
        // },
        // cancel_edit_organiser(){
        //     for (var key in this.organiser) {
        //         this.organiser[key] = '';
        //     }
        //     this.organiser.category=[]
        //     this.organiser.username=this.loggedInUser.username
        //     this.artist_obj= null
        //     this.selectedOrganiser = {}
        //     this.editing_organiser_process = false
        // },
        // async updateOrganiser(){
        //     if(this.organiser.name!= "")
        //     {
        //         if(this.editing_event_obj){
        //             this.organiser_progressbar = true
        //             if(this.organiser.photo)
        //             {
        //                 this.organiser.photo = await this.putImage(this.organiser.photo);
        //             }
        //             const config = {
        //                 headers: {"content-type": "multipart/form-data",
        //                     "Authorization": this.$auth.strategy.token.get()
        //                 }
        //             };
        //             let myObj1 = this.selectedOrganiser 
        //             let myObj2 = this.organiser
        //             // find keys 
        //             let keyObj1 = Object.keys(myObj1); 
        //             let keyObj2 = Object.keys(myObj2);
                        
        //             // find values 
        //             let valueObj1 = Object.values(myObj1); 
        //             let valueObj2 = Object.values(myObj2); 
                    
        //             // now compare their keys and values  
        //             try {
        //                 let formName = new FormData();
        //                 for(var i=0; i<keyObj1.length; i++) {
        //                     if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 	 
        //                     } 
        //                     else { 
        //                         formName.append(keyObj1[i], valueObj2[i]);
        //                     }
        //                 }
        //                 formName.append("id", this.event['id']); 
        //                 await this.$axios.$patch("/v1/events/guests/"+this.selectedOrganiser.uuid, formName, config).then(res => {
        //                     console.log( res," changed"); 
        //                 })
        //                 //remove from array
        //                 //addGuestToSelectedGuestArray

        //                 this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.id === this.selectedOrganiser.id),1);
        //                 this.addOrganiserToSelectedOrgArray();
        //                 this.organiser_progressbar =false
        //                 this.organiser_update_snackbar = true;
        //             } catch (error) {
        //                 console.log("error!!!!! ",error, error.response);
        //                 this.error_snackbar =true
        //                 this.organiser_progressbar =false
        //             }
        //         }
        //         else{
        //             //remove prev obj
        //             this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.name === this.selectedOrganiser.name),1);
        //             let clone = {...this.organiser}
        //             this.selectedGuests.push(clone)
        //             this.organiser_update_snackbar=true
        //             for (var key in this.organiser) {
        //                 this.organiser[key] = '';
        //             }
        //             this.organiser.category=[]
        //             this.organiser.username=this.loggedInUser.username
        //             this.artist_obj= null
        //         }
        //     }
        //     else{
        //         this.cat_valid_snackbar=true
        //     }
        //     this.editing_organiser_process = false
        // },
        // removeOrganiser (item) {
        //     console.log(item);
        //     console.log(this.temp_organiser_item);
        //     this.temp_organiser_item = item;
        //     this.delete_organiser_dialog = true
        // },
        // async deleteOrganiser(){
        //     if(this.editing_event_obj)
        //     {
        //         this.deleteLoadingOrg = true
        //         const config = {
        //             headers: {"content-type": "multipart/form-data",
        //                 "Authorization": this.$auth.strategy.token.get()
        //             }
        //         };
        //         try {
        //             let response = await this.$axios.$delete("/v1/events/guests/"+ this.temp_organiser_item.uuid, config)
        //             // console.log(response);
        //             this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.name === this.temp_organiser_item.name),1);
        //             this.delete_organiser_dialog = false
        //             this.deleteLoadingOrg = false
        //             this.temp_organiser_item = {}
        //             this.organiser_delete_snackbar =true
        //             // this.$store.dispatch("check_share_comments", comment.shareidobj)
        //             //guest removed
        //         } catch (e) {
        //             this.deleteLoadingOrg = false
        //             this.error_snackbar = true
        //             console.log(e,e.response);
        //         }
        //         //remove from api too
        //     }else{
        //         this.selectedGuests.splice(this.selectedGuests.findIndex(e => e.name === this.temp_organiser_item.name),1);
        //         this.delete_guest_dialog = false

        //     }
        // },
        
    }
   
}
</script>
<style scoped>
div .hover:hover {
  background: #E0E0E0;
}
.v-input--selection-controls {
    margin-top:0; padding:0;
}
.pa-image{
    padding: 60px 125px;
}
</style>