(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{611:function(t,e,n){t.exports=n.p+"img/gebbleslogo3.ad38897.png"},613:function(t,e,n){"use strict";n(26);var o={computed:{card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 166}}}},r=n(20),c=n(23),l=n.n(c),d=n(599),component=Object(r.a)(o,(function(){var t=this.$createElement;return(this._self._c||t)("v-skeleton-loader",{staticClass:"ma-md-2 ma-1",attrs:{loading:!0,transition:"fade-transition","max-height":this.card_height,width:this.card_width,type:"card"}})}),[],!1,null,null,null);e.a=component.exports;l()(component,{VSkeletonLoader:d.a})},629:function(t,e,n){var content=n(654);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("ea46557a",content,!0,{sourceMap:!1})},642:function(t,e,n){"use strict";n(112),n(26);var o=n(619),r=n(628),c=n(620),l={head:function(){return{title:"gebbles -What's cookin"}},name:"CookingCard",props:{cook:Object},components:{CookingFeed:r.a,Youtube:o.Youtube},created:function(){var t=this.$props.cook.video;console.log(t),/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(t)&&(this.youtube_thumb=this.getThumb(t),this.videoId=Object(c.a)(t))},data:function(){return{videoId:"",dialog:!1,youtube_thumb:""}},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 83;case"md":case"lg":case"xl":return 144}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 115;case"md":case"lg":case"xl":return 205}}},methods:{postDelete:function(){this.$forceUpdate(),this.dialog=!1,this.$emit("postDelete")},getThumb:function(t){var e=t.match("[\\?&]v=([^&#]*)"),video=null===e?t:e[1];return"https://img.youtube.com/vi/".concat(video,"/hqdefault.jpg")}}},d=n(20),h=n(23),v=n.n(h),m=n(585),f=n(197),_=n(595),w=n(601),k=n(622),y=n(128),x=n(166),C=n(597),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.hover;return[n("v-card",{staticClass:"transition-swing ma-md-2 ma-1 rounded-sm",attrs:{"data-view":"",elevation:o?6:0,outlined:"",width:t.card_width,"max-height":t.card_height},on:{click:function(e){t.dialog=!0}}},[t.cook.thumbjs?n("v-img",{staticClass:"rounded-sm",attrs:{src:t.cook.thumbjs,height:t.img_height,width:t.card_width}}):n("v-img",{staticClass:"rounded-sm",attrs:{src:t.youtube_thumb,height:t.img_height,width:t.card_width}}),t._v(" "),n("v-dialog",{attrs:{"retain-focus":!1,width:"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-container",{staticClass:"rounded-lg white pa-2 pa-md-4"},[n("v-row",{staticClass:"ma-1 ma-md-0",attrs:{align:"end",justify:"end"}},[n("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[n("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),n("cooking-feed",{attrs:{cook:t.cook},on:{postDelete:t.postDelete}})],1)],1)],1)]}}])})}),[],!1,null,null,null);e.a=component.exports;v()(component,{VBtn:m.a,VCard:f.a,VContainer:_.a,VDialog:w.a,VHover:k.a,VIcon:y.a,VImg:x.a,VRow:C.a})},653:function(t,e,n){"use strict";n(629)},654:function(t,e,n){(e=n(12)(!1)).push([t.i,".width[data-v-3a59f931]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-3a59f931]{max-width:177px;font-size:.8rem!important}@media only screen and (max-width:960px){.width[data-v-3a59f931]{width:80px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-3a59f931]{max-width:80px;font-size:.6rem!important}}",""]),t.exports=e},677:function(t,e,n){var content=n(717);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("991d30ba",content,!0,{sourceMap:!1})},678:function(t,e,n){var content=n(719);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("00e22a78",content,!0,{sourceMap:!1})},679:function(t,e,n){"use strict";n(26);var o=n(610),r=n(619),c=n(620),l=n(58),d=n(628),h={name:"TeachersCard",props:{e1t1:Object},data:function(){return{dialog:!1,videoId:"",cook:{},loadingCooking:!1}},components:{CountryFlag:o.a,Youtube:r.Youtube,CookingFeed:d.a},methods:{showCooking:function(){var t=this;this.loadingCooking=!0,this.videoId=Object(c.a)(this.e1t1.te_latest_cooking_yt_link),this.dialog=!0;var e={headers:{"content-type":"multipart/form-data",Authorization:this.$auth.strategy.token.get()}};l.a.getWhatsCookingId(this.e1t1.te_latest_cooking_uuid).then((function(n){t.loadingCooking=!1,t.cook=n.data;var o=new FormData;o.append("te_latest_cooking_watched",!0),o.append("id",t.e1t1.id),t.$axios.$patch("/v1/e1t1/sharing/"+t.e1t1.uuid,o,e).then((function(t){console.log(t)}))})).catch((function(e){t.loadingCooking=!1,console.log(e)}))},goToE1t1:function(t){this.$router.push("/e1t1/"+t)}},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}},height:function(){switch(this.$vuetify.breakpoint.name){case"xs":return 220;case"sm":case"md":case"lg":case"xl":return 410}}}},v=(n(653),n(20)),m=n(23),f=n.n(m),_=n(585),w=n(197),k=n(70),y=n(595),x=n(601),C=n(622),O=n(128),j=n(166),V=n(597),S=n(599),$=n(606),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var r=e.hover;return[o("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-view":"",elevation:r?6:0,outlined:"",width:t.card_width,"max-height":t.card_height},on:{click:function(e){return t.goToE1t1(t.e1t1.uuid)}}},[t.e1t1.image_mini?o("v-img",{attrs:{src:t.e1t1.image_mini,"lazy-src":t.e1t1.image_mini,height:t.img_height,width:t.card_width}},[t.e1t1.te_latest_cooking_uuid?o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.e1t1.te_latest_cooking_watched?o("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):o("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1):o("v-img",{attrs:{src:n(611),height:t.img_height,width:t.card_width,contain:""}},[t.e1t1.te_latest_cooking_uuid?o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.e1t1.te_latest_cooking_watched?o("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):o("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1),t._v(" "),o("v-card-actions",{attrs:{height:"32px"}},[o("div",{staticClass:"text-decoration-none caption width"},[o("p",{staticClass:"event_p"},[t._v(t._s(t.e1t1.s_teacher_name)+" ")])]),t._v(" "),o("v-spacer"),t._v(" "),o("country-flag",{attrs:{country:t.e1t1.s_teacher_country,size:"small"}})],1)],1)]}}])}),t._v(" "),o("v-dialog",{attrs:{"retain-focus":!1,width:"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-container",{staticClass:"rounded-lg white pa-2 pa-md-4"},[o("v-row",{staticClass:"ma-1 ma-md-0",attrs:{align:"end",justify:"end"}},[o("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[o("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),t.loadingCooking?o("div",[o("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}}),t._v(" "),t.videoId?o("youtube",{attrs:{width:"100%",height:t.height,"video-id":t.videoId}}):t._e(),t._v(" "),o("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}})],1):o("CookingFeed",{attrs:{cook:t.cook}})],1)],1)],1)}),[],!1,null,"3a59f931",null);e.a=component.exports;f()(component,{VBtn:_.a,VCard:w.a,VCardActions:k.a,VContainer:y.a,VDialog:x.a,VHover:C.a,VIcon:O.a,VImg:j.a,VRow:V.a,VSkeletonLoader:S.a,VSpacer:$.a})},716:function(t,e,n){"use strict";n(677)},717:function(t,e,n){(e=n(12)(!1)).push([t.i,".width[data-v-21d92e95]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-21d92e95]{max-width:177px;font-size:.8rem!important}@media only screen and (max-width:960px){.width[data-v-21d92e95]{width:80px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-21d92e95]{max-width:80px;font-size:.6rem!important}}",""]),t.exports=e},718:function(t,e,n){"use strict";n(678)},719:function(t,e,n){(e=n(12)(!1)).push([t.i,".width[data-v-99940614]{max-width:670px}@media only screen and (max-width:960px){.width[data-v-99940614]{max-width:357px}}",""]),t.exports=e},725:function(t,e,n){"use strict";n(10),n(9),n(8),n(39),n(113),n(7),n(6);var o=n(27),r=(n(66),n(24)),c=n(1),l=n(58),d=(n(26),n(610)),h=n(35),v=n(642);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={name:"SharingsCard",props:{share:Object},data:function(){return{dialog:!1,videoId:"",cook:{},loadingCooking:!1}},components:{CountryFlag:d.a,CookingCard:v.a},computed:f(f({},Object(h.c)(["userHasPortfolio"])),{},{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}}}),methods:{showCooking:function(){var t=this;this.loadingCooking=!0,this.videoId=getIdFromURL(this.share.st_latest_cooking_yt_link),this.dialog=!0;var e={headers:{"content-type":"multipart/form-data",Authorization:this.$auth.strategy.token.get()}};EventService.getWhatsCookingId(this.share.st_latest_cooking_uuid).then((function(n){t.loadingCooking=!1,t.cook=n.data;var o=new FormData;o.append("st_latest_cooking_watched",!0),o.append("id",t.share.id),t.$axios.$patch("/v1/e1t1/sharing/"+t.share.uuid,o,e).then((function(t){console.log(t)}))})).catch((function(e){t.loadingCooking=!1,console.log(e)}))},goToE1t1:function(t){this.$router.push("/e1t1/"+t)}}},w=(n(716),n(20)),k=n(23),y=n.n(k),x=n(585),C=n(197),O=n(70),j=n(595),V=n(601),S=n(622),$=n(128),I=n(166),P=n(597),D=n(599),E=n(606),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var r=e.hover;return[o("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-views":"",elevation:r?6:0,outlined:"",width:t.card_width,"max-height":t.card_height},on:{click:function(e){return t.goToE1t1(t.share.uuid)}}},[t.share.image_mini?o("v-img",{attrs:{src:t.share.image_mini,height:t.img_height,width:t.card_width}},[t.share.st_latest_cooking_uuid?o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.share.st_latest_cooking_watched?o("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):o("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1):o("v-img",{attrs:{src:n(611),height:t.img_height,width:t.card_width,contain:""}},[t.share.st_latest_cooking_uuid?o("v-btn",{staticClass:"float-right ma-1 white",attrs:{elevation:"4",icon:"",small:""},on:{click:function(e){return e.stopPropagation(),t.showCooking()}}},[t.share.st_latest_cooking_watched?o("v-icon",{attrs:{color:"black"}},[t._v("mdi-play-circle-outline")]):o("v-icon",{attrs:{color:"red"}},[t._v("mdi-play-circle-outline")])],1):t._e()],1),t._v(" "),o("v-card-actions",{attrs:{height:"32px"}},[o("div",{staticClass:"text-decoration-none caption width"},[o("p",{staticClass:"event_p"},[t._v(t._s(t.share.username))])]),t._v(" "),o("v-spacer"),t._v(" "),o("country-flag",{attrs:{country:t.share.s_student_country,size:"small"}})],1)],1)]}}])}),t._v(" "),o("v-dialog",{attrs:{"retain-focus":!1,width:"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-container",{staticClass:"rounded-lg white pa-2 pa-md-4"},[o("v-row",{staticClass:"ma-1 ma-md-0",attrs:{align:"end",justify:"end"}},[o("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[o("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),t.loadingCooking?o("div",[o("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}}),t._v(" "),t.videoId?o("youtube",{attrs:{width:"100%",height:t.height,"video-id":t.videoId}}):t._e(),t._v(" "),o("v-skeleton-loader",{attrs:{type:"list-item-avatar-three-line"}})],1):o("CookingFeed",{attrs:{cook:t.cook}})],1)],1)],1)}),[],!1,null,"21d92e95",null),T=component.exports;y()(component,{VBtn:x.a,VCard:C.a,VCardActions:O.a,VContainer:j.a,VDialog:V.a,VHover:S.a,VIcon:$.a,VImg:I.a,VRow:P.a,VSkeletonLoader:D.a,VSpacer:E.a});var L=n(679),z=n(613);function A(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var F={middleware:"check_auth",components:{StudentsCard:T,TeachersCard:L.a,CardSkeletonLoader:z.a},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?A(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):A(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(h.c)(["isAuthenticated","loggedInUser","usersTeachers","userHasTeachers"])),methods:{getsharing:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"id",n={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.prev=2,e.next=5,l.a.getEach1Teach1_teachers(n);case 5:return o=e.sent,e.next=8,l.a.getEach1Teach1_students(n);case 8:r=e.sent,t.teachers=o.data.results,t.students=r.data.results,t.teachers_page=o.data.next,t.students_page=r.data.next,t.firstLoad=!1,e.next=20;break;case 16:e.prev=16,e.t0=e.catch(2),console.log(e.t0),t.firstLoad=!1;case 20:case"end":return e.stop()}}),e,null,[[2,16]])})))()},infiniteScrollingTeacher:function(t,e,n){var r=this;if(this.teachers_page){this.$axios.get(this.teachers_page).then((function(t){r.teachers_page=t.data.next,t.data.results.forEach((function(t){return r.teachers.push(t)})),r.teachers=Object(o.a)(new Map(r.teachers.map((function(t){return[t.id,t]}))).values())})).catch((function(t){console.log(t)}))}},infiniteScrollingStudents:function(t,e,n){var r=this;if(this.students_page){this.$axios.get(this.students_page).then((function(t){r.students_page=t.data.next,t.data.results.forEach((function(t){return r.students.push(t)})),r.students=Object(o.a)(new Map(r.students.map((function(t){return[t.id,t]}))).values())})).catch((function(t){console.log(t)}))}}},created:function(){this.getsharing()},data:function(){return{teachers_page:"",students_page:"",teachers:[],students:[],looploader:[1,1,1,1,1,1,1,1,1],loading:!0,firstLoad:!0}}},U=(n(718),n(605)),R=n(855),H=n(856),M=n(889),N=n(205),B=n.n(N),W=n(84),Y=Object(w.a)(F,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-tabs",{staticClass:"width mx-auto background",attrs:{centered:""}},[o("v-tab",[o("p",{staticClass:"font-weight-light pl-2 mb-0",staticStyle:{"text-transform":"capitalize","font-size":"14px"}},[t._v("Learning")]),t._v(" "),o("p",{staticClass:"font-weight-light ma-0",staticStyle:{"font-size":"10px","text-transform":"lowercase"}},[t._v("(each one)")])]),t._v(" "),o("v-tab",[o("p",{staticClass:"font-weight-light pl-2 mb-0",staticStyle:{"text-transform":"capitalize","font-size":"14px"}},[t._v("Sharing")]),t._v(" "),o("p",{staticClass:"font-weight-light  ma-0",staticStyle:{"text-transform":"lowercase","font-size":"10px"}},[t._v("(teach one)")])]),t._v(" "),t.firstLoad?o("v-tab-item",{staticClass:"background"},[o("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[o("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists "),o("b",[t._v(t._s(t.loggedInUser.username))]),t._v(" gave a shoutout to")],1),t._v(" "),o("v-layout",{staticClass:"py-2 background",attrs:{wrap:"",row:"","justify-start":""}},t._l(this.looploader,(function(t){return o("div",{key:t.index},[o("card-skeleton-loader")],1)})),0)],1):o("v-tab-item",{staticClass:"background"},[o("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[o("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists "),o("b",[t._v(t._s(t.loggedInUser.username))]),t._v(" gave a shoutout to")],1),t._v(" "),t.teachers.length?o("div",[o("v-layout",{staticClass:"py-2 background",attrs:{wrap:"","justify-start":""}},t._l(t.teachers,(function(t){return o("div",{key:t.index},[o("TeachersCard",{attrs:{e1t1:t}})],1)})),0)],1):t._e(),t._v(" "),t.teachers.length||t.firstLoad?t._e():o("center",[o("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:n(110)}}),t._v(" "),o("h4",[t._v("No posts yet. ")])]),t._v(" "),o("v-card",{directives:[{name:"intersect",rawName:"v-intersect",value:t.infiniteScrollingTeacher,expression:"infiniteScrollingTeacher"}],staticClass:"background"})],1),t._v(" "),t.firstLoad?o("v-tab-item",{staticClass:"background"},[o("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[o("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists that gave "),o("b",[t._v(t._s(t.loggedInUser.username))]),t._v(" a shoutout")],1),t._v(" "),o("v-layout",{staticClass:"py-2 background",attrs:{wrap:"",row:"","justify-start":""}},t._l(this.looploader,(function(t){return o("div",{key:t.index},[o("v-skeleton-loader")],1)})),0)],1):o("v-tab-item",{staticClass:"background"},[o("div",{staticClass:"ml-1 py-2 grey--text text-center caption"},[o("v-icon",{attrs:{small:""}},[t._v("mdi-all-inclusive")]),t._v(" artists that gave "),o("b",[t._v(t._s(t.loggedInUser.username))]),t._v(" a shoutout")],1),t._v(" "),t.students.length?o("div",[o("v-layout",{staticClass:"py-2 background",attrs:{wrap:"","justify-start":""}},t._l(t.students,(function(t){return o("div",{key:t.index},[o("StudentsCard",{attrs:{share:t}})],1)})),0)],1):t._e(),t._v(" "),t.students.length||t.firstLoad?t._e():o("center",[o("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:n(110)}}),t._v(" "),o("h4",[t._v("No posts yet. ")])]),t._v(" "),o("v-card",{directives:[{name:"intersect",rawName:"v-intersect",value:t.infiniteScrollingStudents,expression:"infiniteScrollingStudents"}],staticClass:"background"})],1)],1)}),[],!1,null,"99940614",null);e.a=Y.exports;y()(Y,{VCard:C.a,VIcon:$.a,VLayout:U.a,VSkeletonLoader:D.a,VTab:R.a,VTabItem:H.a,VTabs:M.a}),B()(Y,{Intersect:W.a})},936:function(t,e,n){"use strict";n.r(e);var o=n(210),r=n(725),c={middleware:"check_auth",props:["artist"],components:{LeftNavigation:o.a,LearnShare:r.a},head:function(){return{title:this.artist.username,meta:[{hid:"description",name:"description",content:"What you need to know about this artist #"+this.artist.username}]}},methods:{goback:function(){window.history.back()}}},l=n(20),d=n(23),h=n.n(d),v=n(593),m=n(585),f=n(595),_=n(128),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("left-navigation"),t._v(" "),n("v-container",{staticClass:"pa-0 background",staticStyle:{"max-width":"670px"}},[n("v-btn",{staticClass:"elevation-0 mt-1 ",staticStyle:{"margin-left":"-6px"},attrs:{icon:""},on:{click:function(e){return t.goback()}}},[n("v-icon",{staticClass:"float-left"},[t._v("mdi-arrow-left")])],1),t._v(" "),n("LearnShare")],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VApp:v.a,VBtn:m.a,VContainer:f.a,VIcon:_.a})}}]);