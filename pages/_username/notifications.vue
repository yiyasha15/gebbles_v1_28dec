<template>
<v-app>
    <v-container >
        <h2 class="my-2">Notifications</h2>
        <div v-if="!firstLoad">
        <v-list two-line>
        <v-subheader>New</v-subheader>
        <template v-for="(item) in filteredNotifications">
            <v-list-item :key="item.index" @click="seen(item)" v-show="loggedInUser.user.username != item.sender" >
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
            <v-list-item-content v-if="item.notification_context == 1">
                <v-list-item-title v-if="item.notification_type == 1" >{{item.sender}} has tagged you as a teacher.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" >{{item.sender}} has liked your post.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" >{{item.sender}} has commented on your post.</v-list-item-title>
                <v-list-item-subtitle> {{item.time}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 2">
                <v-list-item-title v-if="item.notification_type == 1" >{{item.sender}} has added a video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" >{{item.sender}} has liked your video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" >{{item.sender}} has commented on your video.</v-list-item-title>
                <v-list-item-subtitle> {{item.time}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 3">
                <v-list-item-title v-if="item.notification_type == 1" >{{item.sender}} has sent you a private message.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" >{{item.sender}} has liked your private message.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" >{{item.sender}} has commented on your private message.</v-list-item-title>
                <v-list-item-subtitle> {{item.time}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </template>
        </v-list>
        <v-divider></v-divider>
        <v-list two-line>
        <v-subheader>Earlier</v-subheader>
        <template v-for="(item) in filteredNotificationsOld">
            <v-list-item :key="item.index" @click="opene1t1(item)" v-show="loggedInUser.user.username != item.sender">
                <div >
                <v-list-item-avatar v-if=" item.artist_metadata.thumb">
                    <img :src = "item.artist_metadata.thumb" alt="img">
                </v-list-item-avatar>
                <v-list-item-avatar color="blue" v-else>
                    <v-icon dark>
                        mdi-account-circle
                    </v-icon>
                </v-list-item-avatar>
            </div>
            <v-list-item-content v-if="item.notification_context == 1">
                <v-list-item-subtitle> {{item.time}}</v-list-item-subtitle>
                <v-list-item-title v-if="item.notification_type == 1" >{{item.sender}} has tagged you as a teacher.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" >{{item.sender}} has liked your post.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" >{{item.sender}} has commented on your post.</v-list-item-title>
                
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 2">
                <v-list-item-title v-if="item.notification_type == 1" >{{item.sender}} has added a video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" >{{item.sender}} has liked your video.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" >{{item.sender}} has commented on your video.</v-list-item-title>
                <v-list-item-subtitle> {{item.time}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="item.notification_context == 3">
                <v-list-item-title v-if="item.notification_type == 1" >{{item.sender}} has sent you a private message.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 2" >{{item.sender}} has liked your private message.</v-list-item-title>
                <v-list-item-title v-if="item.notification_type == 3" >{{item.sender}} has commented on your private message.</v-list-item-title>
                <v-list-item-subtitle> {{item.time}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </template>
        </v-list>
        </div>
    </v-container>
    <v-container v-if="firstLoad">
          <div v-for="n in this.looploader" :key ="n.index">
            <v-flex sm6 xs6> 
              <v-skeleton-loader  class="ma-1" :loading="loading" type="list-item-avatar" ></v-skeleton-loader>
            </v-flex>
          </div>
    </v-container>
      <v-card v-intersect="infiniteScrolling"></v-card>
</v-app>
</template>
<script>
import { mapGetters } from 'vuex'
import EventService from '@/services/EventService.js'
export default {
middleware : 'check_auth',
computed: {
    ...mapGetters(['loggedInUser']),
    filteredNotifications: function(){
        if(this.notifications)//on refresh data of undefined error
        {let n = this.notifications
        return n.filter((note) => {
        return note.is_seen==false;
    });}
    },
    filteredNotificationsOld: function(){
        if(this.notifications)
        {
            // console.log(this.notifications);
        let n = this.notifications
        return n.filter((note) => {
        return note.is_seen==true;
        // console.log(note);
            });
        }}
    },
    created(){
        this.getnotifications();
    },
    methods:{
        async getnotifications(){
            // console.log("hi");
        try{
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
        };
        const response = await EventService.getNotificationsSharing(this.$store.state.auth.user.user.username,config)
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
            this.$router.push('/e1t1/'+ obj.e1t1object);
            let temp = this.filteredNotifications;
            let tempe;
            // if(obj.chatobject)
            // {tempe = temp.filter(temp => temp.chatobject == obj.chatobject);
            // console.log("chatobj",tempe);}
            // if(obj.learningobject)
            // {tempe = temp.filter(temp => temp.learningobject == obj.learningobject);
            // console.log("learnobj",tempe);}
            if(obj.e1t1object)
            {tempe = temp.filter(temp => temp.e1t1object == obj.e1t1object);}
            // console.log("e1t1tempe",tempe);
            // for all notifications with filternotification whose e1t1 matches
            const config = {
                    "content-type": "multipart/form-data",
                    headers: { "Authorization": "Bearer " + this.$store.state.auth.user.access_token
                    }
                };
            try {
                for (var i = 0; i < tempe.length; i++)
                {
                let form= new FormData();
                form.append('is_seen', 'true');
                form.append('sender', tempe[i].sender);
                form.append('receiver', tempe[i].receiver);
                form.append('notification_type', tempe[i].notification_type);
                form.append('notification_context', tempe[i].notification_context);
                await this.$axios.$put("/v1/notifications/e1t1/"+tempe[i].id , form, config)
                // console.log("put for", tempe[i].id );
                }
            } catch (error) {
                console.log("error..",error.response.data);
            }
            // this.$store.dispatch("check_notifications",this.loggedInUser.user.username);
            // this.$router.push('/e1t1/'+ obj.e1t1object);
        }
    },
    opene1t1(obj){
        if ('e1t1object' != null){
            this.$router.push('/e1t1/'+obj.e1t1object)
        }else{
            this.$router.push('/e1t1/'+obj.learningobject)
        }
    },
    infiniteScrolling(entries, observer, isIntersecting) {
        // console.log("page ",this.page);
        if(this.page){
             const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": "Bearer " + this.$store.state.auth.user.access_token}
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