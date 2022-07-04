<template>
<v-app>
    <v-container class="ma-24" style="max-width:520px;">
        <div>
            <v-btn icon class="elevation-0 white text-decoration-none float-left" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </div>
        <v-row >
        <v-col class="pa-0">
             <h2 class="my-8" align="center" justify="center">About the event</h2>
            <v-stepper v-model="e6" vertical>
                <v-stepper-step :complete="e6 > 1" step="1" @click.native="e6 = 1" style="cursor:pointer">
                Event poster* 
                <!-- <small>Summarize if needed</small> -->
                </v-stepper-step>
                <v-stepper-content step="1" width="100%" class="ma-0"> 
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
                <v-img v-if="typeof(event.poster) === 'string'" :src="event.poster" class="mx-auto" height="auto" width="352px" contain>
                    <v-btn style="background:white" icon small class="float-right ma-1" @click="removeImage(1)">
                    <v-icon color="black" small>mdi-close</v-icon>
                    </v-btn>
                </v-img>
                </div>
                </div>
                <v-btn color="black" text small outlined @click="e6 = 2">Next</v-btn>
                <v-btn text @click="goback" small color="primary">Cancel</v-btn>
                </v-stepper-content>
        
                <v-stepper-step :complete="e6 > 2" step="2" @click.native="e6 = 2" style="cursor:pointer">Event details*</v-stepper-step>
                <v-stepper-content step="2" class="ma-0">
                    <v-text-field
                        v-model = "event.name"
                        label= "Event name*"
                        :rules="[() => !!event.name || 'This field is required']"
                        :maxlength="255">
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
                        v-model = "event.venue"
                        label= "Event venue"
                        :maxlength="255">
                    </v-text-field>
                    <v-text-field
                        v-model = "event.city"
                        label= "City"
                        :maxlength="50">
                    </v-text-field>
                    <v-select label="Country" v-model= "event.country"
                        :items="countries"
                        item-text="name"
                        item-value="code"
                        required
                    ></v-select>
                    <v-textarea
                        v-model = "event.about"
                        label= "About the event">
                    </v-textarea>
                    <v-text-field
                        :error-messages="linkError"
                        v-model = "event.videolink"
                        label= "Youtube video link"
                        @change="checkLink">
                    </v-text-field>
                    <v-text-field
                        :error-messages="linkError"
                        v-model = "event.link"
                        label= "Add a link"
                        @change="checkLink">
                    </v-text-field>
                    <v-btn color="black" text small outlined @click="e6 = 3">Next</v-btn>
                    <v-btn color="error" text small @click="e6 = 1">Previous</v-btn>
                    <v-btn text @click="goback" small color="primary">Cancel</v-btn>
                </v-stepper-content>
        
                <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3" style="cursor:pointer">Add categories</v-stepper-step>
                <v-stepper-content step="3" class="ma-0">
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
                            <div style="width:100px; height: 100px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1" @click="competition_dialog = true">
                                <template class="pa-7"> <h5 class="font-weight-light py-10 px-2">Competition</h5></template >
                            </div>
                        </v-col>
                        <v-col >
                            <div style="width:100px; height: 100px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1" @click="otherCategory_dialog = true">
                                <template class="pa-7"> <h5 class="font-weight-light py-10 px-8">Other</h5></template >
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
                            <div style="width:250px; height: 50px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 mx-auto" @click="competition_dialog = true">
                                <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Competition</h5></center >
                            </div>
                        </v-col>
                        <v-col class="pa-0" cols="12">
                            <div style="width:250px; height: 50px; background: #F0F0F0; border-radius:10px; cursor:pointer;" class="my-1 mx-auto" @click="otherCategory_dialog = true">
                                <center class="pa-2"> <h5 class="font-weight-light py-2 px-16">Other</h5></center >
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0">
                        <v-list two-line style="width:100%;">
                                <template v-for="(item, index) in this.categories">
                                <v-list-item
                                    :key="index">
                                    <template @click="openCat(item)">
                                    <v-list-item-avatar v-if="item.poster" size="30">
                                    <v-img :src="item.poster"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-avatar v-else-if="item.type == 'workshop'" color="yellow" size="30">
                                    </v-list-item-avatar>
                                    <v-list-item-avatar v-else-if="item.type == 'battle'" color="red" size="30">
                                    </v-list-item-avatar>
                                    <v-list-item-avatar v-else-if="item.type == 'cypher'" color="green" size="30">
                                    </v-list-item-avatar>
                                    <v-list-item-avatar v-else-if="item.type == 'showcase'" color="blue" size="30">
                                    </v-list-item-avatar>
                                    <v-list-item-avatar v-else-if="item.type == 'competition'" color="purple" size="30">
                                    </v-list-item-avatar>
                                    <v-list-item-avatar v-else-if="item.type == 'other'" color="black" size="30">
                                    </v-list-item-avatar>
                                    <v-list-item-content @click="openCat(item)">
                                    <v-list-item-title v-html="item.name"></v-list-item-title>
                                    <v-list-item-subtitle class="caption" v-html="item.about"></v-list-item-subtitle>
                                    </v-list-item-content>
                                    </template>
                                    <v-spacer></v-spacer>
                                    <v-btn icon color="error" @click="removeCat(item)">
                                    <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-list-item>
                                </template>
                            </v-list>
                        <!-- <v-col cols="4" v-for="category in this.categories"  :key ="category.index">
                            <category-card :category="category"></category-card>
                        </v-col> -->
                    </v-row>
                    <v-btn v-if="!editing_obj" outlined small class="text-decoration-none"  color="black"
                    @click="submit" :loading="progressbar" >Submit</v-btn>
                    <v-btn v-else outlined small class="text-decoration-none"  color="black"
                    @click="update" :loading="progressbar" >Update</v-btn>
                    <v-btn color="error" small text @click="e6 = 2">Previous</v-btn>
                    <v-btn text small @click="goback" color="primary">Cancel</v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-col>
        </v-row>
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
            :maxlength="50">
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
        ref="menu"
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
          @click:minute="$refs.menu.save(battle_category.date_time)"
        ></v-time-picker>
      </v-menu>
        <v-text-field
            v-model = "battle_category.venue"
            label= "Venue"
            :maxlength="50">
        </v-text-field>
        <v-text-field
            v-model = "battle_category.mc"
            label= "Emcee"
            :maxlength="250">
        </v-text-field>
        <v-text-field
            v-model = "battle_category.dj"
            label= "DJ"
            :maxlength="50">
        </v-text-field>
        <v-text-field @click="judgesDialog = true"
            label= "Judges"
            :maxlength="0"
            >
        </v-text-field>
        <!-- <div v-for="obj in battleJudges" :key="obj.id"  class="text-decoration-none"> -->
          <v-chip v-for="obj in battleJudges" :key="obj.id"  color="black grey" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="obj.poster">
              <v-img :src="obj.poster"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{obj.name}}
          </v-chip>
        <!-- </div> -->
        <v-text-field
            v-model = "battle_category.about"
            label= "About"
            :maxlength="250">
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
            :maxlength="50">
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
        <v-text-field
            v-model = "category.venue"
            label= "Venue"
            :maxlength="50">
        </v-text-field>
        <v-text-field
            v-model = "category.artist"
            label= "Artist"
            :maxlength="250">
        </v-text-field>
        <v-text-field
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field>
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addWorkshop()" >Add</v-btn>
        </v-container>
        </v-dialog> 
        <v-dialog
        :retain-focus="false"
        v-model="competition_dialog"
        width="480px" 
        persistent>
        <v-container class="rounded-lg white" :class="{'pa-4': $vuetify.breakpoint.smAndDown  ,'pa-8': $vuetify.breakpoint.mdAndUp}">
        <v-btn icon color="error" class="float-right" @click="close_category_dialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3>Add Competition</h3>
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
            :maxlength="50">
        </v-text-field>
        <v-menu
            ref="menu3"
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
                @change="save(category.date,4)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "category.venue"
            label= "Venue"
            :maxlength="50">
        </v-text-field>
        <v-text-field
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field>
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addCompetition()" >Add</v-btn>
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
            :maxlength="50">
        </v-text-field>
        <v-menu
            ref="menu4"
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
                @change="save(category.date,5)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "category.venue"
            label= "Venue"
            :maxlength="50">
        </v-text-field>
        <v-text-field
            v-model = "category.artist"
            label= "Artist"
            :maxlength="250">
        </v-text-field>
        <v-text-field
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field>
        
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
            :maxlength="50">
        </v-text-field>
        <v-menu
            ref="menu5"
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
                @change="save(category.date, 6)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "category.venue"
            label= "Venue"
            :maxlength="50">
        </v-text-field>
        <v-text-field
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field>
        
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
        <h3>Add Category</h3>
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
            :maxlength="50">
        </v-text-field>
        <v-menu
            ref="menu6"
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
                @change="save(category.date, 7)"
                ></v-date-picker>
        </v-menu>
        <v-text-field
            v-model = "category.venue"
            label= "Venue"
            :maxlength="50">
        </v-text-field>
        <v-text-field
            v-model = "category.artist"
            label= "Artist"
            :maxlength="250">
        </v-text-field>
        <v-text-field
            v-model = "category.about"
            label= "About"
            :maxlength="250">
        </v-text-field>
        
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
        <v-btn icon color="error" class="float-right" @click="open_category_dialog = false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3 class="font-weight-light">{{openCategoryItem.type}}</h3>
        <v-img v-if="typeof(openCategoryItem.poster) === 'string'" :src="openCategoryItem.poster" class="mx-auto my-6" height="auto" width="352px" contain>
        </v-img>
        <h3  class="font-weight-light">{{openCategoryItem.name}}</h3>
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
            :maxlength="50">
        </v-text-field>
        <v-text-field
            v-model = "judges.info"
            label= "Info"
            :maxlength="250">
        </v-text-field>
        
        <v-btn outlined small class="text-decoration-none"  color="black"
          @click="addJudges()" >Add</v-btn>
        </v-container>
        </v-dialog>
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
            Title is required.
        </v-snackbar>
    </v-container>
