(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{742:function(t,e,o){var content=o(834);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("4112eaae",content,!0,{sourceMap:!1})},833:function(t,e,o){"use strict";o(742)},834:function(t,e,o){(e=o(11)(!1)).push([t.i,".width[data-v-64429290]{max-width:640px}@media only screen and (max-width:640px){.width[data-v-64429290]{max-width:420px}}",""]),t.exports=e},914:function(t,e,o){"use strict";o.r(e);o(10),o(8),o(6),o(5),o(7);var r=o(1),n=(o(66),o(25)),c=o(638),l=o(63),d=o(42);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var f={scrollToTop:!0,head:function(){return{title:"Cooking",meta:[{hid:"description",name:"description",content:"Gebbles - What`s cooking"}]}},components:{CookingFeed:c.a},asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var o,r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.error,r=t.params,e.prev=1,e.next=4,l.a.getWhatsCookingId(r.uuid);case 4:return n=e.sent,e.abrupt("return",{cook:n.data});case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0),o({statusCode:503,message:e.t0.message});case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()},data:function(){return{looploader:[1,1,1,1,1,1,1,1,1,1,1],loading:!0,firstLoad:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(d.c)(["isAuthenticated","loggedInUser"])),methods:{postDelete:function(){this.$router.push("/whatiscooking/")},goback:function(){window.history.back()}}},h=(o(833),o(22)),m=o(27),w=o.n(m),k=o(445),y=o(438),O=o(447),x=o(121),_=o(456),C=o(617),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-container",{staticClass:"pa-0"},[r("v-row",{staticClass:"mx-auto width py-4 px-3 px-md-0"},[r("v-btn",{staticClass:"elevation-0 ",staticStyle:{"margin-left":"-6px"},attrs:{icon:""},on:{click:function(e){return t.goback()}}},[r("v-icon",{staticClass:"float-left"},[t._v("mdi-arrow-left")])],1),t._v(" "),r("p",{staticClass:"pt-1 pl-1"},[t._v("What's cooking ")])],1),t._v(" "),t.firstLoad?r("div",{staticClass:"mx-auto width"},[r("v-skeleton-loader",{attrs:{width:"100%",loading:t.loading,type:"card"}}),t._v(" "),r("div",{attrs:{align:"left",justify:"left"}},[r("div",{staticClass:"mb-1"},[r("v-btn",{staticClass:"mr-1",attrs:{icon:""}},[r("v-icon",{attrs:{color:"black"}},[t._v("mdi-heart")])],1),t._v(" "),r("v-btn",{staticClass:"mx-1",attrs:{icon:""}},[r("v-icon",{attrs:{color:"black"}},[t._v("mdi-fire")])],1),t._v(" "),r("v-btn",{staticClass:"mx-1",attrs:{icon:""}},[r("v-icon",{attrs:{color:"black"}},[t._v("mdi-head-flash-outline")])],1)],1)]),t._v(" "),r("v-row",[r("v-skeleton-loader",{attrs:{width:"100%",loading:t.loading,type:"article"}})],1)],1):t._e(),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.firstLoad,expression:"!firstLoad"}],staticClass:"mx-auto width"},[r("cooking-feed",{attrs:{cook:t.cook},on:{postDelete:t.postDelete}})],1),t._v(" "),t.cook||t.firstLoad?t._e():r("center",[r("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:o(104)}}),t._v(" "),r("h3",[t._v("No videos found. ")])])],1)],1)}),[],!1,null,"64429290",null);e.default=component.exports;w()(component,{VApp:k.a,VBtn:y.a,VContainer:O.a,VIcon:x.a,VRow:_.a,VSkeletonLoader:C.a})}}]);