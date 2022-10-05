<template>
<div>
  <v-hover v-slot:default="{ hover }">
    <v-card 
      data-view
      @click="dialog = true"
      :elevation="hover ? 6 : 0"
      outlined
      width="100"
      height="100"
      class="pa-0" style="margin:2px"
    >
      <v-img gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        v-if = category.poster :src = "category.poster" 
        height="100"
        width="100">
        <v-btn v-if="typeof category.category == 'number'" icon small class="float-right ma-1 white" @click.stop="$emit('editCategory',category)">
        <v-icon color="black" small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn v-else icon small class="float-right ma-1 white" @click.stop="$emit('editBattleCategory',category)">
        <v-icon color="black" small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn v-if="typeof category.category == 'number'" icon small class="float-right ma-1 white" @click.stop="$emit('removeCategory',category)">
        <v-icon color="error" small>mdi-close</v-icon>
        </v-btn>
        <!-- to remove battle category -->
        <v-btn v-else icon small class="float-right ma-1 white" @click.stop="$emit('removeBattleCategory',category)">
        <v-icon color="error" small>mdi-close</v-icon>
        </v-btn>
      </v-img>
      <v-img gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
         v-else
        height="100"
        width="100">
        <v-btn v-if="typeof category.category == 'number'" icon small class="float-right ma-1 white" @click.stop="$emit('editCategory',category)">
        <v-icon color="black" small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn v-else icon small class="float-right ma-1 white" @click.stop="$emit('editBattleCategory',category)">
        <v-icon color="black" small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn v-if="typeof category.category == 'number'" icon small class="float-right ma-1 white" @click.stop="$emit('removeCategory',category)">
        <v-icon color="error" small>mdi-close</v-icon>
        </v-btn>
        <!-- to remove battle category -->
        <v-btn v-else icon small class="float-right ma-1 white" @click.stop="$emit('removeBattleCategory',category)">
        <v-icon color="error" small>mdi-close</v-icon>
        </v-btn>
      <div class="text-center">
        <p style="height:45px; overflow:hidden;" class="font-weight-light white--text mt-md-24 mt-10 pb-0  ">{{category.name}}</p>
      </div>
      </v-img>
    </v-card>
  </v-hover>
  <v-dialog
        :retain-focus="false"
        v-model="dialog"
        width="600px"
        persistent>
        <v-container class="rounded-lg white pa-4">
          <v-row align="end" justify="end" class="pa-0 ma-0" >
          <v-btn icon color="error" class="float-right" @click="dialog=false; ">
              <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
          <!-- {{category}} -->
        <v-img class=" mx-auto"
        v-if = category.poster :src = "category.poster" 
        :lazy-src= "category.poster" 
         max-height="400px" contain />
        <h3 class="font-weight-light mt-4">{{category.name}}</h3>
        <v-chip v-if="typeof category.category == 'number'" outlined class="mr-1 pl-1 grey" x-small style="cursor:pointer;">
        <v-icon v-if="category.category == 1" color="yellow">mdi-circle-medium</v-icon>
        <v-icon v-if="category.category == 3" color="purple">mdi-circle-medium</v-icon>
        <v-icon v-if="category.category == 4" color="green">mdi-circle-medium</v-icon>
        <v-icon v-if="category.category == 2" color="blue">mdi-circle-medium</v-icon>
        <v-icon v-if="category.category == 5" color="black">mdi-circle-medium</v-icon>
        <span v-if="category.category == 1"> workshop</span>
        <span v-if="category.category == 2"> showcase</span>
        <span v-if="category.category == 3"> party</span>
        <span v-if="category.category == 4"> cypher</span>
        <span v-if="category.category == 5"> community talk</span>
        </v-chip>
        <v-chip v-else outlined class="mr-1 pl-1" x-small style="cursor:pointer;">
           <v-icon color="red">mdi-circle-medium</v-icon>
           <span> battle</span>
        </v-chip>
        <h3 class="font-weight-light mt-2">{{category.venue}}</h3>
        <!-- {{category}} -->
        <h3 v-if="category.date" class="red--text mt-1 font-weight-light" >{{moment(category.date)}}</h3>
        <h3 class="red--text mt-1 font-weight-light" > {{category.date_time}} </h3>
        <h3 v-if="category.about" class="font-weight-light mt-2">About: {{category.about}}</h3>
        <div v-if="typeof category.category != 'number'">
        <h3 v-if="category.rules" class="font-weight-light mt-2">Rules: {{category.rules}}</h3>
        <h3 v-if="category.prizes" class="font-weight-light mt-2">Prizes: {{category.prizes}}</h3>
        <h3 v-if="category.mcname1" class="font-weight-light mt-2">Emcee: </h3>
        <v-chip v-if="category.mcname1" color="black " @click="openChipDialog('mc1')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.mcphoto1">
              <v-img :src="category.mcphoto1"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.mcname1}}
        </v-chip>
        <v-chip v-if="category.mcname2" color="black " @click="openChipDialog('mc2')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.mcphoto2">
              <v-img :src="category.mcphoto2"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.mcname2}}
        </v-chip>
        <v-chip v-if="category.mcname3" color="black " @click="openChipDialog('mc3')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.mcphoto3">
              <v-img :src="category.mcphoto3"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.mcname3}}
        </v-chip>
        <h3 v-if="category.djname1" class="font-weight-light mt-2">DJ: </h3>
        <v-chip v-if="category.djname1" color="black " @click="openChipDialog('dj1')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.djphoto1">
              <v-img :src="category.djphoto1"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.djname1}}
        </v-chip>
        <v-chip v-if="category.djname2" color="black " @click="openChipDialog('dj2')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.djphoto2">
              <v-img :src="category.djphoto2"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.djname2}}
        </v-chip>
        <v-chip v-if="category.djname3" color="black " @click="openChipDialog('dj3')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.djphoto3">
              <v-img :src="category.djphoto3"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.djname3}}
        </v-chip>
        <h3 v-if="category.bgname1" class="font-weight-light mt-2">Battle guests: </h3>
        <v-chip v-if="category.bgname1" color="black " @click="openChipDialog('bg1')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.bgphoto1">
              <v-img :src="category.bgphoto1"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.bgname1}}
        </v-chip>
        <v-chip v-if="category.bgname2" color="black " @click="openChipDialog('bg2')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.bgphoto2">
              <v-img :src="category.bgphoto2"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.bgname2}}
        </v-chip>
        <v-chip v-if="category.bgname3" color="black " @click="openChipDialog('bg3')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.bgphoto3">
              <v-img :src="category.bgphoto3"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.bgname3}}
        </v-chip>
        <h3 v-if="category.name1" class="font-weight-light mt-2">Judges:</h3>
        <v-chip v-if="category.name1" color="black " @click="openChipDialog('n1')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo1">
              <v-img :src="category.photo1"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name1}}
        </v-chip>
        <v-chip v-if="category.name2" color="black " @click="openChipDialog('n2')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo2">
              <v-img :src="category.photo2"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name2}}
        </v-chip>
        <v-chip v-if="category.name3" color="black " @click="openChipDialog('n3')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo3">
              <v-img :src="category.photo3"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name3}}
        </v-chip>
        <v-chip v-if="category.name4" color="black " @click="openChipDialog('n4')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo4">
              <v-img :src="category.photo4"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name4}}
        </v-chip>
        <v-chip v-if="category.name5" color="black " @click="openChipDialog('n5')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo5">
              <v-img :src="category.photo5"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name5}}
        </v-chip>
        <v-chip v-if="category.name6" color="black " @click="openChipDialog('n6')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo6">
              <v-img :src="category.photo6"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name6}}
        </v-chip>
        <v-chip v-if="category.name7" color="black " @click="openChipDialog('n7')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo7">
              <v-img :src="category.photo7"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name7}}
        </v-chip>
        </div>
        <div v-else>
        <h3 v-if="category.name1" class="font-weight-light mt-2">Artist:</h3>
           <v-chip v-if="category.name1" color="black " @click="openChipDialog('n1')" dark outlined class="ma-1" style="cursor:pointer;">
            <v-avatar left v-if="category.photo1">
              <v-img :src="category.photo1"></v-img>
            </v-avatar>
            <v-avatar left v-else>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{category.name1}}
        </v-chip>
        </div>
        </v-container>
  </v-dialog> 
  <v-dialog
      :retain-focus="false"
      v-model="chipDialog"
      width="480px" 
      persistent>
      <v-container class="rounded-lg white pa-2 pa-md-4">
        <v-row align="end" justify="end" class="pa-0 ma-0" >
        <v-btn icon  color="error" class="float-right" @click="chipDialog =false; temp.name='';temp.photo =''; temp.info=''">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-row>
      <v-img class="mt-8 mx-auto"  max-height="400px" contain v-if="temp.photo" :src="temp.photo"></v-img>
      <nuxt-link v-if="temp.guest" :to="'/' + temp.guest" class="primary text-decoration-none" > <h3 class="font-weight-light mt-2">{{temp.name}}</h3></nuxt-link>
      <h3 v-else class="font-weight-light mt-2">{{temp.name}}</h3>
      <h3 class="font-weight-light mt-2">{{temp.info}}</h3>
      </v-container>
  </v-dialog> 
