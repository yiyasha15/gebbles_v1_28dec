<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      :to="'/whatiscooking/'+cook.id" 
      :elevation="hover ? 12 : 0"
      outlined
      width="115" 
      max-height="105"
    >
    <v-img v-if="cook.taggedteachers.s_photo"
        :src="cook.taggedteachers.s_photo"
        contain
        height="73"
        width="115"
      />
      <v-img v-else
        :src="require('@/assets/gebbleslogo3.png')"
        contain
        height="73"
        width="115"
      />
      <v-card-actions height="32px">
        <div width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:78px; font-size:0.6rem!important;">{{cook.username}} </p>
        </div>
        <v-spacer></v-spacer>
        <template v-if="cook.taggedteachers.length <4">
         <div v-for="obj in cook.taggedteachers" :key="obj.id" class="text-decoration-none">
              <v-avatar left v-if="obj.shareidobj.teacher" size="16">
                <v-img :src="obj.shareidobj.teacher.artist_metadata.thumb"></v-img>
              </v-avatar>
              <v-avatar left v-else color="white" size="16">
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
          </div>
        </template>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
    export default {
        head() {  
        return {
            title: "What's cookin",
            }
        },
        name: 'CookingCard',
        props: {
            cook: Object
        },
    }
</script>

