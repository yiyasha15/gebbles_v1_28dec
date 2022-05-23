<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:4px;"
      data-view
      :to="'/whatiscooking/'+cook.cookingidobj.uuid" 
      :elevation="hover ? 12 : 0"
      outlined
      width="215" 
      max-height="205"
    >
    <v-img v-if="cook.cookingidobj.thumbjs"
        :src="cook.cookingidobj.thumbjs"
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
        <p style="max-width:134px; font-size:0.8rem!important;">{{cook.cookingidobj.username}} </p>
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

