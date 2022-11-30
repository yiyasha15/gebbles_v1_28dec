import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4b70d026 = () => interopDefault(import('../pages/artists/index.vue' /* webpackChunkName: "pages/artists/index" */))
const _f0e017b0 = () => interopDefault(import('../pages/blogs.vue' /* webpackChunkName: "pages/blogs" */))
const _ef986d7a = () => interopDefault(import('../pages/blogs.vue/index.vue' /* webpackChunkName: "pages/blogs.vue/index" */))
const _ad582012 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _6ba44338 = () => interopDefault(import('../pages/create/index.vue' /* webpackChunkName: "pages/create/index" */))
const _0afbba24 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _74cdb1e5 = () => interopDefault(import('../pages/e1t1/index.vue' /* webpackChunkName: "pages/e1t1/index" */))
const _514279d6 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _18819906 = () => interopDefault(import('../pages/help/index.vue' /* webpackChunkName: "pages/help/index" */))
const _0e232f28 = () => interopDefault(import('../pages/journeys.vue' /* webpackChunkName: "pages/journeys" */))
const _345d9b00 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _21662603 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _5339ad5c = () => interopDefault(import('../pages/mypayments.vue' /* webpackChunkName: "pages/mypayments" */))
const _d31584d8 = () => interopDefault(import('../pages/onboarding.vue' /* webpackChunkName: "pages/onboarding" */))
const _94569f2e = () => interopDefault(import('../pages/passwordrenew.vue' /* webpackChunkName: "pages/passwordrenew" */))
const _007ffb5f = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _5c565348 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _18dc52d4 = () => interopDefault(import('../pages/setpassword.vue' /* webpackChunkName: "pages/setpassword" */))
const _5778a3dc = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _a4e20954 = () => interopDefault(import('../pages/subscription.vue' /* webpackChunkName: "pages/subscription" */))
const _73b164c4 = () => interopDefault(import('../pages/terms.vue' /* webpackChunkName: "pages/terms" */))
const _25fb17c6 = () => interopDefault(import('../pages/whatiscooking/index.vue' /* webpackChunkName: "pages/whatiscooking/index" */))
const _5c46dbb4 = () => interopDefault(import('../pages/workshops/index.vue' /* webpackChunkName: "pages/workshops/index" */))
const _1e795ffb = () => interopDefault(import('../pages/write_blog.vue' /* webpackChunkName: "pages/write_blog" */))
const _0d52a3a5 = () => interopDefault(import('../pages/artists/legacy.vue' /* webpackChunkName: "pages/artists/legacy" */))
const _125d3392 = () => interopDefault(import('../pages/create/each1teach1.vue' /* webpackChunkName: "pages/create/each1teach1" */))
const _c4b52e00 = () => interopDefault(import('../pages/create/event.vue' /* webpackChunkName: "pages/create/event" */))
const _08afa7a6 = () => interopDefault(import('../pages/create/journey.vue' /* webpackChunkName: "pages/create/journey" */))
const _759a0300 = () => interopDefault(import('../pages/create/uploadvideo.vue' /* webpackChunkName: "pages/create/uploadvideo" */))
const _f78a19fe = () => interopDefault(import('../pages/create/website.vue' /* webpackChunkName: "pages/create/website" */))
const _1f18cd11 = () => interopDefault(import('../pages/create/workshop.vue' /* webpackChunkName: "pages/create/workshop" */))
const _252e877a = () => interopDefault(import('../pages/help/admin.vue' /* webpackChunkName: "pages/help/admin" */))
const _12e1bf71 = () => interopDefault(import('../pages/help/getting_started.vue' /* webpackChunkName: "pages/help/getting_started" */))
const _76d45dc2 = () => interopDefault(import('../pages/help/thoughts.vue' /* webpackChunkName: "pages/help/thoughts" */))
const _63039296 = () => interopDefault(import('../pages/help/updates.vue' /* webpackChunkName: "pages/help/updates" */))
const _5999406b = () => interopDefault(import('../pages/blogs.vue/_id.vue' /* webpackChunkName: "pages/blogs.vue/_id" */))
const _0a4d11ad = () => interopDefault(import('../pages/e1t1/_uuid.vue' /* webpackChunkName: "pages/e1t1/_uuid" */))
const _6cde22dd = () => interopDefault(import('../pages/events/_uuid.vue' /* webpackChunkName: "pages/events/_uuid" */))
const _890b10e4 = () => interopDefault(import('../pages/whatiscooking/_uuid.vue' /* webpackChunkName: "pages/whatiscooking/_uuid" */))
const _675bf1ee = () => interopDefault(import('../pages/workshops/_uuid.vue' /* webpackChunkName: "pages/workshops/_uuid" */))
const _1c298f69 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _7cf31fcc = () => interopDefault(import('../pages/_username.vue' /* webpackChunkName: "pages/_username" */))
const _51b8c562 = () => interopDefault(import('../pages/_username/index.vue' /* webpackChunkName: "pages/_username/index" */))
const _91287aec = () => interopDefault(import('../pages/_username/about.vue' /* webpackChunkName: "pages/_username/about" */))
const _4ed997a8 = () => interopDefault(import('../pages/_username/each1teach1/index.vue' /* webpackChunkName: "pages/_username/each1teach1/index" */))
const _1f1f40ec = () => interopDefault(import('../pages/_username/events.vue' /* webpackChunkName: "pages/_username/events" */))
const _dc7e5006 = () => interopDefault(import('../pages/_username/journey.vue' /* webpackChunkName: "pages/_username/journey" */))
const _3d3385ca = () => interopDefault(import('../pages/_username/myhood.vue' /* webpackChunkName: "pages/_username/myhood" */))
const _32bc5965 = () => interopDefault(import('../pages/_username/notifications.vue' /* webpackChunkName: "pages/_username/notifications" */))
const _f7f6b8aa = () => interopDefault(import('../pages/_username/videos.vue' /* webpackChunkName: "pages/_username/videos" */))
const _5132ecc9 = () => interopDefault(import('../pages/_username/workshops.vue' /* webpackChunkName: "pages/_username/workshops" */))

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
    component: _4b70d026,
    name: "artists"
  }, {
    path: "/blogs",
    component: _f0e017b0,
    name: "blogs"
  }, {
    path: "/blogs.vue",
    component: _ef986d7a,
    name: "blogs.vue"
  }, {
    path: "/contact",
    component: _ad582012,
    name: "contact"
  }, {
    path: "/create",
    component: _6ba44338,
    name: "create"
  }, {
    path: "/dashboard",
    component: _0afbba24,
    name: "dashboard"
  }, {
    path: "/e1t1",
    component: _74cdb1e5,
    name: "e1t1"
  }, {
    path: "/events",
    component: _514279d6,
    name: "events"
  }, {
    path: "/help",
    component: _18819906,
    name: "help"
  }, {
    path: "/journeys",
    component: _0e232f28,
    name: "journeys"
  }, {
    path: "/login",
    component: _345d9b00,
    name: "login"
  }, {
    path: "/logout",
    component: _21662603,
    name: "logout"
  }, {
    path: "/mypayments",
    component: _5339ad5c,
    name: "mypayments"
  }, {
    path: "/onboarding",
    component: _d31584d8,
    name: "onboarding"
  }, {
    path: "/passwordrenew",
    component: _94569f2e,
    name: "passwordrenew"
  }, {
    path: "/privacy",
    component: _007ffb5f,
    name: "privacy"
  }, {
    path: "/register",
    component: _5c565348,
    name: "register"
  }, {
    path: "/setpassword",
    component: _18dc52d4,
    name: "setpassword"
  }, {
    path: "/settings",
    component: _5778a3dc,
    name: "settings"
  }, {
    path: "/subscription",
    component: _a4e20954,
    name: "subscription"
  }, {
    path: "/terms",
    component: _73b164c4,
    name: "terms"
  }, {
    path: "/whatiscooking",
    component: _25fb17c6,
    name: "whatiscooking"
  }, {
    path: "/workshops",
    component: _5c46dbb4,
    name: "workshops"
  }, {
    path: "/write_blog",
    component: _1e795ffb,
    name: "write_blog"
  }, {
    path: "/artists/legacy",
    component: _0d52a3a5,
    name: "artists-legacy"
  }, {
    path: "/create/each1teach1",
    component: _125d3392,
    name: "create-each1teach1"
  }, {
    path: "/create/event",
    component: _c4b52e00,
    name: "create-event"
  }, {
    path: "/create/journey",
    component: _08afa7a6,
    name: "create-journey"
  }, {
    path: "/create/uploadvideo",
    component: _759a0300,
    name: "create-uploadvideo"
  }, {
    path: "/create/website",
    component: _f78a19fe,
    name: "create-website"
  }, {
    path: "/create/workshop",
    component: _1f18cd11,
    name: "create-workshop"
  }, {
    path: "/help/admin",
    component: _252e877a,
    name: "help-admin"
  }, {
    path: "/help/getting_started",
    component: _12e1bf71,
    name: "help-getting_started"
  }, {
    path: "/help/thoughts",
    component: _76d45dc2,
    name: "help-thoughts"
  }, {
    path: "/help/updates",
    component: _63039296,
    name: "help-updates"
  }, {
    path: "/blogs.vue/:id",
    component: _5999406b,
    name: "blogs.vue-id"
  }, {
    path: "/e1t1/:uuid",
    component: _0a4d11ad,
    name: "e1t1-uuid"
  }, {
    path: "/events/:uuid",
    component: _6cde22dd,
    name: "events-uuid"
  }, {
    path: "/whatiscooking/:uuid",
    component: _890b10e4,
    name: "whatiscooking-uuid"
  }, {
    path: "/workshops/:uuid",
    component: _675bf1ee,
    name: "workshops-uuid"
  }, {
    path: "/",
    component: _1c298f69,
    name: "index"
  }, {
    path: "/:username",
    component: _7cf31fcc,
    children: [{
      path: "",
      component: _51b8c562,
      name: "username"
    }, {
      path: "about",
      component: _91287aec,
      name: "username-about"
    }, {
      path: "each1teach1",
      component: _4ed997a8,
      name: "username-each1teach1"
    }, {
      path: "events",
      component: _1f1f40ec,
      name: "username-events"
    }, {
      path: "journey",
      component: _dc7e5006,
      name: "username-journey"
    }, {
      path: "myhood",
      component: _3d3385ca,
      name: "username-myhood"
    }, {
      path: "notifications",
      component: _32bc5965,
      name: "username-notifications"
    }, {
      path: "videos",
      component: _f7f6b8aa,
      name: "username-videos"
    }, {
      path: "workshops",
      component: _5132ecc9,
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
