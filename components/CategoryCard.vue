<template>
<div>
  <v-hover v-slot:default="{ hover }">
    <v-card 
      data-view
      @click="opendialog"
      :elevation="hover ? 12 : 0"
      outlined
      width=95%
      height="300"
      class="pa-0 mx-auto"
    >
      <v-img gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        v-if = category.poster :src = "category.poster" 
        height="300"
        width=100%>
        <div class="text-center" style="padding: 110px 0px">
        <h3 class="font-weight-light px-6 white--text" >{{category.name}}</h3>
        <h6 class="caption white--text">{{category.date}} </h6>
      </div>
      </v-img>
      <div v-else class="text-center" style="padding: 110px 0px">
        <h3 class="font-weight-light px-6">{{category.name}}</h3>
        <h6 class="caption">{{category.date}}</h6>
      </div>
    </v-card>
  </v-hover>
  <v-dialog
        :retain-focus="false"
        v-model="dialog"
        width="600px"
        persistent>
        <v-container class="rounded-lg white pa-4">
          <!-- <v-row> -->
          <v-btn icon color="error" class="float-right" @click="dialog=false; ">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          <!-- </v-row> -->
        <v-img class="mt-6 mx-auto"
        v-if = category.poster :src = "category.poster" 
        :lazy-src= "category.poster" 
        height=100%
        width=80% />
        <h3 class="font-weight-light mt-4">{{category.name}}</h3>
        <v-chip outlined class="mr-1 pl-1" x-small style="cursor:pointer;">
        <v-icon v-if="category.type == 'workshop'" color="yellow">mdi-circle-medium</v-icon>
        <v-icon v-if="category.type == 'battle'" color="red">mdi-circle-medium</v-icon>
        <v-icon v-if="category.type == 'competition'" color="purple">mdi-circle-medium</v-icon>
        <v-icon v-if="category.type == 'cypher'" color="green">mdi-circle-medium</v-icon>
        <v-icon v-if="category.type == 'showcase'" color="blue">mdi-circle-medium</v-icon>
        <v-icon v-if="category.type == 'other'" color="black">mdi-circle-medium</v-icon>
        {{category.type}}
        </v-chip>
        <h3 class="font-weight-light mt-2">{{category.venue}}</h3>
        <h3 v-if="category.date" class="red--text mt-1 font-weight-light" >{{category.date}}</h3>
        <h3 class="red--text mt-1 font-weight-light" > {{category.date_time}} </h3>
        <h3 class="font-weight-light mt-2">{{category.about}}</h3>
        
        <h3 v-if="category.mc" class="font-weight-light mt-2">Emcee: {{category.mc}}</h3>
        <h3 v-if="category.dj" class="font-weight-light mt-2">DJ: {{category.dj}}</h3>
        <h3 v-if="category.judges" class="font-weight-light mt-2">Judges: {{category.judges}}</h3>
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
      name: 'CategoryCard',
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
          },
          getTime(timestamp){
        const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = timestamp;
        let datetype= date.slice(8, 10);
        let month = date.slice(5, 7);
        let yeartype = date.slice(0, 4)
        const regex = new RegExp("^0+(?!$)",'g');
        month = month.replaceAll(regex, "");
        let monthtype = months[month-1]
        date = datetype+" "+monthtype +" "+yeartype;
        return{ date}
      }
      }
      }
</script>

