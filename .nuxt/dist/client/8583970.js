(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{613:function(t,e,r){t.exports=r.p+"img/gebbleslogo3.ad38897.png"},614:function(t,e,r){"use strict";r(26);var n={computed:{card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 166}}}},o=r(20),c=r(23),l=r.n(c),d=r(601),component=Object(o.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("v-skeleton-loader",{staticClass:"ma-md-2 ma-1",attrs:{loading:!0,transition:"fade-transition","max-height":this.card_height,width:this.card_width,type:"card"}})}),[],!1,null,null,null);e.a=component.exports;l()(component,{VSkeletonLoader:d.a})},622:function(t,e,r){"use strict";var n=r(94),o=r(30),c=r(5),l=r(11);e.a=Object(c.a)(n.a,o.a).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(element=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(element)&&1===element.length&&(element=element[0]),element&&!Array.isArray(element)&&element.tag?(this.disabled||(element.data=element.data||{},this._g(element.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),element):(Object(l.c)("v-hover should only contain a single element",this),element)):(Object(l.c)("v-hover is missing a default scopedSlot or bound value",this),null);var element}})},645:function(t,e,r){var content=r(685);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("36ca14cb",content,!0,{sourceMap:!1})},684:function(t,e,r){"use strict";r(645)},685:function(t,e,r){(e=r(12)(!1)).push([t.i,".width[data-v-4519e2b7]{width:177px;height:1.7em;line-height:normal;overflow:hidden}.event_p[data-v-4519e2b7]{font-size:.8rem!important}@media only screen and (max-width:960px){.width[data-v-4519e2b7]{width:80px;height:1.3em;line-height:normal;overflow:hidden}.event_p[data-v-4519e2b7]{font-size:.6rem!important}}",""]),t.exports=e},723:function(t,e,r){"use strict";r(26);var n=r(612),o={head:function(){return{title:"gebbles - artists"}},name:"ArtistCard",props:{artist:Object},components:{CountryFlag:n.a},computed:{img_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 73;case"md":case"lg":case"xl":return 134}},card_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 110;case"md":case"lg":case"xl":return 205}},card_height:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 105;case"md":case"lg":case"xl":return 205}}}},c=(r(684),r(20)),l=r(23),d=r.n(l),h=r(198),f=r(70),m=r(622),v=r(166),w=r(608),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.hover;return[n("v-card",{staticClass:"transition-swing ma-md-2 ma-1",attrs:{"data-view":"",to:"/"+t.artist.username,elevation:o?6:0,outlined:"",width:t.card_width,"max-height":t.card_height}},[t.artist.thumb?n("v-img",{attrs:{src:t.artist.thumb,"lazy-src":t.artist.thumb,height:t.img_height,width:t.card_width}}):n("v-img",{attrs:{src:r(613),contain:"",height:t.img_height,width:t.card_width}}),t._v(" "),n("v-card-actions",{attrs:{height:"32px"}},[t.artist.artist_name?n("div",{staticClass:"text-decoration-none caption width"},[n("p",{staticClass:"event_p"},[t._v(t._s(t.artist.artist_name)+" ")])]):n("div",{staticClass:"text-decoration-none caption width"},[n("p",{staticClass:"event_p"},[t._v(t._s(t.artist.username)+" ")])]),t._v(" "),n("v-spacer"),t._v(" "),n("country-flag",{attrs:{size:"small",country:t.artist.country}})],1)],1)]}}])})}),[],!1,null,"4519e2b7",null);e.a=component.exports;d()(component,{VCard:h.a,VCardActions:f.a,VHover:m.a,VImg:v.a,VSpacer:w.a})},747:function(t,e,r){var content=r(830);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("b040d4f4",content,!0,{sourceMap:!1})},829:function(t,e,r){"use strict";r(747)},830:function(t,e,r){(e=r(12)(!1)).push([t.i,".width[data-v-8a2b8faa]{max-width:670px}@media only screen and (max-width:960px){.width[data-v-8a2b8faa]{max-width:357px}}",""]),t.exports=e},919:function(t,e,r){"use strict";r.r(e);r(10),r(9),r(8),r(208),r(111);var n=r(1),o=(r(39),r(113),r(7),r(6),r(27)),c=(r(66),r(24)),l=r(723),d=r(58),h=r(35),f=r(614);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var w={scrollToTop:!0,head:function(){return{title:"Artists",meta:[{hid:"description",name:"description",content:"Gebbles"}]}},created:function(){this.getartists()},methods:{getartists:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.getLegacyArtists();case 3:r=e.sent,t.artists=r.data.results,t.page=r.data.next,t.firstLoad=!1,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),t.firstLoad=!1;case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))()},infiniteScrolling:function(t,e,r){var n=this;if(this.page){this.$axios.get(this.page).then((function(t){n.page=t.data.next,t.data.results.forEach((function(t){return n.artists.push(t)})),n.artists=Object(o.a)(new Map(n.artists.map((function(t){return[t.username,t]}))).values())})).catch((function(t){console.log(t)}))}}},components:{ArtistCard:l.a,CardSkeletonLoader:f.a},data:function(){return{looploader:[1,1,1,1,1,1,1,1,1,1,1],firstLoad:!0,page:"",artists:[],search:""}},computed:v(v({},Object(h.c)(["isAuthenticated","loggedInUser"])),{},{filterApi:function(){var t=this;return this.artists.filter((function(e){return e.artist_name.toLowerCase().match(t.search.toLowerCase())||e.username.toLowerCase().match(t.search.toLowerCase())}))}})},x=(r(829),r(20)),y=r(23),_=r.n(y),C=r(595),O=r(596),j=r(597),k=r(607),A=r(599),L=r(67),component=Object(x.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-container",{staticClass:"pa-0 mt-4 mt-md-8"},[n("v-row",{staticClass:"mx-auto width"},[n("v-col",{staticClass:"justify-center ",attrs:{cols:"12",md:"7"}},[n("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/artists"}},[n("h2",{staticClass:"xs12 d-inline font-weight-light"},[t._v("Artists")])]),t._v(" \n    / "),n("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/artists/legacy"}},[n("h2",{staticClass:"xs12 d-inline font-weight-light"},[t._v("Legacy Artists")])])],1),t._v(" "),n("v-col",{staticClass:"justify-end py-0 py-md-3",attrs:{cols:"12",md:"5"}},[n("v-text-field",{attrs:{label:"Search artists",rounded:"",solo:"",clearable:"","prepend-inner-icon":"mdi-magnify"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),t._v(" "),t.firstLoad?n("v-layout",{staticClass:"mx-auto width",attrs:{wrap:"",row:"","justify-start":""}},t._l(this.looploader,(function(t){return n("div",{key:t.index},[n("card-skeleton-loader")],1)})),0):t._e(),t._v(" "),n("v-layout",{directives:[{name:"show",rawName:"v-show",value:!t.firstLoad,expression:"!firstLoad"}],staticClass:"mx-auto width",attrs:{wrap:"",row:"","justify-start":""}},t._l(t.filterApi,(function(t){return n("div",{key:t.index},[n("ArtistCard",{attrs:{artist:t}})],1)})),0),t._v(" "),t.filterApi.length||t.firstLoad?t._e():n("center",[n("img",{staticClass:"ml-2 mt-6 clickable",attrs:{height:t.$vuetify.breakpoint.smAndDown?42:62,src:r(110)}}),t._v(" "),n("h3",[t._v("No artists found. ")])])],1)],1)}),[],!1,null,"8a2b8faa",null);e.default=component.exports;_()(component,{VApp:C.a,VCol:O.a,VContainer:j.a,VLayout:k.a,VRow:A.a,VTextField:L.a})}}]);