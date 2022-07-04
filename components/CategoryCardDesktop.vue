<template>
<div>
  <v-hover v-slot:default="{ hover }">
    <v-card style="margin:2px;"
      data-view
      @click="opendialog"
      :elevation="hover ? 12 : 0"
      outlined
      width="200" 
      height="200"
      class="pa-2"
    >
      <v-img
        v-if = category.poster :src = "category.poster" 
        height="100"
        width="100"
      />
      <div v-else class="text-center py-14"
        height="100"
        width="100">
        <h3 class="font-weight-light">{{category.name}}</h3>
        <h6 class="caption">{{category.date}}</h6>
      </div>
    </v-card>
  </v-hover>
  <v-dialog
        :retain-focus="false"
        v-model="dialog"
        width="800px"
        persistent>
        <v-container class="rounded-lg white pa-2">
        <v-btn icon color="error" class="float-right" @click="dialog=false; ">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <h3 class="font-weight-light">{{category.name}}</h3>
        {{category}}
        </v-container>
    </v-dialog>  
</div>
</template>
<script>
    export default {
      head() {  //head function (a property of vue-meta), returns an object
      return {
          title: 'events categories',
          }
      },
      name: 'CategoryCardDesktop',
      props: {
        category: Object
      },
      data(){
        return{
          dialog: false
        }
      },
      methods:{
          opendialog(){
            this.dialog = true
              console.log("ope1n", this.category);
          }
      }
      }
</script>

