/*
 This script uses javascript axios module to communicate with the backend API 
 baseURL is as the name suggests, it is the baseURL where our api OPENS its endpoints 
 All other branches starts from this root path i.e: http://localhost:8000/api/v1 
 getArtists() function fetches the data available at baseURL/portfolio and 
 getartist() {a single artist's data}, fetches from baseURL/portfolio/id 
*/
import axios from 'axios'

const apiClient1 = axios.create({
    baseURL: 'https://gruw80hfj5.execute-api.us-east-2.amazonaws.com/dev/api/v1',  //3000 earlier
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', // double quote and single quotes r 
        //important in json 
    }
})

export default {
    getWhatsCooking() {
        return apiClient1.get('/whatiscooking/list/')
    },
    getWhatsCookingId(uuid) {
        return apiClient1.get('/whatiscooking/list/'+ uuid)
    },
    getWhatsCookingUsername(username) {
        return apiClient1.get('/whatiscooking/mycookings/?username='+ username)
    },
    getStudentsCooking(username)
    {
        return apiClient1.get('/whatiscooking/my-students-videos/?teacher='+ username)
    },
    // getSearchedCooking() {
    //     return apiClient1.get('/whatiscooking/search/?query='+ query)
    // },
    getArtists() {
        return apiClient1.get('/artist/portfolios/list/')
    },
    getEvents() {
        return apiClient1.get('/events/list')
    },
    getEvent(uuid) {
        return apiClient1.get('/events/list/'+uuid)
    },
    getLegacyArtists(){
        return apiClient1.get('/artist/portfolios/legacy/list/')
    },
    getSearchedArtist(query) {
        return apiClient1.get('/artist/search/?query='+ query)
    },
    getSearchedEvent(query) {
        return apiClient1.get('/events/search/?query='+ query)
    },
    getMyOrganizedEvents(username) {
        return apiClient1.get('/events/my-organized-events/?username='+ username)
    },
    getMyTaggedEvents(username) {
        return apiClient1.get('/events/my-tagged-events/?guest='+ username)
    },
    getArtist(username) {
        // return apiClient1.get('/artist/portfolios/' + username)
        return apiClient1.get('/artist/portfolios/' + username)
    },
    getBio(username){
        return apiClient1.get('/artist/bios/' + username)
    },
    getJourney(username,config) {
        return apiClient1.get('/artist/journey/list/?username=' + username, config)
    },
    getFullJourney(id,config) {
        return apiClient1.get('/artist/journey/' + id, config)
    },
    getUpcoming(username,config) {
        return apiClient1.get('/artist/journey/upcomingevents/?username=' + username, config)
    },
    getHighlights(username,config) {
        return apiClient1.get('/artist/journey/highlights/?username=' + username, config)
    },
    getEach1Teach1(id) {
        return apiClient1.get('/e1t1/sharing/' + id)
    },
    getEach1Teach1s(){
        return apiClient1.get('/e1t1/sharing/')
    },
    getPersonalMessages(id){
        return apiClient1.get('/chat/?shareid=' + id)
    },
    getEach1Teach1_teachers(username) {
        return apiClient1.get('/e1t1/sharing/list/teachers/?username=' + username)
    },
    getEach1Teach1_students(username) {
        return apiClient1.get('/e1t1/sharing/list/students/?username=' + username)
    },
    getShareLove(id){
        return apiClient1.get('/e1t1/sharing/love/?shareidobj=' + id)
    },
    getShareComments(id){
        return apiClient1.get('/e1t1/sharing/comments/?shareidobj=' + id)
    },
    getCookReaction(id){
        return apiClient1.get('/whatiscooking/cooking/likes/?cookingidobj=' + id)
    },
    getCookComments(id){
        return apiClient1.get('/whatiscooking/cooking/comments/?cookingidobj=' + id)
    },
    getNotificationsSharing(username,config){
        return apiClient1.get('/notifications/e1t1/?receiver=' + username, config)
    },
    getLearnings(id){
        return apiClient1.get('/e1t1/learnings/list/?shareidobj=' + id)
    },
    getLearning(id){
        return apiClient1.get('/e1t1/learnings/' + id)
    }
}