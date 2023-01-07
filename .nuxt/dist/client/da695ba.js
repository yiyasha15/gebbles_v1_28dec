(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{611:function(t,e,r){t.exports=r.p+"img/gebbleslogo3.ad38897.png"},613:function(t,e,r){"use strict";r(25);var n={computed:{card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 166}}}},o=r(20),c=r(23),d=r.n(c),l=r(599),component=Object(o.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("v-skeleton-loader",{staticClass:"ma-md-2 ma-1",attrs:{loading:!0,transition:"fade-transition","max-height":this.card_height,width:this.card_width,type:"card"}})}),[],!1,null,null,null);e.a=component.exports;d()(component,{VSkeletonLoader:l.a})},622:function(t,e,r){"use strict";var n=r(94),o=r(30),c=r(5),d=r(11);e.a=Object(c.a)(n.a,o.a).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(element=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(element)&&1===element.length&&(element=element[0]),element&&!Array.isArray(element)&&element.tag?(this.disabled||(element.data=element.data||{},this._g(element.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),element):(Object(d.c)("v-hover should only contain a single element",this),element)):(Object(d.c)("v-hover is missing a default scopedSlot or bound value",this),null);var element}})},645:function(t,e,r){var content=r(685);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("48109f83",content,!0,{sourceMap:!1})},684:function(t,e,r){"use strict";r(645)},685:function(t,e,r){(e=r(12)(!1)).push([t.i,".border[data-v-79bb0b3b]{border-color:#815a44!important}.width[data-v-79bb0b3b]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-79bb0b3b]{font-size:.8rem!important}@media only screen and (max-width:960px){.width[data-v-79bb0b3b]{width:80px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-79bb0b3b]{font-size:.6rem!important}}",""]),t.exports=e},725:function(t,e,r){"use strict";r(25);var n=r(609),o={head:function(){return{title:"gebbles - artists"}},name:"ArtistCard",props:{artist:Object},components:{CountryFlag:n.a},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}}}},c=(r(684),r(20)),d=r(23),l=r.n(d),h=r(197),f=r(70),v=r(622),m=r(166),w=r(606),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.hover;return[n("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-view":"",to:"/"+t.artist.username,elevation:o?6:0,outlined:"",width:t.card_width,"max-height":t.card_height}},[t.artist.thumb?n("v-img",{attrs:{src:t.artist.thumb,"lazy-src":t.artist.thumb,height:t.img_height,width:t.card_width}}):n("v-img",{attrs:{src:r(611),contain:"",height:t.img_height,width:t.card_width}}),t._v(" "),n("v-card-actions",{attrs:{height:"32px"}},[t.artist.artist_name?n("div",{staticClass:"text-decoration-none caption width"},[n("p",{staticClass:"event_p"},[t._v(t._s(t.artist.artist_name)+" ")])]):n("div",{staticClass:"text-decoration-none caption width"},[n("p",{staticClass:"event_p"},[t._v(t._s(t.artist.username)+" ")])]),t._v(" "),n("v-spacer"),t._v(" "),n("country-flag",{attrs:{size:"small",country:t.artist.country}})],1)],1)]}}])})}),[],!1,null,"79bb0b3b",null);e.a=component.exports;l()(component,{VCard:h.a,VCardActions:f.a,VHover:v.a,VImg:m.a,VSpacer:w.a})},732:function(t,e,r){var content=r(782);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("3fe02d92",content,!0,{sourceMap:!1})},781:function(t,e,r){"use strict";r(732)},782:function(t,e,r){(e=r(12)(!1)).push([t.i,".width[data-v-bd9dde5a]{max-width:670px}@media only screen and (max-width:960px){.width[data-v-bd9dde5a]{max-width:357px}}",""]),t.exports=e},903:function(t,e,r){"use strict";r.r(e);r(10),r(9),r(8);var n=r(1),o=(r(207),r(39),r(113),r(7),r(6),r(27)),c=(r(66),r(24)),d=r(725),l=r(58),h=r(35),f=r(613);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var m={scrollToTop:!0,head:function(){return{title:"Artists",meta:[{hid:"description",name:"description",content:"Gebbles"}]}},created:function(){this.getartists()},methods:{goback:function(){window.history.back()},getartists:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.artists=[],t.page="",t.firstLoad=!0,e.prev=3,e.next=6,l.a.getArtists();case 6:r=e.sent,t.artists=r.data.results,t.page=r.data.next,t.firstLoad=!1,e.next=16;break;case 12:e.prev=12,e.t0=e.catch(3),console.log(e.t0),t.firstLoad=!1;case 16:case"end":return e.stop()}}),e,null,[[3,12]])})))()},getLegacyartists:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.artists=[],t.page="",t.firstLoad=!0,e.prev=3,e.next=6,l.a.getLegacyArtists();case 6:r=e.sent,t.artists=r.data.results,t.page=r.data.next,t.firstLoad=!1,e.next=16;break;case 12:e.prev=12,e.t0=e.catch(3),console.log(e.t0),t.firstLoad=!1;case 16:case"end":return e.stop()}}),e,null,[[3,12]])})))()},infiniteScrolling:function(t,e,r){var n=this;if(this.page){this.$axios.get(this.page).then((function(t){n.page=t.data.next,t.data.results.forEach((function(t){return n.artists.push(t)})),n.artists=Object(o.a)(new Map(n.artists.map((function(t){return[t.username,t]}))).values())})).catch((function(t){console.log(t)}))}},debounceSearch:function(){var t=this;this.firstLoad=!0,this.artists=[],clearTimeout(this.debounce),this.debounce=setTimeout((function(){t.search?l.a.getSearchedArtist(t.search).then((function(e){t.firstLoad=!1,t.artists=e.data})):t.getartists()}),600)},toggleLegacy:function(){this.showLegacy=!this.showLegacy,this.showLegacy?this.getLegacyartists():this.getartists()}},components:{ArtistCard:d.a,CardSkeletonLoader:f.a},data:function(){return{looploader:[1,1,1,1,1,1,1,1,1,1,1],firstLoad:!0,page:"",artists:[],search:"",debounce:null,showLegacy:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(h.c)(["isAuthenticated","loggedInUser"]))},w=(r(781),r(20)),y=r(23),x=r.n(y),_=r(593),O=r(585),k=r(197),j=r(594),L=r(595),C=r(128),S=r(605),A=r(597),V=r(67),$=r(205),E=r.n($),P=r(84),component=Object(w.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-container",{staticClass:"mx-auto width"},[n("v-btn",{staticClass:"elevation-0 mt-1 ",staticStyle:{"margin-left":"-6px"},attrs:{icon:""},on:{click:function(e){return t.goback()}}},[n("v-icon",{staticClass:"float-left"},[t._v("mdi-arrow-left")])],1),t._v(" "),n("v-row",[n("v-col",{staticClass:"justify-center",attrs:{cols:"12",md:"6"}},[n("h2",{staticClass:"xs12 font-weight-medium"},[t._v("Artists")])]),t._v(" "),n("v-col",{staticClass:"justify-end py-0 py-md-3",attrs:{cols:"12",md:"6"}},[n("v-text-field",{attrs:{label:"Search artists",rounded:"",solo:"",clearable:"","prepend-inner-icon":"mdi-magnify"},on:{input:t.debounceSearch},scopedSlots:t._u([{key:"append-outer",fn:function(){return[n("v-btn",{staticClass:"float-right",attrs:{icon:""},on:{click:t.toggleLegacy}},[n("v-icon",[t._v("mdi-filter-variant")])],1)]},proxy:!0}]),model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),t._v(" "),t.firstLoad?n("v-layout",{attrs:{wrap:"",row:"","justify-start":""}},t._l(this.looploader,(function(t){return n("div",{key:t.index},[n("card-skeleton-loader")],1)})),0):t._e(),t._v(" "),n("v-layout",{directives:[{name:"show",rawName:"v-show",value:!t.firstLoad,expression:"!firstLoad"}],attrs:{wrap:"",row:"","justify-start":""}},t._l(t.artists,(function(t){return n("div",{key:t.index},[n("ArtistCard",{attrs:{artist:t}})],1)})),0),t._v(" "),n("v-card",{directives:[{name:"intersect",rawName:"v-intersect",value:t.infiniteScrolling,expression:"infiniteScrolling"}]}),t._v(" "),t.artists.length||t.firstLoad?t._e():n("center",[n("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:r(110)}}),t._v(" "),n("h3",[t._v("No artists found. ")])])],1)],1)}),[],!1,null,"bd9dde5a",null);e.default=component.exports;x()(component,{VApp:_.a,VBtn:O.a,VCard:k.a,VCol:j.a,VContainer:L.a,VIcon:C.a,VLayout:S.a,VRow:A.a,VTextField:V.a}),E()(component,{Intersect:P.a})}}]);