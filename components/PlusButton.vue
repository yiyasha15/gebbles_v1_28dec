<template>
    <v-menu transition="slide-y-transition" offset-y bottom left>
        <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" class=" mr-sm-2 mr-md-3 mx-1"
        v-on="on">
        <v-icon size="26" color="black">mdi-plus-circle-outline</v-icon>
        </div>
        </template>
        <v-list>
            <v-list-item
            :to="'/create/uploadvideo'"
            class="text-decoration-none pl-6 pr-12"
            ><v-icon color="black" class="pr-2">mdi-upload</v-icon>
            <v-list-item-title>Upload a video</v-list-item-title>
            </v-list-item>
            <v-list-item
            :to="'/create/journey'"
            class="text-decoration-none pl-6 pr-12"
            ><v-icon color="black" class="pr-2">mdi-chart-line-variant</v-icon>
            
            <v-list-item-title>Share journey</v-list-item-title>
            </v-list-item>
            <v-list-item
            :to="'/create/each1teach1'"
            class="text-decoration-none pl-6 pr-12"
            >
            <v-icon color="black" class="pr-2">mdi-infinity</v-icon>
            <v-list-item-title>Give a shoutout </v-list-item-title>
            </v-list-item>
            <v-list-item
            :to="'/create/event'"
            class="text-decoration-none pl-6 pr-12"
            ><v-icon color="black" class="pr-2">mdi-google-circles-communities</v-icon>
            <v-list-item-title>Create your event</v-list-item-title>
            </v-list-item>
            <v-list-item
            :to="'/create/workshop'"
            class="text-decoration-none pl-6 pr-12"
            ><v-icon color="black" class="pr-2">mdi-leaf-circle-outline</v-icon>
            <v-list-item-title>Create a workshop</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>