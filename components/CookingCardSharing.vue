<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      :to="'/whatiscooking/'+cook.cookingidobj.uuid" 
      :elevation="hover ? 12 : 0"
      outlined
      width="115" 
      max-height="105"
    >
    <v-img v-if="cook.cookingidobj.thumbjs"
        :src="cook.cookingidobj.thumbjs"
        height="74"
        width="115"
      />
      <v-img v-else
        :src="require('@/assets/gebbleslogo3.png')"
        contain
        height="74"
        width="115"
      />
      <v-card-actions style="min-height:36px;" class="pa-1">
        <div width="70" class="text-decoration-none caption" style=" height: 1.3em;
          line-height: initial;
          overflow: hidden">
        <p style="max-width:78px; font-size:0.6rem!important;">{{cook.cookingidobj.username}} </p>
        </div>
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

