<template>
    <v-form ref="guest_form">
        <div v-if="!winner.photo" @click="onPick()" style="cursor:pointer; max-width:274px;" class=" mx-auto my-2 rounded-lg grey_background" >
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
        <v-img v-if="typeof(winner.photo) === 'string'" :src="winner.photo" class="mx-auto" height="300" width="352px" contain>
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
                @click:close="artist_obj = null; winner.guest = ''; guest_error=''"
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
            v-model= "winner.name"
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
        v-model = "winner.country"
        label= "Country"
        >
        </v-autocomplete>
        <v-textarea
            prepend-icon="mdi-information-outline"
            v-model = "winner.info"
            label= "Info">
        </v-textarea>
        <v-btn outlined small class="text-decoration-none"  color="black"
        @click="addWinner()" :loading="winner_progressbar">Add winner</v-btn>
    </v-form>
</template>