(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{611:function(t,e,n){t.exports=n.p+"img/gebbleslogo3.ad38897.png"},612:function(t,e,n){"use strict";n(25);var o={computed:{card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 166}}}},r=n(20),c=n(23),l=n.n(c),d=n(599),component=Object(r.a)(o,(function(){var t=this.$createElement;return(this._self._c||t)("v-skeleton-loader",{staticClass:"ma-md-2 ma-1",attrs:{loading:!0,transition:"fade-transition","max-height":this.card_height,width:this.card_width,type:"card"}})}),[],!1,null,null,null);e.a=component.exports;l()(component,{VSkeletonLoader:d.a})},629:function(t,e,n){var content=n(653);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("08375fe6",content,!0,{sourceMap:!1})},652:function(t,e,n){"use strict";n(629)},653:function(t,e,n){(e=n(12)(!1)).push([t.i,".width[data-v-1fa9dfa8]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-1fa9dfa8]{max-width:177px;font-size:.8rem!important}.pointer[data-v-1fa9dfa8]{cursor:pointer}@media only screen and (max-width:960px){.width[data-v-1fa9dfa8]{width:80px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-1fa9dfa8]{max-width:80px;font-size:.6rem!important}}",""]),t.exports=e},676:function(t,e,n){var content=n(716);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("4f7c880a",content,!0,{sourceMap:!1})},677:function(t,e,n){var content=n(718);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("0c0d6024",content,!0,{sourceMap:!1})},678:function(t,e,n){"use strict";n(25);var o=n(609),r=n(619),c=n(620),l=n(58),d=n(628),h={name:"TeachersCard",props:{e1t1:Object},data:function(){return{dialog:!1,videoId:"",cook:{},loadingCooking:!1}},components:{CountryFlag:o.a,Youtube:r.Youtube,CookingFeed:d.a},methods:{showCooking:function(){var t=this;this.loadingCooking=!0,this.videoId=Object(c.a)(this.e1t1.te_latest_cooking_yt_link),this.dialog=!0;var e={headers:{"content-type":"multipart/form-data",Authorization:this.$auth.strategy.token.get()}};l.a.getWhatsCookingId(this.e1t1.te_latest_cooking_uuid).then((function(n){if(t.loadingCooking=!1,t.cook=n.data,!t.e1t1.te_latest_cooking_watched){var o=new FormData;o.append("te_latest_cooking_watched",!0),o.append("id",t.e1t1.id),t.$axios.$patch("/v1/e1t1/sharing/watched/"+t.e1t1.uuid,o,e).then((function(e){console.log(e),t.e1t1.te_latest_cooking_watched=!t.e1t1.te_latest_cooking_watched}))}})).catch((function(e){t.loadingCooking=!1,console.log(e)}))},goToE1t1:function(t){this.$router.push("/e1t1/"+t)}},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}},height:function(){switch(this.$vuetify.breakpoint.name){case"xs":return 220;case"sm":case"md":case"lg":case"xl":return 410}}}},v=(n(652),n(20)),m=n(23),_=n.n(m),f=n(585),w=n(197),k=n(70),x=n(595),y=n(601),C=n(621),$=n(128),S=n(166),O=n(597),j=n(599),V=n(606),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var r=e.hover;return[o("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-view":"",elevation:r?6:0,outlined:"",width:t.card_width,"max-height":t.card_height}},[t.e1t1.image_mini?o("v-img",{staticClass:"pointer",attrs:{src:t.e1t1.image_mini,"lazy-src":t.e1t1.image_mini,height:t.img_height,width:t.card_width},on:{click:function(e){return t.goToE1t1(t.e1t1.uuid)}}},[t.e1t1.te_latest_cooking_uuid?o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.e1t1.te_latest_cooking_watched?o("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):o("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1):o("v-img",{staticClass:"pointer",attrs:{src:n(611),height:t.img_height,width:t.card_width,contain:""},on:{click:function(e){return t.goToE1t1(t.e1t1.uuid)}}},[t.e1t1.te_latest_cooking_uuid&&!t.e1t1.te_latest_cooking_watched?o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[o("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1),t._v(" "),o("v-card-actions",{attrs:{height:"32px"}},[o("div",{staticClass:"caption width"},[t.e1t1.teacher?o("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/"+t.e1t1.s_teacher_name}},[o("p",{staticClass:"event_p"},[t._v(t._s(t.e1t1.s_teacher_name)+" ")])]):o("p",{staticClass:"event_p"},[t._v(t._s(t.e1t1.s_teacher_name)+" ")])],1),t._v(" "),o("v-spacer"),t._v(" "),o("country-flag",{attrs:{country:t.e1t1.s_teacher_country,size:"small"}})],1)],1)]}}])}),t._v(" "),o("v-dialog",{attrs:{"retain-focus":!1,width:"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-container",{staticClass:"rounded-lg white pa-2 pa-md-4"},[o("v-row",{staticClass:"ma-1 ma-md-0",attrs:{align:"end",justify:"end"}},[o("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[o("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),t.loadingCooking?o("div",[o("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}}),t._v(" "),o("v-skeleton-loader",{attrs:{type:"card",width:"100%"}}),t._v(" "),o("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}})],1):o("CookingFeed",{attrs:{cook:t.cook}})],1)],1)],1)}),[],!1,null,"1fa9dfa8",null);e.a=component.exports;_()(component,{VBtn:f.a,VCard:w.a,VCardActions:k.a,VContainer:x.a,VDialog:y.a,VHover:C.a,VIcon:$.a,VImg:S.a,VRow:O.a,VSkeletonLoader:j.a,VSpacer:V.a})},715:function(t,e,n){"use strict";n(676)},716:function(t,e,n){(e=n(12)(!1)).push([t.i,".width[data-v-994d6dfc]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-994d6dfc]{max-width:177px;font-size:.8rem!important}@media only screen and (max-width:960px){.width[data-v-994d6dfc]{width:80px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-994d6dfc]{max-width:80px;font-size:.6rem!important}}",""]),t.exports=e},717:function(t,e,n){"use strict";n(677)},718:function(t,e,n){(e=n(12)(!1)).push([t.i,".width[data-v-4e64172a]{max-width:670px}@media only screen and (max-width:960px){.width[data-v-4e64172a]{max-width:357px}}",""]),t.exports=e},724:function(t,e,n){"use strict";n(10),n(9),n(8),n(39),n(113),n(7),n(6);var o=n(27),r=(n(66),n(24)),c=n(1),l=n(58),d=(n(25),n(609)),h=n(619),v=n(620),m=n(628),_={name:"StudentsCard",props:{share:Object},data:function(){return{dialog:!1,approveDialog:!1,videoId:"",cook:{},loadingCooking:!1,approveLoading:!1}},components:{CountryFlag:d.a,Youtube:h.Youtube,CookingFeed:m.a},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}},height:function(){switch(this.$vuetify.breakpoint.name){case"xs":return 220;case"sm":case"md":case"lg":case"xl":return 410}}},methods:{showCooking:function(){var t=this;this.loadingCooking=!0,this.videoId=Object(v.a)(this.share.st_latest_cooking_yt_link),this.dialog=!0;var e={headers:{"content-type":"multipart/form-data",Authorization:this.$auth.strategy.token.get()}};l.a.getWhatsCookingId(this.share.st_latest_cooking_uuid).then((function(n){if(t.loadingCooking=!1,t.cook=n.data,!t.share.st_latest_cooking_watched){var o=new FormData;o.append("st_latest_cooking_watched",!0),o.append("id",t.share.id),t.$axios.$patch("/v1/e1t1/sharing/watched/"+t.share.uuid,o,e).then((function(e){console.log(e),t.share.st_latest_cooking_watched=!t.share.st_latest_cooking_watched}))}})).catch((function(e){t.loadingCooking=!1,console.log(e)}))},goToE1t1:function(t){this.$router.push("/e1t1/"+t)},approveAsStudent:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.approveLoading=!0,n={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}};try{(o=new FormData).append("is_approved",!0),o.append("id",t.share.id),t.$axios.$patch("/v1/e1t1/sharing/watched/"+t.share.uuid,o,n).then((function(e){console.log(e),t.approveDialog=!1,t.approveLoading=!1,t.share.is_approved=!t.share.is_approved}))}catch(e){t.approveDialog=!1,t.approveLoading=!1,console.log(e.response)}case 3:case"end":return e.stop()}}),e)})))()}}},f=(n(715),n(20)),w=n(23),k=n.n(w),x=n(585),y=n(197),C=n(70),$=n(595),S=n(601),O=n(621),j=n(128),V=n(166),A=n(597),L=n(599),D=n(606),component=Object(f.a)(_,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var r=e.hover;return[o("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-views":"",elevation:r?6:0,outlined:"",width:t.card_width,"max-height":t.card_height}},[t.share.image_mini?o("v-img",{attrs:{src:t.share.image_mini,height:t.img_height,width:t.card_width},on:{click:function(e){return t.goToE1t1(t.share.uuid)}}},[t.share.is_approved?t._e():o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){e.stopPropagation(),t.approveDialog=!0}}},[o("v-icon",{attrs:{color:"red"}},[t._v("mdi-check-circle-outline")])],1),t._v(" "),t.share.st_latest_cooking_uuid?o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.share.st_latest_cooking_watched?o("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):o("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1):o("v-img",{attrs:{src:n(611),height:t.img_height,width:t.card_width,contain:""},on:{click:function(e){return t.goToE1t1(t.share.uuid)}}},[t.share.is_approved?t._e():o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){e.stopPropagation(),t.approveDialog=!0}}},[o("v-icon",{attrs:{color:"red"}},[t._v("mdi-check-circle-outline")])],1),t._v(" "),t.share.st_latest_cooking_uuid&&!t.share.st_latest_cooking_watched?o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[o("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1),t._v(" "),o("v-card-actions",{attrs:{height:"32px"}},[o("div",{staticClass:"caption width"},[t.share.username?o("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/"+t.share.username}},[o("p",{staticClass:"event_p"},[t._v(t._s(t.share.username)+" ")])]):o("p",{staticClass:"event_p"},[t._v(t._s(t.share.username)+" ")])],1),t._v(" "),o("v-spacer"),t._v(" "),o("country-flag",{attrs:{country:t.share.s_student_country,size:"small"}})],1)],1)]}}])}),t._v(" "),o("v-dialog",{attrs:{"retain-focus":!1,width:"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-container",{staticClass:"rounded-lg white pa-2 pa-md-4"},[o("v-row",{staticClass:"ma-1 ma-md-0",attrs:{align:"end",justify:"end"}},[o("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[o("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),t.loadingCooking?o("div",[o("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}}),t._v(" "),o("v-skeleton-loader",{attrs:{type:"card",width:"100%"}}),t._v(" "),o("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}})],1):o("CookingFeed",{attrs:{cook:t.cook}})],1)],1),t._v(" "),o("v-dialog",{attrs:{width:"500",persistent:""},model:{value:t.approveDialog,callback:function(e){t.approveDialog=e},expression:"approveDialog"}},[o("v-card",{staticClass:"pa-6"},[o("p",[t._v("Do you want to approve this shoutout?")]),o("small",[t._v("Approving the shoutout will give them access to view your Each one Teach one posts.")]),t._v(" "),o("v-card-actions",[o("v-spacer"),t._v(" "),o("v-btn",{staticClass:"px-4 text-decoration-none",attrs:{small:"",color:"error",dark:"",loading:t.approveLoading},on:{click:t.approveAsStudent}},[t._v("Approve")]),t._v(" "),o("v-btn",{staticClass:"px-4text-decoration-none",attrs:{small:"",color:"black",outlined:""},on:{click:function(e){t.approveDialog=!1}}},[t._v("\n              Cancel\n          ")])],1)],1)],1)],1)}),[],!1,null,"994d6dfc",null),T=component.exports;k()(component,{VBtn:x.a,VCard:y.a,VCardActions:C.a,VContainer:$.a,VDialog:S.a,VHover:O.a,VIcon:j.a,VImg:V.a,VRow:A.a,VSkeletonLoader:L.a,VSpacer:D.a});var z=n(678),E=n(35),I=n(612);function P(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var F={middleware:"check_auth",props:["artist"],components:{StudentsCard:T,TeachersCard:z.a,CardSkeletonLoader:I.a},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?P(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):P(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(E.c)(["isAuthenticated","loggedInUser","usersTeachers","userHasTeachers"])),methods:{getsharing:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.accessAllowed=!0,"id",n={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.prev=3,e.next=6,l.a.getEach1Teach1_teachers(n);case 6:return o=e.sent,e.next=9,l.a.getEach1Teach1_students(n);case 9:r=e.sent,t.teachers=o.data.results,t.students=r.data.results,t.teachers_page=o.data.next,t.students_page=r.data.next,t.firstLoad=!1,e.next=21;break;case 17:e.prev=17,e.t0=e.catch(3),console.log(e.t0),t.firstLoad=!1;case 21:case"end":return e.stop()}}),e,null,[[3,17]])})))()},getOtherSharing:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.accessAllowed=!0,n={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.prev=2,e.next=5,l.a.getOthersSharing(t.artist.username,n);case 5:o=e.sent,t.teachers=o.data.results,t.teachers_page=o.data.next,t.studentAccess=!0,t.firstLoad=!1,e.next=18;break;case 12:e.prev=12,e.t0=e.catch(2),console.log(e.t0.response),"Authentication credentials were not provided."!=e.t0.response.data.detail&&"You do not have permission to perform this action."!=e.t0.response.data.detail||(t.accessAllowed=!1),t.studentAccess=!0,t.firstLoad=!1;case 18:case"end":return e.stop()}}),e,null,[[2,12]])})))()},infiniteScrollingTeacher:function(t,e,n){var r=this;if(this.teachers_page){this.$axios.get(this.teachers_page).then((function(t){r.teachers_page=t.data.next,t.data.results.forEach((function(t){return r.teachers.push(t)})),r.teachers=Object(o.a)(new Map(r.teachers.map((function(t){return[t.id,t]}))).values())})).catch((function(t){console.log(t)}))}},infiniteScrollingStudents:function(t,e,n){var r=this;if(this.students_page){this.$axios.get(this.students_page).then((function(t){r.students_page=t.data.next,t.data.results.forEach((function(t){return r.students.push(t)})),r.students=Object(o.a)(new Map(r.students.map((function(t){return[t.id,t]}))).values())})).catch((function(t){console.log(t)}))}}},created:function(){this.$auth.strategy.token.get()||(console.log("logged out"),this.$store.dispatch("remove_portfolio"),this.$store.dispatch("remove_bio"),this.$store.dispatch("remove_teachers"),this.$store.dispatch("remove_share_obj"),this.$store.dispatch("remove_editing_obj"),this.$store.dispatch("remove_learnings"),this.$store.dispatch("remove_notifications"),this.$store.dispatch("remove_cook_reactions"),this.$store.dispatch("remove_journey"),this.$store.dispatch("remove_page"),localStorage.clear(),this.$auth.strategy.token.reset(),this.$auth.logout()),this.artist.username==this.loggedInUser.username?this.getsharing():this.getOtherSharing()},data:function(){return{teachers_page:"",students_page:"",teachers:[],students:[],looploader:[1,1,1,1,1,1,1,1,1],loading:!0,firstLoad:!0,accessAllowed:!1,studentAccess:!1}}},R=(n(717),n(605)),M=n(862),N=n(863),Y=n(898),B=n(204),H=n.n(B),W=n(84),J=Object(f.a)(F,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.firstLoad?o("div",[o("v-layout",{staticClass:"mx-auto width background",staticStyle:{margin:"8px 0px"},attrs:{wrap:"",row:"","justify-start":""}},t._l(this.looploader,(function(t){return o("div",{key:t.index},[o("card-skeleton-loader")],1)})),0)],1):o("v-tabs",{staticClass:"width mx-auto background",attrs:{centered:""}},[o("v-tab",[o("p",{staticClass:"font-weight-light pl-2 mb-0",staticStyle:{"text-transform":"capitalize","font-size":"14px"}},[t._v("Learning")]),t._v(" "),o("p",{staticClass:"font-weight-light ma-0",staticStyle:{"font-size":"10px","text-transform":"lowercase"}},[t._v("(each one)")])]),t._v(" "),t.studentAccess?t._e():o("v-tab",[o("p",{staticClass:"font-weight-light pl-2 mb-0",staticStyle:{"text-transform":"capitalize","font-size":"14px"}},[t._v("Sharing")]),t._v(" "),o("p",{staticClass:"font-weight-light  ma-0",staticStyle:{"text-transform":"lowercase","font-size":"10px"}},[t._v("(teach one)")])]),t._v(" "),o("v-tab-item",{staticClass:"background"},[o("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[o("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists "),o("b",[t._v(t._s(t.artist.username))]),t._v(" gave a shoutout to")],1),t._v(" "),t.accessAllowed?o("div",[t.teachers.length?o("div",[o("v-layout",{staticClass:"py-2 background",attrs:{wrap:"","justify-start":""}},t._l(t.teachers,(function(t){return o("div",{key:t.index},[o("TeachersCard",{attrs:{e1t1:t}})],1)})),0)],1):t._e(),t._v(" "),t.teachers.length||t.firstLoad?t._e():o("center",[o("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:n(110)}}),t._v(" "),o("h4",[t._v("No posts yet. ")])]),t._v(" "),o("v-card",{directives:[{name:"intersect",rawName:"v-intersect",value:t.infiniteScrollingTeacher,expression:"infiniteScrollingTeacher"}],staticClass:"background"})],1):o("center",[o("p",{staticClass:"grey--text text-center mt-12"},[o("v-icon",[t._v("mdi-lock")]),t._v("\n                Access is not allowed.")],1),o("p",{staticClass:"grey--text text-center"},[t._v("\n                To view their each 1 teach 1, you need to give a shoutout and wait for approval.\n            ")])])],1),t._v(" "),o("v-tab-item",{staticClass:"background"},[o("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[o("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists that gave "),o("b",[t._v(t._s(t.artist.username))]),t._v(" a shoutout")],1),t._v(" "),t.students.length?o("div",[o("v-layout",{staticClass:"py-2 background",attrs:{wrap:"","justify-start":""}},t._l(t.students,(function(t){return o("div",{key:t.index},[o("StudentsCard",{attrs:{share:t}})],1)})),0)],1):t._e(),t._v(" "),t.students.length||t.firstLoad?t._e():o("center",[o("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:n(110)}}),t._v(" "),o("h4",[t._v("No posts yet. ")])]),t._v(" "),o("v-card",{directives:[{name:"intersect",rawName:"v-intersect",value:t.infiniteScrollingStudents,expression:"infiniteScrollingStudents"}],staticClass:"background"})],1)],1)}),[],!1,null,"4e64172a",null);e.a=J.exports;k()(J,{VCard:y.a,VIcon:j.a,VLayout:R.a,VTab:M.a,VTabItem:N.a,VTabs:Y.a}),H()(J,{Intersect:W.a})},767:function(t,e,n){var content=n(871);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("147ac6ec",content,!0,{sourceMap:!1})},870:function(t,e,n){"use strict";n(767)},871:function(t,e,n){(e=n(12)(!1)).push([t.i,".width[data-v-0d203095]{max-width:670px}@media only screen and (max-width:960px){.width[data-v-0d203095]{max-width:357px}}",""]),t.exports=e},946:function(t,e,n){"use strict";n.r(e);var o=n(210),r=n(724),c={middleware:"check_auth",props:["artist"],components:{LeftNavigation:o.a,LearnShare:r.a},head:function(){return{title:this.artist.username,meta:[{hid:"description",name:"description",content:"What you need to know about this artist #"+this.artist.username}]}},methods:{goback:function(){window.history.back()}}},l=(n(870),n(20)),d=n(23),h=n.n(d),v=n(593),m=n(585),_=n(595),f=n(128),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("left-navigation"),t._v(" "),n("v-container",{staticClass:"pa-0 width background"},[n("v-btn",{staticClass:"elevation-0 mt-1 ",staticStyle:{"margin-left":"-6px"},attrs:{icon:""},on:{click:function(e){return t.goback()}}},[n("v-icon",{staticClass:"float-left"},[t._v("mdi-arrow-left")])],1),t._v(" "),n("LearnShare",{attrs:{artist:t.artist}})],1)],1)}),[],!1,null,"0d203095",null);e.default=component.exports;h()(component,{VApp:v.a,VBtn:m.a,VContainer:_.a,VIcon:f.a})}}]);