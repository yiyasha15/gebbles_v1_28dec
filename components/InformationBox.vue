<template>
    <v-container>
        <v-row>
            <!-- <v-col cols="12">
                <v-card class="pa-4 secondary" rounded @click="'loggedInUser.username'+'/journey'">
                    <center><img src = "~/assets/journey.png" width="200px" alt="journey logo"/></center>
                </v-card>
            </v-col> -->
            <v-col cols="6">
                <v-card class="mx-0 mx-sm-14 text-center py-7" height="80px">
                    <v-icon>mdi-notebook-edit-outline</v-icon> <p class="d-inline ">Learning</p>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card class="mx-0 mx-sm-14 text-center py-7" height="80px">
                    <v-icon>mdi-all-inclusive</v-icon> 
                    <p class="d-inline">Sharing</p>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="pa-4">
                    <v-icon>mdi-card-account-details-outline</v-icon> <p class="d-inline ">Invited</p>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="pa-4">
                    <v-icon>mdi-hand-peace</v-icon> <p class="d-inline ">Attending</p>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="pa-4">
                    <v-icon>mdi-pin-outline</v-icon> <p class="d-inline ">Organised</p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
    computed:{
    ...mapGetters(['loggedInUser'])
}
}
</script>