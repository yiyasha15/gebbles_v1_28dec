(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{893:function(t,e,o){"use strict";o.r(e);var r={data:function(){return{progressbar:!1}},methods:{signout:function(){this.progressbar=!0,console.log("logged out"),this.$store.dispatch("remove_portfolio"),this.$store.dispatch("remove_bio"),this.$store.dispatch("remove_teachers"),this.$store.dispatch("remove_share_obj"),this.$store.dispatch("remove_editing_obj"),this.$store.dispatch("remove_learnings"),this.$store.dispatch("remove_notifications"),this.$store.dispatch("remove_cook_reactions"),this.$store.dispatch("remove_journey"),this.$store.dispatch("remove_page"),localStorage.clear(),this.$auth.strategy.token.reset(),this.$auth.logout(),this.progressbar=!1},cancel:function(){this.$router.push("/")}}},n=o(22),c=o(27),l=o.n(c),h=o(445),d=o(438),v=o(199),m=o(79),_=o(447),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-container",[o("v-card",{staticClass:"mx-auto mt-16 ",attrs:{width:"450",elevation:"0",outlined:""}},[o("v-card-title",{staticClass:"justify-center align-center"},[o("h5",{staticClass:"font-weight-medium"},[t._v("Are you sure you want to sign out?")])]),t._v(" "),o("v-card-actions",{staticClass:"pb-6 justify-center"},[o("v-btn",{staticClass:"ml-4 px-4",attrs:{small:"",dark:"",color:"error",loading:t.progressbar},on:{click:t.signout}},[t._v("Sign Out")]),t._v(" "),o("v-btn",{staticClass:"ml-4 px-4",attrs:{small:"",outlined:"",color:"black"},on:{click:t.cancel}},[t._v("Cancel")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VApp:h.a,VBtn:d.a,VCard:v.a,VCardActions:m.a,VCardTitle:m.c,VContainer:_.a})}}]);