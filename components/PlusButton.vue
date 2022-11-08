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
            :to="'/create/journey'"
            class="text-decoration-none pl-6 pr-12"
            ><v-icon color="primary" class="pr-2">mdi-book-heart-outline</v-icon>
            
            <v-list-item-title>Share your journey</v-list-item-title>
            </v-list-item>
            <v-list-item
            :to="'/create/uploadvideo'"
            class="text-decoration-none pl-6 pr-12"
            ><v-icon color="primary" class="pr-2">mdi-play-circle-outline</v-icon>
            <v-list-item-title>Upload a video</v-list-item-title>
            </v-list-item>
            <v-list-item
            :to="'/create/each1teach1'"
            class="text-decoration-none pl-6 pr-12"
            >
            <v-icon color="primary" class="pr-2">mdi-all-inclusive</v-icon>
            <v-list-item-title>Give a shoutout </v-list-item-title>
            </v-list-item>
            <v-list-item
            :to="'/create/event'"
            class="text-decoration-none pl-6 pr-12"
            ><v-icon color="primary" class="pr-2">mdi-calendar-heart</v-icon>
            <v-list-item-title>Create an event</v-list-item-title>
            </v-list-item>
            <v-list-item
            :to="'/create/workshop'"
            class="text-decoration-none pl-6 pr-12"
            ><v-icon color="primary" class="pr-2">mdi-leaf-circle-outline</v-icon>
            <v-list-item-title>Create a workshop</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>