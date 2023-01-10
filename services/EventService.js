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
    //user api
    getUser(){
        return apiClient1.get('/auth/user/')
    },
    //notifications api
    getNotificationsSharing(username,config){
        return apiClient1.get('/notifications/e1t1/?receiver=' + username, config)
    },
    //artists portfolio/journey related api
    getArtists() {
        return apiClient1.get('/artist/portfolios/list/')
    },
    getLegacyArtists(){
        return apiClient1.get('/artist/portfolios/legacy/list/')
    },
    getSearchedArtist(query) {
        return apiClient1.get('/artist/search/?query='+ query)
    },
    getArtist(username) {
        return apiClient1.get('/artist/portfolios/' + username)
    },
    getBio(username){
        return apiClient1.get('/artist/bios/' + username)
    },
    getAllJourney() {
        return apiClient1.get('/artist/journey/list/' )
    },
    getJourney(username,config) {
        return apiClient1.get('/artist/journey/list/?username=' + username, config)
    },
    getFullJourney(id,config) {
        return apiClient1.get('/artist/journey/' + id, config)
    },
    // getUpcoming(username,config) {
    //     return apiClient1.get('/artist/journey/upcomingevents/?username=' + username, config)
    // },
    getHighlights(username,config) {
        return apiClient1.get('/artist/journey/highlights/?username=' + username, config)
    },
    //each 1 teach 1 api
    getEach1Teach1(id) {
        return apiClient1.get('/e1t1/sharing/' + id)
    },
    getEach1Teach1s(){
        return apiClient1.get('/e1t1/sharing/')
    },
    getPersonalMessages(id){
        return apiClient1.get('/chat/list/?shareid=' + id)
    },
    getEach1Teach1_teachers(config) {
        return apiClient1.get('/e1t1/sharing/list/teachers/', config)
    },
    getEach1Teach1_students(config) {
        return apiClient1.get('/e1t1/sharing/list/students/', config)
    },
    getShareLove(id){
        return apiClient1.get('/e1t1/sharing/love/?shareidobj=' + id)
    },
    getShareComments(id){
        return apiClient1.get('/e1t1/sharing/comments/?shareidobj=' + id)
    },
    getOthersSharing(username,config){
        return apiClient1.get('/e1t1/sharing/list/teachers/withoutcookingattr/?whose_e1t1=' + username, config)
    },

    //cooking api
    getCooking(uuid,config){
        return apiClient1.get('/whatiscooking/cooking/'+ uuid, config)
    },
    getLatestCookings(){
        return apiClient1.get('/whatiscooking/latest_cookings/')
    },
    getLatestCookingsUsername(username){
        return apiClient1.get('/whatiscooking/latest_cookings/?username='+username)
    },
    getWhatsCooking() {
        return apiClient1.get('/whatiscooking/list/')
    },
    getLatestCookings(){
        return apiClient1.get('/whatiscooking/latest_cookings/')
    },
    getWhatsCookingId(uuid) {
        return apiClient1.get('/whatiscooking/list/'+ uuid)
    },
    getWhatsCookingUsername(config) {
        return apiClient1.get('/whatiscooking/mycookings/',config)
    },
    getStudentsCooking(username)
    {
        return apiClient1.get('/whatiscooking/my-students-videos/?teacher='+ username)
    },
    // getSearchedCooking() {
    //     return apiClient1.get('/whatiscooking/search/?query='+ query)
    // },
    getCookReaction(id){
        return apiClient1.get('/whatiscooking/cooking/likes/?cookingidobj=' + id)
    },
    getCookComments(id){
        return apiClient1.get('/whatiscooking/cooking/comments/?cookingidobj=' + id)
    },

    //learning api
    getLearnings(id){
        return apiClient1.get('/e1t1/learnings/list/?shareidobj=' + id)
    },
    getLearning(id){
        return apiClient1.get('/e1t1/learnings/' + id)
    },

     //events api
    getAllEvents() {
        return apiClient1.get('/events/list')
    },
    getEvent(uuid) {
        return apiClient1.get('/events/list/'+uuid)
    },
    getIamGoingEventList(uuid){
        return apiClient1.get('/events/iamgoing/list/?event='+uuid)
    },
    //search by country
    getSearchedEventCountry(query) {
        return apiClient1.get('/events/search/?query='+ query)
    },
    getSearchedEventName(query) {
        return apiClient1.get('/events/search/?event_name='+ query)
    },
    getSearchedEventsThisMonth() {
        return apiClient1.get('/events/search/?this_month='+ 'yes')
    },
    getMyOrganizedEvents(config) {
        return apiClient1.get('/events/my-organized-events/', config)
    },
    getMyInvitedEvents(config) {
        return apiClient1.get('/events/my-tagged-events/', config)
    },
    getMyGoingEvents(config) {
        return apiClient1.get('/events/iamgoing-events/', config)
    },
    //workshops api
    getAllWorkshops(){
        return apiClient1.get('/workshops/list')
    },
    getWorkshop(uuid){
        return apiClient1.get('/workshops/'+uuid)
    },
    getSearchedWorkshopCountry(query) {
        return apiClient1.get('/workshops/search/?query='+ query)
    },
    getSearchedWorkshopName(query) {
        return apiClient1.get('/workshops/search/?workshop_name='+ query)
    },
    getSearchedWorkshopThisMonth() {
        return apiClient1.get('/workshops/search/?this_month='+ 'yes')
    },
    getIamGoingWorkshopList(uuid){
        return apiClient1.get('/workshops/iamgoing/list/?workshop='+uuid)
    },
    getMyOrganizedWorkshops(config) {
        return apiClient1.get('/workshops/workshops-organized-by-artist/', config)
    },
    getMyInvitedWorkshops(config) {
        return apiClient1.get('/workshops/workshops-taught-by-artist/', config)
    },
    getMyGoingWorkshops(config) {
        return apiClient1.get('/workshops/iamgoing-workshops/', config)
    },
}