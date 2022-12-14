import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5332840a = () => interopDefault(import('..\\pages\\artists\\index.vue' /* webpackChunkName: "pages/artists/index" */))
const _7ecd0efd = () => interopDefault(import('..\\pages\\blogs.vue' /* webpackChunkName: "pages/blogs" */))
const _c5deb066 = () => interopDefault(import('..\\pages\\blogs.vue\\index.vue' /* webpackChunkName: "pages/blogs.vue/index" */))
const _7494ace8 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _5fe5a442 = () => interopDefault(import('..\\pages\\create\\index.vue' /* webpackChunkName: "pages/create/index" */))
const _748d8382 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _06f10716 = () => interopDefault(import('..\\pages\\e1t1\\index.vue' /* webpackChunkName: "pages/e1t1/index" */))
const _6b7b2005 = () => interopDefault(import('..\\pages\\events\\index.vue' /* webpackChunkName: "pages/events/index" */))
const _5bc62ddd = () => interopDefault(import('..\\pages\\help\\index.vue' /* webpackChunkName: "pages/help/index" */))
const _68c3e177 = () => interopDefault(import('..\\pages\\journeys.vue' /* webpackChunkName: "pages/journeys" */))
const _45e36556 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _11cc65ce = () => interopDefault(import('..\\pages\\logout.vue' /* webpackChunkName: "pages/logout" */))
const _b282e8c6 = () => interopDefault(import('..\\pages\\mypayments.vue' /* webpackChunkName: "pages/mypayments" */))
const _66d09fdf = () => interopDefault(import('..\\pages\\onboarding.vue' /* webpackChunkName: "pages/onboarding" */))
const _7048263e = () => interopDefault(import('..\\pages\\passwordrenew.vue' /* webpackChunkName: "pages/passwordrenew" */))
const _1ce1b4f4 = () => interopDefault(import('..\\pages\\privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _41aa4f67 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _53ed39e9 = () => interopDefault(import('..\\pages\\setpassword.vue' /* webpackChunkName: "pages/setpassword" */))
const _7163c632 = () => interopDefault(import('..\\pages\\settings.vue' /* webpackChunkName: "pages/settings" */))
const _56ca123e = () => interopDefault(import('..\\pages\\subscription.vue' /* webpackChunkName: "pages/subscription" */))
const _85372f1a = () => interopDefault(import('..\\pages\\terms.vue' /* webpackChunkName: "pages/terms" */))
const _8801a7ac = () => interopDefault(import('..\\pages\\whatiscooking\\index.vue' /* webpackChunkName: "pages/whatiscooking/index" */))
const _eefe096c = () => interopDefault(import('..\\pages\\workshops\\index.vue' /* webpackChunkName: "pages/workshops/index" */))
const _22567b74 = () => interopDefault(import('..\\pages\\write_blog.vue' /* webpackChunkName: "pages/write_blog" */))
const _0471277e = () => interopDefault(import('..\\pages\\artists\\legacy.vue' /* webpackChunkName: "pages/artists/legacy" */))
const _5f50251c = () => interopDefault(import('..\\pages\\create\\each1teach1.vue' /* webpackChunkName: "pages/create/each1teach1" */))
const _dc326bec = () => interopDefault(import('..\\pages\\create\\event.vue' /* webpackChunkName: "pages/create/event" */))
const _1bc623a0 = () => interopDefault(import('..\\pages\\create\\journey.vue' /* webpackChunkName: "pages/create/journey" */))
const _7ae616ec = () => interopDefault(import('..\\pages\\create\\uploadvideo.vue' /* webpackChunkName: "pages/create/uploadvideo" */))
const _6da8398b = () => interopDefault(import('..\\pages\\create\\website.vue' /* webpackChunkName: "pages/create/website" */))
const _635457c7 = () => interopDefault(import('..\\pages\\create\\workshop.vue' /* webpackChunkName: "pages/create/workshop" */))
const _e594fc4c = () => interopDefault(import('..\\pages\\help\\admin.vue' /* webpackChunkName: "pages/help/admin" */))
const _50897c5e = () => interopDefault(import('..\\pages\\help\\getting_started.vue' /* webpackChunkName: "pages/help/getting_started" */))
const _eebf8a82 = () => interopDefault(import('..\\pages\\help\\thoughts.vue' /* webpackChunkName: "pages/help/thoughts" */))
const _50b01915 = () => interopDefault(import('..\\pages\\help\\updates.vue' /* webpackChunkName: "pages/help/updates" */))
const _40503975 = () => interopDefault(import('..\\pages\\blogs.vue\\_id.vue' /* webpackChunkName: "pages/blogs.vue/_id" */))
const _dbf24786 = () => interopDefault(import('..\\pages\\e1t1\\_uuid.vue' /* webpackChunkName: "pages/e1t1/_uuid" */))
const _00fa7fcd = () => interopDefault(import('..\\pages\\events\\_uuid.vue' /* webpackChunkName: "pages/events/_uuid" */))
const _517e8bf2 = () => interopDefault(import('..\\pages\\whatiscooking\\_uuid.vue' /* webpackChunkName: "pages/whatiscooking/_uuid" */))
const _1e005b12 = () => interopDefault(import('..\\pages\\workshops\\_uuid.vue' /* webpackChunkName: "pages/workshops/_uuid" */))
const _1366aa3e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _07ccc821 = () => interopDefault(import('..\\pages\\_username.vue' /* webpackChunkName: "pages/_username" */))
const _2c1b5541 = () => interopDefault(import('..\\pages\\_username\\index.vue' /* webpackChunkName: "pages/_username/index" */))
const _0c637a7c = () => interopDefault(import('..\\pages\\_username\\about.vue' /* webpackChunkName: "pages/_username/about" */))
const _ccd8c572 = () => interopDefault(import('..\\pages\\_username\\each1teach1\\index.vue' /* webpackChunkName: "pages/_username/each1teach1/index" */))
const _691e873a = () => interopDefault(import('..\\pages\\_username\\events.vue' /* webpackChunkName: "pages/_username/events" */))
const _f0ab4922 = () => interopDefault(import('..\\pages\\_username\\journey.vue' /* webpackChunkName: "pages/_username/journey" */))
const _2b658369 = () => interopDefault(import('..\\pages\\_username\\myhood.vue' /* webpackChunkName: "pages/_username/myhood" */))
const _96840152 = () => interopDefault(import('..\\pages\\_username\\notifications.vue' /* webpackChunkName: "pages/_username/notifications" */))
const _63f82c0e = () => interopDefault(import('..\\pages\\_username\\videos.vue' /* webpackChunkName: "pages/_username/videos" */))
const _72c95bbb = () => interopDefault(import('..\\pages\\_username\\workshops.vue' /* webpackChunkName: "pages/_username/workshops" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/artists",
    component: _5332840a,
    name: "artists"
  }, {
    path: "/blogs",
    component: _7ecd0efd,
    name: "blogs"
  }, {
    path: "/blogs.vue",
    component: _c5deb066,
    name: "blogs.vue"
  }, {
    path: "/contact",
    component: _7494ace8,
    name: "contact"
  }, {
    path: "/create",
    component: _5fe5a442,
    name: "create"
  }, {
    path: "/dashboard",
    component: _748d8382,
    name: "dashboard"
  }, {
    path: "/e1t1",
    component: _06f10716,
    name: "e1t1"
  }, {
    path: "/events",
    component: _6b7b2005,
    name: "events"
  }, {
    path: "/help",
    component: _5bc62ddd,
    name: "help"
  }, {
    path: "/journeys",
    component: _68c3e177,
    name: "journeys"
  }, {
    path: "/login",
    component: _45e36556,
    name: "login"
  }, {
    path: "/logout",
    component: _11cc65ce,
    name: "logout"
  }, {
    path: "/mypayments",
    component: _b282e8c6,
    name: "mypayments"
  }, {
    path: "/onboarding",
    component: _66d09fdf,
    name: "onboarding"
  }, {
    path: "/passwordrenew",
    component: _7048263e,
    name: "passwordrenew"
  }, {
    path: "/privacy",
    component: _1ce1b4f4,
    name: "privacy"
  }, {
    path: "/register",
    component: _41aa4f67,
    name: "register"
  }, {
    path: "/setpassword",
    component: _53ed39e9,
    name: "setpassword"
  }, {
    path: "/settings",
    component: _7163c632,
    name: "settings"
  }, {
    path: "/subscription",
    component: _56ca123e,
    name: "subscription"
  }, {
    path: "/terms",
    component: _85372f1a,
    name: "terms"
  }, {
    path: "/whatiscooking",
    component: _8801a7ac,
    name: "whatiscooking"
  }, {
    path: "/workshops",
    component: _eefe096c,
    name: "workshops"
  }, {
    path: "/write_blog",
    component: _22567b74,
    name: "write_blog"
  }, {
    path: "/artists/legacy",
    component: _0471277e,
    name: "artists-legacy"
  }, {
    path: "/create/each1teach1",
    component: _5f50251c,
    name: "create-each1teach1"
  }, {
    path: "/create/event",
    component: _dc326bec,
    name: "create-event"
  }, {
    path: "/create/journey",
    component: _1bc623a0,
    name: "create-journey"
  }, {
    path: "/create/uploadvideo",
    component: _7ae616ec,
    name: "create-uploadvideo"
  }, {
    path: "/create/website",
    component: _6da8398b,
    name: "create-website"
  }, {
    path: "/create/workshop",
    component: _635457c7,
    name: "create-workshop"
  }, {
    path: "/help/admin",
    component: _e594fc4c,
    name: "help-admin"
  }, {
    path: "/help/getting_started",
    component: _50897c5e,
    name: "help-getting_started"
  }, {
    path: "/help/thoughts",
    component: _eebf8a82,
    name: "help-thoughts"
  }, {
    path: "/help/updates",
    component: _50b01915,
    name: "help-updates"
  }, {
    path: "/blogs.vue/:id",
    component: _40503975,
    name: "blogs.vue-id"
  }, {
    path: "/e1t1/:uuid",
    component: _dbf24786,
    name: "e1t1-uuid"
  }, {
    path: "/events/:uuid",
    component: _00fa7fcd,
    name: "events-uuid"
  }, {
    path: "/whatiscooking/:uuid",
    component: _517e8bf2,
    name: "whatiscooking-uuid"
  }, {
    path: "/workshops/:uuid",
    component: _1e005b12,
    name: "workshops-uuid"
  }, {
    path: "/",
    component: _1366aa3e,
    name: "index"
  }, {
    path: "/:username",
    component: _07ccc821,
    children: [{
      path: "",
      component: _2c1b5541,
      name: "username"
    }, {
      path: "about",
      component: _0c637a7c,
      name: "username-about"
    }, {
      path: "each1teach1",
      component: _ccd8c572,
      name: "username-each1teach1"
    }, {
      path: "events",
      component: _691e873a,
      name: "username-events"
    }, {
      path: "journey",
      component: _f0ab4922,
      name: "username-journey"
    }, {
      path: "myhood",
      component: _2b658369,
      name: "username-myhood"
    }, {
      path: "notifications",
      component: _96840152,
      name: "username-notifications"
    }, {
      path: "videos",
      component: _63f82c0e,
      name: "username-videos"
    }, {
      path: "workshops",
      component: _72c95bbb,
      name: "username-workshops"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