</v-app>
</template>
<script>
import { Slider, SliderItem } from "vue-easy-slider";
import { mapGetters } from 'vuex'
import CountryFlag from 'vue-country-flag'
import CategoryCard from '@/components/CategoryCard.vue'
import Vue from "vue";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import check_auth from '~/middleware/check_auth';
Vue.use(Croppa);
export default {
    middleware : 'check_auth',
    components: {
        Slider,
        SliderItem,
        CountryFlag,
        CategoryCard
    },
    created (){
        if(this.$store.state.editing_obj)
        {
            this.event = Object.assign({}, this.$store.getters.editing_obj);
        }
    },
    computed: {
        ...mapGetters(['editing_obj'])
    },
    data(){
        return {
            event: {
                username: null,
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
                event:'', // # must
                type:'battle',
                poster:'',
                name:'', // # must
                dj:'',
                mc:'',
                judges:'',
                date:'',
                date_time:'',
                venue:'',
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
            category:{
                event:'', // # must
                category:'',
                poster:'',
                name:'', // # must
                event:'',
                artist:'',
                judges:'',
                date:'',
                date_time:'',
                venue:'',
                about:'',
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
            },
            judges:{
                guest:'',
                name:'',
                poster:'',
                info:'',
            },
            categories:[],
            battleJudges:[],
            judgesDialog: false,
            activePicker: null,
            menu: false,
            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            menu5: false,
            menu6: false,
            menutime: false,
            competition_dialog:false,
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
            competition:'purple',
            cypher:'green',
            showcase:'blue',
            other:'black',
            cat_valid_snackbar:false,
        }
    },
    watch: {
        menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    methods: {
        addJudges(){
            if(this.judges.name){
                if(this.battle_category.guest1==''){
                    this.battle_category.guest1 = this.judges.name;
                    this.battle_category.info1 = this.judges.info;
                    this.battle_category.photo1 = this.judges.poster;
                }else if(this.battle_category.guest2==''){
                    this.battle_category.guest2 = this.judges.name;
                    this.battle_category.info2 = this.judges.info;
                    this.battle_category.photo2 = this.judges.poster;
                }else if(this.battle_category.guest3==''){
                    this.battle_category.guest3 = this.judges.name;
                    this.battle_category.info3 = this.judges.info;
                    this.battle_category.photo3 = this.judges.poster;
                }else if(this.battle_category.guest4==''){
                    this.battle_category.guest4 = this.judges.name;
                    this.battle_category.info4 = this.judges.info;
                    this.battle_category.photo4 = this.judges.poster;
                }else if(this.battle_category.guest5==''){
                    this.battle_category.guest5 = this.judges.name;
                    this.battle_category.info5 = this.judges.info;
                    this.battle_category.photo5 = this.judges.poster;
                }else if(this.battle_category.guest6==''){
                    this.battle_category.guest6 = this.judges.name;
                    this.battle_category.info6 = this.judges.info;
                    this.battle_category.photo6 = this.judges.poster;
                }else if(this.battle_category.guest7==''){
                    this.battle_category.guest7 = this.judges.name;
                    this.battle_category.info7 = this.judges.info;
                    this.battle_category.photo7 = this.judges.poster;
                }else{
                    console.log("once 7 guests allowed");
                }
                let clone = {...this.judges}
                this.battleJudges.push(clone)
                this.judges.name = ''
                this.judges.info = ''
                this.judges.poster = ''
                this.judgesDialog = false;
            }else{
                console.log("add name");
            }
            console.log(this.battle_category);
        },
        judgesDialogClose(){
            this.judgesDialog = false
            console.log("add to array");
            // add the judges info from here to array where it belongs
        },
        openCat(item){
            this.openCategoryItem = item
            this.open_category_dialog = true
        },
        removeCat(item){
            this.categories.splice(this.categories.findIndex(e => e.name === item.name && e.type === item.type),1);
            console.log(this.categories);
        },
        close_battle_dialog(){
            for (var key in this.battle_category) {
                this.battle_category[key] = '';
            }
            console.log(this.battle_category);
            this.battle_dialog=false;
        },
        close_category_dialog(){
            for (var key in this.category) {
                this.category[key] = '';
            }
            this.workshop_dialog=false;
            this.competition_dialog=false;
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
                this.battle_category.type = "battle";
                let clone = {...this.battle_category}
                this.categories.push(clone)
                this.close_battle_dialog()}
            else{
                this.cat_valid_snackbar = true
                console.log("add title");
            }
        },
        addWorkshop(){
            if(this.category.name){this.category.type = "workshop"
            let clone = {...this.category}
            this.categories.push(clone)
            this.close_category_dialog()}else this.cat_valid_snackbar = true
        },
        addShowcase(){
            if(this.category.name){this.category.type = "showcase"
            let clone = {...this.category}
            this.categories.push(clone)
            this.close_category_dialog()}else this.cat_valid_snackbar = true
        },
        addCypher(){
            if(this.category.name){this.category.type = "cypher"
            let clone = {...this.category}
            this.categories.push(clone)
            this.close_category_dialog()}else this.cat_valid_snackbar = true
        },
        addCompetition(){
            if(this.category.name){this.category.type = "competition"
            let clone = {...this.category}
            this.categories.push(clone)
            this.close_category_dialog()}else this.cat_valid_snackbar = true
        },
        addOtherCategory(){
            if(this.category.name){this.category.type = "other"
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
                case 4:
                    this.$refs.fileInput4.click()
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
                //     {this.imageDataCompetition= ""
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
        dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
            u8arr[n] = bstr.charCodeAt(n);
            }
        return new File([u8arr], filename, {type:mime});
        },
        async submit(){
            // console.log(this.event.poster);
            this.event.username= this.$store.state.auth.user.user.username
            if(this.event.name != "" && this.event.poster != "" && this.event.start_date != "" && this.event.country != "")
            { 
            this.progressbar =true
            let fileData = this.dataURLtoFile(this.event.poster, "coverimage.png");
            console.log("uploading");
            let res = await this.$axios.$get("https://67s4bhk8w1.execute-api.us-east-2.amazonaws.com/v1/v1");
            if(res.statusCode == 200)
            {
                console.log("uploading");
                delete this.$axios.defaults.headers.common['Authorization']
                let filename = res.key
                let url = res.body
                console.log(res);
                url = url.slice(1, -1);
                this.$axios.$put(url, fileData).then((value) => {
                this.event.poster = "https://mediumthumbnails.s3.us-east-2.amazonaws.com/" + filename;
                console.log("uploaded");
                console.log(this.event.poster);
                const config = {
                    headers: {"content-type": "multipart/form-data",
                        "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
                };
                let formData = new FormData();
                for (let data in this.event) {
                    formData.append(data, this.event[data]);
                    console.log(this.event[data]);
                }
                console.log(this.event);
                try {
                    this.$axios.$post("/v1/events/create/", formData, config).then(res =>{
                    console.log(res);
                    this.progressbar =false;
                    this.posted_snackbar = true;
                    this.$router.push("/events/"+res.uuid);
                    }).then( res =>
                        {
                            console.log("battle posts", res);}

                    )
                } catch (e) {
                    console.log("err ");
                    this.progressbar = false;
                    this.error_snackbar =true
                    console.log(e.response);}
                }) 
            }
            }
            else{
                this.valid_snackbar =true
            }
        },
        async update() {
            if(this.event.name != "" && this.event.poster)
            {this.progressbar =true;
            const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                }
            };
            let myObj1 = this.editing_obj 
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
                    // console.log(" value not changed for: ",keyObj1[i]+' -> '+valueObj2[i]);	 
                } 
                else { 
                    // it prints keys have different values 
                    let formName = new FormData();
                    formName.append(keyObj1[i], valueObj2[i]);
                    formName.append("id", this.event['id']);

                    console.log("key obj1: "+keyObj1[i]+"\nkeyobj2: "+keyObj2[i]+'\n myObj1 value: '+ valueObj1[i] + '\nmyObj2 value: '+ valueObj2[i] +'\n');
                    await this.$axios.$patch("/v1/artist/event/"+this.editing_obj.id, formName, config).then(res => {
                        console.log( valueObj2[i] ,res," changed"); 
                        // this.$store.dispatch("check_user_event");
                    })
                } 
            }
            this.$store.dispatch("remove_editing_obj");
            this.progressbar =false
            this.posted_snackbar = true;
            } catch (error) {
                console.log("error",error);
                this.error_snackbar =true
                this.progressbar =false
            }
            this.$router.push("/"+this.$store.state.auth.user.user.username+"/event");}
            else{
                this.valid_snackbar=true
            }
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