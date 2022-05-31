<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:4px;"
      data-view
      :to="'/whatiscooking/'+cook.uuid" 
      :elevation="hover ? 12 : 0"
      outlined
      width="215" 
      max-height="205"
    >
    <v-img v-if="cook.thumbjs"
        :src="cook.thumbjs"
        height="134"
        width="215"
      />
      <v-img v-else
        :src="require('@/assets/gebbleslogo3.png')"
        contain
        height="134"
        width="215"
      />
      <v-card-actions style="min-height:36px;" class="pa-1">
        <div width="90" class="text-decoration-none caption" style=" height: 1.7em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:134px; font-size:0.8rem!important;">{{cook.username}} </p>
        </div>
        <v-spacer></v-spacer>
        <template v-if="cook.taggedteachers.length <3">
         <div v-for="obj in cook.taggedteachers" :key="obj.id" class="text-decoration-none" style="margin-top:-1px">
              <v-avatar left v-if="obj.shareidobj && obj.shareidobj.teacher!=null" size="21">
                <v-img :src="obj.shareidobj.teacher.artist_metadata.thumb"></v-img>
              </v-avatar>
              <v-avatar left v-else color="white" size="21">
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
          </div>
        </template>
        <template v-else>
         <div v-for="obj in cook.taggedteachers.slice(0, 2)" :key="obj.id" class="text-decoration-none" style="margin-top:-1px">
           {{obj}}
              <v-avatar left v-if="obj.shareidobj && obj.shareidobj.teacher!=null" size="21">
                <v-img :src="obj.shareidobj.teacher.artist_metadata.thumb"></v-img>
              </v-avatar>
              <v-avatar left v-else color="white" size="21">
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
          </div><p class="mb-1 pt-1 pl-1" style="font-size:0.9rem!important;">+{{cook.taggedteachers.length-2}}</p>
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

