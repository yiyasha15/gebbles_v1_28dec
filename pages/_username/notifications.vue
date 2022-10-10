<template>
<v-app>
    <v-container style="max-width:1072px;" class="background" >
        <h2 class="my-md-2 font-weight-light">Notifications</h2>
        <div v-if="!firstLoad">
        <v-list two-line class="background">
            <!-- {{filteredNotifications}} -->
        <v-subheader>New</v-subheader>
        <!-- {{filteredNotifications}} -->
        <template v-for="(item) in filteredNotifications">
            <v-list-item :key="item.index" @click="seen(item)" v-show="loggedInUser.username != item.sender" >
            <div>
                <v-list-item-avatar v-if=" item.artist_metadata.thumb">
                    <img :src = "item.artist_metadata.thumb" alt="img">
                </v-list-item-avatar>
                <v-list-item-avatar color="blue" v-else>
                <v-icon dark>
                    mdi-account-circle
                </v-icon>
              </v-list-item-avatar>
            </div>
            <v-list-item-content v-if="item.notification_context == 1 ">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                        <v-list-item-subtitle v-bind="attrs"
                        v-on="on"> {{moment(item.time)}}</v-list-item-subtitle>
                  </template>
                  <span>{{exactmoment(item.time)}}</span>
                </v-tooltip>
                <!-- <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle> -->
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has tagged you as a teacher.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" class="wrap-text" >{{item.sender}} has liked your post.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" class="wrap-text">{{item.sender}} has commented on your post.</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 2">
                <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has added a video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" class="wrap-text">{{item.sender}} has reacted on your video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" class="wrap-text">{{item.sender}} has commented on your video.</v-list-item-title>
                
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 3">
                <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has mentioned you in a video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" class="wrap-text">{{item.sender}} has reacted on your tagged video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" class="wrap-text">{{item.sender}} has commented on your tagged video.</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 4">
                <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has sent you a private message.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" class="wrap-text">{{item.sender}} has liked your private message.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" class="wrap-text" >{{item.sender}} has commented on your private message.</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 5">
                <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has tagged you in an event.</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </template>
        </v-list>
        <v-divider></v-divider>
        <!-- {{filteredNotificationsOld}} -->
        <v-list two-line class="background">
        <v-subheader>Earlier</v-subheader>
        <template v-for="(item) in filteredNotificationsOld" >
            <v-list-item :key="item.index" @click="opene1t1(item)" v-show="loggedInUser.username != item.sender">
            <v-list-item-avatar v-if=" item.artist_metadata.thumb">
                <img :src = "item.artist_metadata.thumb" alt="img">
            </v-list-item-avatar>
            <v-list-item-avatar color="blue" v-else>
                <v-icon dark>
                    mdi-account-circle
                </v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-if="item.notification_context == 1 ">
                <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle>
                <!-- <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle> -->
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text" >{{item.sender}} has tagged you as a teacher.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" class="wrap-text">{{item.sender}} has liked your post.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" class="wrap-text">{{item.sender}} has commented on your post.</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 2">
                <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has added a video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" class="wrap-text">{{item.sender}} has reacted on your video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" class="wrap-text">{{item.sender}} has commented on your video.</v-list-item-title>
                
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 3">
                <v-list-item-subtitle > {{moment(item.time)}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has tagged you in a video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" class="wrap-text">{{item.sender}} has reacted on your tagged video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" class="wrap-text">{{item.sender}} has commented on your tagged video.</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 4">
                <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has sent you a private message.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" class="wrap-text" >{{item.sender}} has liked your private message.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" class="wrap-text">{{item.sender}} has commented on your private message.</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 5">
                <v-list-item-subtitle> {{moment(item.time)}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" class="wrap-text">{{item.sender}} has tagged you in an event.</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </template>
        </v-list>
        </div>
    </v-container>
    <v-container v-if="firstLoad" style="max-width:1072px;" class="background">
          <div v-for="n in this.looploader" :key ="n.index">
            <v-flex sm6 xs6 class="background"> 
              <v-skeleton-loader  class="ma-1" :loading="loading" type="list-item-avatar" ></v-skeleton-loader>
            </v-flex>
          </div>
    </v-container>
      <v-card v-intersect="infiniteScrolling"></v-card>
</v-app>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import EventService from '@/services/EventService.js'
export default {
middleware : 'check_auth',
computed: {
    ...mapGetters(['loggedInUser','isAuthenticated']),
    filteredNotifications: function(){
        if(this.notifications)//on refresh data of undefined error
        {
            let n = this.notifications
            return n.filter((note) => {
            return note.is_seen==false;});
        }
    },
    filteredNotificationsOld: function(){
        if(this.notifications)
        {
            let n = this.notifications
            return n.filter((note) => {
            return note.is_seen==true;});
        }
    }
    },
    created(){
        if(this.isAuthenticated)
        {this.getnotifications();}
    },
    methods:{
        moment(date){
           return moment(date).fromNow()
        },
        exactmoment(date){
           return moment(date).format("lll")
        },
        async getnotifications(){
            try{
                const config = {
                headers: {"content-type": "multipart/form-data",
                    "Authorization": this.$auth.strategy.token.get()}
                };
                const response = await EventService.getNotificationsSharing(this.loggedInUser.username,config)
                // console.log(response);
                this.notifications = response.data.results
                this.page = response.data.next
                this.firstLoad = false
            }catch (e) {
                console.log(e);
            }
        },
        async seen(obj){
            {
                if(obj.e1t1object)
                this.$router.push('/e1t1/'+ obj.e1t1object);
                else if(obj.guestobject)
                this.$router.push('/events/'+ obj.guestobject.event);
                else if(obj.cookingobject)
                this.$router.push('/whatiscooking/'+ obj.cookingobject);
                let temp = this.filteredNotifications;
                let tempe=[];
                // console.log(this.filteredNotifications, obj);
                if(obj.e1t1object)
                    tempe = temp.filter(temp => temp.e1t1object == obj.e1t1object);
                else if(obj.guestobject && obj.guestobject.event)
                    {
                        for(let i =0; i< temp.length; i++)
                        if(temp[i].guestobject && temp[i].guestobject.event && temp[i].guestobject.event == obj.guestobject.event)
                        tempe.push(temp[i])
                    }
                else if(obj.cookingobject)
                    tempe = temp.filter(temp => temp.cookingobject == obj.cookingobject);
                // for all notifications with filternotification whose e1t1 matches
                const config = {
                    "content-type": "multipart/form-data",
                    headers: { "Authorization": this.$auth.strategy.token.get()
                    }
                };
                console.log(tempe);
                try {
                    for (var i = 0; i < tempe.length; i++)
                    {
                    let form= new FormData();
                    form.append('is_seen', 'true');
                    await this.$axios.$put("/v1/notifications/e1t1/"+tempe[i].id , form, config)
                    }
                } catch (error) {
                    console.log("error..",error.response);
                }
                this.$store.dispatch("check_notifications");
            }
        },
        opene1t1(obj){
            console.log(obj);
            if(obj.e1t1object)
            this.$router.push('/e1t1/'+ obj.e1t1object);
            else if(obj.cookingobject)
            this.$router.push('/whatiscooking/'+ obj.cookingobject);
            else if(obj.guestobject)
            this.$router.push('/events/'+ obj.guestobject.event);
        },
        infiniteScrolling(entries, observer, isIntersecting) {
            // console.log("page ",this.page);
            if(this.page){
                const config = {
            headers: {"content-type": "multipart/form-data",
                "Authorization": this.$auth.strategy.token.get()}
            };
            const key = 'id';
            this.$axios.get(this.page, config).then(response => {
            //   console.log(response);
                this.page= response.data.next;
                response.data.results.forEach(item => this.notifications.push(item));
                // filter array so no duplicates
                this.notifications = [...new Map(this.notifications.map(item =>
                    [item[key], item])).values()];
            })
            .catch(err => {
                console.log("errror",err);
            });
            }
        }
    },
    data() {
        return {
            page:"",
            looploader:[1,1,1,1,1,1,1,1,1,1,1],
            loading: true,
            firstLoad: true,
            notifications:[],
        }
    },
}
</script>
<style scoped>
.wrap-text {
   white-space: normal;
}
</style>