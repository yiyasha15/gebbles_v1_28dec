(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{683:function(e,t,o){"use strict";o(11),o(9),o(6),o(8),o(7);var n=o(18),r=(o(33),o(37),o(66),o(24)),c=(o(54),o(25),o(1)),d=o(36),l=o(619),m=o(616),h=o(617);function k(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={components:{GebblesDivider:l.a,Youtube:m.Youtube},created:function(){this.$store.dispatch("check_user_teachers"),this.usersTeacher=this.usersTeachers,this.cook_obj&&(this.cookingForm.video=this.cook_obj.video,this.cookingForm.lesson=this.cook_obj.lesson,this.cook_obj.mention1&&this.selectedTeachers.push(this.cook_obj.mention1),this.cook_obj.mention2&&this.selectedTeachers.push(this.cook_obj.mention2),this.cook_obj.mention3&&this.selectedTeachers.push(this.cook_obj.mention3),console.log(this.cook_obj.mention1))},data:function(){return{valid_snackbar:!1,thankyou_snackbar:!1,cookingForm:{username:this.$store.state.auth.user.username,access:"",lesson:"",video:"",thumbjs:"",mention1:"",mention2:"",mention3:""},progressbar:!1,selectedTeachers:[],isUpdating:!1,changedTeacherBool:!1,changedTeachers:[],updated:!1,youtubeRules:[function(e){return!e||/(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm.test(e)||"Enter a valid Url"},function(e){return!!e||"Url is required"}]}},computed:v(v({},Object(d.c)(["isAuthenticated","loggedInUser","usersTeachers","cook_obj"])),{},{img_width:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":return 240;case"md":return 280;case"lg":return 300;case"xl":return 350}},videoId:function(){return Object(h.a)(this.cookingForm.video)}}),methods:{clear:function(){this.$store.dispatch("remove_cook_obj"),this.refresh()},youTubeGetID:function(e){return void 0!==(e=e.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2]?e[2].split(/[^0-9a-z_\-]/i)[0]:e[0]},submitCooking:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var o,n,r,c,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.$refs.cooking_form.validate()){e.progressbar=!0;try{for(data in o={headers:{"content-type":"multipart/form-data",Authorization:e.$auth.strategy.token.get()}},e.cookingForm.video.includes("shorts")&&(r=e.cookingForm.video.split("/").pop(),e.cookingForm.video="https://www.youtube.com/watch?v="+r),n=e.youTubeGetID(e.cookingForm.video),e.cookingForm.thumbjs="http://img.youtube.com/vi/"+n+"/2.jpg",e.selectedTeachers[0]&&(e.cookingForm.mention1=e.selectedTeachers[0]),e.selectedTeachers[1]&&(e.cookingForm.mention2=e.selectedTeachers[1]),e.selectedTeachers[2]&&(e.cookingForm.mention3=e.selectedTeachers[2]),c=new FormData,e.cookingForm)c.append(data,e.cookingForm[data]);e.$axios.$post("/v1/whatiscooking/cooking/",c,o).then((function(t){e.progressbar=!1,e.$store.dispatch("check_user_teachers"),e.refresh(),e.$router.push("/whatiscooking")}))}catch(t){console.log("unsuccess",t,t.response),e.progressbar=!1}}case 1:case"end":return t.stop()}}),t)})))()},updateCooking:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var o,r,c,d,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.progressbar=!0,t.prev=1,o={headers:{"content-type":"multipart/form-data",Authorization:e.$auth.strategy.token.get()}},r=!1,c=new FormData,e.selectedTeachers[0]?e.cookingForm.mention1=e.selectedTeachers[0]:e.cookingForm.mention1="",e.selectedTeachers[1]?e.cookingForm.mention2=e.selectedTeachers[1]:e.cookingForm.mention2="",e.selectedTeachers[2]?e.cookingForm.mention3=e.selectedTeachers[2]:e.cookingForm.mention3="",e.cook_obj.mention1!=e.cookingForm.mention1&&("number"==typeof e.cookingForm.mention1?c.append("mention1",e.cookingForm.mention1):"object"==Object(n.a)(e.cookingForm.mention1)?c.append("mention1",e.cookingForm.mention1.id):c.append("mention1",""),r=!0),e.cook_obj.mention2!=e.cookingForm.mention2&&("number"==typeof e.cookingForm.mention2?c.append("mention2",e.cookingForm.mention2):"object"==Object(n.a)(e.cookingForm.mention2)?c.append("mention2",e.cookingForm.mention2.id):c.append("mention2",""),r=!0),e.cook_obj.mention3!=e.cookingForm.mention3&&("number"==typeof e.cookingForm.mention3?c.append("mention3",e.cookingForm.mention3):"object"==Object(n.a)(e.cookingForm.mention3)?c.append("mention3",e.cookingForm.mention3.id):c.append("mention3",""),r=!0),console.log(e.cookingForm),e.cook_obj.lesson!=e.cookingForm.lesson&&(c.append("lesson",e.cookingForm.lesson),r=!0),e.cook_obj.video!=e.cookingForm.video&&(e.cookingForm.video.includes("shorts")&&(l=e.cookingForm.video.split("/").pop(),e.cookingForm.video="https://www.youtube.com/watch?v="+l),d=e.youTubeGetID(e.cookingForm.video),e.cookingForm.thumbjs="http://img.youtube.com/vi/"+d+"/2.jpg",console.log(e.cookingForm.video,e.cookingForm.thumbjs),c.append("video",e.cookingForm.video),c.append("thumbjs",e.cookingForm.thumbjs),r=!0),!r){t.next=18;break}return t.next=17,e.$axios.$patch("/v1/whatiscooking/cooking/"+e.cook_obj.uuid,c,o);case 17:t.sent;case 18:e.progressbar=!1,e.updated=!0,e.refresh(),e.$router.push("/whatiscooking/"+e.cook_obj.uuid),e.$store.dispatch("remove_cook_obj"),t.next=29;break;case 25:t.prev=25,t.t0=t.catch(1),console.log("error",t.t0,t.t0.response),e.progressbar=!1;case 29:case"end":return t.stop()}}),t,null,[[1,25]])})))()},updateTeachers:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var o,r,c,i,d,l,m,h,k;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.changedTeacherBool){t.next=51;break}if(o=e.cook_obj.taggedteachers,r="",0!=e.selectedTeachers.length||0!=o.length){t.next=7;break}return t.abrupt("return");case 7:if(0!=e.selectedTeachers.length){t.next=18;break}c={headers:{"content-type":"multipart/form-data",Authorization:e.$auth.strategy.token.get()}},i=0;case 10:if(!(i<o.length)){t.next=16;break}return t.next=13,e.$axios.$delete("/v1/whatiscooking/taggedteachers/"+o[i].id,c);case 13:i++,t.next=10;break;case 16:t.next=43;break;case 18:if(0!=o.length){t.next=36;break}for(d=[],l=0;l<e.selectedTeachers.length;l++)d[l]=e.selectedTeachers[l];m={headers:{"content-type":"multipart/form-data",Authorization:e.$auth.strategy.token.get()}},h=0;case 23:if(!(h<d.length)){t.next=34;break}return(k=new FormData).append("username",e.loggedInUser.username),k.append("cookingidobj",e.cook_obj.id),k.append("shareidobj",d[h]),k.append("idea",d[h]),t.next=31,e.$axios.$post("/v1/whatiscooking/taggedteachers/",k,m).then((function(e){console.log("added teacher",e)}));case 31:h++,t.next=23;break;case 34:t.next=43;break;case 36:return t.prev=36,t.delegateYield(regeneratorRuntime.mark((function t(){var c,d,l,m,h,k,v;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(c=e.cook_obj.taggedteachers.map((function(a){return a.shareidobj.id})),d=[],l=0;l<e.selectedTeachers.length;l++)r=Object(n.a)(e.selectedTeachers[l]),d[l]=e.selectedTeachers[l];"object"==r?d=e.selectedTeachers.map((function(a){return a.id})):"number"==r&&(d=e.selectedTeachers),m={headers:{"content-type":"multipart/form-data",Authorization:e.$auth.strategy.token.get()}},h=0;case 6:if(!(h<o.length)){t.next=13;break}if(-1!=d.indexOf(o[h].shareidobj.id)){t.next=10;break}return t.next=10,e.$axios.$delete("/v1/whatiscooking/taggedteachers/"+o[h].id,m);case 10:h++,t.next=6;break;case 13:k=regeneratorRuntime.mark((function t(o){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(-1!=c.indexOf(d[o])){t.next=9;break}return console.log("add",d[o]),(n=new FormData).append("username",e.loggedInUser.username),n.append("cookingidobj",e.cook_obj.id),n.append("shareidobj",d[o]),n.append("idea",d[o]),t.next=9,e.$axios.$post("/v1/whatiscooking/taggedteachers/",n,m).then((function(e){console.log("added teacher",e,d[o])}));case 9:case"end":return t.stop()}}),t)})),v=0;case 15:if(!(v<d.length)){t.next=20;break}return t.delegateYield(k(v),"t0",17);case 17:v++,t.next=15;break;case 20:case"end":return t.stop()}}),t)}))(),"t0",38);case 38:t.next=43;break;case 40:t.prev=40,t.t1=t.catch(36),console.log(t.t1);case 43:e.progressbar=!1,e.updated=!0,e.$store.dispatch("check_user_teachers"),e.refresh(),e.$router.push("/whatiscooking/"+e.cook_obj.uuid),e.$store.dispatch("remove_cook_obj"),t.next=57;break;case 51:console.log("teacher unchanged"),e.progressbar=!1,e.updated=!0,e.refresh(),e.$router.push("/whatiscooking/"+e.cook_obj.uuid),e.$store.dispatch("remove_cook_obj");case 57:case"end":return t.stop()}}),t,null,[[36,40]])})))()},teacherchange:function(){this.cook_obj&&(this.changedTeacherBool=!0)},refresh:function(){this.cookingForm.username=this.loggedInUser.username,this.cookingForm.lesson="",this.cookingForm.video="",this.cookingForm.thumbjs="",this.selectedTeachers=[],this.changedTeacherBool=!1,this.changedTeachers=[],this.$refs.cooking_form.resetValidation()},remove:function(e){for(var t=-1,i=0;i<this.selectedTeachers.length;i++)(this.selectedTeachers[i].s_teacher_name===e.s_teacher_name||this.selectedTeachers[i]===e.id)&&(t=i);t>=0&&(this.cook_obj&&(this.changedTeacherBool=!0),this.selectedTeachers.splice(t,1))}},watch:{isUpdating:function(e){var t=this;e&&setTimeout((function(){return t.isUpdating=!1}),3e3)}}},_=o(20),j=o(23),x=o.n(j),w=o(590),F=o(193),y=o(588),T=o(197),$=o(199),O=o(597),C=o(598),V=o(605),I=o(128),R=o(166),D=o(192),P=o(17),U=o(606),A=o(607),S=o(600),z=o(609),B=o(67),G=o(646),component=Object(_.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-container",{staticClass:"mx-auto pa-0",staticStyle:{"max-width":"550px"},attrs:{fluid:""}},[n("v-card",{staticClass:"pa-4 pb-md-8 px-md-8",attrs:{color:"background",elevation:"0"}},[n("center",[n("img",{attrs:{src:o(706),width:e.img_width,alt:"video logo"}})]),e._v(" "),e.cook_obj?n("div",{staticClass:"font-weight-medium mb-4 text-h6 text-sm-h5",attrs:{align:"center",justify:"center"}},[e._v("Edit your video")]):n("div",{staticClass:"font-weight-medium mb-4 text-h6 text-sm-h5",attrs:{align:"center",justify:"center"}},[e._v("Upload your video")]),e._v(" "),n("gebbles-divider",{staticClass:"mb-5"}),e._v(" "),n("v-form",{ref:"cooking_form",on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[n("v-row",{staticClass:"ma-0"},[n("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[n("v-text-field",{attrs:{rules:e.youtubeRules,label:"*Youtube link"},model:{value:e.cookingForm.video,callback:function(t){e.$set(e.cookingForm,"video",t)},expression:"cookingForm.video"}}),e._v(" "),e.videoId?n("v-row",{staticClass:" justify-center text-center mt-2 mb-4"},[n("youtube",{attrs:{width:"auto",height:"100%","video-id":e.videoId}})],1):e._e(),e._v(" "),n("v-textarea",{attrs:{label:"Share what you're exploring.."},model:{value:e.cookingForm.lesson,callback:function(t){e.$set(e.cookingForm,"lesson",t)},expression:"cookingForm.lesson"}}),e._v(" "),n("p",{staticClass:"body-1 font-weight-bold xs12"},[e._v("Let's share about other fellow artists and mention them if they inspired you to work on your craft. ")]),e._v(" "),n("p",{staticClass:"font-weight-light body-2"},[n("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/create/each1teach1/"}},[e._v(" Give a shoutout ")]),e._v(" first, to add them here. This will be added in their sharing page and they will be notified. ")],1),e._v(" "),n("v-autocomplete",{staticClass:"pt-2",attrs:{disabled:e.isUpdating,items:e.usersTeachers,filled:"",chips:"",solo:"",label:"Artist appreciation","item-text":"s_teacher_name","item-value":"id",multiple:"",counter:"3"},on:{input:e.teacherchange},scopedSlots:e._u([{key:"selection",fn:function(data){return[n("v-chip",e._b({attrs:{"input-value":data.selected,close:""},on:{click:data.select,"click:close":function(t){return e.remove(data.item)}}},"v-chip",data.attrs,!1),[data.item.image_mini?n("v-avatar",{attrs:{left:""}},[n("v-img",{attrs:{src:data.item.image_mini}})],1):n("v-avatar",[n("v-icon",[e._v("\n                                    mdi-account-circle\n                                ")])],1),e._v(" "),n("span",{staticClass:"pl-1"},[e._v(e._s(data.item.s_teacher_name))])],1)]}},{key:"item",fn:function(data){return[[data.item.image_mini?n("v-list-item-avatar",[n("img",{attrs:{src:data.item.image_mini}})]):n("v-list-item-avatar",[n("v-icon",[e._v("\n                                    mdi-account-circle\n                                ")])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{innerHTML:e._s(data.item.s_teacher_name)}})],1)]]}}]),model:{value:e.selectedTeachers,callback:function(t){e.selectedTeachers=t},expression:"selectedTeachers"}}),e._v(" "),n("p",{staticClass:"font-weight-bold body-1 xs12"},[e._v("Video Privacy ")]),e._v(" "),n("p",{staticClass:"body-2 font-weight-light "},[e._v(" Choose who can see your video. ")]),e._v(" "),n("v-radio-group",{attrs:{row:""},model:{value:e.cookingForm.access,callback:function(t){e.$set(e.cookingForm,"access",t)},expression:"cookingForm.access"}},[n("v-radio",{attrs:{label:"Tagged Artists",value:3}}),e._v(" "),n("v-radio",{attrs:{label:"Community",value:5}}),e._v(" "),n("v-radio",{attrs:{label:"Public",value:6}})],1),e._v(" "),n("br"),e._v(" "),e.cook_obj?n("v-btn",{staticClass:"text-decoration-none",attrs:{outlined:"",small:"",color:"black",dark:"",loading:e.progressbar},on:{click:e.updateCooking}},[e._v("Update")]):n("v-btn",{staticClass:"text-decoration-none",attrs:{small:"",color:"black",dark:"",outlined:"",loading:e.progressbar},on:{click:e.submitCooking}},[e._v("Submit")]),e._v(" "),n("v-btn",{attrs:{small:"",color:"error",text:""},on:{click:e.clear}},[e._v("Cancel")])],1)],1)],1)],1)],1),e._v(" "),n("v-snackbar",{model:{value:e.updated,callback:function(t){e.updated=t},expression:"updated"}},[e._v("\n        Post updated.\n    ")]),e._v(" "),n("v-snackbar",{model:{value:e.valid_snackbar,callback:function(t){e.valid_snackbar=t},expression:"valid_snackbar"}},[e._v("\n        Write something to post.\n    ")]),e._v(" "),n("v-snackbar",{model:{value:e.thankyou_snackbar,callback:function(t){e.thankyou_snackbar=t},expression:"thankyou_snackbar"}},[e._v("\n        Thank you for sharing.\n    ")])],1)}),[],!1,null,null,null);t.a=component.exports;x()(component,{VAutocomplete:w.a,VAvatar:F.a,VBtn:y.a,VCard:T.a,VChip:$.a,VCol:O.a,VContainer:C.a,VForm:V.a,VIcon:I.a,VImg:R.a,VListItemAvatar:D.a,VListItemContent:P.a,VListItemTitle:P.c,VRadio:U.a,VRadioGroup:A.a,VRow:S.a,VSnackbar:z.a,VTextField:B.a,VTextarea:G.a})},706:function(e,t,o){e.exports=o.p+"img/portfolio.e559ced.png"}}]);