(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{379:function(e,t,n){"use strict";n(11),n(7),n(5),n(4),n(6);var r=n(0),o=(n(386),n(22)),c=n(8);function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=Object(c.a)(o.a).extend({name:"v-subheader",props:{inset:Boolean},render:function(e){return e("div",{staticClass:"v-subheader",class:l({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})},386:function(e,t,n){var content=n(387);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(15).default)("e8b41e5e",content,!0,{sourceMap:!1})},387:function(e,t,n){(t=n(14)(!1)).push([e.i,".theme--light.v-subheader{color:rgba(0,0,0,.6)}.theme--dark.v-subheader{color:hsla(0,0%,100%,.7)}.v-subheader{align-items:center;display:flex;height:48px;font-size:.875rem;font-weight:400;padding:0 16px}.v-subheader--inset{margin-left:56px}",""]),e.exports=t},547:function(e,t,n){"use strict";n.r(t);n(11),n(7),n(5),n(4),n(6),n(59);var r=n(16),o=n(0),c=n(47);function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var _={middleware:"check_auth",computed:l(l({},Object(c.c)(["notifications","artists","loggedInUser"])),{},{filteredNotifications:function(){if(this.notifications)return this.notifications.filter((function(e){return 0==e.is_seen}))},filteredNotificationsOld:function(){if(this.notifications)return this.notifications.filter((function(e){return 1==e.is_seen}))}}),methods:{seen:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,form,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.filteredNotifications,n.prev=1,r={headers:{Authorization:"Bearer"+t.$store.state.auth.user.access_token}},(form=new FormData).append("is_seen","true"),form.append("sender",e.sender),form.append("receiver",e.receiver),form.append("notification_type",e.notification_type),form.append("notification_context",e.notification_context),console.log(e),n.next=12,t.$axios.$put("/v1/notifications/e1t1/"+e.id,form,r);case 12:o=n.sent,console.log(o),n.next=19;break;case 16:n.prev=16,n.t0=n.catch(1),console.log("error..",n.t0.response.data);case 19:t.$store.dispatch("check_notifications",t.loggedInUser.user.username),t.$router.push("/e1t1/"+e.e1t1object);case 21:case"end":return n.stop()}}),n,null,[[1,16]])})))()},opene1t1:function(e){this.$router.push("/e1t1/"+e.e1t1object)}}},d=n(21),m=n(24),f=n.n(m),h=n(353),y=n(349),O=n(342),w=n(98),j=n(152),x=n(99),k=n(154),P=n(46),I=n(379),component=Object(d.a)(_,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-container",[n("h2",{staticClass:"my-2"},[e._v("Notifications")]),e._v(" "),n("v-list",{attrs:{"two-line":""}},[n("v-subheader",[e._v("New")]),e._v(" "),e._l(e.filteredNotifications,(function(t){return[n("v-list-item",{directives:[{name:"show",rawName:"v-show",value:e.loggedInUser.user.username!=t.sender,expression:"loggedInUser.user.username != item.sender"}],key:t.index,on:{click:function(n){return e.seen(t)}}},[e._l(e.artists,(function(r){return n("div",{key:r.index},[t.sender==r.username&&r.thumb?n("v-list-item-avatar",[n("img",{attrs:{src:r.thumb,alt:"img"}})]):e._e(),e._v(" "),t.sender!=r.username||r.thumb?e._e():n("v-list-item-avatar",{attrs:{color:"blue"}},[n("v-icon",{attrs:{dark:""}},[e._v("\n                    mdi-account-circle\n                ")])],1)],1)})),e._v(" "),1==t.notification_context?n("v-list-item-content",[1==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has tagged you as a teacher.")]):e._e(),e._v(" "),2==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has liked your post.")]):e._e(),e._v(" "),3==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has commented on your post.")]):e._e(),e._v(" "),n("v-list-item-subtitle",[e._v(" "+e._s(t.time))])],1):e._e(),e._v(" "),2==t.notification_context?n("v-list-item-content",[1==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has added a video.")]):e._e(),e._v(" "),2==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has liked your video.")]):e._e(),e._v(" "),3==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has commented on your video.")]):e._e(),e._v(" "),n("v-list-item-subtitle",[e._v(" "+e._s(t.time))])],1):e._e(),e._v(" "),3==t.notification_context?n("v-list-item-content",[1==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has sent you a private message.")]):e._e(),e._v(" "),2==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has liked your private message.")]):e._e(),e._v(" "),3==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has commented on your private message.")]):e._e(),e._v(" "),n("v-list-item-subtitle",[e._v(" "+e._s(t.time))])],1):e._e()],2)]}))],2),e._v(" "),n("v-divider"),e._v(" "),n("v-list",{attrs:{"two-line":""}},[n("v-subheader",[e._v("Earlier")]),e._v(" "),e._l(e.filteredNotificationsOld,(function(t){return[n("v-list-item",{directives:[{name:"show",rawName:"v-show",value:e.loggedInUser.user.username!=t.sender,expression:"loggedInUser.user.username != item.sender"}],key:t.index,on:{click:function(n){return e.opene1t1(t)}}},[e._l(e.artists,(function(r){return n("div",{key:r.index},[t.sender==r.username&&r.thumb?n("v-list-item-avatar",[n("img",{attrs:{src:r.thumb,alt:"img"}})]):e._e(),e._v(" "),t.sender!=r.username||r.thumb?e._e():n("v-list-item-avatar",{attrs:{color:"blue"}},[n("v-icon",{attrs:{dark:""}},[e._v("\n                        mdi-account-circle\n                    ")])],1)],1)})),e._v(" "),1==t.notification_context?n("v-list-item-content",[1==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has tagged you as a teacher.")]):e._e(),e._v(" "),2==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has liked your post.")]):e._e(),e._v(" "),3==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has commented on your post.")]):e._e(),e._v(" "),n("v-list-item-subtitle",[e._v(" "+e._s(t.time))])],1):e._e(),e._v(" "),2==t.notification_context?n("v-list-item-content",[1==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has added a video.")]):e._e(),e._v(" "),2==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has liked your video.")]):e._e(),e._v(" "),3==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has commented on your video.")]):e._e(),e._v(" "),n("v-list-item-subtitle",[e._v(" "+e._s(t.time))])],1):e._e(),e._v(" "),3==t.notification_context?n("v-list-item-content",[1==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has sent you a private message.")]):e._e(),e._v(" "),2==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has liked your private message.")]):e._e(),e._v(" "),3==t.notification_type?n("v-list-item-title",[e._v(e._s(t.sender)+" has commented on your private message.")]):e._e(),e._v(" "),n("v-list-item-subtitle",[e._v(" "+e._s(t.time))])],1):e._e()],2)]}))],2)],1)],1)}),[],!1,null,null,null);t.default=component.exports;f()(component,{VApp:h.a,VContainer:y.a,VDivider:O.a,VIcon:w.a,VList:j.a,VListItem:x.a,VListItemAvatar:k.a,VListItemContent:P.a,VListItemSubtitle:P.b,VListItemTitle:P.c,VSubheader:I.a})}}]);