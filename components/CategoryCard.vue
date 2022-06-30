<template>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      @click="opendialog"
      :elevation="hover ? 12 : 0"
      outlined
      width="100" 
      max-height="100"
    >
      <v-img
        v-if = category.image :src = "category.image" 
        height="100"
        width="100"
      />
      <div v-else
        height="100"
        width="100">
        <h5 class="font-weight-light">{{category.title}}</h5>
      </div>
    </v-card>
  </v-hover>
</template>
<script>
    export default {
      head() {  //head function (a property of vue-meta), returns an object
      return {
          title: 'events categories',
          }
      },
      name: 'CategoryCard',
      props: {
        category: Object
      },
      methods:{
          opendialog(){
              console.log("open", this.category);
          }
      }
      }
</script>

