(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{611:function(t,e,o){t.exports=o.p+"img/gebbleslogo3.ad38897.png"},613:function(t,e,o){"use strict";o(25);var n={computed:{card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 166}}}},r=o(20),c=o(23),l=o.n(c),d=o(599),component=Object(r.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("v-skeleton-loader",{staticClass:"ma-md-2 ma-1",attrs:{loading:!0,transition:"fade-transition","max-height":this.card_height,width:this.card_width,type:"card"}})}),[],!1,null,null,null);e.a=component.exports;l()(component,{VSkeletonLoader:d.a})},629:function(t,e,o){var content=o(653);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(13).default)("703df84c",content,!0,{sourceMap:!1})},652:function(t,e,o){"use strict";o(629)},653:function(t,e,o){(e=o(12)(!1)).push([t.i,".width[data-v-4d773bf3]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-4d773bf3]{max-width:177px;font-size:.8rem!important}@media only screen and (max-width:960px){.width[data-v-4d773bf3]{width:80px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-4d773bf3]{max-width:80px;font-size:.6rem!important}}",""]),t.exports=e},676:function(t,e,o){var content=o(716);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(13).default)("4ca35d89",content,!0,{sourceMap:!1})},677:function(t,e,o){var content=o(718);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(13).default)("7cf01806",content,!0,{sourceMap:!1})},678:function(t,e,o){"use strict";o(25);var n=o(609),r=o(619),c=o(620),l=o(58),d=o(628),h={name:"TeachersCard",props:{e1t1:Object},data:function(){return{dialog:!1,videoId:"",cook:{},loadingCooking:!1}},components:{CountryFlag:n.a,Youtube:r.Youtube,CookingFeed:d.a},methods:{showCooking:function(){var t=this;this.loadingCooking=!0,this.videoId=Object(c.a)(this.e1t1.te_latest_cooking_yt_link),this.dialog=!0;var e={headers:{"content-type":"multipart/form-data",Authorization:this.$auth.strategy.token.get()}};l.a.getWhatsCookingId(this.e1t1.te_latest_cooking_uuid).then((function(o){if(t.loadingCooking=!1,t.cook=o.data,!t.e1t1.te_latest_cooking_watched){var n=new FormData;n.append("te_latest_cooking_watched",!0),n.append("id",t.e1t1.id),t.$axios.$patch("/v1/e1t1/sharing/watched/"+t.e1t1.uuid,n,e).then((function(e){console.log(e),t.e1t1.te_latest_cooking_watched=!t.e1t1.te_latest_cooking_watched}))}})).catch((function(e){t.loadingCooking=!1,console.log(e)}))},goToE1t1:function(t){this.$router.push("/e1t1/"+t)}},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}},height:function(){switch(this.$vuetify.breakpoint.name){case"xs":return 220;case"sm":case"md":case"lg":case"xl":return 410}}}},v=(o(652),o(20)),m=o(23),_=o.n(m),f=o(585),w=o(197),k=o(70),x=o(595),y=o(601),C=o(622),$=o(128),S=o(166),j=o(597),O=o(599),V=o(606),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var r=e.hover;return[n("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-view":"",elevation:r?6:0,outlined:"",width:t.card_width,"max-height":t.card_height},on:{click:function(e){return t.goToE1t1(t.e1t1.uuid)}}},[t.e1t1.image_mini?n("v-img",{attrs:{src:t.e1t1.image_mini,"lazy-src":t.e1t1.image_mini,height:t.img_height,width:t.card_width}},[t.e1t1.te_latest_cooking_uuid?n("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.e1t1.te_latest_cooking_watched?n("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):n("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1):n("v-img",{attrs:{src:o(611),height:t.img_height,width:t.card_width,contain:""}},[t.e1t1.te_latest_cooking_uuid?n("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.e1t1.te_latest_cooking_watched?n("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):n("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1),t._v(" "),n("v-card-actions",{attrs:{height:"32px"}},[n("div",{staticClass:"text-decoration-none caption width"},[n("p",{staticClass:"event_p"},[t._v(t._s(t.e1t1.s_teacher_name)+" ")])]),t._v(" "),n("v-spacer"),t._v(" "),n("country-flag",{attrs:{country:t.e1t1.s_teacher_country,size:"small"}})],1)],1)]}}])}),t._v(" "),n("v-dialog",{attrs:{"retain-focus":!1,width:"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-container",{staticClass:"rounded-lg white pa-2 pa-md-4"},[n("v-row",{staticClass:"ma-1 ma-md-0",attrs:{align:"end",justify:"end"}},[n("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[n("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),t.loadingCooking?n("div",[n("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}}),t._v(" "),t.videoId?n("youtube",{attrs:{width:"100%",height:t.height,"video-id":t.videoId}}):t._e(),t._v(" "),n("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}})],1):n("CookingFeed",{attrs:{cook:t.cook}})],1)],1)],1)}),[],!1,null,"4d773bf3",null);e.a=component.exports;_()(component,{VBtn:f.a,VCard:w.a,VCardActions:k.a,VContainer:x.a,VDialog:y.a,VHover:C.a,VIcon:$.a,VImg:S.a,VRow:j.a,VSkeletonLoader:O.a,VSpacer:V.a})},715:function(t,e,o){"use strict";o(676)},716:function(t,e,o){(e=o(12)(!1)).push([t.i,".width[data-v-1394e210]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-1394e210]{max-width:177px;font-size:.8rem!important}@media only screen and (max-width:960px){.width[data-v-1394e210]{width:80px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-1394e210]{max-width:80px;font-size:.6rem!important}}",""]),t.exports=e},717:function(t,e,o){"use strict";o(677)},718:function(t,e,o){(e=o(12)(!1)).push([t.i,".width[data-v-ee5d5d32]{max-width:670px}@media only screen and (max-width:960px){.width[data-v-ee5d5d32]{max-width:357px}}",""]),t.exports=e},724:function(t,e,o){"use strict";o(10),o(9),o(8),o(39),o(113),o(7),o(6);var n=o(27),r=(o(66),o(24)),c=o(1),l=o(58),d=(o(25),o(609)),h=o(619),v=o(620),m=o(628),_={name:"StudentsCard",props:{share:Object},data:function(){return{dialog:!1,approveDialog:!1,videoId:"",cook:{},loadingCooking:!1,approveLoading:!1}},components:{CountryFlag:d.a,Youtube:h.Youtube,CookingFeed:m.a},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}},height:function(){switch(this.$vuetify.breakpoint.name){case"xs":return 220;case"sm":case"md":case"lg":case"xl":return 410}}},methods:{showCooking:function(){var t=this;this.loadingCooking=!0,this.videoId=Object(v.a)(this.share.st_latest_cooking_yt_link),this.dialog=!0;var e={headers:{"content-type":"multipart/form-data",Authorization:this.$auth.strategy.token.get()}};l.a.getWhatsCookingId(this.share.st_latest_cooking_uuid).then((function(o){if(t.loadingCooking=!1,t.cook=o.data,!t.share.st_latest_cooking_watched){var n=new FormData;n.append("st_latest_cooking_watched",!0),n.append("id",t.share.id),t.$axios.$patch("/v1/e1t1/sharing/watched/"+t.share.uuid,n,e).then((function(e){console.log(e),t.share.st_latest_cooking_watched=!t.share.st_latest_cooking_watched}))}})).catch((function(e){t.loadingCooking=!1,console.log(e)}))},goToE1t1:function(t){this.$router.push("/e1t1/"+t)},approveAsStudent:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.approveLoading=!0,o={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}};try{(n=new FormData).append("is_approved",!0),n.append("id",t.share.id),t.$axios.$patch("/v1/e1t1/sharing/watched/"+t.share.uuid,n,o).then((function(e){console.log(e),t.approveDialog=!1,t.approveLoading=!1,t.share.is_approved=!t.share.is_approved}))}catch(e){t.approveDialog=!1,t.approveLoading=!1,console.log(e.response)}case 3:case"end":return e.stop()}}),e)})))()}}},f=(o(715),o(20)),w=o(23),k=o.n(w),x=o(585),y=o(197),C=o(70),$=o(595),S=o(601),j=o(622),O=o(128),V=o(166),A=o(597),L=o(599),D=o(606),component=Object(f.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var r=e.hover;return[n("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-views":"",elevation:r?6:0,outlined:"",width:t.card_width,"max-height":t.card_height},on:{click:function(e){return t.goToE1t1(t.share.uuid)}}},[t.share.image_mini?n("v-img",{attrs:{src:t.share.image_mini,height:t.img_height,width:t.card_width}},[t.share.is_approved?t._e():n("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){e.stopPropagation(),t.approveDialog=!0}}},[n("v-icon",{attrs:{color:"red"}},[t._v("mdi-check-circle-outline")])],1),t._v(" "),t.share.st_latest_cooking_uuid?n("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.share.st_latest_cooking_watched?n("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):n("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1):n("v-img",{attrs:{src:o(611),height:t.img_height,width:t.card_width,contain:""}},[t.share.is_approved?t._e():n("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){e.stopPropagation(),t.approveDialog=!0}}},[n("v-icon",{attrs:{color:"red"}},[t._v("mdi-check-circle-outline")])],1),t._v(" "),t.share.st_latest_cooking_uuid?n("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.share.st_latest_cooking_watched?n("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):n("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1),t._v(" "),n("v-card-actions",{attrs:{height:"32px"}},[n("div",{staticClass:"text-decoration-none caption width"},[n("p",{staticClass:"event_p"},[t._v(t._s(t.share.username))])]),t._v(" "),n("v-spacer"),t._v(" "),n("country-flag",{attrs:{country:t.share.s_student_country,size:"small"}})],1)],1)]}}])}),t._v(" "),n("v-dialog",{attrs:{"retain-focus":!1,width:"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-container",{staticClass:"rounded-lg white pa-2 pa-md-4"},[n("v-row",{staticClass:"ma-1 ma-md-0",attrs:{align:"end",justify:"end"}},[n("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[n("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),t.loadingCooking?n("div",[n("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}}),t._v(" "),t.videoId?n("youtube",{attrs:{width:"100%",height:t.height,"video-id":t.videoId}}):t._e(),t._v(" "),n("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}})],1):n("CookingFeed",{attrs:{cook:t.cook}})],1)],1),t._v(" "),n("v-dialog",{attrs:{width:"500",persistent:""},model:{value:t.approveDialog,callback:function(e){t.approveDialog=e},expression:"approveDialog"}},[n("v-card",{staticClass:"pa-6"},[n("p",[t._v("Do you want to approve this shoutout?")]),n("small",[t._v("Approving the shoutout will give them access to view your Each one Teach one posts.")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"px-4 text-decoration-none",attrs:{small:"",color:"error",dark:"",loading:t.approveLoading},on:{click:t.approveAsStudent}},[t._v("Approve")]),t._v(" "),n("v-btn",{staticClass:"px-4text-decoration-none",attrs:{small:"",color:"black",outlined:""},on:{click:function(e){t.approveDialog=!1}}},[t._v("\n              Cancel\n          ")])],1)],1)],1)],1)}),[],!1,null,"1394e210",null),I=component.exports;k()(component,{VBtn:x.a,VCard:y.a,VCardActions:C.a,VContainer:$.a,VDialog:S.a,VHover:j.a,VIcon:O.a,VImg:V.a,VRow:A.a,VSkeletonLoader:L.a,VSpacer:D.a});var T=o(678),z=o(35),E=o(613);function P(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var F={middleware:"check_auth",props:["artist"],components:{StudentsCard:I,TeachersCard:T.a,CardSkeletonLoader:E.a},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?P(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):P(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(z.c)(["isAuthenticated","loggedInUser","usersTeachers","userHasTeachers"])),methods:{getsharing:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.accessAllowed=!0,"id",o={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},console.log("get sharing",t.$auth.strategy.token.get()),e.prev=4,e.next=7,l.a.getEach1Teach1_teachers(o);case 7:return n=e.sent,e.next=10,l.a.getEach1Teach1_students(o);case 10:r=e.sent,t.teachers=n.data.results,t.students=r.data.results,t.teachers_page=n.data.next,t.students_page=r.data.next,t.firstLoad=!1,e.next=22;break;case 18:e.prev=18,e.t0=e.catch(4),console.log(e.t0),t.firstLoad=!1;case 22:case"end":return e.stop()}}),e,null,[[4,18]])})))()},getOtherSharing:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.accessAllowed=!0,o={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.prev=2,e.next=5,l.a.getOthersSharing(t.artist.username,o);case 5:n=e.sent,t.teachers=n.data.results,t.teachers_page=n.data.next,t.studentAccess=!0,t.firstLoad=!1,e.next=17;break;case 12:e.prev=12,e.t0=e.catch(2),console.log(e.t0.response),"Authentication credentials were not provided."==e.t0.response.data.detail&&(t.accessAllowed=!1),t.firstLoad=!1;case 17:case"end":return e.stop()}}),e,null,[[2,12]])})))()},infiniteScrollingTeacher:function(t,e,o){var r=this;if(this.teachers_page){this.$axios.get(this.teachers_page).then((function(t){r.teachers_page=t.data.next,t.data.results.forEach((function(t){return r.teachers.push(t)})),r.teachers=Object(n.a)(new Map(r.teachers.map((function(t){return[t.id,t]}))).values())})).catch((function(t){console.log(t)}))}},infiniteScrollingStudents:function(t,e,o){var r=this;if(this.students_page){this.$axios.get(this.students_page).then((function(t){r.students_page=t.data.next,t.data.results.forEach((function(t){return r.students.push(t)})),r.students=Object(n.a)(new Map(r.students.map((function(t){return[t.id,t]}))).values())})).catch((function(t){console.log(t)}))}}},created:function(){this.$auth.strategy.token.get()||(console.log("logged out"),this.$store.dispatch("remove_portfolio"),this.$store.dispatch("remove_bio"),this.$store.dispatch("remove_teachers"),this.$store.dispatch("remove_share_obj"),this.$store.dispatch("remove_editing_obj"),this.$store.dispatch("remove_learnings"),this.$store.dispatch("remove_notifications"),this.$store.dispatch("remove_cook_reactions"),this.$store.dispatch("remove_journey"),this.$store.dispatch("remove_page"),localStorage.clear(),this.$auth.strategy.token.reset(),this.$auth.logout()),this.artist.username==this.loggedInUser.username?this.getsharing():this.getOtherSharing()},data:function(){return{teachers_page:"",students_page:"",teachers:[],students:[],looploader:[1,1,1,1,1,1,1,1,1],loading:!0,firstLoad:!0,accessAllowed:!1,studentAccess:!1}}},R=(o(717),o(605)),M=o(855),N=o(856),Y=o(889),B=o(205),H=o.n(B),W=o(84),J=Object(f.a)(F,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.accessAllowed?n("v-tabs",{staticClass:"width mx-auto background",attrs:{centered:""}},[n("v-tab",[n("p",{staticClass:"font-weight-light pl-2 mb-0",staticStyle:{"text-transform":"capitalize","font-size":"14px"}},[t._v("Learning")]),t._v(" "),n("p",{staticClass:"font-weight-light ma-0",staticStyle:{"font-size":"10px","text-transform":"lowercase"}},[t._v("(each one)")])]),t._v(" "),t.studentAccess?t._e():n("v-tab",[n("p",{staticClass:"font-weight-light pl-2 mb-0",staticStyle:{"text-transform":"capitalize","font-size":"14px"}},[t._v("Sharing")]),t._v(" "),n("p",{staticClass:"font-weight-light  ma-0",staticStyle:{"text-transform":"lowercase","font-size":"10px"}},[t._v("(teach one)")])]),t._v(" "),t.firstLoad?n("v-tab-item",{staticClass:"background"},[n("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[n("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists "),n("b",[t._v(t._s(t.artist.username))]),t._v(" gave a shoutout to")],1),t._v(" "),n("v-layout",{staticClass:"py-2 background",attrs:{wrap:"",row:"","justify-start":""}},t._l(this.looploader,(function(t){return n("div",{key:t.index},[n("card-skeleton-loader")],1)})),0)],1):n("v-tab-item",{staticClass:"background"},[n("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[n("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists "),n("b",[t._v(t._s(t.artist.username))]),t._v(" gave a shoutout to")],1),t._v(" "),t.teachers.length?n("div",[n("v-layout",{staticClass:"py-2 background",attrs:{wrap:"","justify-start":""}},t._l(t.teachers,(function(t){return n("div",{key:t.index},[n("TeachersCard",{attrs:{e1t1:t}})],1)})),0)],1):t._e(),t._v(" "),t.teachers.length||t.firstLoad?t._e():n("center",[n("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:o(110)}}),t._v(" "),n("h4",[t._v("No posts yet. ")])]),t._v(" "),n("v-card",{directives:[{name:"intersect",rawName:"v-intersect",value:t.infiniteScrollingTeacher,expression:"infiniteScrollingTeacher"}],staticClass:"background"})],1),t._v(" "),t.firstLoad?n("v-tab-item",{staticClass:"background"},[n("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[n("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists that gave "),n("b",[t._v(t._s(t.artist.username))]),t._v(" a shoutout")],1),t._v(" "),n("v-layout",{staticClass:"py-2 background",attrs:{wrap:"",row:"","justify-start":""}},t._l(this.looploader,(function(t){return n("div",{key:t.index},[n("v-skeleton-loader")],1)})),0)],1):n("v-tab-item",{staticClass:"background"},[n("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[n("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists that gave "),n("b",[t._v(t._s(t.artist.username))]),t._v(" a shoutout")],1),t._v(" "),t.students.length?n("div",[n("v-layout",{staticClass:"py-2 background",attrs:{wrap:"","justify-start":""}},t._l(t.students,(function(t){return n("div",{key:t.index},[n("StudentsCard",{attrs:{share:t}})],1)})),0)],1):t._e(),t._v(" "),t.students.length||t.firstLoad?t._e():n("center",[n("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:o(110)}}),t._v(" "),n("h4",[t._v("No posts yet. ")])]),t._v(" "),n("v-card",{directives:[{name:"intersect",rawName:"v-intersect",value:t.infiniteScrollingStudents,expression:"infiniteScrollingStudents"}],staticClass:"background"})],1)],1):n("div",[n("center",[n("v-icon",[t._v("mdi-lock")]),t._v("\n        Access is not allowed."),n("br"),n("br"),t._v("\n        To view their each 1 teach 1, you need to give a shoutout and wait for approval.\n    ")],1)],1)}),[],!1,null,"ee5d5d32",null);e.a=J.exports;k()(J,{VCard:y.a,VIcon:O.a,VLayout:R.a,VSkeletonLoader:L.a,VTab:M.a,VTabItem:N.a,VTabs:Y.a}),H()(J,{Intersect:W.a})},936:function(t,e,o){"use strict";o.r(e);var n=o(210),r=o(724),c={middleware:"check_auth",props:["artist"],components:{LeftNavigation:n.a,LearnShare:r.a},head:function(){return{title:this.artist.username,meta:[{hid:"description",name:"description",content:"What you need to know about this artist #"+this.artist.username}]}},methods:{goback:function(){window.history.back()}}},l=o(20),d=o(23),h=o.n(d),v=o(593),m=o(585),_=o(595),f=o(128),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("left-navigation"),t._v(" "),o("v-container",{staticClass:"pa-0 background",staticStyle:{"max-width":"670px"}},[o("v-btn",{staticClass:"elevation-0 mt-1 ",staticStyle:{"margin-left":"-6px"},attrs:{icon:""},on:{click:function(e){return t.goback()}}},[o("v-icon",{staticClass:"float-left"},[t._v("mdi-arrow-left")])],1),t._v(" "),o("LearnShare",{attrs:{artist:t.artist}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VApp:v.a,VBtn:m.a,VContainer:_.a,VIcon:f.a})}}]);