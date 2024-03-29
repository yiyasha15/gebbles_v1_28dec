/*just adding this index.js file inside the store directory enables vuex in nuxt */

import * as Cookies from 'js-cookie'
import EventService from '@/services/EventService.js'

export const state = () => ({
  artists: [], //array of artists in img community
  share_obj: null, //object to edit e1t1 data
  cook_obj:null,
  editing_obj: null, //object to edit data
  editing_event_obj: null,
  editing_workshop_obj: null,
  portfolio: null, //store portfolio data of the logged in user
  bio: null, //store bio data of the logged in user
  notifications:[],
  notifications_notseen:0,
  hasTeachers:false,
  hasPortfolio: false, //if user has portfolio data
  hasBio: false, //if user has bio data
  share_comments_list: [],
  learning_comments_list:[],
  // cook_has_like: false,
  // cook_has_dope: false,
  // cook_has_info: false,
  // cook_has_like_id: '',
  // cook_has_dope_id: '',
  // cook_has_info_id: '',
  e1t1:{},
  // like:'',
  // dope: '',
  // info:'',
  learnings:[],
  // cookings:[],
  teachers:[], //e1t1 onject
  page_teachers:'',
  page_learnings:'',
  // page_cookings:'',
  page_share_comment:'',
  upcoming:[],
  highlights:[],
  journey:[],
  page_journey:'',
  page_upcoming:'',
  page_highlights:'',
  journeyLoaded:true,
})
export const getters = {
  journeyLoaded(state){
    return state.journeyLoaded
  },
  cook_obj(state){
    return state.cook_obj
  },
  // cook_has_like(state){
  //   return state.cook_has_like
  // },
  // cook_has_dope(state){
  //   return state.cook_has_dope
  // },
  // cook_has_info(state){
  //   return state.cook_has_info
  // },
  // cook_has_like_id(state){
  //   return state.cook_has_like_id
  // },
  // cook_has_dope_id(state){
  //   return state.cook_has_dope_id
  // },
  // cook_has_info_id(state){
  //   return state.cook_has_info_id
  // },
  e1t1(state){
    return state.e1t1
  },
  learnings(state){
    return state.learnings
  },
  // cookings(state){
  //   return state.cookings
  // },
  notifications(state){
    return state.notifications
  },
  notifications_notseen(state){
    return state.notifications_notseen
  },
  artists(state) {
    return state.artists
  },
  share_obj(state){
    return state.share_obj
  },
  editing_obj(state){
    return state.editing_obj
  },
  editing_event_obj(state){
    return state.editing_event_obj
  },
  editing_workshop_obj(state){
    return state.editing_workshop_obj
  },
  usersTeachers(state) {
    return state.teachers
  },
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  userHasPortfolio(state){
    return state.hasPortfolio
  },
  usersPortfolio(state){
    return state.portfolio
  },
  userHasBio(state){
    return state.hasBio
  },
  usersBio(state){
    return state.bio
  },
  userHasTeachers(state){
    return state.hasTeachers
  },
  share_comments_list(state){
    return state.share_comments_list
  },
  learning_comments_list(state){
    return state.learning_comments_list
  },
  like(state){
    return state.like
  },
  dope(state){
    return state.dope
  },
  info(state){
    return state.info
  },
  upcoming(state){
    return state.upcoming
  },
  highlights(state){
    return state.highlights
  },
  journey(state){
    return state.journey
  }
}
export const actions = {
  // async nuxtServerInit({
  //   commit
  // }, {
  //   req
  // }) {
  //   let auth = null
  //   if (req.headers.cookie) {
  //     // cookie found
  //     try {
  //       // check data user login with cookie
  //       const {
  //         data
  //       } = await this.$axios.get('/user/profile')
  //       // server return the data is cookie valid loggedIn is true
  //       auth = data.data // set the data auth
  //     } catch (err) {
  //       // No valid cookie found
  //       auth = null
  //     }
  //   }

  //   // How we can set the user for AuthNuxt
  //   // Source: https://auth.nuxtjs.org/api/auth
  //   this.$auth.setUser(auth)
  // },
  check_notifications({commit, state}){
    if(state.auth.user ){
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()}
        };
      EventService.getNotificationsSharing(state.auth.user.username,config).then(res =>
      {
        commit('check_notifications',res.data.results)
        return;
      })
    }
  },
  change_like({commit})
  {
    commit('changeLike')
  },
  change_dope({commit})
  {
    commit('changeDope')
  },
  change_info({commit})
  {
    commit('changeInfo')
  },
  check_share_comments({commit}, id){
    EventService.getShareComments(id).then(res =>
      {
        commit('check_share_comments',res.data)
      })
  },
  // check_cook_reactions({commit}, id){
  //   EventService.getCookReaction(id).then(res =>
  //     {
  //       commit('check_cook_reactions',res.data)
  //     })
  // },
  check_cook_comments({commit}, id){
    EventService.getCookComments(id).then(res =>
      {
        commit('check_cook_comments',res.data.results)
      })
  },
  check_cook_obj({commit, state}, cook_obj){
    if(state.auth.loggedIn) {
    commit('check_cook_obj', cook_obj)
    }
  },
  check_share_obj({commit, state}, share_obj){
    if(state.auth.loggedIn) {
    commit('check_share_obj', share_obj)
    }
  },
  check_editing_obj({commit, state}, editing_obj){
    if(state.auth.loggedIn) {
    commit('check_editing_obj', editing_obj)
    }
  },
  check_editing_event_obj({commit, state}, editing_event_obj){
    if(state.auth.loggedIn) {
    commit('check_editing_event_obj', editing_event_obj)
    }
  },
  check_editing_workshop_obj({commit, state}, editing_workshop_obj){
    if(state.auth.loggedIn) {
    commit('check_editing_workshop_obj', editing_workshop_obj)
    }
  },
  check_user_portfolio({commit,state}){
    let getUser = localStorage.getItem('auth._token.local')
    if(getUser)
      {
        // console.log(state.auth.loggedIn,state.auth.user);
        EventService.getArtist(state.auth.user.username).then(res =>
      {
        // console.log("check portfolio", res.data);
        commit('usersPortfolio',res.data)
      }).catch(err =>{console.log(err.response.data);})}
  },
  check_user_bio({commit,state}){
    let getUser = localStorage.getItem('auth._token.local')
    if(getUser)
    {
    EventService.getBio(state.auth.user.username).then(res =>
    {
      // console.log("check bio");
      commit('usersBio',res.data)
    }).catch(err =>{console.log(err.response.data);})
  }
  },
  check_user_journey({commit, state}, username){
    let config;
    // console.log("check journey");
    if(state.auth.loggedIn && state.auth.user.username == username) {
      // console.log(state.auth.loggedIn, state.auth);  
      config = {
      headers: {"content-type": "multipart/form-data",
        "Authorization": this.$auth.strategy.token.get()}
      };
    }
      // EventService.getUpcoming(username,config).then(res =>
      // {
      //   commit('usersUpcoming',res.data)
      // }).catch(err =>{console.log(err.response.data);})

      // EventService.getHighlights(username,config).then(res =>
      // {
      //   commit('usersHighlights',res.data)
      // }).catch(err =>{console.log(err.response.data);})
      EventService.getJourney(username,config).then(res =>
      {
        commit('usersJourney',res.data)
      }).catch(err =>
      {console.log(err.response.data);})
  },
  update_user_journey({commit, state}){
    if(state.page_journey) {
      // checking if page_journey was not null then call api
      let config;
      if(state.auth.loggedIn) {
        config = {
        headers: {"content-type": "multipart/form-data",
          "Authorization": this.$auth.strategy.token.get()}
      };}
      //push the results to state.journey and update the page_journey url
      this.$axios.get(state.page_journey,config).then(res => {
        commit('updateUserJourney',res.data)
      })
      .catch(err => {
          console.log(err);
      });   
    }
  },
  // update_user_upcoming({commit, state}){
  //   if(state.page_upcoming) {
  //     // checking if page_upcoming was not null then call api
  //     let config;
  //     if(state.auth.loggedIn) {
  //       config = {
  //       headers: {"content-type": "multipart/form-data",
  //         "Authorization": this.$auth.strategy.token.get()}
  //     };}
  //     //push the results to state.journey and update the page_upcoming url
  //     this.$axios.get(state.page_upcoming,config).then(res => {
  //       commit('updateUserUpcoming',res.data)
  //     })
  //     .catch(err => {
  //         console.log(err.response);
  //     });   
  //   }
  // },
  // update_user_highlights({commit, state}){
  //   if(state.page_highlights) {
  //     let config;
  //     if(state.auth.loggedIn) {
  //       config = {
  //         headers: {"content-type": "multipart/form-data",
  //           "Authorization": this.$auth.strategy.token.get()}
  //       };
  //     }
  //    this.$axios.get(state.page_highlights,config).then(res => {
  //       commit('updateUserHighlights',res.data)
  //     })
  //     .catch(err => {
  //         console.log(err.response);
  //     });   
  //   }
  // },
  check_user_teachers({commit, state}){
    if(state.auth.loggedIn) {
        let config = {
          headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()}
        };
        EventService.getEach1Teach1_teachers(config).then(res =>
        {
          commit('usersTeachers',res.data)
        })
      }  
  },
  update_user_teachers({commit, state}){
    if(state.page_teachers) {
      // checking if page_teachers was not null then call api
      //push the results to state.journey and update the page_teachers url
      this.$axios.get(state.page_teachers).then(res => {
        commit('updateUserTeachers',res.data)
      })
      .catch(err => {
          console.log(err);
      });   
    }
  },
  update_user_learnings({commit, state}){
    if(state.page_learnings) {
      this.$axios.get(state.page_learnings).then(res => {
        commit('updateUserLearnings',res.data)
      })
      .catch(err => {
          console.log(err);
      });   
    }
  },
  // update_user_cookings({commit, state}){
  //   if(state.page_cookings) {
  //     this.$axios.get(state.page_cookings).then(res => {
  //       commit('updateUserCookings',res.data)
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     });   
  //   }
  // },
  update_user_comments({commit, state}){
    if(state.page_share_comment) {
      this.$axios.get(state.page_share_comment).then(res => {
        commit('updateUserShareComments',res.data)
      })
      .catch(err => {
          console.log(err);
      });   
    }
  },
  check_learnings({commit},id){
    EventService.getLearnings(id).then(res =>
      {
        commit('get_learnings',res.data)
      })
  },
  // check_cookings({commit},username){
  //   EventService.getWhatsCookingUsername(username).then(res =>
  //     {
  //       commit('get_cookings',res.data)
  //     })
  // },
  remove_portfolio({commit, state})
    {
      if(state.auth.loggedIn){
        commit('clearPortfolio')
      }
  },
  remove_bio({commit, state})
    {
      if(state.auth.loggedIn){
        commit('clearBio')
      }
  },
  remove_teachers({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clearTeachers')
    }
  },
  remove_journey({commit, state})
  {
      commit('clearJourney')
  },
  remove_share_obj({commit, state})
  {
    if(state.auth.loggedIn && state.share_obj){
      commit('clear_share_obj',state.share_obj)
    }
  },
  remove_cook_obj({commit, state})
  {
    if(state.auth.loggedIn && state.cook_obj){
      commit('clear_cook_obj',state.cook_obj)
    }
  },
  remove_page({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_page')
    }
  },
  remove_editing_obj({commit, state})
  {
    if(state.auth.loggedIn && state.editing_obj){
      commit('clear_editing_obj',state.editing_obj)
    }
  },
  remove_editing_event_obj({commit, state})
  {
    if(state.auth.loggedIn && state.editing_event_obj){
      commit('clear_editing_event_obj',state.editing_event_obj)
    }
  },
  remove_editing_workshop_obj({commit, state})
  {
    if(state.auth.loggedIn && state.editing_workshop_obj){
      commit('clear_editing_workshop_obj',state.editing_workshop_obj)
    }
  },
  remove_cook_reactions({commit, state})
  {
      // commit('clear_cook_reactions')
      commit('clear_cook_comments')
  },
  remove_notifications({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_notifications')
    }
  },
  remove_learnings({commit})
  {
      commit('clearLearnings')
  },
  // remove_cookings({commit})
  // {
  //     commit('clearCookings')
  // },
}
    // Define Mutations
