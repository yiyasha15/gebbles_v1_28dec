<template>
<v-app>
    <v-container>
        <h2 class="my-2">Notifications</h2>
        <!-- {{notifications}} -->
        <v-list two-line>
            <v-subheader
            >New</v-subheader>
        <template v-for="(item) in filteredNotifications">
            <v-list-item :key="item.index" @click="seen(item)" v-show="loggedInUser.user.username != item.sender" >
            <div v-for="artist in artists" :key ="artist.index">
                <v-list-item-avatar v-if=" item.sender == artist.username && artist.thumb">
                    <img :src = "artist.thumb" alt="img">
                </v-list-item-avatar>
                <v-list-item-avatar color="blue" v-if=" item.sender == artist.username && !artist.thumb">
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
                <div v-for="artist in artists" :key ="artist.index">
                <v-list-item-avatar v-if=" item.sender == artist.username && artist.thumb">
                    <img :src = "artist.thumb" alt="img">
                </v-list-item-avatar>
                <v-list-item-avatar color="blue" v-if=" item.sender == artist.username && !artist.thumb">
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
    </v-container>
</v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    middleware : 'check_auth',
    computed: {
        ...mapGetters(['notifications', 'artists', 'loggedInUser']),
        filteredNotifications: function(){
            // console.log(this.notifications);
            if(this.notifications)//on refresh data of undefined error
            {let n = this.notifications
            return n.filter((note) => {
            return note.is_seen==false;
        });}
        },
        filteredNotificationsOld: function(){
            if(this.notifications)
            {
            let n = this.notifications
            return n.filter((note) => {
            return note.is_seen==true; });
            }}
        },
    methods:{
        async seen(obj){
            {
                let temp = this.filteredNotifications;
                // let tempe;
                // if(obj.chatobject)
                // {tempe = temp.filter(temp => temp.chatobject == obj.chatobject);
                // console.log("chatobj",tempe);}
                // if(obj.learningobject)
                // {tempe = temp.filter(temp => temp.learningobject == obj.learningobject);
                // console.log("learnobj",tempe);}
                // if(obj.e1t1object)
                // {tempe = temp.filter(temp => temp.e1t1object == obj.e1t1object);}
                // console.log("e1t1tempe",tempe);
                //for all notifications with filternotification whose e1t1 matches
                try {
                    const config = {
                        headers: { "Authorization": "Bearer" + this.$store.state.auth.user.access_token
                        }
                    };
                    console.log("token: ",this.$store.state.auth.user.access_token);
                    let form= new FormData();
                    form.append('is_seen', 'true');
                    form.append('sender', obj.sender);
                    form.append('receiver', obj.receiver);
                    form.append('notification_type', obj.notification_type);
                    form.append('notification_context', obj.notification_context);
                    console.log(obj);
                    for (var value of form.values()) {
                        console.log(value);
                    }
                    let res = await this.$axios.$put("/v1/notifications/e1t1/"+obj.id, form, config);
                    console.log(res);
                    
                } catch (error) {
                    console.log("error..",error.response.data);
                }
                this.$store.dispatch("check_notifications",this.loggedInUser.user.username);
                this.$router.push('/e1t1/'+ obj.e1t1object);
            }
        },
        opene1t1(obj){
            if ('e1t1object' != null){
                this.$router.push('/e1t1/'+obj.e1t1object)
            }else{
                this.$router.push('/e1t1/'+obj.learningobject)
            }
        },
    }
}
</script>