(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{611:function(t,e,o){t.exports=o.p+"img/gebbleslogo3.ad38897.png"},612:function(t,e,o){"use strict";o(25);var n={computed:{card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 166}}}},r=o(20),c=o(23),d=o.n(c),l=o(599),component=Object(r.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("v-skeleton-loader",{staticClass:"ma-md-2 ma-1",attrs:{loading:!0,transition:"fade-transition","max-height":this.card_height,width:this.card_width,type:"card"}})}),[],!1,null,null,null);e.a=component.exports;d()(component,{VSkeletonLoader:l.a})},729:function(t,e,o){"use strict";o(112),o(25);var n=o(619),r=o(628),c=o(620),d={head:function(){return{title:"gebbles -What's cookin"}},name:"CookingCard",props:{cook:Object},components:{CookingFeed:r.a,Youtube:n.Youtube},created:function(){var t=this.$props.cook.video;console.log(t),/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(t)&&(this.youtube_thumb=this.getThumb(t),this.videoId=Object(c.a)(t))},data:function(){return{videoId:"",dialog:!1,youtube_thumb:""}},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 83;case"md":case"lg":case"xl":return 144}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 115;case"md":case"lg":case"xl":return 205}}},methods:{postDelete:function(){this.$forceUpdate(),this.dialog=!1,this.$emit("postDelete")},getThumb:function(t){var e=t.match("[\\?&]v=([^&#]*)"),video=null===e?t:e[1];return"https://img.youtube.com/vi/".concat(video,"/hqdefault.jpg")}}},l=o(20),h=o(23),m=o.n(h),v=o(585),f=o(197),k=o(595),w=o(601),_=o(621),x=o(128),y=o(166),C=o(597),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.hover;return[o("v-card",{staticClass:"transition-swing ma-md-2 ma-1 rounded-sm",attrs:{"data-view":"",elevation:n?6:0,outlined:"",width:t.card_width,"max-height":t.card_height},on:{click:function(e){t.dialog=!0}}},[t.cook.thumbjs?o("v-img",{staticClass:"rounded-sm",attrs:{src:t.cook.thumbjs,height:t.img_height,width:t.card_width}}):o("v-img",{staticClass:"rounded-sm",attrs:{src:t.youtube_thumb,height:t.img_height,width:t.card_width}}),t._v(" "),o("v-dialog",{attrs:{"retain-focus":!1,width:"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-container",{staticClass:"rounded-lg white pa-2 pa-md-4"},[o("v-row",{staticClass:"ma-1 ma-md-0",attrs:{align:"end",justify:"end"}},[o("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[o("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),o("cooking-feed",{attrs:{cook:t.cook},on:{postDelete:t.postDelete}})],1)],1)],1)]}}])})}),[],!1,null,null,null);e.a=component.exports;m()(component,{VBtn:v.a,VCard:f.a,VContainer:k.a,VDialog:w.a,VHover:_.a,VIcon:x.a,VImg:y.a,VRow:C.a})},775:function(t,e,o){var content=o(887);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(13).default)("38f0ec62",content,!0,{sourceMap:!1})},776:function(t,e,o){var content=o(889);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(13).default)("43597187",content,!0,{sourceMap:!1})},886:function(t,e,o){"use strict";o(775)},887:function(t,e,o){(e=o(12)(!1)).push([t.i,".pointer[data-v-4166b3d8]{cursor:pointer}.width[data-v-4166b3d8]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-4166b3d8]{max-width:177px;font-size:.8rem!important}@media only screen and (max-width:960px){.width[data-v-4166b3d8]{width:78px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-4166b3d8]{max-width:78px;font-size:.6rem!important}}",""]),t.exports=e},888:function(t,e,o){"use strict";o(776)},889:function(t,e,o){(e=o(12)(!1)).push([t.i,".width[data-v-25746a4d]{max-width:670px}@media only screen and (max-width:960px){.width[data-v-25746a4d]{max-width:357px}}",""]),t.exports=e},912:function(t,e,o){"use strict";o.r(e);o(10),o(9),o(8),o(39),o(113),o(7),o(6);var n=o(27),r=(o(66),o(24)),c=o(1),d=o(58),l=(o(112),o(25),{head:function(){return{title:"What's cookin"}},name:"CookingCard",props:{cook:Object},created:function(){var t=this.$props.cook.cookingidobj.video;/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(t)&&(this.youtube_thumb=this.getThumb(t))},data:function(){return{youtube_thumb:""}},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}}},methods:{getThumb:function(t){var e=t.match("[\\?&]v=([^&#]*)"),video=null===e?t:e[1];return"http://img.youtube.com/vi/"+video+"/0.jpg"},goToCook:function(t){this.$router.push("/whatiscooking/"+t)}}}),h=(o(886),o(20)),m=o(23),v=o.n(m),f=o(197),k=o(70),w=o(621),_=o(166),component=Object(h.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var r=e.hover;return[n("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-view":"",elevation:r?6:0,outlined:"",width:t.card_width,"max-height":t.card_height}},[t.cook.cookingidobj.thumbjs?n("v-img",{staticClass:"pointer",attrs:{src:t.cook.cookingidobj.thumbjs,height:t.img_height,width:t.card_width},on:{click:function(e){return t.goToCook(t.cook.cookingidobj.uuid)}}}):t.cook.cookingidobj.video?n("v-img",{staticClass:"pointer",attrs:{src:t.youtube_thumb,height:t.img_height,width:t.card_width},on:{click:function(e){return t.goToCook(t.cook.cookingidobj.uuid)}}}):n("v-img",{staticClass:"pointer",attrs:{src:o(611),contain:"",height:t.img_height,width:t.card_width},on:{click:function(e){return t.goToCook(t.cook.cookingidobj.uuid)}}}),t._v(" "),n("v-card-actions",[n("div",{staticClass:"text-decoration-none caption width"},[n("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/"+t.cook.username}},[n("p",{staticClass:"event_p"},[t._v(t._s(t.cook.username)+" ")])])],1)])],1)]}}])})}),[],!1,null,"4166b3d8",null),x=component.exports;v()(component,{VCard:f.a,VCardActions:k.a,VHover:w.a,VImg:_.a});var y=o(35),C=o(612),j=o(729),O=o(210);function $(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var L={props:["artist"],middleware:"check_auth",components:{CardSkeletonLoader:C.a,CookingCardSharing:x,CookingCard:j.a,LeftNavigation:O.a},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?$(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):$(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(y.c)(["isAuthenticated","loggedInUser"])),head:function(){return{title:this.artist.username,meta:[{hid:"description",name:"description",content:"What you need to know about this artist #"+this.artist.username}]}},created:function(){this.getwhatiscooking(),this.getwhatiscookingmentioned()},data:function(){return{cooking_mentioned_page:"",cooking_page:"",cooking:[],cooking_mentioned:[],looploader:[1,1,1,1,1,1,1,1,1],loading:!0,firstLoadY:!0,firstLoadM:!0}},methods:{goback:function(){window.history.back()},getwhatiscooking:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.prev=1,e.next=4,d.a.getWhatsCookingUsername(o);case 4:n=e.sent,t.cooking=n.data.results,t.cooking_page=n.data.next,t.firstLoadY=!1,e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0),t.firstLoadY=!1;case 14:case"end":return e.stop()}}),e,null,[[1,10]])})))()},getwhatiscookingmentioned:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o={headers:{"content-type":"multipart/form-data",Authorization:t.$auth.strategy.token.get()}},e.next=4,d.a.getStudentsCooking(t.artist.username,o);case 4:n=e.sent,t.cooking_mentioned=n.data.results,t.cooking_mentioned_page=n.data.next,t.firstLoadM=!1,e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0),t.firstLoadM=!1;case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()},infiniteScrolling:function(){var t=this;if(this.cooking_mentioned_page){var e={headers:{"content-type":"multipart/form-data",Authorization:this.$auth.strategy.token.get()}};this.$axios.get(this.cooking_mentioned_page,e).then((function(e){t.cooking_mentioned_page=e.data.next,e.data.results.forEach((function(e){return t.cooking_mentioned.push(e)})),t.cooking_mentioned=Object(n.a)(new Map(t.cooking_mentioned.map((function(t){return[t.id,t]}))).values())})).catch((function(t){console.log(t)}))}},postDelete:function(){this.cooking=[],this.firstLoadY=!0,this.getwhatiscooking()}}},V=(o(888),o(593)),D=o(585),M=o(595),S=o(128),Y=o(605),T=o(862),z=o(863),A=o(898),I=Object(h.a)(L,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("left-navigation"),t._v(" "),n("v-container",{staticClass:"pa-0 background",staticStyle:{"max-width":"670px"}},[n("v-btn",{staticClass:"elevation-0 mt-1 ",attrs:{icon:""},on:{click:function(e){return t.goback()}}},[n("v-icon",{staticClass:"float-left"},[t._v("mdi-arrow-left")])],1),t._v(" "),n("v-tabs",{staticClass:"width mx-auto background",attrs:{centered:""}},[n("v-tab",[n("p",{staticClass:"font-weight-light pl-2 mb-0",staticStyle:{"text-transform":"capitalize","font-size":"14px"}},[t._v("Yours"),n("v-icon",{staticClass:"pl-2",attrs:{size:"small"}},[t._v("mdi-lock")])],1)]),t._v(" "),n("v-tab",[n("p",{staticClass:"font-weight-light pl-2 mb-0",staticStyle:{"text-transform":"capitalize","font-size":"14px"}},[t._v("Mentioned")])]),t._v(" "),n("v-tab-item",{staticClass:"background"},[n("div",{staticClass:"py-2 grey--text caption text-center"},[t._v("all your videos are private, except your last post")]),t._v(" "),n("v-layout",{directives:[{name:"show",rawName:"v-show",value:t.firstLoadY,expression:"firstLoadY"}],attrs:{wrap:"","justify-start":""}},t._l(this.looploader,(function(t){return n("div",{key:t.index},[n("card-skeleton-loader",{staticClass:"ma-md-2 ma-1"})],1)})),0),t._v(" "),n("v-layout",{directives:[{name:"show",rawName:"v-show",value:!t.firstLoadY,expression:"!firstLoadY"}],attrs:{wrap:"","justify-start":""}},t._l(t.cooking,(function(e){return n("div",{key:e.index},[n("cooking-card",{attrs:{cook:e},on:{postDelete:t.postDelete}})],1)})),0),t._v(" "),t.cooking.length||t.firstLoadY?t._e():n("center",[n("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:o(110)}}),t._v(" "),n("p",{staticClass:"grey--text mt-4"},[t._v("No videos found. ")])])],1),t._v(" "),n("v-tab-item",{staticClass:"background"},[n("div",{staticClass:"py-2 grey--text caption text-center"},[t._v("all the videos where you are mentioned")]),t._v(" "),n("v-layout",{directives:[{name:"show",rawName:"v-show",value:t.firstLoadM,expression:"firstLoadM"}],attrs:{wrap:"","justify-start":""}},t._l(this.looploader,(function(t){return n("div",{key:t.index},[n("card-skeleton-loader",{staticClass:"ma-md-2 ma-1"})],1)})),0),t._v(" "),n("v-layout",{directives:[{name:"show",rawName:"v-show",value:!t.firstLoadM,expression:"!firstLoadM"}],attrs:{wrap:"","justify-start":""}},t._l(t.cooking_mentioned,(function(t){return n("div",{key:t.index},[n("cooking-card-sharing",{attrs:{cook:t}})],1)})),0),t._v(" "),t.cooking_mentioned.length||t.firstLoadM?t._e():n("center",[n("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:o(110)}}),t._v(" "),n("p",{staticClass:"grey--text mt-4"},[t._v("No videos found. ")])])],1)],1)],1)],1)}),[],!1,null,"25746a4d",null);e.default=I.exports;v()(I,{VApp:V.a,VBtn:D.a,VContainer:M.a,VIcon:S.a,VLayout:Y.a,VTab:T.a,VTabItem:z.a,VTabs:A.a})}}]);