(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{617:function(t,e,o){"use strict";var n=o(20),r=o(23),c=o.n(r),l=o(190),component=Object(n.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("center",[e("v-divider",{attrs:{width:"340"}})],1)}),[],!1,null,null,null);e.a=component.exports;c()(component,{VDivider:l.a})},628:function(t,e,o){"use strict";o(11),o(9),o(7),o(6),o(8),o(66);var n=o(24),r=(o(25),o(1)),c=o(59),l=o(642),m=o(36),d=o(2),v=o.n(d),k=o(620),_=o(621),h=o(617);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y={head:function(){return{title:"gebbles - What's cookin"}},name:"CookingCard",props:{cook:Object},components:{LearningCommentsCard:l.a,GebblesDivider:h.a,Youtube:k.Youtube},computed:x(x({},Object(m.c)(["loggedInUser","userHasPortfolio","usersPortfolio","isAuthenticated","learning_comments_list"])),{},{height:function(){switch(this.$vuetify.breakpoint.name){case"xs":return 220;case"sm":case"md":case"lg":case"xl":return 410}}}),data:function(){return{videoId:"",dialog:!1,deleteLoading:!1,deleteLearnDialog:!1,comment_array:[],like:0,dope:0,info:0,cook_has_like:!1,cook_has_dope:!1,cook_has_info:!1,cook_has_like_id:"",cook_has_dope_id:"",cook_has_info_id:"",valid_snackbar:!1,login_snackbar:!1,thankyou_snackbar:!1,comments:{username:"",comment:"",cookingidobj:""},reactForm:{username:"",cookingidobj:"",like_type:""}}},created:function(){var t=this.$props.cook.video;/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(t)&&t&&(this.videoId=Object(_.a)(t)),console.log(this.cook),this.cook_reaction(),this.cook_comments()},methods:{moment:function(t){return v()(t).format("ll")},cook_comments:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c.a.getCookComments(t.cook.id).then((function(e){return t.comment_array=e.data.results}));case 1:case"end":return e.stop()}}),e)})))()},cook_reaction:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c.a.getCookReaction(t.cook.id).then((function(e){if(e.data){var o=e.data,n=o.filter((function(t){return"LO"==t.like_type})),r=o.filter((function(t){return"FI"==t.like_type})),c=o.filter((function(t){return"DE"==t.like_type}));if(t.like=n.length,t.dope=r.length,t.info=c.length,t.isAuthenticated){var l=n.filter((function(e){return e.username==t.loggedInUser.username}));l.length>0&&(t.cook_has_like=!0,t.cook_has_like_id=l[0].id);var m=r.filter((function(e){return e.username==t.loggedInUser.username}));m.length>0&&(t.cook_has_dope=!0,t.cook_has_dope_id=m[0].id);var d=c.filter((function(e){return e.username==t.loggedInUser.username}));d.length>0&&(t.cook_has_info=!0,t.cook_has_info_id=d[0].id)}}}));case 1:case"end":return e.stop()}}),e)})))()},post_comment:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var n,r,data;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(!e.isAuthenticated){o.next=24;break}if(""==e.comments.comment){o.next=21;break}for(data in e.comments.username=e.loggedInUser.username,e.comments.cookingidobj=t,n={headers:{"content-type":"multipart/form-data",Authorization:e.$auth.strategy.token.get()}},r=new FormData,e.comments)r.append(data,e.comments[data]);return o.prev=7,o.next=10,e.$axios.$post("/v1/whatiscooking/cooking/comments/",r,n);case 10:o.sent,e.cook_comments(),e.comments.comment="",e.thankyou_snackbar=!0,o.next=19;break;case 16:o.prev=16,o.t0=o.catch(7),console.log(o.t0);case 19:o.next=22;break;case 21:e.valid_snackbar=!0;case 22:o.next=25;break;case 24:e.login_snackbar=!0;case 25:case"end":return o.stop()}}),o,null,[[7,16]])})))()},editcook:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.$store.dispatch("check_cook_obj",t.cook),t.$router.push("/create/uploadvideo");case 2:case"end":return e.stop()}}),e)})))()},deleted:function(){var t=this;this.deleteLoading=!0;var e={headers:{"content-type":"multipart/form-data",Authorization:this.$auth.strategy.token.get()}};this.$store.dispatch("remove_cook_obj"),this.$store.dispatch("remove_cook_reactions");try{this.$axios.$delete("/v1/whatiscooking/cooking/"+this.cook.uuid,e).then((function(e){console.log("cooking deleted",e),t.deleteLoading=!1,t.dialog=!1,t.$emit("postDelete")}))}catch(t){console.log(t.response),this.deleteLoading=!1}},react_like:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o,n,r,data,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isAuthenticated){e.next=38;break}if(t.reactForm.username=t.loggedInUser.username,t.reactForm.cookingidobj=t.cook.id,t.reactForm.like_type="LO",console.log(t.reactForm),!t.cook_has_like){e.next=20;break}return t.cook_has_like=!t.cook_has_like,t.like=t.like-1,o={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.prev=9,e.next=12,t.$axios.$delete("/v1/whatiscooking/cooking/likes/"+t.cook_has_like_id,o);case 12:t.cook_reaction(),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(9),console.log(e.t0);case 18:e.next=36;break;case 20:for(data in t.cook_has_like=!t.cook_has_like,t.like=t.like+1,n={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},r=new FormData,t.reactForm)r.append(data,t.reactForm[data]);return e.prev=25,e.next=28,t.$axios.$post("/v1/whatiscooking/cooking/likes/",r,n);case 28:c=e.sent,console.log(c),t.cook_reaction(),e.next=36;break;case 33:e.prev=33,e.t1=e.catch(25),console.log("what",e.t1);case 36:e.next=39;break;case 38:t.login_snackbar=!0;case 39:case"end":return e.stop()}}),e,null,[[9,15],[25,33]])})))()},react_dope:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o,n,r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isAuthenticated){e.next=35;break}if(t.reactForm.username=t.loggedInUser.username,t.reactForm.cookingidobj=t.cook.id,t.reactForm.like_type="FI",!t.cook_has_dope){e.next=19;break}return t.cook_has_dope=!t.cook_has_dope,t.dope=t.dope-1,o={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.prev=8,e.next=11,t.$axios.$delete("/v1/whatiscooking/cooking/likes/"+t.cook_has_dope_id,o);case 11:t.cook_reaction(),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(8),console.log(e.t0);case 17:e.next=33;break;case 19:for(data in t.cook_has_dope=!t.cook_has_dope,t.dope=t.dope+1,n={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},r=new FormData,t.reactForm)r.append(data,t.reactForm[data]);return e.prev=24,e.next=27,t.$axios.$post("/v1/whatiscooking/cooking/likes/",r,n);case 27:t.cook_reaction(),e.next=33;break;case 30:e.prev=30,e.t1=e.catch(24),console.log(e.t1);case 33:e.next=36;break;case 35:t.login_snackbar=!0;case 36:case"end":return e.stop()}}),e,null,[[8,14],[24,30]])})))()},react_info:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o,n,r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isAuthenticated){e.next=35;break}if(t.reactForm.username=t.loggedInUser.username,t.reactForm.cookingidobj=t.cook.id,t.reactForm.like_type="DE",!t.cook_has_info){e.next=19;break}return t.cook_has_info=!t.cook_has_info,t.info=t.info-1,o={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.prev=8,e.next=11,t.$axios.$delete("/v1/whatiscooking/cooking/likes/"+t.cook_has_info_id,o);case 11:t.cook_reaction(),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(8),console.log(e.t0);case 17:e.next=33;break;case 19:for(data in t.cook_has_info=!t.cook_has_info,t.info=t.info+1,n={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},r=new FormData,t.reactForm)r.append(data,t.reactForm[data]);return e.prev=24,e.next=27,t.$axios.$post("/v1/whatiscooking/cooking/likes/",r,n);case 27:t.cook_reaction(),e.next=33;break;case 30:e.prev=30,e.t1=e.catch(24),console.log(e.t1);case 33:e.next=36;break;case 35:t.login_snackbar=!0;case 36:case"end":return e.stop()}}),e,null,[[8,14],[24,30]])})))()},commentDelete:function(){this.cook_comments()}}},w=(o(686),o(20)),O=o(23),j=o.n(O),C=o(193),$=o(588),I=o(197),V=o(70),A=o(199),D=o(597),P=o(604),F=o(190),L=o(128),R=o(166),S=o(191),z=o(129),U=o(194),E=o(192),H=o(17),T=o(102),Y=o(198),M=o(600),W=o(609),B=o(610),J=o(67),component=Object(w.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"my-md-2 my-0"},[o("v-list-item",{staticClass:"px-md-0",attrs:{"two-line":""}},[t.cook.profile_photo?o("v-list-item-avatar",[o("v-img",{attrs:{src:t.cook.profile_photo}})],1):o("v-list-item-avatar",[o("v-icon",{staticClass:"ma-0",attrs:{size:"36"}},[t._v("mdi-account-circle")])],1),t._v(" "),o("v-list-item-content",[o("v-list-item-title",[t.cook.username?o("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/"+t.cook.username}},[t._v("\n                    "+t._s(t.cook.username)+"\n                ")]):t._e()],1),t._v(" "),o("v-list-item-subtitle",[t._v(t._s(t.moment(this.cook.timestamp)))])],1),t._v(" "),o("v-list-item-action",[t.isAuthenticated&&t.loggedInUser.username==t.cook.username?o("v-menu",{attrs:{transition:"slide-y-transition","open-on-hover":"","offset-y":"",bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[o("div",t._g(t._b({},"div",r,!1),n),[o("v-icon",[t._v("mdi-dots-vertical")])],1)]}}],null,!1,684186491)},[t._v(" "),o("v-list",[o("v-list-item",{staticClass:"text-decoration-none pl-5 pr-8",on:{click:t.editcook}},[o("v-list-item-icon",[o("v-icon",[t._v("mdi-book-edit-outline")])],1),t._v(" "),o("v-list-item-title",[t._v("Edit")])],1),t._v(" "),o("v-list-item",{staticClass:"text-decoration-none pl-5 pr-8",on:{click:function(e){t.dialog=!0}}},[o("v-list-item-icon",[o("v-icon",[t._v("mdi-delete-outline")])],1),t._v(" "),o("v-list-item-title",[t._v("Delete")])],1)],1)],1):t._e()],1)],1),t._v(" "),o("div",{staticClass:"body-1 feed_content mb-2 mb-md-5 px-md-0 px-4"},[t._v(t._s(t.cook.lesson))]),t._v(" "),t.videoId?o("youtube",{attrs:{width:"100%",height:t.height,"video-id":t.videoId}}):o("video",{attrs:{id:"videoId",width:"100%",height:t.height,controls:"",playsinline:"",poster:t.cook.thumbjs,preload:"none",controlsList:"nodownload"}},[o("source",{attrs:{src:t.cook.video,type:"video/mp4"}}),t._v("\n            Your browser does not support the video tag.\n        ")]),t._v(" "),o("div",{staticClass:"px-4 px-md-0 my-1"},[t.cook.mention1?o("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/e1t1/"+t.cook.mention1.uuid}},[o("v-chip",{staticClass:"mr-1 mb-1 ",staticStyle:{cursor:"pointer"},attrs:{color:"black grey",dark:"",outlined:""}},[t.cook.mention1.teacher?o("v-avatar",{attrs:{left:""}},[o("v-img",{attrs:{src:t.cook.mention1.teacher.artist_metadata.thumb}})],1):t.cook.mention1.s_photo?o("v-avatar",{attrs:{left:""}},[o("v-img",{attrs:{src:t.cook.mention1.s_photo}})],1):o("v-avatar",{attrs:{left:""}},[o("v-icon",[t._v("mdi-account-circle")])],1),t._v("\n                "+t._s(t.cook.mention1.s_teacher_name)+"\n                ")],1)],1):t._e(),t._v(" "),t.cook.mention2?o("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/e1t1/"+t.cook.mention2.uuid}},[o("v-chip",{staticClass:"mr-1 mb-1 ",staticStyle:{cursor:"pointer"},attrs:{color:"black grey",dark:"",outlined:""}},[t.cook.mention2.teacher?o("v-avatar",{attrs:{left:""}},[o("v-img",{attrs:{src:t.cook.mention2.teacher.artist_metadata.thumb}})],1):t.cook.mention2.s_photo?o("v-avatar",{attrs:{left:""}},[o("v-img",{attrs:{src:t.cook.mention2.s_photo}})],1):o("v-avatar",{attrs:{left:""}},[o("v-icon",[t._v("mdi-account-circle")])],1),t._v("\n                "+t._s(t.cook.mention2.s_teacher_name)+"\n                ")],1)],1):t._e(),t._v(" "),t.cook.mention3?o("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/e1t1/"+t.cook.mention3.uuid}},[o("v-chip",{staticClass:"mr-1 mb-1 ",staticStyle:{cursor:"pointer"},attrs:{color:"black grey",dark:"",outlined:""}},[t.cook.mention3.teacher?o("v-avatar",{attrs:{left:""}},[o("v-img",{attrs:{src:t.cook.mention3.teacher.artist_metadata.thumb}})],1):t.cook.mention3.s_photo?o("v-avatar",{attrs:{left:""}},[o("v-img",{attrs:{src:t.cook.mention3.s_photo}})],1):o("v-avatar",{attrs:{left:""}},[o("v-icon",[t._v("mdi-account-circle")])],1),t._v("\n                "+t._s(t.cook.mention3.s_teacher_name)+"\n                ")],1)],1):t._e()],1),t._v(" "),o("div",{class:{"px-3":t.$vuetify.breakpoint.smAndDown},attrs:{align:"left",justify:"left"}},[o("div",{staticClass:"my-2 my-sm-3"},[o("v-row",[o("v-col",[o("v-btn",{attrs:{icon:""},on:{click:function(e){return t.react_like()}}},[t.cook_has_like?o("v-icon",{attrs:{color:"red"}},[t._v("mdi-heart")]):o("v-icon",[t._v("mdi-heart-outline")])],1),t._v(" "),t.like?o("span",{staticClass:"caption"},[t._v(t._s(t.like))]):t._e(),t._v(" "),o("v-btn",{attrs:{icon:""},on:{click:function(e){return t.react_dope()}}},[t.cook_has_dope?o("v-icon",{attrs:{color:"orange"}},[t._v("mdi-fire")]):o("v-icon",[t._v("mdi-fire")])],1),t._v(" "),t.dope?o("span",{staticClass:"caption"},[t._v(t._s(t.dope))]):t._e(),t._v(" "),o("v-btn",{attrs:{icon:""},on:{click:function(e){return t.react_info()}}},[t.cook_has_info?o("v-icon",{attrs:{color:"green"}},[t._v("mdi-head-flash-outline")]):o("v-icon",[t._v("mdi-head-flash-outline")])],1),t._v(" "),t.info?o("span",{staticClass:"caption"},[t._v(t._s(t.info))]):t._e()],1)],1),t._v(" "),o("v-dialog",{attrs:{width:"500"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-card",{staticClass:"pa-4"},[o("p",[t._v("Are you sure you want to delete the video?")]),t._v(" "),o("v-card-actions",[o("v-spacer"),t._v(" "),o("v-btn",{staticClass:"px-4 text-decoration-none",attrs:{small:"",color:"error",dark:"",loading:t.deleteLoading},on:{click:t.deleted}},[t._v("Delete")]),t._v(" "),o("v-btn",{staticClass:"px-4text-decoration-none",attrs:{small:"",color:"black",outlined:""},on:{click:function(e){t.dialog=!1}}},[t._v("\n                    Cancel\n                ")])],1)],1)],1),t._v(" "),o("v-row",{staticClass:"mt-5",attrs:{"no-gutters":""}},[t.isAuthenticated&&t.userHasPortfolio&&t.usersPortfolio.thumb?o("v-avatar",{attrs:{size:"36"}},[o("img",{attrs:{src:t.usersPortfolio.thumb,alt:"img"}})]):o("v-avatar",{attrs:{size:"36",color:"black"}},[o("v-icon",{attrs:{dark:""}},[t._v("\n                    mdi-account-circle\n                ")])],1),t._v(" "),t.isAuthenticated&&t.userHasPortfolio?o("v-text-field",{staticClass:"mx-4 my-0 pt-0",attrs:{label:"Share your thoughts"},model:{value:t.comments.comment,callback:function(e){t.$set(t.comments,"comment",e)},expression:"comments.comment"}}):o("v-text-field",{staticClass:"mx-4",attrs:{outlined:"",rows:"1","row-height":"12","max-width":"200",label:"Share your thoughts"},on:{click:function(e){t.login_snackbar=!0}}}),t._v(" "),t.isAuthenticated&&t.userHasPortfolio&&t.comments.comment?o("v-btn",{staticClass:"text-decoration-none mt-2",attrs:{small:"",dark:""},on:{click:function(e){return t.post_comment(t.cook.id)}}},[t._v("Post\n                ")]):t._e()],1),t._v(" "),o("div",{staticStyle:{"max-height":"168px","overflow-x":"hidden","overflow-y":"auto","text-align":"justify","margin-top":"-16px"}},[t.comment_array.length?o("v-row",{staticClass:"mt-0"},[o("learning-comments-card",{attrs:{comments:t.comment_array},on:{commentDelete:t.commentDelete}})],1):t._e()],1)],1)])],1),t._v(" "),o("v-divider",{staticClass:"my-4"}),t._v(" "),o("v-snackbar",{model:{value:t.valid_snackbar,callback:function(e){t.valid_snackbar=e},expression:"valid_snackbar"}},[t._v("\n    Write something to post.\n    ")]),t._v(" "),o("v-snackbar",{model:{value:t.login_snackbar,callback:function(e){t.login_snackbar=e},expression:"login_snackbar"}},[t._v("\n    Please sign in first.\n    ")]),t._v(" "),o("v-snackbar",{model:{value:t.thankyou_snackbar,callback:function(e){t.thankyou_snackbar=e},expression:"thankyou_snackbar"}},[t._v("\n    Thank you for sharing.\n    ")])],1)}),[],!1,null,"747cc7c2",null);e.a=component.exports;j()(component,{VAvatar:C.a,VBtn:$.a,VCard:I.a,VCardActions:V.a,VChip:A.a,VCol:D.a,VDialog:P.a,VDivider:F.a,VIcon:L.a,VImg:R.a,VList:S.a,VListItem:z.a,VListItemAction:U.a,VListItemAvatar:E.a,VListItemContent:H.a,VListItemIcon:T.a,VListItemSubtitle:H.b,VListItemTitle:H.c,VMenu:Y.a,VRow:M.a,VSnackbar:W.a,VSpacer:B.a,VTextField:J.a})},642:function(t,e,o){"use strict";o(11),o(9),o(7),o(6),o(8),o(66);var n=o(24),r=o(1),c=o(36),l=o(2),m=o.n(l);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var v={props:{comments:Array},data:function(){return{show:!1,report_snackbar:!1,delete_snackbar:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.c)(["loggedInUser","isAuthenticated"])),methods:{deleted:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var n;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return n={headers:{"content-type":"multipart/form-data",Authorization:e.$auth.strategy.token.get()}},o.prev=1,o.next=4,e.$axios.$delete("/v1/whatiscooking/cooking/comments/"+t.id,n);case 4:o.sent,e.$store.dispatch("check_cook_comments",t.cookingidobj),e.$emit("commentDelete"),e.delete_snackbar=!0,o.next=13;break;case 10:o.prev=10,o.t0=o.catch(1),console.log(o.t0.response);case 13:case"end":return o.stop()}}),o,null,[[1,10]])})))()},reported:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:({headers:{"content-type":"multipart/form-data",Authorization:"Bearer "+e.$store.state.auth.user.access}});try{e.report_snackbar=!0}catch(t){console.log(t)}case 2:case"end":return t.stop()}}),t)})))()},moment:function(t){return m()(t).fromNow()}}},k=o(20),_=o(23),h=o.n(_),f=o(598),x=o(128),y=o(191),w=o(129),O=o(192),j=o(17),C=o(198),$=o(609),I=o(610),component=Object(k.a)(v,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",[o("section",t._l(t.comments,(function(e,i){return o("div",{key:i,staticClass:"d-flex align-start"},[o("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/"+e.username}},[o("center",[e.artist_metadata.thumb?o("v-list-item-avatar",{attrs:{size:"36"}},[o("img",{attrs:{src:e.artist_metadata.thumb,alt:"img"}})]):o("v-list-item-avatar",{attrs:{color:"black",size:"36"}},[o("v-icon",{attrs:{dark:""}},[t._v("\n                mdi-account-circle\n              ")])],1)],1)],1),t._v(" "),o("div",{staticClass:"mb-2"},[o("p",{staticClass:"caption ma-0 pa-0 subtitle grey--text text-decoration-none"},[t._v(t._s(t.moment(e.timestamp)))]),t._v(" "),o("nuxt-link",{staticClass:"text-decoration-none d-inline",attrs:{to:"/"+e.username}},[t._v(t._s(e.username)+": ")]),o("span",{staticClass:"font-weight-light"},[t._v(" "+t._s(e.comment))])],1),t._v(" "),o("v-spacer"),t._v(" "),t.isAuthenticated&&e.username==t.loggedInUser.username?o("v-menu",{attrs:{transition:"slide-y-transition","open-on-hover":"","offset-y":"",bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[o("div",t._g(t._b({},"div",r,!1),n),[o("v-icon",[t._v("mdi-dots-vertical")])],1)]}}],null,!0)},[t._v(" "),o("v-list",[e.username==t.loggedInUser.username?o("v-list-item",{staticClass:"text-decoration-none pl-6 pr-12",attrs:{color:"error"},on:{click:function(o){return t.deleted(e)}}},[o("v-list-item-title",[t._v("Delete")])],1):t._e()],1)],1):t._e()],1)})),0),t._v(" "),o("v-snackbar",{model:{value:t.delete_snackbar,callback:function(e){t.delete_snackbar=e},expression:"delete_snackbar"}},[t._v("\n      Your comment is deleted.\n  ")]),t._v(" "),o("v-snackbar",{model:{value:t.report_snackbar,callback:function(e){t.report_snackbar=e},expression:"report_snackbar"}},[t._v("\n      We have reported this comment.\n  ")])],1)}),[],!1,null,"4a3b19b6",null);e.a=component.exports;h()(component,{VContainer:f.a,VIcon:x.a,VList:y.a,VListItem:w.a,VListItemAvatar:O.a,VListItemTitle:j.c,VMenu:C.a,VSnackbar:$.a,VSpacer:I.a})},651:function(t,e,o){var content=o(687);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(13).default)("66794b58",content,!0,{sourceMap:!1})},686:function(t,e,o){"use strict";o(651)},687:function(t,e,o){(e=o(12)(!1)).push([t.i,".v-text-field__details[data-v-747cc7c2]{display:none!important}.feed_content[data-v-747cc7c2]{max-height:146px;overflow:auto}",""]),t.exports=e}}]);