(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{621:function(t,e,n){"use strict";var o=n(136),r=n(32),l=n(4),c=n(11);e.a=Object(l.a)(o.a,r.a).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(element=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(element)&&1===element.length&&(element=element[0]),element&&!Array.isArray(element)&&element.tag?(this.disabled||(element.data=element.data||{},this._g(element.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),element):(Object(c.c)("v-hover should only contain a single element",this),element)):(Object(c.c)("v-hover is missing a default scopedSlot or bound value",this),null);var element}})},723:function(t,e,n){"use strict";var o={name:"BlogCard"},r=n(20),l=n(22),c=n.n(l),v=n(204),h=n(452),d=n(621),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.hover;return[n("v-card",{staticClass:"ma-1 pa-1 grey lighten-5",attrs:{elevation:o?6:1,to:"/blogs","min-width":"260","max-height":"260"}},[n("v-container",{attrs:{align:"center"}},[n("h1",[t._v("title")]),t._v(" "),n("h5",[t._v("@username")]),t._v(" "),n("p",[t._v("This is a blog card.")])])],1)]}}])})}),[],!1,null,null,null);e.a=component.exports;c()(component,{VCard:v.a,VContainer:h.a,VHover:d.a})},783:function(t,e,n){"use strict";n(178);var o=n(155);e.a=Object(o.a)("flex")},902:function(t,e,n){"use strict";n.r(e);var o={components:{BlogCard:n(723).a}},r=n(20),l=n(22),c=n.n(l),v=n(443),h=n(452),d=n(783),f=n(460),m=n(454),_=n(461),component=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-container",[e("v-row",[e("h4",{staticClass:"pl-6 my-4 xs12 font-weight-light"},[this._v("Community Blogs")]),this._v(" "),e("v-spacer"),this._v(" "),this.$auth.loggedIn?e("v-btn",{staticClass:"text-decoration-none mt-2 mx-6  pa-4",attrs:{rounded:"",color:"indigo",dark:"",to:"/write_blog"}},[this._v("Write a post")]):this._e()],1),this._v(" "),e("v-layout",{staticClass:"mt-6 ml-4",attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{sm6:"",xs6:""}},[e("BlogCard")],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:v.a,VContainer:h.a,VFlex:d.a,VLayout:f.a,VRow:m.a,VSpacer:_.a})}}]);