<template>
<v-app>
    <v-container class="ma-24" style="max-width:520px;">
        <div align="left" justify="left">
            <v-btn icon class="elevation-0 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </div>
        <v-row >
            <!-- {{event.uuid}}
            <p v-if="editing_event_obj">{{editing_event_obj.event_battles}}<br></p>
            Event HERE
            {{this.battle_categories}} -->
        <v-col class="pa-0">
             <h2 class="mb-md-8 mb-4" align="center" justify="center">About the event</h2>
            <v-stepper v-model="e6" vertical class="my-2">
                <v-stepper-step :complete="e6 > 1" step="1" @click.native="e6 = 1" style="cursor:pointer">
                Event poster* 
                <!-- <small>Summarize if needed</small> -->
                </v-stepper-step>
                <v-stepper-content step="1" style="border-left: none;" width="100%" class="ma-0"> 
                <div>
                <div v-if="!event.poster" @click="onPick(1)" style="cursor:pointer;  width:152px;" class="mb-4 rounded-lg grey lighten-4" >
                    <v-icon class="pa-16">mdi-plus</v-icon>
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
                    <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(1)">
                    <v-icon color="black" small>mdi-close</v-icon>
                    </v-btn>
                </v-img>
                </div>
                </div>
                <v-btn color="black" text small outlined @click="e6 = 2">Next</v-btn>
                <!-- <v-btn text @click="goback" small color="primary">Cancel</v-btn> -->
                </v-stepper-content>
        
                <v-stepper-step :complete="e6 > 2" step="2" @click.native="e6 = 2" style="cursor:pointer">Event details*</v-stepper-step>
                <v-stepper-content step="2" style="border-left: none;" class="ma-0">
                    <v-text-field
                        v-model = "event.name"
                        label= "Event name*"
                        :rules="[() => !!event.name || 'This field is required']"
                        :maxlength="350">
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
                                v-model= "event.start_date"
                                label="Date"
                                prepend-icon="mdi-calendar"
                                readonly clearable
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
                    prepend-icon="mdi-map-marker-outline"
                        v-model = "event.venue"
                        label= "Event venue"
                        :maxlength="250">
                    </v-text-field>
                    <v-text-field
                        v-model = "event.city"
                        label= "City"
                        :maxlength="250">
                    </v-text-field>
                    <v-select label="Country" v-model= "event.country"
                    prepend-icon="mdi-earth"
                        :items="countries"
                        item-text="name"
                        item-value="code"
                        required
                    ></v-select>
                    <v-textarea
                    prepend-icon="mdi-information-outline"
                        v-model = "event.about"
                        label= "About the event">
                    </v-textarea>
                    <v-text-field
                        :error-messages="linkError"
                        prepend-icon="mdi-youtube"
                        v-model = "event.videolink"
                        label= "Youtube video link"
                        @change="checkLink">
                    </v-text-field>
                    <v-text-field
                    prepend-icon="mdi-link"
                        :error-messages="linkError"
                        v-model = "event.link"
                        label= "Add a link"
                        @change="checkLink">
                    </v-text-field>
                    <v-btn color="black" text small outlined @click="e6 = 3">Next</v-btn>
                    <v-btn color="error" text small @click="e6 = 1">Previous</v-btn>
                    <!-- <v-btn text @click="goback" small color="primary">Cancel</v-btn> -->
                </v-stepper-content>
        
                <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3" style="cursor:pointer">Add guests</v-stepper-step>
                <v-stepper-content step="3"  style=" border-left: none;" class="ma-0" >
                    
                    <v-btn color="black" text small outlined @click="e6 = 4">Next</v-btn>
                    <v-btn color="error" small text @click="e6 = 2">Previous</v-btn>
                    <!-- <v-btn text small @click="goback" color="primary">Cancel</v-btn> -->
                </v-stepper-content>
                <v-stepper-step :complete="e6 > 4" step="4" @click.native="e6 = 4" style="cursor:pointer">Add categories</v-stepper-step>
                <v-stepper-content step="4"  style=" border-left: none; max-width:400px; margin:auto">
                    <!-- {{this.categories}} -->
                    <v-row class="mb-2 pa-0 hidden-xs-only">
                        <v-col >
                            <div style="width:100px; height: 100px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 hover" @click="workshop_dialog = true">
                                <template class="pa-7"> <h5 class="font-weight-light py-10 px-4" style="underline:yellow;">Workshop</h5></template>
                            </div>
                        </v-col>
                        <v-col >
                            <div style="width:100px; height: 100px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 hover" @click="battle_dialog = true">
                                <template class="pa-7"> <h5 class="font-weight-light py-10 px-8">Battle</h5></template>
                            </div>
                        </v-col>
                        <v-col >
                            <div style="width:100px; height: 100px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 hover" @click="cypher_dialog = true">
                                <template class="pa-7"> <h5 class="font-weight-light py-10 px-7">Cypher</h5></template>
                            </div>
                        </v-col>
                        <v-col >
                            <div style="width:100px; height: 100px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 " @click="showcase_dialog = true">
                                <template class="pa-7"> <h5 class="font-weight-light py-10 px-4">Showcase</h5></template >
                            </div>
                        </v-col>
                        <v-col >
                            <div style="width:100px; height: 100px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1" @click="party_dialog = true">
                                <template class="pa-7"> <h5 class="font-weight-light py-10 px-8">Party</h5></template >
                            </div>
                        </v-col>
                        <v-col >
                            <div style="width:100px; height: 100px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1" @click="otherCategory_dialog = true">
                                <template class="pa-7"> <h5 class="  caption font-weight-light py-10 px-2">CommunityTalk</h5></template >
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mb-3 pa-0 hidden-sm-and-up">
                        <v-col class="pa-0" cols="12">
                            <div style="width:250px; height: 50px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 mx-auto" @click="workshop_dialog = true">
                                <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Workshop</h5></center >
                            </div>
                        </v-col>
                        <v-col class="pa-0" cols="12">
                            <div style="width:250px; height: 50px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 mx-auto" @click="battle_dialog = true">
                                <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Battle</h5></center >
                            </div>
                        </v-col>
                        <v-col class="pa-0" cols="12">
                            <div style="width:250px; height: 50px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 mx-auto" @click="cypher_dialog = true">
                                <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Cypher</h5></center >
                            </div>
                        </v-col>
                        <v-col class="pa-0" cols="12">
                            <div style="width:250px; height: 50px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 mx-auto" @click="showcase_dialog = true">
                                <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Showcase</h5></center >
                            </div>
                        </v-col>
                        <v-col class="pa-0" cols="12">
                            <div style="width:250px; height: 50px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 mx-auto" @click="party_dialog = true">
                                <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Party</h5></center >
                            </div>
                        </v-col>
                        <v-col class="pa-0" cols="12">
                            <div style="width:250px; height: 50px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 mx-auto" @click="otherCategory_dialog = true">
                                <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">CommunityTalk</h5></center >
                            </div>
                        </v-col>
                    </v-row>
                    <v-btn color="error" small text @click="e6 = 3">Previous</v-btn>
                    <!-- <v-btn text small @click="goback" color="primary">Cancel</v-btn> -->
                </v-stepper-content>
                <p v-if="progressbar" class="caption"> hi, we're building the page, please wait :)</p>
                    <v-btn v-if="!editing_event_obj" outlined small class="text-decoration-none ml-12"  color="black"
                    @click="submit" :loading="progressbar" >Submit</v-btn>
                    <v-btn v-else outlined small class="text-decoration-none ml-12"  color="black"
                    @click="update" :loading="progressbar" >Update</v-btn>
                    <v-btn text small @click="goback" color="primary">Cancel</v-btn>
            </v-stepper>
            <v-row class="pa-0 ma-0">
                <v-col cols="4" v-for="category in this.categories"  :key ="category.index">
                    <div style="border: 1px solid; height:150px">
                        <v-row align="end" justify="end" class="pa-0 ma-0" >
                        <v-btn  icon color="error" @click="removeCat(category)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        </v-row>
                        <category-card-create :category="category"></category-card-create>
                    </div>
                </v-col>
                <v-col cols="4" v-for="category in this.battle_categories"  :key ="category.index">
                    <div style="border: 1px solid; height:150px">
                        <v-row align="end" justify="end" class="pa-0 ma-0" >
                        <v-btn  icon color="error" @click="removeBatCat(category)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        </v-row>
                        <category-card-create :category="category"></category-card-create>
                    </div>
                </v-col>
            </v-row>
        </v-col>
        </v-row>
        <!-- add battle dialog -->
        <v-dialog
        :retain-focus="false"
        v-model="battle_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="close_battle_dialog ">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add battle</h3>
        <div v-if="!battle_category.poster" @click="onPick(2)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(battle_category.poster) === 'string'" :src="battle_category.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(2)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "battle_category.name"
            label= "Title"
            :maxlength="150">
        </v-text-field>
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
                    readonly clearable
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
        <v-menu
        ref="menutime"
        v-model="menutime"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="battle_category.date_time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="battle_category.date_time"
            label="Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menutime"
          v-model="battle_category.date_time"
          full-width
          @click:minute="$refs.menutime.save(battle_category.date_time)"
        ></v-time-picker>
      </v-menu>
        <v-text-field
            v-model = "battle_category.venue"
            label= "Venue"
            prepend-icon="mdi-map-marker-outline"
            :maxlength="150">
        </v-text-field>
        <v-text-field @click="emceeDialog = true"
            prepend-icon="mdi-microphone-variant"
            v-model = "battle_category.mc"
            label= "Emcee"
            hint="you can add upto 2 emcees"
            :maxlength="0">
        </v-text-field>
        <v-chip v-for="obj in battleEmcee" :key="obj.id" close-icon="mdi-close" close @click:close="battleEmcee.splice(battleEmcee.findIndex(e => e.name === obj.name),1);" color="black " dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="obj.poster">
              <v-img :src="obj.poster"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{obj.name}}
          </v-chip>
        <v-text-field @click="djDialog = true"
            prepend-icon="mdi-music"
            v-model = "battle_category.dj"
            label= "DJ"
            hint="you can add upto 2 djs"
            :maxlength="0">
        </v-text-field>
        <v-chip v-for="obj in battleDj" :key="obj.id" close-icon="mdi-close" close @click:close="battleDj.splice(battleDj.findIndex(e => e.name === obj.name),1);" color="black " dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="obj.poster">
              <v-img :src="obj.poster"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{obj.name}}
          </v-chip>
        <v-text-field @click="judgesDialog = true"
            label= "Judges"
            prepend-icon="mdi-hand-heart-outline"
            :maxlength="0"
            hint="you can add upto 7 judges"
            >
        </v-text-field>
          <v-chip v-for="obj in battleJudges" :key="obj.id" close-icon="mdi-close" close @click:close="battleJudges.splice(battleJudges.findIndex(e => e.name === obj.name),1);" color="black " dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="obj.poster">
              <v-img :src="obj.poster"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{obj.name}}
          </v-chip>
          <v-text-field
        prepend-icon="mdi-book-outline"
            v-model = "battle_category.rules"
            label= "Rules"
            :maxlength="550">
        </v-text-field>
        <v-text-field
        prepend-icon="mdi-license"
            v-model = "battle_category.prizes"
            label= "Prizes"
            :maxlength="550">
        </v-text-field>
        <v-text-field
        prepend-icon="mdi-information-outline"
            v-model = "battle_category.about"
            label= "About">
        </v-text-field>
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addBattle()">Add</v-btn>
        </v-container>
        </v-dialog> 
        <v-dialog
        :retain-focus="false"
        v-model="workshop_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add workshop</h3>
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="250">
        </v-text-field>
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
                    readonly clearable
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
        <v-menu
        ref="menutime_ws"
        v-model="menutime_ws"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="category.date_time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="category.date_time"
            label="Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menutime_ws"
          v-model="category.date_time"
          full-width
          @click:minute="$refs.menutime_ws.save(category.date_time)"
        ></v-time-picker>
        </v-menu>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="250">
        </v-text-field>
        <v-text-field @click="artistDialog = true"
            prepend-icon="mdi-hand-heart-outline"
            label= "Artist"
            :maxlength="0">
        </v-text-field>
        <v-chip v-if="category.name1" close-icon="mdi-close" close @click:close="category.name1='';category.photo1='';category.info1='';category.guest1=''" color="black " dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo1">
              <v-img :src="category.photo1"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name1}}
        </v-chip>
        <br>
        <!-- <v-text-field
        prepend-icon="mdi-info"
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field> -->
        <v-btn outlined small class="text-decoration-none "  color="black"
          @click="addWorkshop()" >Add</v-btn>
        </v-container>
        </v-dialog> 
        <v-dialog
        :retain-focus="false"
        v-model="party_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add party</h3>
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="250">
        </v-text-field>
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
                    readonly clearable
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
        <v-menu
        ref="menutime_pa"
        v-model="menutime_pa"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="category.date_time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="category.date_time"
            label="Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menutime_pa"
          v-model="category.date_time"
          full-width
          @click:minute="$refs.menutime_pa.save(category.date_time)"
        ></v-time-picker>
        </v-menu>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="150">
        </v-text-field>
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addParty()" >Add</v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="showcase_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add Showcase</h3>
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="250">
        </v-text-field>
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
                    readonly clearable
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
        <v-menu
        ref="menutime_sh"
        v-model="menutime_sh"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="category.date_time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="category.date_time"
            label="Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menutime_sh"
          v-model="category.date_time"
          full-width
          @click:minute="$refs.menutime_sh.save(category.date_time)"
        ></v-time-picker>
        </v-menu>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="150">
        </v-text-field>
        <v-text-field @click="artistDialog = true"
            prepend-icon="mdi-hand-heart-outline"
            label= "Artist"
            :maxlength="0">
        </v-text-field>
        <v-chip v-if="category.name1" close-icon="mdi-close" close @click:close="category.name1='';category.photo1='';category.info1='';category.guest1=''" color="black " dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo1">
              <v-img :src="category.photo1"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name1}}
        </v-chip>
        <br>
        <!-- <v-text-field
        prepend-icon="mdi-info"
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field> -->
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addShowcase()" >Add</v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="cypher_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add Cypher</h3>
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="250">
        </v-text-field>
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
                    readonly clearable
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
        <v-menu
        ref="menutime_cy"
        v-model="menutime_cy"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="category.date_time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="category.date_time"
            label="Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menutime_cy"
          v-model="category.date_time"
          full-width
          @click:minute="$refs.menutime_cy.save(category.date_time)"
        ></v-time-picker>
        </v-menu>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="150">
        </v-text-field>
        <!-- <v-text-field
        prepend-icon="mdi-info"
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field> -->
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addCypher()"  >Add</v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="otherCategory_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Community Talk</h3>
        <div v-if="!category.poster" @click="onPick(3)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(category.poster) === 'string'" :src="category.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(3)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "category.name"
            label= "Title"
            :maxlength="250">
        </v-text-field>
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
                    readonly clearable
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
        <v-menu
        ref="menutime_ct"
        v-model="menutime_ct"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="category.date_time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="category.date_time"
            label="Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menutime_ct"
          v-model="category.date_time"
          full-width
          @click:minute="$refs.menutime_ct.save(category.date_time)"
        ></v-time-picker>
        </v-menu>
        <v-text-field prepend-icon="mdi-map-marker-outline"
            v-model = "category.venue"
            label= "Venue"
            :maxlength="150">
        </v-text-field>
        <v-text-field @click="artistDialog = true"
            prepend-icon="mdi-hand-heart-outline"
            label= "Artist"
            :maxlength="0">
        </v-text-field>
        <v-chip v-if="category.name1" close-icon="mdi-close" close @click:close="category.name1='';category.photo1='';category.info1='';category.guest1=''" color="black " dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo1">
              <v-img :src="category.photo1"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name1}}
        </v-chip>
        <br>
        <!-- <v-text-field
        prepend-icon="mdi-info"
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field> -->
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addOtherCategory()" >Add</v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="open_category_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
            <v-row align="end" justify="end" class="pa-0 ma-0" >
            <v-btn icon color="error" class="float-right" @click="open_category_dialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-row>
        <h3 class="font-weight-light">{{openCategoryItem.type}}</h3>
        <v-img v-if="typeof(openCategoryItem.poster) === 'string'" :src="openCategoryItem.poster" class="mx-auto my-6" height="auto" width="352px" contain>
        </v-img>
        <h3  class="font-weight-light">{{openCategoryItem.name}}</h3>
        {{openCategoryItem}}
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="judgesDialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="judgesDialogClose">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add Judges</h3>
        <div v-if="!judges.poster" @click="onPick(4)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(judges.poster) === 'string'" :src="judges.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(4)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "judges.name"
            label= "Name"
            :maxlength="150">
        </v-text-field>
        <v-combobox
                v-model="artist_obj"
                :items="artists"
                prepend-icon="mdi-account-search-outline"
                label="Tag artist..."
                item-text="artist_name"
                item-value="username"
                ref="artistListComboBox"
                @change="onAutoCompleteSelection"
                @keyup="customOnChangeHandler"
                @paste="customOnChangeHandler"
                @input="addBattleArtists"
                >
                <!-- when its a chip -->
                <template v-slot:selection="data">
                    <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click:close="artist_obj = null"
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
        prepend-icon="mdi-earth"
        :items="countries"
        item-text="name"
        item-value="code"
        v-model = "judges.country"
        label= "Country"
        clearable>
        </v-select>
        <v-text-field
        prepend-icon="mdi-information-outline"
            v-model = "judges.info"
            label= "Info"
            :maxlength="250">
        </v-text-field>
        
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addJudges()" >Add</v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="emceeDialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="judgesDialogClose">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add Emcee</h3>
        <div v-if="!judges.poster" @click="onPick(4)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(judges.poster) === 'string'" :src="judges.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(4)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "judges.name"
            label= "Name"
            :maxlength="150">
        </v-text-field>
         <v-combobox
                v-model="artist_obj"
                :items="artists"
                prepend-icon="mdi-account-search-outline"
                label="Tag artist..."
                item-text="artist_name"
                item-value="username"
                ref="artistListComboBox"
                @change="onAutoCompleteSelection"
                @keyup="customOnChangeHandler"
                @paste="customOnChangeHandler"
                @input="addBattleArtists"
                >
                <!-- when its a chip -->
                <template v-slot:selection="data">
                    <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click:close="artist_obj = null"
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
        prepend-icon="mdi-earth"
        :items="countries"
        item-text="name"
        item-value="code"
        v-model = "judges.country"
        label= "Country"
        clearable>
        </v-select>
        <v-text-field
        prepend-icon="mdi-information-outline"
            v-model = "judges.info"
            label= "Info"
            :maxlength="250">
        </v-text-field>
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addEmcee()" >Add</v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="djDialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="judgesDialogClose">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add DJ</h3>
        <div v-if="!judges.poster" @click="onPick(4)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
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
        <v-img v-if="typeof(judges.poster) === 'string'" :src="judges.poster" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(4)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "judges.name"
            label= "Name"
            :maxlength="150">
        </v-text-field>
         <v-combobox
                v-model="artist_obj"
                :items="artists"
                prepend-icon="mdi-account-search-outline"
                label="Tag artist..."
                item-text="artist_name"
                item-value="username"
                ref="artistListComboBox"
                @change="onAutoCompleteSelection"
                @keyup="customOnChangeHandler"
                @paste="customOnChangeHandler"
                @input="addBattleArtists"
                >
                <!-- when its a chip -->
                <template v-slot:selection="data">
                    <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click:close="artist_obj = null"
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
        prepend-icon="mdi-earth"
        :items="countries"
        item-text="name"
        item-value="code"
        v-model = "judges.country"
        label= "Country"
        clearable>
        </v-select>
        <v-text-field
        prepend-icon="mdi-information-outline"
            v-model = "judges.info"
            label= "Info"
            :maxlength="250">
        </v-text-field>
        
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addDj()" >Add</v-btn>
        </v-container>
        </v-dialog>
        <v-dialog
        :retain-focus="false"
        v-model="artistDialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="judgesDialogClose">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add Artist</h3>
        <div v-if="!category.photo1" @click="onPick(5)" style="cursor:pointer;  width:152px;" class=" mx-auto my-4 rounded-lg grey lighten-4" >
            <v-icon class="pa-16">mdi-plus</v-icon>
            <input 
            type="file" 
            name = "poster" 
            style="display:none" 
            ref="fileInput5" 
            accept="image/*"
            required
            @change="onFileChange5">
        </div>
        <div v-else class="ma-4">
        <v-img v-if="typeof(category.photo1) === 'string'" :src="category.photo1" class="mx-auto" height="auto" width="352px" contain>
            <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(5)">
            <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
        </v-img>
        </div>
         <v-text-field
            v-model= "category.name1"
            label= "Name"
            :maxlength="150">
        </v-text-field>
        <v-combobox
                v-model="artist_obj"
                :items="artists"
                prepend-icon="mdi-account-search-outline"
                label="Tag artist..."
                item-text="artist_name"
                item-value="username"
                ref="artistListComboBox"
                @change="onAutoCompleteSelection"
                @keyup="customOnChangeHandler"
                @paste="customOnChangeHandler"
                @input="addCategoryArtist"
                >
                <!-- when its a chip -->
                <template v-slot:selection="data">
                    <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click:close="artist_obj = null"
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
        prepend-icon="mdi-earth"
        :items="countries"
        item-text="name"
        item-value="code"
        v-model = "category.country1"
        label= "Country"
        clearable>
        </v-select>
        <v-text-field
            prepend-icon="mdi-information-outline"
            v-model = "category.info1"
            label= "Info"
            :maxlength="250">
        </v-text-field>
        
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addArtist()" >Ok</v-btn>
        </v-container>
        </v-dialog>
        <!-- {{battle_categories}}
        {{categories}} -->
        <v-snackbar v-model="posted_snackbar">
            Event posted.
        </v-snackbar>
        <v-snackbar v-model="error_snackbar">
            Some error occured. Please try again.
        </v-snackbar>
        <v-snackbar v-model="valid_snackbar">
            Please fill the required details.(name, poster, country, date)
        </v-snackbar>
        <v-snackbar v-model="cat_valid_snackbar">
            Name is required.
        </v-snackbar>
        <v-snackbar v-model="max_judges_snackbar">
            Maximum 7 artists.
        </v-snackbar>
        <v-snackbar v-model="max_emcee_snackbar">
            Maximum 2 emcees.
        </v-snackbar>
        <v-snackbar v-model="max_dj_snackbar">
            Maximum 2 DJs.
        </v-snackbar>
        <v-snackbar v-model="max_artist_snackbar">
            Only 1 artist.
        </v-snackbar>
    </v-container>
