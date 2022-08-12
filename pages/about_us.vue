<template>
  <v-app>
    <v-container >
      <div class="my-6 mx-auto" style="max-width:540px;">
        <!-- <v-row class="ma-8 "> -->
          <!-- <h3 class="my-4 font-weight-black">gebbles</h3> -->
          <h4 class="font-weight-light my-4"><span class="font-weight-bold">*groove pebbles</span>, is a community platform <b>to celebrate the each one teach one legacy of the hiphop culture. </b><br>
          at gebbles, you can document your HipHop journey & stay connected
          to some of the people who matter the most, your peers, teachers and students in this culture,
          the people who show you the way and the people whom you show it to.
          <br><br>
          <p>it is often easy to look past at the beautiful times as it happens, because time really flies when you're having
            fun with your people.
            but by documenting your journey, we can take in and really breathe into these beautiful memories
            for our future selves/generations.
           <!-- <br> -->
            <!-- more often than not you inspire people just by existing and doing what you love doing. -->


          </p>
          <!-- Gebbles is a platform for the artists of the hiphop culture. At gebbles, you can make a dance portfolio, document your HipHop journey & stay connected
              to some of the people who matter the most. -->
          </h4>
          <h4 class="font-weight-light my-4"><span class="font-weight-medium">vision</span>, to empower the street dance community both culturally and economically by bringing fresh ideas to life with the help of computing technology.</h4>
          <h4 class="mt-6 font-weight-medium float-right">
          -gebbles team.</h4>
          <!-- <div>
          <h3 class="mt-6 font-weight-black">team</h3>
          <h4><span style="cursor:pointer;" @click="openig('r')">river</span> and <span style="cursor:pointer;"  @click="openig('y')">yiyasha </span> </h4>
          <h4 class="mt-6">happy sharing,<br>
          -inmygroove team.</h4>
          </div> -->
        <!-- </v-row> -->
      <!-- Connecting students and teachers, worldwide. -->
          <!-- At inmygroove, you can document your HipHop journey & stay connected
          to some of the people who matter the most, your teachers and students in this culture,
          the people who show you the way and the people whom you show it. -->
          <!-- InMyGroove is a community platform <b>to celebrate the each one teach one legacy of the hiphop culture </b> in a meaningful way. 
          We all learn from some artists who passionately shared their dance and knowledge, may be in the studios, streets, clubs or cyphers. We hope, like us
          you too understand the value of their sharing along the way which made you a dope dancer today. Let's celebrate them and share your experiences with them.
          Eventually a new generation dancer will get to know them through you.<b> The cycle of the culture repeats and along the way comes your turn, to be celebrated by your students.</b>
          The past, present and future of each one teach one becomes one right here. You see it right. Let's make the culture even more meaningfully connected than it is today. 
          We feel that together we can acheive this hence the initiative <b>'Inmygroove', where you represent yourself, your journey and your teachers/friends/brothers/sisters
          who passed a part of their groove, a part of their soul to you.</b> -->
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  methods:{
    openig(id){
      if(id =='r')
      {var url = 'https://www.instagram.com/river.io/';
      var win = window.open(url, '_blank');
      win.focus();}
      else{var url = 'https://www.instagram.com/yiyasha15/';
      var win = window.open(url, '_blank');
      win.focus();}
    }
  }

}
</script>
 