</div>
</template>
<script>
import moment from 'moment'
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
        dialog: false,
        chipDialog:false,
        temp:{
          name:'',
          photo:'',
          info:'',
          guest:'',
          country:''
        },
      }
    },
    methods:{
      openChipDialog(artist){
        if(artist == 'mc1')
        {this.temp.name = this.category.mcname1
        this.temp.guest = this.category.mc1
        this.temp.photo = this.category.mcphoto1
        this.temp.info = this.category.mcinfo1
        this.temp.country = this.category.mccountry1}
        else if(artist == 'mc2')
        {this.temp.name = this.category.mcname2
        this.temp.guest = this.category.mc2
        this.temp.photo = this.category.mcphoto2
        this.temp.info = this.category.mcinfo2
        this.temp.country = this.category.mccountry2}
        else if(artist == 'mc3')
        {this.temp.name = this.category.mcname3
        this.temp.guest = this.category.mc3
        this.temp.photo = this.category.mcphoto3
        this.temp.info = this.category.mcinfo3
        this.temp.country = this.category.mccountry3}
        else if(artist == 'dj1')
        {this.temp.name = this.category.djname1
        this.temp.guest = this.category.dj1
        this.temp.photo = this.category.djphoto1
        this.temp.info = this.category.djinfo1
        this.temp.country = this.category.djcountry1}
        else if(artist == 'dj2')
        {this.temp.name = this.category.djname2
        this.temp.guest = this.category.dj2
        this.temp.photo = this.category.djphoto2
        this.temp.info = this.category.djinfo2
        this.temp.country = this.category.djcountry1}
        else if(artist == 'dj3')
        {this.temp.name = this.category.djname3
        this.temp.guest = this.category.dj3
        this.temp.photo = this.category.djphoto3
        this.temp.info = this.category.djinfo3
        this.temp.country = this.category.djcountry3}
        else if(artist == 'bg1')
        {this.temp.name = this.category.bgname1
        this.temp.guest = this.category.bg1
        this.temp.photo = this.category.bgphoto1
        this.temp.info = this.category.bginfo1
        this.temp.country = this.category.bgcountry1}
        else if(artist == 'bg2')
        {this.temp.name = this.category.bgname2
        this.temp.guest = this.category.bg2
        this.temp.photo = this.category.bgphoto2
        this.temp.info = this.category.bginfo2
        this.temp.country = this.category.bgcountry1}
        else if(artist == 'bg3')
        {this.temp.name = this.category.bgname3
        this.temp.guest = this.category.bg3
        this.temp.photo = this.category.bgphoto3
        this.temp.info = this.category.bginfo3
        this.temp.country = this.category.bgcountry3}
        else if(artist == 'n1')
        {this.temp.name = this.category.name1
        this.temp.guest = this.category.guest1
        this.temp.photo = this.category.photo1
        this.temp.info = this.category.info1
        this.temp.country = this.category.country1}
        else if(artist == 'n2')
        {this.temp.name = this.category.name2
        this.temp.guest = this.category.guest2
        this.temp.photo = this.category.photo2
        this.temp.info = this.category.info2
        this.temp.country = this.category.country2}
        else if(artist == 'n3')
        {this.temp.name = this.category.name3
        this.temp.guest = this.category.guest3
        this.temp.photo = this.category.photo3
        this.temp.info = this.category.info3
        this.temp.country = this.category.country3}
        else if(artist == 'n4')
        {this.temp.name = this.category.name4
        this.temp.guest = this.category.guest4
        this.temp.photo = this.category.photo4
        this.temp.info = this.category.info4
        this.temp.country = this.category.country4}
        else if(artist == 'n5')
        {this.temp.name = this.category.name5
        this.temp.guest = this.category.guest5
        this.temp.photo = this.category.photo5
        this.temp.info = this.category.info5
        this.temp.country = this.category.country5}
        else if(artist == 'n6')
        {this.temp.name = this.category.name6
        this.temp.guest = this.category.guest6
        this.temp.photo = this.category.photo6
        this.temp.info = this.category.info6
        this.temp.country = this.category.country6}
        else if(artist == 'n7')
        {this.temp.name = this.category.name7
        this.temp.guest = this.category.guest7
        this.temp.photo = this.category.photo7
        this.temp.info = this.category.info7
        this.temp.country = this.category.country7}
        this.chipDialog = true
      },
      moment(date){
           return moment(date).format("ll")
      },
    }
  }
</script>