</v-app>
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
Vue.use(Croppa);
export default {
    middleware : 'check_auth',
    components: {
        Slider,
        SliderItem,
        CountryFlag,
        CategoryCardCreate
    },
    created (){
        if(this.$store.state.editing_event_obj)
        {
            this.event = Object.assign({}, this.$store.getters.editing_event_obj);
            this.battle_categories = this.$store.getters.editing_event_obj.event_battles.map(a => Object.assign({}, a));
            this.categories = this.$store.getters.editing_event_obj.event_subevents.map(a => Object.assign({}, a));

            // this.battle_categories = this.$store.getters.editing_event_obj.event_battles;
            // this.categories = this.$store.getters.editing_event_obj.event_subevents;
        }
    },
    computed: {
        ...mapGetters(['editing_event_obj'])
    },
    data(){
        return {
            event: {
                username: this.$store.state.auth.user.user.username,
                name: "",  // # must
                venue: "",
                start_date: null, // # must
                link: "",
                poster: "", // # must
                country:null, // # must
                city:"",
                about:"",
                videolink:''
            },
            battle_category:{
                username: this.$store.state.auth.user.user.username,
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
                username:this.$store.state.auth.user.user.username
            },
            judges:{
                guest:'',
                name:'',
                poster:'',
                country:'',
                info:'',
            },
            battle_categories:[],
            categories:[],
            battleJudges:[],
            battleEmcee:[],
            battleDj:[],
            otherArtist:[],
            artistDialog: false,
            judgesDialog: false,
            emceeDialog: false,
            djDialog: false,
            activePicker: null,
            menu: false,
            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            menu5: false,
            menu6: false,
            menutime_ws: false,
            menutime_sh: false,
            menutime_pa: false,
            menutime_cy: false,
            menutime_ct: false,
            menutime:false,
            party_dialog:false,
            battle_dialog:false,
            showcase_dialog:false,
            workshop_dialog:false,
            cypher_dialog:false,
            otherCategory_dialog:false,
            lockButton: false,
            progressbar: false,
            date:null,
            slide: null,
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
            open_category_dialog:false,
            openCategoryItem:{},
            workshop:'yellow',
            battle:'red',
            party:'purple',
            cypher:'green',
            showcase:'blue',
            other:'black',
            cat_valid_snackbar:false,
            max_judges_snackbar:false,
            max_dj_snackbar:false,
            max_artist_snackbar:false,
            max_emcee_snackbar:false,
            artist_obj:null,
            artists:[],
            debounce: null,
            comboBoxModel: null,
        }
    },
    watch: {
        menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
        artist_obj: function() {
        if(this.artist_obj)
        {
            console.log("this.artist_obj", this.artist_obj);
            EventService.getSearchedArtist(this.artist_obj).then((value) => {
            this.artists = value.data});
        }
      }
    },
    methods: {
        searchArtists(){
        this.artists=[]
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
            console.log("debounce search");
            console.log("this.comboBoxModel", this.comboBoxModel, this.artist_obj);
        if(this.comboBoxModel){EventService.getSearchedArtist(this.comboBoxModel).then((value) => {
        this.artists = value.data
        console.log(this.artists);
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
            console.log(vm.$refs.artistListComboBox);
            console.log("vm.comboBoxModel",vm.comboBoxModel);
            vm.searchArtists();
            }
        });
        },
        addCategoryArtist(){
            let t_name = typeof this.artist_obj;
            if(t_name == 'object') //if teacher exists then changing the value of teacher to username 
            {
                if(this.artist_obj.artist_name)
                this.category.name1 = this.artist_obj.artist_name
                else
                this.category.name1 = this.artist_obj.username

                this.category.guest1 = this.artist_obj.username
                this.category.country1 = this.artist_obj.country
                // this.category.photo1 = this.artist_obj.thumb
            }
            else
            {
                this.category.name1 = this.artist_obj
            }
        },
        addBattleArtists(){
            let t_name = typeof this.artist_obj;
            if(t_name == 'object') //if teacher exists then changing the value of teacher to username 
            {
                if(this.artist_obj.artist_name)
                this.judges.name = this.artist_obj.artist_name
                else
                this.judges.name = this.artist_obj.username

                this.judges.guest = this.artist_obj.username
                this.judges.country = this.artist_obj.country
                // this.category.photo1 = this.artist_obj.thumb
            }
            else
            {
                this.judges.name = this.artist_obj
            }
        },
        addArtist(){
            this.artistDialog = false;
            // if(this.category.name1){
            //     this.artistDialog = false;
            // }else{
            //     this.cat_valid_snackbar =true
            // }
        },
        addJudges(){
            console.log(this.battleJudges);
            if(this.battleJudges.length <7){if(this.judges.name){
                let clone = {...this.judges}
                this.battleJudges.push(clone)
                this.artist_obj = null
                this.artists = []
                this.judges.name = ''
                this.judges.guest = ''
                this.judges.info = ''
                this.judges.country =''
                this.judges.poster = ''
                this.judgesDialog = false;
            }else{
                console.log("add name");
                this.cat_valid_snackbar =true
            }}else{
                this.max_judges_snackbar = true
            }
        },
        addDj(){
            if(this.battleDj.length <2){
                if(this.judges.name){
                let clone = {...this.judges}
                this.battleDj.push(clone)
                console.log(this.battleDj);
                this.artist_obj = null
                this.artists = []
                this.judges.name = ''
                this.judges.guest = ''
                this.judges.info = ''
                this.judges.country =''
                this.judges.poster = ''
                this.djDialog = false;
            }else{
                this.cat_valid_snackbar =true
            }}else{
                this.max_dj_snackbar = true
            }
        },
        addEmcee(){
            if(this.battleEmcee.length <2){if(this.judges.name){
                let clone = {...this.judges}
                this.battleEmcee.push(clone)
                console.log(this.battleEmcee);
                this.artist_obj = null
                this.artists = []
                this.judges.name = ''
                this.judges.info = ''
                this.judges.country =''
                this.judges.guest = ''
                this.judges.poster = ''
                this.emceeDialog = false;
            }else{
                this.cat_valid_snackbar =true
            }}else{
                this.max_emcee_snackbar = true
            }
        },
        judgesDialogClose(){
            this.judgesDialog = false
            this.djDialog = false
            this.emceeDialog = false
            this.artistDialog = false
            this.artist_obj = null
            this.artists = []
            this.judges.name =''
            this.judges.guest = ''
            this.judges.poster =''
            this.judges.country =''
            this.judges.info =''
            //clear form
        },
        openCat(item){
            this.openCategoryItem = item
            this.open_category_dialog = true
        },
        removeCat(item){
            this.categories.splice(this.categories.findIndex(e => e.name === item.name && e.type === item.type),1);
            console.log(this.categories);
        },
        removeBatCat(item){
            this.battle_categories.splice(this.battle_categories.findIndex(e => e.name === item.name && e.type === item.type),1);
            console.log(this.battle_categories);
        },
        close_battle_dialog(){
            for (var key in this.battle_category) {
                this.battle_category[key] = '';
            }
            this.artist_obj= null
            this.battle_category.username = this.$store.state.auth.user.user.username
            this.battleEmcee =[];
            this.battleJudges=[];
            this.battleDj=[];
            this.battle_dialog=false;
        },
        close_category_dialog(){
            for (var key in this.category) {
                this.category[key] = '';
            }
            this.artist_obj= null
            this.otherArtist=[]
            this.category.username = this.$store.state.auth.user.user.username
            this.workshop_dialog=false;
            this.party_dialog=false;
            this.showcase_dialog=false;
            this.cypher_dialog=false;
            this.otherCategory_dialog=false;
        },
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
        addBattle(){
            if(this.battle_category.name){
                //add guest from this.battlejudges
                console.log("this.battleDj.length ",this.battleDj.length );
                if(this.battleDj.length != 0){
                    //from the battleDj array put the selected ones to the battle category json.
                    for(let i =0; i<this.battleDj.length;i++)
                    {
                        if(this.battle_category.djname1 == '')
                        {
                            this.battle_category.djname1 = this.battleDj[i].name;
                            this.battle_category.djinfo1 = this.battleDj[i].info;
                            this.battle_category.djphoto1 = this.battleDj[i].poster;
                            this.battle_category.dj1 = this.battleDj[i].guest;
                            this.battle_category.djcountry1 = this.battleDj[i].country;
                            // add tags -> this.battle_category.dj1
                        }else{
                            this.battle_category.djname2 = this.battleDj[i].name;
                            this.battle_category.djinfo2 = this.battleDj[i].info;
                            this.battle_category.djphotor2 = this.battleDj[i].poster;
                            this.battle_category.dj2 = this.battleDj[i].guest;
                            this.battle_category.djcountry2 = this.battleDj[i].country;
                        }
                        console.log(this.battleDj,this.battle_category);
                    }
                }
                if(this.battleEmcee.length != 0){
                    //from the battleEmcee array put the selected ones to the battle category json.
                    for(let i =0; i<this.battleEmcee.length;i++)
                    {
                        if(this.battle_category.mcname1 == '')
                        {
                            this.battle_category.mcname1 = this.battleEmcee[i].name;
                            this.battle_category.mcinfo1 = this.battleEmcee[i].info;
                            this.battle_category.mcphoto1 = this.battleEmcee[i].poster;
                            this.battle_category.mc1 = this.battleEmcee[i].guest;
                            this.battle_category.mccountry1 = this.battleEmcee[i].country;
                            // add tags -> this.battle_category.dj1
                        }else{
                            this.battle_category.mcname2 = this.battleEmcee[i].name;
                            this.battle_category.mcinfo2 = this.battleEmcee[i].info;
                            this.battle_category.mcphoto2 = this.battleEmcee[i].poster;
                            this.battle_category.mc2 = this.battleEmcee[i].guest;
                            this.battle_category.mccountry2 = this.battleEmcee[i].country;
                        }
                        console.log(this.battleEmcee,this.battle_category);
                    }
                }
                if(this.battleJudges.length != 0){
                    //from the battlejudges array put the selected ones to the battle category json.
                    for(let i =0; i<this.battleJudges.length;i++)
                    {
                        if(this.battle_category.name1 == '')
                        {
                            this.battle_category.name1 = this.battleJudges[i].name;
                            this.battle_category.info1 = this.battleJudges[i].info;
                            this.battle_category.photo1 = this.battleJudges[i].poster;
                            this.battle_category.guest1 = this.battleJudges[i].guest;
                            this.battle_category.country1 = this.battleJudges[i].country;
                            // add tags -> this.battle_category.dj1
                        }else if(this.battle_category.name2 == '')
                        {
                            this.battle_category.name2 = this.battleJudges[i].name;
                            this.battle_category.info2 = this.battleJudges[i].info;
                            this.battle_category.photo2 = this.battleJudges[i].poster;
                            this.battle_category.guest2 = this.battleJudges[i].guest;
                            this.battle_category.country2 = this.battleJudges[i].country;
                        }else if(this.battle_category.name3 == '')
                        {
                            this.battle_category.name3 = this.battleJudges[i].name;
                            this.battle_category.info3 = this.battleJudges[i].info;
                            this.battle_category.photo3 = this.battleJudges[i].poster;
                            this.battle_category.guest3 = this.battleJudges[i].guest;
                            this.battle_category.country3 = this.battleJudges[i].country;
                        }else if(this.battle_category.name4 == '')
                        {
                            this.battle_category.name4 = this.battleJudges[i].name;
                            this.battle_category.info4 = this.battleJudges[i].info;
                            this.battle_category.photo4 = this.battleJudges[i].poster;
                            this.battle_category.guest4 = this.battleJudges[i].guest;
                            this.battle_category.country4 = this.battleJudges[i].country;
                        }else if(this.battle_category.name5 == '')
                        {
                            this.battle_category.name5 = this.battleJudges[i].name;
                            this.battle_category.info5 = this.battleJudges[i].info;
                            this.battle_category.photo5 = this.battleJudges[i].poster;
                            this.battle_category.guest5 = this.battleJudges[i].guest;
                            this.battle_category.country5 = this.battleJudges[i].country;
                        }else if(this.battle_category.name6 == '')
                        {
                            this.battle_category.name6 = this.battleJudges[i].name;
                            this.battle_category.info6 = this.battleJudges[i].info;
                            this.battle_category.photo6 = this.battleJudges[i].poster;
                            this.battle_category.guest6 = this.battleJudges[i].guest;
                            this.battle_category.country6 = this.battleJudges[i].country;
                        }else if(this.battle_category.name7 == ''){
                            this.battle_category.name7 = this.battleJudges[i].name;
                            this.battle_category.info7 = this.battleJudges[i].info;
                            this.battle_category.photo7 = this.battleJudges[i].poster;
                            this.battle_category.guest7 = this.battleJudges[i].guest;
                            this.battle_category.country7 = this.battleJudges[i].country;
                        }
                        console.log(this.battleEmcee,this.battle_category);
                    }
                }
                let clone = {...this.battle_category}
                this.battle_categories.push(clone)
                this.close_battle_dialog()
                }
            else{
                this.cat_valid_snackbar = true
                console.log("add title");
            }
        },
        addWorkshop(){
            if(this.category.name){
                //1:workshop
                this.category.category = "1"
                let clone = {...this.category}
                this.categories.push(clone)
                this.close_category_dialog()
            }else this.cat_valid_snackbar = true
        },
        addShowcase(){
            if(this.category.name){
                this.category.category = "2"
                let clone = {...this.category}
                this.categories.push(clone)
                this.close_category_dialog()
            }else this.cat_valid_snackbar = true
        },
        addCypher(){
            if(this.category.name){
                this.category.category = "4"
                let clone = {...this.category}
                this.categories.push(clone)
                this.close_category_dialog()
                }else this.cat_valid_snackbar = true
        },
        addParty(){
            if(this.category.name){this.category.category = "3"
            let clone = {...this.category}
            this.categories.push(clone)
            this.close_category_dialog()}else this.cat_valid_snackbar = true
        },
        addOtherCategory(){
            if(this.category.name){this.category.category = "5"
            let clone = {...this.category}
            this.categories.push(clone)
            this.close_category_dialog()}else this.cat_valid_snackbar = true
        },
        checkLink(){
            let urlLink = this.event.link;
            if(urlLink){ //if link exists check if it's valid
                var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                let check = !!pattern.test(this.event.link);
                if(check){
                    let checkStartsHttp = urlLink.startsWith('http')
                    console.log( "checkStartsHttp", checkStartsHttp);
                    if(!checkStartsHttp)
                    {
                        console.log("doesn't start with http")
                        console.log("url",this.event.link);
                        this.event.link = 'http://'+ this.event.link
                        console.log("url",this.event.link);
                        this.linkError=``
                        //add http to url
                    }
                }
                else{
                    this.linkError=`Enter a valid URL.`
                }
            }
        },
        goback(){
            this.$store.dispatch("remove_editing_event_obj")
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
                case 4:
                    this.$refs.fileInput4.click()
                    break; 
                case 5:
                this.$refs.fileInput5.click()
                break; 
                default:
                    // code block
                }
        },
        removeImage(num){
            switch(num) {
                case 1:
                    {
                    this.event.poster = ""
                    break;}
                case 2:{
                    this.battle_category.poster =""
                    break;}
                case 3:{
                    this.category.poster =""
                    break;}
                case 4:{
                    this.judges.poster =""
                break;}
                case 5:{
                    this.category.photo1 =""
                break;}
                // case 3:
                //     {this.posterDataBattle = ""
                //     this.category.image =""
                //     break;}
                // case 4:
                //     {this.imageDataCypher = ""
                //     this.category.image =""
                //     break;}
                // case 5:
                //     {this.imageDataShowcase = ""
                //     this.category.image =""
                //     break;}
                // case 6:
                //     {this.imageDataparty= ""
                //     this.category.image =""
                //     break;}
                // case 7:
                //     {this.imageDataOther = ""
                //     this.category.image =""
                //     break;}
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
                this.judges.poster = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.judges.poster = files[0];
            }
        },
        onFileChange5(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                this.category.photo1 = e.target.result;
            }
            fileReader.readAsDataURL(files[0]);
            this.category.photo1 = files[0];
            }
        },
        dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
            u8arr[n] = bstr.charCodeAt(n);
            }
        return new File([u8arr], filename, {type:mime});
        },
        async submit(){
            try{
                // this.event.username= this.$store.state.auth.user.user.username
                if(this.event.name != "" && this.event.poster != "" && this.event.start_date != "" && this.event.country != "")
                { 
                this.progressbar =true
                // console.log(this.event.poster);
                this.event.poster = await this.putImage(this.event.poster);
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
                };
                let formData = new FormData();
                for (let data in this.event) {
                    formData.append(data, this.event[data]);
                }
                let resp = await this.$axios.$post("/v1/events/create/", formData, config)
                console.log("event created response",resp);
                // if categories are added
                if(this.battle_categories.length >0){
                console.log("battle posts");
                //add event object to all categories
                this.battle_categories.forEach(category => category.event = resp.uuid);
                //put all images inside battle category in s3 bucket..
                for (const item of this.battle_categories) {
                    console.log("of",item);
                    if(item.poster){
                        item.poster = await this.putImage(item.poster)
                        console.log("item.poster",item.poster);
                    }
                    if(item.photo1){
                        item.photo1 = await this.putImage(item.photo1)
                        console.log("item.photo1",item.photo1);
                    }
                    if(item.photo2){
                        item.photo2 = await this.putImage(item.photo2)
                        console.log("item.photo2", item.photo2);
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
                    if(item.mcphoto1){
                        item.mcphoto1 = await this.putImage(item.mcphoto1)
                    }
                    if(item.mcphoto2){
                        item.mcphoto2 = await this.putImage(item.mcphoto2)
                    }
                    console.log("done",this.battle_categories);
                }
                // battle json readayyy

                console.log("this.battle_categories ready to be uploaded??",this.battle_categories);
                let formData2 = new FormData();
                for (let data of this.battle_categories) {
                    for (let data2 in data) {
                        formData2.append(data2, data[data2]);
                    }
                    try {
                        let postBattle = await this.$axios.$post("/v1/events/battles/create/", formData2, config)
                        console.log("battle posted",postBattle);
                    } catch (error) {
                        console.log(error.response);
                    }
                }
                }
                if(this.categories.length >0)
                {
                    console.log("categories posts");
                //add event object to all categories
                this.categories.forEach(category => category.event = resp.uuid);
                //put all images inside category in s3 bucket..
                for (const item of this.categories) {
                    if(item.poster){
                        item.poster = await this.putImage(item.poster)
                        console.log("item.poster",item.poster);
                    }
                    if(item.photo1){
                        item.photo1 = await this.putImage(item.photo1)
                        console.log("item.photo1",item.photo1);
                    }
                    console.log("done",this.categories);
                }
                // battle json readayyy

                console.log("this.battle_categories ready to be uploaded??",this.categories);
                let formData2 = new FormData();
                for (let data of this.categories) {
                    for (let data2 in data) {
                        formData2.append(data2, data[data2]);
                    }
                    try {
                        let postCategory= await this.$axios.$post("/v1/events/workshops/create/", formData2, config)
                        console.log("categories posted",postCategory);
                    } catch (error) {
                        console.log(error.response);
                    }
                }
                }
                this.progressbar =false;
                this.posted_snackbar = true;
                this.$router.push("/events/"+resp.uuid);
                }
                else{
                    this.valid_snackbar =true
                }
            }
            catch(e){
                console.log(e);
            }
        },
        async putImage(image){
            let fileData = this.dataURLtoFile(image, "coverimage.png");
            let res = await this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1")
            delete this.$axios.defaults.headers.common['Authorization']
            let filename = res.key
            let url = res.body
            url = url.slice(1, -1);
            let put = await this.$axios.$put(url, fileData)
            return "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
        },
        async update(){
            try{
                // this.event.username= this.$store.state.auth.user.user.username
                if(this.event.name != "" && this.event.poster != "" && this.event.start_date != "" && this.event.country != "")
                { 
                this.progressbar =true
                // console.log(this.event.poster);
                if(this.event.poster == 'object')
                this.event.poster = await this.putImage(this.event.poster).then(res=>
                {this.formUpdate();})
                else
                this.formUpdate();
                }
            }
            catch(e){
                console.log(e);
            }
            // let ids = new Set(this.editing_event_obj.event_battles.map(({ uuid }) => uuid));
            // let ids2 = new Set(this.battle_categories.map(({ uuid }) => uuid));
            // //remove ids value if ids value matches ids2
            // ids2.forEach((x) => {
            //     ids.delete(x);
            // });
            // console.log( ids);
        },
        async formUpdate(){
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
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
            try {
                for(var i=0; i<keyObj1.length; i++) { 
                if(keyObj1[i] == keyObj2[i] && valueObj1[i] == valueObj2[i]) { 
                    console.log(" value not changed for: ",keyObj1[i]+' -> '+valueObj2[i]);	 
                } 
                else { 
                    // it prints keys have different values 
                    if(!keyObj1[i]=='event_battles' && !keyObj1[i]=='event_subevents'){
                        let formName = new FormData();
                        formName.append(keyObj1[i], valueObj2[i]);
                        formName.append("id", this.journey['id']);

                        console.log("key obj1: "+keyObj1[i]+"\nkeyobj2: "+keyObj2[i]+'\n myObj1 value: '+ valueObj1[i] + '\nmyObj2 value: '+ valueObj2[i] +'\n');
                        await this.$axios.$patch("/v1/events/battles/"+this.event.id, formName, config).then(res => {
                        console.log( valueObj2[i] ,res," changed"); 
                    })}
                } 
            }
            this.$store.dispatch("remove_editing_event_obj");
            this.progressbar =false
            this.posted_snackbar = true;
            // this.refresh();
            } catch (error) {
                console.log("error",error);
                this.error_snackbar =true
                this.progressbar =false
            }
            this.$router.push("/events/"+this.event.uuid);
            
        },
    },
    middleware : 'check_auth',
    }
</script>
<style scoped>
div .hover:hover {
  background: #E0E0E0;
}
</style>