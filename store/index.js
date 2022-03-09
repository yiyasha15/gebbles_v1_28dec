/*just adding this index.js file inside the store directory enables vuex in nuxt */

import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import EventService from '@/services/EventService.js'

export const state = () => ({
  artists: [], //array of artists in img community
  // learn_obj:null,
  share_obj: null, //object to edit e1t1 data
  cook_obj:null,
  editing_obj: null, //object to edit data
  portfolio: null, //store portfolio data of the logged in user
  bio: null, //store bio data of the logged in user
  fullJourney: null, //store currrently selected journey card
  personalMessages: [],
  notifications:[],
  notifications_notseen:0,
  hasTeachers:false,
  hasPortfolio: false, //if user has portfolio data
  hasBio: false, //if user has bio data
  personalMessagesNotifications: 0,
  share_comments_list: [],
  learning_comments_list:[],
  share_has_love: false,
  share_has_love_id:'',
  cook_has_like: false,
  cook_has_dope: false,
  cook_has_info: false,
  cook_has_like_id: '',
  cook_has_dope_id: '',
  cook_has_info_id: '',
  e1t1:{},
  love: '',
  like:'',
  dope: '',
  info:'',
  learnings:[],
  teachers:[], //e1t1 onject
  page_teachers:'',
  page_learnings:'',
  page_share_comment:'',
  loadingLearning:true,
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
  loadingLearning(state){
    return state.loadingLearning
  },
  cook_has_like(state){
    return state.cook_has_like
  },
  cook_has_dope(state){
    return state.cook_has_dope
  },
  cook_has_info(state){
    return state.cook_has_info
  },
  cook_has_like_id(state){
    return state.cook_has_like_id
  },
  cook_has_dope_id(state){
    return state.cook_has_dope_id
  },
  cook_has_info_id(state){
    return state.cook_has_info_id
  },
  share_has_love(state){
    return state.share_has_love
  },
  share_has_love_id(state){
    return state.share_has_love_id
  },
  e1t1(state){
    return state.e1t1
  },
  learnings(state){
    return state.learnings
  },
  notifications(state){
    return state.notifications
  },
  notifications_notseen(state){
    return state.notifications_notseen
  },
  fullJourney(state){
    return state.fullJourney
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
  usersTeachers(state) {
    return state.teachers
  },
  personalMessages(state){
    return state.personalMessages
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
  personalMessagesNotifications(state){
    return state.personalMessagesNotifications
  },
  share_comments_list(state){
    return state.share_comments_list
  },
  learning_comments_list(state){
    return state.learning_comments_list
  },
  love(state){
    return state.love
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
  check_notifications({commit, state}){
    if(state.auth.user ){
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": "Bearer " + state.auth.user.access_token}
        };
      EventService.getNotificationsSharing(state.auth.user.user.username,config).then(res =>
      {
        commit('check_notifications',res.data.results)
        return;
      })
    }
  },
  change_love({commit})
  {
    commit('changeLove')
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
  check_full_journey({commit, state}, id, username){
    if(state.auth.user ){
      if(state.auth.user.user.username == username){ //check if logged in user is checking its private journey
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": "Bearer " + state.auth.user.access_token}
        };
      EventService.getFullJourney(id,config).then(res =>
      {
        commit('fullJourney',res.data)
        return;
      })
    }
  }
  EventService.getFullJourney(id).then(res =>
    {
      commit('fullJourney',res.data)
      return;
    })
  },
  check_share_love({commit}, id){
    EventService.getShareLove(id).then(res =>
      {
        commit('check_share_love',res.data.count)
      })
  },
  check_share_comments({commit}, id){
    EventService.getShareComments(id).then(res =>
      {
        commit('check_share_comments',res.data)
      })
  },
  check_cook_reactions({commit}, id){
    EventService.getCookReaction(id).then(res =>
      {
        commit('check_cook_reactions',res.data)
      })
  },
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
  // check_learn_obj({commit},id){
  //   EventService.getLearning(id).then(res =>
  //   {
  //     commit('check_learn_obj',res.data)
  //   })
  // },
  check_user_portfolio({commit, state}){
      if(state.auth.loggedIn) {
          EventService.getArtist(state.auth.user.user.username).then(res =>
          {
            commit('usersPortfolio',res.data)
          })
        }  
  },
  check_user_bio({commit, state}){
    if(state.auth.loggedIn) {
        EventService.getBio(state.auth.user.user.username).then(res =>
        {
          commit('usersBio',res.data)
        })
      }  
  },
  check_user_journey({commit, state}, username){
    let config;
    if(state.auth.loggedIn) {
      config = {
      headers: {"content-type": "multipart/form-data",
        "Authorization": "Bearer " + state.auth.user.access_token}
      };}
      EventService.getUpcoming(username,config).then(res =>
      {
        commit('usersUpcoming',res.data)
      })
      EventService.getHighlights(username,config).then(res =>
      {
        commit('usersHighlights',res.data)
      })
      EventService.getJourney(username,config).then(res =>
        {
          commit('usersJourney',res.data)
        })
  },
  update_user_journey({commit, state}){
    if(state.page_journey) {
      // checking if page_journey was not null then call api
      let config;
      if(state.auth.loggedIn) {
        config = {
        headers: {"content-type": "multipart/form-data",
          "Authorization": "Bearer " + state.auth.user.access_token}
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
  update_user_upcoming({commit, state}){
    if(state.page_upcoming) {
      // checking if page_upcoming was not null then call api
      let config;
      if(state.auth.loggedIn) {
        config = {
        headers: {"content-type": "multipart/form-data",
          "Authorization": "Bearer " + state.auth.user.access_token}
      };}
      //push the results to state.journey and update the page_upcoming url
      this.$axios.get(state.page_upcoming,config).then(res => {
        commit('updateUserUpcoming',res.data)
      })
      .catch(err => {
          console.log(err);
      });   
    }
  },
  update_user_highlights({commit, state}){
    if(state.page_highlights) {
      // checking if page_highlights was not null then call api
      let config;
      if(state.auth.loggedIn) {
        config = {
        headers: {"content-type": "multipart/form-data",
          "Authorization": "Bearer " + state.auth.user.access_token}
      };}
      //push the results to state.journey and update the page_highlights url
      this.$axios.get(state.page_highlights,config).then(res => {
        commit('updateUserHighlights',res.data)
      })
      .catch(err => {
          console.log(err);
      });   
    }
  },
  check_user_teachers({commit, state}){
    if(state.auth.loggedIn) {
        EventService.getEach1Teach1_teachers(state.auth.user.user.username).then(res =>
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
  check_personal_room({commit, state}, id)
  {
    if(state.auth.loggedIn) {
      EventService.getPersonalMessages(id).then(res =>
      {
        commit('get_personal_messages',res.data)
      })
    }
  },
  check_learnings({commit},id){
    EventService.getLearnings(id).then(res =>
      {
        commit('get_learnings',res.data)
      })
  },
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
  remove_full_journey({commit})
  {
      commit('clearFullJourney')
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
  // remove_learn_obj({commit, state})
  // {
  //   if( state.learn_obj){
  //     commit('clear_learn_obj',state.learn_obj)
  //   }
  // },
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
  remove_cook_reactions({commit, state})
  {
      commit('clear_cook_reactions')
      commit('clear_cook_comments')
  },
  remove_love({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_love')
      commit('clear_comments')
    }
  },
  remove_notifications({commit, state})
  {
    if(state.auth.loggedIn){
      commit('clear_notifications')
    }
  },
  remove_personal_messages({commit, state})
  {
    if(state.auth.loggedIn && state.personalMessages){
      commit('clear_personal_messages',state.personalMessages)
    }
  },
  remove_learnings({commit})
  {
      commit('clearLearnings')
  },
}
    // Define Mutations
export const mutations = {
  changeLove(state){
    state.share_has_love = !state.share_has_love;
  },
  changeLike(state){
    // if(state.cook_has_like)
    // state.like = 
    state.cook_has_like = !state.cook_has_like;
  },
  changeDope(state){
    state.cook_has_dope = !state.cook_has_dope;
  },
  changeInfo(state){
    state.cook_has_info = !state.cook_has_info;
  },
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
  // check_learn_obj(state,learn_obj){
  //   state.loadingLearning = false;
  //   state.learn_obj = learn_obj
  // },
  get_e1t1(state,e1t1){
    state.e1t1 = e1t1;
  },
  get_learnings(state,learnings){
    state.learnings = learnings.results;
    state.page_learnings = learnings.next;
  },
  check_notifications(state, notifications){
    if(notifications){
      state.notifications = []
      state.notifications_notseen =0
      state.notifications = notifications
      let n = notifications.filter(notifications => notifications.is_seen == false && notifications.sender != state.auth.user.user.username);
      state.notifications_notseen = n.length;
    }
  },
  check_share_love(state, love){
    if(love){
      state.love = love
      if(state.auth.loggedIn){
      state.share_has_love = false
      state.share_has_love_id = ''
      // console.log(love);
        // let check_love = love.filter(love => love.username == state.auth.user.user.username);
        // if(check_love[0]){
        //   state.share_has_love_id = check_love[0].id
        // }
        // if(check_love.length>0){
        //   state.share_has_love = true
        // }
      }
    }
  },
  check_share_comments(state, share_comments_list){
      state.share_comments_list = share_comments_list.results;
      state.page_share_comment = share_comments_list.next
  },
  check_cook_reactions(state, react){
    // console.log("react", react);
    if(react){
      state.like = react.filter(react => react.like_type == "LO");
      state.dope = react.filter(react => react.like_type == "FI");
      state.info = react.filter(react => react.like_type == "DE");
      if(state.auth.loggedIn){
        let like = state.like
        let dope = state.dope
        let info = state.info
        state.cook_has_like = false
        state.cook_has_dope = false
        state.cook_has_info = false
        state.cook_has_like_id = ''
        state.cook_has_dope_id = ''
        state.cook_has_info_id = ''
        let check_like = like.filter(like => like.username == state.auth.user.user.username);
        let check_dope = dope.filter(dope => dope.username == state.auth.user.user.username);
        let check_info = info.filter(info => info.username == state.auth.user.user.username);
        if(check_like[0]){
          state.cook_has_like_id = check_like[0].id
        }
        if(check_like.length>0){
          state.cook_has_like = true
        }
        if(check_dope[0]){
          state.cook_has_dope_id = check_dope[0].id
        }
        if(check_dope.length>0){
          state.cook_has_dope = true
        }
        if(check_info[0]){
          state.cook_has_info_id = check_info[0].id
        }
        if(check_info.length>0){
          state.cook_has_info = true
        }
      }
    }
  },
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
  // clear_learn_obj(state, learn_obj){
  //   if(learn_obj){
  //     state.loadingLearning =true;
  //     state.learn_obj = null}
  // },
  clear_page(state){
      state.page_journey = ''
      state.page_upcoming = ''
      state.page_highlights = ''
      state.page_teachers = ''
      state.page_share_comment = ''
      state.page_learnings= ''
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
  updateUserShareComments(state,comments){
    state.page_share_comment= comments.next;
    comments.results.forEach(item => state.share_comments_list.push(item));
    // filter array so no duplicates
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
  fullJourney(state, fullJourney){
    if(fullJourney)
    {
      state.fullJourney = fullJourney}
  },
  get_personal_messages(state, personalMessages)
  {
    state.personalMessages = personalMessages
  },
  clear_notifications(state){
    state.notifications =[]
    state.notifications_notseen=0
  },
  clearLearnings(state){
    state.learnings = []
  },
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
  clearFullJourney(state) //if user has portfolio change state to true
  {
    state.fullJourney =null
  },
  clear_personal_messages(state)
  {
    state.personalMessages = []
  },
  clear_love(state)
  {
    state.love = ''
    state.share_has_love = false
    state.share_has_love_id =''
  },
  clear_cook_reactions(state)
  {
    state.like = ''
    state.dope = ''
    state.info = ''
    state.cook_has_like = false
    state.cook_has_dope= false
    state.cook_has_info= false
    state.cook_has_like_id= ''
    state.cook_has_dope_id=''
    state.cook_has_info_id= ''
  },
  clear_cook_comments(state)
  {
    state.learning_comments_list = []
  },
}