export const mutations = {
  // changeLike(state){
  //   if(state.cook_has_like)
  //   {
      
  //   }
  //   else
  //   {
      
  //   }
  //   state.cook_has_like = !state.cook_has_like;
  // },
  // changeDope(state){
  //   state.cook_has_dope = !state.cook_has_dope;
  // },
  // changeInfo(state){
  //   state.cook_has_info = !state.cook_has_info;
  // },
  usersJourney(state, journey)
  {
    state.journey = []
    if(journey.results.length)
    {
      state.journey = journey.results
      state.page_journey = journey.next
    }
    // this one's for loading in journey page.
    state.journeyLoaded = false
  },
  usersUpcoming(state, upcoming)
  {
    state.upcoming=[]
    if(upcoming.results.length)
    {
      state.upcoming = upcoming.results
      state.page_upcoming = upcoming.next
    }
  },
  usersHighlights(state, highlights)
  {
    state.highlights=[]
    if(highlights.results.length)
    {
      state.highlights = highlights.results
      state.page_highlights = highlights.next
    }
  },
  clearJourney(state) //if user has portfolio change state to true
  {
    state.journeyLoaded=true
    state.journey =[]
    state.upcoming =[]
    state.highlights =[]
  },
  get_e1t1(state,e1t1){
    state.e1t1 = e1t1;
  },
  get_learnings(state,learnings){
    state.learnings = learnings.results;
    state.page_learnings = learnings.next;
  },
  // get_cookings(state,cookings){
  //   state.cookings = cookings;
  //   state.page_cookings = cookings.next;
  // },
  // get_cookings_filtered(state,id){
  //   state.cookingsfiltered=[]
  //   if(state.cookings.length>0)
  //   {
  //     let taggedteacherpresent = state.cookings.filter(obj => obj.taggedteachers.length>0)
  //     let arr=[];
  //     for(let i=0 ; i<taggedteacherpresent.length; i++)
  //     {
  //       for(let j=0; j<taggedteacherpresent[i].taggedteachers.length;j++)
  //       arr.push(taggedteacherpresent[i].taggedteachers[j]);
  //       console.log("state.1");
  //     }
  //     let final = arr.filter(obj => obj.shareidobj!=null)
  //     let f2=[];
  //     let f3 =[];
  //     f2 = final.filter(obj => obj.shareidobj.id ==id);

  //     f2.forEach(element => f3.push(element.id));
  //     for(let i=0 ; i<taggedteacherpresent.length; i++)
  //     {
  //       for(let j=0; j<taggedteacherpresent[i].taggedteachers.length;j++)
  //       {
  //         if(f3.find(element => element == taggedteacherpresent[i].taggedteachers[j].id))
  //         {
  //           console.log("only put this", state.cookingsfiltered);
  //           state.cookingsfiltered.push(taggedteacherpresent[i])
  //         }
  //       }
  //     }
  //   }
  // },
  check_notifications(state, notifications){
    if(notifications){
      state.notifications = []
      state.notifications_notseen =0
      state.notifications = notifications
      let n = notifications.filter(notifications => notifications.is_seen == false && notifications.sender != state.auth.user.username);
      state.notifications_notseen = n.length;
    }
  },
  check_share_comments(state, share_comments_list){
      state.share_comments_list = share_comments_list.results;
      state.page_share_comment = share_comments_list.next
  },
  // check_cook_reactions(state, react){
  //   if(react){
  //     state.like = react.filter(react => react.like_type == "LO");
  //     state.dope = react.filter(react => react.like_type == "FI");
  //     state.info = react.filter(react => react.like_type == "DE");
  //     if(state.auth.loggedIn){
  //       let like = state.like
  //       let dope = state.dope
  //       let info = state.info
  //       state.cook_has_like = false
  //       state.cook_has_dope = false
  //       state.cook_has_info = false
  //       state.cook_has_like_id = ''
  //       state.cook_has_dope_id = ''
  //       state.cook_has_info_id = ''
  //       let check_like = like.filter(like => like.username == state.auth.user.username);
  //       let check_dope = dope.filter(dope => dope.username == state.auth.user.username);
  //       let check_info = info.filter(info => info.username == state.auth.user.username);
  //       if(check_like[0]){
  //         state.cook_has_like_id = check_like[0].id
  //       }
  //       if(check_like.length>0){
  //         state.cook_has_like = true
  //       }
  //       if(check_dope[0]){
  //         state.cook_has_dope_id = check_dope[0].id
  //       }
  //       if(check_dope.length>0){
  //         state.cook_has_dope = true
  //       }
  //       if(check_info[0]){
  //         state.cook_has_info_id = check_info[0].id
  //       }
  //       if(check_info.length>0){
  //         state.cook_has_info = true
  //       }
  //     }
  //   }
  // },
  check_cook_comments(state, learning_comments_list){
    if(learning_comments_list){
      state.learning_comments_list = learning_comments_list
    }
  },
  check_cook_obj(state, cook_obj){
    if(cook_obj){
      state.cook_obj = null
      state.cook_obj = cook_obj
    }
  },
  check_share_obj(state, share_obj){
    if(share_obj){
      state.share_obj = null
      state.share_obj = share_obj
    }
  },
  clear_page(state){
      state.page_journey = ''
      state.page_upcoming = ''
      state.page_highlights = ''
      state.page_teachers = ''
      state.page_share_comment = ''
      state.page_learnings= ''
      // state.page_cookings= ''
      // state.page_students = ''
      // state.page_teachers = ''
    },
  clear_share_obj(state, share_obj){
    if(share_obj){
      state.share_obj = null}
  },
  clear_cook_obj(state, cook_obj){
    if(cook_obj){
      state.cook_obj = null}
  },
  check_editing_obj(state, editing_obj){
    if(editing_obj){
      state.editing_obj = null
      state.editing_obj = editing_obj
    }
  },
  clear_editing_obj(state, editing_obj){
    if(editing_obj){
      state.editing_obj = null}
  },
  check_editing_event_obj(state, editing_event_obj){
    if(editing_event_obj){
      state.editing_event_obj = null
      state.editing_event_obj = editing_event_obj
    }
  },
  clear_editing_event_obj(state, editing_event_obj){
    if(editing_event_obj){
      state.editing_event_obj = null}
  },
  check_editing_workshop_obj(state, editing_workshop_obj){
    if(editing_workshop_obj){
      state.editing_workshop_obj = null
      state.editing_workshop_obj = editing_workshop_obj
    }
  },
  clear_editing_workshop_obj(state, editing_workshop_obj){
    if(editing_workshop_obj){
      state.editing_workshop_obj = null}
  },
  clear_comments(state) //if user has portfolio change state to true
  {
    state.share_comments_list =[]
  },
  // get_sharing_teachers(state, teachers) 
  // {
  //   if(teachers.results)
  //   {state.teachers = teachers.results}
  // },
  // get_sharing_students(state, students) 
  // {
  //   if(students.results)
  //   {state.students = students.results}
  // },
  usersPortfolio(state, artist)
  {
    if(artist)
    {
      state.portfolio = artist
      state.hasPortfolio = true
    }
  },
  usersBio(state, bio)
  {
    if(bio)
    {
      state.bio = bio
      state.hasBio = true
    }
  },
  updateUserJourney(state,journey){
      state.page_journey= journey.next;
      journey.results.forEach(item => state.journey.push(item));
      // filter array so no duplicates
      const key = 'id';
      state.journey = [...new Map(state.journey.map(item =>
      [item[key], item])).values()];
  },
  updateUserUpcoming(state,upcoming){
    state.page_upcoming= upcoming.next;
    upcoming.results.forEach(item => state.upcoming.push(item));
    // filter array so no duplicates
    const key = 'id';
    state.upcoming = [...new Map(state.upcoming.map(item =>
    [item[key], item])).values()];
  },
  updateUserHighlights(state,highlights){
    state.page_highlights= highlights.next;
    highlights.results.forEach(item => state.highlights.push(item));
    // filter array so no duplicates
    const key = 'id';
    state.highlights = [...new Map(state.highlights.map(item =>
    [item[key], item])).values()];
  },
  updateUserTeachers(state,teachers){
    state.page_teachers= teachers.next;
    teachers.results.forEach(item => state.teachers.push(item));
    // filter array so no duplicates
    const key = 'id';
    state.teachers = [...new Map(state.teachers.map(item =>
    [item[key], item])).values()];
},
  updateUserLearnings(state,learnings){
    state.page_learnings= learnings.next;
    learnings.results.forEach(item => state.learnings.push(item));
    // filter array so no duplicates
    const key = 'id';
    state.learnings = [...new Map(state.learnings.map(item =>
    [item[key], item])).values()];
  },
  // updateUserCookings(state,cookings){
  //   state.page_cookings= cookings.next;
  //   cookings.results.forEach(item => state.cookings.push(item));
  //   // filter array so no duplicates
  //   const key = 'id';
  //   state.cookings = [...new Map(state.cookings.map(item =>
  //   [item[key], item])).values()];
  // },
  updateUserShareComments(state,comments){
    state.page_share_comment= comments.next;
    comments.results.forEach(item => state.share_comments_list.push(item));
    const key = 'id';
    state.share_comments_list = [...new Map(state.share_comments_list.map(item =>
    [item[key], item])).values()];
  },
  usersTeachers(state, teachers)
  {
    state.teachers = []
    if(teachers.results.length)
    {
      state.teachers = teachers.results
      state.hasTeachers = true
      state.page_teachers = teachers.next
    }
  },
  clear_notifications(state){
    state.notifications =[]
    state.notifications_notseen=0
  },
  clearLearnings(state){
    state.learnings = []
  },
  // clearCookings(state){
  //   state.cookings = []
  // },
  clearPortfolio(state) //if user has portfolio change state to true
  {
    state.portfolio = null
    state.hasPortfolio = false
  },
  clearBio(state) //if user has portfolio change state to true
  {
    state.bio = null
    state.hasBio = false
  },
  clearTeachers(state){
    state.teachers =[]
    state.hasTeachers = false
  },
  // clear_cook_reactions(state)
  // {
  //   state.like = ''
  //   state.dope = ''
  //   state.info = ''
  //   state.cook_has_like = false
  //   state.cook_has_dope= false
  //   state.cook_has_info= false
  //   state.cook_has_like_id= ''
  //   state.cook_has_dope_id=''
  //   state.cook_has_info_id= ''
  // },
  clear_cook_comments(state)
  {
    state.learning_comments_list = []
  },
}