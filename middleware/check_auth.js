// export default function ({$auth, store, redirect, route}) {
//   if (!store.state.auth.loggedIn) {
//     console.log(route.path);
//     redirect(`/login?redirect=${route.path}`)
//   }
//   else{

//   }
// }
export default function({store, redirect }) {
  const isAuthenticated = store.state.auth.loggedIn ? true : false
  if (!isAuthenticated) {
    redirect("/register")
    // console.log("not auth");
  }
  else{
    // console.log(redirect) ;
    console.log("stay on the same page");
  }
}