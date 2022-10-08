import { mapGetters } from 'vuex';

export default (await import('vue')).defineComponent({
components: { RegisterLogin, RightNavigation, PlusButton },
computed: {
desktop() {
switch (this.$vuetify.breakpoint.name) {
case 'xs': return false;
case 'sm': return true;
case 'md': return true;
case 'lg': return true;
case 'xl': return true;
}
},
width() {
console.log("this ", window.innerWidth);
return window.innerWidth > 1190 ? true : false;
},
...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio', 'usersPortfolio', 'notifications', 'notifications_notseen', 'dark_theme'])
},
middleware: 'check_auth',
data() {
return {
drawer: this.width,
explore: 1,
e1t1: 1,
events: 1,
account: 1,
whatiscooking: 1
};
},
mounted() {
console.log(this.dark_theme);
if (this.dark_theme == 'true') {
console.log("change to true");
this.$vuetify.theme.dark = true;
} else
this.$vuetify.theme.dark = false;
}
});
function __VLS_template() {
// @ts-ignore
[$vuetify, isAuthenticated, userHasPortfolio, notifications_notseen, loggedInUser, drawer, usersPortfolio, explore, e1t1, events, account];
return {};
}
